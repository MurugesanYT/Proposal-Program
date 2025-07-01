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

          {/* New Dev Branding Section */}
          <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 p-10 rounded-3xl border-3 border-purple-400 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-white mb-4">💻 Crafted with Passion 💻</h3>
              <p className="text-xl text-purple-200">This magical experience was created with love and dedication</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-purple-300/30">
              <div className="text-center">
                <div className="text-5xl mb-4">👨‍💻</div>
                <h4 className="text-2xl font-bold text-white mb-3">Developed & Designed by</h4>
                <a 
                  href="https://www.instagram.com/_fan_boi_lm10_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 hover:from-purple-300 hover:via-pink-300 hover:to-red-300 transition-all duration-300 transform hover:scale-110 inline-block cursor-pointer"
                >
                  M.Kabilan ✨
                </a>
                <p className="text-purple-200 mt-4 text-lg">Full Stack Developer | UI/UX Designer | Love Story Creator</p>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                    <span className="text-white font-bold">React</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
                    <span className="text-white font-bold">TypeScript</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full">
                    <span className="text-white font-bold">Supabase</span>
                  </div>
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
