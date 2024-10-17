import React, { useState, useEffect } from 'react';
import { FileText, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { mockCases, mockQuotes, Quote, Case } from '../mockData';

interface ConsumerDashboardProps {
  onResetUserType: () => void;
}

interface Toast {
  id: number;
  message: string;
}

const ConsumerDashboard: React.FC<ConsumerDashboardProps> = ({ onResetUserType }) => {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [currentToast, setCurrentToast] = useState<Toast | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showQuoteConfirmation, setShowQuoteConfirmation] = useState(false);

  const handleAcceptQuoteClick = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowQuoteConfirmation(true);
  };

  const handleConfirmAcceptQuote = () => {
    if (selectedQuote) {
      setQuotes(prevQuotes =>
        prevQuotes.map(quote =>
          quote.id === selectedQuote.id ? { ...quote, status: 'Accepted' } : { ...quote, status: 'Declined' }
        )
      );
      setShowQuoteConfirmation(false);
      setSelectedQuote(null);
      setCurrentToast({ id: Date.now(), message: "Quote accepted successfully" });
    }
  };

  useEffect(() => {
    const toastMessages = [
      { id: 1, message: "New update on your case: Smith vs. Johnson" },
      { id: 2, message: "Document uploaded: Brown Estate" },
      { id: 3, message: "Consultation scheduled for next week" },
    ];

    let index = 0;
    const showNextToast = () => {
      if (index < toastMessages.length) {
        setCurrentToast(toastMessages[index]);
        index++;
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setCurrentToast(null);
            setIsExiting(false);
            setTimeout(showNextToast, 3000);
          }, 500);
        }, 3000);
      }
    };

    showNextToast();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Consumer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Case Status */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Case Status
          </h2>
          {cases.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attorney</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cases.map(caseItem => (
                    <tr key={caseItem.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{caseItem.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          caseItem.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          caseItem.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                          caseItem.status === 'Closed' ? 'bg-gray-100 text-gray-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.attorney || 'Not Assigned'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No active cases at the moment.</p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activity
          </h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span>Document uploaded: Contract draft</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Message received from Attorney John Smith</span>
              <span className="text-sm text-gray-500">Yesterday</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Case status updated: In Review</span>
              <span className="text-sm text-gray-500">3 days ago</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Quotes */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Quotes
        </h2>
        {quotes.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-2">Lawyer</th>
                <th className="pb-2">Description</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(quote => (
                <tr key={quote.id} className="border-t">
                  <td className="py-2">{quote.clientName}</td>
                  <td className="py-2">{quote.caseTitle}</td>
                  <td className="py-2">${quote.amount}</td>
                  <td className="py-2">
                    {quote.status === 'Pending' ? (
                      <button
                        onClick={() => handleAcceptQuoteClick(quote)}
                        className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors"
                      >
                        Accept Quote
                      </button>
                    ) : (
                      <span className={`font-semibold ${quote.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
                        {quote.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No quotes available at the moment.</p>
        )}
      </div>

      {/* Actions */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        <div className="space-y-4">
          <button className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
            Request Consultation
          </button>
          <button className="w-full bg-white text-black px-4 py-2 rounded border border-black hover:bg-gray-100 transition-colors">
            View Documents
          </button>
          <button className="w-full bg-white text-black px-4 py-2 rounded border border-black hover:bg-gray-100 transition-colors">
            Submit New Case
          </button>
        </div>
      </div>

      {/* Quote Acceptance Confirmation Modal */}
      {showQuoteConfirmation && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirm Quote Acceptance</h3>
            <p className="mb-4">Are you sure you want to accept this quote? All other quotes will be declined.</p>
            <div className="mb-4">
              <p><strong>Lawyer:</strong> {selectedQuote.clientName}</p>
              <p><strong>Description:</strong> {selectedQuote.caseTitle}</p>
              <p><strong>Price:</strong> ${selectedQuote.amount}</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowQuoteConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAcceptQuote}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Confirm Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast message */}
      {currentToast && (
        <div
          className={`fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg flex items-center ${
            isExiting ? 'animate-toast-exit' : 'animate-toast-enter'
          }`}
        >
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{currentToast.message}</span>
        </div>
      )}
    </div>
  );
};

export default ConsumerDashboard;