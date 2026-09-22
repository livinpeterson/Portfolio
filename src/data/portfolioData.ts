import { PipelineNode, IncidentCase, SkillCategory, ExperienceItem, ProjectDeployment, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: "Livingston Peter",
  title: "DevOps Engineer & Infrastructure Specialist",
  tagline: "Engineering bulletproof releases, hardened Linux architectures, and zero-downtime distributed systems.",
  location: "Nagercoil, Tamil Nadu, India",
  email: "livinpeterson@gmail.com",
  phone: "+91 88707 24190",
  linkedin: "https://www.linkedin.com/in/livingston-peter-58593916b",
  currentRole: "DevOps Engineer @ Manna Analytics",
  status: "Open to Opportunities (Full-time / Remote / On-site)"
};

export const PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'dev',
    name: 'Developer Workspace',
    subtitle: 'Feature Branch & Local Triage',
    role: 'Local container parity, linting, unit verification',
    stageNumber: '01',
    tag: 'git push origin main',
    color: 'from-amber-400 to-yellow-500',
    configTitle: 'Local Dev Environment (.env & Docker compose)',
    configSnippet: `# docker-compose.dev.yml
services:
  app:
    build:
      context: .
      target: dev
    volumes:
      - .:/usr/src/app
    ports:
      - "8000:8000"
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.dev
      - DB_HOST=postgres_replica`,
    telemetry: {
      health: '100%',
      latency: '1.2ms',
      load: '14%',
      status: 'OPTIMAL'
    }
  },
  {
    id: 'git',
    name: 'Git Version Control',
    subtitle: 'Branch Protection & PR Gate',
    role: 'Webhook dispatch, semantic versioning, audit trail',
    stageNumber: '02',
    tag: 'Automated Webhook',
    color: 'from-yellow-500 to-amber-600',
    configTitle: 'GitHub Branch Protection & Hooks',
    configSnippet: `# .github/branch-rules.json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["lint", "unit-test", "security-audit"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1
  }
}`,
    telemetry: {
      health: '99.99%',
      latency: '34ms',
      load: '22%',
      status: 'SYNCHRONIZED'
    }
  },
  {
    id: 'ci',
    name: 'GitHub Actions Engine',
    subtitle: 'Continuous Integration Matrix',
    role: 'Multi-stage test suite, security scanning, artifact bundling',
    stageNumber: '03',
    tag: 'Automated CI/CD',
    color: 'from-amber-300 to-yellow-400',
    configTitle: 'GitHub Actions Workflow (.github/workflows/deploy.yml)',
    configSnippet: `name: Production Zero-Downtime Deployment
on:
  push:
    branches: [main]
jobs:
  test_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker Container
        run: docker build -t registry.manna.internal/app:\${{ github.sha }} .
      - name: Run Test Suite
        run: docker run --rm registry.manna.internal/app:\${{ github.sha }} pytest
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: \${{ secrets.PROD_HOST }}
          key: \${{ secrets.DEPLOY_SSH_KEY }}
          script: |
            docker pull registry.manna.internal/app:\${{ github.sha }}
            docker-compose up -d --no-deps --build app`,
    telemetry: {
      health: '100%',
      latency: '2m 14s',
      load: '18%',
      status: 'ACTIVE'
    }
  },
  {
    id: 'docker',
    name: 'Docker Engine & OCI',
    subtitle: 'Container Isolation & Parity',
    role: 'Deterministic runtime, memory limits, non-root user execution',
    stageNumber: '04',
    tag: 'Image Registry',
    color: 'from-yellow-400 to-amber-500',
    configTitle: 'Production Multi-Stage Dockerfile',
    configSnippet: `FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.11-slim as runner
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
USER 1001:1001
EXPOSE 8000
CMD ["gunicorn", "--workers=4", "--bind=0.0.0.0:8000", "core.wsgi:application"]`,
    telemetry: {
      health: '99.98%',
      latency: '2.1ms',
      load: '42%',
      status: 'OPTIMAL'
    }
  },
  {
    id: 'nginx',
    name: 'Nginx Reverse Proxy',
    subtitle: 'TLS 1.3 Termination & Routing',
    role: 'SSL offloading, rate limiting, zero-downtime hot reloads',
    stageNumber: '05',
    tag: 'Upstream Proxy',
    color: 'from-amber-200 to-yellow-500',
    configTitle: 'Nginx Production Virtual Host (/etc/nginx/conf.d/app.conf)',
    configSnippet: `upstream app_cluster {
    server 127.0.0.1:8001 weight=5;
    server 127.0.0.1:8002 weight=5 backup;
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name mannaanalytics.com;
    ssl_certificate /etc/letsencrypt/live/mannaanalytics.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mannaanalytics.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://app_cluster;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout http_502;
    }
}`,
    telemetry: {
      health: '100%',
      latency: '0.8ms',
      load: '12%',
      status: 'OPTIMAL'
    }
  },
  {
    id: 'app',
    name: 'Live Cluster Microservices',
    subtitle: 'High-Availability Service Mesh',
    role: 'Scalable workers, health probes, Prometheus metrics exporter',
    stageNumber: '06',
    tag: 'Zero-Downtime Live',
    color: 'from-amber-400 to-yellow-300',
    configTitle: 'Prometheus Exporter & Health Probe Config',
    configSnippet: `GET /health/ready HTTP/1.1
HTTP/2 200 OK
Content-Type: application/json

{
  "status": "HEALTHY",
  "database": "CONNECTED",
  "redis_cache": "READY",
  "uptime_seconds": 1548293,
  "active_workers": 8
}`,
    telemetry: {
      health: '100%',
      latency: '3.4ms',
      load: '38%',
      status: 'ACTIVE'
    }
  },
  {
    id: 'db',
    name: 'PostgreSQL Database Engine',
    subtitle: 'High-Integrity Persistence & Replicas',
    role: 'Stored procedures, connection pooling, ACID transaction isolation',
    stageNumber: '07',
    tag: 'Relational Core',
    color: 'from-yellow-500 to-amber-700',
    configTitle: 'PostgreSQL High-Performance Tuning (postgresql.conf)',
    configSnippet: `-- Optimized Connection Pooling & Stored Procedure Execution
ALTER SYSTEM SET shared_buffers = '4GB';
ALTER SYSTEM SET effective_cache_size = '12GB';
ALTER SYSTEM SET work_mem = '64MB';
ALTER SYSTEM SET maintenance_work_mem = '512MB';
ALTER SYSTEM SET max_connections = '200';
SELECT pg_reload_conf();`,
    telemetry: {
      health: '100%',
      latency: '0.6ms',
      load: '27%',
      status: 'OPTIMAL'
    }
  }
];

