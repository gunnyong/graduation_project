import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu () {
    const navigate = useNavigate();

    return (
        <div>
            <div className="menuBox">
                <button type="button" className='menuButton' onClick={() => navigate('/WebMain')} style={{marginTop:"20px"}}>메인 화면</button>
                <button type="button" className='menuButton' onClick={() => navigate('/WebInquiry')} >문의 내역</button>
                <button type="button" className='menuButton' onClick={() => navigate('/WebUser')} >사용자<br/>목록</button>
                <button type="button" className='menuButton' onClick={() => navigate('/WebDevice')} >디바이스<br/>목록</button>
                <button type="button" className='menuButton' onClick={() => navigate('/WebAI')} >AI 관리</button>
                <button type="button" className='menuButton' onClick={() => navigate('/WebFlower')} >식물 관리</button>
                <button type="button" className='menuButton' onClick={() => navigate('/WebManager')} >관리자<br/>정보변경</button>
            </div>
        </div>
    );
};

export default Menu;