import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LegalServiceRequestForm from '../components/LegalServiceRequestForm';
import { Shield, Scale, Clock } from 'lucide-react';

interface LandingPageProps {
  onSelectUserType: (type: 'attorney' | 'consumer') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectUserType }) => {
  const navigate = useNavigate();
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const handleGetQuote = () => {
    setShowQuoteForm(true);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Hero Section */}
      <div className="bg-[#111111] text-white py-20 px-4 sm:px-6 lg:px-8 rounded-lg mx-4 my-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">Welcome to LinkToLawyers</h2>
          <p className="text-xl mb-8">
            Connecting you with expert legal professionals for all your legal needs.<br />
            Get started with a free consultation today.
          </p>
          <button
            onClick={handleGetQuote}
            className="bg-white text-[#111111] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors inline-flex items-center"
          >
            Get A Free Quote
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Why Choose LinkToLawyers Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose LinkToLawyers?</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Shield className="w-12 h-12 text-[#111111] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Lawyers</h3>
            <p className="text-gray-600">Access a network of highly qualified and experienced legal professionals across various specialties.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Scale className="w-12 h-12 text-[#111111] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fair Pricing</h3>
            <p className="text-gray-600">Transparent and competitive pricing with options for every budget. Get quotes upfront with no hidden fees.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Clock className="w-12 h-12 text-[#111111] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
            <p className="text-gray-600">Receive prompt responses from lawyers. Our platform ensures timely communication for your legal matters.</p>
          </div>
        </div>
      </div>

      {/* Ready to Get Started Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Take the first step towards resolving your legal issues. Request a free
            quote and connect with a lawyer today.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGetQuote}
              className="bg-[#111111] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Get A Free Quote
            </button>
            <button
              onClick={() => navigate('/about')}
              className="bg-white text-[#111111] px-6 py-3 rounded-lg text-lg font-semibold border border-[#111111] hover:bg-gray-100 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#111111] text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2024 LinkToLawyers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showQuoteForm && <LegalServiceRequestForm onClose={() => setShowQuoteForm(false)} />}
    </div>
  );
};

export default LandingPage;