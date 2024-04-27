import React from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';
import WaterChart from '../components/WaterChart.js';

function Water() {

    const detailData = [
        { time: '10:00', value: 90},
        { time: '11:00', value: 85},
        { time: '12:00', value: 60},
        { time: '13:00', value: 80},
        { time: '14:00', value: 70},
        { time: '15:00', value: 50},
        { time: '16:00', value: 30},
        { time: '17:00', value: 60},
      // 더 많은 데이터...
    ];

    return (
        <div className="mobile">
        {/* 페이지 타이틀 */}
        <div className='greenTop flex' style={{textAlign:"left", textIndent:"10px"}}>
            <div style={{position:"absolute"}}>급수 / 수위 정보</div>
            <div><Sidebar /></div>
        </div>
        {/* 페이지 내용 */}
        <div className='body'>
            <div style={{width:"95%", height:"170px", margin:"auto"}}>
                    <WaterChart detailData={detailData} />
            </div>
            <div style={{position:"relative", bottom:"25px"}}>
                <div className="greenTitle" style={{width:"230px",height:"40px", top:"20px"}}>최근 급수 내역 / 현재 수위</div>
                <div className='greenBox' style={{ height: "110px", marginBottom:"15px" }}>
                    <table style={{width:"100%", height:"100%",padding:"25px 20px 15px 20px", margin:"auto"}}>
                        <tr>
                        <th className="tableHeader" style={{width:"75px"}}>최근 급수<br/>내역</th> <td className="tableData">04/26<br/>09:36</td>
                        <th className="tableHeader" style={{width:"60px"}}>수위</th> <td className="tableData">33%</td>
                        </tr>
                    </table>
                </div>
                <div style={{position:"relative", bottom:"20px"}}>
                    <div className="greenTitle" style={{height:"40px", top:"20px"}}>작동 로그</div>
                    <div className='greenBox' style={{ height: "140px" }}>
                    <div className="whiteBox" style={{ width:"90%", height:"85%", fontSize:"17pt", overflowY:"auto", scrollbarColor:"gray"}}>
                        급수 작동 로그</div>
                    </div>
                </div>
                <div style={{position:"relative", bottom:"5px"}}>
                    {/* 하단 버튼 */}
                    <DetailButtons />
                </div>
            </div>
        </div>
    </div>
    );
}

export default Water;
