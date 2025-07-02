import React from 'react';

const LoveMeter: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 via-pink-50 to-purple-50 p-10 rounded-3xl border-3 border-red-200 shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">💖 Love Energy Meter 💖</h3>
        <p className="text-xl text-gray-600">Feel the love radiating from this special moment!</p>
      </div>
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-8 mb-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-pink-400 via-red-400 to-purple-500 rounded-full animate-pulse" style={{width: '100%'}}></div>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse">
            MAXIMUM LOVE DETECTED! 💕✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoveMeter;