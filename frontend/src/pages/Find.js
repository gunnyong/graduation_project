import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Find = () => {
    const navigate = useNavigate();
    const [emailForId, setEmailForId] = useState('');
    const [userIdForPassword, setUserIdForPassword] = useState('');
    const [emailForPassword, setEmailForPassword] = useState('');

    const handleFindId = async () => {
        try {
            const response = await axios.post('http://ceprj.gachon.ac.kr:60007/api/users/find_id', {
                email: emailForId
            });
            // 아이디 찾기 성공 처리
            alert(`회원님의 아이디는 ${response.data.user_ID} 입니다.`);
        } catch (error) {
            // 에러 처리
            console.error('아이디 찾기 실패:', error);
            alert('아이디 찾기에 실패했습니다.');
        }
    };

    return (
        <div className='mobile'>
            <div className='greenTop'>
                ID / 비밀번호 찾기
            </div>

            <div className='greenTitle'>아이디 찾기</div>
            <div className='greenBox'>
                <div style={{marginTop:"10px"}}>
                    이메일<br/>
                    <input className='inputText' type="email" placeholder='Enter E-mail' value={emailForId} onChange={(e) => setEmailForId(e.target.value)}></input>
                </div>
                <button type="submit" className='greenButton' onClick={handleFindId} style={{width:"140px", height:"45px", marginTop:"15px"}}>아이디 확인</button>
            </div>


            <div className='greenTitle'>비밀번호 찾기</div>
            <div className='greenBox' style={{height:"270px"}}>
                <div style={{marginTop:"10px"}}>
                    아이디<br/>
                    <input className='inputText' type="text" placeholder='Enter ID'></input>
                </div>
                <div style={{marginTop:"10px"}}>
                    이메일<br/>
                    <input className='inputText' type="text" placeholder='Enter E-mail'></input>
                </div>
                <button type="submit" className='greenButton' onClick={() => navigate('/PwChange')} style={{width:"140px", height:"45px", marginTop:"15px"}}>비밀번호 확인</button>
            </div>
        </div>
    );
};

export default Find;
