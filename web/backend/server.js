require('dotenv').config({ path: './.env/database.env' })
require('dotenv').config({ path: './.env/secret.env' })
const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')
const logsRoutes = require('./routes/logs')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(helmet())
app.use(bodyParser.json())
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) { // Handle SyntaxError here.
      console.error('Raw body:', req.rawBody)
      res.status(400).send('Invalid JSON')
    } else {
      next()
    }
})
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/logs', logsRoutes)
app.use(express.static(path.join(__dirname, 'mobile', 'build')))
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('문제가 발생했습니다!')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'mobile', 'build', 'index.html'))
})

const PORT = process.env.PORT || 60007
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

