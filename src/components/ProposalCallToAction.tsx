
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface ProposalCallToActionProps {
  proposalData: any;
  onShare: () => void;
  onBackToForm: () => void;
}

const ProposalCallToAction: React.FC<ProposalCallToActionProps> = ({ 
  proposalData, 
  onShare, 
  onBackToForm 
}) => {
  const isMarriage = proposalData.proposalType === 'marriage';

  return (
    <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Share Your Love?</h3>
      <p className="text-gray-600 mb-6 text-lg">
        Your {isMarriage ? 'proposal' : 'declaration'} is perfectly crafted and waiting to create a magical moment!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onShare}
          className="h-14 px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl text-lg font-bold shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          <Share2 className="w-6 h-6 mr-3" />
          Share the Magic Now ✨
        </Button>
        <Button
          onClick={onBackToForm}
          variant="outline"
          className="h-14 px-8 text-lg border-3 border-gray-300 hover:border-gray-400 rounded-xl font-bold"
        >
          Create Another One 💕
        </Button>
      </div>
    </div>
  );
};

export default ProposalCallToAction;
