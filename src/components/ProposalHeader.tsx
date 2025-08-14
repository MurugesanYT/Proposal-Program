
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Circle, Heart, Sparkles, Star } from 'lucide-react';

interface ProposalHeaderProps {
  proposal: any;
}

const ProposalHeader: React.FC<ProposalHeaderProps> = ({ proposal }) => {
  const isMarriage = proposal.proposalType === 'marriage';

  return (
    <CardHeader className="text-center pb-6 sm:pb-8 md:pb-10 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white rounded-t-lg relative overflow-hidden px-4 sm:px-6 md:px-8">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl">
              {isMarriage ? (
                <Circle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white animate-pulse" />
              ) : (
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white animate-pulse" />
              )}
            </div>
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-yellow-400/90 rounded-full flex items-center justify-center animate-bounce shadow-xl">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-yellow-700" />
            </div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-pink-400/90 rounded-full flex items-center justify-center animate-pulse shadow-xl">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 drop-shadow-lg leading-tight">
            {isMarriage ? '💍 A Marriage Proposal 💍' : '💕 A Love Declaration 💕'}
          </CardTitle>
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-3 sm:mb-4">
            <span className="text-lg sm:text-xl">✨</span>
            <span className="text-lg sm:text-xl">💖</span>
            <span className="text-lg sm:text-xl">🌟</span>
            <span className="text-lg sm:text-xl">💫</span>
            <span className="text-lg sm:text-xl">💕</span>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed drop-shadow-md px-2">
            Dear <span className="font-bold text-yellow-200">{proposal.partnerName}</span>, <br className="hidden sm:block" />
            <span className="font-bold text-yellow-200">{proposal.proposerName}</span> has something incredibly special to {isMarriage ? 'ask' : 'tell'} you...
          </p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/30 mx-2 sm:mx-0">
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
            💫 A moment crafted with love, just for you 💫
          </p>
        </div>
      </div>
    </CardHeader>
  );
};

export default ProposalHeader;
