import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Activity, 
  Server, 
  Code, 
  Boxes, 
  Cpu, 
  GitBranch, 
  Database, 
  Layers, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Terminal as TerminalIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PIPELINE_NODES } from '../data/portfolioData';
import { PipelineNode } from '../types';

export const PipelineSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<PipelineNode>(PIPELINE_NODES[2]); // Default GitHub Actions
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);
    setSimulationLogs(['[00:00.100] [TRIGGER] Developer pushed commit 8a93fe1 to origin/main']);

    const steps = [
      { step: 0, delay: 600, log: '[00:00.620] [GIT] GitHub Webhook dispatched to automated runner matrix' },
      { step: 1, delay: 1300, log: '[00:01.350] [CI/CD] GitHub Actions initiated: Linting & Pytest test suite (142 tests PASSED)' },
      { step: 2, delay: 2100, log: '[00:02.100] [DOCKER] Building multi-stage OCI container image (layer cache hit 88%)' },
      { step: 3, delay: 2800, log: '[00:02.820] [REGISTRY] Image registry.manna.internal/app:v2.4.2 validated with SHA256 signature' },
      { step: 4, delay: 3500, log: '[00:03.500] [NGINX] Pre-warming fallback upstream socket 127.0.0.1:8002' },
      { step: 5, delay: 4200, log: '[00:04.200] [LIVE CUTOVER] Hot reload executed (nginx -s reload). 0 in-flight requests dropped' },
      { step: 6, delay: 5000, log: '[00:05.000] [POSTGRES] Stored procedures reconciled & connection pool verified. STATUS: 100% HEALTHY' }
    ];

    steps.forEach(({ step, delay, log }) => {
      setTimeout(() => {
        setActiveStepIndex(step);
        setSelectedNode(PIPELINE_NODES[step]);
        setSimulationLogs((prev) => [...prev, log]);
        if (step === steps.length - 1) {
          try {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.7 },
              colors: ['#f59e0b', '#38bdf8', '#10b981', '#fef08a']
            });
          } catch {
            // ignore if not supported
          }
          setTimeout(() => setIsSimulating(false), 800);
        }
      }, delay);
    });
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setActiveStepIndex(-1);
    setSelectedNode(PIPELINE_NODES[0]);
    setSimulationLogs(['Telemetry reset. Ready for live pipeline simulation.']);
  };

  return (
    <section id="pipeline" className="py-24 border-t border-amber-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>ACT I // THE CONDUIT OF CONTINUOUS DELIVERY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic font-bold text-white tracking-tight">
              Interactive Infrastructure Pipeline
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-sans">
              Experience the end-to-end automated lifecycle engineered for Manna Analytics. Select any stage to inspect real deployment configs, or trigger a live release simulation.
            </p>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
            <button
              id="simulate-release-btn"
              onClick={runSimulation}
              disabled={isSimulating}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                isSimulating
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulating ? 'Simulating Cutover...' : 'Simulate Live Release'}</span>
            </button>

            <button
              onClick={resetSimulation}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-white/10 hover:border-amber-500/30 transition-colors"
              title="Reset simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cinematic Pipeline Visualizer (Interactive 7-Node Conduit) */}
        <div className="cinematic-panel p-6 rounded-2xl border border-amber-500/20 relative overflow-hidden mb-8">
          {/* Subtle Stage Telemetry Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2 text-amber-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="font-semibold tracking-wider uppercase">
                {isSimulating ? 'SIMULATION ACTIVE: EXECUTING CONDUIT' : 'IDLE: CLICK ANY NODE TO INSPECT ARCHITECTURE'}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" /> Latency: 0.8ms
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-medium">99.98% Healthy</span>
            </div>
          </div>

          {/* Node Cards Row */}
          <div className="relative py-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
              {PIPELINE_NODES.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                const isStepActive = activeStepIndex === index;

                return (
                  <motion.button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900/95 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.35)] -translate-y-1'
                        : isStepActive
                        ? 'bg-amber-950/40 border-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.5)] -translate-y-1'
                        : 'bg-slate-950/70 border-white/10 hover:border-amber-500/30 text-slate-300'
                    }`}
                  >
                    {/* Node Number Badge */}
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                        {node.stageNumber}
                      </span>
                      {isStepActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      )}
                    </div>

                    {/* Node Title */}
                    <div>
                      <h4 className={`text-xs font-bold font-mono tracking-tight ${isSelected ? 'text-amber-200' : 'text-slate-200'}`}>
                        {node.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 line-clamp-1">
                        {node.subtitle}
                      </p>
                    </div>

                    {/* Status Pill */}
                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono">
                      <span className="text-emerald-400">{node.telemetry.status}</span>
                      <span className="text-slate-500">{node.telemetry.latency}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Glowing Golden Laser Beam across nodes (desktop view) */}
            <div className="hidden lg:block absolute top-[52px] left-6 right-6 pointer-events-none -z-0">
              <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="goldBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#fde047" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="2" x2="100%" y2="2" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <line
                  x1="0"
                  y1="2"
                  x2="100%"
                  y2="2"
                  stroke="url(#goldBeamGrad)"
                  strokeWidth="2.5"
                  className={isSimulating ? 'animate-conduit' : 'opacity-40'}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Stage Deep Dive Inspector & Live Simulation Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Selected Stage Configuration Inspector */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="cinematic-panel p-6 rounded-2xl border border-amber-500/20 space-y-4"
              >
                {/* Stage Info Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        STAGE {selectedNode.stageNumber}
                      </span>
                      <h3 className="text-lg font-bold text-white font-mono">
                        {selectedNode.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      {selectedNode.role}
                    </p>
                  </div>

                  {/* Stage Metrics Badges */}
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-emerald-300">
                      Health: {selectedNode.telemetry.health}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-cyan-300">
                      Latency: {selectedNode.telemetry.latency}
                    </span>
                  </div>
                </div>

                {/* Real Configuration Preview (Dockerfile, YAML, Nginx config) */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="text-amber-400 font-semibold">{selectedNode.configTitle}</span>
                    <span className="text-[11px] text-slate-500">production-tested</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950/95 border border-white/10 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed shadow-inner">
                    <code>{selectedNode.configSnippet}</code>
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column (5 cols): Live Deployment Log Stream */}
          <div className="lg:col-span-5">
            <div className="cinematic-panel p-5 rounded-2xl border border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-white">CONDUIT EVENT STREAM</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  {isSimulating ? 'STREAMING...' : 'ONLINE'}
                </span>
              </div>

              {/* Streaming Logs Viewport */}
              <div className="h-[260px] overflow-y-auto space-y-1.5 p-3 rounded-xl bg-slate-950/90 border border-white/5 text-[11px] text-slate-300">
                {simulationLogs.length === 0 ? (
                  <div className="text-slate-500 italic py-8 text-center">
                    Click "Simulate Live Release" to watch real-time deployment logs.
                  </div>
                ) : (
                  simulationLogs.map((log, i) => (
                    <div
                      key={i}
                      className={
                        log.includes('PASSED') || log.includes('HEALTHY') || log.includes('SUCCESS')
                          ? 'text-emerald-400'
                          : log.includes('TRIGGER') || log.includes('DOCKER')
                          ? 'text-amber-300'
                          : 'text-slate-400'
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
                <span>Auto-scrolling telemetry</span>
                <span className="text-amber-400">Zero downtime verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
