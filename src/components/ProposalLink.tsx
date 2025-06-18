import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Eye, Heart, Share2, Sparkles } from 'lucide-react';
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

  // Check for updates to the proposal status every second
  useEffect(() => {
    const checkForUpdates = () => {
      const updatedData = localStorage.getItem(`proposal_${proposalData.id}`);
      if (updatedData) {
        const parsed = JSON.parse(updatedData);
        if (parsed.status !== currentProposal.status || parsed.reason !== currentProposal.reason) {
          setCurrentProposal(parsed);
          
          // Show celebration toast when proposal is accepted
          if (parsed.status === 'accepted' && currentProposal.status !== 'accepted') {
            toast({
              title: "🎉 AMAZING NEWS! 🎉",
              description: `${parsed.partnerName} said YES to your ${parsed.proposalType === 'marriage' ? 'marriage proposal' : 'love declaration'}!`,
            });
          }
        }
      }
    };

    const interval = setInterval(checkForUpdates, 1000);
    return () => clearInterval(interval);
  }, [proposalData.id, currentProposal.status, currentProposal.reason, toast]);

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
      case 'accepted': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'rejected': return <XCircle className="w-6 h-6 text-red-600" />;
      default: return <Clock className="w-6 h-6 text-blue-600" />;
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
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>

      <Card className="w-full max-w-4xl relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                {isMarriage ? (
                  <Circle className="w-12 h-12 text-white" />
                ) : (
                  <Heart className="w-12 h-12 text-white" />
                )}
              </div>
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-6 h-6 text-yellow-700" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Your {isMarriage ? 'Marriage Proposal' : 'Love Declaration'} is Live! ✨
          </CardTitle>
          <p className="text-xl text-gray-600 mb-4">
            Share this magical link with <span className="font-bold text-emerald-600">{currentProposal.partnerName}</span>
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span>💝 Created with Love</span>
            <span>🌟 Unique & Personal</span>
            <span>⚡ Real-time Updates</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Enhanced Response Status Card - This is what you requested! */}
          {currentProposal.status !== 'pending' && (
            <Card className={`border-3 ${getStatusColor()} shadow-xl overflow-hidden`}>
              <div className="bg-gradient-to-r from-white/20 to-transparent p-1">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        {currentProposal.status === 'accepted' ? (
                          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                            <PartyPopper className="w-10 h-10 text-white" />
                          </div>
                        ) : (
                          <div className="w-20 h-20 bg-red-400 rounded-full flex items-center justify-center">
                            <XCircle className="w-10 h-10 text-white" />
                          </div>
                        )}
                        {currentProposal.status === 'accepted' && (
                          <>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-spin">
                              <Star className="w-4 h-4 text-yellow-700 m-2" />
                            </div>
                            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full animate-pulse">
                              <Heart className="w-3 h-3 text-white m-1.5" />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">
                      {currentProposal.status === 'accepted' ? '🎉 CONGRATULATIONS! 🎉' : '💌 Response Received'}
                    </h2>
                    <p className="text-xl font-semibold mb-6">{getStatusText()}</p>
                  </div>

                  {/* This shows the message from your partner - the main feature you wanted! */}
                  {currentProposal.reason && (
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-white/50 shadow-inner">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <MessageCircle className="w-6 h-6 text-gray-600" />
                        <h3 className="text-xl font-bold text-gray-800">
                          Personal Message from {currentProposal.partnerName}:
                        </h3>
                        <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
                      </div>
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-200">
                        <p className="text-lg text-gray-700 italic text-center leading-relaxed font-medium">
                          "{currentProposal.reason}"
                        </p>
                      </div>
                    </div>
                  )}

                  {currentProposal.respondedAt && (
                    <div className="text-center mt-6 p-4 bg-white/60 rounded-xl">
                      <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        Responded on: <span className="font-semibold">{new Date(currentProposal.respondedAt).toLocaleString()}</span>
                      </p>
                    </div>
                  )}

                  {currentProposal.status === 'accepted' && (
                    <div className="text-center mt-6">
                      <p className="text-lg text-green-700 font-bold flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5" />
                        Time to celebrate your beautiful love story! 
                        <Zap className="w-5 h-5" />
                      </p>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          )}

          {/* Enhanced Link Sharing Section */}
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

          {/* Enhanced Feature Cards */}
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
                  Experience how your heartfelt {isMarriage ? 'proposal' : 'declaration'} will touch {currentProposal.partnerName}'s heart
                </p>
                <Button
                  onClick={() => onViewProposal(currentProposal.id)}
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

          {/* Enhanced Personal Message Display */}
          {proposalData.customMessage && (
            <Card className="border-3 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                  <h4 className="text-2xl font-bold text-gray-800">Your Heartfelt Message</h4>
                  <Heart className="w-8 h-8 text-pink-600 animate-pulse" />
                </div>
                <div className="bg-white/70 p-8 rounded-2xl border-2 border-purple-200 shadow-inner">
                  <p className="text-xl text-gray-700 italic text-center leading-relaxed font-medium">
                    "{proposalData.customMessage}"
                  </p>
                </div>
                <div className="text-center mt-4">
                  <p className="text-gray-600">💝 This beautiful message is part of your proposal</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats and Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 text-center p-4">
              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <p className="font-bold text-pink-700">Made with Love</p>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 text-center p-4">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="font-bold text-yellow-700">Unique Design</p>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 text-center p-4">
              <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-bold text-green-700">Instant Updates</p>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 text-center p-4">
              <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-bold text-purple-700">Special Moment</p>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Share Your Love?</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Your {isMarriage ? 'proposal' : 'declaration'} is perfectly crafted and waiting to create a magical moment!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={shareLink}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalLink;
