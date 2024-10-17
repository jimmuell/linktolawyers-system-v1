import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LegalServiceRequestFormProps {
  onClose: () => void;
}

const LegalServiceRequestForm: React.FC<LegalServiceRequestFormProps> = ({ onClose }) => {
  const [showAIAssistant, setShowAIAssistant] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    legalNeed: '',
    caseType: '',
    urgency: '',
    budget: '',
  });

  const toggleAIAssistant = () => {
    setShowAIAssistant(!showAIAssistant);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    setStep(4); // Move to the thank you screen
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-6">Legal Service Request Form</h2>
            <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-6">Legal Service Request Form</h2>
            <h3 className="text-2xl font-semibold mb-4">Case Details</h3>
            <div>
              <label htmlFor="legalNeed" className="block text-sm font-medium text-gray-700 mb-1">Describe your legal need</label>
              <textarea
                id="legalNeed"
                name="legalNeed"
                value={formData.legalNeed}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows={4}
              />
            </div>
            <div>
              <label htmlFor="caseType" className="block text-sm font-medium text-gray-700 mb-1">Case Type</label>
              <select
                id="caseType"
                name="caseType"
                value={formData.caseType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select case type</option>
                <option value="Family Law">Family Law</option>
                <option value="Criminal Defense">Criminal Defense</option>
                <option value="Personal Injury">Personal Injury</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Business Law">Business Law</option>
                <option value="Immigration">Immigration</option>
                <option value="Intellectual Property">Intellectual Property</option>
                <option value="Employment Law">Employment Law</option>
              </select>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-6">Legal Service Request Form</h2>
            <h3 className="text-2xl font-semibold mb-4">Additional Information</h3>
            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
              <input
                type="text"
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-3xl font-bold mb-4">Thank You for Your Submission</h2>
            <p className="text-lg mb-8">
              Your request has been received and is being processed. You will receive further information shortly.
            </p>
            <button
              onClick={onClose}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Exit
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-[800px] w-full max-h-[600px] flex">
        <div className="w-full p-8 overflow-y-auto">
          {renderFormStep()}
        </div>
        {step !== 4 && (
          <div className="w-1/3 bg-gray-100 p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <button
                onClick={toggleAIAssistant}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full"
              >
                {showAIAssistant ? 'Hide AI Assistant' : 'Show AI Assistant'}
              </button>
            </div>
            {showAIAssistant && (
              <>
                <div className="bg-white p-4 rounded-lg shadow mb-4 flex-grow overflow-y-auto">
                  <p className="text-gray-700">How can I help you today?</p>
                </div>
                <div className="mt-auto">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors float-right">
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {step === 4 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white">
          © 2023 LinkToLawyers. All rights reserved.
        </div>
      )}
    </div>
  );
};

export default LegalServiceRequestForm;