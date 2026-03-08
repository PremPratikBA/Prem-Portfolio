import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../data/resume';
import { Briefcase, Calendar, MapPin, ChevronDown, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[15px] md:left-[31px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-purple-500/50 rounded-full hidden sm:block"></div>

          <div className="space-y-8">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="relative sm:pl-12 md:pl-20">
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="absolute left-[8px] md:left-[24px] top-12 w-4 h-4 rounded-full bg-black border-2 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.6)] z-10 hidden sm:block"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20"></div>
              
              <div className="relative p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                      <Briefcase className="w-6 h-6 text-indigo-400" />
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 font-mono">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    {exp.client && (
                      <span className="px-3 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                        Client: {exp.client}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10 space-y-6">
                        {exp.projects ? (
                          exp.projects.map((proj, pIndex) => (
                            <div key={pIndex} className="space-y-4">
                              <h4 className="text-lg font-medium text-indigo-200 flex items-center gap-2">
                                {proj.name}
                                <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">
                                  {proj.clients}
                                </span>
                              </h4>
                              <ul className="space-y-3">
                                {proj.bullets.map((bullet, bIndex) => (
                                  <li key={bIndex} className="flex items-start gap-3 text-white/70 leading-relaxed">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400/70 shrink-0 mt-0.5" />
                                    <span>
                                      {/* Highlight numbers/percentages */}
                                      {bullet.split(/(\d+%?|~\d+%?|~\d+\s\w+)/g).map((part, i) => 
                                        /(\d+%?|~\d+%?|~\d+\s\w+)/.test(part) ? (
                                          <span key={i} className="text-emerald-300 font-semibold bg-emerald-500/10 px-1 rounded">{part}</span>
                                        ) : (
                                          <span key={i}>{part}</span>
                                        )
                                      )}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          <ul className="space-y-3">
                            {exp.bullets?.map((bullet, bIndex) => (
                              <li key={bIndex} className="flex items-start gap-3 text-white/70 leading-relaxed">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400/70 shrink-0 mt-0.5" />
                                <span>
                                  {bullet.split(/(\d+%?|~\d+%?|~\d+\s\w+)/g).map((part, i) => 
                                    /(\d+%?|~\d+%?|~\d+\s\w+)/.test(part) ? (
                                      <span key={i} className="text-emerald-300 font-semibold bg-emerald-500/10 px-1 rounded">{part}</span>
                                    ) : (
                                      <span key={i}>{part}</span>
                                    )
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
              </div>
            </motion.div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};
