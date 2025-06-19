
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Circle, Heart, Sparkles, Star } from 'lucide-react';

interface ProposalLinkHeaderProps {
  proposalData: any;
}

const ProposalLinkHeader: React.FC<ProposalLinkHeaderProps> = ({ proposalData }) => {
  const isMarriage = proposalData.proposalType === 'marriage';

  return (
    <CardHeader className="text-center pb-8">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
            {isMarriage ? (
              <Circle className="w-12 h-12 text-white" />
            ) : (
              <Heart className="w-12 h-12 text-white" />
            )}
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-6 h-6 text-yellow-700" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center animate-pulse">
            <Star className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
        Your {isMarriage ? 'Marriage Proposal' : 'Love Declaration'} is Live! ✨
      </CardTitle>
      <p className="text-xl text-gray-600 mb-4">
        Share this magical link with <span className="font-bold text-emerald-600">{proposalData.partnerName}</span>
      </p>
      <div className="flex justify-center gap-4 text-sm text-gray-500">
        <span>💝 Created with Love</span>
        <span>🌟 Unique & Personal</span>
        <span>⚡ Real-time Updates</span>
      </div>
    </CardHeader>
  );
};

export default ProposalLinkHeader;
