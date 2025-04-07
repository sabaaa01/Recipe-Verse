import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-light" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      
      {/* Hero Section with Blue Gradient */}
      <section className="container-fluid py-5" style={{ background: 'linear-gradient(to right, #cce5ff, #e0f7fa)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h1 className="display-4 fw-bold">Unleash the Chef in You 🍳</h1>
              <p className="lead mt-3">Discover, share, and get inspired by homemade recipes from around the world.</p>
              <Link to="/allrecipes" className="btn btn-warning btn-lg mt-4 px-4 py-2">Browse Recipes</Link>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img src="/food.jpg" alt="Delicious Food" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why You'll Love It</h2>
        </div>
        <div className="row g-4">
          {[
            { title: '🎨 Aesthetic & Clean', desc: 'Enjoy a peaceful, pastel UI that’s easy on the eyes.' },
            { title: '📷 Share Instantly', desc: 'Add photos, steps, and tips with ease.' },
            { title: '👩‍🍳 Community-Loved', desc: 'Made by and for passionate home cooks.' }
          ].map((feature, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#ffffffcc' }}>
                <div className="card-body text-center">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">How It Works</h2>
          <p className="text-muted">Sharing and discovering recipes is easy as 1, 2, 3!</p>
        </div>
        <div className="row g-4">
          {[
            'Register quickly and join our foodie family.',
            'Add your recipe with ingredients, steps & images.',
            'Inspire others to try your creations.'
          ].map((text, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card border-0 shadow-sm" style={{ backgroundColor: '#ffffffcc' }}>
                <div className="card-body text-center">
                  <h3 className="card-title">{idx + 1}⃣</h3>
                  <p className="card-text">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center" style={{ background: 'linear-gradient(to right, #fbeec1, #d3f8e2)' }}>
        <div className="container">
          <h2 className="fw-bold mb-3">Start Sharing Your Culinary Magic ✨</h2>
          <p>It takes less than a minute to join. Start now!</p>
          <Link to="/register" className="btn btn-success me-3">Register</Link>
          <Link to="/addrecipe" className="btn btn-outline-secondary">Add Recipe</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-muted text-center py-3 mt-5 shadow-sm">
        <div className="container">
          <small>Made with 🍲 by Saba • © 2025 Recipe Sharing Platform</small>
        </div>
      </footer>
    </div>
  );
};

export default Home;
