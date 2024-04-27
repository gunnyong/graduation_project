import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userData from '../userData'; // 식물 데이터 불러오기
import axios from 'axios';

function UserList() {

    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.get('http://ceprj.gachon.ac.kr:60007/userdata.json')
            .then(response => {
                console.log(response.data); 
                setResult(response.data);
            })
            .catch(error => {
                // 에러 처리
                console.error('There was an error!', error);
            });
    }, []); // 컴포넌트가 마운트될 때 요청을 보냄

    return (
    <li style={{listStyleType:"none", fontSize:"20px", width:"97%", maxHeight:"650px", overflowY:"auto"}}>
        {result && Array.isArray(result) && result.map((user) => {
        return(
        <li key={user.loginID}>
            <Link className="linkBorder" to={`/WebUserInfo/${user.loginID}`}
                style={{ borderCollapse:"collapse", marginLeft:"30px", width:"97%", textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', backgroundColor:"white", fontSize:"32px"}}>
                <div className="userContent">{user.loginID}</div>
                <div className="userContent">{user.name}</div>
                <div className="userContent">{user.birth}</div>
                <div className="userContent">{user.deviceID}</div>
                <div className="userContent" style={{marginRight:"0px"}}>{user.status}</div>
            </Link>
        </li>
            )
        })}
    </li>
    );
}

export default UserList;