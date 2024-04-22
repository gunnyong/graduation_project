import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import FlowerList from '../components/FlowerList';


const FindFlower = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(''); // 메시지를 저장할 상태

    useEffect(() => {
        sendBleApp();
    },[]);
    function sendBleApp() {
        if (window.BleUse) {
            window.BleUse.postMessage('이 페이지에서 Ble를 사용합니다');
        } else {
            console.error('객체를 찾을 수 없음');
        }
    }
    
    useEffect(() => {
        function handleMessage(event) {
            // 메시지의 출처를 확인하는 것이 좋습니다. 예: if (event.origin === "http://example.com")
            console.log("Received message:", event.data);
            setMessage(event.data); // 상태 업데이트
            alert('AI 판별 요청 성공');
            navigate('/AI');
        }
        window.addEventListener("message", handleMessage);
       // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
        return () => {
            window.removeEventListener("message", handleMessage);
        };
        }, []);

    function sendAIToFlutterApp() {
        if (window.sendAI) {
            window.sendAI.postMessage('AI 판별 요청');
        } else {
            console.error('객체를 찾을 수 없음');
        }
    }
    return (
        <div className='mobile'>
            <div className='greenTop'>
                식물 등록
            </div>
            <form className='search'>
                <input style ={{width:"80%", height:"70%", border:"none", borderRadius:"10px", paddingLeft:"10px", fontFamily:"main_font"}}
                    type="text"
                    placeholder="검색하기"
                />
                <button style ={{width:"20%", height:"100%", fontFamily:"main_font"}} type="submit">검색</button>
            </form>
            <FlowerList />
            <button type="button" className='greenButton' onClick={sendAIToFlutterApp} style={{width:"100%", height:"80px", fontSize:"20pt"}}>AI 식물 판별하기</button>
        </div>
    );
};

export default FindFlower;
