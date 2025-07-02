import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProposalNotFound from './ProposalNotFound';
import ProposalResponseComplete from './ProposalResponseComplete';
import ProposalHeader from './proposal/ProposalHeader';
import ProposalMessage from './proposal/ProposalMessage';
import ProposalResponseSection from './ProposalResponseSection';
import ProposalResponseSuccess from './proposal/ProposalResponseSuccess';
import LoveGardens from './proposal/LoveGardens';
import CosmicConstellation from './proposal/CosmicConstellation';
import LoveAlchemy from './proposal/LoveAlchemy';
import MagicalCastle from './proposal/MagicalCastle';
import ButterflyGarden from './proposal/ButterflyGarden';
import LoveStories from './proposal/LoveStories';
import RomanticQuotes from './proposal/RomanticQuotes';
import LoveMeter from './proposal/LoveMeter';
import MagicalWishes from './proposal/MagicalWishes';
import LoveTimeline from './proposal/LoveTimeline';
import FinalBlessing from './proposal/FinalBlessing';

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

      // Keep the response success visible permanently - no timeout
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

          {/* Success Response Display - No timeout */}
          {showResponseSuccess && reason && (
            <ProposalResponseSuccess 
              proposal={proposal}
              response={response!}
              reason={reason}
            />
          )}

          <LoveGardens />
          <CosmicConstellation />
          <LoveAlchemy />
          <MagicalCastle />
          <ButterflyGarden />
          <LoveStories />
          <RomanticQuotes />
          <LoveMeter />
          <MagicalWishes />
          <LoveTimeline />
          <FinalBlessing />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalViewer;
