import React, { useEffect, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Device = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 컴포넌트가 마운트 되었을 때, 디바이스 등록 여부를 확인합니다.
        const checkUserDevice = async () => {
            try {
                // 백엔드 API 엔드포인트를 호출하여 디바이스 등록 여부를 확인합니다.
                const response = await axios.get('http://ceprj.gachon.ac.kr:60007/api/devices/check-device');
                if (response.data.hasDevice) {
                    // 등록된 디바이스가 있다면 사용자의 대시보드로 리디렉션합니다.
                    navigate('/Flower');
                } else {
                    // 등록된 디바이스가 없다면 로딩 상태를 해제합니다.
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error checking the device:', error);
                setIsLoading(false); // 에러가 발생하면 로딩 상태를 해제합니다.
            }
        }
        
        checkUserDevice()
    }, [navigate])

    if (isLoading) {
        return <div>Loding...</div>
    }

    return (
        <div className='greenBack mobile'>
            <img src="/images/main_art_no.png" alt="자연 지능 화단 로고"  style={{marginBottom:"15px"}}/>
            <div className='whiteBox green3' style={{fontSize:"30pt", fontWeight:"bold", width:"300px", height:"70px"}}>
                자연 지능 화단
            </div>
            <div>
            <div className='greenTitle'>      
                기기 등록
            </div>
            <div className='whiteBox' style={{width:"310px", height:"170px", fontSize:"17pt"}}>      
                등록된 디바이스가 없습니다.<br/><br/>
                블루투스 연결을 진행해주세요.
            </div>
            </div>
            <div>
                <button type="button" className='greenButton' onClick={() => navigate('/Bluetooth')} style={{width:"140px", height:"55px"}}>블루투스 찾기</button>
            </div>
        </div>
    );
};

export default Device;
