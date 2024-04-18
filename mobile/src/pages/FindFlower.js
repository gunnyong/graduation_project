import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlowerList from '../components/FlowerList';

const FindFlower = () => {
    const navigate = useNavigate();
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
            <button type="button" className='greenButton' onClick={() => navigate('/AI')} style={{width:"100%", height:"80px", fontSize:"20pt"}}>AI 식물 판별하기</button>
        </div>
    );
};

export default FindFlower;
