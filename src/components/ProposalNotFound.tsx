
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface ProposalNotFoundProps {
  onBack: () => void;
}

const ProposalNotFound: React.FC<ProposalNotFoundProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-24 h-24 sm:w-32 sm:h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-32 h-32 sm:w-40 sm:h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md relative z-10 shadow-2xl bg-white/90 backdrop-blur-sm mx-4">
        <CardContent className="p-6 sm:p-8 md:p-12 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Proposal Not Found</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">This proposal link might be invalid or expired.</p>
          <Button onClick={onBack} className="w-full h-12 text-base sm:text-lg font-bold">
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalNotFound;
