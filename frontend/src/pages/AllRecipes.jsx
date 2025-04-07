import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/api/recipes')
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.error('Error fetching recipes:', err);
      });
  }, []);

  return (
    <div
      className="py-5"
      style={{
        background: 'linear-gradient(to right, #e0f7fa, #f3e5f5)',
        minHeight: '100vh',
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <div className="container">
        <h2 className="text-center mb-5 fw-bold text-dark">All Recipes</h2>
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-6 col-lg-4 mb-4" key={recipe._id}>
              <div
                className="card shadow-sm h-100 border-0"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '1rem' }}
              >
                {recipe.image && (
                  <img
                    src={`/uploads/${recipe.image}`}
                    className="card-img-top rounded-top"
                    alt={recipe.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                    {recipe.instructions.length > 100
                      ? recipe.instructions.slice(0, 100) + '...'
                      : recipe.instructions}
                  </p>
                  <Link
                    to={`/recipedetails/${recipe._id}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recipes.length === 0 && (
          <p className="text-center text-muted mt-5">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
