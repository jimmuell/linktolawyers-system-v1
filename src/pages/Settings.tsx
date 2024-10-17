import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <SettingsIcon className="w-6 h-6 mr-2" />
        Settings
      </h2>
      <p className="text-gray-600 mb-4">
        Customize your dashboard and account settings here.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm text-gray-500">Settings options and forms would go here.</p>
      </div>
    </div>
  );
};

export default Settings;