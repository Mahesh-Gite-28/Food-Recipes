const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // import auth middleware

const { getAllRecipes, getRecipe, getfavRecipes, addRecipe, myRecipes, delRecipe, editRecipe, toggleFavourite } = require("../controller/recipe"); // controllers

router.get("/", getAllRecipes);
router.get("/favRecipe", auth, getfavRecipes);
router.get("/myRecipe", auth, myRecipes);
router.get("/:id", getRecipe);

// Protected routes
router.post("/addRecipe", auth, addRecipe);
router.delete("/:id/delete", auth, delRecipe);
router.patch("/:id/edit", auth, editRecipe);
router.post("/:id/favourite", auth, toggleFavourite);

module.exports = router;