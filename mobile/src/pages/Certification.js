import React from 'react';
import { useNavigate } from 'react-router-dom';

const Certification= () => {
    const navigate = useNavigate();

    return (
        <div className='greenBack'>
            <div className='greenTop'>
                인증 화면
            </div>
            <div className='whiteBox marginI' style={{width:"300px", height:"150px", fontSize:"30px", marginTop:"20px !important"}}>
                비밀번호를 입력해<br/>인증을 진행해주세요.
            </div>
            <div style={{marginTop:"20px"}}>
                비밀번호<br/>
                <input className='inputText' type="text" placeholder='Enter Password'></input>
            </div>
            <button type="submit" className='greenButton' onClick={() => navigate('/PwChange')} style={{width:"100px", height:"45px"}}>인증</button>
        </div>
    );
};

export default Certification;
