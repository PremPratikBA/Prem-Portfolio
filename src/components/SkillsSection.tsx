import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { Code2, Settings, Users, Database, Wrench, Globe } from 'lucide-react';

const getIconForGroup = (group: string) => {
  switch (group) {
    case 'Core BA': return <Settings className="w-5 h-5" />;
    case 'Process & Modelling': return <Code2 className="w-5 h-5" />;
    case 'Agile & Delivery': return <Users className="w-5 h-5" />;
    case 'Data & Analytics': return <Database className="w-5 h-5" />;
    case 'Tools': return <Wrench className="w-5 h-5" />;
    case 'Domains': return <Globe className="w-5 h-5" />;
    default: return <Settings className="w-5 h-5" />;
  }
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/50 hover:to-pink-500/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
              <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl p-8 rounded-[15px] border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-purple-400 group-hover:text-pink-400 transition-colors">
                    {getIconForGroup(skillGroup.group)}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{skillGroup.group}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.split(', ').map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
