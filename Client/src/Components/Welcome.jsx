import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import welcomeImage from '../assets/welcom-notes.png'; // Make sure to add an image in this path

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <motion.div
        className="bg-white p-10 rounded-3xl shadow-2xl max-w-3xl w-full flex flex-col md:flex-row items-center gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.img
          src={welcomeImage}
          alt="Welcome"
          className="w-64 md:w-80 drop-shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />

        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">Welcome to Notes App</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">Capture your thoughts, organize ideas, and stay productive with our beautiful note-making app.</p>

          <motion.button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login to Get Started
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Welcome;
