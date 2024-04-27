import React from 'react';
import flowerData from '../flowerData.js';
import '../App.css';
import Sidebar from '../components/Sidebar.js';
import DetailButtons from '../components/DetailButtons.js';

function Main() {

    return (
    <div className="mobile">
        <div className='greenTop flex' style={{textAlign:"left", textIndent:"10px"}}>      
            <div style={{position:"absolute"}}>복순의 디바이스</div>
        <div>
        <Sidebar />
        </div>
        </div>
        <div className='flex'>
            <img className="greenBox" src={flowerData[0].image} alt={flowerData[0].name} style={{ maxHeight: "130px", maxWidth: "130px", padding: "20px", marginTop: "10px" }} />
        </div>
        <div style={{position:"relative", bottom:"15px"}}>
            <div className="greenTitle">{flowerData[0].name}</div>
            <div className='greenBox' style={{ height: "280px" }}>
                <div className="whiteBox" style={{ width: "90%", height: "85%", fontSize: "17pt", overflowY: "auto", scrollbarColor: "gray" }}>
                나의 식물 상태표</div>
            </div>
        <DetailButtons />
        </div>
    </div>
    );
}

export default Main;
