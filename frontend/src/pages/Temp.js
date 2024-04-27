import React, {useEffect, useState} from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';
import TempChart from '../components/TempChart.js';
import axios from 'axios';

function Temp() {

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
            <div style={{position:"absolute"}}>온도 / 습도 정보</div>
            <div><Sidebar /></div>
        </div>
        {/* 페이지 내용 */}
        <div className='body'>
            <div style={{width:"95%", height:"300px", margin:"auto"}}>
                    <TempChart detailData={result} />
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
