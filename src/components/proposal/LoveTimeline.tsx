import React from 'react';

const LoveTimeline: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-10 rounded-3xl border-3 border-indigo-200 shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">💝 Your Love Journey 💝</h3>
        <p className="text-xl text-gray-600">Every great love story has beautiful chapters</p>
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-6 bg-white/80 p-6 rounded-2xl border-2 border-indigo-200 shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">1</div>
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">✨ The Meeting</h4>
            <p className="text-gray-600">When two souls recognize each other for the first time...</p>
          </div>
        </div>
        <div className="flex items-center gap-6 bg-white/80 p-6 rounded-2xl border-2 border-purple-200 shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">2</div>
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">💕 The Connection</h4>
            <p className="text-gray-600">Hearts start beating in perfect synchronization...</p>
          </div>
        </div>
        <div className="flex items-center gap-6 bg-white/80 p-6 rounded-2xl border-2 border-pink-200 shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">3</div>
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">🌟 This Moment</h4>
            <p className="text-gray-600">A beautiful declaration of love that will be remembered forever...</p>
          </div>
        </div>
        <div className="flex items-center gap-6 bg-white/80 p-6 rounded-2xl border-2 border-red-200 shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">∞</div>
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">💖 Forever</h4>
            <p className="text-gray-600">A lifetime of love, laughter, and endless adventures together...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveTimeline;