import React from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';

function DeviceInfo() {

    return (
        <div className="mobile">
        {/* 페이지 타이틀 */}
        <div className='greenTop flex' style={{textAlign:"left", textIndent:"10px"}}>
            <div style={{position:"absolute"}}>디바이스 상세 정보</div>
            <div><Sidebar /></div>
        </div>
        {/* 페이지 내용 */}
        <div className='body'>
            <div style={{marginBottom:"35px"}}>
                <div className="greenTitle">디바이스 스펙</div>
                <div className='greenBox' style={{ height: "430px" }}>
                    <table style={{width:"100%", height:"100%",padding:"40px 20px 20px 20px", margin:"auto"}}>
                        <tr>
                        <th className="tableHeader">디바이스 ID</th> <td className="tableData">01</td>
                        </tr>
                        <tr>
                        <th className="tableHeader">현재 상태</th> <td className="tableData">정상</td>
                        </tr>
                        <tr>
                        <th className="tableHeader">제품 종류</th> <td className="tableData">미니 화단2</td>
                        </tr>
                        <tr>
                        <th className="tableHeader">디바이스 크기</th> <td className="tableData">2500x3000</td>
                        </tr>
                        <tr>
                        <th className="tableHeader">하드웨어</th> <td className="tableData">라즈베리 파이</td>
                        </tr>
                        <tr>
                        <th className="tableHeader">OS 버전</th> <td className="tableData">ver.1.0.1</td>
                        </tr>
                        <tr>
                        <th className="tableHeader">모듈 종류</th> <td className="tableData">온/습도, 급수,<br/>토양 습도, 팬, 가습기</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        {/* 하단 버튼 */}
        <DetailButtons />
    </div>
    );
}

export default DeviceInfo;
