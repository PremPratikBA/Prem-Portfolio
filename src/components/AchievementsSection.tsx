import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { resumeData } from '../data/resume';
import { Trophy, TrendingUp, Target, Award } from 'lucide-react';

const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState("0");

  useEffect(() => {
    if (isInView) {
      const numMatch = value.match(/\d+/);
      if (numMatch) {
        const target = parseInt(numMatch[0]);
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(value.replace(numMatch[0], Math.floor(start).toString()));
          }
        }, 16);
        return () => clearInterval(timer);
      } else {
        setCount(value);
      }
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
};

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="relative py-32 px-6 bg-black/40 backdrop-blur-xl border-y border-white/5">
      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Impact & Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto"></div>
        </motion.div>

        {/* Top 3 Impact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {resumeData.achievements.slice(0, 3).map((ach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                  {index === 0 ? <TrendingUp className="w-8 h-8 text-emerald-400" /> : 
                   index === 1 ? <Target className="w-8 h-8 text-emerald-400" /> : 
                   <Trophy className="w-8 h-8 text-emerald-400" />}
                </div>
                <h3 className="text-4xl font-bold text-white mb-4 font-mono">
                  <AnimatedCounter value={ach.metric} />
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {ach.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resumeData.achievements.slice(3).map((ach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex flex-col justify-between"
            >
              <h4 className="text-2xl font-bold text-teal-300 mb-3 font-mono">
                {ach.metric}
              </h4>
              <p className="text-white/60 text-xs leading-relaxed">
                {ach.context}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Awards Section */}
        {resumeData.awards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mt-20 p-8 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Award className="w-32 h-32 text-amber-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                <Award className="w-6 h-6" />
                Awards & Recognition
              </h3>
              {resumeData.awards.map((award, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-xl font-semibold text-white">{award.title}</h4>
                  <p className="text-white/70 max-w-2xl leading-relaxed">{award.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
