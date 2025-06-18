
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, Copy, Share2, Eye, Clock, MessageCircle, CheckCircle, XCircle, Circle, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProposalLinkProps {
  proposalData: any;
  onBackToForm: () => void;
  onViewProposal: (id: string) => void;
}

const ProposalLink: React.FC<ProposalLinkProps> = ({ proposalData, onBackToForm, onViewProposal }) => {
  const [copied, setCopied] = useState(false);
  const [currentProposal, setCurrentProposal] = useState(proposalData);
  const { toast } = useToast();
  
  const proposalUrl = `${window.location.origin}/proposal/${proposalData.partnerName.toLowerCase().replace(/\s+/g, '-')}-${proposalData.id}`;

  // Check for updates to the proposal status
  useEffect(() => {
    const checkForUpdates = () => {
      const updatedData = localStorage.getItem(`proposal_${proposalData.id}`);
      if (updatedData) {
        const parsed = JSON.parse(updatedData);
        if (parsed.status !== currentProposal.status) {
          setCurrentProposal(parsed);
        }
      }
    };

    const interval = setInterval(checkForUpdates, 1000);
    return () => clearInterval(interval);
  }, [proposalData.id, currentProposal.status]);

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
          title: `${currentProposal.proposerName} has something special for you!`,
          text: `${currentProposal.partnerName}, you have a very special message waiting for you! 💕`,
          url: proposalUrl,
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const getStatusColor = () => {
    switch (currentProposal.status) {
      case 'accepted': return 'bg-green-50 border-green-200 text-green-800';
      case 'rejected': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getStatusIcon = () => {
    switch (currentProposal.status) {
      case 'accepted': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusText = () => {
    switch (currentProposal.status) {
      case 'accepted': return `${currentProposal.partnerName} said YES! 🎉`;
      case 'rejected': return `${currentProposal.partnerName} has responded`;
      default: return 'Waiting for response...';
    }
  };

  const isMarriage = currentProposal.proposalType === 'marriage';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <Card className="w-full max-w-3xl relative z-10 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                {isMarriage ? (
                  <Circle className="w-10 h-10 text-white" />
                ) : (
                  <Heart className="w-10 h-10 text-white" />
                )}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Your {isMarriage ? 'Marriage Proposal' : 'Love Declaration'} is Ready! 🎉
          </CardTitle>
          <p className="text-xl text-gray-600">
            Share this magical link with <span className="font-bold text-emerald-600">{currentProposal.partnerName}</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Response Status Card */}
          {currentProposal.status !== 'pending' && (
            <Card className={`border-2 ${getStatusColor()}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {getStatusIcon()}
                  <h4 className="text-lg font-bold">Response Received!</h4>
                </div>
                <p className="text-lg font-semibold mb-4">{getStatusText()}</p>
                {currentProposal.reason && (
                  <div className="bg-white/50 p-4 rounded-lg">
                    <h5 className="font-bold mb-2">Message from {currentProposal.partnerName}:</h5>
                    <p className="italic">"{currentProposal.reason}"</p>
                  </div>
                )}
                {currentProposal.respondedAt && (
                  <p className="text-sm text-gray-600 mt-2">
                    Responded on: {new Date(currentProposal.respondedAt).toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl border-2 border-emerald-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Share2 className="w-6 h-6 text-emerald-600" />
              Your Special Proposal Link
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={proposalUrl}
                readOnly
                className="flex-1 h-12 text-lg border-2 border-emerald-200 bg-white rounded-xl"
              />
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  className="h-12 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center gap-2"
                >
                  <Copy className="w-5 h-5" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  onClick={shareLink}
                  className="h-12 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-emerald-200 bg-emerald-50/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-emerald-600" />
                  <h4 className="text-lg font-bold text-gray-800">Preview Your {isMarriage ? 'Proposal' : 'Declaration'}</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  See how your {isMarriage ? 'proposal' : 'love declaration'} will look to {currentProposal.partnerName}
                </p>
                <Button
                  onClick={() => onViewProposal(currentProposal.id)}
                  className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Preview {isMarriage ? 'Proposal' : 'Declaration'}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h4 className="text-lg font-bold text-gray-800">Track Response</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Response status updates automatically
                </p>
                <div className={`p-3 rounded-lg ${getStatusColor()}`}>
                  <p className="text-sm font-medium flex items-center gap-2">
                    {getStatusIcon()}
                    Status: <span>{getStatusText()}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {proposalData.customMessage && (
            <Card className="border-2 border-purple-200 bg-purple-50/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                  <h4 className="text-lg font-bold text-gray-800">Your Personal Message</h4>
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "{proposalData.customMessage}"
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center">
            <Button
              onClick={onBackToForm}
              variant="outline"
              className="h-12 px-8 text-lg border-2 border-gray-300 hover:border-gray-400 rounded-xl"
            >
              Create Another Proposal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalLink;
