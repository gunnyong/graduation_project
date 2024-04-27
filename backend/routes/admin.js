const express = require('express')
const bcrypt = require('bcrypt')
const path = require('path')
const router = express.Router()
const dbPool = require('./db')

//관리자 로그인
//관리자 로그인
router.post('/login', async (req, res) => {
    const { admin_ID, password } = req.body;

    try {
        const [admins] = await dbPool.query('SELECT * FROM Admins WHERE admin_ID = ?', [admin_ID]);
        if (admins.length > 0) {
            const admin = admins[0];
            const passwordMatch = await bcrypt.compare(password, admin.password);
            
            if (passwordMatch) {
                // 세션에 관리자 정보 저장
                req.session.admin = { admin_ID: admin.admin_ID, name: admin.name };
                // 로그인 성공 응답에 'success' 키 추가
                res.json({ success: true, message: 'Logged in successfully' });
            } else {
                // 비밀번호 불일치 응답
                res.status(401).json({ success: false, message: 'Invalid password' });
            }
        } else {
            // 관리자 미발견 응답
            res.status(404).json({ success: false, message: 'Admin not found' });
        }
    } catch (error) {
        // 서버 에러 응답
        console.error(error);
        res.status(500).json({ success: false, message: 'Error logging in' });
    }
});

//로그아웃
router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ message: 'Logout failed.', error: err });
            } else {
                res.status(200).json({ message: 'Logged out successfully.' });
            }
        });
    } else {
        res.status(200).json({ message: 'No session to terminate.' });
    }
});

//관리자 로그인 확인 미들웨어
function isAuthenticated(req, res, next) {
    if (!req.session.admin) {
        return res.redirect('/admin/login');
    }
    next();
}
router.use(isAuthenticated); //

//관리자 메인 대시보드
router.get('/dashboard', (req, res) => {
    res.render('/admin/dashboard', { title : '관리자 대시보드'})
})

//사용자 목록 조회
router.post('/users', async (req, res) => {
    try {
        const [users] = await dbPool.query('SELECT user_ID, name, email, birth, register_date, status, device_ID FROM Users');

        res.render('admin/users', {
            title: '사용자 목록',
            users: users.map(user => ({
                user_ID: user.user_ID,
                name: user.name,
                email: user.email,
                birth: user.birth ? user.birth.toISOString().split('T')[0] : '', // 생년월일을 YYYY-MM-DD 형식으로 변환
                register_date: user.register_date ? user.register_date.toISOString().split('T')[0] : '', // 등록 날짜를 YYYY-MM-DD 형식으로 변환
                status: user.status,
                device_ID: user.device_ID || 'N/A' // 장치 ID가 없는 경우 'N/A'로 표시
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('admin/error', { 
            title: '오류 발생', 
            message: '사용자 목록을 불러오는 중 오류가 발생했습니다.' 
        });
    }
});

//사용자 상세 정보 조회
router.get('/user-detail/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const [user] = await dbPool.query('SELECT * FROM Users WHERE user_ID = ?', [userId]);

        if (user.length > 0) {
            res.render('admin/user-detail', {
                title: '사용자 상세 정보',
                user: user[0],
                birth: user[0].birth.toISOString().substring(0, 10),
                register_date: user[0].register_date.toISOString().substring(0, 10)
            });
        } else {
            res.status(404).render('admin/error', {
                title: '오류',
                message: '사용자를 찾을 수 없습니다.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('admin/error', {
            title: '오류',
            message: '사용자 정보를 불러오는 중 오류가 발생했습니다.'
        })
    }
})

module.exports = router;