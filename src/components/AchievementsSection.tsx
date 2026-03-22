import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { resumeData } from '../data/resume';
import { Trophy, TrendingUp, Target, Award, MessageSquare, X, ChevronRight, ChevronLeft, Star, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

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
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setZoomLevel(1);

  const nextFeedback = () => {
    setZoomLevel(1);
    setCurrentFeedbackIndex((prev) => 
      prev === (resumeData.clientFeedbacks?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevFeedback = () => {
    setZoomLevel(1);
    setCurrentFeedbackIndex((prev) => 
      prev === 0 ? (resumeData.clientFeedbacks?.length || 0) - 1 : prev - 1
    );
  };

  const closeGallery = () => {
    setIsFeedbackModalOpen(false);
    setZoomLevel(1);
  };

  return (
    <section id="achievements" className="relative py-8 px-6 bg-black/40 backdrop-blur-xl border-y border-white/5">
      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
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
              <div className="space-y-8">
                {resumeData.awards.map((award, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-xl font-semibold text-white">{award.title}</h4>
                    <p className="text-white/70 max-w-2xl leading-relaxed">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Client Feedbacks Banner */}
        {resumeData.clientFeedbacks && resumeData.clientFeedbacks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mt-12 relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/40 via-black/60 to-teal-900/40 p-8 md:p-16 text-center group"
          >
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
            
            <AnimatePresence mode="wait">
              {!isFeedbackModalOpen ? (
                <motion.div
                  key="banner-content"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/20 rotate-3 group-hover:rotate-6 transition-transform duration-500">
                    <MessageSquare className="w-10 h-10 text-black" />
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Feedback & Testimonials</span>
                  </h3>
                  
                  <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
                    Don't just take my word for it. Discover what clients and colleagues have to say about my dedication, problem-solving, and impact on their projects.
                  </p>
                  
                  <button
                    onClick={() => setIsFeedbackModalOpen(true)}
                    className="relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 animate-pulse"></span>
                    <span className="relative flex items-center gap-2 text-lg">
                      <Star className="w-5 h-5 fill-black" />
                      View Client Feedbacks
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="gallery-content"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex flex-col items-center w-full"
                >
                  {/* Gallery Header */}
                  <div className="w-full flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <MessageSquare className="w-6 h-6 text-emerald-400" />
                      Client Feedbacks
                    </h3>
                    <button
                      onClick={closeGallery}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center gap-2 backdrop-blur-sm border border-white/10"
                    >
                      <span className="text-sm font-medium">Close</span>
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Gallery Content */}
                  <div className="relative w-full flex items-center justify-center min-h-[400px] h-[60vh] bg-black/40 rounded-2xl border border-white/10 p-4 md:p-8 overflow-hidden">
                    
                    {/* Zoom Controls */}
                    <div className="absolute top-4 right-4 md:right-8 z-20 flex items-center gap-1 bg-black/60 p-1.5 rounded-xl backdrop-blur-md border border-white/10 shadow-xl">
                      <button onClick={handleZoomOut} disabled={zoomLevel <= 1} className="p-2 hover:bg-white/20 disabled:opacity-50 disabled:hover:bg-transparent rounded-lg text-white transition-colors">
                        <ZoomOut className="w-5 h-5" />
                      </button>
                      <div className="px-2 text-white/80 font-mono text-sm w-12 text-center">{Math.round(zoomLevel * 100)}%</div>
                      <button onClick={handleZoomIn} disabled={zoomLevel >= 3} className="p-2 hover:bg-white/20 disabled:opacity-50 disabled:hover:bg-transparent rounded-lg text-white transition-colors">
                        <ZoomIn className="w-5 h-5" />
                      </button>
                      <div className="w-px h-6 bg-white/20 mx-1"></div>
                      <button onClick={handleResetZoom} disabled={zoomLevel === 1} className="p-2 hover:bg-white/20 disabled:opacity-50 disabled:hover:bg-transparent rounded-lg text-white transition-colors">
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>

                    <button
                      onClick={prevFeedback}
                      className="absolute left-2 md:left-6 z-10 p-3 bg-black/60 hover:bg-emerald-500 text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:border-emerald-400"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Image Container with Scroll */}
                    <div className="w-full h-full max-w-5xl overflow-auto custom-scrollbar rounded-lg relative">
                      <div 
                        style={{ 
                          width: zoomLevel === 1 ? '100%' : `${zoomLevel * 100}%`, 
                          height: zoomLevel === 1 ? '100%' : `${zoomLevel * 100}%`,
                          transition: 'all 0.3s ease-out'
                        }}
                        className="min-w-full min-h-full flex items-center justify-center"
                      >
                        <img
                          src={resumeData.clientFeedbacks[currentFeedbackIndex].image}
                          alt={resumeData.clientFeedbacks[currentFeedbackIndex].alt}
                          className="shadow-2xl"
                          style={{
                            maxWidth: zoomLevel === 1 ? '100%' : 'none',
                            maxHeight: zoomLevel === 1 ? '100%' : 'none',
                            width: zoomLevel === 1 ? 'auto' : '100%',
                            height: zoomLevel === 1 ? 'auto' : '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={nextFeedback}
                      className="absolute right-2 md:right-6 z-10 p-3 bg-black/60 hover:bg-emerald-500 text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:border-emerald-400"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Gallery Footer (Indicators) */}
                  <div className="mt-8 flex justify-center gap-3">
                    {resumeData.clientFeedbacks.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentFeedbackIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentFeedbackIndex ? 'bg-emerald-400 w-8' : 'bg-white/30 hover:bg-white/50 w-2'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
