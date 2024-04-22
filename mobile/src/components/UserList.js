import React from 'react';
import { Link } from 'react-router-dom';
import userData from '../userData'; // 식물 데이터 불러오기

function UserList() {

    return (
    <li style={{listStyleType:"none", fontSize:"20px", width:"97%", maxHeight:"650px", overflowY:"auto"}}>
        {userData.map((user) => (
        <li key={user.id}>
            <Link className="linkBorder" to={`/WebUserInfo/${user.id}`}
                style={{ borderCollapse:"collapse", marginLeft:"30px", width:"97%", textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', backgroundColor:"white", fontSize:"32px"}}>
                <div className="userContent">{user.id}</div>
                <div className="userContent">{user.name}</div>
                <div className="userContent">{user.loginID}</div>
                <div className="userContent">{user.birth}</div>
                <div className="userContent">{user.deviceID}</div>
                <div className="userContent" style={{marginRight:"0px"}}>{user.status}</div>
            </Link>
        </li>
    ))}
    </li>
    );
}

export default UserList;