import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-9xl font-extrabold text-green-700 animate-bounce">404</div>
      <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-2">Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-8 max-w-md">
        Oops! The delicious recipe or page you're looking for seems to have vanished from our kitchen.
      </p>
      <Link 
        to="/" 
        className="bg-green-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        Back to Home 🏠
      </Link>
    </div>
  );
};

export default Error;