export const INCIDENT_CASES: IncidentCase[] = [
  {
    id: 'sev1-db-stored-proc',
    severity: 'SEV-1 CRITICAL',
    severityColor: 'text-red-400 border-red-500/40 bg-red-950/40',
    title: 'PostgreSQL Stored Function Production Outage',
    system: 'MannaERP Transactional & Reporting Layer',
    timestamp: 'Production Cutover Incident #01',
    impactDuration: '14 minutes (zero data corruption)',
    trigger: 'Application endpoints returning HTTP 500 across critical checkout and billing routes immediately after an ORM release.',
    symptoms: [
      'Gunicorn workers returning 500 Internal Server Error on /api/v2/orders/commit',
      'Database connection count spiking to 180 / 200 threshold within 90 seconds',
      'PostgreSQL log: function fn_reconcile_orders(uuid, numeric, text) does not exist with specified parameter signature'
    ],
    terminalLogs: [
      '2024-08-14 14:02:11 [ERROR] django.request: Internal Server Error: /api/v2/orders/commit',
      '2024-08-14 14:02:12 [CRITICAL] psycopg2.errors.UndefinedFunction: function fn_reconcile_orders(uuid, numeric, text) does not exist',
      'HINT: No function matches the given name and argument types. You might need to add explicit type casts.',
      '2024-08-14 14:03:04 [ALERT] PagerDuty Triggered: API 5xx rate > 25% on cluster::manna-prod'
    ],
    rca: 'A new backend pull request modified the ORM payload data format, calling a stored function with an extra optional audit token. The existing PostgreSQL stored function signature had not been updated on production, creating an immediate schema-level signature mismatch.',
    remediation: 'Avoided a catastrophic service-wide restart or migration rollback. Authored and executed an idempotent CREATE OR REPLACE FUNCTION script in PostgreSQL on the live cluster, maintaining backward-compatible function overloading for both legacy and new client signatures.',
    hotfixSnippet: `-- Hot replacement of stored procedure without service disruption
CREATE OR REPLACE FUNCTION public.fn_reconcile_orders(
    p_order_id UUID,
    p_amount NUMERIC,
    p_audit_token TEXT DEFAULT 'SYSTEM'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Atomic reconciliation logic with signature fallback
    UPDATE orders SET status = 'CONFIRMED', reconciled_at = NOW(), audit_token = p_audit_token
    WHERE id = p_order_id;
    RETURN jsonb_build_object('success', true, 'order_id', p_order_id);
END;
$$;`,
    preventionMeasure: 'Introduced automated pre-deployment schema verification tests in CI/CD pipeline ensuring all Django migrations match PostgreSQL function signatures prior to container promotion.'
  },
  {
    id: 'sev2-docker-port-cors',
    severity: 'SEV-2 HIGH',
    severityColor: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
    title: 'Silent Docker Container Port Collision & CORS Lockout',
    system: 'Production Web App Service & Nginx Proxy Gateway',
    timestamp: 'Post-Deployment Incident #02',
    impactDuration: '8 minutes MTTR',
    trigger: 'Users blocked from logging into production dashboard post-deployment due to failed preflight OPTIONS requests and stale container port hijacking.',
    symptoms: [
      'Frontend clients reporting: Access to XMLHttpRequest blocked by CORS policy: No Access-Control-Allow-Origin header',
      'Docker container healthcheck reporting healthy, but traffic terminating on orphaned container process',
      'Nginx logs showing HTTP 502 Bad Gateway intermittently when balancing requests'
    ],
    terminalLogs: [
      '2025-01-20 09:15:32 [WARN] nginx: [error] 1422#1422: *89 connect() failed (111: Connection refused) while connecting to upstream',
      '2025-01-20 09:16:01 [WARN] docker ps: Container manna-app-prod_v1 (unhealthy, port 8000 still bound to ghost daemon)',
      '2025-01-20 09:17:10 [ALERT] CORS Preflight rejected from client origin: https://app.mannaanalytics.com'
    ],
    rca: 'During a release deployment, an orphaned container process from a previous build failed to release host socket 8000 due to an unhandled SIGTERM in the entrypoint script. The new container bound to a fallback internal port, causing Nginx upstream to route preflight requests to an unresponsive backend.',
    remediation: 'Spawned the verified production image on an isolated secondary port (8002), executed a surgical Nginx upstream hot-swap (`nginx -s reload`) without terminating in-flight connections, and cleanly purged the zombie socket.',
    hotfixSnippet: `# Triage & Zero-Downtime Cutover Script
docker run -d --name manna-app-isolated -p 127.0.0.1:8002:8000 \\
  --network manna-net --env-file /etc/manna/.env.prod \\
  registry.manna.internal/app:v2.4.1

# Verify isolated container health
curl -I http://127.0.0.1:8002/health/ready

# Hot reload Nginx reverse proxy configuration
sed -i 's/8001/8002/g' /etc/nginx/conf.d/upstream.conf
nginx -t && nginx -s reload`,
    preventionMeasure: 'Enforced dumb-init in Dockerfiles for proper PID 1 signal forwarding (SIGTERM / SIGINT) and added blue/green automated socket cleanup scripts.'
  },
  {
    id: 'sev3-cicd-recovery',
    severity: 'SEV-3 MEDIUM',
    severityColor: 'text-yellow-300 border-yellow-500/40 bg-yellow-950/40',
    title: 'Stalled CI/CD Build Cluster & Deployment Lockout',
    system: 'GitHub Actions Self-Hosted Runner Infrastructure',
    timestamp: 'Infrastructure Recovery #03',
    impactDuration: 'Zero customer downtime; manual deployment friction eliminated',
    trigger: 'Engineering teams forced to perform manual SSH uploads because automated push-to-deploy pipeline had silently failed for over 30 days prior.',
    symptoms: [
      'GitHub Actions runner queue timing out after 6 hours on Docker build stage',
      'Dangling overlay2 storage consuming 98% of VPS root volume',
      'Engineering productivity halted; lack of Slack/Jira failure alerting'
    ],
    terminalLogs: [
      '2025-05-02 11:20:00 [ERROR] actions/runner: System.IO.IOException: No space left on device',
      '2025-05-02 11:21:40 [DEBUG] df -h /dev/vda1: 99% used (58G / 60G consumed by dangling docker layers)',
      '2025-05-02 11:22:15 [NOTICE] Restoring automated lifecycle and Slack notifications...'
    ],
    rca: 'Missing automated Docker prune cron jobs and untagged intermediate layer accumulation on the host runner led to storage exhaustion, while runner configuration lacked webhook alerts to notify the team of silent build failures.',
    remediation: 'Reconstructed the GitHub Actions workflow YAML with deterministic caching, implemented a nightly system maintenance cron job for Docker layer cleanup, and configured Slack incoming webhook integrations for instant build telemetry.',
    hotfixSnippet: `# Nightly Infrastructure Hygiene & Docker Prune
# /etc/cron.daily/docker-clean
#!/bin/bash
docker system prune -af --filter "until=72h" --volumes
docker image prune -a --force --filter "until=168h"

# Workflow Slack Notification Trigger
- name: Notify Slack on Failure
  if: failure()
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: \${{ secrets.SLACK_OPS_WEBHOOK }}
    SLACK_COLOR: '#dc2626'
    SLACK_TITLE: 'Deployment Failed - Action Required'`,
    preventionMeasure: 'Established disk space monitoring in Prometheus with alert threshold at 80% usage and automated Slack notifications.'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'cicd',
    title: 'DevOps & CI/CD Pipelines',
    tagline: 'Automating release lifecycles with zero friction and reproducible builds',
    skills: [
      { name: 'Docker Containerization', level: 'Production Master', highlight: 'Multi-stage builds, non-root runtimes, OCI compliance' },
      { name: 'GitHub Actions CI/CD', level: 'Advanced', highlight: 'Automated push-to-deploy, testing gates, SSH actions' },
      { name: 'Zero-Downtime Releases', level: 'Production Tested', highlight: 'Blue-green cutovers, graceful connection draining' },
      { name: 'Container Troubleshooting', level: 'Expert', highlight: 'Socket collisions, PID 1 signal propagation, memory profiling' },
      { name: 'Git & GitHub Workflows', level: 'Advanced', highlight: 'Branch rules, semantic PR automation, rebase hygiene' },
      { name: 'Linux Server Administration', level: 'High Command', highlight: 'Ubuntu/Debian, systemd services, SSH hardening' }
    ]
  },
  {
    id: 'observability',
    title: 'Monitoring & Observability',
    tagline: 'Deep telemetry across distributed nodes before users ever experience latency',
    skills: [
      { name: 'Prometheus', level: 'Production Lead', highlight: 'Metrics scraping, custom node exporters, PromQL queries' },
      { name: 'Grafana Dashboards', level: 'Advanced', highlight: 'Live cluster visualization, uptime KPIs, error budget tracking' },
      { name: 'Alertmanager', level: 'Production Tested', highlight: 'Alert routing, deduplication, Slack/Jira escalation' },
      { name: 'Incident Response & RCA', level: 'Battle Proven', highlight: 'Forensic log inspection, root-cause isolation, post-mortems' },
      { name: 'Log Analysis & Triage', level: 'Expert', highlight: 'Journalctl, Nginx access logs, Docker logs aggregation' },
      { name: 'SLO / SLA Tracking', level: 'Proficient', highlight: 'Availability calculation, error rate anomaly detection' }
    ]
  },
  {
    id: 'networking',
    title: 'Networking & Web Servers',
    tagline: 'Hardened edge routing, SSL/TLS termination, and reverse-proxy architectures',
    skills: [
      { name: 'Nginx Reverse Proxy', level: 'Production Master', highlight: 'Upstream load balancing, caching headers, microservice routing' },
      { name: 'SSL / TLS Termination', level: 'Expert', highlight: 'Let’s Encrypt auto-renewal, TLS 1.3 hardening, cipher suites' },
      { name: 'DNS & Cloudflare', level: 'Advanced', highlight: 'Zero-downtime DNS cutovers, proxy rules, DDoS mitigation' },
      { name: 'HTTP/HTTPS Protocols', level: 'In-Depth', highlight: 'HTTP/2 multiplexing, CORS headers, status code diagnostics' },
      { name: 'Bash & Shell Scripting', level: 'Advanced', highlight: 'Automated backup scripts, cron jobs, server bootstrap' },
      { name: 'Firewalls & Security', level: 'Hardened', highlight: 'UFW, fail2ban, iptables port restriction' }
    ]
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    tagline: 'Deep relational mastery from database engineering roots to scale',
    skills: [
      { name: 'PostgreSQL', level: 'Deep Mastery', highlight: 'Stored procedures, complex plpgsql functions, indexing' },
      { name: 'MySQL', level: 'Advanced', highlight: 'Schema normalization, query optimization, engine tuning' },
      { name: 'Database Migration Pipelines', level: 'Production Proven', highlight: 'Zero data loss ETL, shadow tables, data deduplication' },
      { name: 'Query Optimization', level: 'Expert', highlight: 'EXPLAIN ANALYZE, indexing strategies, join tuning' },
      { name: 'Data Integrity & Audits', level: 'High Rigor', highlight: 'Referential integrity, automated multi-sheet audit reports' },
      { name: 'Backup & Recovery', level: 'Battle Ready', highlight: 'pg_dump, point-in-time recovery, automated S3 replication' }
    ]
  },
  {
    id: 'backend',
    title: 'Automation & Backend Engineering',
    tagline: 'End-to-end perspective: from database queries to API controllers and infrastructure',
    skills: [
      { name: 'Python Automation', level: 'Production Daily', highlight: 'ETL pipelines, server maintenance, REST API automation' },
      { name: 'Django REST Framework', level: 'Advanced', highlight: 'Enterprise APIs, authentication, serialization, ORM tuning' },
      { name: 'Node.js & Express', level: 'Proficient', highlight: 'Event-driven services, microservice backends' },
      { name: 'Postman API Testing', level: 'Expert', highlight: 'Automated test suites, pre-release contract verification' },
      { name: 'OOP Architecture', level: 'Solid Foundation', highlight: 'Clean code principles, scalable service abstraction' },
      { name: 'React.js & Frontend', level: 'Full Stack Savvy', highlight: 'Client integration, debugging frontend network handshakes' }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud-Native & Active Expansion',
    tagline: 'Continuous evolution into scalable cloud orchestration and Infrastructure as Code',
    skills: [
      { name: 'AWS Cloud Fundamentals', level: 'In Progress / Active', highlight: 'EC2, S3, RDS, IAM security policies, VPC' },
      { name: 'AWS ECS & Fargate', level: 'Practical Focus', highlight: 'Serverless container task definitions, service scaling' },
      { name: 'CloudWatch', level: 'Competent', highlight: 'Metric filters, alarm thresholds, log groups' },
      { name: 'Kubernetes (K8s)', level: 'Actively Scaling', highlight: 'Pod lifecycle, Deployments, Services, ConfigMaps' },
      { name: 'Terraform (IaC)', level: 'Foundation Ready', highlight: 'Declarative infrastructure, state management' },
      { name: 'Microservices Architecture', level: 'Applied Daily', highlight: 'Service decoupling, independent container lifecycles' }
    ]
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'manna-devops',
    role: 'DevOps Engineer',
    company: 'Manna Analytics Private Limited',
    period: 'May 2025 — Present',
    location: 'Nagercoil, Tamil Nadu, India',
    type: 'Full-time, On-site',
    summary: 'Lead production DevOps operations, CI/CD pipeline automation, and high-availability Linux infrastructure across customer-facing and internal ERP microservices.',
    highlights: [
      'Designed and engineered zero-downtime CI/CD pipelines using GitHub Actions, automating testing, container build, and deployment workflows to eliminate manual releases.',
      'Containerized multi-tier backend and frontend applications using Docker, standardizing dev/staging/prod environments and diagnosing tricky container-level port and process collisions.',
      'Architected Nginx reverse-proxy topologies with TLS 1.3 encryption, intelligent upstream balancing, and rate-limiting for high-throughput traffic.',
      'Administered production Linux servers, deploying continuous observability stacks with Prometheus, Grafana, and Alertmanager to detect anomalies before SLA breaches.',
      'Led forensic post-mortems and root-cause analysis (RCA) on production incidents, authoring live hotfixes and preventing system outages.',
      'Collaborated closely across teams using Jira and Slack to establish engineering release gates, reducing deployment lead time from days to minutes.'
    ],
    techStack: ['Linux (Ubuntu)', 'Docker', 'GitHub Actions', 'Nginx', 'Prometheus', 'Grafana', 'Alertmanager', 'Python', 'PostgreSQL', 'Bash']
  },
  {
    id: 'manna-database',
    role: 'Database Engineer',
    company: 'Manna Analytics Private Limited',
    period: 'Jan 2024 — May 2025',
    location: 'Nagercoil, Tamil Nadu, India',
    type: 'Full-time, On-site',
    summary: 'Engineered mission-critical relational database architectures, automated high-volume ETL pipelines, and tuned complex business logic inside PostgreSQL stored procedures.',
    highlights: [
      'Designed and optimized normalized relational database schemas across PostgreSQL and MySQL for enterprise-scale ERP platforms.',
      'Authored complex PostgreSQL stored procedures, plpgsql triggers, and functions powering core billing and order reconciliation calculations.',
      'Integrated backend API services built with Django REST Framework, writing automated API validation suites in Postman.',
      'Built a robust Python data migration pipeline processing thousands of legacy spreadsheet records into production PostgreSQL schemas with zero data loss.',
      'Formulated automated 5-sheet color-coded Excel audit reports to give business stakeholders immediate forensic visibility into database updates.'
    ],
    techStack: ['PostgreSQL', 'MySQL', 'Python', 'Django REST Framework', 'Stored Procedures', 'Postman', 'ETL Pipelines', 'Excel Automation']
  },
  {
    id: 'entegation',
    role: 'Full Stack Engineer',
    company: 'Entegation Technologies LLC',
    period: 'May 2023 — Jan 2024',
    location: 'United States',
    type: 'Freelance, Remote',
    summary: 'Delivered full-stack web applications and robust cloud backend services for US-based clients, emphasizing backend data layers, API design, and Linux deployments.',
    highlights: [
      'Designed and consumed high-performance RESTful APIs, implementing server-side business logic and managing relational PostgreSQL/MySQL data stores.',
      'Deployed applications directly to Linux-based cloud virtual private servers, establishing Git-based deployment workflows across the release cycle.',
      'Engineered full-stack features utilizing Node.js, React.js, Angular, Laravel, and PHP with strong emphasis on backend architecture and data sanitization.'
    ],
    techStack: ['Linux VPS', 'Node.js', 'React.js', 'Angular', 'PostgreSQL', 'MySQL', 'Git', 'Laravel', 'REST APIs']
  },
  {
    id: 'mashupstack',
    role: 'Full-stack Developer Intern',
    company: 'MashupStack',
    period: 'Jan 2022 — Feb 2023',
    location: 'On-site',
    type: 'Internship',
    summary: 'Intensive immersion in full-stack architecture, object-oriented design patterns, backend API development, and software development methodologies.',
    highlights: [
      'Acquired deep backend expertise in Django REST Framework, Laravel, and OOP design patterns alongside frontend work in React.js and Angular.',
      'Participated in structured agile ceremonies, Git version control best practices, code reviews, and Linux command-line operations.'
    ],
    techStack: ['Django REST Framework', 'Laravel', 'React.js', 'Angular', 'MySQL', 'Git', 'Linux Basics']
  }
];

export const PROJECT_DEPLOYMENTS: ProjectDeployment[] = [
  {
    id: 'manna-migration',
    title: 'mannaanalytics.com Zero-Downtime Server Migration',
    subtitle: 'End-to-End VPS Infrastructure Migration with TLS 1.3 & Cloudflare Cutover',
    tags: ['Docker', 'Nginx', 'GitHub Actions', 'Cloudflare DNS', 'Linux VPS', 'TLS 1.3'],
    description: 'Spearheaded the complete production migration off a legacy server to a modern, high-performance Linux VPS. Containerized the entire microservice ecosystem, re-architected Nginx reverse-proxy routing, and executed a seamless DNS cutover via Cloudflare with 0 seconds of user-facing downtime.',
    architectureDetails: [
      'Containerized all application components into lightweight, reproducible Docker images with multi-stage caching.',
      'Engineered dual-upstream Nginx proxy configurations allowing live traffic switching without terminating active HTTP/2 connections.',
      'Secured endpoints with automated Let’s Encrypt certificate renewals and TLS 1.3 cipher hardening.',
      'Orchestrated automated push-to-deploy workflows via GitHub Actions so future merges trigger seamless rolling updates.'
    ],
    keyMetrics: [
      { label: 'User Downtime', value: '0 Minutes' },
      { label: 'Data Loss', value: '0%' },
      { label: 'TLS Protocol', value: 'TLS 1.3' },
      { label: 'Release Time', value: '-85% Lead Time' }
    ],
    verdict: 'Resulted in 100% automated release velocity, eliminating manual server building and ensuring uninterrupted business continuity.'
  },
  {
    id: 'ikids-erp-pipeline',
    title: 'i-kids ERP Automated Data Migration & Audit Pipeline',
    subtitle: 'High-Fidelity Python Pipeline with Shadow-Table Conflict Resolution',
    tags: ['Python', 'PostgreSQL', 'Data Integrity', 'Referential Integrity', 'Automated Auditing'],
    description: 'Designed and deployed a multi-phase Python migration engine to ingest complex, unstructured subscription order records from legacy business spreadsheets into a live PostgreSQL production schema with strict relational constraints.',
    architectureDetails: [
      'Implemented shadow-table staging logic to detect duplicate records and schema collisions before modifying live tables.',
      'Maintained strict ACID referential integrity across relational entities, handling orphaned keys gracefully.',
      'Generated an automated 5-sheet color-coded audit spreadsheet verifying row counts, field checksums, and update timestamps.',
      'Cut processing time down from weeks of human copy-paste errors to an autonomous 4-minute verified execution.'
    ],
    keyMetrics: [
      { label: 'Processed Rows', value: 'Thousands' },
      { label: 'Integrity Rate', value: '100.0%' },
      { label: 'Execution Time', value: '4 Minutes' },
      { label: 'Audit Sheets', value: '5 Sheets' }
    ],
    verdict: 'Completely eliminated data entry errors and provided stakeholders with bulletproof forensic proof of data accuracy.'
  },
  {
    id: 'cicd-automation-recovery',
    title: 'Automated CI/CD Pipeline Restoration & Deployment Engine',
    subtitle: 'Restoring Stalled Automated Pipelines & Introducing Real-Time Observability',
    tags: ['GitHub Actions', 'Docker', 'Automation', 'DevOps', 'Slack Webhooks', 'Prometheus'],
    description: 'Diagnosed and rescued a mission-critical CI/CD deployment pipeline that had stalled for over a month. Resolved container runner port collisions, optimized disk cache management, and re-established automated Git push-to-deploy for engineering teams.',
    architectureDetails: [
      'Cleaned up orphaned runner volumes and instituted automated host maintenance cron jobs to prevent disk exhaustion.',
      'Rebuilt GitHub Actions YAML workflows with linting, multi-stage testing, and automated deployment handoffs.',
      'Integrated real-time Slack incoming webhooks for instant build alerts on pipeline pass/fail status.',
      'Configured Prometheus node-exporter metrics to track server health and build resource consumption.'
    ],
    keyMetrics: [
      { label: 'Stall Duration', value: '30+ Days Solved' },
      { label: 'Deploy Speed', value: '<3 Minutes' },
      { label: 'Alerting', value: 'Instant Slack' },
      { label: 'Manual Effort', value: '0 Manual Steps' }
    ],
    verdict: 'Restored automated deployment confidence across the engineering organization and shortened release cycles dramatically.'
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering in Computer Science and Engineering',
    institution: 'Fatima Michael College of Engineering and Technology',
    period: '2017 — 2021',
    location: 'Madurai, Tamil Nadu, India',
    description: 'Rigorous engineering curriculum providing foundational mastery in operating systems, computer networking, relational database management, data structures, and computer architecture.',
    coursework: [
      'Operating Systems & Kernel Concepts',
      'Computer Networks & Protocols (TCP/IP, UDP, DNS)',
      'Database Management Systems (DBMS) & SQL',
      'Data Structures and Algorithms',
      'Object-Oriented Software Engineering',
      'Network Security & Cryptography'
    ]
  },
  {
    degree: 'Full Stack Development Professional Certification',
    institution: 'MashupStack',
    period: 'Issued February 2024',
    location: 'Kerala / Tamil Nadu, India',
    description: 'Comprehensive industry immersion covering end-to-end full stack software engineering, Linux administration, database optimization, and modern CI/CD version control across 38+ specialized technical skills.',
    coursework: [
      'Django REST Framework & Enterprise Python',
      'PostgreSQL & MySQL Advanced Querying',
      'Docker Containerization & Linux Server Administration',
      'Git Version Control & Collaborative GitOps',
      'Modern Web Architectures (React.js, Angular, Node.js)',
      'RESTful API Architecture & Postman Testing'
    ]
  }
];
