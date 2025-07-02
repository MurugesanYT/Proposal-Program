import React from 'react';

const MagicalCastle: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-12 rounded-3xl border-3 border-amber-300 shadow-2xl relative">
      <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-300 rounded-full animate-ping opacity-50"></div>
      <div className="absolute top-4 right-4 w-6 h-6 bg-orange-300 rounded-full animate-bounce"></div>
      <div className="absolute bottom-4 left-4 w-5 h-5 bg-amber-300 rounded-full animate-pulse"></div>
      <div className="absolute bottom-4 right-4 w-7 h-7 bg-yellow-400 rounded-full animate-ping opacity-50"></div>
      
      <div className="text-center mb-10">
        <h3 className="text-5xl font-bold text-gray-800 mb-6">🏰 Enchanted Love Castle 🏰</h3>
        <p className="text-2xl text-gray-700 leading-relaxed">Where fairy tales come true</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white/80 p-10 rounded-3xl border-3 border-amber-200 shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <div className="text-8xl mb-6">👑</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Royal Court</h4>
            <p className="text-lg text-gray-600 leading-relaxed">Every love deserves to be treated like royalty, with respect, honor, and celebration</p>
          </div>
        </div>
        <div className="bg-white/80 p-10 rounded-3xl border-3 border-yellow-200 shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <div className="text-8xl mb-6">🗝️</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Golden Key</h4>
            <p className="text-lg text-gray-600 leading-relaxed">Love is the key that unlocks the door to happiness, adventure, and magical moments</p>
          </div>
        </div>
        <div className="bg-white/80 p-10 rounded-3xl border-3 border-orange-200 shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <div className="text-8xl mb-6">🎭</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Grand Ballroom</h4>
            <p className="text-lg text-gray-600 leading-relaxed">Where two souls dance together through all the seasons of life, in perfect harmony</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicalCastle;