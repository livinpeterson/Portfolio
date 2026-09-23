/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FolioPreloader } from './components/FolioPreloader';
import { FolioCanvasScroll } from './components/FolioCanvasScroll';
import { FolioNavbar } from './components/FolioNavbar';
import { CursorSpotlight } from './components/CursorSpotlight';
import { FolioHero } from './components/FolioHero';
import { FolioAbout } from './components/FolioAbout';
import { FolioProjects } from './components/FolioProjects';
import { FolioWorkflow } from './components/FolioWorkflow';
import { FolioStats } from './components/FolioStats';
import { FolioStudio } from './components/FolioStudio';
import { FolioTestimonials } from './components/FolioTestimonials';
import { FolioContact } from './components/FolioContact';
import { FolioFooter } from './components/FolioFooter';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'projects'>('home');
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const percent = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollPercent(percent);
        setShowScrollTop(window.scrollY > 350);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F8F8FF] font-sans relative selection:bg-[#FF4D2D]/35 selection:text-white">
      {/* Interactive cursor spotlight and trailing ring */}
      <CursorSpotlight />

      {/* Percentage preloader counter (1% ... 100%) */}
      <FolioPreloader />

      {/* Smooth scroll-driven character canvas animation backdrop */}
      <FolioCanvasScroll />

      {/* Floating Header Navigation */}
      <FolioNavbar
        activeView={activeView}
        setActiveView={setActiveView}
        onNavigateSection={scrollTo}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pt-4">
        {activeView === 'home' ? (
          <>
            {/* Hero Section: Creative Director + Tags */}
            <FolioHero
              onExploreProjects={() => scrollTo('projects')}
              onContact={() => scrollTo('contact')}
            />

            {/* Brands Bar & Behind the Designs */}
            <FolioAbout
              onContact={() => scrollTo('contact')}
              onSelectProject={() => {
                setActiveView('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Portfolio Showcase / Selected Works & Featured Projects */}
            <FolioProjects
              onContact={() => scrollTo('contact')}
              isStandalonePage={false}
            />

            {/* Workflow Plan: 2-week design sprint */}
            <FolioWorkflow />

            {/* Stats: 65% / $30B */}
            <FolioStats />

            {/* Global Studio Section */}
            <FolioStudio />

            {/* Client Feedback Testimonials */}
            <FolioTestimonials />

            {/* Ready to Grow & Scale Consultation Form */}
            <FolioContact />
          </>
        ) : (
          /* Dedicated Projects Page (as demonstrated at timestamp 08:00 in video) */
          <div className="pt-20">
            <FolioProjects
              onContact={() => {
                setActiveView('home');
                setTimeout(() => scrollTo('contact'), 150);
              }}
              isStandalonePage={true}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <FolioFooter
        onNavigateSection={(sec) => {
          setActiveView('home');
          setTimeout(() => scrollTo(sec), 100);
        }}
        onOpenProjects={() => {
          setActiveView('projects');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Circular Scroll-Progress & Back-To-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full glass-card border border-white/20 flex items-center justify-center text-white hover:text-[#FF4D2D] hover:border-[#FF4D2D]/40 transition-colors shadow-2xl cursor-pointer group"
            title="Scroll to Top"
          >
            {/* Circular Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-[#FF4D2D]"
                strokeWidth="2.5"
                strokeDasharray={113.1}
                strokeDashoffset={113.1 - (113.1 * scrollPercent) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
