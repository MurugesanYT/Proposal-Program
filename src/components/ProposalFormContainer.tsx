
import React from 'react';

interface ProposalFormContainerProps {
  children: React.ReactNode;
}

const ProposalFormContainer: React.FC<ProposalFormContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 flex items-center justify-center p-2 sm:p-4 lg:p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>
      
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-lg mx-2 sm:mx-4">
        {children}
      </div>
    </div>
  );
};

export default ProposalFormContainer;
