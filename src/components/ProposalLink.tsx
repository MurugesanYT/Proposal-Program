
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
  
  const proposalUrl = `${window.location.origin}/proposal/${proposalData.partnerName.toLowerCase().replace(/\s+/g, '-')}-${proposalData.id}`;

  // Check for updates to the proposal status every second
  useEffect(() => {
    const checkForUpdates = () => {
      const updatedData = localStorage.getItem(`proposal_${proposalData.id}`);
      if (updatedData) {
        const parsed = JSON.parse(updatedData);
        if (parsed.status !== currentProposal.status || parsed.reason !== currentProposal.reason) {
          setCurrentProposal(parsed);
          
          // Show celebration toast when proposal is accepted
          if (parsed.status === 'accepted' && currentProposal.status !== 'accepted') {
            toast({
              title: "🎉 AMAZING NEWS! 🎉",
              description: `${parsed.partnerName} said YES to your ${parsed.proposalType === 'marriage' ? 'marriage proposal' : 'love declaration'}!`,
            });
          }
        }
      }
    };

    const interval = setInterval(checkForUpdates, 1000);
    return () => clearInterval(interval);
  }, [proposalData.id, currentProposal.status, currentProposal.reason, toast]);

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentProposal.proposerName} has something special for you!`,
          text: `${currentProposal.partnerName}, you have a very special message waiting for you! 💕`,
          url: proposalUrl,
        });
      } catch (err) {
        // Fallback handled in ProposalLinkSharing component
      }
    }
  };

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
