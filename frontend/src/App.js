import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllRecipes from './pages/AllRecipes';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import PrivateRoute from './component/PrivateRoute';
import Navbar from './component/Navbar';


function App() {
  return (
    <div className="home-page" style={{ marginTop: '50px' }}>
   <Router>
         <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allrecipes" element={<AllRecipes />} />
        <Route path="/addrecipe" element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
        <Route path="/editrecipe/:id" element={<PrivateRoute><EditRecipe /></PrivateRoute>} />
        <Route path="/recipedetails/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
</div>
   
  );
}

export default App;
