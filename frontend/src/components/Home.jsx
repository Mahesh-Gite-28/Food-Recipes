import React, { useEffect, useState, useContext } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipeModal from "./AddRecipeModal";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/`);
      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="px-6 md:px-10 py-6">

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8">
        
        {/* Left */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4 text-green-800">
            Food Recipe
          </h1>

          <p className="text-gray-600 mb-5 text-lg">
            Discover delicious recipes and share your own cooking ideas with the world.
          </p>

          {user && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition shadow-md"
            >
              Share your recipe
            </button>
          )}
        </div>

        {/* Right Image */}
        <div className="hidden sm:block">
          <img
            src="/dosa.png"
            alt="food"
            className="w-48 md:w-60 rounded-full shadow-lg border-4 border-green-100 animate-pulse-slow"
          />
        </div>
      </div>

      <hr className="mb-10 border-gray-200" />

      {/* Recipes Grid */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Recipes</h2>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Fetching delicious recipes...</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-xl text-gray-500 font-medium mb-4">No recipes found 🍲</p>
          {user && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="text-green-700 font-bold hover:underline"
            >
              Be the first to share one!
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}

      {/* Add Recipe Modal */}
      <AddRecipeModal 
        show={showAddModal} 
        setShow={setShowAddModal} 
        onRecipeAdded={fetchRecipes}
      />

    </div>
  );
};

export default Home;