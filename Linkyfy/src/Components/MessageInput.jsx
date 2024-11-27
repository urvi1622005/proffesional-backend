import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input p-4 flex items-center bg-gray-100">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type a message..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button
        onClick={handleSubmit}
        className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
