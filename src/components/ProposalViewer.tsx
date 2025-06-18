
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();

  useEffect(() => {
    const proposalData = localStorage.getItem(`proposal_${proposalId}`);
    if (proposalData) {
      setProposal(JSON.parse(proposalData));
    }
  }, [proposalId]);

  if (!proposal) {
    return <ProposalNotFound onBack={onBack} />;
  }

  const handleResponse = async (responseType: 'accept' | 'reject') => {
    setResponse(responseType);
    setIsSubmitting(true);

    const responseData = {
      ...proposal,
      status: responseType === 'accept' ? 'accepted' : 'rejected',
      response: responseType,
      reason: reason,
      respondedAt: new Date().toISOString()
    };

    localStorage.setItem(`proposal_${proposalId}`, JSON.stringify(responseData));

    // Simulate real-time notification
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: responseType === 'accept' ? "💕 Your Heart Has Spoken!" : "💔 Response Sent with Love",
        description: responseType === 'accept' 
          ? "Your acceptance has been sent! What a beautiful moment of love!"
          : "Your thoughtful response has been sent with love and respect.",
      });
    }, 2000);
  };

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

          <div className="text-center pt-10 border-t-2 border-gray-200">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200 mb-6">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                ✨ This special moment was created with love, just for you ✨
              </p>
              <div className="flex justify-center gap-6 text-gray-600">
                <span>💝 Made with Care</span>
                <span>🌟 Unique & Personal</span>
                <span>💕 Filled with Love</span>
              </div>
            </div>
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-lg text-gray-600 hover:text-gray-800 h-12 px-8 rounded-xl"
            >
              <ArrowLeft className="w-6 h-6 mr-3" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalViewer;
