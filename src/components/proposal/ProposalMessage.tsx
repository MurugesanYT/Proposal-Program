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
    <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 sm:border-4 border-blue-200 shadow-2xl mx-2 sm:mx-0">
      <CardContent className="p-4 sm:p-6 md:p-10">
        <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
          <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-500 transform -rotate-12" />
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-purple-500 transform rotate-12" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 leading-tight">
            💝 A Message from the Heart 💝
          </h3>
          <div className="bg-white/80 p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-blue-300 shadow-inner">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-light italic px-2">
              "{proposal.customMessage || defaultMessage}"
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10">
            <div className="bg-white/60 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 border-blue-200">
              <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">💖</span>
              <p className="text-gray-700 font-semibold text-sm sm:text-base">Pure Love</p>
            </div>
            <div className="bg-white/60 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 border-purple-200">
              <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">🌟</span>
              <p className="text-gray-700 font-semibold text-sm sm:text-base">Honest Heart</p>
            </div>
            <div className="bg-white/60 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 border-pink-200">
              <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">💫</span>
              <p className="text-gray-700 font-semibold text-sm sm:text-base">Beautiful Moment</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalMessage;