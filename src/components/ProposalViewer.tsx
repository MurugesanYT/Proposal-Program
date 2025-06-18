
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Sparkles, ArrowLeft, MessageCircle, CheckCircle, XCircle, Circle, Gift, Star, PartyPopper, Zap, Crown, Gem } from 'lucide-react';
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
        'male-female': `My dearest ${proposal.partnerName}, you are the woman of my dreams, my soulmate, my everything. From the moment I met you, I knew you were special. You make me laugh, you make me want to be a better person, and you make every day brighter just by being in it. Will you marry me and make me the happiest man alive? I promise to love you, cherish you, and stand by your side through all of life's adventures. 💍✨`,
        'female-male': `My darling ${proposal.partnerName}, you are my knight in shining armor, my protector, my love, and my best friend. You've shown me what true love really means, and I can't imagine my life without you in it. You make me feel safe, loved, and complete. Will you take my hand in marriage and be my husband forever? I promise to support your dreams, share in your joys, and love you more each day. 💍✨`,
        'male-male': `My beloved ${proposal.partnerName}, you are my best friend, my partner, my heart, and my home. You've brought so much joy and meaning into my life. With you, I've discovered what it means to truly love and be loved. Will you marry me and start this beautiful journey together as husbands? Let's build a life filled with love, laughter, and endless adventures. 💍✨`,
        'female-female': `My beautiful ${proposal.partnerName}, you are my sunshine, my happiness, my forever love, and my perfect match. You've taught me that love has no limits and that together we can conquer anything. You make my heart sing every single day. Will you marry me and be my wife for all eternity? I want to create a lifetime of magical moments with you. 💍✨`,
        'non-binary': `My amazing ${proposal.partnerName}, you are my perfect match, my chosen family, my heart's desire, and my greatest blessing. You've shown me what unconditional love looks like, and I'm so grateful to have you in my life. Will you marry me and create our own beautiful love story together? Let's write the most amazing chapter of our lives, hand in hand. 💍✨`,
      };

      const key = proposal.partnerGender === 'non-binary' || proposal.proposerGender === 'non-binary' 
        ? 'non-binary' 
        : `${proposal.proposerGender}-${proposal.partnerGender}`;
      
      return messages[key] || messages['non-binary'];
    } else {
      const loveMessages = {
        'male-female': `My beautiful ${proposal.partnerName}, I want you to know that you mean absolutely everything to me. You are the love of my life, my inspiration, and my greatest joy. Every moment with you feels like a gift, and I want to spend every moment making you happy. You have this incredible way of making everything better just by being yourself. I love you more than words can express, more than the stars in the sky! 💕✨`,
        'female-male': `My wonderful ${proposal.partnerName}, I need you to know how deeply and completely I love you. You are my strength, my joy, my comfort, and my heart's greatest treasure. You make me feel like the luckiest person in the world just by choosing to be with me. You've shown me what real love looks like, and I'm so grateful for every day we share. I love you with all my soul and beyond! 💕✨`,
        'male-male': `My incredible ${proposal.partnerName}, you are my best friend, my partner, the love of my life, and my everything. You've brought colors to my world I never knew existed. With you, every day is an adventure, and every moment is precious. I want to share every laugh, every dream, every beautiful moment with you. You complete me in ways I never thought possible. I love you completely and forever! 💕✨`,
        'female-female': `My darling ${proposal.partnerName}, you are my sunshine, my happiness, my everything, and the most beautiful soul I've ever known. You light up my world in the most magical way, and I can't imagine life without your smile, your laugh, and your love. You make every day feel like a fairy tale come true. I want to love you and cherish you always, through every season of life. I love you beyond measure and infinity! 💕✨`,
        'non-binary': `My amazing ${proposal.partnerName}, you are my perfect match, my heart's desire, my greatest love, and my soul's companion. You've brought so much beauty, joy, and meaning into my life. With you, I've learned that love is limitless and wonderful in all its forms. I want to celebrate our love every single day and create countless beautiful memories together. You are my everything, and I love you infinitely and eternally! 💕✨`,
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
        title: responseType === 'accept' ? "💕 Your Heart Has Spoken!" : "💔 Response Sent with Love",
        description: responseType === 'accept' 
          ? "Your acceptance has been sent! What a beautiful moment of love!"
          : "Your thoughtful response has been sent with love and respect.",
      });
    }, 2000);
  };

  if (proposal.status === 'accepted' || proposal.status === 'rejected') {
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
  }

  const isMarriage = proposal.proposalType === 'marriage';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>

      <Card className="w-full max-w-5xl relative z-10 shadow-2xl border-0 bg-white/98 backdrop-blur-sm">
        <CardHeader className="text-center pb-10 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white rounded-t-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-28 h-28 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl">
                  {isMarriage ? (
                    <Circle className="w-14 h-14 text-white animate-pulse" />
                  ) : (
                    <Heart className="w-14 h-14 text-white animate-pulse" />
                  )}
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400/90 rounded-full flex items-center justify-center animate-bounce shadow-xl">
                  <Sparkles className="w-7 h-7 text-yellow-700" />
                </div>
                <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-pink-400/90 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <CardTitle className="text-6xl font-bold mb-6 drop-shadow-lg">
                {isMarriage ? '💍 A Marriage Proposal 💍' : '💕 A Love Declaration 💕'}
              </CardTitle>
              <div className="flex justify-center gap-6 mb-4">
                <span className="text-xl">✨</span>
                <span className="text-xl">💖</span>
                <span className="text-xl">🌟</span>
                <span className="text-xl">💫</span>
                <span className="text-xl">💕</span>
              </div>
              <p className="text-3xl font-light leading-relaxed drop-shadow-md">
                Dear <span className="font-bold text-yellow-200">{proposal.partnerName}</span>, <br />
                <span className="font-bold text-yellow-200">{proposal.proposerName}</span> has something incredibly special to {isMarriage ? 'ask' : 'tell'} you...
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="text-xl text-white/90 leading-relaxed">
                💫 A moment crafted with love, just for you 💫
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-12 space-y-12">
          <div className="text-center space-y-10">
            {/* Enhanced Main Message */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border-3 border-pink-200 shadow-xl">
                <CardContent className="p-10">
                  <div className="flex justify-center mb-6">
                    <div className="flex gap-4">
                      <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
                      <Crown className="w-8 h-8 text-purple-600" />
                      <Heart className="w-8 h-8 text-red-500 animate-pulse" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 leading-relaxed mb-8">
                    {getProposalMessage()}
                  </h2>
                  <div className="flex justify-center gap-4 mt-6">
                    <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                    <Star className="w-6 h-6 text-purple-500 animate-pulse" />
                    <Zap className="w-6 h-6 text-blue-500 animate-pulse" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Custom Message Enhancement */}
              {proposal.customMessage && (
                <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border-3 border-purple-200 shadow-xl">
                  <CardContent className="p-10">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <MessageCircle className="w-8 h-8 text-purple-600" />
                      <h3 className="text-2xl font-bold text-gray-800">A Personal Message from {proposal.proposerName}</h3>
                      <Heart className="w-8 h-8 text-pink-600 animate-pulse" />
                    </div>
                    <div className="bg-white/80 p-8 rounded-2xl border-2 border-purple-200 shadow-inner">
                      <p className="text-2xl text-gray-700 italic leading-relaxed text-center font-medium">
                        "{proposal.customMessage}"
                      </p>
                    </div>
                    <div className="flex justify-center gap-3 mt-6">
                      <Gift className="w-6 h-6 text-green-500" />
                      <span className="text-lg text-gray-600 font-semibold">Written with Love</span>
                      <Gift className="w-6 h-6 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Enhanced Response Section */}
            {!response && (
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
            )}

            {/* Enhanced Message Input */}
            {response && (
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
            )}
          </div>

          {/* Enhanced Footer */}
          <div className="text-center pt-10 border-t-2 border-gray-200">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200 mb-6">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                ✨ This special moment was created with love, just for you ✨
              </p>
              <div className="flex justify-center gap-6 text-gray-600">
                <span>💝 Made with Care</span>
                <span>🌟 Unique & Personal</span>
                <span>💕 Filled with Love</span>
              </div>
            </div>
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-lg text-gray-600 hover:text-gray-800 h-12 px-8 rounded-xl"
            >
              <ArrowLeft className="w-6 h-6 mr-3" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalViewer;
