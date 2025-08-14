
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Crown, Sparkles, Star, Zap, MessageCircle, Gift } from 'lucide-react';

interface ProposalMessageProps {
  proposal: any;
}

const ProposalMessage: React.FC<ProposalMessageProps> = ({ proposal }) => {
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

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-4 md:px-0">
      <Card className="bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border-2 sm:border-3 border-pink-200 shadow-xl">
        <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-500 animate-pulse" />
              <Crown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600" />
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500 animate-pulse" />
            </div>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed mb-6 sm:mb-8 text-center px-2">
            {getProposalMessage()}
          </h2>
          <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-pulse" />
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 animate-pulse" />
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 animate-pulse" />
          </div>
        </CardContent>
      </Card>
      
      {proposal.customMessage && (
        <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border-2 sm:border-3 border-purple-200 shadow-xl">
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center">
                A Personal Message from {proposal.proposerName}
              </h3>
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-600 animate-pulse" />
            </div>
            <div className="bg-white/80 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-purple-200 shadow-inner">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 italic leading-relaxed text-center font-medium">
                "{proposal.customMessage}"
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              <span className="text-base sm:text-lg text-gray-600 font-semibold">Written with Love</span>
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProposalMessage;
