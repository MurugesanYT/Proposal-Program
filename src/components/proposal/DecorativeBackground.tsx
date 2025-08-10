import React from 'react';

const DecorativeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse hidden sm:block bg-pink-300"></div>
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse hidden sm:block bg-red-300"></div>
      <div className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse hidden sm:block bg-purple-300"></div>
      <div className="absolute top-1/2 right-1/4 w-28 h-28 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse hidden sm:block bg-rose-300"></div>
      <div className="absolute top-10 left-1/2 w-16 h-16 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse hidden sm:block bg-yellow-300"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse hidden sm:block bg-indigo-300"></div>
    </div>
  );
};

export default DecorativeBackground;
