import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProposalNotFound from './ProposalNotFound';
import ProposalResponseComplete from './ProposalResponseComplete';
import ProposalHeader from './ProposalHeader';
import ProposalMessage from './ProposalMessage';
import ProposalResponseSection from './ProposalResponseSection';

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
  const [showResponseSuccess, setShowResponseSuccess] = useState(false);
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

      // Update local state but don't change status immediately - show success message first
      setProposal(prev => ({
        ...prev,
        reason: reason,
        respondedAt: new Date().toISOString()
      }));

      setShowResponseSuccess(true);

      toast({
        title: responseType === 'accept' ? "💕 Your Heart Has Spoken!" : "💔 Response Sent with Love",
        description: responseType === 'accept' 
          ? "Your acceptance has been sent! What a beautiful moment of love!"
          : "Your thoughtful response has been sent with love and respect.",
      });

      // After 5 seconds, update the status to show the completion screen
      setTimeout(() => {
        setProposal(prev => ({
          ...prev,
          status: responseType === 'accept' ? 'accepted' : 'rejected'
        }));
      }, 10000); // 10 seconds to see the response
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

      <Card className="w-full max-w-5xl relative z-10 shadow-2xl border-0 bg-white/98 backdrop-blur-sm">
        <ProposalHeader proposal={proposal} />

        <CardContent className="p-12 space-y-12">
          <div className="text-center space-y-10">
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

          {/* Success Response Display */}
          {showResponseSuccess && reason && (
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-12 rounded-3xl border-3 border-green-300 shadow-2xl animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <span className="text-6xl">💝</span>
                </div>
                <h3 className="text-5xl font-bold text-green-700 mb-6">
                  {response === 'accept' ? '🎉 Your Joyful Response! 🎉' : '💙 Your Thoughtful Response 💙'}
                </h3>
                <p className="text-2xl text-green-600 mb-8">
                  Your beautiful message has been sent to {proposal.proposerName} with all the love it deserves!
                </p>
              </div>
              
              <div className="bg-white/90 p-10 rounded-3xl border-3 border-green-200 shadow-xl">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-4xl">💕</span>
                  <h4 className="text-3xl font-bold text-gray-800">Your Heart's Message</h4>
                  <span className="text-4xl">💕</span>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 shadow-inner">
                  <p className="text-2xl text-gray-700 italic leading-relaxed text-center font-light">
                    "{reason}"
                  </p>
                </div>
                <div className="text-center mt-8">
                  <p className="text-xl text-green-600 font-semibold">
                    ✨ This message will be treasured forever ✨
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                <div className="bg-white/80 p-8 rounded-3xl border-3 border-green-200 shadow-xl text-center">
                  <div className="text-5xl mb-4">📬</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Message Delivered</h4>
                  <p className="text-gray-600">Your heartfelt words are on their way with love</p>
                </div>
                <div className="bg-white/80 p-8 rounded-3xl border-3 border-emerald-200 shadow-xl text-center">
                  <div className="text-5xl mb-4">💖</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Pure Authenticity</h4>
                  <p className="text-gray-600">Your honest response shows the beauty of your heart</p>
                </div>
                <div className="bg-white/80 p-8 rounded-3xl border-3 border-teal-200 shadow-xl text-center">
                  <div className="text-5xl mb-4">🌟</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Moment Captured</h4>
                  <p className="text-gray-600">This beautiful exchange will be remembered always</p>
                </div>
              </div>
            </div>
          )}

          {/* Enchanted Love Gardens Section */}
          <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-12 rounded-3xl border-3 border-emerald-200 shadow-2xl">
            <div className="text-center mb-10">
              <h3 className="text-5xl font-bold text-gray-800 mb-6">🌺 Enchanted Love Gardens 🌺</h3>
              <p className="text-2xl text-gray-700 leading-relaxed">Where every love story blooms eternal</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1">
                <div className="text-center">
                  <div className="text-7xl mb-6 animate-bounce">🌸</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Cherry Blossoms</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">Beautiful moments that come once in a lifetime, just like this precious proposal</p>
                </div>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-pink-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1">
                <div className="text-center">
                  <div className="text-7xl mb-6 animate-pulse">🌷</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Tulip Fields</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">Endless fields of pure beauty, representing the infinite nature of true love</p>
                </div>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1">
                <div className="text-center">
                  <div className="text-7xl mb-6 animate-bounce">🌻</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Sunflower Dreams</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">Always turning toward the light, just like hearts turning toward love</p>
                </div>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-rose-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1">
                <div className="text-center">
                  <div className="text-7xl mb-6 animate-pulse">🌺</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Hibiscus Paradise</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">Exotic and passionate, symbolizing the unique beauty of your connection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cosmic Love Constellation */}
          <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-12 rounded-3xl border-3 border-indigo-300 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute top-20 right-20 w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-300 rounded-full animate-ping"></div>
              <div className="absolute bottom-10 right-10 w-5 h-5 bg-purple-300 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-blue-300 rounded-full animate-ping"></div>
            </div>
            <div className="relative z-10 text-center mb-10">
              <h3 className="text-5xl font-bold text-gray-800 mb-6">🌟 Cosmic Love Constellation 🌟</h3>
              <p className="text-2xl text-gray-700 leading-relaxed">Your love is written in the stars</p>
            </div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white/80 p-10 rounded-3xl border-3 border-indigo-200 shadow-xl">
                <div className="text-center">
                  <div className="text-8xl mb-6">🌙</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Moon's Blessing</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">The moon has witnessed countless love stories, and yours shines the brightest among the stars</p>
                </div>
              </div>
              <div className="bg-white/80 p-10 rounded-3xl border-3 border-purple-200 shadow-xl">
                <div className="text-center">
                  <div className="text-8xl mb-6">⭐</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Starlight Promise</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">Like stars that light up the darkest nights, your love illuminates everything around you</p>
                </div>
              </div>
              <div className="bg-white/80 p-10 rounded-3xl border-3 border-pink-200 shadow-xl">
                <div className="text-center">
                  <div className="text-8xl mb-6">🌌</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Galaxy of Dreams</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">In the infinite cosmos, two hearts have found each other - a miracle beyond measure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enchanted Love Potions Laboratory */}
          <div className="bg-gradient-to-br from-violet-50 via-fuchsia-50 to-rose-50 p-12 rounded-3xl border-3 border-violet-300 shadow-2xl">
            <div className="text-center mb-10">
              <h3 className="text-5xl font-bold text-gray-800 mb-6">🧪 Love Alchemy Laboratory 🧪</h3>
              <p className="text-2xl text-gray-700 leading-relaxed">The perfect formula for eternal happiness</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-violet-200 shadow-xl group hover:bg-violet-50 transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">💜</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Trust Elixir</h4>
                  <p className="text-gray-600">3 cups of honesty + 2 tablespoons of understanding = Unbreakable bond</p>
                </div>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-fuchsia-200 shadow-xl group hover:bg-fuchsia-50 transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-spin">💖</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Joy Potion</h4>
                  <p className="text-gray-600">1 gallon of laughter + infinite smiles = Daily happiness</p>
                </div>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-rose-200 shadow-xl group hover:bg-rose-50 transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-pulse">💕</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Care Serum</h4>
                  <p className="text-gray-600">Unlimited hugs + gentle words = Healing power</p>
                </div>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl border-3 border-pink-200 shadow-xl group hover:bg-pink-50 transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">💝</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Forever Formula</h4>
                  <p className="text-gray-600">2 hearts + 1 destiny = Eternal love story</p>
                </div>
              </div>
            </div>
          </div>

          {/* Magical Love Castle */}
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-12 rounded-3xl border-3 border-amber-300 shadow-2xl relative">
            <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-300 rounded-full animate-ping opacity-50"></div>
            <div className="absolute top-4 right-4 w-6 h-6 bg-orange-300 rounded-full animate-bounce"></div>
            <div className="absolute bottom-4 left-4 w-5 h-5 bg-amber-300 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 right-4 w-7 h-7 bg-yellow-400 rounded-full animate-ping opacity-50"></div>
            
            <div className="text-center mb-10">
              <h3 className="text-5xl font-bold text-gray-800 mb-6">🏰 Enchanted Love Castle 🏰</h3>
              <p className="text-2xl text-gray-700 leading-relaxed">Where fairy tales come true</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white/80 p-10 rounded-3xl border-3 border-amber-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="text-8xl mb-6">👑</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Royal Court</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">Every love deserves to be treated like royalty, with respect, honor, and celebration</p>
                </div>
              </div>
              <div className="bg-white/80 p-10 rounded-3xl border-3 border-yellow-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="text-8xl mb-6">🗝️</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Golden Key</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">Love is the key that unlocks the door to happiness, adventure, and magical moments</p>
                </div>
              </div>
              <div className="bg-white/80 p-10 rounded-3xl border-3 border-orange-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="text-8xl mb-6">🎭</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Grand Ballroom</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">Where two souls dance together through all the seasons of life, in perfect harmony</p>
                </div>
              </div>
            </div>
          </div>

          {/* Butterfly Transformation Garden */}
          <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-12 rounded-3xl border-3 border-cyan-300 shadow-2xl">
            <div className="text-center mb-10">
              <h3 className="text-5xl font-bold text-gray-800 mb-6">🦋 Butterfly Transformation Garden 🦋</h3>
              <p className="text-2xl text-gray-700 leading-relaxed">Love transforms everything it touches</p>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-8 bg-white/80 p-8 rounded-3xl border-3 border-cyan-200 shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">🥚</div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">The Beginning</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">A tiny seed of attraction, planted in the garden of possibility</p>
                </div>
              </div>
              <div className="flex items-center gap-8 bg-white/80 p-8 rounded-3xl border-3 border-blue-200 shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">🐛</div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">The Growing</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">Learning about each other, growing closer with every shared moment</p>
                </div>
              </div>
              <div className="flex items-center gap-8 bg-white/80 p-8 rounded-3xl border-3 border-indigo-200 shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">🛡️</div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">The Cocoon</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">A safe space where love deepens and commitment forms</p>
                </div>
              </div>
              <div className="flex items-center gap-8 bg-white/80 p-8 rounded-3xl border-3 border-purple-200 shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">🦋</div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">The Transformation</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">Emerging as something beautiful together - this very moment!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Love Stories Section */}
          <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 p-10 rounded-3xl border-3 border-pink-200 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">💕 Love Stories Around the World 💕</h3>
              <p className="text-xl text-gray-600 leading-relaxed">Every love story is unique and magical, just like yours!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 p-8 rounded-2xl border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌹</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">The Perfect Moment</h4>
                  <p className="text-gray-600 leading-relaxed">True love finds its perfect moment when two hearts beat as one, creating memories that last forever.</p>
                </div>
              </div>
              <div className="bg-white/80 p-8 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-4">💫</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Endless Possibilities</h4>
                  <p className="text-gray-600 leading-relaxed">When love is real, every day becomes an adventure filled with laughter, joy, and endless possibilities.</p>
                </div>
              </div>
              <div className="bg-white/80 p-8 rounded-2xl border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎈</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Forever Together</h4>
                  <p className="text-gray-600 leading-relaxed">The best love stories never end - they continue to grow more beautiful with each passing day.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Romantic Quotes Section */}
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 p-10 rounded-3xl border-3 border-purple-200 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">✨ Words of Love ✨</h3>
              <p className="text-xl text-gray-600">Beautiful words that capture the essence of true love</p>
            </div>
            <div className="space-y-8">
              <div className="bg-white/90 p-8 rounded-2xl border-2 border-purple-200 shadow-inner">
                <p className="text-2xl text-gray-700 italic text-center leading-relaxed font-light">
                  "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage."
                </p>
                <p className="text-center text-gray-500 mt-4 font-semibold">- Lao Tzu</p>
              </div>
              <div className="bg-white/90 p-8 rounded-2xl border-2 border-pink-200 shadow-inner">
                <p className="text-2xl text-gray-700 italic text-center leading-relaxed font-light">
                  "The best thing to hold onto in life is each other."
                </p>
                <p className="text-center text-gray-500 mt-4 font-semibold">- Audrey Hepburn</p>
              </div>
              <div className="bg-white/90 p-8 rounded-2xl border-2 border-rose-200 shadow-inner">
                <p className="text-2xl text-gray-700 italic text-center leading-relaxed font-light">
                  "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."
                </p>
                <p className="text-center text-gray-500 mt-4 font-semibold">- Unknown</p>
              </div>
            </div>
          </div>

          {/* Interactive Love Meter */}
          <div className="bg-gradient-to-r from-red-50 via-pink-50 to-purple-50 p-10 rounded-3xl border-3 border-red-200 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">💖 Love Energy Meter 💖</h3>
              <p className="text-xl text-gray-600">Feel the love radiating from this special moment!</p>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-8 mb-6 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-400 via-red-400 to-purple-500 rounded-full animate-pulse" style={{width: '100%'}}></div>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse">
                  MAXIMUM LOVE DETECTED! 💕✨
                </p>
              </div>
            </div>
          </div>

          {/* Magical Wishes Section */}
          <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-10 rounded-3xl border-3 border-yellow-200 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">🌟 Magical Wishes for Your Love 🌟</h3>
              <p className="text-xl text-gray-600">Beautiful blessings for your journey together</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 p-8 rounded-2xl border-2 border-yellow-200 shadow-lg">
                <div className="text-center">
                  <div className="text-5xl mb-4">🌈</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">May Your Love Shine</h4>
                  <p className="text-gray-600 leading-relaxed">Like a rainbow after the storm, may your love bring color and joy to every day of your lives together.</p>
                </div>
              </div>
              <div className="bg-white/80 p-8 rounded-2xl border-2 border-orange-200 shadow-lg">
                <div className="text-center">
                  <div className="text-5xl mb-4">🦋</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">May You Grow Together</h4>
                  <p className="text-gray-600 leading-relaxed">Like butterflies emerging from their cocoon, may your love transform and grow more beautiful each day.</p>
                </div>
              </div>
              <div className="bg-white/80 p-8 rounded-2xl border-2 border-red-200 shadow-lg">
                <div className="text-center">
                  <div className="text-5xl mb-4">🌺</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">May You Bloom</h4>
                  <p className="text-gray-600 leading-relaxed">Like the most beautiful flowers in spring, may your love bloom eternally in all seasons of life.</p>
                </div>
              </div>
              <div className="bg-white/80 p-8 rounded-2xl border-2 border-pink-200 shadow-lg">
                <div className="text-center">
                  <div className="text-5xl mb-4">✨</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">May You Sparkle</h4>
                  <p className="text-gray-600 leading-relaxed">Like stars in the night sky, may your love continue to sparkle and light up the darkness for each other.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Love Timeline */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-10 rounded-3xl border-3 border-indigo-200 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">💝 Your Love Journey 💝</h3>
              <p className="text-xl text-gray-600">Every great love story has beautiful chapters</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-6 bg-white/80 p-6 rounded-2xl border-2 border-indigo-200 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">1</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">✨ The Meeting</h4>
                  <p className="text-gray-600">When two souls recognize each other for the first time...</p>
                </div>
              </div>
              <div className="flex items-center gap-6 bg-white/80 p-6 rounded-2xl border-2 border-purple-200 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">2</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">💕 The Connection</h4>
                  <p className="text-gray-600">Hearts start beating in perfect synchronization...</p>
                </div>
              </div>
              <div className="flex items-center gap-6 bg-white/80 p-6 rounded-2xl border-2 border-pink-200 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">3</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">🌟 This Moment</h4>
                  <p className="text-gray-600">A beautiful declaration of love that will be remembered forever...</p>
                </div>
              </div>
              <div className="flex items-center gap-6 bg-white/80 p-6 rounded-2xl border-2 border-red-200 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">∞</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">💖 Forever</h4>
                  <p className="text-gray-600">A lifetime of love, laughter, and endless adventures together...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Blessing Section */}
          <div className="text-center pt-10">
            <div className="bg-gradient-to-r from-gold-50 via-yellow-50 to-orange-50 p-12 rounded-3xl border-3 border-yellow-300 shadow-2xl">
              <div className="flex justify-center gap-4 mb-6">
                <span className="text-4xl animate-bounce">⭐</span>
                <span className="text-4xl animate-pulse">💫</span>
                <span className="text-4xl animate-bounce">✨</span>
                <span className="text-4xl animate-pulse">🌟</span>
                <span className="text-4xl animate-bounce">💖</span>
              </div>
              <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 mb-6">
                This Moment is Pure Magic
              </h3>
              <p className="text-2xl text-gray-700 mb-8 leading-relaxed font-light">
                ✨ You are witnessing something truly special - a moment of pure love, courage, and vulnerability ✨
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/70 p-6 rounded-xl border border-yellow-200">
                  <span className="text-2xl mb-2 block">💝</span>
                  <p className="text-gray-700 font-semibold">Created with Love</p>
                </div>
                <div className="bg-white/70 p-6 rounded-xl border border-orange-200">
                  <span className="text-2xl mb-2 block">🌟</span>
                  <p className="text-gray-700 font-semibold">Unique & Personal</p>
                </div>
                <div className="bg-white/70 p-6 rounded-xl border border-red-200">
                  <span className="text-2xl mb-2 block">💕</span>
                  <p className="text-gray-700 font-semibold">Filled with Hope</p>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                No matter what your heart decides, you are loved, you are special, and you deserve all the happiness in the world 🌈💕
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalViewer;
