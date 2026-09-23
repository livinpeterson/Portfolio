import React from 'react';
import { motion } from 'motion/react';
import { GitBranch, Clock, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import { WORKFLOW_MILESTONES } from '../data/foliobloxData';

export const FolioWorkflow: React.FC = () => {
  const [activeStage, setActiveStage] = React.useState<number>(0);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  const stageLogs = [
    {
      cmd: 'git push origin main && git tag -a v2.4.0 -m "Production Release"',
      output: '[webhook] GitHub Actions runner provisioned in 3.2s. SHA: 8f2a1b9 verified.',
      status: 'SUCCESS'
    },
    {
      cmd: 'run-checks --parallel --coverage --cve-check',
      output: '[ci-gate] 142/142 unit & integration tests passed. Coverage: 94.6% (> 90% gate threshold).',
      status: 'VERIFIED'
    },
    {
      cmd: 'docker buildx build --platform linux/amd64 -t registry.manna.io/app:v2.4.0 --push .',
      output: '[docker] Multi-stage cache hit 7/8 layers. Image footprint: 142MB. Exported to registry.',
      status: 'BUILT'
    },
    {
      cmd: 'trivy image --severity HIGH,CRITICAL registry.manna.io/app:v2.4.0',
      output: '[security] 0 critical vulnerabilities found. SBOM generated & signed with Cosign.',
      status: 'SECURE'
    },
    {
      cmd: 'curl -fsS https://staging.manna.io/healthz | jq .status',
      output: '[staging] HTTP 200 OK. Synthetic user smoke tests passed. Ready for live traffic swap.',
      status: 'HEALTHY'
    },
    {
      cmd: 'nginx -s reload && docker compose up -d --no-deps web_blue',
      output: '[cutover] Upstream socket shifted in 4ms. Zero dropped connections across 12,400 active sessions.',
      status: 'LIVE'
    }
  ];

  // Auto-advance simulation when running
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setActiveStage((prev) => {
          if (prev >= WORKFLOW_MILESTONES.length - 1) {
            setIsRunning(false);
            return 0;
          }
          return prev + 1;
        });
      }, 2200);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleSimulate = () => {
    setIsRunning(true);
    setActiveStage(0);
  };

  return (
    <section id="workflow" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Workflow Header Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-[#FF4D2D] font-mono text-xs uppercase tracking-wider mb-3">
            <GitBranch className="w-3.5 h-3.5 text-[#FF4D2D] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Continuous Delivery Pipeline</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
            Automated CI/CD Conduit: <br className="hidden sm:block" />
            From Git Push to <br className="hidden sm:block" />
            Zero-Downtime Release.
          </h2>
        </div>

        <div className="lg:col-span-5 lg:pt-8 flex flex-col justify-between h-full space-y-4">
          <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
            Every production rollout follows a deterministic, hermetic automated pipeline. Strict linting, parallelized test execution, multi-stage Docker layer caching, automated CVE audits, and atomic Nginx upstream reloads guarantee zero dropped connections for users.
          </p>

          <div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSimulate}
              className="coral-btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{isRunning ? 'Running Simulation...' : 'Simulate Pipeline Run'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Interactive Pipeline Timeline Board with VFX Border Beam */}
      <div className="border-beam-container shadow-2xl">
        <div className="relative rounded-[1.45rem] p-6 sm:p-10 bg-[#0A0D14]/92 backdrop-blur-2xl border border-white/10 overflow-hidden z-10">
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF4D2D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Milestone Steps Cards Grid with active glowing pulse */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10 mb-8">
          {WORKFLOW_MILESTONES.map((item, idx) => {
            const isActive = activeStage === idx;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setActiveStage(idx)}
                className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer group flex items-start justify-between gap-3 relative overflow-hidden ${
                  isActive
                    ? 'bg-[#1E1E28]/95 border-2 border-[#FF4D2D] shadow-[0_0_25px_rgba(255,77,45,0.25)] scale-[1.02]'
                    : 'glass-pill border border-white/10 hover:border-white/20'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4D2D]/10 rounded-full blur-xl pointer-events-none" />
                )}

                <div className="flex items-start gap-3 relative z-10">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 shrink-0 transition-colors ${
                      isActive ? 'bg-[#FF4D2D] shadow-[0_0_12px_#FF4D2D] animate-ping' : 'bg-white/20'
                    }`}
                  />
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors ${isActive ? 'text-[#FF4D2D]' : 'text-white group-hover:text-slate-200'}`}>
                      {item.label}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                      Stage {String(idx + 1).padStart(2, '0')} // Pipeline Step
                    </span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium shrink-0 transition-colors ${
                  isActive ? 'bg-[#FF4D2D]/20 text-[#FF8A65] border border-[#FF4D2D]/40' : 'bg-white/5 text-slate-300 border border-white/10'
                }`}>
                  {item.duration}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Live Interactive Terminal Telemetry HUD */}
        <div className="rounded-2xl bg-[#07090E] border border-white/10 p-5 font-mono text-xs relative z-10 mb-8 overflow-hidden shadow-inner">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-[11px] text-slate-400 ml-2">telemetry-conduit // pipeline_run.sh</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#FF4D2D]/20 text-[#FF4D2D] font-bold">
                {stageLogs[activeStage]?.status}
              </span>
              <span className="text-[10px] text-slate-500">STAGE 0{activeStage + 1} OF 06</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#FF8A65]">
              <span className="text-slate-500">$</span>
              <span>{stageLogs[activeStage]?.cmd}</span>
            </div>
            <div className="flex items-start gap-2 text-slate-300 pl-3 border-l-2 border-[#FF4D2D]/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{stageLogs[activeStage]?.output}</span>
            </div>
          </div>
        </div>

        {/* Bottom Pipeline Summary Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-sans text-xs text-slate-400 relative z-10">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF4D2D]" />
            <span>Mean Pipeline Duration: <strong>~6.0 Minutes End-to-End</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Automated Test Pass Rate: <strong>99.8% Green Gates</strong></span>
          </div>

          <div className="flex items-center gap-2 text-white">
            <CheckCircle2 className="w-4 h-4 text-[#FF4D2D]" />
            <span>Rollout Strategy: <strong>Blue-Green Zero-Downtime Hot Reload</strong></span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
