import React from 'react';
import { useNavigate } from 'react-router-dom';

const WebLogin = () => {
    const navigate = useNavigate();
    
    return (
        <div className='web flex webGreenBack'>
            <div>
            {/* 타이틀 */}
            <div className='flex zeroMargin'>
                <img src="/images/main_art_no.png" alt="자연 지능 화단 로고"  style={{float:"left", width:"250px", margin:"50px", marginRight:"10px"}}/>
                <div style={{width:"600px"}}>
                    <div className='green4' style={{fontSize:"100px", fontWeight:"bold", textAlign:"right"}}>
                        자연 지능 화단
                    </div>
                    <div style={{fontSize:"60px", fontWeight:"bold", textAlign:"right"}}>
                        관리자 로그인
                    </div>
                </div>
            </div>
            {/* 로그인 */}
            <div style={{width:"650px", marginLeft:"120px"}}>
                <div className='label' style={{marginTop:"50px"}}>
                    아이디<br/>
                    <input className='webInputText' type="text" placeholder='Enter ID' style={{}}></input>
                </div>
                <div className='label'  style={{marginTop:"50px"}}>
                    비밀번호<br/>
                    <input className='webInputText' type="text" placeholder='Enter Password' style={{}}></input>
                </div>
                <button type="button" className='webGreenButton' onClick={() => navigate('/WebMain')} style={{margin:"auto", marginTop:"50px"}}>로그인</button>
            </div>
            </div>
            <img src="/images/login.png" alt="로그인 로고"  style={{width:"1050px", position:"relative", right:"65px", top:"170px"}}/>
        </div>
    );
};

export default WebLogin;
