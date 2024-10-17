import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  legalIssue: string;
  description: string;
}

interface LegalQuoteFormProps {
  onClose: () => void;
}

const LegalQuoteForm: React.FC<LegalQuoteFormProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    legalIssue: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-4xl text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-4">Get Your Legal Quote</h2>
        <p className="mb-6">Tell us about your legal needs</p>
        <div className="flex gap-8">
          <div className="w-1/2">
            {step === 1 && (
              <>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 rounded"
                  />
                </div>
                <button onClick={handleNext} className="bg-white text-black px-4 py-2 rounded">
                  Next
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="mb-4">
                  <label htmlFor="legalIssue" className="block mb-2">Legal Issue</label>
                  <input
                    type="text"
                    id="legalIssue"
                    name="legalIssue"
                    value={formData.legalIssue}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block mb-2">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 rounded"
                    rows={4}
                  />
                </div>
                <div className="flex justify-between">
                  <button onClick={handlePrevious} className="bg-gray-700 text-white px-4 py-2 rounded">
                    Previous
                  </button>
                  <button onClick={handleSubmit} className="bg-white text-black px-4 py-2 rounded">
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="w-1/2 bg-gray-800 p-4 rounded">
            <h3 className="text-xl font-semibold mb-4">AI Assistant</h3>
            <div className="bg-gray-700 p-4 rounded mb-4">
              <p>AI: Hello! How can I assist you with your legal query today?</p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Ask a question..."
                className="w-full p-2 pr-10 bg-gray-600 rounded"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalQuoteForm;