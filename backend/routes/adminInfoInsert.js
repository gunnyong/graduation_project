const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

// 데이터베이스 설정을 직접 코드에 추가합니다.
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'dbid241',
    password: 'dbpass241',
    database: 'db24107'
};

// dbPool 생성 대신 dbConfig를 사용해 바로 연결을 생성합니다.
const insertAdmin = async (adminID, adminPassword, adminName) => {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    try {
        // 데이터베이스 연결을 생성합니다.
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
                            INSERT INTO Admins (admin_ID, password, name) VALUES (?, ?, ?)
        `, [adminID, hashedPassword, adminName]);

        console.log('관리자 정보가 성공적으로 추가되었습니다', rows);
        
        // 연결 종료
        await connection.end();
    } catch (error) {
        console.error('DB Insert Error: ', error);
        // 에러를 던짐으로써 외부에서도 에러를 처리할 수 있도록 합니다.
        throw error;
    }
};

// 관리자 정보
const adminID = 'plantadmin24107';
const adminPassword = 'Dlqudans7xla!';
const adminName = '자연지능화분관리자';

// 관리자를 데이터베이스에 추가합니다.
insertAdmin(adminID, adminPassword, adminName).catch((error) => {
    console.error('An error occurred during the admin creation process', error);
});
