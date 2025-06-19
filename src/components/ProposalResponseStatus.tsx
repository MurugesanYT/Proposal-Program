
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
    <Card className={`border-3 ${getStatusColor()} shadow-xl overflow-hidden`}>
      <div className="bg-gradient-to-r from-white/20 to-transparent p-1">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                {proposal.status === 'accepted' ? (
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <PartyPopper className="w-10 h-10 text-white" />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-red-400 rounded-full flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-white" />
                  </div>
                )}
                {proposal.status === 'accepted' && (
                  <>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-spin">
                      <Star className="w-4 h-4 text-yellow-700 m-2" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full animate-pulse">
                      <Heart className="w-3 h-3 text-white m-1.5" />
                    </div>
                  </>
                )}
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {proposal.status === 'accepted' ? '🎉 CONGRATULATIONS! 🎉' : '💌 Response Received'}
            </h2>
            <p className="text-xl font-semibold mb-6">{getStatusText()}</p>
          </div>

          {proposal.reason && (
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-white/50 shadow-inner">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MessageCircle className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  Personal Message from {proposal.partnerName}:
                </h3>
                <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-200">
                <p className="text-lg text-gray-700 italic text-center leading-relaxed font-medium">
                  "{proposal.reason}"
                </p>
              </div>
            </div>
          )}

          {proposal.respondedAt && (
            <div className="text-center mt-6 p-4 bg-white/60 rounded-xl">
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Responded on: <span className="font-semibold">{new Date(proposal.respondedAt).toLocaleString()}</span>
              </p>
            </div>
          )}

          {proposal.status === 'accepted' && (
            <div className="text-center mt-6">
              <p className="text-lg text-green-700 font-bold flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Time to celebrate your beautiful love story! 
                <Zap className="w-5 h-5" />
              </p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default ProposalResponseStatus;
