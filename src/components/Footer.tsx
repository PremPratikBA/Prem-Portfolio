import React from 'react';
import { resumeData } from '../data/resume';
import { Mail, Phone, Linkedin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 border-t border-white/10 bg-black/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="text-2xl font-bold tracking-tighter text-white">
            {resumeData.basics.name}
          </h2>
          <p className="text-white/50 text-sm font-mono">
            {resumeData.basics.title}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={`mailto:${resumeData.basics.email}`}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">{resumeData.basics.email}</span>
          </a>
          <a
            href={`tel:${resumeData.basics.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">{resumeData.basics.phone}</span>
          </a>
          <a
            href={`https://${resumeData.basics.links[0]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>

        <button
          onClick={handleScrollToTop}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
