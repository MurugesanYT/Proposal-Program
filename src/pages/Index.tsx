
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProposalForm from '../components/ProposalForm';
import ProposalLink from '../components/ProposalLink';
import ProposalViewer from '../components/ProposalViewer';

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'link' | 'proposal'>('form');
  const [proposalData, setProposalData] = useState<any>(null);
  const [proposalId, setProposalId] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const proposalMatch = path.match(/^\/proposal\/(.+)-(\d+)$/);
    
    if (proposalMatch) {
      const id = proposalMatch[2];
      setProposalId(id);
      setCurrentView('proposal');
    }
  }, [location.pathname]);

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
