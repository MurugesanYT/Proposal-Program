
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
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>
      <Card className="w-full max-w-md relative z-10 shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Proposal Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">This proposal link might be invalid or expired.</p>
          <Button onClick={onBack} className="w-full h-12 text-lg font-bold">
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalNotFound;
