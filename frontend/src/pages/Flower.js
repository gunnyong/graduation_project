import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Flower = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 식물 등록 여부를 확인합니다.
        const fetchPlants = async () => {
            try {
                const response = await axios.get('http://ceprj.gachon.ac.kr:60007/api/devices/check-plant');
                if (response.data.hasPlants) {
                    // 등록된 식물이 있으면 메인 화면으로 리디렉션
                    navigate('/main');
                } else {
                    // 등록된 식물이 없으면 로딩 상태 해제
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error checking plants:', error);
                setIsLoading(false); // 에러 발생 시 로딩 상태 해제
            }
        };

        fetchPlants();
    }, [navigate]);

    if (isLoading) {
        // 로딩 중인 경우 로딩 인디케이터 표시
        return <div>Loading...</div>;
    }

    return (
        <div className='greenBack mobile'>
            <img src="/images/main_art_no.png" alt="자연 지능 화단 로고"  style={{marginBottom:"15px"}}/>
            <div className='whiteBox green3' style={{fontSize:"30pt", fontWeight:"bold", width:"300px", height:"70px"}}>
                자연 지능 화단
            </div>
            <div>
            <div className='greenTitle'>      
                식물 등록
            </div>
            <div className='whiteBox' style={{width:"310px", height:"170px", fontSize:"17pt"}}>      
                등록된 식물이 없습니다.<br/><br/>
                식물 등록을 진행하시겠습니까?
            </div>
            </div>
            <div>
                <button type="button" className='greenButton' onClick={() => navigate('/FindFlower')} style={{width:"100px", height:"55px", marginRight:"20px"}}>예</button>
                <button type="button" className='greyButton' onClick={() => navigate('/')} style={{width:"100px", height:"55px", fontSize:"20px"}}>아니오</button>
            </div>
        </div>
    );
};

export default Flower;
