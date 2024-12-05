import React from 'react';
import { Bell } from 'lucide-react';

const CMSHeader = () => {
  return (
    <div className="max-w-[calc(100%-10px)] mx-auto">
      <header className="w-full flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm rounded-bl-lg rounded-br-lg">
        {/* Left section - Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img
              src="/RMPlogo.png"
              alt="Royal Medica logo"
              className="h-8"
            />
          </div>
          <div className="text-blue-500 font-medium">
            Factory Management System
          </div>
        </div>

        {/* Right section - Notifications and Profile */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <div className="relative cursor-pointer">
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full font-medium">
              4
            </span>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <img
              src="/api/placeholder/40/40"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">Atalanta Ahlgren</span>
              <span className="text-sm text-gray-500">Managing Director, Superadmin</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default CMSHeader;