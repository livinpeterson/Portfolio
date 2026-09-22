import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FolioFooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenProjects: () => void;
}

export const FolioFooter: React.FC<FolioFooterProps> = ({
  onNavigateSection,
  onOpenProjects
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-20 pb-12 border-t border-white/5 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/5">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
              Livingston Peter
            </h3>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              DevOps Engineer &amp; Infrastructure Specialist at Manna Analytics. Architecting zero-downtime CI/CD delivery pipelines, Docker clusters, Linux server hardening, and production observability.
            </p>
            <div className="pt-2">
              <a
                href="/Livingston_Peter_DevOps_Resume.doc"
                download="Livingston_Peter_DevOps_Resume.doc"
                className="coral-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans"
              >
                <span>Download Resume (.doc)</span>
              </a>
            </div>
          </div>

          {/* Navigation Col (2 cols) */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <span className="font-mono text-slate-300 font-bold uppercase tracking-wider block mb-4">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenProjects}
                  className="hover:text-white transition-colors"
                >
                  Deployments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('workflow')}
                  className="hover:text-white transition-colors"
                >
                  CI/CD Pipeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('stats')}
                  className="hover:text-white transition-colors"
                >
                  Telemetry
                </button>
              </li>
            </ul>
          </div>

          {/* Social Col (2 cols) */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <span className="font-mono text-slate-300 font-bold uppercase tracking-wider block mb-4">
              NETWORK
            </span>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <a
                  href="https://www.linkedin.com/in/livingston-peter-58593916b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href="mailto:livinpeterson@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Direct Email
                </a>
              </li>
              <li>
                <a
                  href="tel:+918870724190"
                  className="hover:text-white transition-colors"
                >
                  +91 8870724190
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Col (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="font-mono text-slate-300 font-bold uppercase tracking-wider block mb-4">
              DIRECT DISPATCH
            </span>
            <a
              href="mailto:livinpeterson@gmail.com"
              className="text-white hover:text-[#FF4D2D] font-medium block transition-colors break-all"
            >
              livinpeterson@gmail.com
            </a>
            <span className="text-slate-400 block">
              Nagercoil, Tamilnadu, India <br />
              Open to Worldwide Remote Roles
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <span>&copy; 2026 Livingston Peter. All rights reserved. DevOps &amp; Cloud Infrastructure Portfolio.</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
