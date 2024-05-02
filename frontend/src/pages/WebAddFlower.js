import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '../components/Menu'

const WebAddFlower = () => {

    const navigate = useNavigate();
    const [newFlowerName, setNewFlowerName] = useState('');
    const [newFlowerType, setNewFlowerType] = useState('');
    const [newFlowerImage, setNewFlowerImage] = useState('');
    const [newFlowerInfo, setNewFlowerInfo] = useState('');

    const handleNewFlowerName = (event) => {
        setNewFlowerName(event.target.value);
    };

    const handleNewFlowerType = (event) => {
        setNewFlowerType(event.target.value);
    };

    const handleNewFlowerInfo = (event) => {
        setNewFlowerInfo(event.target.value);
    };

    const handleAddFlower = async () => {

        try {
            const response = await axios.post('http://ceprj.gachon.ac.kr:60007/api/', {
                newFlowerName,
                newFlowerType,
                newFlowerImage,
                newFlowerInfo
            });
            alert('식물 데이터가 추가되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('식물 데이터 추가 실패', error);
            alert('식물 데이터 추가 실패');
        }
    };

    const [previewUrl, setPreviewUrl] = useState('/images/image.png');
    // 이미지 파일을 선택했을 때 호출될 핸들러 함수입니다.
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // 선택된 파일을 가져옵니다.
        if (file) {
        // FileReader API를 사용하여 파일을 읽습니다.
        const reader = new FileReader();
        reader.onloadend = () => {
            // 파일 읽기가 완료되면, 상태를 업데이트합니다.
            setNewFlowerImage(file);
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };


    return (
    <div className="flex web">
        <Menu />
    <div className='contents'>
            <div className="darkTitle" style={{width:"300px"}}>
                식물 데이터 추가
            </div>

        <div style={{position:"relative", bottom:"90px"}}>
            <button type="submit" className='darkButton' onClick={handleAddFlower} style={{ width:"220px", height:"80px", fontSize:"35px", float:"right", margin:"0 60px 15px 0"}}>추가하기</button>
        <div className="flex" style={{backgroundColor:"lightgrey", width:"90%", padding:"20px", border:"none", borderRadius:"20px", height:"70%"}}>
            {/* 왼쪽 */}
            <div style={{width:"50%", margin:"auto", height:"100%"}}>
                {/* 이미지 선택 */}
                <div style={{fontSize:"40px", textAlign:"left"}}>
                    식물 이미지
                </div>
                    <input type="file" onChange={handleImageChange} style={{fontSize:"40px",marginTop:"20px"}}/>
                        <div style={{ marginTop: '20px' }}>
                        <img src={previewUrl} alt="Preview" style={{ width: '300px', maxHeight: '300px' }} />
                </div>
                <div>
                    <div style={{fontSize:"40px", textAlign:"left", marginTop:"50px"}}>
                    식물 이름
                    </div>
                    <input className='webInputText' type="text" value={newFlowerName} onChange={handleNewFlowerName} placeholder='식물 이름을 입력하세요.' style={{fontSize:"30px", height:"80px"}}></input>
                </div>
                <div style={{marginTop:"30px"}}>
                    <div style={{fontSize:"40px", textAlign:"left"}}>
                    식물 종류
                    </div>
                    <input className='webInputText' type="text" value={newFlowerType} onChange={handleNewFlowerType} placeholder='식물 종류를 입력하세요.' style={{fontSize:"30px", height:"80px"}}></input>
                </div>
                <div>

            </div>
            </div>
            {/* 오른쪽 */}
            <div style={{width:"50%", margin:"auto", height:"100%"}}>
                <div style={{fontSize:"40px", textAlign:"left"}}>
                식물 상세 정보
                </div>
                <textarea className='webInputText' type="text" value={newFlowerInfo} onChange={handleNewFlowerInfo} placeholder='식물 상세 정보를 입력하세요.' style={{height:"100px", width:"90%", resize:"none", fontSize:"30px", paddingTop:"20px"}}></textarea>
            </div>
        </div>
        </div>
    </div>
    </div>
    );
};

export default WebAddFlower;