import React from 'react';
import { signInWithGoogle } from './firebase';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const handleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) onLogin(user);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        className="p-8 bg-white rounded-xl shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Welcome to ChatSphere
        </h1>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
