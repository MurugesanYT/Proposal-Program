import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProposalNotFound from './ProposalNotFound';
import ProposalResponseComplete from './ProposalResponseComplete';
import ProposalHeader from './ProposalHeader';
import ProposalMessage from './ProposalMessage';
import ProposalResponseSection from './ProposalResponseSection';
import { Heart, Star, Crown, Gem, Sparkles, Gift, MessageCircle, Users, Lightbulb, Trophy, Zap, Rainbow, Coffee, Music, Camera, Book, Palette, Rocket, Globe, Sun, Moon, Flower, Diamond, Butterfly, Feather, Shield, Key } from 'lucide-react';

interface ProposalViewerProps {
  proposalId: string;
  onBack: () => void;
}

const ProposalViewer: React.FC<ProposalViewerProps> = ({ proposalId, onBack }) => {
  const [proposal, setProposal] = useState<any>(null);
  const [response, setResponse] = useState<'accept' | 'reject' | null>(null);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showResponseForm, setShowResponseForm] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProposal();
  }, [proposalId]);

  const fetchProposal = async () => {
    try {
      setIsLoading(true);
      setNotFound(false);
      
      console.log('ProposalViewer: Fetching proposal with ID/slug:', proposalId);
      console.log('ProposalViewer: Current window location:', window.location.href);
      
      // First try to fetch by unique_slug
      console.log('ProposalViewer: Attempting to fetch by unique_slug');
      let { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('unique_slug', proposalId)
        .maybeSingle();

      console.log('ProposalViewer: Fetch by unique_slug result:', { data, error, proposalId });

      // If not found by slug and proposalId looks like a UUID, try by id
      if (!data && !error && proposalId.length >= 32 && proposalId.includes('-')) {
        console.log('ProposalViewer: Trying to fetch by ID as fallback');
        const result = await supabase
          .from('proposals')
          .select('*')
          .eq('id', proposalId)
          .maybeSingle();
        
        data = result.data;
        error = result.error;
        console.log('ProposalViewer: Fetch by ID result:', { data, error });
      }

      // If still not found, try a more flexible approach - search for partial matches
      if (!data && !error) {
        console.log('ProposalViewer: Trying flexible search approach');
        
        // Extract the last 8 characters if it looks like it might contain a UUID fragment
        const possibleUuidFragment = proposalId.split('-').pop();
        if (possibleUuidFragment && possibleUuidFragment.length >= 8) {
          console.log('ProposalViewer: Searching by UUID fragment:', possibleUuidFragment);
          const result = await supabase
            .from('proposals')
            .select('*')
            .like('id', `%${possibleUuidFragment}%`)
            .limit(1)
            .maybeSingle();
          
          data = result.data;
          error = result.error;
          console.log('ProposalViewer: UUID fragment search result:', { data, error });
        }
      }

      // If still not found, log all proposals to debug
      if (!data && !error) {
        console.log('ProposalViewer: No proposal found, fetching all proposals for debugging');
        const allProposals = await supabase
          .from('proposals')
          .select('id, unique_slug, partner_name, proposer_name')
          .limit(10);
        
        console.log('ProposalViewer: Available proposals:', allProposals.data);
        console.log('ProposalViewer: Looking for:', proposalId);
      }

      if (error) {
        console.error('ProposalViewer: Database error:', error);
        setNotFound(true);
        return;
      }

      if (!data) {
        console.log('ProposalViewer: No proposal found for ID/slug:', proposalId);
        setNotFound(true);
        return;
      }

      console.log('ProposalViewer: Proposal found successfully:', data);

      const proposalData = {
        id: data.id,
        proposerName: data.proposer_name,
        partnerName: data.partner_name,
        proposerGender: data.proposer_gender,
        partnerGender: data.partner_gender,
        proposalType: data.proposal_type,
        customMessage: data.custom_message,
        createdAt: data.created_at,
        status: data.status,
        reason: data.response_message,
        respondedAt: data.responded_at,
        uniqueSlug: data.unique_slug
      };
      setProposal(proposalData);
    } catch (error) {
      console.error('ProposalViewer: Unexpected error fetching proposal:', error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = async (responseType: 'accept' | 'reject') => {
    setResponse(responseType);
    setIsSubmitting(true);

    try {
      console.log('ProposalViewer: Submitting response:', responseType, 'for proposal:', proposal.id);
      
      const { error } = await supabase
        .from('proposals')
        .update({
          status: responseType === 'accept' ? 'accepted' : 'rejected',
          response_message: reason,
          responded_at: new Date().toISOString()
        })
        .eq('id', proposal.id);

      if (error) {
        console.error('ProposalViewer: Error updating proposal:', error);
        toast({
          title: "Error",
          description: "Failed to send response. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('ProposalViewer: Response submitted successfully');

      // Update local state
      setProposal(prev => ({
        ...prev,
        status: responseType === 'accept' ? 'accepted' : 'rejected',
        reason: reason,
        respondedAt: new Date().toISOString()
      }));

      // Keep the response form visible permanently
      setShowResponseForm(true);

      toast({
        title: responseType === 'accept' ? "💕 Your Heart Has Spoken!" : "💔 Response Sent with Love",
        description: responseType === 'accept' 
          ? "Your acceptance has been sent! What a beautiful moment of love!"
          : "Your thoughtful response has been sent with love and respect.",
      });
    } catch (error) {
      console.error('ProposalViewer: Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-purple-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (notFound || !proposal) {
    return <ProposalNotFound onBack={onBack} />;
  }

  if (proposal.status === 'accepted' || proposal.status === 'rejected') {
    return <ProposalResponseComplete proposal={proposal} onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-10 left-1/2 w-16 h-16 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>

      <Card className="w-full max-w-7xl relative z-10 shadow-2xl border-0 bg-white/98 backdrop-blur-sm">
        <ProposalHeader proposal={proposal} />

        <CardContent className="p-12">
          <div className="text-center space-y-10 mb-12">
            <ProposalMessage proposal={proposal} />
            <ProposalResponseSection
              proposal={proposal}
              response={response}
              reason={reason}
              isSubmitting={isSubmitting}
              setReason={setReason}
              handleResponse={handleResponse}
            />
          </div>

          <Tabs defaultValue="proposal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-200 rounded-2xl p-2">
              <TabsTrigger value="proposal" className="text-lg font-bold text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300">
                💕 Proposal Experience
              </TabsTrigger>
              <TabsTrigger value="success-stories" className="text-lg font-bold text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-xl transition-all duration-300">
                🌟 Success Stories
              </TabsTrigger>
              <TabsTrigger value="dev-branding" className="text-lg font-bold text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-xl transition-all duration-300">
                💻 Developer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="proposal" className="space-y-12">
              {/* Love Energy Visualization */}
              <div className="bg-gradient-to-r from-red-50 via-pink-50 to-purple-50 p-12 rounded-3xl border-3 border-red-200 shadow-2xl">
                <div className="text-center mb-10">
                  <h3 className="text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-4">
                    <Heart className="w-12 h-12 text-red-500 animate-pulse" />
                    💖 Love Energy Visualization 💖
                    <Sparkles className="w-12 h-12 text-purple-500 animate-pulse" />
                  </h3>
                  <p className="text-2xl text-gray-600">Feel the magic of this moment pulsing through the universe!</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                  <div className="bg-white/90 p-8 rounded-2xl border-2 border-red-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Pure Love</h4>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div className="h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse" style={{width: '100%'}}></div>
                    </div>
                    <p className="text-gray-600">Maximum intensity detected! 💕</p>
                  </div>
                  
                  <div className="bg-white/90 p-8 rounded-2xl border-2 border-purple-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <Star className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Courage</h4>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div className="h-4 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-pulse" style={{width: '95%'}}></div>
                    </div>
                    <p className="text-gray-600">Incredible bravery shown! ⭐</p>
                  </div>
                  
                  <div className="bg-white/90 p-8 rounded-2xl border-2 border-yellow-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <Crown className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Romance</h4>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div className="h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" style={{width: '98%'}}></div>
                    </div>
                    <p className="text-gray-600">Royal level romance! 👑</p>
                  </div>
                  
                  <div className="bg-white/90 p-8 rounded-2xl border-2 border-green-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <Gem className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Hope</h4>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div className="h-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse" style={{width: '100%'}}></div>
                    </div>
                    <p className="text-gray-600">Infinite possibilities ahead! 💎</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-4 bg-white/90 px-8 py-4 rounded-2xl border-2 border-rainbow shadow-xl">
                    <Rainbow className="w-8 h-8 text-purple-500 animate-spin" />
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-pulse">
                      COSMIC LOVE ENERGY: MAXIMUM LEVEL ACHIEVED! ✨
                    </span>
                    <Zap className="w-8 h-8 text-yellow-500 animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Interactive Love Compass */}
              <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 p-12 rounded-3xl border-3 border-blue-200 shadow-2xl">
                <div className="text-center mb-10">
                  <h3 className="text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-4">
                    <Globe className="w-12 h-12 text-blue-500 animate-spin" />
                    🧭 Love Compass Navigation 🧭
                    <Star className="w-12 h-12 text-yellow-500 animate-pulse" />
                  </h3>
                  <p className="text-2xl text-gray-600">Let love guide your heart to the right direction!</p>
                </div>
                
                <div className="relative">
                  <div className="w-80 h-80 mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-spin" style={{animationDuration: '10s'}}></div>
                    <div className="absolute inset-4 bg-white rounded-full shadow-inner flex items-center justify-center">
                      <div className="text-center">
                        <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                        <p className="text-xl font-bold text-gray-800">True North</p>
                        <p className="text-lg text-gray-600">❤️ LOVE ❤️</p>
                      </div>
                    </div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                  <div className="bg-white/90 p-6 rounded-2xl border-2 border-blue-200 shadow-lg text-center">
                    <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-3 animate-pulse" />
                    <h4 className="font-bold text-gray-800">North: Hope</h4>
                    <p className="text-sm text-gray-600">Bright future ahead</p>
                  </div>
                  <div className="bg-white/90 p-6 rounded-2xl border-2 border-green-200 shadow-lg text-center">
                    <Flower className="w-8 h-8 text-green-500 mx-auto mb-3 animate-bounce" />
                    <h4 className="font-bold text-gray-800">East: Growth</h4>
                    <p className="text-sm text-gray-600">Love blossoming</p>
                  </div>
                  <div className="bg-white/90 p-6 rounded-2xl border-2 border-purple-200 shadow-lg text-center">
                    <Moon className="w-8 h-8 text-purple-500 mx-auto mb-3 animate-pulse" />
                    <h4 className="font-bold text-gray-800">South: Dreams</h4>
                    <p className="text-sm text-gray-600">Magical moments</p>
                  </div>
                  <div className="bg-white/90 p-6 rounded-2xl border-2 border-orange-200 shadow-lg text-center">
                    <Star className="w-8 h-8 text-orange-500 mx-auto mb-3 animate-spin" />
                    <h4 className="font-bold text-gray-800">West: Destiny</h4>
                    <p className="text-sm text-gray-600">Written in stars</p>
                  </div>
                </div>
              </div>

              {/* Love Story Timeline */}
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 p-12 rounded-3xl border-3 border-purple-200 shadow-2xl">
                <div className="text-center mb-10">
                  <h3 className="text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-4">
                    <Book className="w-12 h-12 text-purple-500 animate-bounce" />
                    📖 Your Epic Love Story Timeline 📖
                    <Feather className="w-12 h-12 text-pink-500 animate-pulse" />
                  </h3>
                  <p className="text-2xl text-gray-600">Every great love story has beautiful chapters!</p>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 via-pink-400 to-red-400 rounded-full"></div>
                  
                  <div className="space-y-12">
                    <div className="flex items-center gap-8">
                      <div className="flex-1 text-right">
                        <div className="bg-white/90 p-8 rounded-2xl border-2 border-purple-200 shadow-xl">
                          <h4 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-end gap-3">
                            ✨ The First Spark
                            <Sparkles className="w-6 h-6 text-purple-500" />
                          </h4>
                          <p className="text-gray-600 text-lg">When two souls first recognize the magic between them...</p>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl z-10">
                        1
                      </div>
                      <div className="flex-1"></div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="flex-1"></div>
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl z-10">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/90 p-8 rounded-2xl border-2 border-pink-200 shadow-xl">
                          <h4 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                            <Heart className="w-6 h-6 text-red-500" />
                            💕 Growing Connection
                          </h4>
                          <p className="text-gray-600 text-lg">Hearts beating in perfect harmony, creating beautiful memories...</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="flex-1 text-right">
                        <div className="bg-white/90 p-8 rounded-2xl border-2 border-yellow-200 shadow-xl">
                          <h4 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-end gap-3">
                            🌟 This Magical Moment
                            <Crown className="w-6 h-6 text-yellow-500" />
                          </h4>
                          <p className="text-gray-600 text-lg">A brave declaration of love that will echo through eternity...</p>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl z-10 animate-pulse">
                        ✨
                      </div>
                      <div className="flex-1"></div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="flex-1"></div>
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl z-10">
                        ∞
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/90 p-8 rounded-2xl border-2 border-green-200 shadow-xl">
                          <h4 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                            <Diamond className="w-6 h-6 text-teal-500" />
                            💎 Forever & Always
                          </h4>
                          <p className="text-gray-600 text-lg">A lifetime of adventures, laughter, and unconditional love...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Magical Wish Fountain */}
              <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 p-12 rounded-3xl border-3 border-cyan-200 shadow-2xl">
                <div className="text-center mb-10">
                  <h3 className="text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-4">
                    <Fountain className="w-12 h-12 text-blue-500" />
                    ⛲ Magical Wish Fountain ⛲
                    <Sparkles className="w-12 h-12 text-cyan-500 animate-pulse" />
                  </h3>
                  <p className="text-2xl text-gray-600">Make a wish for your love story!</p>
                </div>
                
                <div className="relative">
                  <div className="w-96 h-96 mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full"></div>
                    <div className="absolute inset-8 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full"></div>
                    <div className="absolute inset-16 bg-white rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative">
                          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mx-auto mb-4 animate-bounce"></div>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                            <div className="flex flex-col items-center space-y-1">
                              <div className="w-1 h-8 bg-blue-400 animate-pulse"></div>
                              <div className="w-1 h-6 bg-cyan-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                              <div className="w-1 h-4 bg-blue-300 animate-pulse" style={{animationDelay: '1s'}}></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-gray-800">Fountain of Love</p>
                        <p className="text-sm text-gray-600">Toss a coin, make a wish! 🪙</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                  <div className="bg-white/90 p-6 rounded-2xl border-2 border-blue-200 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
                    <Gift className="w-8 h-8 text-blue-500 mx-auto mb-3 animate-bounce" />
                    <h4 className="font-bold text-gray-800 mb-2">Wish for Joy</h4>
                    <p className="text-sm text-gray-600">May your days be filled with laughter and happiness</p>
                  </div>
                  <div className="bg-white/90 p-6 rounded-2xl border-2 border-cyan-200 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
                    <Shield className="w-8 h-8 text-cyan-500 mx-auto mb-3 animate-pulse" />
                    <h4 className="font-bold text-gray-800 mb-2">Wish for Protection</h4>
                    <p className="text-sm text-gray-600">May your love be shielded from all harm</p>
                  </div>
                  <div className="bg-white/90 p-6 rounded-2xl border-2 border-indigo-200 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
                    <Key className="w-8 h-8 text-indigo-500 mx-auto mb-3 animate-bounce" />
                    <h4 className="font-bold text-gray-800 mb-2">Wish for Understanding</h4>
                    <p className="text-sm text-gray-600">May you always have the key to each other's hearts</p>
                  </div>
                  <div className="bg-white/90 p-6 rounded-2xl border-2 border-purple-200 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
                    <Butterfly className="w-8 h-8 text-purple-500 mx-auto mb-3 animate-pulse" />
                    <h4 className="font-bold text-gray-800 mb-2">Wish for Growth</h4>
                    <p className="text-sm text-gray-600">May your love transform and grow like butterflies</p>
                  </div>
                </div>
              </div>

              {/* Love Universe Explorer */}
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-12 rounded-3xl border-3 border-indigo-200 shadow-2xl">
                <div className="text-center mb-10">
                  <h3 className="text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-4">
                    <Rocket className="w-12 h-12 text-indigo-500 animate-bounce" />
                    🚀 Love Universe Explorer 🚀
                    <Star className="w-12 h-12 text-yellow-500 animate-spin" />
                  </h3>
                  <p className="text-2xl text-gray-600">Explore the infinite possibilities of your love!</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white/90 p-8 rounded-2xl border-2 border-indigo-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Coffee className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Planet Coffee Dates ☕</h4>
                    <p className="text-gray-600 mb-4">Cozy mornings, shared dreams, and endless conversations over steaming cups.</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/90 p-8 rounded-2xl border-2 border-purple-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Music className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Galaxy of Melodies 🎵</h4>
                    <p className="text-gray-600 mb-4">Dancing under the stars, sharing your favorite songs, creating your unique soundtrack.</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/90 p-8 rounded-2xl border-2 border-pink-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Memory Constellation 📸</h4>
                    <p className="text-gray-600 mb-4">Capturing precious moments, building a treasure trove of beautiful memories together.</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/90 p-8 rounded-2xl border-2 border-blue-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Palette className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Creative Nebula 🎨</h4>
                    <p className="text-gray-600 mb-4">Painting dreams together, creating art that expresses your unique love story.</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/90 p-8 rounded-2xl border-2 border-green-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Achievement Sector 🏆</h4>
                    <p className="text-gray-600 mb-4">Celebrating milestones, supporting each other's dreams and accomplishments.</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/90 p-8 rounded-2xl border-2 border-yellow-200 shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Lightbulb className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Innovation Station 💡</h4>
                    <p className="text-gray-600 mb-4">Inspiring each other, coming up with brilliant ideas and solutions together.</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="success-stories" className="space-y-12">
              {/* Success Stories Collection */}
              <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-12 rounded-3xl border-3 border-green-200 shadow-2xl">
                <div className="text-center mb-12">
                  <h3 className="text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-4">
                    <Trophy className="w-12 h-12 text-green-500 animate-bounce" />
                    🏆 Legendary Love Success Stories 🏆
                    <Crown className="w-12 h-12 text-yellow-500 animate-pulse" />
                  </h3>
                  <p className="text-2xl text-gray-600">Real couples, real magic, real happily ever afters!</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white/95 p-8 rounded-3xl border-2 border-green-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-10 h-10 text-white animate-pulse" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">Sarah & Michael</h4>
                      <p className="text-lg text-green-600 font-semibold">Together for 3 years! 💕</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-700 italic text-center leading-relaxed">
                        "He proposed through this magical app during sunset. I said YES immediately! 
                        Now we're planning our dream wedding. Thank you for bringing us together! ✨"
                      </p>
                      <div className="flex justify-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/95 p-8 rounded-3xl border-2 border-blue-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Diamond className="w-10 h-10 text-white animate-pulse" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">Emma & James</h4>
                      <p className="text-lg text-blue-600 font-semibold">Married last month! 💍</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-700 italic text-center leading-relaxed">
                        "The most romantic proposal ever! The beautiful design made the moment even more special. 
                        We're now happily married and couldn't be more grateful! 🌟"
                      </p>
                      <div className="flex justify-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/95 p-8 rounded-3xl border-2 border-purple-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-10 h-10 text-white animate-pulse" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">Lisa & David</h4>
                      <p className="text-lg text-purple-600 font-semibold">Engaged! 💎</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-700 italic text-center leading-relaxed">
                        "Perfect timing, perfect proposal! The magical experience made our love story even more beautiful. 
                        Planning our future together now! 💕"
                      </p>
                      <div className="flex justify-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-12">
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-2xl border-2 border-yellow-300 shadow-xl">
                    <h4 className="text-3xl font-bold text-gray-800 mb-4">🎉 Over 10,000 Successful Proposals! 🎉</h4>
                    <p className="text-xl text-gray-700 mb-6">Join thousands of couples who found their happily ever after!</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">10,247</div>
                        <div className="text-sm text-gray-600">Total Proposals</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">8,891</div>
                        <div className="text-sm text-gray-600">Said YES! 💕</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">5,632</div>
                        <div className="text-sm text-gray-600">Now Married</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-pink-600">99.8%</div>
                        <div className="text-sm text-gray-600">Happiness Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dev-branding" className="space-y-12">
              {/* Developer Branding Section */}
              <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 p-12 rounded-3xl border-3 border-purple-400 shadow-2xl">
                <div className="text-center mb-10">
                  <h3 className="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
                    <Rocket className="w-12 h-12 text-purple-400 animate-bounce" />
                    💻 Crafted with Passion & Love 💻
                    <Sparkles className="w-12 h-12 text-cyan-400 animate-pulse" />
                  </h3>
                  <p className="text-2xl text-purple-200">This magical love experience was created with dedication and care</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-10 rounded-3xl border border-purple-300/30 mb-10">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Users className="w-16 h-16 text-white" />
                    </div>
                    <h4 className="text-4xl font-bold text-white mb-4">Developed & Designed by</h4>
                    <a 
                      href="https://www.instagram.com/_fan_boi_lm10_/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 hover:from-purple-300 hover:via-pink-300 hover:to-red-300 transition-all duration-300 transform hover:scale-110 inline-block cursor-pointer mb-6"
                    >
                      M.Kabilan ✨
                    </a>
                    <p className="text-purple-200 text-xl mb-8">Full Stack Developer | UI/UX Designer | Love Story Creator</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl transform hover:scale-105 transition-all duration-300">
                        <span className="text-white font-bold text-lg">React</span>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl transform hover:scale-105 transition-all duration-300">
                        <span className="text-white font-bold text-lg">TypeScript</span>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-2xl transform hover:scale-105 transition-all duration-300">
                        <span className="text-white font-bold text-lg">Supabase</span>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-2xl transform hover:scale-105 transition-all duration-300">
                        <span className="text-white font-bold text-lg">Tailwind</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-purple-300/30">
                    <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <Heart className="w-6 h-6 text-red-400" />
                      Mission Statement
                    </h4>
                    <p className="text-purple-200 leading-relaxed text-lg">
                      "To create digital experiences that bring people together, celebrate love, and make 
                      beautiful moments even more magical. Every line of code is written with the hope 
                      of creating happiness in someone's life. 💕"
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-purple-300/30">
                    <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <Star className="w-6 h-6 text-yellow-400" />
                      Vision
                    </h4>
                    <p className="text-purple-200 leading-relaxed text-lg">
                      "To revolutionize how love stories are shared and celebrated in the digital age. 
                      Making technology a bridge that connects hearts and creates unforgettable memories 
                      that last a lifetime. ✨"
                    </p>
                  </div>
                </div>
                
                <div className="text-center mt-10">
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-8 rounded-2xl border border-pink-300/30">
                    <h4 className="text-3xl font-bold text-white mb-4">💖 Thank You for Being Part of This Journey 💖</h4>
                    <p className="text-xl text-purple-200 leading-relaxed">
                      Every proposal created, every "yes" received, and every love story shared makes this work meaningful. 
                      You are not just users - you are the heart and soul of this platform. Thank you for trusting us 
                      with your most precious moments! 🌟
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalViewer;
