import React, { useState, useEffect } from 'react';
import flowerData from '../flowerData.js'; // 식물 데이터 불러오기
import { useParams } from 'react-router-dom';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';

function FlowerDetail() {
    
    const [flower, setFlower] = useState(null);
    const { id } = useParams(); // useParams 훅을 사용하여 URL 파라미터 접근

    useEffect(() => {
    const selectedFlower = flowerData.find(p => p.id.toString() === id);
    setFlower(selectedFlower);
    }, [id]);

    if(flower)
    return (
        <div className="mobile">
        {/* 페이지 타이틀 */}
        <div className='greenTop flex' style={{textAlign:"left", textIndent:"10px"}}>      
            <div style={{position:"absolute"}}>지원 식물 상세 정보</div>
            <div><Sidebar /></div>
        </div>
        {/* 페이지 내용 */}
        <div className='body'>
            <img className="greenBox" src={flowerData[0].image} alt={flowerData[0].name} style={{ maxHeight: "130px", maxWidth: "130px", padding: "20px", marginTop: "10px", position:"relative", top:'10px' }} />
            <div className="greenTitle">{flowerData[0].name}</div>
            <div className='greenBox' style={{ height: "250px" }}>
            <div className="whiteBox" style={{ width:"90%", height:"85%", fontSize:"17pt", overflowY:"auto", scrollbarColor:"gray"}}>
                {flower.description}</div>
            </div>
        </div>
        {/* 하단 버튼 */}
        <DetailButtons />
    </div>
    );
}

export default FlowerDetail;
