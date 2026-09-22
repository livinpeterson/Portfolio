import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  Send, 
  MessageSquare,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('DevOps Engineering & CI/CD');
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const generateMailto = () => {
    const subject = encodeURIComponent(`[Inquiry] ${selectedTopic} - ${senderName || 'Recruiter/Engineering Lead'}`);
    const body = encodeURIComponent(
      `Hi Livingston,\n\nI came across your DevOps portfolio and would like to discuss ${selectedTopic}.\n\nOrganization: ${senderOrg || 'N/A'}\n\nDetails:\n${senderMessage || 'We have an open engineering role and would love to review your availability for an introductory call.'}\n\nBest regards,\n${senderName || 'Engineering Team'}`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const copyDraft = () => {
    const text = `Hi Livingston,\n\nI would like to discuss ${selectedTopic}.\nOrganization: ${senderOrg || 'N/A'}\nMessage: ${senderMessage || 'Interested in discussing engineering opportunities.'}\n\nContact: ${senderName || 'Team'}`;
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2200);
  };

  return (
    <section id="contact" className="py-24 border-t border-amber-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-2">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>ACT VI // SECURE TRANSMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic font-bold text-white tracking-tight">
            Initiate Contact
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Ready to discuss high-availability infrastructure, automated release pipelines, server migration cutovers, or career opportunities? Connect directly across verified channels.
          </p>
        </div>

        {/* 3 Verified Coordinate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Email Channel */}
          <div className="cinematic-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Primary Secure Email</h3>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-white hover:text-amber-300 font-mono font-bold text-base mt-1.5 block transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
              <p className="text-xs font-mono text-slate-500 mt-1">Direct inbox triage</p>
            </div>

            <button
              id="copy-email-btn"
              onClick={copyEmail}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-500/40 text-xs font-mono text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>

          {/* Card 2: LinkedIn Channel */}
          <div className="cinematic-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[#0077b5] mb-5">
                <Linkedin className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Professional Network</h3>
              <p className="text-white font-mono font-bold text-base mt-1.5">
                Livingston Peter
              </p>
              <p className="text-xs font-mono text-slate-500 mt-1">
                Verified LinkedIn Profile
              </p>
            </div>

            <a
              id="open-linkedin-btn"
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-2.5 rounded-xl bg-[#0077b5]/20 border border-[#0077b5]/40 text-xs font-mono text-cyan-200 hover:text-white flex items-center justify-center gap-2 transition-all hover:bg-[#0077b5]/30"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Direct Phone & Base */}
          <div className="cinematic-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Direct Voice & Base</h3>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="text-white hover:text-emerald-300 font-mono font-bold text-base mt-1.5 block transition-colors"
              >
                {PERSONAL_INFO.phone}
              </a>
              <p className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{PERSONAL_INFO.location}</span>
              </p>
            </div>

            <button
              onClick={copyPhone}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Phone Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-emerald-400" />
                  <span>Copy Phone Number</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Transmission Dispatcher Tool */}
        <div className="cinematic-panel p-6 sm:p-8 rounded-2xl border border-amber-500/25 relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">
                Dispatch Quick Transmission
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-500/30">
              DIRECT DISPATCH
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-400 block mb-1.5 font-semibold">
                  SELECT INQUIRY TOPIC:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'DevOps Engineering & CI/CD',
                    'Zero-Downtime Server Migration',
                    'Production Incident Resolution',
                    'Full-Time / Contract Position'
                  ].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedTopic === topic
                          ? 'bg-amber-500/20 text-amber-200 border-amber-500/60 font-semibold'
                          : 'bg-slate-950/70 text-slate-400 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">YOUR NAME / TITLE:</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins (VP Eng)"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">ORGANIZATION / COMPANY:</label>
                  <input
                    type="text"
                    value={senderOrg}
                    onChange={(e) => setSenderOrg(e.target.value)}
                    placeholder="e.g. Acme Cloud Corp"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">MESSAGE / OPPORTUNITY BRIEF:</label>
                <textarea
                  rows={3}
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Describe your architecture requirements, infrastructure stack, or role details..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={generateMailto()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all font-mono"
                >
                  <Send className="w-4 h-4" />
                  <span>Launch Email Client</span>
                </a>

                <button
                  type="button"
                  onClick={copyDraft}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-white transition-all font-mono"
                >
                  {copiedDraft ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Draft Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-400" />
                      <span>Copy Formatted Brief</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Preview Card (5 cols) */}
            <div className="lg:col-span-5 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-3">
                <div className="text-slate-500 text-[10px] uppercase font-bold border-b border-white/5 pb-2">
                  TRANSMISSION PACKET PREVIEW
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500 block">TO:</span>
                  <span className="text-amber-300">{PERSONAL_INFO.email}</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500 block">TOPIC:</span>
                  <span>{selectedTopic}</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500 block">SENDER:</span>
                  <span>{senderName || '(Unspecified)'} {senderOrg ? `@ ${senderOrg}` : ''}</span>
                </div>
                <div className="text-slate-400 text-[11px] pt-2 border-t border-white/5 italic">
                  "{senderMessage || 'Reviewing your DevOps & production reliability profile.'}"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
