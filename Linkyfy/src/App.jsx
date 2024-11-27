import React, { useState, useEffect } from 'react';
import Chat from '../src/Components/Chat-UI';
import Sidebar from './components/Sidebar';
import '../src/main.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulating login or fetching user from API
    setUser({
      displayName: 'John Doe',
      email: 'john.doe@example.com',
    });
  }, []);

  return (
    <div className="app-container flex">
      <Sidebar />
      {user ? <Chat user={user} /> : <div>Loading...</div>}
    </div>
  );
};

export default App;
