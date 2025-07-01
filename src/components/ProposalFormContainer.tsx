
import React from 'react';

interface ProposalFormContainerProps {
  children?: React.ReactNode;
}

const ProposalFormContainer: React.FC<ProposalFormContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>
      
      <div className="w-full max-w-2xl relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-lg">
        {children || (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Your Magical Proposal</h2>
            <p className="text-gray-600">Start your love story here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalFormContainer;
