import React from 'react';
import { UserPlus } from 'lucide-react';

const NewConsults: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <UserPlus className="w-6 h-6 mr-2" />
        New Consultation Requests
      </h2>
      <div className="text-center py-8">
        <p className="text-gray-500">No new consultation requests at this time.</p>
      </div>
    </div>
  );
};

export default NewConsults;