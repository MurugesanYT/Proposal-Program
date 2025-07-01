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
import { Heart, Star, Crown, Gem, Sparkles, Gift, MessageCircle, Users, Lightbulb, Trophy, Zap, Rainbow, Coffee, Music, Camera, Book, Palette, Rocket, Globe, Sun, Moon, Flower, Diamond, Bug, Feather, Shield, Key, Droplets } from 'lucide-react';

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
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-2xl font-bold text-purple-600 animate-pulse">Loading your magical moment... ✨</p>
        </div>
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
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-200 rounded-2xl p-2">
              <TabsTrigger value="proposal" className="text-lg font-bold text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300">
                💕 Magical Proposal Experience
              </TabsTrigger>
              <TabsTrigger value="success-stories" className="text-lg font-bold text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-xl transition-all duration-300">
                🌟 Beautiful Success Stories
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalViewer;
