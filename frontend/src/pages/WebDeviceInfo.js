import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../components/Menu'
import axios from 'axios';

const WebDeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState([]);
    const { id } = useParams(); // useParams 훅을 사용하여 URL 파라미터 접근

    useEffect(() => {
        axios.get(`http://ceprj.gachon.ac.kr:60007/api/admin/devices/${id}`)
            .then(response => {
                if (response.data && !Array.isArray(response.data)) {
                    // Assuming the response is an object directly containing the device data
                    setDeviceInfo(response.data);
                    console.log(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the device data:', error);
            });
    }, [id]); // id가 변경될 때마다 이 useEffect가 실행되어야 하므로, 의존성 배열에 id를 추가

    return (
        <div className="flex web">
            <Menu />
            <div className='flex'>
                <div className='contents'>
                    <div className="darkTitle" style={{margin:"50px 0 0 90px", width:"360px"}}>
                        디바이스 상세 정보
                    </div>
                    <div style={{position:"relative", bottom:"50px"}}>
                    <button type="button" className='darkButton' style={{width:"330px", height:"70px", marginLeft:"1050px"}}>모듈 상세 정보 조회</button>
                
                <div className='flex' style={{marginTop:"30px"}}>
                    {/* 촬영한 식물 이미지 */}
                    <img className="greyBox" src={'/images/image.png'} alt={'촬영한 식물 사진'} style={{ height: "350px", width: "350px", padding: "20px", margin:"0 120px 0 130px"}} />
                    {/* 디바이스 스펙 */}
                    <div style={{backgroundColor:"#F5F5F5", width:"55%", border:"none", borderRadius:"10px"}}>
                        <div className="darkTitle" style={{margin:"20px 0 10px 10px", width:"200px", fontSize:"30px", height:"80px"}}>
                            디바이스 스펙
                        </div>
                        <table style={{width:"100%", height:"65%",padding:"10px 10px 20px 10px", margin:"auto", marginTop:"0px"}}>
                            <tr>
                            <th className="tableHeader3">디바이스 ID</th> <td className="tableData3">{deviceInfo.device_ID}</td>
                            <th className="tableHeader3">사용자 ID</th> <td className="tableData3">{deviceInfo.user_ID}</td>
                            </tr>
                            <tr>
                            <th className="tableHeader3">디바이스 이름</th> <td className="tableData3">{deviceInfo.name}</td>
                            <th className="tableHeader3">기기 정보</th> <td className="tableData3">{deviceInfo.info}</td>
                            </tr>
                            <tr>
                            <th className="tableHeader3">MAC 주소</th> <td className="tableData3" colSpan="3">{deviceInfo.mac}</td>
                            </tr>
                        </table>
                    </div>
                    </div>
                </div>
                <div className='flex' style={{marginLeft:"95px"}}>
                {/* 화단 상세 쩡보 */}
                <div style={{backgroundColor:"#F5F5F5", width:"47%", border:"none", borderRadius:"10px", height:"350px"}}>
                        <div className="darkTitle" style={{margin:"20px 0 10px 10px", width:"300px", fontSize:"30px", height:"70px"}}>
                            화단 상세 정보
                        </div>
                        <table style={{width:"100%", height:"65%",padding:"10px 10px 20px 10px", margin:"auto", marginTop:"0px"}}>
                            <tr>
                            <th className="tableHeader3">온도</th> <td className="tableData3">25℃</td>
                            <th className="tableHeader3">습도</th> <td className="tableData3">55%</td>
                            </tr>
                            <tr>
                            <th className="tableHeader3">토양 습도</th> <td className="tableData3">70%</td>
                            <th className="tableHeader3">수위</th> <td className="tableData3">50%</td>
                            </tr>
                            <tr>
                            <th className="tableHeader3">최근 급수 내역</th> <td  style={{width:"190px"}} className="tableData3">04/26 09:35</td>
                            <th className="tableHeader3">자동 관리 시스템</th> <td className="tableData3">On</td>
                            </tr>
                        </table>
                </div>
                {/* 자동모드 상세 설정 */}
                <div style={{backgroundColor:"#F5F5F5", width:"45.5%", border:"none", borderRadius:"10px", marginLeft:"50px", height:"350px"}}>
                        <div className="darkTitle" style={{margin:"20px 0 10px 10px", width:"300px", fontSize:"30px", height:"70px"}}>
                            자동 모드 상세 설정
                        </div>
                        <table style={{width:"100%", height:"65%",padding:"10px 10px 20px 10px", margin:"auto", marginTop:"0px"}}>
                            <tr>
                            <th className="tableHeader3">적정 온도</th> <td className="tableData3">19℃~25℃</td>
                            <th className="tableHeader3">습도</th> <td className="tableData3">30%~55%</td>
                            </tr>
                            <tr>
                            <th className="tableHeader3">LED 세기</th> <td className="tableData3">70%</td>
                            <th className="tableHeader3">급수 세기</th> <td className="tableData3">보통</td>
                            </tr>
                        </table>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default WebDeviceInfo;