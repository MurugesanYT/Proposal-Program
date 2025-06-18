import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Sparkles, ArrowLeft, MessageCircle, CheckCircle, XCircle, Ring, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProposalViewerProps {
  proposalId: string;
  onBack: () => void;
}

const ProposalViewer: React.FC<ProposalViewerProps> = ({ proposalId, onBack }) => {
  const [proposal, setProposal] = useState<any>(null);
  const [response, setResponse] = useState<'accept' | 'reject' | null>(null);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const proposalData = localStorage.getItem(`proposal_${proposalId}`);
    if (proposalData) {
      setProposal(JSON.parse(proposalData));
    }
  }, [proposalId]);

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Proposal Not Found</h2>
            <p className="text-gray-600 mb-6">This proposal link might be invalid or expired.</p>
            <Button onClick={onBack} className="w-full">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getGenderEmoji = (gender: string) => {
    switch (gender) {
      case 'male': return '👨';
      case 'female': return '👩';
      case 'non-binary': return '🌟';
      default: return '💫';
    }
  };

  const getProposalMessage = () => {
    const proposerEmoji = getGenderEmoji(proposal.proposerGender);
    const partnerEmoji = getGenderEmoji(proposal.partnerGender);
    const isMarriage = proposal.proposalType === 'marriage';
    
    if (isMarriage) {
      const messages = {
        'male-female': `My dearest ${proposal.partnerName}, you are the woman of my dreams, my soulmate, my everything. Will you marry me and make me the happiest man alive? 💍`,
        'female-male': `My darling ${proposal.partnerName}, you are my knight in shining armor, my protector, my love. Will you take my hand in marriage and be my husband forever? 💍`,
        'male-male': `My beloved ${proposal.partnerName}, you are my best friend, my partner, my heart. Will you marry me and start this beautiful journey together as husbands? 💍`,
        'female-female': `My beautiful ${proposal.partnerName}, you are my sunshine, my happiness, my forever love. Will you marry me and be my wife for all eternity? 💍`,
        'non-binary': `My amazing ${proposal.partnerName}, you are my perfect match, my chosen family, my heart's desire. Will you marry me and create our own beautiful love story together? 💍`,
      };

      const key = proposal.partnerGender === 'non-binary' || proposal.proposerGender === 'non-binary' 
        ? 'non-binary' 
        : `${proposal.proposerGender}-${proposal.partnerGender}`;
      
      return messages[key] || messages['non-binary'];
    } else {
      const loveMessages = {
        'male-female': `My beautiful ${proposal.partnerName}, I want you to know that you mean everything to me. You are the love of my life, and I want to spend every moment making you happy. I love you more than words can express! 💕`,
        'female-male': `My wonderful ${proposal.partnerName}, I need you to know how deeply I love you. You are my strength, my joy, and my heart's greatest treasure. I love you with all my soul! 💕`,
        'male-male': `My incredible ${proposal.partnerName}, you are my best friend, my partner, and the love of my life. I want to share every adventure with you. I love you completely! 💕`,
        'female-female': `My darling ${proposal.partnerName}, you are my sunshine, my happiness, and my everything. I want to love you and cherish you always. I love you beyond measure! 💕`,
        'non-binary': `My amazing ${proposal.partnerName}, you are my perfect match, my heart's desire, and my greatest love. I want to celebrate our love every single day. I love you infinitely! 💕`,
      };

      const key = proposal.partnerGender === 'non-binary' || proposal.proposerGender === 'non-binary' 
        ? 'non-binary' 
        : `${proposal.proposerGender}-${proposal.partnerGender}`;
      
      return loveMessages[key] || loveMessages['non-binary'];
    }
  };

  const handleResponse = async (responseType: 'accept' | 'reject') => {
    setResponse(responseType);
    setIsSubmitting(true);

    const responseData = {
      ...proposal,
      status: responseType === 'accept' ? 'accepted' : 'rejected',
      response: responseType,
      reason: reason,
      respondedAt: new Date().toISOString()
    };

    localStorage.setItem(`proposal_${proposalId}`, JSON.stringify(responseData));

    // Simulate real-time notification
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: responseType === 'accept' ? "💕 Congratulations!" : "💔 Response Sent",
        description: responseType === 'accept' 
          ? "Your acceptance has been sent! What a beautiful moment!"
          : "Your response has been sent with love and respect.",
      });
    }, 2000);
  };

  if (proposal.status === 'accepted' || proposal.status === 'rejected') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            {proposal.status === 'accepted' ? (
              <>
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-pulse" />
                <h2 className="text-4xl font-bold text-green-600 mb-4">Proposal Accepted! 🎉</h2>
                <p className="text-xl text-gray-700 mb-6">
                  {proposal.partnerName} said YES to {proposal.proposerName}!
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-red-600 mb-4">Proposal Responded</h2>
                <p className="text-xl text-gray-700 mb-6">
                  {proposal.partnerName} has responded to {proposal.proposerName}'s proposal.
                </p>
              </>
            )}
            {proposal.reason && (
              <div className="bg-gray-50 p-6 rounded-2xl mb-6">
                <h3 className="font-bold text-gray-800 mb-2">Message:</h3>
                <p className="text-gray-700 italic">"{proposal.reason}"</p>
              </div>
            )}
            <Button onClick={onBack} className="mt-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isMarriage = proposal.proposalType === 'marriage';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <Card className="w-full max-w-4xl relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                {isMarriage ? (
                  <Ring className="w-12 h-12 text-white animate-pulse" />
                ) : (
                  <Heart className="w-12 h-12 text-white animate-pulse" />
                )}
              </div>
              <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-5xl font-bold mb-4">
            {isMarriage ? '💍 A Marriage Proposal 💍' : '💕 A Love Declaration 💕'}
          </CardTitle>
          <p className="text-2xl font-light">
            Dear {proposal.partnerName}, {proposal.proposerName} has something incredibly special to {isMarriage ? 'ask' : 'tell'} you...
          </p>
        </CardHeader>

        <CardContent className="p-12 space-y-10">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 leading-relaxed">
                {getProposalMessage()}
              </h2>
              
              {proposal.customMessage && (
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-2xl border-2 border-pink-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                    <MessageCircle className="w-6 h-6 text-pink-600" />
                    A Personal Message from {proposal.proposerName}
                  </h3>
                  <p className="text-lg text-gray-700 italic leading-relaxed">
                    "{proposal.customMessage}"
                  </p>
                </div>
              )}
            </div>

            {!response && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    What is your answer, {proposal.partnerName}? 💫
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Button
                    onClick={() => handleResponse('accept')}
                    disabled={isSubmitting}
                    className="h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    <CheckCircle className="w-8 h-8 mr-3" />
                    {isMarriage ? 'YES, I DO! 💍' : 'I LOVE YOU TOO! 💕'}
                  </Button>
                  
                  <Button
                    onClick={() => handleResponse('reject')}
                    disabled={isSubmitting}
                    variant="outline"
                    className="h-16 text-xl font-bold border-2 border-gray-400 hover:border-gray-600 text-gray-700 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    <XCircle className="w-8 h-8 mr-3" />
                    I need to decline
                  </Button>
                </div>
              </div>
            )}

            {response && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800">
                  Please share your thoughts with {proposal.proposerName}
                </h3>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={response === 'accept' 
                    ? "Share your joy and excitement! Let them know how this makes you feel..." 
                    : "Please share your thoughts kindly and honestly..."}
                  className="min-h-[120px] text-lg border-2 border-pink-200 focus:border-pink-400 rounded-xl resize-none"
                />
                <Button
                  onClick={() => handleResponse(response)}
                  disabled={isSubmitting || !reason.trim()}
                  className="w-full h-14 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Response...
                    </div>
                  ) : (
                    `Send ${response === 'accept' ? 'Acceptance' : 'Response'} 💕`
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="text-center pt-8 border-t border-gray-200">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalViewer;
