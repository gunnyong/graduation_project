import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Hamburger from 'hamburger-react';
import { useNavigate } from 'react-router-dom';

function Sidebar () {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);

    // 각 드롭다운 메뉴 항목의 상태를 관리하는 객체
    const [dropdownStates, setDropdownStates] = useState({});
    // 드롭다운 메뉴 항목의 열림/닫힘 상태를 토글하는 함수
    const toggleDropdown = (item) => {
    setDropdownStates(prevState => ({
        ...prevState,
        [item]: !prevState[item]
    }));
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://ceprj.gachon.ac.kr:60007/api/users/logout');
            // 서버 응답을 확인하고 클라이언트 측에서 페이지를 전환합니다.
            console.log(response.data.message);
            navigate('/'); // 홈으로 리다이렉트
        } catch (error) {
            console.error('로그아웃 실패:', error);
            alert('로그아웃에 실패했습니다.');
        }
    };

     // isOpen 상태가 변경될 때마다 실행됩니다.
    useEffect(() => {
    if (isOpen) {
        // isOpen이 true일 때 원하는 로직을 추가할 수 있습니다.
    } else {
        setDropdownStates({});
    }}, [isOpen]);

    return(
    <div className='flex' style={{position:"relative", top:"0px", left:"300px", height:"640px", zIndex:"1000"}}>
        <div style={{zIndex:"2000"}}>
            <Hamburger size={25} direction="left" toggled={isOpen} toggle={setOpen}/> 
        </div>
        <div className={isOpen ? "show-menu" : "hide-menu"}>
        <div className='greenTop' style={{width:"250px", float:"right", fontSize:"20px"}}>
            사용자 메뉴</div>
        <div style={{backgroundColor:"white", width:'250px',height:"585px", float:"right", marginTop:"0px", fontSize:"20px", overflowY:"auto", scrollbarColor:"gray"}}>
            <div className='menuTitle' onClick={() => navigate('')}>알림 센터</div>
            
            {/* 스마트 화단 */}
            <div onClick={() => toggleDropdown('smart')} className='menuTitle'>스마트 화단</div>
                {dropdownStates['smart'] && (
                    <div style={{background: 'white', zIndex: '1000', color:"grey"}}>
                        <div onClick={() => navigate('')} className="menuItem">
                            - 동작 설정</div>
                        <div onClick={() => navigate('/DeviceInfo')} className="menuItem">
                            - 디바이스 상세 정보</div>
                        <div onClick={() => navigate('/DeviceName')} className="menuItem">
                            - 디바이스명 변경</div>
                        <div onClick={() => navigate('')} className="menuItem">
                            - 나의 식물 변경</div>
                        <div onClick={() => navigate('')} className="menuItem" style={{borderBottom:"1.5px solid #2D6A4F"}}>
                            - 디바이스 삭제</div>
                    </div>
                )}

            {/* 서비스 정보 */}
            <div onClick={() => toggleDropdown('service')} className='menuTitle'>서비스 정보</div>
                {dropdownStates['service'] && (
                    <div style={{background: 'white', zIndex: '1000', color:"grey"}}>
                        <div onClick={() => navigate('/SupportFlower')} className="menuItem">
                            - 지원 식물 정보</div>
                        <div onClick={() => navigate('')} className="menuItem" style={{borderBottom:"1.5px solid #2D6A4F"}}>
                            - 이용 방법</div>
                    </div>
                )}

            {/* 마이페이지 */}
            <div onClick={() => toggleDropdown('mypage')} className='menuTitle'>마이페이지</div>
                {dropdownStates['mypage'] && (
                    <div style={{background: 'white', zIndex: '1000', color:"grey"}}>
                        <div onClick={() => navigate('/ChangePassword')} className="menuItem">
                            - 비밀번호 변경</div>
                        <div onClick={handleLogout} className="menuItem">
                            - 로그 아웃</div>
                        <div onClick={() => navigate('/Withdraw')} className="menuItem" style={{borderBottom:"1.5px solid #2D6A4F"}}>
                            - 회원 탈퇴</div>
                    </div>
                )}
            {/* 고객센터 */}
            <div onClick={() => toggleDropdown('cs')} className='menuTitle'>고객 센터</div>
                {dropdownStates['cs'] && (
                    <div style={{background: 'white', zIndex: '1000', color:"grey"}}>
                        <div onClick={() => navigate('')} className="menuItem">
                            - 문의 내역</div>
                        <div onClick={() => navigate('')} className="menuItem">
                            - 문의 하기</div>
                        <div onClick={() => navigate('')} className="menuItem" style={{borderBottom:"1.5px solid #2D6A4F"}}>
                            - 만족도 조사</div>
                    </div>
                )}
        </div>
        </div>
    </div>
    );
}
export default Sidebar;
