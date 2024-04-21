import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceName= () => {
    const navigate = useNavigate();

    return (
        <div className='greenBack mobile'>
            <div className='greenTop'>
                디바이스명 변경
            </div>
            <div className='whiteBox marginI' style={{width:"300px", height:"250px", fontSize:"25px", marginTop:"20px !important"}}>
                변경할 디바이스명을<br/>입력해주세요.<br/><br/>디바이스명은 메인화면<br/>좌측 상단에 표시됩니다.
            </div>
            <div style={{marginTop:"20px"}}>
                새 디바이스 명<br/>
                <input className='inputText' type="text" placeholder='Enter New Name'></input>
            </div>
            <button type="submit" className='greenButton' onClick={() => navigate('/main')} style={{width:"100px", height:"45px"}}>변경</button>
        </div>
    );
};

export default DeviceName;
