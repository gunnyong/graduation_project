import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FlowerList() {
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.get('http://ceprj.gachon.ac.kr:60007/flowerdata.json')
            .then(response => {
                console.log(response.data); 
                setResult(response.data);
            })
            .catch(error => {
                // 에러 처리
                console.error('There was an error!', error);
            });
    }, []); // 컴포넌트가 마운트될 때 요청을 보냄

    // 이미지 경로를 URL로 변환하는 함수
    function convertFilePathToUrl(filePath) {
        const baseUrl = "http://ceprj.gachon.ac.kr:60007";
        const fileName = filePath.split('/').pop();
        const newUrl = `${baseUrl}/${fileName}`;
        return newUrl;
    }

    return (
        <li style={{ listStyleType:"none", fontSize:"20px", width:"100%", maxHeight:"455px", overflowY:"auto", scrollbarColor:"gray"}}>
        {result && Array.isArray(result) && result.map((flower) => {
            const imageUrl = flower && flower.image ? convertFilePathToUrl(flower.image) : '';
            return (
                <li key={flower.id}>
                    <Link to={`/FlowerInfo/${flower.id}`} style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', backgroundColor:"white"}}>
                        <img src={imageUrl} alt={flower.name} style={{ maxWidth: "60px", maxHeight: "60px", marginRight: '15px', float: 'left', padding:"5px"}} />
                        <div>{flower.name}</div>
                    </Link>
                </li>
            )
        })}
        </li>
    );
}

export default FlowerList;
