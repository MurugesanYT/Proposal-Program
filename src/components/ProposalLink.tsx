
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProposalLinkHeader from './ProposalLinkHeader';
import ProposalResponseStatus from './ProposalResponseStatus';
import ProposalLinkSharing from './ProposalLinkSharing';
import ProposalFeatureCards from './ProposalFeatureCards';
import ProposalCustomMessage from './ProposalCustomMessage';
import ProposalStatsCards from './ProposalStatsCards';
import ProposalCallToAction from './ProposalCallToAction';

interface ProposalLinkProps {
  proposalData: any;
  onBackToForm: () => void;
  onViewProposal: (id: string) => void;
}

const ProposalLink: React.FC<ProposalLinkProps> = ({ proposalData, onBackToForm, onViewProposal }) => {
  const [currentProposal, setCurrentProposal] = useState(proposalData);
  const [proposalUrl, setProposalUrl] = useState('');
  const { toast } = useToast();

  // Update the proposal URL when the proposal data changes
  useEffect(() => {
    console.log('ProposalLink: Setting up proposal URL with data:', currentProposal);
    
    if (currentProposal.uniqueSlug) {
      const url = `${window.location.origin}/proposal/${currentProposal.uniqueSlug}`;
      console.log('ProposalLink: Generated URL with unique slug:', url);
      setProposalUrl(url);
    } else {
      // Fallback URL construction - this should rarely be used now
      const fallbackSlug = `${currentProposal.partnerName.toLowerCase().replace(/\s+/g, '-')}-${currentProposal.id.substring(0, 8)}`;
      const url = `${window.location.origin}/proposal/${fallbackSlug}`;
      console.log('ProposalLink: Generated fallback URL:', url);
      setProposalUrl(url);
      
      // Show a warning that we're using fallback
      toast({
        title: "URL Generated",
        description: "Using fallback URL generation. Please ensure the link works correctly.",
        variant: "destructive"
      });
    }
  }, [currentProposal, toast]);

  // Check for updates to the proposal status using Supabase realtime
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        console.log('ProposalLink: Checking for updates for proposal ID:', proposalData.id);
        
        const { data, error } = await supabase
          .from('proposals')
          .select('*')
          .eq('id', proposalData.id)
          .single();

        if (error) {
          console.error('ProposalLink: Error fetching proposal updates:', error);
          return;
        }

        console.log('ProposalLink: Fetched updated proposal data:', data);

        const updatedProposal = {
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

        if (updatedProposal.status !== currentProposal.status || updatedProposal.reason !== currentProposal.reason) {
          console.log('ProposalLink: Proposal status changed from', currentProposal.status, 'to', updatedProposal.status);
          setCurrentProposal(updatedProposal);
          
          // Show celebration toast when proposal is accepted
          if (updatedProposal.status === 'accepted' && currentProposal.status !== 'accepted') {
            toast({
              title: "🎉 AMAZING NEWS! 🎉",
              description: `${updatedProposal.partnerName} said YES to your ${updatedProposal.proposalType === 'marriage' ? 'marriage proposal' : 'love declaration'}!`,
            });
          }
        }
      } catch (error) {
        console.error('ProposalLink: Error checking for updates:', error);
      }
    };

    const interval = setInterval(checkForUpdates, 3000); // Check every 3 seconds
    return () => clearInterval(interval);
  }, [proposalData.id, currentProposal.status, currentProposal.reason, toast]);

  const shareLink = async () => {
    console.log('ProposalLink: Attempting to share URL:', proposalUrl);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentProposal.proposerName} has something special for you!`,
          text: `${currentProposal.partnerName}, you have a very special message waiting for you! 💕`,
          url: proposalUrl,
        });
        console.log('ProposalLink: Successfully shared via native share');
      } catch (err) {
        console.log('ProposalLink: Native share failed, falling back:', err);
        // Fallback handled in ProposalLinkSharing component
      }
    } else {
      console.log('ProposalLink: Native share not available');
    }
  };

  if (!proposalUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>

      <Card className="w-full max-w-4xl relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <ProposalLinkHeader proposalData={currentProposal} />

        <CardContent className="space-y-8">
          <ProposalResponseStatus proposal={currentProposal} />

          <ProposalLinkSharing 
            proposalData={currentProposal} 
            proposalUrl={proposalUrl} 
          />

          <ProposalFeatureCards 
            proposal={currentProposal} 
            onViewProposal={onViewProposal} 
          />

          {proposalData.customMessage && (
            <ProposalCustomMessage customMessage={proposalData.customMessage} />
          )}

          <ProposalStatsCards />

          <ProposalCallToAction 
            proposalData={currentProposal}
            onShare={shareLink}
            onBackToForm={onBackToForm}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalLink;
