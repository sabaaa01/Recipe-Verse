import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      window.dispatchEvent(new Event('authChange'));

      let username = null;
      if (res.data.user?.username) username = res.data.user.username;
      else if (res.data.username) username = res.data.username;
      else if (res.data.data?.username) username = res.data.data.username;
      if (username) localStorage.setItem('username', username);

      alert("Login successful!");
      navigate('/allrecipes');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
        fontFamily: "'Quicksand', sans-serif"
      }}
    >
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%', borderRadius: '1rem', backgroundColor: 'rgba(255,255,255,0.8)' }}>
        <h3 className="text-center mb-4">Login to RecipeVerse</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
          </div>
          <button className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
