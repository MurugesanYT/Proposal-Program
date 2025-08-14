import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4">
      <div className="text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 px-4 leading-relaxed">
          Oops! This page doesn't exist in our love story
        </p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl text-lg sm:text-xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          💕 Return to Love
        </a>
      </div>
    </div>
  );
};

export default NotFound;
