/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FolioPreloader } from './components/FolioPreloader';
import { FolioCanvasScroll } from './components/FolioCanvasScroll';
import { FolioNavbar } from './components/FolioNavbar';
import { FolioHero } from './components/FolioHero';
import { FolioAbout } from './components/FolioAbout';
import { FolioProjects } from './components/FolioProjects';
import { FolioWorkflow } from './components/FolioWorkflow';
import { FolioPalette } from './components/FolioPalette';
import { FolioStats } from './components/FolioStats';
import { FolioStudio } from './components/FolioStudio';
import { FolioTestimonials } from './components/FolioTestimonials';
import { FolioContact } from './components/FolioContact';
import { FolioFooter } from './components/FolioFooter';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'projects'>('home');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F8F8FF] font-sans relative selection:bg-[#FF4D2D]/35 selection:text-white">
      {/* Percentage preloader counter (1% ... 100%) as seen in video */}
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

            {/* Color Palette section */}
            <FolioPalette />

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
    </div>
  );
}
