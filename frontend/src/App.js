import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// 모바일
import Login from './pages/Login';
import Device from './pages/Device';
import Flower from './pages/Flower';
import Bluetooth from './pages/Bluetooth';
import Register from './pages/Register';
import Find from './pages/Find';
import FindFlower from './pages/FindFlower';
import FlowerInfo from './pages/FlowerInfo';
import AI from './pages/AI';
import Main from './pages/Main';
import ChangePassword from './pages/ChangePassword';
import Withdraw from './pages/Withdraw';
import DeviceInfo from './pages/DeviceInfo';
import SupportFlower from './pages/SupportFlower';
import FlowerDetail from './pages/FlowerDetail';
import DeviceName from './pages/DeviceName';
import Temp from './pages/Temp';
import Soil from './pages/Soil';
import Water from './pages/Water';

// 웹
import WebLogin from './pages/WebLogin';
import WebMain from './pages/WebMain';
import WebInquiry from './pages/WebInquiry';
import WebUser from './pages/WebUser';
import WebDevice from './pages/WebDevice';
import WebAI from './pages/WebAI';
import WebFlower from './pages/WebFlower';
import WebManager from './pages/WebManager';
import WebUserInfo from './pages/WebUserInfo';
import WebDeviceInfo from './pages/WebDeviceInfo';


function App() {
    useEffect(() => {
        function handleMessage(event) {
          // 여기서 event.origin을 확인하여 메시지의 출처를 검증하는 것이 좋습니다.
        console.log("Received message:", event.data);
        }
    
        window.addEventListener("message", handleMessage);
    
        // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
        return () => {
        window.removeEventListener("message", handleMessage);
        };
      }, []); // 의존성 배열을 비워둠으로써 컴포넌트가 마운트될 때만 실행됩니다.

    const isMobile = useMediaQuery({ maxWidth: 767 });

return (
<div className="App">
    <Router>
        <Routes>
        {/* {isMobile ? (
            // 모바일
            <> */}
            <Route path="/" element={<Login />} />
            <Route path="/Device" element={<Device />} />
            <Route path="/Flower" element={<Flower />} />
            <Route path="/Bluetooth" element={<Bluetooth />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Find" element={<Find />} />
            <Route path="/FindFlower" element={<FindFlower />} />
            <Route path="/FlowerInfo/:id" element={<FlowerInfo />} />
            <Route path="/AI" element={<AI />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/Withdraw" element={<Withdraw />} />
            <Route path="/DeviceInfo" element={<DeviceInfo />} />
            <Route path="/SupportFlower" element={<SupportFlower />} />
            <Route path="/FlowerDetail/:id" element={<FlowerDetail/>} />
            <Route path="/DeviceName" element={<DeviceName/>} />
            <Route path="/Temp" element={<Temp/>} />
            <Route path="/Soil" element={<Soil/>} />
            <Route path="/Water" element={<Water/>} />
            {/* </>
        ) : (
            // 웹
            <> */}
            <Route path="/w" element={<WebLogin />} />
            <Route path="/WebMain" element={<WebMain />} />
            <Route path="/WebInquiry" element={<WebInquiry />} />
            <Route path="/WebUser" element={<WebUser />} />
            <Route path="/WebDevice" element={<WebDevice />} />
            <Route path="/WebAI" element={<WebAI />} />
            <Route path="/WebFlower" element={<WebFlower />} />
            <Route path="/WebManager" element={<WebManager />} />
            <Route path="/WebUserInfo/:loginID" element={<WebUserInfo />} />
            <Route path="/WebDeviceInfo/:id" element={<WebDeviceInfo />} />
            {/* </>
        )} */}
        </Routes>
    </Router>
</div>
);
}

export default App;