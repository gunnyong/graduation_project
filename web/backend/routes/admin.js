const express = require('express')
const bcrypt = require('bcrypt')
const session = require('express-session')
const ejs = require('ejs')
const router = express.Router()
const dbPool = require('./db')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

//메인화면
app.get('/', (req, res) => {
    res.render('index', { title: '메인화면' })
})

//관리자 로그인
router.get('/login', (req, res) => {
    if (req.session.admin) {
        return res.redirect('/admin/dashboard')
    }
    res.render('login', { title: '관리자 로그인' })
})

router.post('/login', async (req, res) => {
    const { admin_ID, password } = req.body

    try {
        const [admin] = await dbPool.query('SELECT * FROM admin WHERE admin_ID = ?', [admin_ID])

        if (admin.length > 0) {
            const isMatch = await bcrypt.compare(password, admin[0].password)

            if (isMatch) {
                // 로그인 성공: 관리자 정보를 세션에 저장
                req.session.admin = { admin_ID: admin[0].admin_ID, name: admin[0].name }
                res.redirect('/admin/dashboard')
            } else {
                // 비밀번호가 일치하지 않음
                res.status(401).render('admin/login', { title: '관리자 로그인', errorMessage: '비밀번호가 일치하지 않습니다.' })
            }
        } else {
            // 관리자 ID가 존재하지 않음
            res.status(401).render('admin/login', { title: '관리자 로그인', errorMessage: '해당 관리자 ID가 존재하지 않습니다.' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('admin/login', { title: '관리자 로그인', errorMessage: '로그인 처리 중 문제가 발생했습니다.' })
    }
})

//로그아웃
app.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(function(err) {
        if (err) {
          return next(err)
        } else {
          return res.redirect('/')
        }
      });
    }
  })

//관리자 로그인 확인 미들웨어
function isAuthenticated(req, res, next) {
    if (!req.session.admin) {
        return res.redirect('/admin/login');
    }
    next();
}
router.use(isAuthenticated); //

//관리자 메인 대시보드
app.get('/dashboard', (req, res) => {
    res.render('/admin/dashboard', { title : '관리자 대시보드'})
})

//사용자 목록 조회
router.get('/users', async (req, res) => {
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