'use client';

import { useSite } from '@/context/SiteContext';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useSite();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleDarkMode}
      className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none"
    >
      <motion.div
        initial={false}
        animate={{ x: darkMode ? 24 : 2 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
      />
      <div className="absolute inset-0 flex items-center justify-between px-1">
        <FiSun size={10} className="text-yellow-500 ml-1" />
        <FiMoon size={10} className="text-gray-400 mr-1" />
      </div>
    </motion.button>
  );
}