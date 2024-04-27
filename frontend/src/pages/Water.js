import React, {useEffect, useState} from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';
import axios from 'axios';
import WaterChart from '../components/WaterChart.js';

function Water() {

    const [result, setResult] = useState([]);
    
    useEffect(() => {
        axios.get('http://ceprj.gachon.ac.kr:60007/tempdata.json')
        .then(response => {
            console.log(response.data); 
            setResult(response.data); // 서버로부터 받은 데이터를 state에 저장
        })
        .catch(error => console.log(error));
      }, []); // 컴포넌트가 마운트될 때 요청을 보냄

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
                    <WaterChart detailData={result} />
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
