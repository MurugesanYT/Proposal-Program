
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProposalFormHeader from './ProposalFormHeader';
import ProposalTypeSelector from './ProposalTypeSelector';
import PersonalInfoForm from './PersonalInfoForm';
import CustomMessageInput from './CustomMessageInput';
import ProposalFormContainer from './ProposalFormContainer';

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

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    try {
      const { data, error } = await supabase
        .from('proposals')
        .insert({
          proposer_name: proposerName,
          partner_name: partnerName,
          proposer_gender: proposerGender,
          partner_gender: partnerGender,
          proposal_type: proposalType,
          custom_message: customMessage || null,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating proposal:', error);
        toast({
          title: "Error",
          description: "Failed to create proposal. Please try again.",
          variant: "destructive"
        });
        return;
      }

      const proposalData = {
        id: data.id,
        proposerName: data.proposer_name,
        partnerName: data.partner_name,
        proposerGender: data.proposer_gender,
        partnerGender: data.partner_gender,
        proposalType: data.proposal_type,
        customMessage: data.custom_message,
        createdAt: data.created_at,
        status: data.status,
        uniqueSlug: data.unique_slug
      };

      onProposalCreated(proposalData);
      toast({
        title: "💕 Proposal Created!",
        description: "Your magical proposal is ready to share!",
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProposalFormContainer>
      <Card className="border-0 bg-transparent shadow-none">
        <ProposalFormHeader />
        
        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ProposalTypeSelector
              proposalType={proposalType}
              onProposalTypeChange={setProposalType}
            />

            <PersonalInfoForm
              proposerName={proposerName}
              partnerName={partnerName}
              proposerGender={proposerGender}
              partnerGender={partnerGender}
              onProposerNameChange={setProposerName}
              onPartnerNameChange={setPartnerName}
              onProposerGenderChange={setProposerGender}
              onPartnerGenderChange={setPartnerGender}
            />

            <CustomMessageInput
              customMessage={customMessage}
              onCustomMessageChange={setCustomMessage}
            />

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
    </ProposalFormContainer>
  );
};

export default ProposalForm;
