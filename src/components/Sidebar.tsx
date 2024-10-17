import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Users, Settings, FileText, Calendar, DollarSign, FileQuestion, Bot } from 'lucide-react';
import { mockMessages } from '../mockData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'attorney' | 'consumer';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userType }) => {
  const location = useLocation();
  const unreadMessagesCount = mockMessages.filter(m => m.unread).length;
  
  const formatBadgeCount = (count: number) => {
    return count > 999 ? '999+' : count.toString();
  };

  const attorneyMenuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
    { icon: MessageSquare, text: 'Messages', path: '/messages', badge: unreadMessagesCount },
    { icon: DollarSign, text: 'Quotes', path: '/quotes' },
    { icon: FileText, text: 'Cases', path: '/cases' },
    { icon: Calendar, text: 'Consultations', path: '/consultations' },
    { icon: Users, text: 'Clients', path: '/clients' },
  ];

  const consumerMenuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
    { icon: MessageSquare, text: 'Messages', path: '/messages', badge: unreadMessagesCount },
    { icon: FileText, text: 'My Cases', path: '/cases' },
    { icon: Calendar, text: 'Consultations', path: '/consultations' },
    { icon: FileQuestion, text: 'Legal Resources', path: '/resources' },
    { icon: Bot, text: 'AI Legal Assistant', path: '/ai-assistant' },
  ];

  const menuItems = userType === 'attorney' ? attorneyMenuItems : consumerMenuItems;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#111111] shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col`}
    >
      <div className="flex flex-col h-full justify-between pt-20">
        <div className="flex-grow overflow-y-auto">
          <div className="border-t border-gray-700 mb-4"></div>
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">MAIN MENU</div>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 ${
                    location.pathname === item.path ? 'bg-gray-800 text-white' : ''
                  }`}
                  onClick={onClose}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="flex-grow">{item.text}</span>
                  {item.badge !== undefined && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 ml-2">
                      {formatBadgeCount(item.badge)}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">ACCOUNT</div>
          <ul>
            <li>
              <Link
                to="/settings"
                className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 ${
                  location.pathname === '/settings' ? 'bg-gray-800 text-white' : ''
                }`}
                onClick={onClose}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span className="flex-grow">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;