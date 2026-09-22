import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Terminal, 
  Server, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Zap, 
  Copy, 
  Check, 
  Play
} from 'lucide-react';
import { ProjectDeployment } from '../types';

interface ArchitectureModalProps {
  project: ProjectDeployment | null;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'cutover' | 'logs'>('topology');
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!project) return null;

  const runSimulation = () => {
    setIsRunningSim(true);
    setSimulatedLogs([
      `[INIT] Validating infrastructure targets for: ${project.title}`,
      `[SSH] Established secure ed25519 tunnel to production node (latency: 12ms)`,
      `[DOCKER] Pre-fetching target container images... done`,
      `[HEALTHCHECK] Staging instance healthy (HTTP 200 OK, latency: 8ms)`,
      `[CUTOVER] Atomic Nginx reload executed via 'nginx -s reload'`,
      `[VERIFY] Zero dropped connections detected across Cloudflare edge!`,
      `[STATUS] Deployment fully validated and operational.`
    ]);
    setTimeout(() => {
      setIsRunningSim(false);
    }, 1200);
  };

  const copySpecs = () => {
    const text = `${project.title}\n${project.subtitle}\nKey Metrics: ${project.keyMetrics.map(m => `${m.label}: ${m.value}`).join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#02050f]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl rounded-2xl bg-gradient-to-b from-[#091533] to-[#040816] border border-amber-500/35 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden font-sans z-10 my-8"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3 font-mono">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-amber-400 tracking-wider uppercase block">
                  SYSTEM BLUEPRINT & ARCHITECTURE SPECIFICATION
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {project.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copySpecs}
                className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-white transition-colors"
                title="Copy Project Brief"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:border-red-500/40 text-slate-300 hover:text-red-400 transition-colors"
                title="Close Blueprint"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subtitle & Key Metric Ribbons */}
          <div className="p-5 sm:p-6 border-b border-white/10 bg-slate-950/40">
            <p className="text-xs sm:text-sm text-slate-300 font-sans mb-4">
              {project.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              {project.keyMetrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-slate-400 text-[10px] block uppercase">{m.label}</span>
                  <span className="text-amber-300 font-bold text-sm sm:text-base mt-0.5 block">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-4 px-6 pt-4 border-b border-white/10 font-mono text-xs">
            <button
              onClick={() => setActiveTab('topology')}
              className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'topology'
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Architecture & Topology</span>
            </button>
            <button
              onClick={() => setActiveTab('cutover')}
              className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'cutover'
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Cutover Timeline & Milestones</span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'logs'
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Live Terminal Replay</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 max-h-[50vh] overflow-y-auto font-mono text-xs">
            {activeTab === 'topology' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20">
                  <span className="text-amber-400 text-[10px] uppercase font-bold block mb-2">
                    INGRESS TO PERSISTENCE FLOW:
                  </span>
                  <div className="text-slate-300 space-y-2 leading-relaxed">
                    <p>
                      <strong className="text-white">1. Edge Layer:</strong> Cloudflare DNS & SSL/TLS 1.3 termination passing requests to the Linux production droplet host.
                    </p>
                    <p>
                      <strong className="text-white">2. Reverse Proxy Layer:</strong> Nginx reverse proxy listening on port 443 with least_conn load balancing to active Docker containers.
                    </p>
                    <p>
                      <strong className="text-white">3. Microservice Cluster:</strong> Docker container instances isolated on bridge networks with non-root runtime users.
                    </p>
                    <p>
                      <strong className="text-white">4. Data Tier:</strong> PostgreSQL cluster with custom PL/pgSQL stored procedures and indexed query paths.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                      PRODUCTION CHALLENGE
                    </span>
                    <p className="text-slate-300 text-xs font-sans">
                      Preventing client connection drops and database write locks during continuous migrations across distributed environments.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1">
                      VERIFIED RESOLUTION
                    </span>
                    <p className="text-slate-300 text-xs font-sans">
                      Atomic DNS cutover via Cloudflare proxied CNAME records combined with staging database shadow replication and multi-sheet audit scripts.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cutover' && (
              <div className="space-y-3">
                {[
                  { phase: 'Phase 01', title: 'Pre-flight Validation & Image Baking', status: 'COMPLETED', time: 'T-60m' },
                  { phase: 'Phase 02', title: 'Database Shadow Sync & Audit Verification', status: 'COMPLETED', time: 'T-25m' },
                  { phase: 'Phase 03', title: 'Atomic Reverse Proxy & Cloudflare DNS Cutover', status: 'COMPLETED', time: 'T-00m' },
                  { phase: 'Phase 04', title: 'Telemetry Ingestion & Latency Verification', status: 'COMPLETED', time: 'T+15m' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <div>
                        <span className="text-[10px] text-amber-400 font-bold block">{step.phase} // {step.time}</span>
                        <span className="text-white text-xs font-bold">{step.title}</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Simulate live cutover sequence:</span>
                  <button
                    onClick={runSimulation}
                    disabled={isRunningSim}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isRunningSim ? 'Replaying...' : 'Replay Cutover'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1.5 min-h-36">
                  {simulatedLogs.length === 0 ? (
                    <span className="text-slate-500 italic">Click &quot;Replay Cutover&quot; to test the automated release execution loop...</span>
                  ) : (
                    simulatedLogs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400">&gt;</span>
                        <span className={log.includes('STATUS') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>{log}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex items-center justify-between font-mono text-xs">
            <span className="text-slate-400 text-[11px]">
              Engineered by Livingston Peter // Manna Analytics
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold hover:brightness-110 transition-all"
            >
              Close Specification
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
