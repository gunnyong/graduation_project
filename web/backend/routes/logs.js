const express = require('express')
const router = express.Router()
const db = require('./db')

router.post('/sensor-logs', async (req, res) => {
    /*
    const { sensor_ID, value, unit } = req.body;
    const log_timestamp = new Date();
    
    try {
        const query = `
            INSERT INTO Measurement_Logs (sensor_ID, log_timestamp, value, unit)
            VALUES (?, ?, ?, ?)
        `
        const results = await db.query(query, [sensor_ID, log_timestamp, value, unit])
        res.status(201).json({ message: 'Log created', logId: results.insertId })
    } catch (error) {
        console.error('Error creating sensor log:', error)
        res.status(500).json({ message: 'Error creating sensor log' })
    }
    */
   console.log(req.body)
   res.json({ message: 'Data received successfully' })
})

module.exports = router;