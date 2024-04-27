import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function FlowerInfo() {
    const navigate = useNavigate();
    
    const [flower, setFlower] = useState(null);
    const { id } = useParams(); // useParams 훅을 사용하여 URL 파라미터 접근
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.get('http://ceprj.gachon.ac.kr:60007/flowerdata.json')
            .then(response => {
                const flowers = response.data;
                setResult(flowers); // 먼저 결과를 상태에 저장
                const selectedFlower = flowers.find(p => p.id.toString() === id); // 업데이트된 결과를 바탕으로 선택된 식물을 찾음
                setFlower(selectedFlower); // 선택된 식물 상태를 업데이트
                console.log(selectedFlower);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [id]); // id가 변경될 때마다 이 useEffect가 실행되어야 하므로, 의존성 배열에 id를 추가
    
    // 이미지 경로를 URL로 변환하는 함수
    function convertFilePathToUrl(filePath) {
        const baseUrl = "http://ceprj.gachon.ac.kr:60007";
        const fileName = filePath.split('/').pop();
        const newUrl = `${baseUrl}/${fileName}`;
        
        return newUrl;
    }

    const imageUrl = flower ? convertFilePathToUrl(flower.image) : '';

    if (!flower) {
        return <div>데이터를 불러오는 중...</div>;
    }

    return (
    <div className='mobile'>
        <div className='greenTop'>
                식물 상세 정보
        </div>
        <img className="greenBox" src={imageUrl} alt={flower.name} style={{maxHeight:"170px", maxWidth:"170px", padding:"20px", marginTop:"10px"}} />
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
