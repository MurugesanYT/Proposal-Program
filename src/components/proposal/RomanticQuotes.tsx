import React from 'react';

const RomanticQuotes: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 p-10 rounded-3xl border-3 border-purple-200 shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">✨ Words of Love ✨</h3>
        <p className="text-xl text-gray-600">Beautiful words that capture the essence of true love</p>
      </div>
      <div className="space-y-8">
        <div className="bg-white/90 p-8 rounded-2xl border-2 border-purple-200 shadow-inner">
          <p className="text-2xl text-gray-700 italic text-center leading-relaxed font-light">
            "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage."
          </p>
          <p className="text-center text-gray-500 mt-4 font-semibold">- Lao Tzu</p>
        </div>
        <div className="bg-white/90 p-8 rounded-2xl border-2 border-pink-200 shadow-inner">
          <p className="text-2xl text-gray-700 italic text-center leading-relaxed font-light">
            "The best thing to hold onto in life is each other."
          </p>
          <p className="text-center text-gray-500 mt-4 font-semibold">- Audrey Hepburn</p>
        </div>
        <div className="bg-white/90 p-8 rounded-2xl border-2 border-rose-200 shadow-inner">
          <p className="text-2xl text-gray-700 italic text-center leading-relaxed font-light">
            "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."
          </p>
          <p className="text-center text-gray-500 mt-4 font-semibold">- Unknown</p>
        </div>
      </div>
    </div>
  );
};

export default RomanticQuotes;