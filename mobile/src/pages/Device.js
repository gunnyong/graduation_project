import React from 'react';
import { useNavigate } from 'react-router-dom';

const Device = () => {
    const navigate = useNavigate();
    return (
        <div className='greenBack'>
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
                <button type="button" className='greenButton' onClick={() => navigate('/Bluetooth')} style={{width:"140px", height:"55px"}}>블루투스 찾기</button>
            </div>
        </div>
    );
};

export default Device;
