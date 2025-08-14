
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
      <Card className="border-2 sm:border-3 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-full flex items-center justify-center">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">Preview Your Magic</h4>
          </div>
          <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed text-center sm:text-left">
            Experience how your heartfelt {isMarriage ? 'proposal' : 'declaration'} will touch {proposal.partnerName}'s heart
          </p>
          <Button
            onClick={() => onViewProposal(proposal.id)}
            className="w-full h-12 sm:h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg sm:rounded-xl text-base sm:text-lg font-bold shadow-lg"
          >
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            Preview Experience
          </Button>
        </CardContent>
      </Card>

      <Card className="border-2 sm:border-3 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center">
              {getStatusIcon()}
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">Live Response Tracking</h4>
          </div>
          <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed text-center sm:text-left">
            Get instant updates when your special someone responds
          </p>
          <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${getStatusColor()} border-2`}>
            <p className="text-base sm:text-lg font-bold flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalFeatureCards;
