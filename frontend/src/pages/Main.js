import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';
import axios from 'axios';


function Main() {

    // const [flower, setFlower] = useState(null);
    // const { id } = useParams(); // useParams 훅을 사용하여 URL 파라미터 접근
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.get('http://ceprj.gachon.ac.kr:60007/maindata.json')
            .then(response => {
                const main = response.data[0];
                setResult(main); // 먼저 결과를 상태에 저장
                // const selectedFlower = flowers.find(p => p.id.toString() === id); // 업데이트된 결과를 바탕으로 선택된 식물을 찾음
                // setFlower(selectedFlower); // 선택된 식물 상태를 업데이트
                // console.log(selectedFlower);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []); // id가 변경될 때마다 이 useEffect가 실행되어야 하므로, 의존성 배열에 id를 추가
    
    // 이미지 경로를 URL로 변환하는 함수
    function convertFilePathToUrl(filePath) {
        const baseUrl = "http://ceprj.gachon.ac.kr:60007";
        const fileName = filePath.split('/').pop();
        const newUrl = `${baseUrl}/${fileName}`;
        
        return newUrl;
    }

    const imageUrl = result.image ? convertFilePathToUrl(result.image) : '';

    return (
    <div className="mobile">
        {/* 페이지 타이틀 */}
        <div className='greenTop flex' style={{textAlign:"left", textIndent:"10px", justifyContent:"space-between"}}>      
            <div style={{}}>{result.name}의 디바이스</div>
            <div><Sidebar /></div>
        </div>
        {/* 페이지 내용 */}
        <div className='body'>
            <img className="greenBox" src={imageUrl} alt={result.flowerName} style={{ maxHeight: "130px", maxWidth: "130px", padding: "20px", marginTop: "10px", position:"relative", top:'10px' }} />
            <div className="greenTitle">{result.flowerName}</div>
            <div className='greenBox' style={{ height: "250px", border:"none", borderRadius:"20" }}>
            <table style={{width:"100%", height:"100%",padding:"30px 10px 20px 10px", margin:"auto", marginTop:"10px"}}>
                    <tr>
                    <th className="tableHeader" style={{width:"70px"}}>온도</th> <td className="tableData">{result.temp}℃</td>
                    <th className="tableHeader" style={{width:"70px"}}>습도</th> <td className="tableData">{result.hum}%</td>
                    </tr>
                    <tr>
                    <th className="tableHeader">토양 습도</th> <td className="tableData">{result.soil}%</td>
                    <th className="tableHeader">수위</th> <td className="tableData">{result.water}%</td>
                    </tr>
                    <tr style={{height:"65px"}}>
                    <th className="tableHeader">최근 급수<br/>내역</th> <td className="tableData">{result.waterLog}</td>
                    <th className="tableHeader">자동 관리<br/>시스템</th> <td className="tableData">{result.status}</td>
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
