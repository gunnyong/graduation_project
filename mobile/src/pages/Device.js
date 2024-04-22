import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function sendMessageToFlutterApp() {
    if (window.toApp) {
        window.toApp.postMessage('플러터 리액트 데이터 전송 테스트');
    } else {
        console.error('toApp 객체를 찾을 수 없음');
    }
}

const Device = () => {
    const [message, setMessage] = useState(''); // 메시지를 저장할 상태

    useEffect(() => {
        function handleMessage(event) {
            // 메시지의 출처를 확인하는 것이 좋습니다. 예: if (event.origin === "http://example.com")
            console.log("Received message:", event.data);
            setMessage(event.data); // 상태 업데이트
                  // event.data를 사용하여 POST 요청
            axios.post('http://ceprj.gachon.ac.kr:60007/api/devices/', {
            data: event.data // event.data를 서버로 전송
            })
            .then(response => {
            // 응답 처리
            console.log('Server response:', response.data);
            navigate('/Flower');
            })
            .catch(error => {
            // 에러 처리
            console.error('There was an error!', error);
            });
        }
        window.addEventListener("message", handleMessage);
       // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
        return () => {
            window.removeEventListener("message", handleMessage);
        };
        }, []);
        const navigate = useNavigate();

    return (
        <div className='mobile greenBack'>
            <img src="/images/main_art_no.png" alt="자연 지능 화단 로고"  style={{marginBottom:"15px"}}/>
            <div className='whiteBox green3' style={{fontSize:"30pt", fontWeight:"bold", width:"300px", height:"70px"}}>
                자연 지능 화단
            </div>
            <div>
            <div className='greenTitle'>      
                기기 등록
            </div>
            <div className='whiteBox' style={{width:"310px", height:"170px", fontSize:"17pt"}}>      
                등록된 디바이스가 없습니다.<br/><br/>
                블루투스 연결을 진행해주세요.
            </div>
            </div>
            <div>
                <button type="button" className='greenButton' onClick={sendMessageToFlutterApp} style={{width:"140px", height:"55px"}}>블루투스 찾기</button>
                {/* <button type="button" className='greenButton' onClick={() => navigate('/Bluetooth')} style={{width:"140px", height:"55px"}}>블루투스 찾기</button> */}
            </div>
        </div>
    );
};

export default Device;
