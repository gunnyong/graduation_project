const { spawn } = require('child_process');

// 파이썬 스크립트 경로
const pythonScriptPath = 'train.py';

// 파이썬 스크립트에 전달할 매개변수 (관리자페이지에서 입력받은 값들)
const modelId = 'example_model3';
const batchSize = 32;
const numEpochs = 1;
const numPatience = 3;

// 모델 성능을 저장할 변수
let modelPerformance;

// 파이썬 스크립트 실행
const pythonProcess = spawn('python', [pythonScriptPath, modelId, batchSize, numEpochs, numPatience]);

// 파이썬 스크립트의 표준 출력을 콘솔에 출력, 특정 문구만 필터링
pythonProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
        // 학습 진행상황 문구만 필터링
        const epochMatch = line.match(/Epoch\s+(\d+)\/(\d+)/);
        if (epochMatch) {
            const currentEpoch = epochMatch[1];
            const totalEpochs = epochMatch[2];
            const processMessage = `학습 진행중, 현재 에포크: ${currentEpoch}/${totalEpochs}`;
            console.log(processMessage); // 해당 내용을 관리자 페이지에 텍스트로 출력
        }

        // 학습 완료 후, 성능 평가 문구만 필터링
        const performanceMatch = line.match(/모델 성능 : (\d+\.\d+)/);
        if (performanceMatch) {
            modelPerformance = parseFloat(performanceMatch[1]); 
            console.log(`모델 성능 (F1 Score): ${modelPerformance}`); // 해당 내용을 관리자 페이지에 텍스트로 출력
        }
    });
});

// 파이썬 스크립트의 표준 에러를 콘솔에 출력
pythonProcess.stderr.on('data', (data) => {
    // console.error(`stderr from Python script: ${data}`);
});

// 파이썬 스크립트가 종료될 때 콘솔에 메시지 출력
pythonProcess.on('close', (code) => {
    console.log('학습 종료됨.'); // 해당 내용을 관리자 페이지에 텍스트로 출력
    // DB에 "모델 ID, 학습 일자, 모델 성능" 추가
});

// 관리자가 학습중지 버튼을 누르면 파이썬 프로세스 종료
// console.log('학습 중단됨.');
// pythonProcess.kill();
