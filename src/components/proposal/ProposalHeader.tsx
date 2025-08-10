import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';

interface ProposalHeaderProps {
  proposal: any;
}

const ProposalHeader: React.FC<ProposalHeaderProps> = ({ proposal }) => {
  const isMarriage = proposal.proposalType === 'marriage';

  return (
    <CardHeader className="text-center bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white rounded-t-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 space-y-6">
        <div className="flex justify-center gap-4 text-3xl sm:text-4xl md:text-5xl animate-bounce">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 animate-pulse" />
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 animate-spin" />
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 animate-pulse" />
        </div>
        <CardTitle className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {isMarriage ? '💍 Marriage Proposal 💍' : '💕 Love Declaration 💕'}
        </CardTitle>
        <div className="space-y-4">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
            From {proposal.proposerName} to {proposal.partnerName}
          </p>
          <p className="text-base sm:text-lg md:text-xl opacity-90">
            ✨ A moment of pure love and courage ✨
          </p>
        </div>
      </div>
    </CardHeader>
  );
};

export default ProposalHeader;