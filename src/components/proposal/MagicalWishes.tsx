import React from 'react';

const MagicalWishes: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-10 rounded-3xl border-3 border-yellow-200 shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">🌟 Magical Wishes for Your Love 🌟</h3>
        <p className="text-xl text-gray-600">Beautiful blessings for your journey together</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/80 p-8 rounded-2xl border-2 border-yellow-200 shadow-lg">
          <div className="text-center">
            <div className="text-5xl mb-4">🌈</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">May Your Love Shine</h4>
            <p className="text-gray-600 leading-relaxed">Like a rainbow after the storm, may your love bring color and joy to every day of your lives together.</p>
          </div>
        </div>
        <div className="bg-white/80 p-8 rounded-2xl border-2 border-orange-200 shadow-lg">
          <div className="text-center">
            <div className="text-5xl mb-4">🦋</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">May You Grow Together</h4>
            <p className="text-gray-600 leading-relaxed">Like butterflies emerging from their cocoon, may your love transform and grow more beautiful each day.</p>
          </div>
        </div>
        <div className="bg-white/80 p-8 rounded-2xl border-2 border-red-200 shadow-lg">
          <div className="text-center">
            <div className="text-5xl mb-4">🌺</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">May You Bloom</h4>
            <p className="text-gray-600 leading-relaxed">Like the most beautiful flowers in spring, may your love bloom eternally in all seasons of life.</p>
          </div>
        </div>
        <div className="bg-white/80 p-8 rounded-2xl border-2 border-pink-200 shadow-lg">
          <div className="text-center">
            <div className="text-5xl mb-4">✨</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">May You Sparkle</h4>
            <p className="text-gray-600 leading-relaxed">Like stars in the night sky, may your love continue to sparkle and light up the darkness for each other.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicalWishes;