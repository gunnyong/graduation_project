import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DeviceList() {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]); // Ensure this is always an array

    useEffect(() => {
        // 실제 API 엔드포인트로 변경
        axios.get('http://ceprj.gachon.ac.kr:60007/api/admin/devices')
            .then(response => {
                // Check if response.data is an array before setting the state
                if (Array.isArray(response.data)) {
                    setDevices(response.data); // 결과 데이터를 상태에 저장
                } else {
                    console.error('Expected an array of devices, but received:', response.data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the device data!', error);
            });
    }, []);

    const deleteDevice = (deviceId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            axios.delete(`http://ceprj.gachon.ac.kr:60007/api/devices/${deviceId}`)
                .then(() => {
                    console.log('디바이스가 삭제되었습니다.');
                    setDevices(prevDevices => prevDevices.filter(device => device.device_ID !== deviceId)); // UI에서 삭제
                })
                .catch(error => {
                    console.error('디바이스 삭제 중 오류가 발생했습니다', error);
                });
        } else {
            console.log('디바이스 삭제가 취소되었습니다.');
        }
    };

    return (
        <ul style={{listStyleType:"none", fontSize:"20px", width:"95%", maxHeight:"650px", overflowY:"auto"}}>
            {devices.map((device) => (
                <li key={device.device_ID} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ flex: 1 }}>{device.device_ID}</div>
                    <div style={{ flex: 1 }}>{device.user_ID}</div>
                    <div style={{ flex: 1 }}>{device.name}</div>
                    <div style={{ flex: 1 }}>{device.info}</div>
                    <button className='deviceButton' onClick={() => navigate(`/WebDeviceInfo/${device.device_ID}`)}>상세정보 조회</button>
                    <button className='deviceButton' onClick={() => deleteDevice(device.device_ID)}>삭제</button>
                </li>
            ))}
        </ul>
    );
}

export default DeviceList;
