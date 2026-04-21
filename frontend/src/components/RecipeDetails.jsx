import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    
    try {
      const res = await fetch(`${API_BASE}/${id}/delete`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/");
      } else {
        alert("Failed to delete recipe");
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading recipe details...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-500">Recipe not found</h2>
        <button 
          onClick={() => navigate("/")}
          className="mt-4 text-green-700 hover:underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  const ingredientsList = recipe.ingredients
    ? recipe.ingredients.split(/[,\n]/).filter(i => i.trim() !== "")
    : [];

  const isOwner = user && recipe.createdBy && (user.id === recipe.createdBy._id || user.id === recipe.createdBy);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Image Section */}
        <div className="relative h-64 md:h-96">
          <img
            src={recipe.coverImage || "/dosa.png"}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{recipe.title}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <span className="flex items-center gap-1 font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  ⏱ {recipe.time || "N/A"}
                </span>
                {recipe.createdBy && (
                  <span className="font-medium italic">
                    By {recipe.createdBy.username || "Anonymous"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Ingredients Column */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                🥗 Ingredients
              </h2>
              <ul className="space-y-3">
                {ingredientsList.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Column */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                🍳 Instructions
              </h2>
              <div className="prose prose-green max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                {recipe.instructions}
              </div>
            </div>
          </div>

          {/* Actions Section */}
          {isOwner && (
            <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4">
              <button 
                onClick={() => alert("Edit functionality coming soon!")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
              >
                Edit Recipe
              </button>
              <button 
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition shadow-md"
              >
                Delete Recipe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;