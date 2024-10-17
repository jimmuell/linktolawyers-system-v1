import React from 'react';
import { BarChart } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <BarChart className="w-6 h-6 mr-2" />
        Analytics
      </h2>
      <p className="text-gray-600 mb-4">
        Here you can view and analyze your data.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm text-gray-500">Sample chart or data visualization would go here.</p>
      </div>
    </div>
  );
};

export default Analytics;