import React from "react";
import { motion } from "framer-motion";

const Sidebar = ({ contacts }) => {
  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-1/4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      <ul className="space-y-4">
        {contacts.map((contact, index) => (
          <motion.li
            key={index}
            className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm cursor-pointer hover:bg-blue-500 hover:text-white"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {contact[0]}
            </div>
            <span className="ml-4">{contact}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
