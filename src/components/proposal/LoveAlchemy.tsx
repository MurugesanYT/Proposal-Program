import React from 'react';

const LoveAlchemy: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-violet-50 via-fuchsia-50 to-rose-50 p-12 rounded-3xl border-3 border-violet-300 shadow-2xl">
      <div className="text-center mb-10">
        <h3 className="text-5xl font-bold text-gray-800 mb-6">🧪 Love Alchemy Laboratory 🧪</h3>
        <p className="text-2xl text-gray-700 leading-relaxed">The perfect formula for eternal happiness</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white/90 p-8 rounded-3xl border-3 border-violet-200 shadow-xl group hover:bg-violet-50 transition-all duration-300">
          <div className="text-center">
            <div className="text-6xl mb-4 group-hover:animate-bounce">💜</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Trust Elixir</h4>
            <p className="text-gray-600">3 cups of honesty + 2 tablespoons of understanding = Unbreakable bond</p>
          </div>
        </div>
        <div className="bg-white/90 p-8 rounded-3xl border-3 border-fuchsia-200 shadow-xl group hover:bg-fuchsia-50 transition-all duration-300">
          <div className="text-center">
            <div className="text-6xl mb-4 group-hover:animate-spin">💖</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Joy Potion</h4>
            <p className="text-gray-600">1 gallon of laughter + infinite smiles = Daily happiness</p>
          </div>
        </div>
        <div className="bg-white/90 p-8 rounded-3xl border-3 border-rose-200 shadow-xl group hover:bg-rose-50 transition-all duration-300">
          <div className="text-center">
            <div className="text-6xl mb-4 group-hover:animate-pulse">💕</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Care Serum</h4>
            <p className="text-gray-600">Unlimited hugs + gentle words = Healing power</p>
          </div>
        </div>
        <div className="bg-white/90 p-8 rounded-3xl border-3 border-pink-200 shadow-xl group hover:bg-pink-50 transition-all duration-300">
          <div className="text-center">
            <div className="text-6xl mb-4 group-hover:animate-bounce">💝</div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">Forever Formula</h4>
            <p className="text-gray-600">2 hearts + 1 destiny = Eternal love story</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveAlchemy;