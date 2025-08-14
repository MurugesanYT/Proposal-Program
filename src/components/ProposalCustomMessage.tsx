
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Heart } from 'lucide-react';

interface ProposalCustomMessageProps {
  customMessage: string;
}

const ProposalCustomMessage: React.FC<ProposalCustomMessageProps> = ({ customMessage }) => {
  return (
    <Card className="border-2 sm:border-3 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl mx-2 sm:mx-0">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600" />
          <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center">Your Heartfelt Message</h4>
          <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-600 animate-pulse" />
        </div>
        <div className="bg-white/70 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-purple-200 shadow-inner">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 italic text-center leading-relaxed font-medium">
            "{customMessage}"
          </p>
        </div>
        <div className="text-center mt-3 sm:mt-4">
          <p className="text-gray-600 text-sm sm:text-base">💝 This beautiful message is part of your proposal</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalCustomMessage;
