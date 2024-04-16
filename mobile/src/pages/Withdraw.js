import React from 'react';
import { useNavigate } from 'react-router-dom';

const Withdraw= () => {
    const navigate = useNavigate();

    return (
        <div className='greenBack'>
            <div className='greenTop'>
                회원 탈퇴
            </div>
            <div className='whiteBox marginI' style={{width:"300px", height:"150px", fontSize:"30px", marginTop:"20px !important"}}>
                자연 지능 화단을<br/>이용해주셔서<br/>감사합니다
            </div>
            <div style={{marginTop:"20px"}}>
                아이디<br/>
                <input className='inputText' type="text" placeholder='Enter ID'></input>
            </div>
            <div>
                비밀번호<br/>
                <input className='inputText' type="text" placeholder='Enter Password'></input>
            </div>
            <button type="submit" className='greenButton' onClick={() => navigate('/')} style={{width:"100px", height:"45px", marginTop:"10px"}}>탈퇴</button>
        </div>
    );
};

export default Withdraw;
