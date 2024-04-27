const { spawn } = require('child_process');

function runPythonScript(imagePath) {
    
    temp = "";
    const pythonScript = 'predict.py'; // 실행할 식물판별프로그램(predict.py)의 경로
    const pythonProcess = spawn('python', [pythonScript, imagePath]); // 인자로 imagePath 전달

    pythonProcess.stdout.on('data', (data) => {
        // python 프로그램 출력 내용
        console.log(data.toString()); 
        temp = data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        // python 프로그램 오류 내용
        // console.error(`${data}`);
    });

    pythonProcess.on('close', (code) => {
        // python 프로그램 종료 코드
        // console.log(`${code}`);
    });

    return temp;
}

// runPythonScript(imagePath);