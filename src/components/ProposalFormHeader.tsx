
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';

const ProposalFormHeader = () => {
  return (
    <CardHeader className="text-center pb-4 sm:pb-6 lg:pb-8 px-2 sm:px-4 lg:px-6">
      <div className="flex justify-center mb-2 sm:mb-3 lg:mb-4">
        <div className="relative">
          <Heart className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-red-500 animate-pulse" />
          <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-400 absolute -top-1 -right-1 sm:-top-2 sm:-right-2 animate-pulse" />
        </div>
      </div>
      <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
        Create Your Perfect Proposal
      </CardTitle>
      <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1 sm:mt-2 px-2">
        Craft a magical moment that will be remembered forever ✨
      </p>
    </CardHeader>
  );
};

export default ProposalFormHeader;
