import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { mockConsultations, mockClients, Consultation } from '../mockData';

const localizer = momentLocalizer(moment);

const Consultations: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>(mockConsultations);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewConsultationForm, setShowNewConsultationForm] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [newConsultation, setNewConsultation] = useState<Partial<Consultation>>({
    clientName: '',
    caseTitle: '',
    date: '',
    time: '',
    notes: '',
  });

  const events = consultations.map(consultation => ({
    id: consultation.id,
    title: `${consultation.clientName} - ${consultation.caseTitle}`,
    start: new Date(`${consultation.date}T${consultation.time}`),
    end: moment(`${consultation.date}T${consultation.time}`).add(1, 'hours').toDate(),
  }));

  const handleSelectEvent = (event: any) => {
    const consultation = consultations.find(c => c.id === event.id);
    if (consultation) {
      setSelectedConsultation(consultation);
    }
  };

  const handleSelectSlot = useCallback(
    ({ start }: { start: Date }) => {
      setNewConsultation({
        ...newConsultation,
        date: moment(start).format('YYYY-MM-DD'),
        time: moment(start).format('HH:mm'),
      });
      setShowNewConsultationForm(true);
    },
    [newConsultation]
  );

  const handleNavigate = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleNewConsultation = () => {
    setShowNewConsultationForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewConsultation({ ...newConsultation, [name]: value });
  };

  const handleSubmitNewConsultation = () => {
    if (newConsultation.clientName && newConsultation.caseTitle && newConsultation.date && newConsultation.time) {
      const newId = Math.max(...consultations.map(c => c.id)) + 1;
      const consultation: Consultation = {
        id: newId,
        clientName: newConsultation.clientName,
        caseTitle: newConsultation.caseTitle,
        date: newConsultation.date,
        time: newConsultation.time,
        notes: newConsultation.notes || '',
      };
      setConsultations([...consultations, consultation]);
      setShowNewConsultationForm(false);
      setNewConsultation({
        clientName: '',
        caseTitle: '',
        date: '',
        time: '',
        notes: '',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <CalendarIcon className="w-6 h-6 mr-2" />
          Consultations
        </h2>
        <button
          onClick={handleNewConsultation}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Consultation
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => handleNavigate(moment(selectedDate).subtract(1, 'month').toDate())}
              className="mr-2 p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold">
              {moment(selectedDate).format('MMMM YYYY')}
            </h3>
            <button
              onClick={() => handleNavigate(moment(selectedDate).add(1, 'month').toDate())}
              className="ml-2 p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="text-sm text-gray-600 hover:text-black"
          >
            Today
          </button>
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          date={selectedDate}
          onNavigate={handleNavigate}
          views={['month', 'week', 'day']}
          defaultView="month"
        />
      </div>

      {showNewConsultationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Request Consultation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={newConsultation.clientName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  list="clientList"
                />
                <datalist id="clientList">
                  {mockClients.map(client => (
                    <option key={client.id} value={client.name} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Case Title</label>
                <input
                  type="text"
                  name="caseTitle"
                  value={newConsultation.caseTitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newConsultation.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={newConsultation.time}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={newConsultation.notes}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows={3}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewConsultationForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitNewConsultation}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Consultation Details</h3>
            <div className="space-y-4">
              <p><strong>Client:</strong> {selectedConsultation.clientName}</p>
              <p><strong>Case:</strong> {selectedConsultation.caseTitle}</p>
              <p><strong>Date:</strong> {selectedConsultation.date}</p>
              <p><strong>Time:</strong> {selectedConsultation.time}</p>
              <p><strong>Notes:</strong> {selectedConsultation.notes}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedConsultation(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultations;