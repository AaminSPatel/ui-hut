'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiSearch } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-8xl font-bold text-primary mb-4"
        >
          404
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Page Not Found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-300 mb-8"
        >
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <FiHome />
            <span>Go Home</span>
          </Link>
          <Link
            href="/components"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FiSearch />
            <span>Browse Components</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}