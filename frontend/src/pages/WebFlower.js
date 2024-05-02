import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu'
import axios from 'axios';
import WebFlowerList from '../components/WebFlowerList';

const WebFlower = () => {
    const navigate = useNavigate();
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckedItemsChange = (newCheckedState) => {
        setCheckedItems(newCheckedState);
    };

    const deleteCheckedItems = () => {
        // 체크된 항목을 기반으로 필터링하여 삭제 로직 구현
        console.log('삭제할 아이템:', checkedItems);
        // 실제 삭제 로직은 여기에 구현
    };

    return (
        <div className="flex web">
            <Menu />
            <div className='flex'>
                <div className='contents'>
                    <div className="darkTitle" style={{margin:"50px 0 0 90px", width:"330px"}}>
                        식물 데이터 관리
                    </div>
                    <div style={{display:"flex", float:"right"}}>
                        <button type="button" className='darkButton' onClick={() => navigate('/WebAddFlower')} style={{width:"250px", height:"70px"}}>식물 데이터 추가</button>
                        <button type="button" className='darkButton' onClick={deleteCheckedItems} style={{width:"200px", height:"70px", margin:"0 70px 30px 50px"}}>데이터 삭제</button>
                    </div>
                    <form className='webSearch' style={{margin:"auto"}}>
                        <input style ={{width:"90%", height:"60%", border:"none", borderRadius:"10px", paddingLeft:"10px", fontFamily:"main_font", fontSize:"30px"}}
                            type="text"
                            placeholder="검색하기"
                        />
                        <button style ={{width:"10%", height:"100%", fontFamily:"main_font", fontSize:"30px", marginLeft:"20px"}} type="submit">검색</button>
                    </form>
                    <WebFlowerList onCheckedItemsChange={handleCheckedItemsChange}/>
                </div>
            </div>
        </div>
    );
};

export default WebFlower;