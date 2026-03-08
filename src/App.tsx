import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SplashScreen } from './components/SplashScreen';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AchievementsSection } from './components/AchievementsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { Footer } from './components/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <React.Fragment key="main">
            <AnimatedBackground />
            <Navigation />
            
            <main className="relative z-10 flex flex-col">
              <HeroSection />
              <ExperienceSection />
              <AchievementsSection />
              <SkillsSection />
              <EducationSection />
            </main>

            <Footer />
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}
