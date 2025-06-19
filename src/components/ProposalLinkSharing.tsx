
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
    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-8 rounded-2xl border-3 border-emerald-200 shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
        <Share2 className="w-7 h-7 text-emerald-600" />
        Your Magical Proposal Link
        <Sparkles className="w-7 h-7 text-blue-600 animate-pulse" />
      </h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          value={proposalUrl}
          readOnly
          className="flex-1 h-14 text-lg border-3 border-emerald-200 bg-white rounded-xl shadow-inner font-mono"
        />
        <div className="flex gap-3">
          <Button
            onClick={copyToClipboard}
            className="h-14 px-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center gap-3 shadow-lg transform transition-all duration-200 hover:scale-105 font-bold"
          >
            <Copy className="w-6 h-6" />
            {copied ? 'Copied! ✓' : 'Copy Link'}
          </Button>
          <Button
            onClick={shareLink}
            className="h-14 px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-3 shadow-lg transform transition-all duration-200 hover:scale-105 font-bold"
          >
            <Share2 className="w-6 h-6" />
            Share Now
          </Button>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm">💡 Your partner will see a beautiful, personalized proposal page</p>
      </div>
    </div>
  );
};

export default ProposalLinkSharing;
