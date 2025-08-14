
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Share2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProposalLinkSharingProps {
  proposalData: any;
  proposalUrl: string;
}

const ProposalLinkSharing: React.FC<ProposalLinkSharingProps> = ({ proposalData, proposalUrl }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(proposalUrl);
      setCopied(true);
      toast({
        title: "💕 Link Copied!",
        description: "Share this magical link with your special someone!",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Oops!",
        description: "Failed to copy link. Please copy manually.",
        variant: "destructive"
      });
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${proposalData.proposerName} has something special for you!`,
          text: `${proposalData.partnerName}, you have a very special message waiting for you! 💕`,
          url: proposalUrl,
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-emerald-200 shadow-xl mx-2 sm:mx-0">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
        <Share2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
        <span>Your Magical Proposal Link</span>
        <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 animate-pulse" />
      </h3>
      <div className="flex flex-col gap-3 sm:gap-4">
        <Input
          value={proposalUrl}
          readOnly
          className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 sm:border-3 border-emerald-200 bg-white rounded-lg sm:rounded-xl shadow-inner font-mono overflow-hidden"
        />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={copyToClipboard}
            className="h-12 sm:h-14 px-4 sm:px-6 md:px-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center gap-2 sm:gap-3 shadow-lg transform transition-all duration-200 hover:scale-105 font-bold text-sm sm:text-base"
          >
            <Copy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span>{copied ? 'Copied! ✓' : 'Copy Link'}</span>
          </Button>
          <Button
            onClick={shareLink}
            className="h-12 sm:h-14 px-4 sm:px-6 md:px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center gap-2 sm:gap-3 shadow-lg transform transition-all duration-200 hover:scale-105 font-bold text-sm sm:text-base"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span>Share Now</span>
          </Button>
        </div>
      </div>
      <div className="mt-3 sm:mt-4 text-center">
        <p className="text-gray-600 text-xs sm:text-sm px-2">💡 Your partner will see a beautiful, personalized proposal page</p>
      </div>
    </div>
  );
};

export default ProposalLinkSharing;
