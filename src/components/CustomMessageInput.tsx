
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CustomMessageInputProps {
  customMessage: string;
  onCustomMessageChange: (value: string) => void;
}

const CustomMessageInput: React.FC<CustomMessageInputProps> = ({
  customMessage,
  onCustomMessageChange
}) => {
  return (
    <div className="space-y-2 px-2 sm:px-0">
      <Label htmlFor="customMessage" className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
        Your Heart's Message 💌 (Optional)
      </Label>
      <Textarea
        id="customMessage"
        value={customMessage}
        onChange={(e) => onCustomMessageChange(e.target.value)}
        placeholder="Write something special from your heart... Tell them why they mean the world to you!"
        className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base lg:text-lg border-2 border-pink-200 focus:border-pink-400 rounded-xl resize-none"
        maxLength={500}
      />
      <p className="text-xs sm:text-sm text-gray-500 px-1">{customMessage.length}/500 characters</p>
    </div>
  );
};

export default CustomMessageInput;
