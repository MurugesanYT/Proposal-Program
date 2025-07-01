
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProposalForm from '../components/ProposalForm';
import ProposalLink from '../components/ProposalLink';
import ProposalViewer from '../components/ProposalViewer';

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'link' | 'proposal'>('form');
  const [proposalData, setProposalData] = useState<any>(null);
  const [proposalId, setProposalId] = useState<string>('');
  const location = useLocation();
  const { proposalSlug } = useParams();

  useEffect(() => {
    console.log('Current path:', location.pathname);
    console.log('Proposal slug:', proposalSlug);
    
    if (proposalSlug) {
      // Use the full slug as the ID for database lookup
      console.log('Using proposal slug as ID:', proposalSlug);
      setProposalId(proposalSlug);
      setCurrentView('proposal');
    } else {
      setCurrentView('form');
    }
  }, [location.pathname, proposalSlug]);

  const handleProposalCreated = (data: any) => {
    setProposalData(data);
    setCurrentView('link');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
    setProposalData(null);
  };

  const handleViewProposal = (id: string) => {
    setProposalId(id);
    setCurrentView('proposal');
  };

  const handleBackFromProposal = () => {
    if (proposalData) {
      setCurrentView('link');
    } else {
      setCurrentView('form');
    }
  };

  if (currentView === 'proposal') {
    return (
      <ProposalViewer 
        proposalId={proposalId}
        onBack={handleBackFromProposal}
      />
    );
  }

  if (currentView === 'link') {
    return (
      <ProposalLink
        proposalData={proposalData}
        onBackToForm={handleBackToForm}
        onViewProposal={handleViewProposal}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100">
      {/* Hero Section with Enhanced Content */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>
        
        {/* Welcome Section */}
        <div className="relative z-10 pt-16 pb-8 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 mb-6 animate-pulse">
              💕 Create Your Perfect Proposal 💕
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed">
              Craft a magical moment that will be remembered forever ✨
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/80 p-6 rounded-2xl border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Personalized</h3>
                <p className="text-gray-600">Each proposal is uniquely crafted for your special someone</p>
              </div>
              <div className="bg-white/80 p-6 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Magical</h3>
                <p className="text-gray-600">Create unforgettable moments filled with love and wonder</p>
              </div>
              <div className="bg-white/80 p-6 rounded-2xl border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">💕</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Forever</h3>
                <p className="text-gray-600">Memories that will last a lifetime and beyond</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="relative z-10">
        <ProposalForm onProposalCreated={handleProposalCreated} />
      </div>

      {/* Success Stories Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-12">💖 Love Success Stories 💖</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-8 rounded-3xl border-2 border-pink-200 shadow-xl">
              <div className="text-5xl mb-4 text-center">👰💒🤵</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Sarah & Michael</h3>
              <p className="text-gray-600 leading-relaxed italic">
                "The proposal was absolutely perfect! Michael used this platform to create the most magical moment. I said YES immediately! 💍✨"
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-8 rounded-3xl border-2 border-purple-200 shadow-xl">
              <div className="text-5xl mb-4 text-center">💑💕💐</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Emma & David</h3>
              <p className="text-gray-600 leading-relaxed italic">
                "David surprised me with the most beautiful love declaration through this site. It made me cry happy tears! Our love story continues... 🌹"
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-100 p-8 rounded-3xl border-2 border-red-200 shadow-xl">
              <div className="text-5xl mb-4 text-center">💏🎉💝</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Lisa & James</h3>
              <p className="text-gray-600 leading-relaxed italic">
                "James created the most romantic proposal ever! The personalized touch made it so special. We're planning our wedding now! 💒"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-12">✨ Why Choose Our Platform? ✨</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-white">🎨</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Beautiful Design</h3>
                  <p className="text-gray-600 leading-relaxed">Stunning, romantic designs that capture the magic of your love story perfectly.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-white">📱</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Mobile Friendly</h3>
                  <p className="text-gray-600 leading-relaxed">Perfect viewing experience on all devices - desktop, tablet, and mobile.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-white">💌</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Personal Touch</h3>
                  <p className="text-gray-600 leading-relaxed">Add your own custom message to make it uniquely yours and deeply personal.</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-white">⚡</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Instant Creation</h3>
                  <p className="text-gray-600 leading-relaxed">Create and share your proposal in minutes, not hours. Love shouldn't wait!</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-white">🔒</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Private & Secure</h3>
                  <p className="text-gray-600 leading-relaxed">Your love story is sacred. We keep everything private and secure.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-white">💝</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">100% Free</h3>
                  <p className="text-gray-600 leading-relaxed">Love is priceless, and so is our platform. Create unlimited proposals for free!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dev Branding Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 p-12 rounded-3xl border-3 border-purple-400 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold text-white mb-4">💻 Crafted with Passion 💻</h3>
              <p className="text-xl text-purple-200">This magical love platform was created with dedication and care</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-purple-300/30">
              <div className="text-center">
                <div className="text-5xl mb-4">👨‍💻</div>
                <h4 className="text-2xl font-bold text-white mb-3">Developed & Designed by</h4>
                <a 
                  href="https://www.instagram.com/_fan_boi_lm10_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 hover:from-purple-300 hover:via-pink-300 hover:to-red-300 transition-all duration-300 transform hover:scale-110 inline-block cursor-pointer"
                >
                  M.Kabilan ✨
                </a>
                <p className="text-purple-200 mt-4 text-lg">Full Stack Developer | UI/UX Designer | Love Story Creator</p>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                    <span className="text-white font-bold">React</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
                    <span className="text-white font-bold">TypeScript</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full">
                    <span className="text-white font-bold">Supabase</span>
                  </div>
                </div>
                <p className="text-purple-300 mt-6 text-sm">
                  Follow me on Instagram for more amazing projects and updates! 📸✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
