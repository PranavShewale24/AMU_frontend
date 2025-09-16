import React, { useState, useEffect, useRef } from 'react';

import { 
  Send,
  MessageCircle,
  Phone,
  Video,
  MoreVertical,
  Search,
  Paperclip,
  Smile,
  User,
  Stethoscope
} from 'lucide-react';

// Mock chat data
const mockChats = [
  {
    id: 1,
    name: 'Dr. Sharma',
    role: 'veterinarian',
    lastMessage: 'How is Bella doing today?',
    timestamp: '10:30 AM',
    unread: 2,
    online: true,
    avatar: null
  },
  {
    id: 2,
    name: 'Ram Kumar',
    role: 'farmer',
    lastMessage: 'Thank you for the treatment advice',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
    avatar: null
  },
  {
    id: 3,
    name: 'Dr. Verma',
    role: 'veterinarian',
    lastMessage: 'Please monitor the buffalo closely',
    timestamp: '2 days ago',
    unread: 1,
    online: true,
    avatar: null
  }
];

const mockMessages = {
  1: [
    {
      id: 1,
      sender: 'Dr. Sharma',
      message: 'Hello Ram Kumar, how is Bella doing after yesterday\'s treatment?',
      timestamp: '10:00 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'Ram Kumar',
      message: 'Hello Doctor, she is doing much better. Her fever has reduced.',
      timestamp: '10:05 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Dr. Sharma',
      message: 'That\'s great to hear! Continue giving her the prescribed medication for 3 more days.',
      timestamp: '10:07 AM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'Dr. Sharma',
      message: 'Also, make sure she has access to clean water and proper rest.',
      timestamp: '10:08 AM',
      isOwn: false
    },
    {
      id: 5,
      sender: 'Ram Kumar',
      message: 'Okay doctor, I will follow your instructions. When can I start milking again?',
      timestamp: '10:15 AM',
      isOwn: true
    },
    {
      id: 6,
      sender: 'Dr. Sharma',
      message: 'You can start milking after the 7-day waiting period ends. I\'ll send you a reminder.',
      timestamp: '10:30 AM',
      isOwn: false
    }
  ],
  2: [
    {
      id: 1,
      sender: 'Ram Kumar',
      message: 'Thank you for the treatment advice doctor',
      timestamp: 'Yesterday 5:00 PM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'Dr. Sharma',
      message: 'You\'re welcome! Feel free to contact me if you have any questions.',
      timestamp: 'Yesterday 5:05 PM',
      isOwn: true
    }
  ]
};

const ChatComponent = ({ currentUser, language = 'en' }) => {
  const [chats] = useState(mockChats);
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [messages, setMessages] = useState(mockMessages[selectedChat?.id] || []);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // Language translations
  const translations = {
    en: {
      chat: 'Chat',
      conversations: 'Conversations',
      search: 'Search conversations...',
      typeMessage: 'Type your message...',
      send: 'Send',
      online: 'Online',
      offline: 'Offline',
      noMessages: 'No messages yet. Start a conversation!',
      selectChat: 'Select a conversation to start chatting',
      veterinarian: 'Veterinarian',
      farmer: 'Farmer',
      messageDelivered: 'Message delivered',
      yesterday: 'Yesterday',
      today: 'Today'
    },
    hi: {
      chat: 'चैट',
      conversations: 'बातचीत',
      search: 'बातचीत खोजें...',
      typeMessage: 'अपना संदेश लिखें...',
      send: 'भेजें',
      online: 'ऑनलाइन',
      offline: 'ऑफलाइन'
    },
    mr: {
      chat: 'चॅट',
      conversations: 'संभाषणे',
      search: 'संभाषणे शोधा...',
      typeMessage: 'तुमचा संदेश टाइप करा...',
      send: 'पाठवा',
      online: 'ऑनलाइन',
      offline: 'ऑफलाइन'
    }
  };

  const t = translations[language];

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle chat selection
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setMessages(mockMessages[chat.id] || []);
  };

  // Handle message send
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: currentUser?.name || 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate response after 2 seconds
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: selectedChat.name,
        message: getAutoResponse(newMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  // Auto response logic
  const getAutoResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi')) {
      return 'Hello! How can I help you today?';
    } else if (msg.includes('fever') || msg.includes('sick')) {
      return 'I recommend monitoring the temperature and providing plenty of water. If symptoms persist, please bring the animal for examination.';
    } else if (msg.includes('milk') || msg.includes('waiting')) {
      return 'Please wait for the complete withdrawal period before consuming milk or meat. I\'ll notify you when it\'s safe.';
    } else if (msg.includes('thank')) {
      return 'You\'re welcome! Feel free to contact me anytime if you need assistance.';
    } else {
      return 'I understand your concern. Let me help you with that. Can you provide more details?';
    }
  };

  // Filter chats based on search
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <MessageCircle className="w-6 h-6 text-green-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">{t.chat}</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex">
        
        {/* Chat List Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          
          {/* Search Header */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">{t.conversations}</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      chat.role === 'veterinarian' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {chat.role === 'veterinarian' ? (
                        <Stethoscope className="w-6 h-6 text-blue-600" />
                      ) : (
                        <User className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 truncate">{chat.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{chat.timestamp}</span>
                        {chat.unread > 0 && (
                          <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    <p className="text-xs text-gray-500 capitalize mt-1">
                      {t[chat.role] || chat.role} • {chat.online ? t.online : t.offline}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedChat.role === 'veterinarian' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {selectedChat.role === 'veterinarian' ? (
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                      ) : (
                        <User className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {t[selectedChat.role] || selectedChat.role} • {selectedChat.online ? t.online : t.offline}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {messages.length > 0 ? (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-green-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p>{t.noMessages}</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={t.typeMessage}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center text-gray-500">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p>{t.selectChat}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;