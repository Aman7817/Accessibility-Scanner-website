import React, { useState, useRef, useEffect } from 'react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm WebLoom AI Assistant. Ask me anything about website accessibility, WCAG guidelines, or web development!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  // Predefined Q&A
  const qaPairs = {
    "what are the latest wcag guidelines?": "The latest WCAG guidelines are version 2.2, including Focus Appearance, Dragging Movements, and Target Size for better accessibility.",
    "hello": "Hello! I'm WebLoom AI Assistant. How can I help?",
    "default": "I'm here to help with web accessibility. Ask me anything!"
  };

  // Get bot response
  const getBotResponse = (userMessage) => {
    setIsTyping(true);
    setTimeout(() => {
      const lowerMessage = userMessage.toLowerCase().trim();
      const response = qaPairs[lowerMessage] || qaPairs.default;

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000); // 1s delay
  };

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const msg = inputMessage; // store before clearing
    setInputMessage('');
    getBotResponse(msg);
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! 👋 I'm WebLoom AI Assistant. Ask me anything about website accessibility, WCAG guidelines, or web development!",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  // Quick actions
  const quickActions = [
    { title: "WCAG Guidelines", question: "What are the latest wcag guidelines?", icon: "📋" },
    { title: "Color Contrast", question: "How to check color contrast for accessibility?", icon: "🎨" },
    { title: "Screen Readers", question: "How to make website screen reader friendly?", icon: "👁️" },
    { title: "Keyboard Nav", question: "What is keyboard navigation accessibility?", icon: "⌨️" },
    { title: "Semantic HTML", question: "What is semantic html?", icon: "🔡" },
    { title: "Mobile Accessibility", question: "Mobile accessibility best practices", icon: "📱" },
    { title: "Testing Tools", question: "What are the best accessibility testing tools?", icon: "🧪" },
    { title: "Why Accessibility", question: "Why is accessibility important?", icon: "❓" }
  ];

  // Handle quick action click
  const handleQuickAction = (question) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    getBotResponse(question);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center z-50"
        aria-label="Open chatbot"
      >
        💬
      </button>

      {/* Floating Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40 overflow-hidden">
          
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 font-semibold rounded-t-2xl flex justify-between items-center">
            AI Chat
            <button onClick={clearChat} className="text-white/80 hover:text-white text-sm">Clear</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-xl ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 shadow border'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-50 block mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-2">
                <div className="bg-white p-2 rounded-xl shadow border flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  <span className="text-xs text-gray-500">AI is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t bg-white">
            <div className="grid grid-cols-2 gap-2 mb-3 max-h-32 overflow-y-auto">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.question)}
                  className="flex items-center space-x-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs transition-colors"
                >
                  <span>{action.icon}</span>
                  <span>{action.title}</span>
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-lg">Send</button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};

export default AIChatbot;
