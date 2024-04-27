import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu'
import userData from '../userData';
import devcieData from '../deviceData';

const deleteUser = () => {
    // confirm 함수를 사용하여 사용자에게 삭제 확인 요청
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
    
    if (isConfirmed) {
      // 사용자가 '예'를 클릭했을 때의 로직 처리
    console.log('유저 삭제 처리 로직');
      // 여기에 실제 디바이스를 삭제하는 API 호출 등의 작업을 수행
    window.location.reload();
    } else {
      // 사용자가 '아니오'를 클릭했을 때의 로직 처리
    console.log('유저 삭제 취소');
    }
};

const WebUserInfo = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const { id } = useParams(); // useParams 훅을 사용하여 URL 파라미터 접근

    useEffect(() => {
    const selectedUserInfo = userData.find(p => p.id.toString() === id);
    setUserInfo(selectedUserInfo);
    }, [id]);

    if(userInfo)
    return (

        <div className="flex web">
            <Menu />
            <div className='flex'>
                <div className='contents'>
                    <div className="darkTitle" style={{margin:"50px 0 0 90px", width:"300px"}}>
                        회원 상세 정보
                    </div>
                    <div style={{position:"relative", bottom:"50px"}}>
                    <button type="button" className='darkButton' onClick={deleteUser} style={{width:"200px", height:"70px", marginLeft:"1150px"}}>회원 탈퇴</button>
                    <table style={{width:"90%", height:"65%",padding:"30px 10px 20px 10px", margin:"auto", marginTop:"10px"}}>
                        <tr>
                        <th className="tableHeader2">회원 번호</th> <td className="tableData2">{userData[id].id}</td>
                        <th className="tableHeader2">회원 ID</th> <td className="tableData2">{userData[id].loginID}</td>
                        </tr>
                        <tr>
                        <th className="tableHeader2">회원 이름</th> <td className="tableData2">{userData[id].name}</td>
                        <th className="tableHeader2">성별</th> <td className="tableData2">여자</td>
                        </tr>
                        <tr>
                        <th className="tableHeader2">디바이스 ID</th> <td className="tableData2">{devcieData[id].id}</td>
                        <th className="tableHeader2">생년월일</th> <td className="tableData2">{userData[id].birth}</td>
                        </tr>
                        <tr>
                        <th className="tableHeader2">가입 날짜</th> <td className="tableData2">2024-04-05</td>
                        <th className="tableHeader2">계정 상태</th> <td className="tableData2">{userData[id].status}</td>
                        </tr>
                    </table>
                    </div>
                    <button type="button" className='darkButton' onClick={() => navigate(`/WebDeviceInfo/${userData[id].id}`)} style={{width:"300px", height:"100px", margin:"auto"}}>디바이스 상세</button>
                </div>
            </div>
        </div>
    );
};

export default WebUserInfo;