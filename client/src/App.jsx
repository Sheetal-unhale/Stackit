import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AskQuestion from './pages/AskQuestion';
import QuestionDetail from './pages/QuestionDetail.jsx';
import Login from './pages/Login';
import Navbar from './components/Navbar'; // <-- Add this
import './Navbar.css';

function App() {
  return (
    <Router>
      <Navbar /> {/* <-- Add here so it's always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
