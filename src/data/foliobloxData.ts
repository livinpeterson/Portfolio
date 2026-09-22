export interface FolioProject {
  id: string;
  title: string;
  subtitle: string;
  category: 'CI/CD & Containers' | 'Cloud & Linux' | 'Database & Migrations' | 'Observability & Security';
  year: string;
  description: string;
  badge: string;
  image: string;
  techStack: string[];
  metrics: string;
}

export const BRAND_TAGS = [
  { id: '01', label: 'CI/CD Automation' },
  { id: '02', label: 'Docker & Containers' },
  { id: '03', label: 'Linux & Cloud Infra' },
  { id: '04', label: 'Observability & Uptime' },
];

export const TRUSTED_BRANDS = [
  { name: 'Manna Analytics', symbol: '⦿' },
  { name: 'Docker OCI', symbol: '▢' },
  { name: 'GitHub Actions', symbol: '⚡' },
  { name: 'Linux Ubuntu', symbol: '✦' },
  { name: 'PostgreSQL', symbol: '◉' },
  { name: 'Nginx Proxy', symbol: '✕' },
];

export const FOLIO_PROJECTS: FolioProject[] = [
  {
    id: 'zero-downtime-cutover',
    title: 'Zero-Downtime Hot Cutover Engine',
    subtitle: 'HIGH AVAILABILITY // MANNA ANALYTICS',
    category: 'Cloud & Linux',
    year: '2026',
    description: 'Cloudflare edge DNS paired with Nginx reverse proxy connection pooling and automated container hot reloads, achieving zero dropped client connections during peak production releases.',
    badge: 'Zero Downtime',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    techStack: ['Nginx', 'Docker Compose', 'Linux systemd', 'Cloudflare DNS'],
    metrics: '0s downtime / 100% in-flight request preservation',
  },
  {
    id: 'github-cicd-pipeline',
    title: 'Automated Multi-Stage CI/CD Conduit',
    subtitle: 'PIPELINE AUTOMATION // GITHUB ACTIONS',
    category: 'CI/CD & Containers',
    year: '2026',
    description: 'End-to-end continuous integration and delivery pipeline with parallelized unit test execution, security linting, multi-stage Docker layer caching, and automated deployment webhooks.',
    badge: 'CI/CD Pipeline',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1000&q=80',
    techStack: ['GitHub Actions', 'Docker Buildx', 'Bash', 'Pytest / ESLint'],
    metrics: 'Build time reduced from 22m to 3.8m',
  },
  {
    id: 'postgres-shadow-migration',
    title: 'PostgreSQL Schema Migration & Replica Hub',
    subtitle: 'DATABASE RELIABILITY // MIGRATIONS',
    category: 'Database & Migrations',
    year: '2025',
    description: 'High-concurrency PostgreSQL database orchestration featuring automated schema dry-run validations, write-ahead logging replication, transactional rollbacks, and Redis cache invalidation.',
    badge: 'Database Core',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80',
    techStack: ['PostgreSQL 16', 'Redis', 'SQLAlchemy / Alembic', 'WAL-G'],
    metrics: 'Zero data loss across 1.4M transactional records',
  },
  {
    id: 'telemetry-observability-core',
    title: 'Production Observability & Telemetry HUD',
    subtitle: 'MONITORING // PROMETHEUS & GRAFANA',
    category: 'Observability & Security',
    year: '2025',
    description: 'Real-time infrastructure health and latency monitoring stack utilizing Prometheus node-exporters, Loki log ingestion, Grafana live HUD panels, and automated Slack/Pager alerts.',
    badge: 'Observability',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    techStack: ['Prometheus', 'Grafana', 'Alertmanager', 'Loki'],
    metrics: '<15s alert mean-time-to-detect',
  },
  {
    id: 'linux-droplet-hardening',
    title: 'Linux Server Hardening & Edge Security',
    subtitle: 'SECURITY // UBUNTU PRODUCTION',
    category: 'Cloud & Linux',
    year: '2025',
    description: 'Enterprise Linux production hardening blueprint implementing strict SSH ed25519 tunnels, UFW iptables rule sets, automated fail2ban rate-limiting, and unprivileged Docker daemon execution.',
    badge: 'Security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    techStack: ['Ubuntu 24.04 LTS', 'UFW / iptables', 'fail2ban', 'AppArmor'],
    metrics: 'Zero unauthorized breaches / 99.9% brute-force suppression',
  },
  {
    id: 'microservices-mesh-routing',
    title: 'Multi-Service Container Mesh & Nginx Gateway',
    subtitle: 'NETWORKING // DOCKER & REVERSE PROXY',
    category: 'CI/CD & Containers',
    year: '2024',
    description: 'Isolated Docker bridge microservices mesh interconnected through a hardened Nginx reverse proxy gateway with automated SSL/TLS 1.3 certificate rotation, brotli compression, and rate limiting.',
    badge: 'Microservices',
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1000&q=80',
    techStack: ['Docker Network Mesh', 'Nginx', 'Certbot SSL', 'HTTP/2'],
    metrics: 'Sub-18ms p95 gateway response time',
  },
];

