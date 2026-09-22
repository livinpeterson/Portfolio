import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Layers, 
  GitBranch, 
  Database, 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Terminal, 
  Code2, 
  Sliders, 
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

interface StageData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  codeSnippet: { filename: string; code: string };
  highlights: string[];
}

const STAGES: StageData[] = [
  {
    id: 'containers',
    number: '01',
    title: 'Containerization & Linux Kernel',
    subtitle: 'Multi-Stage Docker Architecture & OS Optimization',
    category: 'ISOLATION & PACKAGING',
    description:
      'Engineered lean, hardened Alpine/Debian Docker containers using multi-stage builds. Reduced container footprint by 64%, eliminated port collisions, and enforced non-root runtime permissions across production microservices.',
    tech: ['Docker', 'Multi-Stage', 'Linux / Ubuntu', 'cgroups', 'Bash Automation'],
    metrics: [
      { label: 'Footprint Reduction', value: '-64%' },
      { label: 'Container Startup', value: '< 1.4s' },
      { label: 'Layer Cache Hit', value: '98.2%' }
    ],
    codeSnippet: {
      filename: 'Dockerfile.production',
      code: `# Multi-stage lean production image\nFROM python:3.11-slim AS builder\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --user --no-cache-dir -r requirements.txt\n\nFROM python:3.11-alpine\nWORKDIR /app\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nCOPY --from=builder /root/.local /home/appuser/.local\nCOPY --chown=appuser:appgroup . .\nUSER appuser\nEXPOSE 8000\nCMD ["gunicorn", "--workers=4", "--bind=0.0.0.0:8000", "core.wsgi:application"]`
    },
    highlights: [
      'Layer caching optimization for 3x faster CI build cycles',
      'Strict non-root user execution preventing privilege escalation',
      'Port-mapping collision prevention with isolated bridge networks'
    ]
  },
  {
    id: 'edge',
    number: '02',
    title: 'Edge Routing & Reverse Proxy',
    subtitle: 'Nginx High-Availability & SSL/TLS Termination',
    category: 'TRAFFIC SHAPING & SECURITY',
    description:
      'Configured high-throughput Nginx reverse proxies routing external ingress traffic to Docker services with sub-5ms proxy latency, TLS 1.3 termination, rate-limiting, and Cloudflare DNS zero-downtime cutover.',
    tech: ['Nginx', 'Cloudflare DNS', 'SSL/TLS 1.3', 'HTTP/2', 'UFW Firewall'],
    metrics: [
      { label: 'Proxy Overhead', value: '< 4ms' },
      { label: 'Downtime on Cutover', value: '0.00 min' },
      { label: 'Security Grade', value: 'A+ (SSL Labs)' }
    ],
    codeSnippet: {
      filename: '/etc/nginx/conf.d/manna-prod.conf',
      code: `upstream app_cluster {\n    least_conn;\n    server 127.0.0.1:8001 max_fails=3 fail_timeout=10s;\n    server 127.0.0.1:8002 backup;\n    keepalive 32;\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name mannaanalytics.com;\n    ssl_certificate /etc/letsencrypt/live/manna/fullchain.pem;\n    ssl_protocols TLSv1.2 TLSv1.3;\n\n    location / {\n        proxy_pass http://app_cluster;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n    }\n}`
    },
    highlights: [
      'Least-connections load balancing with instant automated backup failover',
      'Zero-downtime DNS cutover via Cloudflare proxied CNAME records',
      'Micro-caching of static and API response payloads for spike absorption'
    ]
  },
  {
    id: 'cicd',
    number: '03',
    title: 'Continuous Integration & Delivery',
    subtitle: 'Automated GitHub Actions Release Pipelines',
    category: 'AUTOMATION & QUALITY GATES',
    description:
      'Architected end-to-end automated GitHub Actions pipelines triggering on main branch commits. Automates linting, test suite execution, Docker multi-platform builds, secure SSH deployment, and instant Slack incident notifications.',
    tech: ['GitHub Actions', 'Docker Hub / GHCR', 'SSH Deploy Keys', 'Slack Webhooks', 'Pytest'],
    metrics: [
      { label: 'Deploy Cycle', value: '3m 42s' },
      { label: 'Test Gate Pass', value: '100%' },
      { label: 'Manual Steps', value: '0 (Automated)' }
    ],
    codeSnippet: {
      filename: '.github/workflows/deploy.yml',
      code: `name: Production Deploy Pipeline\non:\n  push:\n    branches: [main]\njobs:\n  build-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Run Test Suite\n        run: docker compose -f docker-compose.test.yml run --rm tests\n      - name: Build & Push Docker Image\n        run: |\n          docker build -t manna/api:\${{ github.sha }} .\n          docker push manna/api:\${{ github.sha }}\n      - name: Deploy via SSH Zero-Downtime\n        uses: appleboy/ssh-action@v1.0.3\n        with:\n          host: \${{ secrets.PROD_SERVER_IP }}\n          key: \${{ secrets.DEPLOY_SSH_KEY }}\n          script: /opt/scripts/deploy-hot-swap.sh \${{ github.sha }}`
    },
    highlights: [
      'Automated staging smoke tests before production cutover',
      'Atomic container hot-swap with zero client connection drops',
      'Automatic Slack alert broadcast with git commit SHA and status badge'
    ]
  },
  {
    id: 'database',
    number: '04',
    title: 'Persistent Data & Optimization',
    subtitle: 'PostgreSQL Stored Procedures & Zero-Loss Migration',
    category: 'STORAGE & QUERY ENGINE',
    description:
      'Designed mission-critical relational database architectures, optimized complex SQL queries, and authored high-throughput PL/pgSQL stored procedures. Engineered automated Python migration pipelines with zero data loss.',
    tech: ['PostgreSQL', 'PL/pgSQL', 'MySQL', 'Python ETL', 'Indexing / EXPLAIN'],
    metrics: [
      { label: 'Data Fidelity', value: '100.0%' },
      { label: 'Query Speedup', value: '4.8x' },
      { label: 'Records Migrated', value: '50,000+' }
    ],
    codeSnippet: {
      filename: 'procedures/calculate_billing_cycle.sql',
      code: `CREATE OR REPLACE FUNCTION sp_reconcile_billing(\n    p_account_id UUID,\n    p_cycle_date DATE\n)\nRETURNS TABLE(reconciled_sum NUMERIC, status_code VARCHAR)\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    RETURN QUERY\n    WITH ledger_summary AS (\n        SELECT COALESCE(SUM(amount), 0) AS total\n        FROM financial_entries\n        WHERE account_id = p_account_id\n          AND entry_date <= p_cycle_date\n    )\n    UPDATE billing_accounts\n    SET current_balance = ledger_summary.total,\n        last_reconciled = NOW()\n    FROM ledger_summary\n    WHERE id = p_account_id\n    RETURNING current_balance, 'RECONCILED'::VARCHAR;\nEND;\n$$;`
    },
    highlights: [
      'Engineered multi-sheet automated audit reporting pipeline in Python',
      'Atomic transactions preventing orphaned financial records',
      'Covering B-Tree & GIN index strategy slashing p99 latency by 78%'
    ]
  },
  {
    id: 'observability',
    number: '05',
    title: 'Observability & Incident Shield',
    subtitle: 'Prometheus Telemetry, Grafana & Alertmanager',
    category: 'OBSERVABILITY & SRE',
    description:
      'Continuous metric scraping and proactive incident alerting across system CPU, memory, Docker container health, and Nginx request latencies. Integrated with Alertmanager and Slack for immediate root-cause mitigation.',
    tech: ['Prometheus', 'Grafana', 'Node Exporter', 'cAdvisor', 'Alertmanager'],
    metrics: [
      { label: 'Metric Resolution', value: '10s' },
      { label: 'MTTR (Mean Time to Fix)', value: '< 18m' },
      { label: 'Verified Uptime', value: '99.98%' }
    ],
    codeSnippet: {
      filename: '/etc/prometheus/alert.rules.yml',
      code: `groups:\n  - name: production_infrastructure_alerts\n    rules:\n      - alert: HighHttp5xxRate\n        expr: sum(rate(nginx_http_requests_total{status=~"5.."}[2m])) / sum(rate(nginx_http_requests_total[2m])) * 100 > 2.0\n        for: 1m\n        labels:\n          severity: critical\n        annotations:\n          summary: "Production 5xx rate > 2% on {{ $labels.instance }}"\n\n      - alert: ContainerMemoryExhaustion\n        expr: container_memory_usage_bytes{name=~"manna-.*"} / container_spec_memory_limit_bytes > 0.85\n        for: 2m\n        labels:\n          severity: warning`
    },
    highlights: [
      'Proactive warning thresholds before out-of-memory container terminations',
      'Live Grafana dashboards tracking p95 response time and traffic ingress',
      'Escalation routing to on-call engineering via Slack and Jira'
    ]
  }
];

