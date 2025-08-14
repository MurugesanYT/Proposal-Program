import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';

interface ProposalHeaderProps {
  proposal: any;
}

const ProposalHeader: React.FC<ProposalHeaderProps> = ({ proposal }) => {
  const isMarriage = proposal.proposalType === 'marriage';

  return (
    <CardHeader className="text-center bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white rounded-t-lg relative overflow-hidden px-4 sm:px-6 py-6 sm:py-8 md:py-10">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 space-y-4 sm:space-y-6">
        <div className="flex justify-center gap-3 sm:gap-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-bounce">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 animate-pulse" />
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 animate-spin" />
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 animate-pulse" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
          {isMarriage ? '💍 Marriage Proposal 💍' : '💕 Love Declaration 💕'}
        </CardTitle>
        <div className="space-y-3 sm:space-y-4">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
            From {proposal.proposerName} to {proposal.partnerName}
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90">
            ✨ A moment of pure love and courage ✨
          </p>
        </div>
      </div>
    </CardHeader>
  );
};

export default ProposalHeader;