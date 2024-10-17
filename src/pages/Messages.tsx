import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MessageSquare, Trash2, Send, Plus, Search, Inbox, Archive, X, Reply } from 'lucide-react';
import { Message, mockMessages, addMessage, deleteMessage, toggleMessageReadStatus, mockClients } from '../mockData';

const Messages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'deleted'>('inbox');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isAddingMessage, setIsAddingMessage] = useState(false);
  const [newMessage, setNewMessage] = useState({ recipient: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const replyInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (replyingTo && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [replyingTo]);

  const groupedMessages = useMemo(() => {
    return {
      inbox: messages.filter(m => m.recipient === 'Lawyer' && !m.deleted),
      sent: messages.filter(m => m.sender === 'Lawyer' && !m.deleted),
      deleted: messages.filter(m => m.deleted)
    };
  }, [messages]);

  const handleDeleteMessage = (id: number) => {
    deleteMessage(id);
    setMessages([...mockMessages]);
  };

  const handleToggleReadStatus = (id: number) => {
    toggleMessageReadStatus(id);
    setMessages([...mockMessages]);
  };

  const handleAddMessage = () => {
    if (newMessage.recipient && newMessage.content) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'Lawyer',
        recipient: newMessage.recipient,
        content: newMessage.content,
        timestamp: new Date().toISOString(),
        unread: false,
        deleted: false
      };
      addMessage(message);
      setMessages([...mockMessages]);
      setIsAddingMessage(false);
      setNewMessage({ recipient: '', content: '' });
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
    setReplyContent('');
  };

  const handleSendReply = () => {
    if (replyingTo && replyContent) {
      const reply: Message = {
        id: messages.length + 1,
        sender: 'Lawyer',
        recipient: replyingTo.sender,
        content: replyContent,
        timestamp: new Date().toISOString(),
        unread: false,
        deleted: false
      };
      addMessage(reply);
      setMessages([...mockMessages]);
      setReplyingTo(null);
      setReplyContent('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <MessageSquare className="w-6 h-6 mr-2" />
          Messages
        </h2>
        <button
          onClick={() => setIsAddingMessage(true)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Message
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('inbox')}
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'inbox' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-800 hover:text-white transition-colors`}
        >
          <Inbox className="w-4 h-4 mr-2" />
          Inbox
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'sent' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-800 hover:text-white transition-colors`}
        >
          <Send className="w-4 h-4 mr-2" />
          Sent
        </button>
        <button
          onClick={() => setActiveTab('deleted')}
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'deleted' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-800 hover:text-white transition-colors`}
        >
          <Archive className="w-4 h-4 mr-2" />
          Deleted
        </button>
      </div>

      {groupedMessages[activeTab].length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No messages in this folder.</p>
        </div>
      ) : (
        groupedMessages[activeTab].map((message) => (
          <div 
            key={`${message.id}-${message.timestamp}`} 
            className={`p-4 rounded-lg shadow ${message.unread ? 'bg-white' : 'bg-gray-100'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold">{message.sender === 'Lawyer' ? message.recipient : message.sender}</span>
                <span className="text-sm text-gray-500 ml-2">{new Date(message.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex space-x-2">
                {message.sender !== 'Lawyer' && !message.deleted && (
                  <button
                    onClick={() => handleToggleReadStatus(message.id)}
                    className={`text-sm ${message.unread ? 'text-black' : 'text-gray-500'}`}
                  >
                    {message.unread ? 'Mark as Read' : 'Mark as Unread'}
                  </button>
                )}
                {!message.unread && !message.deleted && (
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                {!message.deleted && (
                  <button
                    onClick={() => handleReply(message)}
                    className="text-gray-500 hover:text-blue-500"
                  >
                    <Reply size={16} />
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-700">{message.content}</p>
          </div>
        ))
      )}

      {isAddingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">New Message</h3>
              <button onClick={() => setIsAddingMessage(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient</label>
                <select
                  id="recipient"
                  value={newMessage.recipient}
                  onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select a recipient</option>
                  {mockClients.map(client => (
                    <option key={client.id} value={client.name}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="content"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={4}
                ></textarea>
              </div>
              <button
                onClick={handleAddMessage}
                className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {replyingTo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Reply to {replyingTo.sender}</h3>
              <button onClick={() => setReplyingTo(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="replyContent" className="block text-sm font-medium text-gray-700">Your Reply</label>
                <textarea
                  id="replyContent"
                  ref={replyInputRef}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={4}
                ></textarea>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-sm text-gray-600">Original message:</p>
                <p className="text-sm text-gray-800 mt-2">{replyingTo.content}</p>
              </div>
              <button
                onClick={handleSendReply}
                className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;