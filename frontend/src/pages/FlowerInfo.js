import React, { useState, useEffect } from 'react';
import flowerData from '../flowerData.js'; // 식물 데이터 불러오기
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function FlowerInfo() {
    const navigate = useNavigate();
    
    const [flower, setFlower] = useState(null);
    const { id } = useParams(); // useParams 훅을 사용하여 URL 파라미터 접근

    useEffect(() => {
    const selectedFlower = flowerData.find(p => p.id.toString() === id);
    setFlower(selectedFlower);
    }, [id]);

    if(flower)
    return (
    <div className='mobile'>
        <div className='greenTop'>      
                식물 상세 정보
        </div>
        <img className="greenBox" src={flower.image} alt={flower.name} style={{maxHeight:"170px", maxWidth:"170px", padding:"20px", marginTop:"10px"}} />
        <div style={{position:"relative", bottom:"20px"}}>    
            <div className="greenTitle">{flower.name}</div>
            <div className='greenBox' style={{height:"240px"}}>
            <div className="whiteBox" style={{ width:"90%", height:"85%", fontSize:"17pt", overflowY:"auto", scrollbarColor:"gray"}}>
                {flower.description}</div>
            </div>
            <button type="button" className='greenButton' onClick={() => navigate('/Main')} style={{width:"100%", height:"80px", fontSize:"20pt", marginTop:"10px"}}>식물 등록하기</button>
        </div>
    </div>
    );
}

export default FlowerInfo;
