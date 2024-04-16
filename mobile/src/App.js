import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import PwChange from './pages/PwChange';
import Certification from './pages/Certification';
import Withdraw from './pages/Withdraw';

function App() {
return (
<div className="App">
    <Router>
    <Routes>
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
        <Route path="/PwChange" element={<PwChange />} />
        <Route path="/Certification" element={<Certification />} />
        <Route path="/Withdraw" element={<Withdraw />} />
        </Routes>
    </Router>
</div>
);
}

export default App;
