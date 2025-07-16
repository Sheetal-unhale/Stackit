import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">StackIt</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/ask">Ask Question</Link>
        <Link to="/login">Login</Link>
        <button
         className="theme-toggle"
         onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle Dark Mode"
        >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
