import React from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

interface ProposalHeroProps {
  proposal: any;
}

const ProposalHero: React.FC<ProposalHeroProps> = ({ proposal }) => {
  const isMarriage = proposal.proposalType === 'marriage';

  return (
    <header className="relative overflow-hidden rounded-t-lg">
      <div className="relative z-10 text-center px-4 py-10 sm:py-12 md:py-14 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 text-white">
        <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-6">
          <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 animate-pulse" />
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 animate-spin" />
          <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 animate-pulse" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
          {isMarriage ? 'A Magical Marriage Proposal' : 'A Beautiful Love Declaration'}
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-xl/relaxed opacity-95">
          From <span className="font-semibold">{proposal.proposerName}</span> to <span className="font-semibold">{proposal.partnerName}</span>
        </p>
        <p className="mt-2 text-xs sm:text-sm md:text-base opacity-90">
          ✨ A moment of pure love and courage ✨
        </p>
        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-white/90 text-xs sm:text-sm">
          <Star className="w-4 h-4" />
          Crafted with love • {new Date(proposal.createdAt).toLocaleDateString()}
        </div>
      </div>
      {/* Subtle glossy overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(255,255,255,0.18),_transparent_35%),_radial-gradient(circle_at_80%_0%,_rgba(255,255,255,0.10),_transparent_25%)]" />
    </header>
  );
};

export default ProposalHero;
