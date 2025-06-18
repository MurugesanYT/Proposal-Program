
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users } from 'lucide-react';

interface PersonalInfoFormProps {
  proposerName: string;
  partnerName: string;
  proposerGender: string;
  partnerGender: string;
  onProposerNameChange: (value: string) => void;
  onPartnerNameChange: (value: string) => void;
  onProposerGenderChange: (value: string) => void;
  onPartnerGenderChange: (value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  proposerName,
  partnerName,
  proposerGender,
  partnerGender,
  onProposerNameChange,
  onPartnerNameChange,
  onProposerGenderChange,
  onPartnerGenderChange
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="proposerName" className="text-lg font-semibold text-gray-700">
            Your Name 💖
          </Label>
          <Input
            id="proposerName"
            value={proposerName}
            onChange={(e) => onProposerNameChange(e.target.value)}
            placeholder="Enter your beautiful name"
            className="h-12 text-lg border-2 border-pink-200 focus:border-pink-400 rounded-xl"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="partnerName" className="text-lg font-semibold text-gray-700">
            Their Name 💕
          </Label>
          <Input
            id="partnerName"
            value={partnerName}
            onChange={(e) => onPartnerNameChange(e.target.value)}
            placeholder="Your special someone's name"
            className="h-12 text-lg border-2 border-pink-200 focus:border-pink-400 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Your Gender
          </Label>
          <Select value={proposerGender} onValueChange={onProposerGenderChange}>
            <SelectTrigger className="h-12 text-lg border-2 border-pink-200 focus:border-pink-400 rounded-xl">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male 👨</SelectItem>
              <SelectItem value="female">Female 👩</SelectItem>
              <SelectItem value="non-binary">Non-binary 🌟</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Their Gender
          </Label>
          <Select value={partnerGender} onValueChange={onPartnerGenderChange}>
            <SelectTrigger className="h-12 text-lg border-2 border-pink-200 focus:border-pink-400 rounded-xl">
              <SelectValue placeholder="Select their gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male 👨</SelectItem>
              <SelectItem value="female">Female 👩</SelectItem>
              <SelectItem value="non-binary">Non-binary 🌟</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;
