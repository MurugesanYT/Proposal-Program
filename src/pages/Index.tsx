
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProposalFormContainer from '@/components/ProposalFormContainer';
import ProposalForm from '@/components/ProposalForm';
import ProposalViewer from '@/components/ProposalViewer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, Crown, Gem, Sparkles, Gift, Users, Trophy, Zap, Rainbow, Coffee, Music, Camera, Book, Palette, Rocket, Globe, Sun, Moon, Flower, Diamond, Bug, Feather, Shield, Key, Clock, MapPin, Phone, Mail, Calendar, Award, Target, Lightbulb, Briefcase } from 'lucide-react';

const Index = () => {
  const { proposalSlug } = useParams();
  const [showViewer, setShowViewer] = useState(false);
  const [proposalData, setProposalData] = useState(null);

  React.useEffect(() => {
    console.log('Current path:', window.location.pathname);
    console.log('Proposal slug:', { _type: typeof proposalSlug, value: proposalSlug });
    
    if (proposalSlug) {
      setShowViewer(true);
    }
  }, [proposalSlug]);

  const handleProposalCreated = (data: any) => {
    setProposalData(data);
    setShowViewer(true);
  };

  if (showViewer && proposalSlug) {
    return (
      <ProposalViewer 
        proposalId={proposalSlug} 
        onBack={() => setShowViewer(false)} 
      />
    );
  }

  if (showViewer && proposalData) {
    return (
      <ProposalViewer 
        proposalId={proposalData.uniqueSlug} 
        onBack={() => {
          setShowViewer(false);
          setProposalData(null);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-purple-100">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-10 left-1/2 w-16 h-16 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-1/3 left-10 w-12 h-12 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Proposal Form Section */}
        <div id="proposal-form" className="py-20">
          <ProposalForm onProposalCreated={handleProposalCreated} />
        </div>
        
        {/* Hero Section with Enhanced Animations */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-20">
            <div className="flex justify-center gap-4 mb-8">
              <Heart className="w-16 h-16 text-red-500 animate-pulse" />
              <Star className="w-16 h-16 text-yellow-500 animate-bounce" />
              <Crown className="w-16 h-16 text-purple-500 animate-pulse" />
              <Gem className="w-16 h-16 text-pink-500 animate-bounce" />
            </div>
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 mb-8 animate-pulse">
              ✨ The Ultimate Love Experience ✨
            </h1>
            <p className="text-3xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
              Create magical moments, share your heart, and let love guide the way to your perfect proposal! 
              Join thousands of couples who found their happily ever after! 💕
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-red-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">💝</div>
                <div className="text-2xl font-bold text-red-600">10,247</div>
                <div className="text-gray-600">Love Stories</div>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-green-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">💍</div>
                <div className="text-2xl font-bold text-green-600">8,891</div>
                <div className="text-gray-600">Said YES!</div>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-blue-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">👰‍♀️</div>
                <div className="text-2xl font-bold text-blue-600">5,632</div>
                <div className="text-gray-600">Married</div>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-purple-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">⭐</div>
                <div className="text-2xl font-bold text-purple-600">99.8%</div>
                <div className="text-gray-600">Happy</div>
              </div>
            </div>
          </div>

          {/* Magical Features Galaxy */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-16 rounded-3xl border-3 border-indigo-200 shadow-2xl mb-20">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-4">
                <Rocket className="w-12 h-12 text-indigo-500 animate-bounce" />
                🌌 Magical Features Galaxy 🌌
                <Sparkles className="w-12 h-12 text-purple-500 animate-pulse" />
              </h2>
              <p className="text-2xl text-gray-600">Discover the incredible features that make your love story unforgettable!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-white/95 p-10 rounded-3xl border-2 border-indigo-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-spin transition-all duration-300">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">💕 Personalized Proposals</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Create unique, heartfelt proposals tailored to your love story. Every word, every moment, perfectly crafted for your special someone.</p>
                <div className="flex justify-center mt-6">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/95 p-10 rounded-3xl border-2 border-purple-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-all duration-300">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">✨ Magical Animations</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Experience breathtaking animations and visual effects that make your proposal feel like a fairy tale come to life.</p>
                <div className="flex justify-center mt-6">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/95 p-10 rounded-3xl border-2 border-pink-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse transition-all duration-300">
                  <Gift className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🎁 Instant Sharing</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Share your beautiful proposal instantly with a unique link. Perfect for that special moment when time is of the essence.</p>
                <div className="flex justify-center mt-6">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/95 p-10 rounded-3xl border-2 border-green-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-spin transition-all duration-300">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🛡️ Privacy Protected</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Your love story is sacred. We ensure complete privacy and security for your most intimate moments.</p>
                <div className="flex justify-center mt-6">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/95 p-10 rounded-3xl border-2 border-yellow-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-all duration-300">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🏆 Success Guaranteed</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Join thousands of successful couples who found their perfect match through our magical platform.</p>
                <div className="flex justify-center mt-6">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/95 p-10 rounded-3xl border-2 border-blue-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse transition-all duration-300">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🌍 Global Love Network</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Connect with love stories from around the world. Share your journey and inspire others to find their happiness.</p>
                <div className="flex justify-center mt-6">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Love Journey Timeline */}
          <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 p-16 rounded-3xl border-3 border-rose-200 shadow-2xl mb-20">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-4">
                <Book className="w-12 h-12 text-rose-500 animate-bounce" />
                📚 Your Love Journey Timeline 📚
                <Feather className="w-12 h-12 text-pink-500 animate-pulse" />
              </h2>
              <p className="text-2xl text-gray-600">Every great love story follows a beautiful path!</p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-rose-400 via-pink-400 to-purple-400 rounded-full"></div>
              
              <div className="space-y-16">
                <div className="flex items-center gap-8">
                  <div className="flex-1 text-right">
                    <Card className="bg-white/95 border-2 border-rose-200 shadow-xl">
                      <CardContent className="p-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-end gap-3">
                          ✨ The Spark Ignites
                          <Zap className="w-8 h-8 text-yellow-500" />
                        </h3>
                        <p className="text-gray-600 text-xl leading-relaxed">
                          That magical moment when you first realize this person is special. Hearts start racing, 
                          butterflies dance in your stomach, and suddenly the world feels more colorful! 💕
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl z-10 animate-pulse">
                    1
                  </div>
                  <div className="flex-1"></div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="flex-1"></div>
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl z-10 animate-bounce">
                    2
                  </div>
                  <div className="flex-1">
                    <Card className="bg-white/95 border-2 border-pink-200 shadow-xl">
                      <CardContent className="p-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                          <Heart className="w-8 h-8 text-red-500" />
                          💕 Growing Closer
                        </h3>
                        <p className="text-gray-600 text-xl leading-relaxed">
                          Shared laughter, deep conversations, and countless beautiful memories. Every moment together 
                          feels like a gift, and you can't imagine life without this amazing person! 🌟
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="flex-1 text-right">
                    <Card className="bg-white/95 border-2 border-purple-200 shadow-xl">
                      <CardContent className="p-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-end gap-3">
                          🌟 The Realization
                          <Star className="w-8 h-8 text-yellow-500" />
                        </h3>
                        <p className="text-gray-600 text-xl leading-relaxed">
                          The moment you know with absolute certainty - this is your person! The one you want to 
                          share all of life's adventures with, through every joy and challenge! 💎
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl z-10 animate-pulse">
                    3
                  </div>
                  <div className="flex-1"></div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="flex-1"></div>
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl z-10 animate-bounce">
                    4
                  </div>
                  <div className="flex-1">
                    <Card className="bg-white/95 border-2 border-blue-200 shadow-xl">
                      <CardContent className="p-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                          <Crown className="w-8 h-8 text-purple-500" />
                          👑 The Perfect Proposal
                        </h3>
                        <p className="text-gray-600 text-xl leading-relaxed">
                          Using our magical platform, you create the most beautiful, personalized proposal that 
                          captures your unique love story and makes this moment truly unforgettable! ✨
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="flex-1 text-right">
                    <Card className="bg-white/95 border-2 border-green-200 shadow-xl">
                      <CardContent className="p-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-end gap-3">
                          💍 Happily Ever After
                          <Diamond className="w-8 h-8 text-cyan-500" />
                        </h3>
                        <p className="text-gray-600 text-xl leading-relaxed">
                          The beginning of forever! Your love story continues to grow more beautiful with each 
                          passing day, filled with adventures, dreams, and endless love! 🎉
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl z-10 animate-pulse">
                    ∞
                  </div>
                  <div className="flex-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Love Quotes Carousel */}
          <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-16 rounded-3xl border-3 border-yellow-200 shadow-2xl mb-20">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-4">
                <Book className="w-12 h-12 text-yellow-500 animate-bounce" />
                📖 Timeless Love Wisdom 📖
                <Sparkles className="w-12 h-12 text-orange-500 animate-pulse" />
              </h2>
              <p className="text-2xl text-gray-600">Beautiful words from the greatest minds about love!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Card className="bg-white/95 border-2 border-yellow-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-10 text-center">
                  <div className="text-6xl mb-6">💕</div>
                  <p className="text-2xl text-gray-700 italic mb-6 leading-relaxed">
                    "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage."
                  </p>
                  <p className="text-lg text-gray-500 font-semibold">- Lao Tzu</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/95 border-2 border-orange-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-10 text-center">
                  <div className="text-6xl mb-6">✨</div>
                  <p className="text-2xl text-gray-700 italic mb-6 leading-relaxed">
                    "The best thing to hold onto in life is each other."
                  </p>
                  <p className="text-lg text-gray-500 font-semibold">- Audrey Hepburn</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/95 border-2 border-red-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-10 text-center">
                  <div className="text-6xl mb-6">🌟</div>
                  <p className="text-2xl text-gray-700 italic mb-6 leading-relaxed">
                    "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."
                  </p>
                  <p className="text-lg text-gray-500 font-semibold">- Unknown</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/95 border-2 border-pink-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-10 text-center">
                  <div className="text-6xl mb-6">💎</div>
                  <p className="text-2xl text-gray-700 italic mb-6 leading-relaxed">
                    "True love stories never have endings."
                  </p>
                  <p className="text-lg text-gray-500 font-semibold">- Richard Bach</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 border-3 border-purple-300 shadow-2xl">
              <CardContent className="p-16">
                <div className="flex justify-center gap-6 mb-8">
                  <Heart className="w-16 h-16 text-red-500 animate-pulse" />
                  <Crown className="w-16 h-16 text-purple-500 animate-bounce" />
                  <Star className="w-16 h-16 text-yellow-500 animate-pulse" />
                  <Diamond className="w-16 h-16 text-cyan-500 animate-bounce" />
                </div>
                <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 mb-8">
                  ✨ Ready to Create Magic? ✨
                </h2>
                <p className="text-3xl text-gray-700 mb-10 leading-relaxed max-w-4xl mx-auto">
                  Don't wait for the perfect moment - create it! Your love story deserves to be celebrated in the most beautiful way possible. 
                  Start your magical proposal journey today! 💕
                </p>
                <Button 
                  size="lg" 
                  className="text-2xl px-12 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transform hover:scale-110 transition-all duration-300 shadow-2xl"
                  onClick={() => document.getElementById('proposal-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  🚀 Create Your Proposal Now! 🚀
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
