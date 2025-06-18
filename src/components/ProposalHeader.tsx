
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Circle, Heart, Sparkles, Star } from 'lucide-react';

interface ProposalHeaderProps {
  proposal: any;
}

const ProposalHeader: React.FC<ProposalHeaderProps> = ({ proposal }) => {
  const isMarriage = proposal.proposalType === 'marriage';

  return (
    <CardHeader className="text-center pb-10 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white rounded-t-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl">
              {isMarriage ? (
                <Circle className="w-14 h-14 text-white animate-pulse" />
              ) : (
                <Heart className="w-14 h-14 text-white animate-pulse" />
              )}
            </div>
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400/90 rounded-full flex items-center justify-center animate-bounce shadow-xl">
              <Sparkles className="w-7 h-7 text-yellow-700" />
            </div>
            <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-pink-400/90 rounded-full flex items-center justify-center animate-pulse shadow-xl">
              <Star className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <CardTitle className="text-6xl font-bold mb-6 drop-shadow-lg">
            {isMarriage ? '💍 A Marriage Proposal 💍' : '💕 A Love Declaration 💕'}
          </CardTitle>
          <div className="flex justify-center gap-6 mb-4">
            <span className="text-xl">✨</span>
            <span className="text-xl">💖</span>
            <span className="text-xl">🌟</span>
            <span className="text-xl">💫</span>
            <span className="text-xl">💕</span>
          </div>
          <p className="text-3xl font-light leading-relaxed drop-shadow-md">
            Dear <span className="font-bold text-yellow-200">{proposal.partnerName}</span>, <br />
            <span className="font-bold text-yellow-200">{proposal.proposerName}</span> has something incredibly special to {isMarriage ? 'ask' : 'tell'} you...
          </p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <p className="text-xl text-white/90 leading-relaxed">
            💫 A moment crafted with love, just for you 💫
          </p>
        </div>
      </div>
    </CardHeader>
  );
};

export default ProposalHeader;
