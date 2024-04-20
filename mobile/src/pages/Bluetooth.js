import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bluetooth = () => {
    const navigate = useNavigate();
    return (
        <div className='mobile'>
            <div className='greenTop'>
                블루투스 등록
            </div>
            <img src="/images/bluetooth.png" alt="블루투스 등록 화면"  style={{ width:"100%", height:"520px"}}/>
            <button type="button" className='greenButton' onClick={() => navigate('/Flower')} style={{width:"140px", height:"55px"}}>블루투스<br/> 등록 완료</button>
        </div>
    );
};

export default Bluetooth;
