
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Heart, Sparkles, Users, Circle, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProposalFormProps {
  onProposalCreated: (proposalData: any) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ onProposalCreated }) => {
  const [proposerName, setProposerName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [proposerGender, setProposerGender] = useState('');
  const [partnerGender, setPartnerGender] = useState('');
  const [proposalType, setProposalType] = useState('marriage');
  const [customMessage, setCustomMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!proposerName || !partnerName || !proposerGender || !partnerGender || !proposalType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const proposalId = Date.now().toString();
    const proposalData = {
      id: proposalId,
      proposerName,
      partnerName,
      proposerGender,
      partnerGender,
      proposalType,
      customMessage,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Store in localStorage for persistence
    localStorage.setItem(`proposal_${proposalId}`, JSON.stringify(proposalData));
    
    setTimeout(() => {
      setIsSubmitting(false);
      onProposalCreated(proposalData);
      toast({
        title: "💕 Proposal Created!",
        description: "Your magical proposal is ready to share!",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>
      
      <Card className="w-full max-w-2xl relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="w-16 h-16 text-red-500 animate-pulse" />
              <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Create Your Perfect Proposal
          </CardTitle>
          <p className="text-lg text-gray-600 mt-2">
            Craft a magical moment that will be remembered forever ✨
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Choose Your Proposal Type
              </Label>
              <RadioGroup value={proposalType} onValueChange={setProposalType}>
                <div className="flex items-center space-x-2 p-4 border-2 border-pink-200 rounded-xl hover:border-pink-300 transition-colors">
                  <RadioGroupItem value="marriage" id="marriage" />
                  <Label htmlFor="marriage" className="flex items-center gap-2 cursor-pointer">
                    <Circle className="w-5 h-5 text-pink-600" />
                    <span className="text-lg">Marriage Proposal 💍</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 border-pink-200 rounded-xl hover:border-pink-300 transition-colors">
                  <RadioGroupItem value="love" id="love" />
                  <Label htmlFor="love" className="flex items-center gap-2 cursor-pointer">
                    <Heart className="w-5 h-5 text-red-600" />
                    <span className="text-lg">Love Declaration 💕</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="proposerName" className="text-lg font-semibold text-gray-700">
                  Your Name 💖
                </Label>
                <Input
                  id="proposerName"
                  value={proposerName}
                  onChange={(e) => setProposerName(e.target.value)}
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
                  onChange={(e) => setPartnerName(e.target.value)}
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
                <Select value={proposerGender} onValueChange={setProposerGender}>
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
                <Select value={partnerGender} onValueChange={setPartnerGender}>
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

            <div className="space-y-2">
              <Label htmlFor="customMessage" className="text-lg font-semibold text-gray-700">
                Your Heart's Message 💌 (Optional)
              </Label>
              <Textarea
                id="customMessage"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Write something special from your heart... Tell them why they mean the world to you!"
                className="min-h-[120px] text-lg border-2 border-pink-200 focus:border-pink-400 rounded-xl resize-none"
                maxLength={500}
              />
              <p className="text-sm text-gray-500">{customMessage.length}/500 characters</p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-xl font-bold bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Magic...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6" />
                  Create My {proposalType === 'marriage' ? 'Marriage Proposal' : 'Love Declaration'}
                  <Sparkles className="w-6 h-6" />
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalForm;
