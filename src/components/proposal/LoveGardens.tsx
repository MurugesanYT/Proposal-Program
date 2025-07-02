import React from 'react';

const LoveGardens: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-12 rounded-3xl border-3 border-emerald-200 shadow-2xl">
      <div className="text-center mb-10">
        <h3 className="text-5xl font-bold text-gray-800 mb-6">🌺 Enchanted Love Gardens 🌺</h3>
        <p className="text-2xl text-gray-700 leading-relaxed">Where every love story blooms eternal</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white/90 p-8 rounded-3xl border-3 border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1">
          <div className="text-center">
            <div className="text-7xl mb-6 animate-bounce">🌸</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Cherry Blossoms</h4>
            <p className="text-lg text-gray-600 leading-relaxed">Beautiful moments that come once in a lifetime, just like this precious proposal</p>
          </div>
        </div>
        <div className="bg-white/90 p-8 rounded-3xl border-3 border-pink-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1">
          <div className="text-center">
            <div className="text-7xl mb-6 animate-pulse">🌷</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Tulip Fields</h4>
            <p className="text-lg text-gray-600 leading-relaxed">Endless fields of pure beauty, representing the infinite nature of true love</p>
          </div>
        </div>
        <div className="bg-white/90 p-8 rounded-3xl border-3 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1">
          <div className="text-center">
            <div className="text-7xl mb-6 animate-bounce">🌻</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Sunflower Dreams</h4>
            <p className="text-lg text-gray-600 leading-relaxed">Always turning toward the light, just like hearts turning toward love</p>
          </div>
        </div>
        <div className="bg-white/90 p-8 rounded-3xl border-3 border-rose-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1">
          <div className="text-center">
            <div className="text-7xl mb-6 animate-pulse">🌺</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Hibiscus Paradise</h4>
            <p className="text-lg text-gray-600 leading-relaxed">Exotic and passionate, symbolizing the unique beauty of your connection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveGardens;