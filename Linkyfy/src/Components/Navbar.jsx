import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaComments, FaInfoCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-2xl font-bold">ChatApp Clone</div>
      <div className="flex space-x-6">
        <motion.a
          href="/"
          className="flex items-center space-x-2 hover:scale-110"
          whileHover={{ scale: 1.2 }}
        >
          <FaHome />
          <span>Home</span>
        </motion.a>
        <motion.a
          href="/chat"
          className="flex items-center space-x-2 hover:scale-110"
          whileHover={{ scale: 1.2 }}
        >
          <FaComments />
          <span>Chat</span>
        </motion.a>
        <motion.a
          href="/features"
          className="flex items-center space-x-2 hover:scale-110"
          whileHover={{ scale: 1.2 }}
        >
          <FaInfoCircle />
          <span>Features</span>
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
