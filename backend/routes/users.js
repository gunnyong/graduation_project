const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const dbPool = require('./db')
const { authenticateToken } = require('../middleware/auth.js');

//회원가입
router.post('/register', async (req, res) => {
    const { user_ID, password, name, gender, birth, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await dbPool.query(
            'INSERT INTO Users (user_ID, password, name, gender, birth, email, register_date, status) VALUES (?, ?, ?, ?, ?, ?, NOW(), "active")',
            [user_ID, hashedPassword, name, gender, birth, email]
        );
        res.status(201).json({ message: 'User registered', userId: user_ID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

//로그인 
router.post('/login', async (req, res) => {
    const { user_ID, password } = req.body;
    
    try {
        const [users] = await dbPool.query('SELECT * FROM Users WHERE user_ID = ?', [user_ID]);
        if (users.length > 0) {
            const user = users[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (passwordMatch) {
                // 세션에 사용자 정보 저장
                req.session.user = { user_ID: user.user_ID, name: user.name };
                res.json({ message: 'Logged in successfully' });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

//로그아웃
router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                // 에러가 있을 경우 500 상태 코드와 함께 클라이언트에 응답을 전송합니다.
                res.status(500).json({ message: 'Logout failed.', error: err });
            } else {
                // 세션이 성공적으로 파괴되면, 클라이언트에게 상태 코드 200을 전송합니다.
                res.status(200).json({ message: 'Logged out successfully.' });
            }
        });
    } else {
        // 세션이 없을 경우 200 상태 코드와 함께 클라이언트에 응답을 전송합니다.
        res.status(200).json({ message: 'No session to terminate.' });
    }
});5

//아이디 찾기
router.post('/find_id', async (req, res) => {
    const { email } = req.body;

    try {
        const [user] = await dbPool.query('SELECT user_ID FROM Users WHERE email = ?', [email]);
        if (user.length > 0) {
            res.json({ user_ID: user[0].user_ID });
        } else {
            res.status(404).json({ message: 'Email not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving username.' });
    }
});

//비밀번호 변경
router.post('/change-password', async (req, res) => {
    // 현재 비밀번호와 새로운 비밀번호를 요청 본문에서 추출합니다.
    const { currentPassword, newPassword } = req.body;
    const user_ID = req.session.user.user_ID; // 로그인한 사용자의 ID를 세션에서 가져옵니다.

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Current and new password are required.' });
    }

    try {
        // 데이터베이스에서 사용자의 현재 비밀번호 해시를 검색합니다.
        const [users] = await dbPool.query('SELECT password FROM Users WHERE user_ID = ?', [user_ID]);
        if (users.length > 0) {
            const currentPasswordHash = users[0].password;

            // 현재 비밀번호가 맞는지 확인합니다.
            const match = await bcrypt.compare(currentPassword, currentPasswordHash);
            if (!match) {
                return res.status(401).json({ message: 'Current password is incorrect.' });
            }

            // 새로운 비밀번호를 해시하고 데이터베이스를 업데이트합니다.
            const newPasswordHash = await bcrypt.hash(newPassword, 10);
            await dbPool.query('UPDATE Users SET password = ? WHERE user_ID = ?', [newPasswordHash, user_ID]);

            res.json({ message: 'Password successfully changed.' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error changing password.' });
    }
});

//회원탈퇴
router.delete('/delete-account', async (req, res) => {
    const { user_ID, password } = req.body; // 클라이언트로부터 user_ID와 password를 받습니다.

    try {
        // 사용자의 비밀번호 해시 가져오기
        const [users] = await dbPool.query('SELECT password FROM Users WHERE user_ID = ?', [user_ID]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 비밀번호 검증
        const isValid = await bcrypt.compare(password, users[0].password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // 사용자 계정을 데이터베이스에서 삭제합니다.
        const [result] = await dbPool.query('DELETE FROM Users WHERE user_ID = ?', [user_ID]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'Account successfully deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting account.' });
    }
});

//사용자 아이디를 불러오는 엔드포인트
router.get('/id-info', async (req, res) => {
    const user_ID = req.session.user.user_ID
    try{
        if (!user_ID) {
            res.status(401).json({ message: 'User not logged in' });
        } else {
            res.status(200).json({ Id: user_ID })
        }
    } catch (error) {
        console.error('Error retrieving user_ID:', error);
        res.status(500).json({ message: 'Error retrieving user_ID', error });
    }
})

module.exports = router;