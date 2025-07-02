import React from 'react';

const LoveStories: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 p-10 rounded-3xl border-3 border-pink-200 shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">💕 Love Stories Around the World 💕</h3>
        <p className="text-xl text-gray-600 leading-relaxed">Every love story is unique and magical, just like yours!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/80 p-8 rounded-2xl border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="text-center">
            <div className="text-6xl mb-4">🌹</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">The Perfect Moment</h4>
            <p className="text-gray-600 leading-relaxed">True love finds its perfect moment when two hearts beat as one, creating memories that last forever.</p>
          </div>
        </div>
        <div className="bg-white/80 p-8 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="text-center">
            <div className="text-6xl mb-4">💫</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Endless Possibilities</h4>
            <p className="text-gray-600 leading-relaxed">When love is real, every day becomes an adventure filled with laughter, joy, and endless possibilities.</p>
          </div>
        </div>
        <div className="bg-white/80 p-8 rounded-2xl border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="text-center">
            <div className="text-6xl mb-4">🎈</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Forever Together</h4>
            <p className="text-gray-600 leading-relaxed">The best love stories never end - they continue to grow more beautiful with each passing day.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveStories;