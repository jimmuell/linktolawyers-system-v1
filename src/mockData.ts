import { LayoutDashboard, MessageSquare, Users, FileText, DollarSign } from 'lucide-react';

export interface Case {
  id: number;
  title: string;
  client: string;
  status: 'New' | 'In Review' | 'Quoted' | 'Accepted' | 'Closed';
  lastUpdated: string;
  attorney?: string;
}

export interface Message {
  id: number;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  unread: boolean;
  deleted: boolean;
}

export interface Quote {
  id: number;
  clientName: string;
  caseTitle: string;
  amount: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string;
  expiresAt: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  casesCount: number;
  status: 'Active' | 'Inactive' | 'Pending';
}

export interface Consultation {
  id: number;
  clientName: string;
  caseTitle: string;
  date: string;
  time: string;
  notes: string;
}

export const mockCases: Case[] = [
  { id: 1, title: 'Smith vs. Johnson', client: 'John Smith', status: 'New', lastUpdated: '2023-06-15', attorney: 'Jane Doe' },
  { id: 2, title: 'Brown Estate', client: 'Sarah Brown', status: 'In Review', lastUpdated: '2023-06-14', attorney: 'Mike Ross' },
  { id: 3, title: 'Davis Divorce', client: 'Michael Davis', status: 'Quoted', lastUpdated: '2023-06-13', attorney: 'Harvey Specter' },
];

export const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'John Smith',
    recipient: 'Lawyer',
    content: 'Hello, I have a question about my case.',
    timestamp: new Date().toISOString(),
    unread: true,
    deleted: false
  },
  {
    id: 2,
    sender: 'Sarah Brown',
    recipient: 'Lawyer',
    content: 'Can we schedule a meeting next week?',
    timestamp: new Date().toISOString(),
    unread: true,
    deleted: false
  },
  {
    id: 3,
    sender: 'Michael Davis',
    recipient: 'Lawyer',
    content: "I've reviewed the documents you sent. Everything looks good.",
    timestamp: new Date().toISOString(),
    unread: true,
    deleted: false
  },
  {
    id: 4,
    sender: 'Emily Wilson',
    recipient: 'Lawyer',
    content: 'Do you have any updates on the court date?',
    timestamp: new Date().toISOString(),
    unread: true,
    deleted: false
  },
  {
    id: 5,
    sender: 'Robert Johnson',
    recipient: 'Lawyer',
    content: 'I need some advice on a new legal matter.',
    timestamp: new Date().toISOString(),
    unread: true,
    deleted: false
  }
];

export const mockQuotes: Quote[] = [
  { id: 1, clientName: 'John Smith', caseTitle: 'Smith vs. Johnson', amount: 5000, status: 'Pending', createdAt: '2023-06-10', expiresAt: '2023-06-24' },
  { id: 2, clientName: 'Sarah Brown', caseTitle: 'Brown Estate', amount: 7500, status: 'Accepted', createdAt: '2023-06-08', expiresAt: '2023-06-22' },
];

export const mockClients: Client[] = [
  { id: 1, name: 'John Smith', email: 'john@example.com', phone: '123-456-7890', casesCount: 1, status: 'Active' },
  { id: 2, name: 'Sarah Brown', email: 'sarah@example.com', phone: '098-765-4321', casesCount: 1, status: 'Active' },
  { id: 3, name: 'Michael Davis', email: 'michael@example.com', phone: '555-555-5555', casesCount: 1, status: 'Pending' },
  { id: 4, name: 'Emily Wilson', email: 'emily@example.com', phone: '111-222-3333', casesCount: 0, status: 'Active' },
  { id: 5, name: 'Robert Johnson', email: 'robert@example.com', phone: '444-555-6666', casesCount: 1, status: 'Inactive' },
];

export const mockConsultations: Consultation[] = [
  { id: 1, clientName: 'John Smith', caseTitle: 'Smith vs. Johnson', date: '2023-06-20', time: '10:00', notes: 'Initial consultation' },
  { id: 2, clientName: 'Sarah Brown', caseTitle: 'Brown Estate', date: '2023-06-22', time: '14:00', notes: 'Document review' },
  { id: 3, clientName: 'Michael Davis', caseTitle: 'Davis Divorce', date: '2023-06-25', time: '11:30', notes: 'Mediation preparation' },
  { id: 4, clientName: 'Emily Wilson', caseTitle: 'Wilson Property Dispute', date: '2023-06-28', time: '15:00', notes: 'Case strategy discussion' },
  { id: 5, clientName: 'Robert Johnson', caseTitle: 'Johnson vs. City', date: '2023-06-30', time: '09:00', notes: 'Evidence review' },
];

export const getNewCasesCount = () => mockCases.filter(c => c.status === 'New').length;
export const getUnreadMessagesCount = () => mockMessages.filter(m => m.unread).length;
export const getActiveCasesCount = () => mockCases.filter(c => c.status !== 'Closed').length;
export const getAcceptedQuotesCount = () => mockQuotes.filter(q => q.status === 'Accepted').length;

export const addMessage = (message: Message) => {
  mockMessages.push(message);
};

export const deleteMessage = (id: number) => {
  const index = mockMessages.findIndex(m => m.id === id);
  if (index !== -1) {
    mockMessages[index].deleted = true;
  }
};

export const toggleMessageReadStatus = (id: number) => {
  const index = mockMessages.findIndex(m => m.id === id);
  if (index !== -1) {
    mockMessages[index].unread = !mockMessages[index].unread;
  }
};