// src/component/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuth({
      isAuthenticated: !!token,
      loading: false
    });
  }, []);

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;