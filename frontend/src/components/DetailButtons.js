import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetailButtons = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex" style={{marginTop:"10px"}}>
                <button type="button" className='greenButton' onClick={() => navigate('/Temp')} style={{ width: "25%", height: "80px", fontSize: "20px"}}>온도<br/>/습도</button>
                <button type="button" className='greenButton' onClick={() => navigate('/Main')} style={{ width: "25%", height: "80px", fontSize: "20px"}}>LED</button>
                <button type="button" className='greenButton' onClick={() => navigate('/Main')} style={{ width: "25%", height: "80px", fontSize: "20px"}}>급수<br/>/수위</button>
                <button type="button" className='greenButton' onClick={() => navigate('/Main')} style={{ width: "25%", height: "80px", fontSize: "20px"}}>토양 습도</button>
            </div>
        </div>
    );
};

export default DetailButtons;