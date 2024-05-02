import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://ceprj.gachon.ac.kr:60007/api/admin/users')
            .then(response => {
                console.log(response.data); 
                setUsers(response.data);
            })
            .catch(error => {
                // 에러 처리
                console.error('There was an error!', error);
            });
    }, []); // 컴포넌트가 마운트될 때 요청을 보냄

    const extractT = (datetimeString) => {
        const newBirth = datetimeString.split('T')[0];
        return newBirth;
      };

    return (
        <ul style={{listStyleType:"none", fontSize:"20px", width:"97%", maxHeight:"650px", overflowY:"auto"}}>
            {users.map((user) => (
                <li key={user.user_ID} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Link className="linkBorder" to={`/WebUserInfo/${user.user_ID}`}
                    style={{ borderCollapse:"collapse", marginLeft:"30px", width:"97%", textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', backgroundColor:"white", fontSize:"32px"}}>
                        <div className="userContent">{user.user_ID}</div>
                        <div className="userContent">{user.name}</div>
                        <div className="userContent">{extractT(user.birth)}</div>
                        <div className="userContent">{user.device_ID ? user.device_ID : 'None'}</div>
                        <div className="userContent">{user.status}</div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default UserList;
