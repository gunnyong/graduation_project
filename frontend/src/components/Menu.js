import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Menu () {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // 로그아웃 요청을 서버에 보냅니다.
            await axios.post('http://ceprj.gachon.ac.kr:60007/api/admin/logout');
            // 로그아웃이 성공적이면 홈페이지로 리다이렉트합니다.
            navigate('/');
        } catch (error) {
            console.error('로그아웃 실패:', error);
            alert('로그아웃에 실패했습니다.');
        }
    };

    return (
        <div className="menuBox">
            <button type="button" className='menuButton' onClick={() => navigate('/WebMain')} style={{marginTop:"20px"}}>메인 화면</button>
            <button type="button" className='menuButton' onClick={() => navigate('/WebInquiry')} >문의 내역</button>
            <button type="button" className='menuButton' onClick={() => navigate('/WebUser')} >사용자<br/>목록</button>
            <button type="button" className='menuButton' onClick={() => navigate('/WebDevice')} >디바이스<br/>목록</button>
            <button type="button" className='menuButton' onClick={() => navigate('/WebAI')} >AI 관리</button>
            <button type="button" className='menuButton' onClick={() => navigate('/WebFlower')} >식물 관리</button>
            <button type="button" className='menuButton' onClick={() => navigate('/WebManager')} >관리자<br/>정보변경</button>
            <button type="button" className='menuButton' onClick={handleLogout} >로그아웃</button>
        </div>
    );
};

export default Menu;