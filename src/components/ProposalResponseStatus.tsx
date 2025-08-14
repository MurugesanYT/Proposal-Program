
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MessageCircle, Heart, XCircle, PartyPopper, Star, Zap } from 'lucide-react';

interface ProposalResponseStatusProps {
  proposal: any;
}

const ProposalResponseStatus: React.FC<ProposalResponseStatusProps> = ({ proposal }) => {
  const getStatusColor = () => {
    switch (proposal.status) {
      case 'accepted': return 'bg-green-50 border-green-200 text-green-800';
      case 'rejected': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getStatusText = () => {
    switch (proposal.status) {
      case 'accepted': return `${proposal.partnerName} said YES! 🎉`;
      case 'rejected': return `${proposal.partnerName} has responded`;
      default: return 'Waiting for response...';
    }
  };

  if (proposal.status === 'pending') {
    return null;
  }

  return (
    <Card className={`border-2 sm:border-3 ${getStatusColor()} shadow-xl overflow-hidden mx-2 sm:mx-0`}>
      <div className="bg-gradient-to-r from-white/20 to-transparent p-1">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="relative">
                {proposal.status === 'accepted' ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-400 rounded-full flex items-center justify-center">
                    <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                )}
                {proposal.status === 'accepted' && (
                  <>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full animate-spin">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-700 m-1.5 sm:m-2" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-5 h-5 sm:w-6 sm:h-6 bg-pink-400 rounded-full animate-pulse">
                      <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white m-1.25 sm:m-1.5" />
                    </div>
                  </>
                )}
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 px-2">
              {proposal.status === 'accepted' ? '🎉 CONGRATULATIONS! 🎉' : '💌 Response Received'}
            </h2>
            <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 px-2">{getStatusText()}</p>
          </div>

          {proposal.reason && (
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-white/50 shadow-inner">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3 sm:mb-4">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
                  Personal Message from {proposal.partnerName}:
                </h3>
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 animate-pulse" />
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-pink-200">
                <p className="text-base sm:text-lg text-gray-700 italic text-center leading-relaxed font-medium">
                  "{proposal.reason}"
                </p>
              </div>
            </div>
          )}

          {proposal.respondedAt && (
            <div className="text-center mt-4 sm:mt-6 p-3 sm:p-4 bg-white/60 rounded-lg sm:rounded-xl">
              <p className="text-xs sm:text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Responded on:</span>
                </div>
                <span className="font-semibold">{new Date(proposal.respondedAt).toLocaleString()}</span>
              </p>
            </div>
          )}

          {proposal.status === 'accepted' && (
            <div className="text-center mt-4 sm:mt-6">
              <p className="text-base sm:text-lg text-green-700 font-bold flex flex-col sm:flex-row items-center justify-center gap-2 px-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Time to celebrate your beautiful love story!</span>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              </p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default ProposalResponseStatus;
