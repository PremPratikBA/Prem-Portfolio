import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5s
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 300); // Small delay before unmounting
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
    >
      <div className="relative flex flex-col items-center">
        {/* Monogram */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-5xl font-bold tracking-tighter text-white mb-8 font-sans"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">P</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">P</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">S</span>
        </motion.div>

        {/* Loading Bar Container */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          {/* Progress Fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono"
        >
          Initializing System
        </motion.div>
      </div>
    </motion.div>
  );
};
