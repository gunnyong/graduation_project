import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import FlowerList from '../components/FlowerList';
import axios from 'axios';

const FindFlower = () => {
    const navigate = useNavigate();
    const [deviceName, setDeviceName] = useState(''); // 메시지를 저장할 상태
    const [message, setMessage] = useState('');
    const [plantId, setPlantId] = useState('');

    useEffect(() =>{
        function sendBleApp() {
            axios.get('http://ceprj.gachon.ac.kr:60007/api/devices/mac-address') // 디바이스 mac adrress을 요청하는 URL
            .then(response => {
                window.BleUse.postMessage(response.data.mac);
                if (response.data.length > 0) {
                    setDeviceName(response.data.mac)
                } else {
                    //alert('등록된 디바이스가 없습니다.');
                }
            })
            .catch(error => {
                // 에러 처리
                console.error('There was an error!', error);
                alert('디바이스 정보를 가져오는 중 오류가 발생했습니다.');
            });
        }
        sendBleApp()
    }, [])

    useEffect(() => {
        function handleMessage(event) {
            // 메시지의 출처를 확인하는 것이 좋습니다. 예: if (event.origin === "http://example.com")
            console.log("Received message:", event.data);
            setMessage(event.data); // 상태 업데이트
            // setPlantId(event.data);
            alert('AI 판별 요청 성공');
            // navigate('/AI?plantId='+plantId);
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