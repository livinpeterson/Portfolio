import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileDown, 
  Layers, 
  ArrowRight, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Activity, 
  Sparkles,
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExplorePipeline: () => void;
  onExploreIncidents: () => void;
  onExploreCinema: () => void;
  onContact: () => void;
}

const techBadges = [
  'Linux Kernel / Bash',
  'Docker Multi-Stage',
  'GitHub Actions CI/CD',
  'Nginx Reverse Proxy',
  'Prometheus & Grafana',
  'PostgreSQL Stored Procs',
  'Python Automation',
  'AWS ECS / CloudWatch'
];

export const Hero: React.FC<HeroProps> = ({ 
  onExplorePipeline, 
  onExploreIncidents, 
  onExploreCinema,
  onContact 
}) => {
  const [activeTab, setActiveTab] = useState<'kpi' | 'cli'>('kpi');
  const [cliInput, setCliInput] = useState('');
  const [cliOutput, setCliOutput] = useState<string[]>([
    'manna-ops@prod-edge-01:~$ systemctl status devops-engine',
    '● devops-engine.service - Production Telemetry & Zero-Downtime Agent',
    '   Loaded: loaded (/etc/systemd/system/devops-engine.service; enabled)',
    '   Active: active (running) since May 2025; 99.98% verified uptime',
    '   Main PID: 1042 (livingston-agent)',
    '   Tasks: 16 (limit: 4915)',
    '   Memory: 182.4M (limit: 2.0G)',
    '   CGroup: /system.slice/devops-engine.service',
    '           └─1042 /usr/local/bin/deploy-guard --zero-downtime --metrics=prometheus',
    'Type "help" or click sample commands below:'
  ]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newOutput = [...cliOutput, `manna-ops@prod-edge-01:~$ ${cmd}`];

    switch (trimmed) {
      case 'help':
        newOutput.push(
          'Available commands:',
          '  status    - Display cluster health and uptime metrics',
          '  whoami    - Livingston Peter professional profile',
          '  pipeline  - Jump to Act I: Infrastructure Conduit',
          '  incidents - Jump to Act II: Incident Response Lab',
          '  contact   - Transmission coordinates',
          '  clear     - Wipe terminal screen'
        );
        break;
      case 'status':
        newOutput.push(
          '[STATUS 200 OK] Uptime: 99.98% | Cluster: Healthy | Hot Reloads: Ready | Nginx: 4ms latency'
        );
        break;
      case 'whoami':
        newOutput.push(
          'Livingston Peter: DevOps Engineer based in Nagercoil, India.',
          'Core Focus: GitHub Actions CI/CD, Docker container parity, Nginx reverse proxy, PostgreSQL optimization.'
        );
        break;
      case 'pipeline':
        newOutput.push('Routing user to Act I: Pipeline Conduit...');
        setTimeout(() => onExplorePipeline(), 400);
        break;
      case 'incidents':
        newOutput.push('Routing user to Act II: Incident Forensic Lab...');
        setTimeout(() => onExploreIncidents(), 400);
        break;
      case 'contact':
        newOutput.push(
          `Email: ${PERSONAL_INFO.email}`,
          `Phone: ${PERSONAL_INFO.phone}`,
          `LinkedIn: ${PERSONAL_INFO.linkedin}`
        );
        break;
      case 'clear':
        setCliOutput([]);
        setCliInput('');
        return;
      default:
        newOutput.push(`Command not found: "${cmd}". Type "help" for a list of diagnostics.`);
    }

    setCliOutput(newOutput);
    setCliInput('');
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-24 flex flex-col justify-center overflow-hidden">
      {/* Horizontal Anamorphic Lens Flare Line */}
      <div className="absolute top-28 left-0 right-0 h-[1px] anamorphic-flare opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Act Marker & Cluster Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-mono shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">PROLOGUE //</span>
            <span className="font-semibold text-amber-200">THE ARCHITECT</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">CLUSTER:</span>
            <span className="text-white font-medium">manna-prod-v2</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">0 DOWNTIME RELEASES</span>
          </div>
        </motion.div>

        {/* 2-Column Majestic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Hero Title & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-cinematic font-bold tracking-tight text-white leading-[1.08]">
                Livingston <br />
                <span className="gold-gradient-text drop-shadow-[0_10px_35px_rgba(234,179,8,0.25)]">
                  Peter
                </span>
              </h1>
            </motion.div>

            {/* Subtitle & Role Designation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <h2 className="text-xl sm:text-2xl font-mono font-semibold tracking-tight text-slate-200">
                DevOps Engineer & Infrastructure Specialist
              </h2>
            </motion.div>

            {/* Narrative Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl font-sans"
            >
              Automating release lifecycles, hardening Linux cloud servers, and establishing end-to-end observability across distributed microservices. Blending deep database engineering roots with modern container orchestration for uninterrupted business continuity.
            </motion.p>

            {/* Technical Stack Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {techBadges.map((badge, idx) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/90 text-slate-200 border border-white/10 hover:border-amber-500/40 hover:text-amber-300 transition-colors shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 opacity-80" />
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.52 }}
              className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              {/* Button 1: 3D System Scrub */}
              <button
                id="hero-explore-cinema-btn"
                onClick={onExploreCinema}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-[0_0_30px_rgba(245,158,11,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 font-mono"
              >
                <Cpu className="w-4 h-4 text-slate-950" />
                <span>3D System Scrub</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>

              {/* Button 2: Inspect Pipeline */}
              <button
                id="hero-explore-pipeline-btn"
                onClick={onExplorePipeline}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-slate-900/90 text-slate-200 hover:text-white border border-amber-500/25 hover:border-amber-400 hover:bg-slate-850 shadow-lg transition-all duration-200 hover:-translate-y-0.5 font-mono"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Pipeline Conduit</span>
              </button>

              {/* Button 3: Download Resume */}
              <a
                id="hero-download-resume-btn"
                href="/Livingston_Peter_DevOps_Resume.doc"
                download="Livingston_Peter_DevOps_Resume.doc"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-slate-900/90 text-slate-200 hover:text-white border border-white/10 hover:border-amber-500/40 transition-all duration-200 hover:-translate-y-0.5 font-mono"
              >
                <FileDown className="w-4 h-4 text-amber-400" />
                <span>Resume .doc</span>
              </a>

              {/* Button 4: Incident Lab */}
              <button
                id="hero-incident-lab-btn"
                onClick={onExploreIncidents}
                className="inline-flex items-center gap-2 px-3.5 py-3 rounded-xl font-medium text-sm text-slate-400 hover:text-amber-300 hover:bg-white/5 border border-transparent hover:border-amber-500/30 transition-all duration-200 font-mono"
              >
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Incident Lab</span>
              </button>
            </motion.div>

            {/* Verified Profile Links from Resume */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-white/10 font-mono"
            >
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors"
                title="Livingston Peter LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                <span>linkedin.com/in/livingston-peter-58593916b</span>
              </a>

              <span className="text-slate-700 hidden sm:inline">|</span>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>

              <span className="text-slate-700 hidden md:inline">|</span>

              <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Nagercoil, Tamil Nadu, India</span>
              </span>
            </motion.div>
          </div>

          {/* Right Column: Director's Terminal / Live Telemetry (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="cinematic-panel rounded-2xl p-5 border border-amber-500/25 relative overflow-hidden group">
              {/* Top Terminal Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
                  <span className="ml-2 text-slate-400 text-[11px]">telemetry@manna-prod:~</span>
                </div>

                {/* Tab switchers */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('kpi')}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                      activeTab === 'kpi'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Telemetry
                  </button>
                  <button
                    onClick={() => setActiveTab('cli')}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                      activeTab === 'cli'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    CLI Shell
                  </button>
                </div>
              </div>

              {/* Tab 1: KPI Telemetry & Live Incident Records */}
              {activeTab === 'kpi' && (
                <div className="space-y-3 font-mono text-xs">
                  {/* Current Active Role Highlight */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/20">
                    <div className="text-amber-400 text-[10px] mb-1 flex items-center justify-between">
                      <span>ACTIVE PRODUCTION ASSIGNMENT</span>
                      <span>May 2025 — PRESENT</span>
                    </div>
                    <div className="text-white font-semibold flex items-center gap-2 text-sm">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Manna Analytics Private Limited</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Leading containerized architectures, GitHub Actions push-to-deploy, Prometheus/Grafana alerting, and Linux server hardening.
                    </p>
                  </div>

                  {/* 2x2 Telemetry Cards */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 hover:border-amber-500/30 transition-all">
                      <div className="text-slate-400 text-[10px]">CUTOVER RECORD</div>
                      <div className="text-amber-300 font-bold text-lg mt-0.5">0 Downtime</div>
                      <div className="text-slate-400 text-[10px]">VPS Server Migration</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 hover:border-amber-500/30 transition-all">
                      <div className="text-slate-400 text-[10px]">OBSERVABILITY</div>
                      <div className="text-cyan-400 font-bold text-lg mt-0.5">Prometheus</div>
                      <div className="text-slate-400 text-[10px]">& Grafana Alertmanager</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 hover:border-amber-500/30 transition-all">
                      <div className="text-slate-400 text-[10px]">DATA PIPELINES</div>
                      <div className="text-emerald-400 font-bold text-lg mt-0.5">0% Data Loss</div>
                      <div className="text-slate-400 text-[10px]">i-kids ERP Migration</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 hover:border-amber-500/30 transition-all">
                      <div className="text-slate-400 text-[10px]">INCIDENT MTTR</div>
                      <div className="text-purple-300 font-bold text-lg mt-0.5">&lt; 14 Mins</div>
                      <div className="text-slate-400 text-[10px]">SEV-1 Hot Patch</div>
                    </div>
                  </div>

                  {/* Core Motto */}
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-white/10 text-slate-300 text-[11px] leading-relaxed">
                    <span className="text-amber-400 font-bold">$ </span>
                    <span className="text-slate-200">cat /etc/devops/creed.txt</span>
                    <p className="mt-1 text-slate-400 italic">
                      "Eliminate manual release friction, diagnose bottlenecks at root, and guarantee bulletproof reliability."
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Interactive CLI Terminal Shell */}
              {activeTab === 'cli' && (
                <div className="font-mono text-xs flex flex-col h-[280px]">
                  <div className="flex-1 overflow-y-auto space-y-1 pr-1 text-slate-300 text-[11px]">
                    {cliOutput.map((line, i) => (
                      <div key={i} className={line.startsWith('manna-ops') ? 'text-amber-300 font-semibold' : 'text-slate-400'}>
                        {line}
                      </div>
                    ))}
                  </div>

                  {/* Preset Quick Command Buttons */}
                  <div className="flex flex-wrap gap-1.5 py-2 border-t border-white/10">
                    {['status', 'whoami', 'pipeline', 'incidents', 'contact', 'clear'].map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => handleCommand(cmd)}
                        className="px-2 py-0.5 rounded bg-slate-900 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-white/10 text-[10px] transition-colors"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>

                  {/* CLI Form Input */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (cliInput) handleCommand(cliInput);
                    }}
                    className="flex items-center gap-2 pt-2 border-t border-white/10"
                  >
                    <span className="text-amber-400 font-bold">$</span>
                    <input
                      type="text"
                      value={cliInput}
                      onChange={(e) => setCliInput(e.target.value)}
                      placeholder="Type status, whoami, pipeline..."
                      className="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-600 focus:outline-none text-xs"
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-[10px]"
                    >
                      EXEC
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
