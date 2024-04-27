import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';
import axios from 'axios';

function FlowerDetail() {
    
    const [flower, setFlower] = useState(null);
    const { id } = useParams(); // useParams 훅을 사용하여 URL 파라미터 접근

    useEffect(() => {
        axios.get('http://ceprj.gachon.ac.kr:60007/flowerdata.json')
            .then(response => {
                const flowers = response.data;
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
            <img className="greenBox" src={imageUrl} alt={flower.name} style={{ maxHeight: "130px", maxWidth: "130px", padding: "20px", marginTop: "10px", position:"relative", top:'10px' }} />
            <div className="greenTitle">{flower.name}</div>
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
