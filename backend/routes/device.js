const express = require('express')
const multer = require('multer')
const path = require('path')
const { spawn } =  require('child_process')
const router = express.Router()
const dbPool = require('./db')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

// 작은따옴표로 묶인 JSON 문자열을 유효한 JSON으로 변환하는 함수
function convertToValidJSON(inputString) {
    return inputString.replace(/'/g, '"');
}

// 디바이스 등록
router.post('/', async (req, res) => {

    // 클라이언트로부터 받은 JSON 문자열에서 객체 추출
    // 클라이언트로부터 받은 데이터를 유효한 JSON 형식으로 변환
    const jsonString = convertToValidJSON(req.body.data);
    const data = JSON.parse(jsonString);
    const { mac, name, info } = data;
    // 현재 로그인한 사용자의 ID를 세션에서 가져옴 (로그인 구현에 따라 변경될 수 있음)
    const user_ID = req.session.user.user_ID;

    // 유저가 로그인되어 있지 않은 경우, 에러 메시지 반환
    if (!user_ID) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    if (!jsonString) {
        return res.status(400).json({ message: 'Invalid JSON data' });
    }

    try {
        // 데이터베이스에 디바이스 정보와 유저 ID를 삽입합니다.
        const [result] = await dbPool.query(
            `INSERT INTO Devices (mac, name, user_ID, info) VALUES (?, ?, ?, ?)`,
            [mac, name, user_ID, info]
        );
        res.status(201).json({ message: 'Device added successfully', deviceId: result.insertId });
    } catch (error) {
        console.error('Error adding device:', error);
        res.status(500).json({ message: 'Error adding device', error });
    }
});
//디바이스 등록 여부 확인
router.get('/check-device', async (req, res) => {
    const user_ID = req.session.user.user_ID
    if (!user_ID) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    try {
        const [result] = await dbPool.query(
            `SELECT * FROM Devices WHERE user_ID = ?`,
            [user_ID]
        )

        if (result.length > 0) {
            res.json({ hasDevice: true })
        } else {
            res.json({ hasDevice: false })
        }
    } catch (error) {
        console.error('Error checking for user\'s device:', error);
        res.status(500).json({ message: 'Error checking for user\'s device', error });
    }
})

//디바이스 mac 주소 불러오기
router.get('/mac-address', async (req, res) => {
    const user_ID = req.session.user.user_ID
    if (!user_ID) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    try {
        // 해당 사용자의 모든 디바이스 MAC 주소를 조회합니다.
        const [devices] = await dbPool.query(
            'SELECT mac FROM Devices WHERE user_ID = ?',
            [user_ID]
        );

        if (devices.length > 0) {
            // 조회된 MAC 주소 목록을 반환합니다.
            res.json({ mac: devices[0].mac })
        } else {
            // 디바이스가 없을 경우 빈 배열을 반환합니다.
            res.status(404).json({ message: 'No devices found' });
        }
    } catch (error) {
        console.error('Error retrieving MAC addresses:', error);
        res.status(500).json({ message: 'Error retrieving MAC addresses', error });
    }
})

//촬영된 식물 사진 추가
router.post('/photo', upload.single('photo'), async (req, res) => {
    if(!req.file) {
        return res.status(400).json({ message: 'No photo uploaded' })
    }

    const { mac } = req.body
    const photoPath = req.file.path

    console.log(req.body, req.file.path)
    try {
        const [result] = await dbPool.query(
            `INSERT INTO Device_Photos (mac, photo) VALUES (?, ?)`,
            [mac, photoPath]
        )

        const pythonProcess = spawn('python', ['v0.5src/ai/predict.py', photoPath])
        let scriptOutPut = ''

        pythonProcess.stdout.on('data', (data) => {
            scriptOutPut += data.toString()
            console.log(data.toString())
        });

        pythonProcess.stderr.on('data', (data) => {
            // python 프로그램 오류 내용
            // console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', async (code) => {
            const aiResult = scriptOutPut.trim()
            const processedAt = new Date().toISOString().slice(0, 19).replace('T', ' ')

            if (code == 0) {
                console.error(`Python script process exited with code ${code}`);
                await dbPool.query(
                    `UPDATE Device_Photos SET error_log = ? WHERE plant_ID = ?`,
                    [`Python script exited with code ${code}`, result.insertId]
                )

                return res.status(500).json({ message: 'Error executing Python script' })
            }

            try {
                await dbPool.query(
                    `UPDATE Device_Photos SET ai_result = ?, processed_at = ? WHERE plant_ID = ?`,
                    [aiResult, processedAt, result.insertId]
                )
                res.status(201).json({
                    message: 'Photo uploaded and AI prediction completed successfully',
                    plantId: result.insertId,
                    aiOutput: aiResult // AI 예측 결과 추가
                });
            } catch (error) {
                console.error('Error updating AI result in the database:', error);
                res.status(500).json({ message: 'Error updating AI result in the database', error });
            }
        })
    } catch (error) {
        console.error('Error uploading photo:', error);
        res.status(500).json({ message: 'Error uploading photo', error });
    }
})

// 디바이스에 등록된 식물이 있는지 확인
router.get('/check-plants', async (req, res) => {

    const { mac } = req.body

    try {
        const [plants] = await dbPool.query('SELECT * FROM Device_Photos WHERE mac = ?', [mac]);

        if (plants.length > 0) {
            res.json({ hasPlants: true });
        } else {
            res.json({ hasPlants: false });
        }
    } catch (error) {
        console.error('Error checking for plants:', error);
        res.status(500).json({ message: 'Error checking for plants', error });
    }
});

// 특정 식물의 AI 판별 결과를 가져오는 엔드포인트
router.get('/result/:plantId', async (req, res) => {
    const { plantId } = req.params;  // URL 파라미터에서 plantId를 추출

    try {
        const [result] = await dbPool.query(
            `SELECT photo, ai_result FROM Device_Photos WHERE plant_ID = ?`,
            [plantId]
        );

        if (result.length > 0) {
            // 조회된 판별 결과를 반환
            console.log(result)
            res.json(result[0]);
        } else {
            // 해당 ID를 가진 판별 결과가 없는 경우
            res.status(404).json({ message: 'Result not found' });
        }
    } catch (error) {
        console.error('Error retrieving AI result:', error);
        res.status(500).json({ message: 'Error retrieving AI result', error });
    }
});

// 디바이스 상세 정보 조회 라우터
router.get('/details/:deviceId', async (req, res) => {
    const deviceId = req.params.deviceId; // URL로부터 디바이스 ID를 추출합니다.

    try {
        // 디바이스 정보 조회 쿼리 실행
        const [device] = await dbPool.query('SELECT * FROM Devices WHERE device_ID = ?', [deviceId]);
        
        if (device.length === 0) {
            return res.status(404).json({ message: 'Device not found' });
        }
        
        // 조회된 디바이스 정보 반환
        res.json({ device: device[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving device details' });
    }
});

//디바이스 삭제
router.delete('/:mac', async (req, res) => {
    const mac = req.params.mac;
    const user_ID = req.session.user.user_ID;

    // 유저 인증 확인
    if (!user_ID) {
        return res.status(401).json({ message: 'Unauthorized: User not logged in' });
    }

    try {
        // 디바이스 소유자가 맞는지 확인
        const [device] = await dbPool.query('SELECT user_ID FROM Devices WHERE mac = ?', [mac]);
        if (device.length === 0) {
            return res.status(404).json({ message: 'Device not found' });
        }

        // 세션의 user_ID와 디바이스의 user_ID가 일치하는지 확인
        if (device[0].user_ID !== user_ID) {
            return res.status(403).json({ message: 'Forbidden: You do not own this device' });
        }

        // 디바이스와 연관된 다른 데이터를 먼저 삭제
        await dbPool.query('DELETE FROM Device_Photos WHERE mac = ?', [mac]);
        // 다른 테이블에서 참조를 삭제한 후 디바이스 삭제 쿼리 실행
        const result = await dbPool.query('DELETE FROM Devices WHERE mac = ?', [mac]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No device found with the given MAC address' });
        }

        res.json({ message: 'Device and all related data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting the device and related data' });
    }
});

module.exports = router;