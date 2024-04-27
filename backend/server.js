require('dotenv').config({ path: './.env/database.env' })
require('dotenv').config({ path: './.env/secret.env' })
const express = require('express')
const session = require('express-session')
const path = require('path')
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')
const deviceRoutes = require('./routes/device')
const logsRoutes = require('./routes/logs')
const bodyParser = require('body-parser')
const cors = require('cors') // CORS를 위한 require 추가

const app = express();

app.use(cors()); // CORS 미들웨어 활성화

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.static(path.join(__dirname, './uploads'))); // uploads 폴더를 정적 파일로 제공
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) { // Handle SyntaxError here.
      console.error('Raw body:', req.rawBody)
      res.status(400).send('Invalid JSON')
    } else {
      next()
    }
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/logs', logsRoutes)
app.use('/api/devices', deviceRoutes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 60007;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
