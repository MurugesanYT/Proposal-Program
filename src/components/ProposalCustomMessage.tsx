
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Heart } from 'lucide-react';

interface ProposalCustomMessageProps {
  customMessage: string;
}

const ProposalCustomMessage: React.FC<ProposalCustomMessageProps> = ({ customMessage }) => {
  return (
    <Card className="border-3 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <MessageCircle className="w-8 h-8 text-purple-600" />
          <h4 className="text-2xl font-bold text-gray-800">Your Heartfelt Message</h4>
          <Heart className="w-8 h-8 text-pink-600 animate-pulse" />
        </div>
        <div className="bg-white/70 p-8 rounded-2xl border-2 border-purple-200 shadow-inner">
          <p className="text-xl text-gray-700 italic text-center leading-relaxed font-medium">
            "{customMessage}"
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-600">💝 This beautiful message is part of your proposal</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalCustomMessage;
