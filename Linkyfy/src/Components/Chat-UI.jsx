import React, { useState, useEffect } from "react";
import socket from "../Components/socket";
import { motion } from "framer-motion";
import { FaMoon, FaSun, FaPaperclip, FaSmile } from "react-icons/fa";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [theme, setTheme] = useState("light");
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_typing", (data) => {
      setTypingUser(data.user);
    });

    socket.on("user_stopped_typing", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stopped_typing");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msg = {
        content: message,
        user: user.displayName,
        timestamp: new Date(),
      };
      socket.emit("send_message", msg);
      setMessages((prev) => [...prev, msg]);
      setMessage("");
      socket.emit("stop_typing");
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim()) {
      socket.emit("typing", { user: user.displayName });
    } else {
      socket.emit("stop_typing");
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  };

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.5 } },
  };

  const chatMessageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  const typingAnimation = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 1, repeat: Infinity },
    },
  };

  return (
    <div className={`h-screen flex ${theme === "dark" ? "dark" : ""}`}>
      {/* Sidebar */}
      {showSidebar && (
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="w-1/4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 hidden md:block shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.h2
              className="text-2xl font-bold tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Chats
            </motion.h2>
            <motion.button
              onClick={toggleTheme}
              className="text-sm flex items-center bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-full shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </motion.button>
          </div>
          <div className="mt-4 space-y-4">
            {["John Doe", "Alice Smith", "Jane Miller"].map((name, index) => (
              <motion.div
                key={index}
                className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm cursor-pointer hover:scale-105 transition-transform"
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full ${
                    index % 2 === 0 ? "bg-green-500" : "bg-purple-500"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
                <span className="ml-4 text-lg">{name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={chatMessageVariants}
              initial="hidden"
              animate="visible"
              className={`p-4 rounded-xl shadow-lg max-w-xs ${
                msg.user === user.displayName
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start"
              }`}
            >
              <p className="font-bold text-sm">{msg.user}</p>
              <p className="mt-1">{msg.content}</p>
              <p className="text-xs mt-2 text-gray-400">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </motion.div>
          ))}
          {typingUser && (
            <motion.div
              className="italic text-sm text-gray-500 dark:text-gray-400"
              animate="pulse"
              variants={typingAnimation}
            >
              {typingUser} is typing...
            </motion.div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 flex items-center bg-white dark:bg-gray-800 shadow-md">
          <motion.div
            className="mr-4 flex items-center space-x-4"
            whileHover={{ scale: 1.1 }}
          >
            <FaPaperclip className="text-gray-500 dark:text-gray-400 cursor-pointer" />
            <FaSmile className="text-gray-500 dark:text-gray-400 cursor-pointer" />
          </motion.div>
          <motion.input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.button
            onClick={sendMessage}
            className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-transform"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            Send
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
