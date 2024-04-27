import React, {useEffect, useState} from 'react';
import { useNavigate, useRevalidator, useLocation } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function AI() {
    const navigate = useNavigate();

    useEffect(() => {
        sendBleApp();
    },[]);
    function sendBleApp() {
        if (window.BleUse) {
            window.BleUse.postMessage('이 페이지에서 Ble를 사용합니다');
        } else {
            console.error('객체를 찾을 수 없음');
        }
    }
    
    function sendFlowerNameToFlutter(plantName) {
        if (window.sendFlowerName) {
            window.sendFlowerName.postMessage(plantName);
            navigate('/Main');
        } else {
            console.error('객체를 찾을 수 없음');
        }
    }

    // url에서 파라미터 갖고오는 함수
    // function useQuery() {
    //     return new URLSearchParams(useLocation().search);
    //   }
      
    //   function MyComponent() {
    //     let query = useQuery();
    //     let plantId = query.get("plantId");

    //     return plantId;
    //   }


    // // 데이터 베이스 식물 정보 get 요청
    const [result, setResult] = useState([]);
    const [userId, setUserId] = useState([]);

    useEffect(() => {
        const plantId = 39;

        // const plantId = MyComponent();

        axios.get(`http://ceprj.gachon.ac.kr:60007/api/devices/result/${plantId}`)
        .then(response => {
            setResult(response.data); // 서버로부터 받은 데이터를 state에 저장
            console.log(response.data)
        })
        .catch(error => console.log(error));
      }, []); // 컴포넌트가 마운트될 때 요청을 보냄

    useEffect(() => {
        axios.get(`http://ceprj.gachon.ac.kr:60007/api/users/id-info`)
        .then(response => {
            setUserId(response.data); // 서버로부터 받은 데이터를 state에 저장
            console.log(response.data)
        })
        .catch(error => console.log(error));
    }, []); // 컴포넌트가 마운트될 때 요청을 보냄

    function convertFilePathToUrl(filePath) {
        // 기본 웹 서버 주소와 포트 번호
        const baseUrl = "http://ceprj.gachon.ac.kr:60007";
        // 파일 경로에서 파일 이름만 추출하기
        const fileName = filePath.split('/').pop();
        // 새로운 URL 형성
        const newUrl = `${baseUrl}/${fileName}`;
        
        return newUrl;
      }
    // 함수를 호출하여 newUrl 변수에 결과를 저장
    const newUrl = result.photo ? convertFilePathToUrl(result.photo) : '';

    return (
    <div className='mobile'>
        <div className='greenTop'>      
                AI 식물 판별 결과
        </div>
        <div>
            <div className='flex'>
                <img className="greenBox" src={newUrl} alt='Plant' style={{ maxHeight: "130px", maxWidth: "130px", padding: "20px", marginTop: "10px" }} />
                {/* <div>{newUrl}</div> */}
                <img className="greenBox" src={"http://ceprj.gachon.ac.kr:60007/1713798298267-plant.jpg"} alt='Plant2' style={{ maxHeight: "130px", maxWidth: "130px", padding: "20px", marginTop: "10px" }} />
            </div>
            <div style={{position:"relative", bottom:"15px"}}>
                <div className="greenTitle">{result.ai_result}</div>
                <div className='greenBox' style={{ height: "280px" }}>
                <div className="whiteBox" style={{ width: "90%", height: "85%", fontSize: "17pt", overflowY: "auto", scrollbarColor: "gray" }}>
                    식물 상세 설명
                </div>
                </div>
                <div className="flex" style={{marginTop:"10px"}}>
            {/* <button type="button" className='greenButton' onClick={() => navigate('/Main')} style={{ width: "50%", height: "80px", fontSize: "20pt"}}>식물 등록</button> */}
                <button type="button" className='greenButton' onClick={() => sendFlowerNameToFlutter(result.ai_result+','+userId.Id)} style={{ width: "50%", height: "80px", fontSize: "20pt"}}>식물 등록</button>
                <button type="button" className='greyButton' onClick={() => navigate('/FindFlower')} style={{ width: "50%", height: "80px", fontSize: "20px"}}>식물이 틀렸어요.</button>
                </div>
            </div>
            </div>
    </div>
    );
}

export default AI;
