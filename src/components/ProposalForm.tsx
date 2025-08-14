
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
      console.log('Creating proposal with data:', {
        proposer_name: proposerName,
        partner_name: partnerName,
        proposer_gender: proposerGender,
        partner_gender: partnerGender,
        proposal_type: proposalType,
        custom_message: customMessage || null,
        status: 'pending'
      });

      const { data, error } = await supabase
        .from('proposals')
        .insert({
          proposer_name: proposerName,
          partner_name: partnerName,
          proposer_gender: proposerGender,
          partner_gender: partnerGender,
          proposal_type: proposalType,
          custom_message: customMessage || null,
          status: 'pending',
          unique_slug: '' // Will be overridden by the database trigger
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

      console.log('Proposal created successfully:', data);

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
          
          {/* Developer Branding Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <div className="flex flex-col items-center justify-center space-y-2">
              <a
                href="https://www.instagram.com/_fan_boi_lm10_/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 hover:text-pink-500 transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-medium text-center sm:text-left">
                  This program was developed by
                </span>
                <span className="font-bold text-pink-600 group-hover:text-pink-700 underline decoration-dotted underline-offset-2 text-center">
                  _fan_boi_lm10_
                </span>
              </a>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Heart className="w-3 h-3 text-pink-400" />
                <span>Made with love</span>
                <Heart className="w-3 h-3 text-pink-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ProposalFormContainer>
  );
};

export default ProposalForm;
