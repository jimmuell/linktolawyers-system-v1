import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNewCasesCount, getUnreadMessagesCount, getActiveCasesCount, getAcceptedQuotesCount } from '../mockData';
import UpcomingConsultations from '../components/UpcomingConsultations';
import NewConsults from '../components/NewConsults';
import { AlertCircle, FileText, MessageSquare, Users, DollarSign } from 'lucide-react';

interface HomeProps {
  onResetUserType: () => void;
}

interface Toast {
  id: number;
  message: string;
}

const Home: React.FC<HomeProps> = ({ onResetUserType }) => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    newCases: 0,
    newMessages: 0,
    activeClients: 0,
    acceptedQuotes: 0,
  });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [currentToast, setCurrentToast] = useState<Toast | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      setCounts({
        newCases: getNewCasesCount(),
        newMessages: getUnreadMessagesCount(),
        activeClients: getActiveCasesCount(),
        acceptedQuotes: getAcceptedQuotesCount(),
      });
    };

    updateCounts();
    const interval = setInterval(updateCounts, 5000); // Update every 5 seconds

    // Simulate toast messages
    const toastMessages = [
      { id: 1, message: "New case assigned: Smith vs. Johnson" },
      { id: 2, message: "2 unread messages in your inbox" },
      { id: 3, message: "Quote accepted for Brown Estate case" },
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
            setTimeout(showNextToast, 3000); // Wait 3 seconds before showing the next toast
          }, 500); // Duration of exit animation
        }, 3000); // Duration to show the toast
      }
    };

    showNextToast();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const dashboardData = [
    { icon: FileText, title: 'New Cases', count: counts.newCases, link: '/cases' },
    { icon: MessageSquare, title: 'New Messages', count: counts.newMessages, link: '/messages' },
    { icon: Users, title: 'Active Clients', count: counts.activeClients, link: '/clients' },
    { icon: DollarSign, title: 'Accepted Quotes', count: counts.acceptedQuotes, link: '/quotes' },
  ];

  return (
    <div className="space-y-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item.link)}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <item.icon className="h-8 w-8 text-blue-500 mr-3" />
                <span className="text-lg font-semibold">{item.title}</span>
              </div>
              <span className="text-2xl font-bold">{item.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>

      <UpcomingConsultations />
      <NewConsults />

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

export default Home;