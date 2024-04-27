const express = require('express')
const router = express.Router()
const db = require('./db')

router.post('/sensor-logs', async (req, res) => {
    const { user_ID, sensor_type, value, unit } = req.body;
    const log_timestamp = new Date();
    console.log(req.body)
    
    try {
        const query = `
            INSERT INTO SensorLogs (user_ID, sensor_type, log_timestamp, value, unit)
            VALUES (?, ?, ?, ?, ?)
        `
        const results = await db.query(query, [user_ID, sensor_type, log_timestamp, value, unit])
        res.status(201).json({ message: 'Log created', logId: results.insertId })
    } catch (error) {
        console.error('Error creating sensor log:', error)
        res.status(500).json({ message: 'Error creating sensor log' })
    }

})

module.exports = router;