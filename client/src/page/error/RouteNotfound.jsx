// src/components/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center  bg-white text-center h-[80vh] mb-3 w-[90%] mx-auto mt-[30px]  shadow-lg px-2">
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-lg text-gray-500 mb-8">
        Your visited page not found. You may go home page.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Back to home page
      </button>
    </div>
  );
};

export default NotFound;
