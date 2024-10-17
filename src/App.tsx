import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Cases from './pages/Cases';
import Clients from './pages/Clients';
import Messages from './pages/Messages';
import Quotes from './pages/Quotes';
import Consultations from './pages/Consultations';
import Settings from './pages/Settings';
import ConsumerDashboard from './pages/ConsumerDashboard';
import AILegalAssistant from './pages/AILegalAssistant'; // Import the new component
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LegalServiceRequestForm from './components/LegalServiceRequestForm';

function App() {
  const [userType, setUserType] = useState<'attorney' | 'consumer' | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectUserType = (type: 'attorney' | 'consumer') => {
    setUserType(type);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleResetUserType = () => {
    setUserType(null);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar 
          userType={userType} 
          onResetUserType={handleResetUserType} 
          onSelectUserType={handleSelectUserType}
        />
        <div className="flex flex-1 overflow-hidden">
          {userType && (
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userType={userType} />
          )}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8 pt-24">
              <Routes>
                <Route
                  path="/"
                  element={
                    userType ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <LandingPage onSelectUserType={handleSelectUserType} />
                    )
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    userType === 'attorney' ? (
                      <Home onResetUserType={handleResetUserType} />
                    ) : userType === 'consumer' ? (
                      <ConsumerDashboard onResetUserType={handleResetUserType} />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route path="/cases" element={userType ? <Cases /> : <Navigate to="/" replace />} />
                <Route path="/clients" element={userType ? <Clients /> : <Navigate to="/" replace />} />
                <Route path="/messages" element={userType ? <Messages /> : <Navigate to="/" replace />} />
                <Route path="/quotes" element={userType ? <Quotes /> : <Navigate to="/" replace />} />
                <Route path="/consultations" element={userType ? <Consultations /> : <Navigate to="/" replace />} />
                <Route path="/settings" element={userType ? <Settings /> : <Navigate to="/" replace />} />
                <Route path="/form" element={<LegalServiceRequestForm onClose={() => {}} />} />
                <Route path="/ai-assistant" element={userType === 'consumer' ? <AILegalAssistant /> : <Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;