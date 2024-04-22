import React from 'react';
import flowerData from '../flowerData.js'; // 식물 데이터 불러오기
import { useNavigate, useEffect } from 'react-router-dom';
import '../App.css';

function AI() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     sendBleApp();
    // },[]);
    // function sendBleApp() {
    //     if (window.BleUse) {
    //         window.BleUse.postMessage('이 페이지에서 Ble를 사용합니다');
    //     } else {
    //         console.error('객체를 찾을 수 없음');
    //     }
    // }
    
    function sendFlowerNameToFlutter() {
        if (window.sendFlowerName) {
            window.sendFlowerName.postMessage(flowerData[0].name);
            navigate('/Main');
        } else {
            console.error('객체를 찾을 수 없음');
        }
    }
    return (
    <div className='mobile'>
        <div className='greenTop'>      
                AI 식물 판별 결과
        </div>
        <div className='flex'>
            <img className="greenBox" src={flowerData[0].image} alt={flowerData[0].name} style={{ maxHeight: "130px", maxWidth: "130px", padding: "20px", marginTop: "10px" }} />
            <img className="greenBox" src={flowerData[0].image} alt={flowerData[0].name} style={{ maxHeight: "130px", maxWidth: "130px", padding: "20px", marginTop: "10px" }} />
        </div>
        <div style={{position:"relative", bottom:"15px"}}>
            <div className="greenTitle" style={{}}>{flowerData[0].name}</div>
            <div className='greenBox' style={{ height: "280px" }}>
                <div className="whiteBox" style={{ width: "90%", height: "85%", fontSize: "17pt", overflowY: "auto", scrollbarColor: "gray" }}>
                {flowerData[0].description}</div>
            </div>
            <div className="flex" style={{marginTop:"10px"}}>
                <button type="button" className='greenButton' onClick={sendFlowerNameToFlutter} style={{ width: "50%", height: "80px", fontSize: "20pt"}}>식물 등록</button>
                <button type="button" className='greyButton' onClick={() => navigate('/FindFlower')} style={{ width: "50%", height: "80px", fontSize: "20px"}}>식물이 틀렸어요.</button>
            </div>
        </div>
    </div>
    );
}

export default AI;
