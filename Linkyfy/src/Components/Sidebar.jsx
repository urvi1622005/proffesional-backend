import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar w-1/4 bg-gray-200 p-4 hidden md:block">
      <h2 className="text-xl font-bold">Chats</h2>
      <div className="chat-list mt-4">
        <div className="chat py-2 px-3 hover:bg-gray-300 rounded cursor-pointer">John Doe</div>
        <div className="chat py-2 px-3 hover:bg-gray-300 rounded cursor-pointer">Alice Smith</div>
      </div>
    </div>
  );
};

export default Sidebar;
