import React from 'react';

const FinalBlessing: React.FC = () => {
  return (
    <div className="text-center pt-10">
      <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-12 rounded-3xl border-3 border-yellow-300 shadow-2xl">
        <div className="flex justify-center gap-4 mb-6">
          <span className="text-4xl animate-bounce">⭐</span>
          <span className="text-4xl animate-pulse">💫</span>
          <span className="text-4xl animate-bounce">✨</span>
          <span className="text-4xl animate-pulse">🌟</span>
          <span className="text-4xl animate-bounce">💖</span>
        </div>
        <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 mb-6">
          This Moment is Pure Magic
        </h3>
        <p className="text-2xl text-gray-700 mb-8 leading-relaxed font-light">
          ✨ You are witnessing something truly special - a moment of pure love, courage, and vulnerability ✨
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 p-6 rounded-xl border border-yellow-200">
            <span className="text-2xl mb-2 block">💝</span>
            <p className="text-gray-700 font-semibold">Created with Love</p>
          </div>
          <div className="bg-white/70 p-6 rounded-xl border border-orange-200">
            <span className="text-2xl mb-2 block">🌟</span>
            <p className="text-gray-700 font-semibold">Unique & Personal</p>
          </div>
          <div className="bg-white/70 p-6 rounded-xl border border-red-200">
            <span className="text-2xl mb-2 block">💕</span>
            <p className="text-gray-700 font-semibold">Filled with Hope</p>
          </div>
        </div>
        <p className="text-xl text-gray-600 leading-relaxed">
          No matter what your heart decides, you are loved, you are special, and you deserve all the happiness in the world 🌈💕
        </p>
      </div>
    </div>
  );
};

export default FinalBlessing;