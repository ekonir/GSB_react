
import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Navbar from './components/Navbar';

import './styles/Navbar.css';
import { AuthProvider } from './context/AuthContext';



function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
