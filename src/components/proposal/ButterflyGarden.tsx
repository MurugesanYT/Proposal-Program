import React from 'react';

const ButterflyGarden: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-12 rounded-3xl border-3 border-cyan-300 shadow-2xl">
      <div className="text-center mb-10">
        <h3 className="text-5xl font-bold text-gray-800 mb-6">🦋 Butterfly Transformation Garden 🦋</h3>
        <p className="text-2xl text-gray-700 leading-relaxed">Love transforms everything it touches</p>
      </div>
      <div className="space-y-8">
        <div className="flex items-center gap-8 bg-white/80 p-8 rounded-3xl border-3 border-cyan-200 shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">🥚</div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">The Beginning</h4>
            <p className="text-lg text-gray-600 leading-relaxed">A tiny seed of attraction, planted in the garden of possibility</p>
          </div>
        </div>
        <div className="flex items-center gap-8 bg-white/80 p-8 rounded-3xl border-3 border-blue-200 shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">🐛</div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">The Growing</h4>
            <p className="text-lg text-gray-600 leading-relaxed">Learning about each other, growing closer with every shared moment</p>
          </div>
        </div>
        <div className="flex items-center gap-8 bg-white/80 p-8 rounded-3xl border-3 border-indigo-200 shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">🛡️</div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">The Cocoon</h4>
            <p className="text-lg text-gray-600 leading-relaxed">A safe space where love deepens and commitment forms</p>
          </div>
        </div>
        <div className="flex items-center gap-8 bg-white/80 p-8 rounded-3xl border-3 border-purple-200 shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">🦋</div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">The Transformation</h4>
            <p className="text-lg text-gray-600 leading-relaxed">Emerging as something beautiful together - this very moment!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButterflyGarden;