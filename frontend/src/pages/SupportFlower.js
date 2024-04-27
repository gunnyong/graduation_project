import React from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';
import FlowerList2 from '../components/FlowerList2.js';

function SupportFlower() {

    return (
    <div className="mobile">
        {/* 페이지 타이틀 */}
        <div className='greenTop flex' style={{textAlign:"left", textIndent:"10px"}}>      
            <div style={{position:"absolute"}}>지원 식물 정보</div>
            <div><Sidebar /></div>
        </div>
        {/* 페이지 내용 */}
        <div className='body'>
        <form className='search'>
                <input style ={{width:"80%", height:"70%", border:"none", borderRadius:"10px", paddingLeft:"10px", fontFamily:"main_font"}}
                    type="text"
                    placeholder="검색하기"
                />
                <button style ={{width:"20%", height:"100%", fontFamily:"main_font"}} type="submit">검색</button>
            </form>
            <FlowerList2 />
        </div>
        {/* 하단 버튼 */}
        <DetailButtons />
    </div>
    );
}

export default SupportFlower;
