
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Heart, PartyPopper, Star, Crown, Gem, Sparkles, Gift } from 'lucide-react';

interface ProposalResponseCompleteProps {
  proposal: any;
  onBack: () => void;
}

const ProposalResponseComplete: React.FC<ProposalResponseCompleteProps> = ({ proposal, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-24 h-24 sm:w-32 sm:h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-32 h-32 sm:w-40 sm:h-40 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-5 right-1/3 sm:top-10 w-16 h-16 sm:w-20 sm:h-20 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-5 left-1/4 sm:bottom-10 w-12 h-12 sm:w-16 sm:h-16 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>
      <Card className="w-full max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm relative z-10 mx-2 sm:mx-4">
        <CardContent className="p-4 sm:p-8 md:p-12 lg:p-16 text-center">
          <div className="mb-6 sm:mb-8">
            {proposal.status === 'accepted' ? (
              <>
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-bounce shadow-2xl">
                  <PartyPopper className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />
                </div>
                <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 animate-pulse" />
                  <Crown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-600 animate-pulse" />
                  <Gem className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-500 animate-pulse" />
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-500 animate-pulse" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-600 mb-6 sm:mb-8">🎉 LOVE WINS! 🎉</h2>
                <p className="text-lg sm:text-2xl md:text-3xl text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2">
                  🌟 {proposal.partnerName} said <span className="font-bold text-green-600 text-xl sm:text-3xl md:text-4xl">YES</span> to {proposal.proposerName}! 🌟
                </p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-green-200 mb-6 sm:mb-8">
                  <p className="text-lg sm:text-xl md:text-2xl text-green-700 font-bold mb-3 sm:mb-4">
                    ✨ What a magical moment of love and commitment! ✨
                  </p>
                  <p className="text-base sm:text-lg text-green-600">
                    This is the beginning of a beautiful forever! 💕
                  </p>
                </div>

                {/* Celebration Section */}
                <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-yellow-300 shadow-xl mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">🎊 Time to Celebrate! 🎊</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    <div className="bg-white/80 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 border-yellow-200 shadow-lg">
                      <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">🥂</div>
                      <p className="font-bold text-gray-700 text-xs sm:text-sm md:text-base">Toast to Love</p>
                    </div>
                    <div className="bg-white/80 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 border-orange-200 shadow-lg">
                      <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">💐</div>
                      <p className="font-bold text-gray-700 text-xs sm:text-sm md:text-base">Flowers & Joy</p>
                    </div>
                    <div className="bg-white/80 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 border-pink-200 shadow-lg">
                      <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">🎂</div>
                      <p className="font-bold text-gray-700 text-xs sm:text-sm md:text-base">Sweet Moments</p>
                    </div>
                    <div className="bg-white/80 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 border-red-200 shadow-lg">
                      <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">💒</div>
                      <p className="font-bold text-gray-700 text-xs sm:text-sm md:text-base">Forever Plans</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl">
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-600 mb-6 sm:mb-8">💌 Heartfelt Response 💌</h2>
                <p className="text-lg sm:text-2xl md:text-3xl text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2">
                  {proposal.partnerName} has thoughtfully responded to {proposal.proposerName}'s beautiful proposal.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-red-200 mb-6 sm:mb-8">
                  <p className="text-lg sm:text-xl md:text-2xl text-red-700 font-bold mb-3 sm:mb-4">
                    💕 Love takes many forms, and honesty is always beautiful 💕
                  </p>
                  <p className="text-base sm:text-lg text-red-600">
                    Every response comes from the heart and deserves respect 🌹
                  </p>
                </div>
              </>
            )}
          </div>
          
          {proposal.reason && (
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 sm:border-3 border-gray-300 mb-6 sm:mb-8 md:mb-10 shadow-xl">
              <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-600" />
                  <span>Heartfelt Message</span>
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-500 animate-pulse" />
                </h3>
                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-inner">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 italic text-center leading-relaxed font-light">
                    "{proposal.reason}"
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Beautiful Wishes Section */}
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-purple-200 shadow-xl mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">🌟 Beautiful Wishes 🌟</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-white/80 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-purple-200 shadow-lg">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">🌈</div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">May Love Guide You</h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Whatever path your heart chooses, may it be filled with love, understanding, and beautiful moments.</p>
              </div>
              <div className="bg-white/80 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-pink-200 shadow-lg">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">🦋</div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">May You Find Peace</h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">In every decision and every moment, may your heart find the peace and joy it deserves.</p>
              </div>
            </div>
          </div>

          {/* Inspirational Quotes */}
          <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-indigo-200 shadow-xl mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">💫 Words of Wisdom 💫</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/90 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-indigo-200 shadow-inner">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 italic text-center leading-relaxed">
                  "The greatest thing you'll ever learn is just to love and be loved in return."
                </p>
                <p className="text-center text-gray-500 mt-3 sm:mt-4 font-semibold text-sm sm:text-base">- Moulin Rouge</p>
              </div>
              <div className="bg-white/90 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-blue-200 shadow-inner">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 italic text-center leading-relaxed">
                  "Love is not about possession, it's about appreciation."
                </p>
                <p className="text-center text-gray-500 mt-3 sm:mt-4 font-semibold text-sm sm:text-base">- Unknown</p>
              </div>
            </div>
          </div>
          
          {/* Final Blessing */}
          <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-yellow-300 shadow-2xl">
            <div className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Star className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-500 animate-pulse" />
              <Gift className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-500 animate-bounce" />
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500 animate-pulse" />
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-500 animate-bounce" />
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 mb-4 sm:mb-6">
              Thank You for Being Part of This Story
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6 px-2">
              ✨ Love stories like this remind us that the world is full of magic, courage, and beautiful hearts ✨
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="bg-white/70 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-yellow-200">
                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">💝</span>
                <p className="text-gray-700 font-bold text-sm sm:text-base">Made with Pure Love</p>
              </div>
              <div className="bg-white/70 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-orange-200">
                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">🌟</span>
                <p className="text-gray-700 font-bold text-sm sm:text-base">A Moment to Treasure</p>
              </div>
              <div className="bg-white/70 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-red-200">
                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">💕</span>
                <p className="text-gray-700 font-bold text-sm sm:text-base">Forever in Hearts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalResponseComplete;
