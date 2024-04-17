import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu () {
    const navigate = useNavigate();

    return (
        <div>
            <div className="menuBox">
                <button type="button" className='menuButton' onClick={() => navigate('/Main')} style={{marginTop:"20px"}}>메인 화면</button>
                <button type="button" className='menuButton' onClick={() => navigate('/Inquiry')} >문의 내역</button>
                <button type="button" className='menuButton' onClick={() => navigate('/User')} >사용자<br/>목록</button>
                <button type="button" className='menuButton' onClick={() => navigate('/Device')} >디바이스<br/>목록</button>
                <button type="button" className='menuButton' onClick={() => navigate('/AI')} >AI 관리</button>
                <button type="button" className='menuButton' onClick={() => navigate('/Flower')} >식물 관리</button>
                <button type="button" className='menuButton' onClick={() => navigate('/Manager')} >관리자<br/>정보변경</button>            </div>
        </div>
    );
};

export default Menu;