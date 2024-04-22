import React from 'react';
import { useNavigate } from 'react-router-dom';
import deviceData from '../deviceData';

const deleteDevice = () => {
    // confirm 함수를 사용하여 사용자에게 삭제 확인 요청
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
    
    if (isConfirmed) {
      // 사용자가 '예'를 클릭했을 때의 로직 처리
    console.log('디바이스 삭제 처리 로직');
      // 여기에 실제 디바이스를 삭제하는 API 호출 등의 작업을 수행
    window.location.reload();
    } else {
      // 사용자가 '아니오'를 클릭했을 때의 로직 처리
    console.log('디바이스 삭제 취소');
    }
};

function DeviceList() {
    const navigate = useNavigate();

    return (
    <li style={{listStyleType:"none", fontSize:"20px", width:"95%", maxHeight:"650px", overflowY:"auto"}}>
        {deviceData.map((device) => (
        <li key={device.id}>
            <div className="linkBorder" to={`/WebDeviceInfo/${device.id}`}
                style={{ borderCollapse:"collapse", marginLeft:"30px", width:"97%", textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', backgroundColor:"white", fontSize:"32px"}}>
                <div className="userContent">{device.id}</div>
                <div className="userContent">{device.userName}</div>
                <div className="userContent">{device.flower}</div>
                <div className="userContent">{device.status}</div>
                <button className='deviceButton' style={{width:"270px", margin:"0 10px 0 10px"}} onClick={() => navigate(`/WebDeviceInfo/${device.id}`)}>상세정보 조회</button>
                <button className='deviceButton' style={{width:"120px"}} onClick={deleteDevice}>삭제</button>
            </div>
        </li>
    ))}
    </li>
    );
}

export default DeviceList;