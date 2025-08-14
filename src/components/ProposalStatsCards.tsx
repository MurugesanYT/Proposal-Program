
import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Star, Zap, Gift } from 'lucide-react';

const ProposalStatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
      <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 text-center p-3 sm:p-4">
        <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-600 mx-auto mb-2" />
        <p className="font-bold text-pink-700 text-xs sm:text-sm md:text-base">Made with Love</p>
      </Card>
      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 text-center p-3 sm:p-4">
        <Star className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-600 mx-auto mb-2" />
        <p className="font-bold text-yellow-700 text-xs sm:text-sm md:text-base">Unique Design</p>
      </Card>
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 text-center p-3 sm:p-4">
        <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600 mx-auto mb-2" />
        <p className="font-bold text-green-700 text-xs sm:text-sm md:text-base">Instant Updates</p>
      </Card>
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 text-center p-3 sm:p-4">
        <Gift className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600 mx-auto mb-2" />
        <p className="font-bold text-purple-700 text-xs sm:text-sm md:text-base">Special Moment</p>
      </Card>
    </div>
  );
};

export default ProposalStatsCards;
