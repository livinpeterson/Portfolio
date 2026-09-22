import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin, Download } from 'lucide-react';

export const FolioContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    engineeringNeed: 'CI/CD Pipeline Automation',
    cloudPlatform: 'AWS / DigitalOcean Droplets',
    timeline: 'Immediate (< 1 week)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="rounded-3xl glass-card p-6 sm:p-12 lg:p-16 border border-white/10 relative overflow-hidden">
        {/* Subtle orange accent glow behind */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D2D]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8">
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tighter leading-[0.95]">
              READY TO <br />
              OPTIMIZE <br />
              <span className="text-[#FF4D2D]">&amp; SCALE YOUR</span> <br />
              INFRASTRUCTURE?
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pt-4 space-y-4">
            <div className="p-5 rounded-2xl glass-pill border border-white/10 space-y-2">
              <span className="font-mono text-xs font-bold text-[#FF4D2D] tracking-wider block">
                TECHNICAL CONSULTATION &amp; HIRING
              </span>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect with Livingston Peter directly for DevOps architecture, automated CI/CD pipelines, zero-downtime cutovers, or full-time roles.
              </p>
            </div>

            <div className="flex flex-col gap-2 font-mono text-xs text-slate-300">
              <a
                href="mailto:livinmannaanalytics@gmail.com"
                className="flex items-center gap-2 hover:text-[#FF4D2D] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF4D2D]" />
                <span>livinmannaanalytics@gmail.com</span>
              </a>
              <a
                href="tel:+919361664184"
                className="flex items-center gap-2 hover:text-[#FF4D2D] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF4D2D]" />
                <span>+91 9361664184</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#FF4D2D]" />
                <span>Chennai, India (Remote Worldwide)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Body */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-2xl bg-[#1E1E28]/80 border border-emerald-500/30 text-center space-y-4"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="font-display font-bold text-2xl text-white">
              Consultation Request Logged Successfully
            </h3>
            <p className="font-sans text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name || 'Engineer'}! Livingston has received your request regarding <strong>{formData.engineeringNeed}</strong>. You will receive a direct reply at <strong>{formData.email}</strong> within 12–24 business hours.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <a
                href={`mailto:livinmannaanalytics@gmail.com?subject=DevOps%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message || 'Hi Livingston, I would like to discuss infrastructure optimization.')}`}
                className="coral-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                <span>Send Direct Email Copy</span>
                <Mail className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-3 rounded-full glass-pill text-xs text-slate-300 hover:text-white"
              >
                Submit Another Request
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
              {/* Field 1: Name */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-mono text-slate-300 block">
                  YOUR NAME / ORGANIZATION*
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Morgan"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1E1E28]/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
                />
              </div>

              {/* Field 2: Email */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-mono text-slate-300 block">
                  WORK EMAIL*
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1E1E28]/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
                />
              </div>

              {/* Field 3: Phone */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-mono text-slate-300 block">
                  PHONE / WHATSAPP (OPTIONAL)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1E1E28]/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
                />
              </div>

              {/* Field 4: Primary Need */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-mono text-slate-300 block">
                  PRIMARY INFRASTRUCTURE FOCUS
                </label>
                <select
                  value={formData.engineeringNeed}
                  onChange={(e) => setFormData({ ...formData, engineeringNeed: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1E1E28]/90 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors cursor-pointer"
                >
                  <option value="CI/CD Pipeline Automation">CI/CD Pipeline Automation (GitHub Actions / Jenkins)</option>
                  <option value="Docker & Container Orchestration">Docker &amp; Container Orchestration</option>
                  <option value="Linux Server Hardening & Zero-Downtime Cutover">Linux Server Hardening &amp; Zero-Downtime Cutover</option>
                  <option value="PostgreSQL Schema Migrations & Storage">PostgreSQL Schema Migrations &amp; Storage</option>
                  <option value="Observability (Prometheus, Grafana, Alerting)">Observability (Prometheus, Grafana, Alerting)</option>
                  <option value="Full-Time / Contract DevOps Role">Full-Time / Contract DevOps Role</option>
                </select>
              </div>

              {/* Field 5: Cloud Hosting */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-mono text-slate-300 block">
                  CURRENT CLOUD / HOSTING PLATFORM
                </label>
                <select
                  value={formData.cloudPlatform}
                  onChange={(e) => setFormData({ ...formData, cloudPlatform: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1E1E28]/90 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors cursor-pointer"
                >
                  <option value="AWS (EC2 / ECS / S3)">AWS (EC2 / ECS / S3)</option>
                  <option value="DigitalOcean Droplets / App Platform">DigitalOcean Droplets / App Platform</option>
                  <option value="Bare Metal / Dedicated Ubuntu Servers">Bare Metal / Dedicated Ubuntu Servers</option>
                  <option value="Google Cloud Platform (GCP)">Google Cloud Platform (GCP)</option>
                  <option value="Hybrid / On-Premise">Hybrid / On-Premise</option>
                  <option value="Other / Evaluating Migration">Other / Evaluating Migration</option>
                </select>
              </div>

              {/* Field 6: Timeline */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-mono text-slate-300 block">
                  TARGET TIMELINE
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1E1E28]/90 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors cursor-pointer"
                >
                  <option value="Immediate (< 1 week)">Immediate (&lt; 1 week)</option>
                  <option value="2-4 Weeks">2–4 Weeks</option>
                  <option value="1-3 Months">1–3 Months</option>
                  <option value="Exploring Options">Exploring Options</option>
                </select>
              </div>
            </div>

            {/* Field 7: Message Details */}
            <div className="space-y-2 font-sans">
              <label className="text-xs uppercase tracking-wider font-mono text-slate-300 block">
                INFRASTRUCTURE CONTEXT / GOALS
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your current tech stack, pain points with slow builds or server downtime, or the role you are hiring for..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#1E1E28]/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#FF4D2D] transition-colors"
              />
            </div>

            {/* Submit Button & CV download */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="coral-btn inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider font-sans group cursor-pointer"
              >
                <span>Submit Technical Request</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>

              <a
                href="/Livingston_Peter_DevOps_Resume.doc"
                download="Livingston_Peter_DevOps_Resume.doc"
                className="glass-pill inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs font-semibold font-sans text-slate-200 hover:text-white hover:border-white/25 transition-all"
              >
                <Download className="w-4 h-4 text-[#FF4D2D]" />
                <span>Download Resume (.doc)</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
