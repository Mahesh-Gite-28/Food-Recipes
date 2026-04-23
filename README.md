# 🍽️ Recipe Garage

A full-stack recipe sharing web app where users can browse, add, edit, and favourite recipes with image uploads.

**Live Demo:** [Frontend on Vercel](https://your-frontend.vercel.app) &nbsp;|&nbsp; **API:** [https://recipegarage.onrender.com](https://recipegarage.onrender.com)

---

## Tech Stack

**Frontend**

- React + Vite
- Tailwind CSS
- Context API (Auth + Toast)

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication (via cookies)
- Cloudinary (image uploads)
- Multer

---

## Features

- Browse all recipes on the home page
- Register / Login with JWT-based auth
- Add a recipe with a cover image
- Edit or delete your own recipes
- Mark recipes as favourite
- View your own recipes and favourited recipes separately

---

## Project Structure

```
RecipeGarage/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Cloudinary + multer setup
│   ├── controller/
│   │   ├── recipe.js          # Recipe CRUD logic
│   │   └── user.js            # Auth logic
│   ├── middleware/
│   │   └── auth.js            # JWT middleware
│   ├── models/
│   │   ├── recipe.js          # Recipe schema
│   │   └── user.js            # User schema
│   ├── routes/
│   │   ├── recipe.js          # Recipe routes
│   │   └── user.js            # User routes
│   ├── .env.example
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/        # All UI components
    │   ├── context/           # AuthContext, ToastContext
    │   ├── utils/
    │   │   └── api.js         # API base URL
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── vite.config.js
```

---

## API Endpoints

### Auth Routes — `/api`

| Method | Endpoint  | Access    | Description                  |
| ------ | --------- | --------- | ---------------------------- |
| POST   | `/signup` | Public    | Register a new user          |
| POST   | `/login`  | Public    | Login and receive JWT cookie |
| POST   | `/logout` | Public    | Clear auth cookie            |
| GET    | `/user`   | Protected | Get logged-in user info      |

### Recipe Routes — `/api`

| Method | Endpoint         | Access    | Description                   |
| ------ | ---------------- | --------- | ----------------------------- |
| GET    | `/`              | Public    | Get all recipes               |
| GET    | `/:id`           | Public    | Get single recipe             |
| GET    | `/myRecipe`      | Protected | Get current user's recipes    |
| GET    | `/favRecipe`     | Protected | Get user's favourited recipes |
| POST   | `/addRecipe`     | Protected | Add new recipe (with image)   |
| PATCH  | `/:id/edit`      | Protected | Edit a recipe                 |
| DELETE | `/:id/delete`    | Protected | Delete a recipe               |
| POST   | `/:id/favourite` | Protected | Toggle favourite on a recipe  |

---

## Getting Started Locally

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the repo

```bash
git clone https://github.com/Mahesh-Gite-28/RecipeGarage.git
cd RecipeGarage
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

| Service  | Platform                     |
| -------- | ---------------------------- |
| Backend  | [Render](https://render.com) |
| Frontend | [Vercel](https://vercel.com) |
| Database | MongoDB Atlas                |
| Images   | Cloudinary                   |

### Backend (Render)

- Root directory: `backend`
- Build command: `npm install`
- Start command: `node server.js`
- Add all `.env` variables in Render's Environment tab

### Frontend (Vercel)

- Root directory: `frontend`
- Framework: Vite (auto-detected)
- Add environment variable: `VITE_API_URL=https://recipegarage.onrender.com/api`

---

## Environment Variables Summary

### Backend `.env`

| Key                     | Description                     |
| ----------------------- | ------------------------------- |
| `PORT`                  | Server port (default 5000)      |
| `MONGO_URL`             | MongoDB Atlas connection string |
| `JWT_SECRET`            | Secret key for JWT signing      |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name      |
| `CLOUDINARY_API_KEY`    | Cloudinary API key              |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret           |

### Frontend `.env`

| Key            | Description          |
| -------------- | -------------------- |
| `VITE_API_URL` | Backend API base URL |

---

## Author

**Mahesh Gite**

- GitHub: [@Mahesh-Gite-28](https://github.com/Mahesh-Gite-28)

---

## License

This project is open source and available under the [MIT License](LICENSE).
