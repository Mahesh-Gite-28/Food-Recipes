require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const cors = require('cors');

app.use(cors({ 
  origin: function (origin, callback) { 
    const allowedOrigins = [ 
      "http://localhost:5173", 
      "https://recipe-garage.vercel.app" 
    ]; 
    // Allow any Vercel preview deployment for this project 
    if (!origin || allowedOrigins.includes(origin) || /https:\/\/recipe-garage.*\.vercel\.app$/.test(origin)) { 
      callback(null, true); 
    } else { 
      callback(new Error("Not allowed by CORS")); 
    } 
  }, 
  credentials: true, 
}));

app.use(cookieParser()); // parse cookies for auth

const connectDB = require('./config/db.js');

connectDB();

const router = require('./routes/recipe');

const userRouter = require('./routes/user');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use('/api', userRouter);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
