
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProposalForm from '../components/ProposalForm';
import ProposalLink from '../components/ProposalLink';
import ProposalViewer from '../components/ProposalViewer';

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'link' | 'proposal'>('form');
  const [proposalData, setProposalData] = useState<any>(null);
  const [proposalId, setProposalId] = useState<string>('');
  const location = useLocation();
  const { proposalSlug } = useParams();

  useEffect(() => {
    console.log('Current path:', location.pathname);
    console.log('Proposal slug:', proposalSlug);
    
    if (proposalSlug) {
      // Use the full slug as the ID for database lookup
      console.log('Using proposal slug as ID:', proposalSlug);
      setProposalId(proposalSlug);
      setCurrentView('proposal');
    } else {
      setCurrentView('form');
    }
  }, [location.pathname, proposalSlug]);

  const handleProposalCreated = (data: any) => {
    setProposalData(data);
    setCurrentView('link');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
    setProposalData(null);
  };

  const handleViewProposal = (id: string) => {
    setProposalId(id);
    setCurrentView('proposal');
  };

  const handleBackFromProposal = () => {
    if (proposalData) {
      setCurrentView('link');
    } else {
      setCurrentView('form');
    }
  };

  if (currentView === 'proposal') {
    return (
      <ProposalViewer 
        proposalId={proposalId}
        onBack={handleBackFromProposal}
      />
    );
  }

  if (currentView === 'link') {
    return (
      <ProposalLink
        proposalData={proposalData}
        onBackToForm={handleBackToForm}
        onViewProposal={handleViewProposal}
      />
    );
  }

  return (
    <ProposalForm onProposalCreated={handleProposalCreated} />
  );
};

export default Index;
