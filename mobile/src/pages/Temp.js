import React from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';
import TempChart from '../components/TempChart.js';

function Temp() {

    const detailData = [
        { time: '10:00', value: 60, anotherValue:20 },
        { time: '11:00', value: 62, anotherValue:19 },
        { time: '12:00', value: 50, anotherValue:15 },
        { time: '13:00', value: 41, anotherValue:12 },
        { time: '14:00', value: 42, anotherValue:22 },
        { time: '15:00', value: 65, anotherValue:14 },
        { time: '16:00', value: 53, anotherValue:11 },
        { time: '17:00', value: 61, anotherValue:17 },
      // 더 많은 데이터...
    ];

    return (
        <div className="mobile">
        {/* 페이지 타이틀 */}
        <div className='greenTop flex' style={{textAlign:"left", textIndent:"10px"}}>
            <div style={{position:"absolute"}}>온도 / 습도 정보</div>
            <div><Sidebar /></div>
        </div>
        {/* 페이지 내용 */}
        <div className='body'>
            <div style={{width:"95%", height:"300px", margin:"auto"}}>
                    <TempChart detailData={detailData} />
            </div>
            <div style={{position:"relative", bottom:"15px"}}>
                <div className="greenTitle">현재 온도 / 습도</div>
                <div className='greenBox' style={{ height: "120px", marginBottom:"15px" }}>
                    <table style={{width:"100%", height:"100%",padding:"35px 20px 20px 20px", margin:"auto"}}>
                        <tr>
                        <th className="tableHeader">온도</th> <td className="tableData">25℃</td>
                        <th className="tableHeader">습도</th> <td className="tableData">55%</td>
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

export default Temp;
