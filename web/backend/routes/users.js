const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const dbPool = require('./db')

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

//비밀번호 찾기

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
    const user_ID = req.session.user.user_ID; // 로그인한 사용자의 ID를 세션에서 가져옵니다.

    try {
        // 사용자 계정을 데이터베이스에서 삭제합니다.
        const [result] = await dbPool.query('DELETE FROM Users WHERE user_ID = ?', [user_ID]);
        
        if (result.affectedRows === 0) {
            // 사용자 ID에 해당하는 사용자가 없는 경우
            return res.status(404).json({ message: 'User not found.' });
        }

        // 세션을 파괴하여 로그아웃 처리를 합니다.
        req.session.destroy();

        res.json({ message: 'Account successfully deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting account.' });
    }
});

module.exports = router;