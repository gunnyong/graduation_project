import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function WebFlowerList({ onCheckedItemsChange }) {
    const [result, setResult] = useState([]);
    const [checkedState, setCheckedState] = useState({});

    function convertFilePathToUrl(filePath) {
        const baseUrl = "http://ceprj.gachon.ac.kr:60007";
        const fileName = filePath.split('/').pop();
        const newUrl = `${baseUrl}/${fileName}`;
        
        return newUrl;
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://ceprj.gachon.ac.kr:60007/flowerdata.json');
            setResult(response.data);
            const initialState = response.data.reduce((acc, flower) => {
                acc[flower.id] = false;
                return acc;
            }, {});
            setCheckedState(initialState);
            onCheckedItemsChange(initialState);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // onCheckedItemsChange를 의존성 배열에서 제거

// 체크박스 상태를 업데이트하고 콘솔에 로그하는 함수
const handleCheckboxChange = (id) => {
    setCheckedState(prevState => {
        const newState = {
        ...prevState,
        [id]: !prevState[id]
        };
        console.log(newState);
        return newState;
    });
    };
    

    return (
        <ul style={{ listStyleType:"none", fontSize:"30px", display: "flex", flexWrap: "wrap", padding: 0, overflowY:"auto", scrollbarColor:"gray", maxHeight:"700px", margin:"auto", width:"90%" }}>
            {result && Array.isArray(result) && result.map((flower) => {
                const imageUrl = convertFilePathToUrl(flower.image);
                return (
                
                // 각각의 리스트 항목(<li>)에 대한 스타일
                <li key={flower.id} style={{ width: '50%', boxSizing: 'border-box', padding: '10px', display:"flex" }}>
                    <input type="checkbox" 
                        checked={checkedState[flower.id] ?? false}
                        onChange={() => handleCheckboxChange(flower.id)} style={{ margin: '0 30px 0 70px', transform:"scale(2)" }} />
                    <Link to={`/WebFlowerInfo/${flower.id}`} style={{textDecoration: 'none', display: 'flex', alignItems: 'center', backgroundColor: "white" }}>
                        <div style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
                        <img src={imageUrl} alt={flower.name} style={{ maxWidth: "100px", maxHeight: "100px", marginRight: '30px', float: 'left', padding: "5px" }} />
                        <div>{flower.name}</div>
                        </div>
                    </Link>
                </li>
                )
            })}
        </ul>
    );
}


export default WebFlowerList;