export const CinematicScrollExperience: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrubValue, setScrubValue] = useState(0); // 0 to 100
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedSnippetTab, setSelectedSnippetTab] = useState<'code' | 'highlights'>('code');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Update active stage whenever scrubValue changes
  useEffect(() => {
    const stageFloat = (scrubValue / 100) * (STAGES.length - 1);
    const index = Math.min(Math.floor(stageFloat + 0.4), STAGES.length - 1);
    setActiveStageIndex(index);
  }, [scrubValue]);

  // Track window scroll to scrub naturally
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the section the user has scrolled
      const totalScrollableDistance = rect.height - windowHeight;
      if (totalScrollableDistance <= 0) return;

      const scrolledDistance = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledDistance / totalScrollableDistance));
      
      setScrubValue(Math.round(progress * 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse Parallax on Canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mousePosRef.current = { x, y };
  };

  // 3D Canvas Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let angleX = 0.3;
    let angleY = 0;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const stage = activeStageIndex;
      const progress = scrubValue / 100;

      // Mouse influence on rotation
      const targetAngleY = autoRotate ? frame * 0.008 : angleY;
      const targetTiltX = mousePosRef.current.y * 0.25 + 0.3;
      const targetTiltY = mousePosRef.current.x * 0.35;

      angleY = targetAngleY + targetTiltY;
      angleX = targetTiltX;

      const centerX = width / 2;
      const centerY = height / 2;
      const baseScale = Math.min(width, height) * 0.36;

      // 3D Projection Helper
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate around X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Perspective
        const fov = 450;
        const distance = fov / (fov + z2);
        return {
          x: centerX + x1 * distance * baseScale,
          y: centerY + y2 * distance * baseScale,
          scale: distance,
          depth: z2
        };
      };

      // Draw Atmospheric Backlight Glow
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        baseScale * 1.5
      );
      if (stage === 0) {
        glowGradient.addColorStop(0, 'rgba(245, 158, 11, 0.18)');
        glowGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.08)');
        glowGradient.addColorStop(1, 'transparent');
      } else if (stage === 1) {
        glowGradient.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
        glowGradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.08)');
        glowGradient.addColorStop(1, 'transparent');
      } else if (stage === 2) {
        glowGradient.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
        glowGradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.09)');
        glowGradient.addColorStop(1, 'transparent');
      } else if (stage === 3) {
        glowGradient.addColorStop(0, 'rgba(234, 179, 8, 0.22)');
        glowGradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
        glowGradient.addColorStop(1, 'transparent');
      } else {
        glowGradient.addColorStop(0, 'rgba(16, 185, 129, 0.22)');
        glowGradient.addColorStop(0.5, 'rgba(234, 179, 8, 0.09)');
        glowGradient.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // STAGE SPECIFIC 3D GEOMETRY
      if (stage === 0) {
        // --- 01: ISOMETRIC CONTAINER CUBE & MEMORY RINGS ---
        // 8 Vertices of a 3D Cube
        const s = 0.65;
        const vertices = [
          [-s, -s, -s],
          [s, -s, -s],
          [s, s, -s],
          [-s, s, -s],
          [-s, -s, s],
          [s, -s, s],
          [s, s, s],
          [-s, s, s]
        ];

        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0], // back face
          [4, 5], [5, 6], [6, 7], [7, 4], // front face
          [0, 4], [1, 5], [2, 6], [3, 7]  // connecting edges
        ];

        const projVerts = vertices.map((v) => project(v[0], v[1], v[2]));

        // Draw Wireframe Edges
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.75)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        edges.forEach(([i, j]) => {
          ctx.moveTo(projVerts[i].x, projVerts[i].y);
          ctx.lineTo(projVerts[j].x, projVerts[j].y);
        });
        ctx.stroke();

        // Draw Internal Container Core (Nested smaller cube)
        const innerS = 0.35;
        const innerVerts = [
          [-innerS, -innerS, -innerS],
          [innerS, -innerS, -innerS],
          [innerS, innerS, -innerS],
          [-innerS, innerS, -innerS],
          [-innerS, -innerS, innerS],
          [innerS, -innerS, innerS],
          [innerS, innerS, innerS],
          [-innerS, innerS, innerS]
        ].map((v) => project(v[0], v[1], v[2]));

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        edges.forEach(([i, j]) => {
          ctx.moveTo(innerVerts[i].x, innerVerts[i].y);
          ctx.lineTo(innerVerts[j].x, innerVerts[j].y);
        });
        ctx.stroke();

        // Glowing Vertex Nodes
        projVerts.forEach((pv, idx) => {
          ctx.beginPath();
          ctx.arc(pv.x, pv.y, 4 * pv.scale, 0, Math.PI * 2);
          ctx.fillStyle = idx % 2 === 0 ? '#fbbf24' : '#38bdf8';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#fbbf24';
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Floating Container Ring
        const ringPoints = 32;
        ctx.beginPath();
        for (let i = 0; i <= ringPoints; i++) {
          const theta = (i / ringPoints) * Math.PI * 2;
          const rx = Math.cos(theta) * 0.95;
          const rz = Math.sin(theta) * 0.95;
          const ry = Math.sin(frame * 0.05 + theta * 2) * 0.08;
          const p = project(rx, ry, rz);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (stage === 1) {
        // --- 02: DUAL RING REVERSE PROXY CONDUIT (NGINX EDGE) ---
        const rings = 3;
        for (let r = 0; r < rings; r++) {
          const radius = 0.5 + r * 0.28;
          const yPos = (r - 1) * 0.35;
          const segments = 36;

          ctx.beginPath();
          for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const p = project(Math.cos(theta) * radius, yPos, Math.sin(theta) * radius);
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = r === 1 ? 'rgba(56, 189, 248, 0.9)' : 'rgba(245, 158, 11, 0.5)';
          ctx.lineWidth = r === 1 ? 2.2 : 1.2;
          ctx.stroke();
        }

        // Connecting Load-Balancing Beams
        const nodeCount = 8;
        for (let i = 0; i < nodeCount; i++) {
          const theta = (i / nodeCount) * Math.PI * 2 + frame * 0.01;
          const topP = project(Math.cos(theta) * 0.5, -0.35, Math.sin(theta) * 0.5);
          const midP = project(Math.cos(theta) * 0.78, 0, Math.sin(theta) * 0.78);
          const botP = project(Math.cos(theta) * 1.06, 0.35, Math.sin(theta) * 1.06);

          ctx.beginPath();
          ctx.moveTo(topP.x, topP.y);
          ctx.lineTo(midP.x, midP.y);
          ctx.lineTo(botP.x, botP.y);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Packet Pulse
          const pulseOffset = (frame * 0.03 + i / nodeCount) % 1;
          const pulseX = topP.x + (botP.x - topP.x) * pulseOffset;
          const pulseY = topP.y + (botP.y - topP.y) * pulseOffset;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#38bdf8';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      } else if (stage === 2) {
        // --- 03: INTERCONNECTED CI/CD LOOP & RUNNER NODES ---
        const pipelineStages = 5;
        const pts: { x: number; y: number; scale: number }[] = [];

        for (let i = 0; i < pipelineStages; i++) {
          const theta = (i / pipelineStages) * Math.PI * 2;
          const radius = 0.8;
          const yWave = Math.sin(frame * 0.04 + i) * 0.15;
          const p = project(Math.cos(theta) * radius, yWave, Math.sin(theta) * radius);
          pts.push(p);
        }

        // Draw orbital pipeline ribbon
        ctx.beginPath();
        pts.forEach((p, i) => {
          const next = pts[(i + 1) % pts.length];
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(next.x, next.y);
        });
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Runner Nodes
        pts.forEach((p, i) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = i === 2 ? '#22c55e' : '#a855f7';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#a855f7';
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        });

        // Fast particle shooting around runner ring
        const speedFrac = (frame * 0.02) % 1;
        const currIdx = Math.floor(speedFrac * pipelineStages);
        const nextIdx = (currIdx + 1) % pipelineStages;
        const subFrac = (speedFrac * pipelineStages) % 1;
        const px = pts[currIdx].x + (pts[nextIdx].x - pts[currIdx].x) * subFrac;
        const py = pts[currIdx].y + (pts[nextIdx].y - pts[currIdx].y) * subFrac;

        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#facc15';
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#facc15';
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (stage === 3) {
        // --- 04: POSTGRESQL CYLINDER & STORAGE DISKS ---
        const disks = 4;
        const diskRadius = 0.72;
        const segments = 32;

        for (let d = 0; d < disks; d++) {
          const y = (d - 1.5) * 0.28;

          ctx.beginPath();
          for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const p = project(Math.cos(theta) * diskRadius, y, Math.sin(theta) * diskRadius);
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = 'rgba(234, 179, 8, 0.75)';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Connect vertical walls between disks
          if (d < disks - 1) {
            const nextY = (d + 1 - 1.5) * 0.28;
            for (let i = 0; i < 6; i++) {
              const theta = (i / 6) * Math.PI * 2;
              const p1 = project(Math.cos(theta) * diskRadius, y, Math.sin(theta) * diskRadius);
              const p2 = project(Math.cos(theta) * diskRadius, nextY, Math.sin(theta) * diskRadius);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = 'rgba(234, 179, 8, 0.25)';
              ctx.stroke();
            }
          }
        }

        // Stored Procedure Query Stream Particles
        const streamCount = 12;
        for (let s = 0; s < streamCount; s++) {
          const frac = (frame * 0.03 + s / streamCount) % 1;
          const y = (frac - 0.5) * 1.2;
          const angle = frac * Math.PI * 4;
          const p = project(Math.cos(angle) * 0.35, y, Math.sin(angle) * 0.35);

          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#38bdf8';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      } else {
        // --- 05: PROMETHEUS / GRAFANA OBSERVABILITY RADAR SPHERE ---
        const sphereLat = 5;
        const sphereLon = 10;
        const r = 0.75;

        // Longitude Rings
        for (let lon = 0; lon < sphereLon; lon++) {
          const phi = (lon / sphereLon) * Math.PI;
          ctx.beginPath();
          for (let lat = 0; lat <= 30; lat++) {
            const theta = (lat / 30) * Math.PI * 2;
            const x = r * Math.sin(theta) * Math.cos(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(theta);
            const p = project(x, y, z);
            if (lat === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Radar Scanning Pulse
        const sweepAngle = frame * 0.04;
        const sweepP1 = project(0, 0, 0);
        const sweepP2 = project(Math.cos(sweepAngle) * 0.9, 0, Math.sin(sweepAngle) * 0.9);

        ctx.beginPath();
        ctx.moveTo(sweepP1.x, sweepP1.y);
        ctx.lineTo(sweepP2.x, sweepP2.y);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.9)';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#10b981';
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Center telemetry core
        ctx.beginPath();
        ctx.arc(sweepP1.x, sweepP1.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeStageIndex, autoRotate, scrubValue]);

  const currentStage = STAGES[activeStageIndex];

  return (
    <section 
      id="cinematic-scrub" 
      ref={sectionRef}
      className="relative min-h-[140vh] bg-[#030712] border-t border-amber-500/20 py-24 select-none"
    >
      {/* Pinned Sticky Stage Showcase Container */}
      <div className="sticky top-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Creative Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-1.5 tracking-wider">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>THE $7,000 ARCHITECTURAL SCRUB SEQUENCE // INTERACTIVE CINEMA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic font-bold text-white tracking-tight">
              Production System Blueprint
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl font-sans">
              Scroll or scrub through Livingston&apos;s full-stack infrastructure pipeline — from containerization to edge routing, automated delivery, and persistent data engines.
            </p>
          </div>

          {/* Interactive Scrub Control Bar */}
          <div className="cinematic-panel px-4 py-2.5 rounded-xl border border-amber-500/30 flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="text-amber-400 hover:text-amber-200 transition-colors flex items-center gap-1.5"
              title="Toggle Auto-Rotation"
            >
              {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{autoRotate ? 'Auto Orbit' : 'Free Tilt'}</span>
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={scrubValue}
                onChange={(e) => setScrubValue(Number(e.target.value))}
                className="w-24 sm:w-32 accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <span className="text-amber-300 font-bold w-10 text-right">{scrubValue}%</span>
            </div>
          </div>
        </div>

        {/* 5 Stage Quick Step Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {STAGES.map((stg, i) => {
            const isCurrent = activeStageIndex === i;
            return (
              <button
                key={stg.id}
                onClick={() => {
                  const targetPct = Math.round((i / (STAGES.length - 1)) * 100);
                  setScrubValue(targetPct);
                  setActiveStageIndex(i);
                }}
                className={`p-3 rounded-xl border text-left transition-all font-mono duration-200 ${
                  isCurrent
                    ? 'bg-amber-500/15 border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-950/70 border-white/10 text-slate-400 hover:border-amber-500/30 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span>{stg.number}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                </div>
                <div className="font-bold text-xs truncate text-white">{stg.title}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{stg.category}</div>
              </button>
            );
          })}
        </div>

        {/* The 2-Column Split: 3D Holographic Canvas & Dynamic Kinetic Spec Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (7 cols): The 3D Holographic Model Viewer */}
          <div 
            onMouseMove={handleMouseMove}
            className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-2xl bg-gradient-to-b from-[#060f24] to-[#02050e] border border-amber-500/25 p-4 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Corner Tech Badges */}
            <div className="flex items-center justify-between z-10 font-mono text-[11px]">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/80 border border-white/10 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>3D ISOMETRIC TOPOLOGY // {currentStage.number}</span>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-white/10 text-slate-400">
                <span>ROTATION: {autoRotate ? 'ORBITING' : 'MANUAL PARALLAX'}</span>
              </div>
            </div>

            {/* The Canvas */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            {/* Bottom Telemetry HUD */}
            <div className="z-10 grid grid-cols-3 gap-2 font-mono text-xs">
              {currentStage.metrics.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">{m.label}</span>
                  <span className="text-amber-300 font-bold text-sm sm:text-base">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Dynamic Kinetic Spec & Live Production Code */}
          <div className="lg:col-span-5 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="cinematic-panel p-6 sm:p-7 rounded-2xl border border-amber-500/25 relative"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 font-mono">
                  <span className="text-xs text-amber-400 font-semibold tracking-wider">
                    STAGE {currentStage.number} // {currentStage.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                    VERIFIED IN PROD
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mb-1">
                  {currentStage.title}
                </h3>
                <p className="text-xs text-amber-300 font-mono mb-3">
                  {currentStage.subtitle}
                </p>
                <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed mb-5">
                  {currentStage.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-xs">
                  {currentStage.tech.map((t) => (
                    <span 
                      key={t}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-slate-300 text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Tab Switcher for Code vs Highlights */}
                <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2 font-mono text-xs">
                  <button
                    onClick={() => setSelectedSnippetTab('code')}
                    className={`flex items-center gap-1.5 pb-1 transition-colors ${
                      selectedSnippetTab === 'code'
                        ? 'text-amber-300 font-bold border-b-2 border-amber-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Configuration ({currentStage.codeSnippet.filename})</span>
                  </button>
                  <button
                    onClick={() => setSelectedSnippetTab('highlights')}
                    className={`flex items-center gap-1.5 pb-1 transition-colors ${
                      selectedSnippetTab === 'highlights'
                        ? 'text-amber-300 font-bold border-b-2 border-amber-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Production Architecture Points</span>
                  </button>
                </div>

                {/* Code or Highlights Display */}
                {selectedSnippetTab === 'code' ? (
                  <div className="relative rounded-xl bg-slate-950 border border-white/10 p-3.5 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-48 leading-relaxed shadow-inner">
                    <pre><code>{currentStage.codeSnippet.code}</code></pre>
                  </div>
                ) : (
                  <div className="space-y-2 font-mono text-xs">
                    {currentStage.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-white/5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-[11px]">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
