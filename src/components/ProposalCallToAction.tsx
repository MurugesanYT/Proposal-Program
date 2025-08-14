
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
    <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-gray-200 mx-2 sm:mx-0">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">Ready to Share Your Love?</h3>
      <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg px-2">
        Your {isMarriage ? 'proposal' : 'declaration'} is perfectly crafted and waiting to create a magical moment!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <Button
          onClick={onShare}
          className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg sm:rounded-xl text-base sm:text-lg font-bold shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          <Share2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
          <span>Share the Magic Now ✨</span>
        </Button>
        <Button
          onClick={onBackToForm}
          variant="outline"
          className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border-2 sm:border-3 border-gray-300 hover:border-gray-400 rounded-lg sm:rounded-xl font-bold"
        >
          Create Another One 💕
        </Button>
      </div>
    </div>
  );
};

export default ProposalCallToAction;
