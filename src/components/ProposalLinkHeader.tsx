
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Circle, Heart, Sparkles, Star } from 'lucide-react';

interface ProposalLinkHeaderProps {
  proposalData: any;
}

const ProposalLinkHeader: React.FC<ProposalLinkHeaderProps> = ({ proposalData }) => {
  const isMarriage = proposalData.proposalType === 'marriage';

  return (
    <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
            {isMarriage ? (
              <Circle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            ) : (
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            )}
          </div>
          <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-700" />
          </div>
          <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 bg-pink-400 rounded-full flex items-center justify-center animate-pulse">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
        </div>
      </div>
      <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
        Your {isMarriage ? 'Marriage Proposal' : 'Love Declaration'} is Live! ✨
      </CardTitle>
      <p className="text-lg sm:text-xl text-gray-600 mb-4 px-2">
        Share this magical link with <span className="font-bold text-emerald-600">{proposalData.partnerName}</span>
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
        <span>💝 Created with Love</span>
        <span>🌟 Unique & Personal</span>
        <span>⚡ Real-time Updates</span>
      </div>
    </CardHeader>
  );
};

export default ProposalLinkHeader;
