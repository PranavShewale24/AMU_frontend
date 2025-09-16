import React from 'react';
import { Bell, User, LogOut, Stethoscope } from 'lucide-react';
import { useApp } from './AppContext';

const Header = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    setCurrentPage, 
    language, 
    setLanguage, 
    notifications, 
    t 
  } = useApp();

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-600">{t.title}</h1>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="en">🇺🇸 English</option>
              <option value="hi">🇮🇳 हिंदी</option>
              <option value="mr">🇮🇳 मराठी</option>
            </select>

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-800 relative transition duration-200">
              <Bell className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{currentUser?.name}</div>
                <div className="text-gray-500 capitalize">{currentUser?.role}</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 transition duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;