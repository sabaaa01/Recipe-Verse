import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    window.addEventListener('authChange', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('authChange', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('authChange'));
    navigate('/home');
    alert('Logged out successfully!');
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
        fontFamily: "'Quicksand', sans-serif",
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        zIndex: 1000
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-dark" to="/home">
          RecipeVerse
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/allrecipes">
                All Recipes
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/addrecipe">
                  Add Recipe
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
