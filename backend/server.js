require("dotenv").config();

const express = require("express");

const app = express();

const router=require("./routes/recipe.js")

const PORT = process.env.PORT || 3000;

app.use("/api",router);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
