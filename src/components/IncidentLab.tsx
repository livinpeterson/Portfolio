import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Flame, 
  ShieldAlert, 
  Terminal as TerminalIcon, 
  CheckCircle2, 
  Clock, 
  Search, 
  Cpu, 
  Zap, 
  RefreshCw,
  Server
} from 'lucide-react';
import { INCIDENT_CASES } from '../data/portfolioData';
import { IncidentCase } from '../types';

export const IncidentLab: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<IncidentCase>(INCIDENT_CASES[0]);
  const [activeTab, setActiveTab] = useState<'symptom' | 'rca' | 'hotfix' | 'prevention'>('symptom');
  const [isPatching, setIsPatching] = useState(false);
  const [patchApplied, setPatchApplied] = useState<{ [key: string]: boolean }>({});

  const applyHotfix = () => {
    setIsPatching(true);
    setTimeout(() => {
      setIsPatching(false);
      setPatchApplied((prev) => ({ ...prev, [selectedIncident.id]: true }));
    }, 1200);
  };

  const isCurrentPatchApplied = patchApplied[selectedIncident.id];

  return (
    <section id="incidents" className="py-24 border-t border-amber-500/15 relative bg-[#04091a]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-2">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>ACT II // THE CRUCIBLE OF PRODUCTION FORENSICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic font-bold text-white tracking-tight">
              Incident Response & Root Cause Lab
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-sans">
              True DevOps expertise is forged in the heat of production triage. Examine real SEV-level post-mortems diagnosed, isolated, and remediated by Livingston Peter.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-300 shrink-0">
            <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
            <span>INCIDENT POST-MORTEM DOSSIERS</span>
          </div>
        </div>

        {/* 3 Incident Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {INCIDENT_CASES.map((incident) => {
            const isSelected = selectedIncident.id === incident.id;
            const isResolved = patchApplied[incident.id];

            return (
              <button
                key={incident.id}
                onClick={() => {
                  setSelectedIncident(incident);
                  setActiveTab('symptom');
                }}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900/90 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)] -translate-y-1'
                    : 'bg-slate-950/70 border-white/10 hover:border-amber-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 font-mono text-xs">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${incident.severityColor}`}>
                      {incident.severity}
                    </span>
                    <span className="text-slate-500 text-[10px]">
                      {incident.timestamp}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white font-mono leading-snug mb-2">
                    {incident.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-mono line-clamp-2">
                    {incident.system}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 text-[10px]">MTTR: {incident.impactDuration}</span>
                  {isResolved ? (
                    <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Hotfix Verified
                    </span>
                  ) : (
                    <span className="text-amber-400 text-[11px]">Forensic Available</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Incident Deep-Dive Interactive Lab */}
        <div className="cinematic-panel p-6 sm:p-8 rounded-2xl border border-amber-500/25 relative overflow-hidden">
          {/* Top Dossier Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${selectedIncident.severityColor}`}>
                  {selectedIncident.severity}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Target: {selectedIncident.system}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-white">
                {selectedIncident.title}
              </h3>
            </div>

            {/* Hotfix Execution Button */}
            <div className="flex items-center gap-3">
              <button
                id="apply-hotfix-btn"
                onClick={applyHotfix}
                disabled={isPatching || isCurrentPatchApplied}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                  isCurrentPatchApplied
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : isPatching
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                }`}
              >
                {isCurrentPatchApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Hotfix Deployed & Reconciled</span>
                  </>
                ) : isPatching ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-amber-300 animate-spin" />
                    <span>Executing Live Patch...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Deploy Forensic Hotfix</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dossier Tabs: Symptom, RCA, Hotfix Code, Prevention */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-3 font-mono text-xs">
            <button
              onClick={() => setActiveTab('symptom')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'symptom'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Symptom & Alarms
            </button>
            <button
              onClick={() => setActiveTab('rca')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'rca'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Root Cause Analysis (RCA)
            </button>
            <button
              onClick={() => setActiveTab('hotfix')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'hotfix'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Surgical Hotfix Snippet
            </button>
            <button
              onClick={() => setActiveTab('prevention')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'prevention'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              4. Systemic Prevention
            </button>
          </div>

          {/* Tab Content Display */}
          <AnimatePresence mode="wait">
            {activeTab === 'symptom' && (
              <motion.div
                key="symptom"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 font-mono text-xs"
              >
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-amber-400 font-bold block mb-1 uppercase">Trigger Condition:</span>
                  <p className="text-slate-200 text-sm leading-relaxed">{selectedIncident.trigger}</p>
                </div>

                <div>
                  <span className="text-slate-400 block mb-2 font-semibold">Triage Symptoms Observed:</span>
                  <ul className="space-y-2">
                    {selectedIncident.symptoms.map((sym, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-white/5 text-slate-300">
                        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-slate-400 block mb-2 font-semibold">Terminal Log Forensic Extract:</span>
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-red-500/20 text-red-300 text-[11px] overflow-x-auto leading-relaxed">
                    <code>
                      {selectedIncident.terminalLogs.join('\n')}
                    </code>
                  </pre>
                </div>
              </motion.div>
            )}

            {activeTab === 'rca' && (
              <motion.div
                key="rca"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 font-mono text-xs"
              >
                <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30">
                  <h4 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-2">
                    <Search className="w-4 h-4" /> Comprehensive Root Cause Analysis
                  </h4>
                  <p className="text-slate-200 text-sm leading-relaxed">{selectedIncident.rca}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 leading-relaxed">
                  <span className="text-slate-400 block mb-1 font-semibold uppercase">Remediation Strategy:</span>
                  <p>{selectedIncident.remediation}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'hotfix' && (
              <motion.div
                key="hotfix"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    Executable Live Remediation Code
                  </span>
                  <span className="text-[11px] text-slate-500">Zero service interruption</span>
                </div>

                <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 text-[11px] overflow-x-auto leading-relaxed shadow-inner">
                  <code>{selectedIncident.hotfixSnippet}</code>
                </pre>
              </motion.div>
            )}

            {activeTab === 'prevention' && (
              <motion.div
                key="prevention"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 font-mono text-xs"
              >
                <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                  <h4 className="text-sm font-bold text-emerald-300 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Systemic Long-Term Guardrails
                  </h4>
                  <p className="text-slate-200 text-sm leading-relaxed">{selectedIncident.preventionMeasure}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
