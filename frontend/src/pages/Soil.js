import React from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';
import SoilChart from '../components/SoilChart.js';

function Soil() {

    const detailData = [
        { time: '10:00', value: 60},
        { time: '11:00', value: 62},
        { time: '12:00', value: 50},
        { time: '13:00', value: 41},
        { time: '14:00', value: 42},
        { time: '15:00', value: 65},
        { time: '16:00', value: 53},
        { time: '17:00', value: 61},
      // 더 많은 데이터...
    ];

    return (
        <div className="mobile">
        {/* 페이지 타이틀 */}
        <div className='greenTop flex' style={{textAlign:"left", textIndent:"10px"}}>
            <div style={{position:"absolute"}}>토양 습도 정보</div>
            <div><Sidebar /></div>
        </div>
        {/* 페이지 내용 */}
        <div className='body'>
            <div style={{width:"95%", height:"300px", margin:"auto"}}>
                    <SoilChart detailData={detailData} />
            </div>
            <div style={{position:"relative", bottom:"15px"}}>
                <div className="greenTitle">현재 토양 습도</div>
                <div className='greenBox' style={{ height: "120px", marginBottom:"15px" }}>
                    <table style={{width:"100%", height:"100%",padding:"35px 20px 20px 20px", margin:"auto"}}>
                        <tr>
                        <th className="tableHeader" style={{width:"110px"}}>현재 토양 습도</th> <td className="tableData">62%</td>
                        </tr>
                    </table>
                </div>
            </div>
            {/* 하단 버튼 */}
            <DetailButtons />
        </div>
    </div>
    );
}

export default Soil;
