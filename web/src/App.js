import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';
import Inquiry from './pages/Inquiry';
import User from './pages/User';
import Device from './pages/Device';
import AI from './pages/AI';
import Flower from './pages/Flower';
import Manager from './pages/Manager';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Inquiry" element={<Inquiry />} />
        <Route path="/User" element={<User />} />
        <Route path="/Device" element={<Device />} />
        <Route path="/AI" element={<AI />} />
        <Route path="/Flower" element={<Flower />} />
        <Route path="/Manager" element={<Manager />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
