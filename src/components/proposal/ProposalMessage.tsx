import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface ProposalMessageProps {
  proposal: any;
}

const ProposalMessage: React.FC<ProposalMessageProps> = ({ proposal }) => {
  const isMarriage = proposal.proposalType === 'marriage';
  
  const defaultMessage = isMarriage
    ? `My dearest ${proposal.partnerName}, you are the love of my life and I cannot imagine spending another day without you by my side. Will you marry me and make me the happiest person in the world? 💍✨`
    : `${proposal.partnerName}, you mean everything to me. Every moment with you feels like magic, and I want you to know that I love you with all my heart. You are my sunshine, my happiness, and my everything. 💕`;

  return (
    <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-4 border-blue-200 shadow-2xl">
      <CardContent className="p-12">
        <div className="text-center space-y-8">
          <div className="flex justify-center gap-4 mb-8">
            <Quote className="w-12 h-12 text-blue-500 transform -rotate-12" />
            <Quote className="w-12 h-12 text-purple-500 transform rotate-12" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800 mb-8">
            💝 A Message from the Heart 💝
          </h3>
          <div className="bg-white/80 p-10 rounded-3xl border-3 border-blue-300 shadow-inner">
            <p className="text-2xl text-gray-700 leading-relaxed font-light italic">
              "{proposal.customMessage || defaultMessage}"
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white/60 p-6 rounded-2xl border-2 border-blue-200">
              <span className="text-3xl mb-3 block">💖</span>
              <p className="text-gray-700 font-semibold">Pure Love</p>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl border-2 border-purple-200">
              <span className="text-3xl mb-3 block">🌟</span>
              <p className="text-gray-700 font-semibold">Honest Heart</p>
            </div>
            <div className="bg-white/60 p-6 rounded-2xl border-2 border-pink-200">
              <span className="text-3xl mb-3 block">💫</span>
              <p className="text-gray-700 font-semibold">Beautiful Moment</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalMessage;