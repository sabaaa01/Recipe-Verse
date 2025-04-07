import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', JSON.stringify(ingredients.split(',').map(item => item.trim())));
    formData.append('instructions', instructions);
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await axios.post('/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201 || res.status === 200) {
        setSuccess('Recipe added successfully!');
        setError('');
        setTitle('');
        setIngredients('');
        setInstructions('');
        setImageFile(null);
        setTimeout(() => navigate('/allrecipes'), 1500);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to add recipe.');
      setSuccess('');
    }
  };

  return (
    <div
      className="py-5"
      style={{
        background: 'linear-gradient(to right, #d1c4e9, #b3e5fc)',
        minHeight: '100vh',
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-10">
            <div
              className="p-3 shadow-sm rounded-3"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              <h3 className="text-center mb-3 fw-bold text-dark">Add Recipe</h3>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-2">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Ingredients (comma-separated)</label>
                  <textarea
                    className="form-control"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    rows="2"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Instructions</label>
                  <textarea
                    className="form-control"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows="4"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-outline-primary px-4">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
