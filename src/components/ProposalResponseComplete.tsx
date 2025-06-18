
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MessageCircle, Heart, PartyPopper, Star, Crown, Gem } from 'lucide-react';

interface ProposalResponseCompleteProps {
  proposal: any;
  onBack: () => void;
}

const ProposalResponseComplete: React.FC<ProposalResponseCompleteProps> = ({ proposal, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>
      <Card className="w-full max-w-3xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm relative z-10">
        <CardContent className="p-16 text-center">
          <div className="mb-8">
            {proposal.status === 'accepted' ? (
              <>
                <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-2xl">
                  <PartyPopper className="w-16 h-16 text-white" />
                </div>
                <div className="flex justify-center gap-4 mb-6">
                  <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
                  <Crown className="w-8 h-8 text-yellow-600 animate-pulse" />
                  <Gem className="w-8 h-8 text-purple-500 animate-pulse" />
                </div>
                <h2 className="text-5xl font-bold text-green-600 mb-6">Proposal Accepted! 🎉</h2>
                <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                  🌟 {proposal.partnerName} said <span className="font-bold text-green-600">YES</span> to {proposal.proposerName}! 🌟
                </p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 mb-6">
                  <p className="text-lg text-green-700 font-semibold">
                    ✨ What a magical moment of love and commitment! ✨
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-32 h-32 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Heart className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-5xl font-bold text-red-600 mb-6">Response Sent 💌</h2>
                <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                  {proposal.partnerName} has thoughtfully responded to {proposal.proposerName}'s heartfelt proposal.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200 mb-6">
                  <p className="text-lg text-red-700 font-semibold">
                    💕 Love takes many forms, and honesty is always beautiful 💕
                  </p>
                </div>
              </>
            )}
          </div>
          
          {proposal.reason && (
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 mb-8 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                  <MessageCircle className="w-7 h-7 text-gray-600" />
                  Heartfelt Message:
                  <Heart className="w-7 h-7 text-pink-500 animate-pulse" />
                </h3>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-inner">
                  <p className="text-xl text-gray-700 italic text-center leading-relaxed">
                    "{proposal.reason}"
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            <Button 
              onClick={onBack} 
              className="h-14 px-12 text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-6 h-6 mr-3" />
              Back to Home
            </Button>
            <p className="text-gray-600 text-lg">
              ✨ Thank you for being part of this special moment ✨
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalResponseComplete;
