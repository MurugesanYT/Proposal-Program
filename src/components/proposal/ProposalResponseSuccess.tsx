import React from 'react';

interface ProposalResponseSuccessProps {
  proposal: any;
  response: 'accept' | 'reject';
  reason: string;
}

const ProposalResponseSuccess: React.FC<ProposalResponseSuccessProps> = ({
  proposal,
  response,
  reason
}) => {
  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-12 rounded-3xl border-3 border-green-300 shadow-2xl animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <span className="text-6xl">💝</span>
        </div>
        <h3 className="text-5xl font-bold text-green-700 mb-6">
          {response === 'accept' ? '🎉 Your Joyful Response! 🎉' : '💙 Your Thoughtful Response 💙'}
        </h3>
        <p className="text-2xl text-green-600 mb-8">
          Your beautiful message has been sent to {proposal.proposerName} with all the love it deserves!
        </p>
      </div>
      
      <div className="bg-white/90 p-10 rounded-3xl border-3 border-green-200 shadow-xl">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-4xl">💕</span>
          <h4 className="text-3xl font-bold text-gray-800">Your Heart's Message</h4>
          <span className="text-4xl">💕</span>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 shadow-inner">
          <p className="text-2xl text-gray-700 italic leading-relaxed text-center font-light">
            "{reason}"
          </p>
        </div>
        <div className="text-center mt-8">
          <p className="text-xl text-green-600 font-semibold">
            ✨ This message will be treasured forever ✨
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="bg-white/80 p-8 rounded-3xl border-3 border-green-200 shadow-xl text-center">
          <div className="text-5xl mb-4">📬</div>
          <h4 className="text-xl font-bold text-gray-800 mb-3">Message Delivered</h4>
          <p className="text-gray-600">Your heartfelt words are on their way with love</p>
        </div>
        <div className="bg-white/80 p-8 rounded-3xl border-3 border-emerald-200 shadow-xl text-center">
          <div className="text-5xl mb-4">💖</div>
          <h4 className="text-xl font-bold text-gray-800 mb-3">Pure Authenticity</h4>
          <p className="text-gray-600">Your honest response shows the beauty of your heart</p>
        </div>
        <div className="bg-white/80 p-8 rounded-3xl border-3 border-teal-200 shadow-xl text-center">
          <div className="text-5xl mb-4">🌟</div>
          <h4 className="text-xl font-bold text-gray-800 mb-3">Moment Captured</h4>
          <p className="text-gray-600">This beautiful exchange will be remembered always</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalResponseSuccess;