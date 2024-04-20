import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://ceprj.gachon.ac.kr:60007/api/users/login', {
                user_ID: userId,
                password: password
            });
            // 로그인 성공 시, /Device로 리다이렉트
            navigate('/Device');
        } catch (error) {
            // 에러 처리
            console.error('로그인 실패:', error);
            alert('로그인에 실패했습니다.');
        }
    };

    return (
        <div className='mobile greenBack'>
            <img src="/images/main_art_no.png" alt="자연 지능 화단 로고"  style={{marginBottom:"15px"}} 
                // 임시로 아이콘 클릭시 메인 화면으로 이동
                onClick={() => navigate('/Main')}/>
            <div className='whiteBox green3' style={{fontSize:"40px", fontWeight:"bold", width:"300px", height:"70px"}}>
                자연 지능 화단
            </div>
            <div style={{marginTop:"15px"}}>
                <div>
                    아이디<br/>
                    <input className='inputText' type="text" placeholder='Enter ID' style={{width:"170px"}} value={userId} onChange={handleUserIdChange}></input>
                </div>
                <div>
                    비밀번호<br/>
                    <input className='inputText' type="password" placeholder='Enter Password' style={{width:"170px"}} value={password} onChange={handlePasswordChange}></input>
                </div>
            </div>
            <div>
                <button type="button" className='greenButton' onClick={handleSubmit}>로그인</button>
            </div>
            <div>
                <button type="button" className='greyButton' onClick={() => navigate('/Register')} style={{marginRight:"20px"}}>회원 가입</button>
                <button type="button" className='greyButton' onClick={() => navigate('/Find')}>ID / PW 찾기</button>
            </div>

            <button type="button" className='greyButton' onClick={() => navigate('/WebLogin')} style={{width:"100%", marginTop:"20px"}}>관리자 웹으로 이동</button>
        </div>
    );
};

export default Login;
