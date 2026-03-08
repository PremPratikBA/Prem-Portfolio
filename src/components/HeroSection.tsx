import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { ArrowDown, FileText } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const handleScrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateResumeText = () => {
    return `${resumeData.basics.name}
${resumeData.basics.title}
${resumeData.basics.phone} | ${resumeData.basics.email} | ${resumeData.basics.links[0]}

PROFESSIONAL SUMMARY
${resumeData.basics.summary}

PROFESSIONAL EXPERIENCE
${resumeData.experience.map(exp => `
${exp.company} - ${exp.location}
${exp.role} (${exp.dates})
${exp.client ? `Client: ${exp.client}\n` : ''}${
  exp.projects ? exp.projects.map(p => `Project: ${p.name}\nClients: ${p.clients}\n${p.bullets.map(b => `- ${b}`).join('\n')}`).join('\n\n') : exp.bullets?.map(b => `- ${b}`).join('\n')
}`).join('\n')}

SKILLS
${resumeData.skills.map(s => `${s.group}: ${s.items}`).join('\n')}

EDUCATION
${resumeData.education.map(e => `${e.institution}, ${e.location}\n${e.degree} (${e.dates})`).join('\n')}

CERTIFICATIONS
${resumeData.certifications.map(c => `- ${c}`).join('\n')}

ACHIEVEMENTS
${resumeData.awards.map(a => `- ${a.title}: ${a.description}`).join('\n')}
`;
  };

  const handleDownloadResume = () => {
    const text = generateResumeText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Prem_Pratik_Senapaty_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
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

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-4 leading-[1.1]"
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
            className="text-xl md:text-2xl font-medium text-indigo-300 mb-8 max-w-3xl"
          >
            {resumeData.basics.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg text-white/60 max-w-2xl mb-12 leading-relaxed"
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
            
            <button
              onClick={handleDownloadResume}
              className="group inline-flex items-center justify-center px-8 py-4 font-semibold text-white/80 transition-all duration-300 bg-transparent border border-white/10 rounded-full hover:text-white hover:border-white/30 hover:bg-white/5 w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Download Resume
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
