import React from 'react';
import { useNavigate } from 'react-router-dom';

const PwChange= () => {
    const navigate = useNavigate();

    return (
        <div className='greenBack'>
            <div className='greenTop'>
                비밀번호 변경
            </div>
            <div className='whiteBox marginI' style={{width:"300px", height:"150px", fontSize:"30px", marginTop:"20px !important"}}>
                변경할 비밀번호를<br/>입력해주세요.
            </div>
            <div style={{marginTop:"20px"}}>
                새 비밀번호<br/>
                <input className='inputText' type="text" placeholder='Enter New Password'></input>
            </div>
            <div>
                새 비밀번호 확인<br/>
                <input className='inputText' type="text" placeholder='Enter New Password'></input>
            </div>
            <button type="submit" className='greenButton' onClick={() => navigate('/')} style={{width:"100px", height:"45px"}}>변경</button>
        </div>
    );
};

export default PwChange;
