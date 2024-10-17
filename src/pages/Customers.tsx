import React from 'react';
import { Users } from 'lucide-react';

const Customers: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Users className="w-6 h-6 mr-2" />
        Customers
      </h2>
      <p className="text-gray-600 mb-4">
        Manage your customer information and interactions here.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm text-gray-500">Customer list or management tools would go here.</p>
      </div>
    </div>
  );
};

export default Customers;