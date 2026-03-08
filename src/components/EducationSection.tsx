import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="relative py-32 px-6 bg-black/40 backdrop-blur-xl border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Education Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4 flex items-center gap-4">
                <GraduationCap className="w-10 h-10 text-blue-400" />
                Education
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </div>

            <div className="space-y-8">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="relative pl-8 border-l border-white/10 before:content-[''] before:absolute before:left-[-5px] before:top-2 before:w-2.5 before:h-2.5 before:bg-blue-500 before:rounded-full before:shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  <h3 className="text-2xl font-bold text-white mb-1">{edu.institution}</h3>
                  <div className="flex items-center gap-3 text-sm text-white/60 font-mono mb-4">
                    <span>{edu.location}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30"></span>
                    <span>{edu.dates}</span>
                  </div>
                  <p className="text-lg text-indigo-200">{edu.degree}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4 flex items-center gap-4">
                <Award className="w-10 h-10 text-amber-400" />
                Certifications
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {resumeData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 mt-1">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-white/80 leading-relaxed font-medium">
                    {cert}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
