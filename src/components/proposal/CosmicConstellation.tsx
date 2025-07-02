import React from 'react';

const CosmicConstellation: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-12 rounded-3xl border-3 border-indigo-300 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-5 h-5 bg-purple-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-blue-300 rounded-full animate-ping"></div>
      </div>
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-5xl font-bold text-gray-800 mb-6">🌟 Cosmic Love Constellation 🌟</h3>
        <p className="text-2xl text-gray-700 leading-relaxed">Your love is written in the stars</p>
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white/80 p-10 rounded-3xl border-3 border-indigo-200 shadow-xl">
          <div className="text-center">
            <div className="text-8xl mb-6">🌙</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Moon's Blessing</h4>
            <p className="text-lg text-gray-600 leading-relaxed">The moon has witnessed countless love stories, and yours shines the brightest among the stars</p>
          </div>
        </div>
        <div className="bg-white/80 p-10 rounded-3xl border-3 border-purple-200 shadow-xl">
          <div className="text-center">
            <div className="text-8xl mb-6">⭐</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Starlight Promise</h4>
            <p className="text-lg text-gray-600 leading-relaxed">Like stars that light up the darkest nights, your love illuminates everything around you</p>
          </div>
        </div>
        <div className="bg-white/80 p-10 rounded-3xl border-3 border-pink-200 shadow-xl">
          <div className="text-center">
            <div className="text-8xl mb-6">🌌</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Galaxy of Dreams</h4>
            <p className="text-lg text-gray-600 leading-relaxed">In the infinite cosmos, two hearts have found each other - a miracle beyond measure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmicConstellation;