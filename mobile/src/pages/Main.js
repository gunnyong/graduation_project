import React from 'react';
import flowerData from '../flowerData.js'; // 식물 데이터 불러오기
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';

function Main() {

    return (
    <div className="mobile">
        {/* 페이지 타이틀 */}
        <div className='greenTop flex' style={{textAlign:"left", textIndent:"10px"}}>      
            <div style={{position:"absolute"}}>복순의 디바이스</div>
            <div><Sidebar /></div>
        </div>
        {/* 페이지 내용 */}
        <div className='body'>
            <img className="greenBox" src={flowerData[0].image} alt={flowerData[0].name} style={{ maxHeight: "130px", maxWidth: "130px", padding: "20px", marginTop: "10px", position:"relative", top:'10px' }} />
            <div className="greenTitle">{flowerData[0].name}</div>
            <div className='greenBox' style={{ height: "250px", border:"none", borderRadius:"20" }}>
            <table style={{width:"100%", height:"100%",padding:"30px 10px 20px 10px", margin:"auto", marginTop:"10px"}}>
                    <tr>
                    <th className="tableHeader" style={{width:"70px"}}>온도</th> <td className="tableData">25℃</td>
                    <th className="tableHeader" style={{width:"70px"}}>습도</th> <td className="tableData">70%</td>
                    </tr>
                    <tr>
                    <th className="tableHeader">토양 습도</th> <td className="tableData">70%</td>
                    <th className="tableHeader">수위</th> <td className="tableData">33%</td>
                    </tr>
                    <tr style={{height:"65px"}}>
                    <th className="tableHeader">최근 급수<br/>내역</th> <td className="tableData">04/26<br/>09:36</td>
                    <th className="tableHeader">자동 관리<br/>시스템</th> <td className="tableData">On</td>
                    </tr>
                </table>
            </div>
        </div>
        {/* 하단 버튼 */}
        <DetailButtons />
    </div>
    );
}

export default Main;
