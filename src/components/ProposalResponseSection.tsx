
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star, CheckCircle, XCircle, MessageCircle, Heart } from 'lucide-react';

interface ProposalResponseSectionProps {
  proposal: any;
  response: 'accept' | 'reject' | null;
  reason: string;
  isSubmitting: boolean;
  setReason: (reason: string) => void;
  handleResponse: (responseType: 'accept' | 'reject') => void;
}

const ProposalResponseSection: React.FC<ProposalResponseSectionProps> = ({
  proposal,
  response,
  reason,
  isSubmitting,
  setReason,
  handleResponse
}) => {
  const isMarriage = proposal.proposalType === 'marriage';

  if (!response) {
    return (
      <div className="space-y-10">
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-3 border-yellow-300 shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-4">
              <Star className="w-10 h-10 text-yellow-500 animate-pulse" />
              What is your answer, {proposal.partnerName}?
              <Star className="w-10 h-10 text-yellow-500 animate-pulse" />
            </h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              💫 Take a moment to let your heart speak... Your response will be sent to {proposal.proposerName} with all the love and care it deserves 💫
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Button
            onClick={() => handleResponse('accept')}
            disabled={isSubmitting}
            className="h-20 text-2xl font-bold bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 text-white rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 border-3 border-green-400"
          >
            <div className="flex items-center gap-4">
              <CheckCircle className="w-10 h-10" />
              <div className="text-center">
                <div>{isMarriage ? 'YES, I DO! 💍' : 'I LOVE YOU TOO! 💕'}</div>
                <div className="text-sm font-normal opacity-90">My heart says yes!</div>
              </div>
            </div>
          </Button>
          
          <Button
            onClick={() => handleResponse('reject')}
            disabled={isSubmitting}
            variant="outline"
            className="h-20 text-2xl font-bold border-3 border-gray-400 hover:border-gray-600 text-gray-700 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 bg-white hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <XCircle className="w-10 h-10" />
              <div className="text-center">
                <div>I need to decline</div>
                <div className="text-sm font-normal opacity-70">With love and respect</div>
              </div>
            </div>
          </Button>
        </div>
        
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
          <p className="text-lg text-blue-700 font-semibold">
            💝 Whatever you choose, your honesty and kindness matter most 💝
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-3 border-indigo-200 shadow-xl">
        <CardContent className="p-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
            <MessageCircle className="w-8 h-8 text-indigo-600" />
            Share your heart with {proposal.proposerName}
            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            {response === 'accept' 
              ? "💖 Express your joy, excitement, and love! Let them know how this beautiful moment makes you feel..."
              : "💙 Share your thoughts with kindness and honesty. Your words will help them understand your heart..."}
          </p>
        </CardContent>
      </Card>
      
      <Textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder={response === 'accept' 
          ? "My heart is overflowing with joy! I'm so excited to share this beautiful journey with you..." 
          : "I want to share my thoughts with you honestly and lovingly..."}
        className="min-h-[150px] text-xl border-3 border-indigo-200 focus:border-indigo-400 rounded-2xl resize-none shadow-lg p-6"
      />
      
      <Button
        onClick={() => handleResponse(response)}
        disabled={isSubmitting || !reason.trim()}
        className="w-full h-16 text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending with Love...
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Heart className="w-8 h-8" />
            Send {response === 'accept' ? 'My Joyful Yes' : 'My Honest Response'} 💕
          </div>
        )}
      </Button>
    </div>
  );
};

export default ProposalResponseSection;
