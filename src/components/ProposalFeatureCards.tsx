
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ProposalFeatureCardsProps {
  proposal: any;
  onViewProposal: (id: string) => void;
}

const ProposalFeatureCards: React.FC<ProposalFeatureCardsProps> = ({ proposal, onViewProposal }) => {
  const isMarriage = proposal.proposalType === 'marriage';

  const getStatusIcon = () => {
    switch (proposal.status) {
      case 'accepted': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'rejected': return <XCircle className="w-6 h-6 text-red-600" />;
      default: return <Clock className="w-6 h-6 text-blue-600" />;
    }
  };

  const getStatusText = () => {
    switch (proposal.status) {
      case 'accepted': return `${proposal.partnerName} said YES! 🎉`;
      case 'rejected': return `${proposal.partnerName} has responded`;
      default: return 'Waiting for response...';
    }
  };

  const getStatusColor = () => {
    switch (proposal.status) {
      case 'accepted': return 'bg-green-50 border-green-200 text-green-800';
      case 'rejected': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="border-3 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-800">Preview Your Magic</h4>
          </div>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Experience how your heartfelt {isMarriage ? 'proposal' : 'declaration'} will touch {proposal.partnerName}'s heart
          </p>
          <Button
            onClick={() => onViewProposal(proposal.id)}
            className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-lg font-bold shadow-lg"
          >
            <Eye className="w-6 h-6 mr-3" />
            Preview Experience
          </Button>
        </CardContent>
      </Card>

      <Card className="border-3 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              {getStatusIcon()}
            </div>
            <h4 className="text-xl font-bold text-gray-800">Live Response Tracking</h4>
          </div>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Get instant updates when your special someone responds
          </p>
          <div className={`p-4 rounded-xl ${getStatusColor()} border-2`}>
            <p className="text-lg font-bold flex items-center gap-3">
              {getStatusIcon()}
              {getStatusText()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalFeatureCards;
