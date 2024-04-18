import React from 'react';
import { useNavigate } from 'react-router-dom';

const Flower = () => {
    const navigate = useNavigate();
    return (
        <div className='mobile greenBack'>
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
