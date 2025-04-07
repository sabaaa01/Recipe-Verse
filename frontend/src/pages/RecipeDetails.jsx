import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/recipes/${id}`);
      alert("Recipe deleted successfully.");
      navigate('/allrecipes');
    } catch (err) {
      console.error("Failed to delete recipe:", err);
      alert("Could not delete the recipe.");
    }
  };

  const handleEdit = () => {
    navigate(`/editrecipe/${id}`);
  };

  if (!recipe) return <p className="text-center mt-5">Loading or failed to load recipe...</p>;

  return (
    <div
      className="py-5"
      style={{
        background: 'linear-gradient(to right, #f3e5f5, #e0f7fa)',
        minHeight: '100vh',
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <div className="container">
        <div
          className="p-4 shadow-sm rounded-4"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          <h2 className="text-center fw-bold text-dark mb-4">{recipe.title}</h2>

          {recipe.image && (
            <div className="text-center mb-4">
              <img
                src={`http://localhost:3000/uploads/${recipe.image}`}
                alt={recipe.title}
                className="img-fluid"
                style={{ maxHeight: '300px', borderRadius: '15px', objectFit: 'cover' }}
              />
            </div>
          )}

          <h4 className="fw-semibold text-secondary">Ingredients:</h4>
          <ul className="mb-4">
            {(recipe.ingredients || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4 className="fw-semibold text-secondary">Instructions:</h4>
          <p>{recipe.instructions}</p>

          <p className="text-muted">
            Posted on: {new Date(recipe.createdAt).toLocaleDateString()}
          </p>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <button className="btn btn-outline-warning" onClick={handleEdit}>
              ✏️ Edit
            </button>
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              🗑️ Delete
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate('/allrecipes')}
            >
              ← Back to Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
