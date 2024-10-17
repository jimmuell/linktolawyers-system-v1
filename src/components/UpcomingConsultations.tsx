import React from 'react';
import { Calendar } from 'lucide-react';

const UpcomingConsultations: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Calendar className="w-6 h-6 mr-2" />
        Upcoming Consultations
      </h2>
      <div className="text-center py-8">
        <p className="text-gray-500">No upcoming consultations scheduled.</p>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
          Schedule a Consultation
        </button>
      </div>
    </div>
  );
};

export default UpcomingConsultations;