export const WORKFLOW_MILESTONES = [
  { label: 'Git Push & Webhook Trigger', duration: '30s', x: '12%', y: '25%' },
  { label: 'Lint & Unit Test Verification', duration: '90s', x: '35%', y: '15%' },
  { label: 'Multi-Stage Docker Image Build', duration: '120s', x: '58%', y: '35%' },
  { label: 'Vulnerability Scan & CVE Audit', duration: '45s', x: '78%', y: '18%' },
  { label: 'Staging Smoke Test & Healthcheck', duration: '60s', x: '28%', y: '65%' },
  { label: 'Atomic Nginx Reload & Live Cutover', duration: '15s', x: '68%', y: '75%' },
];

export const COLOR_PALETTE_ITEMS = [
  {
    name: 'Dark Accent',
    hex: '#1E1E28',
    rgb: '30 30 40',
    opacity: '100%',
    role: 'Used for terminal consoles, server telemetry cards, and log inspectors for layered depth.',
    sampleBg: '#1E1E28',
    border: 'border-white/10'
  },
  {
    name: 'Soft White',
    hex: '#FFFFFF',
    rgb: '255 255 255',
    opacity: '100%',
    role: 'Used for code syntax, terminal output, and primary labels for crisp readability in dark environments.',
    sampleBg: '#FFFFFF',
    border: 'border-white/20'
  },
  {
    name: 'Deep Background',
    hex: '#0A0D14',
    rgb: '10 13 20',
    opacity: '100%',
    role: 'Used as the foundational night-ops base color, minimizing eye strain during extended infrastructure monitoring.',
    sampleBg: '#0A0D14',
    border: 'border-white/10'
  },
];

export const STATS_ITEMS = [
  {
    label: 'PRODUCTION CLUSTER UPTIME',
    value: '99.98%',
    description: 'Verified uptime maintained across production containers, microservices, and Linux server instances.'
  },
  {
    label: 'ZERO-DOWNTIME RELEASES',
    value: '0s',
    description: 'Total user-facing downtime incurred during automated blue-green cutovers and live database migrations.'
  },
  {
    label: 'GATEWAY P95 LATENCY',
    value: '<18ms',
    description: 'Edge reverse proxy round-trip latency achieved with Nginx connection pooling, HTTP/2 multiplexing, and Brotli compression.'
  },
  {
    label: 'AUTOMATED TEST GATES',
    value: '140+',
    description: 'Automated unit, integration, and security checks executed and validated on every single code commit before merging.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Tech Lead',
    role: 'Manna Analytics',
    comment: 'Livingston transformed our deployment workflow. Our release cycles went from 45 minutes of manual SSH commands to an automated 3-minute pipeline with zero downtime. His Linux and Docker expertise is exceptional.'
  },
  {
    name: 'Backend Engineering Lead',
    role: 'Cloud Systems Collaborator',
    comment: 'When we needed to execute a major PostgreSQL database migration across high-throughput production records, Livingston architected the shadow sync without dropping a single query. Completely reliable under pressure.'
  },
  {
    name: 'Product Manager',
    role: 'SaaS Platform Lead',
    comment: 'The observability telemetry and Grafana alerting Livingston instituted detected memory leakage patterns before users ever noticed. He brings real rigor and craftsmanship to DevOps.'
  }
];

export const METHODOLOGY_STEPS = [
  {
    num: '01',
    title: 'Audit & Infrastructure Architecture',
    description: 'Thoroughly analyzing server resource bottlenecks, dependency trees, security attack surfaces, and database performance before implementing automation.'
  },
  {
    num: '02',
    title: 'Containerization & Pipeline Automation',
    description: 'Creating lean, reproducible multi-stage Docker images and configuring high-speed CI/CD runners with caching, automated test gates, and strict branch validation.'
  },
  {
    num: '03',
    title: 'Atomic Deployment & Telemetry',
    description: 'Executing zero-downtime Nginx hot reloads, configuring live healthcheck alarms, and streaming telemetry to Prometheus dashboards for complete operational observability.'
  }
];
