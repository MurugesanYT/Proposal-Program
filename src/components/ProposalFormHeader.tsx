
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';

const ProposalFormHeader = () => {
  return (
    <CardHeader className="text-center pb-8">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Heart className="w-16 h-16 text-red-500 animate-pulse" />
          <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
        </div>
      </div>
      <CardTitle className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        Create Your Perfect Proposal
      </CardTitle>
      <p className="text-lg text-gray-600 mt-2">
        Craft a magical moment that will be remembered forever ✨
      </p>
    </CardHeader>
  );
};

export default ProposalFormHeader;
