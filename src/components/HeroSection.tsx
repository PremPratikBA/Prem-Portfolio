import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { ArrowDown, FileText } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const handleScrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            <span className="text-xs font-mono text-white/70 uppercase tracking-widest">Available for new opportunities</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 w-full">
            <div className="flex-1 flex flex-col items-start">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.1]"
              >
                {resumeData.basics.name.split(' ').map((word, i) => (
                  <span key={i} className="block md:inline-block mr-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                    {word}
                  </span>
                ))}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl font-medium text-indigo-300 mb-8 max-w-2xl"
              >
                {resumeData.basics.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-base md:text-lg text-white/60 max-w-xl mb-12 leading-relaxed"
              >
                {resumeData.basics.summary}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={handleScrollToExperience}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:scale-105 active:scale-95 w-full sm:w-auto overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center gap-2">
                    View Experience
                    <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                  </span>
                </button>
                
                <a
                  href="/PremPratikResume BA.pdf"
                  download="PremPratikResume BA.pdf"
                  className="group inline-flex items-center justify-center px-8 py-4 font-semibold text-white/80 transition-all duration-300 bg-transparent border border-white/10 rounded-full hover:text-white hover:border-white/30 hover:bg-white/5 w-full sm:w-auto"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Download Resume
                  </span>
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-64 md:w-72 lg:w-80 xl:w-[340px] flex-shrink-0 relative mt-12 lg:mt-0"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-emerald-500/30 rounded-[2rem] blur-3xl -z-10"></div>
              <img 
                src="/profile.png" 
                alt={resumeData.basics.name} 
                className="w-full aspect-[9/16] rounded-[2rem] object-cover border-4 border-white/10 shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
