
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Circle, Gift, Heart } from 'lucide-react';

interface ProposalTypeSelectorProps {
  proposalType: string;
  onProposalTypeChange: (value: string) => void;
}

const ProposalTypeSelector: React.FC<ProposalTypeSelectorProps> = ({
  proposalType,
  onProposalTypeChange
}) => {
  return (
    <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
      <Label className="text-base sm:text-lg font-semibold text-gray-700 flex items-center gap-2">
        <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
        Choose Your Proposal Type
      </Label>
      <RadioGroup value={proposalType} onValueChange={onProposalTypeChange}>
        <div className="flex items-center space-x-2 p-3 sm:p-4 border-2 border-pink-200 rounded-xl hover:border-pink-300 transition-colors">
          <RadioGroupItem value="marriage" id="marriage" />
          <Label htmlFor="marriage" className="flex items-center gap-2 cursor-pointer w-full">
            <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 flex-shrink-0" />
            <span className="text-sm sm:text-base lg:text-lg">Marriage Proposal 💍</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-3 sm:p-4 border-2 border-pink-200 rounded-xl hover:border-pink-300 transition-colors">
          <RadioGroupItem value="love" id="love" />
          <Label htmlFor="love" className="flex items-center gap-2 cursor-pointer w-full">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
            <span className="text-sm sm:text-base lg:text-lg">Love Declaration 💕</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ProposalTypeSelector;
