import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

interface NavbarProps {
  userType: 'attorney' | 'consumer' | null;
  onResetUserType: () => void;
  onSelectUserType: (type: 'attorney' | 'consumer') => void;
}

const Navbar: React.FC<NavbarProps> = ({ userType, onResetUserType, onSelectUserType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onResetUserType();
    navigate('/');
  };

  return (
    <nav className="bg-[#111111] text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              LinkToLawyers
            </Link>
          </div>
          <div className="flex items-center">
            {userType && (
              <>
                <span className="text-sm font-medium text-white mr-4">
                  {userType === 'attorney' 
                    ? 'Welcome back, Attorney James Mueller!' 
                    : 'Welcome back, Sarah Brown'}
                </span>
                <div className="relative flex items-center">
                  <button
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out mr-2"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <User className="h-8 w-8 rounded-full text-white" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                    aria-label="Logout"
                  >
                    <LogOut className="h-6 w-6 text-white" /> {/* Reduced size from h-8 w-8 to h-6 w-6 */}
                  </button>
                </div>
              </>
            )}
            {!userType && (
              <div className="flex space-x-4">
                <button
                  onClick={() => onSelectUserType('consumer')}
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Consumer Dashboard
                </button>
                <button
                  onClick={() => onSelectUserType('attorney')}
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Lawyer Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;