import React from 'react';
import { Link } from 'react-router-dom';
import flowerData from '../flowerData'; // 식물 데이터 불러오기

function FlowerList2() {

    return (
    <li style={{ listStyleType:"none", fontSize:"20px", width:"100%", maxHeight:"455px", overflowY:"auto", scrollbarColor:"gray"}}>
        {flowerData.map((flower) => (
        <li key={flower.id}>
            <Link to={`/FlowerDetail/${flower.id}`} style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', backgroundColor:"white"}}>
                <img src={flower.image} alt={flower.name} style={{ maxWidth: "60px", maxHeight: "60px", marginRight: '15px', float: 'left', padding:"5px"}} />
                <div>{flower.name}</div>
            </Link>
        </li>
    ))}
    </li>
    );
}

export default FlowerList2;