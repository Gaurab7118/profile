/**
 * Gaurab Samadder Portfolio — Cyber Systems & AI Engine
 * Synapse Particle Canvas · 3D Tilt Card · Spotlight Mouse Follow · Interactive Shell
 */

(function () {
  'use strict';

  // Offline Fallback Bundle with Gaurab's actual data & updated photos
  const FALLBACK_PROFILE = {
    personal: {
      name: "Gaurab Samadder",
      logoBadge: "GS",
      headline: "M.Tech in Computer Science & Engineering @ IIT Kharagpur",
      status: "M.Tech CSE Scholar @ IIT Kharagpur • 2026",
      bio: "M.Tech student in Computer Science & Engineering at the Indian Institute of Technology Kharagpur, specializing in High-Performance Computing, Distributed Systems, and Machine Learning.",
      about: "Hi, I am Gaurab Samadder. I am currently pursuing my Master of Technology (M.Tech) in Computer Science & Engineering at the Indian Institute of Technology, Kharagpur (IIT KGP). My technical and research interests lie in Distributed Systems, Systems Programming, Deep Learning, and Advanced Algorithms.\n\nAt IIT Kharagpur, I have been working on building scalable systems, optimizing computational workflows, and exploring neural architectures. Prior to joining IIT KGP, I completed my Bachelor of Technology in Computer Science & Engineering with First Class Distinction.",
      location: "IIT Kharagpur, West Bengal, India",
      email: "gaurabsamadder711826@iitkgp.ac.in",
      officialEmail: "gaurab.samadder@iitkgp.ac.in",
      phone: "+91 75959 23688",
      avatar: "image/avatar.jpg",
      aboutImage: "image/about.jpg",
      banner: "image/banner.jpg",
      resumeUrl: "assets/cv.pdf"
    },
    skills: [
      {
        category: "Systems & Programming",
        items: [
          { name: "C++", icon: "cpp" },
          { name: "C", icon: "c" },
          { name: "Python", icon: "python" },
          { name: "Java", icon: "java" },
          { name: "VS Code", icon: "vscode" },
          { name: "Google Colab", icon: "colab" },
          { name: "Windows", icon: "windows" },
          { name: "Linux", icon: "linux" },
          { name: "Distributed Systems & Raft", icon: "systems" },
          { name: "Data Structures & Algorithms", icon: "algo" }
        ]
      },
      {
        category: "AI & Machine Learning",
        items: [
          { name: "PyTorch", icon: "pytorch" },
          { name: "OpenCV", icon: "opencv" },
          { name: "NumPy", icon: "numpy" },
          { name: "Pandas", icon: "pandas" },
          { name: "Transformers", icon: "ai" },
          { name: "Kaggle", icon: "kaggle" },
          { name: "Matplotlib", icon: "matplotlib" },
          { name: "CUDA GPU Programming", icon: "cuda" },
          { name: "Scikit-Learn", icon: "scikit" }
        ]
      },
      {
        category: "Databases, Web & Cloud",
        items: [
          { name: "GitHub", icon: "github" },
          { name: "HTML", icon: "html" },
          { name: "CSS", icon: "css" },
          { name: "Vercel", icon: "vercel" },
          { name: "MySQL", icon: "mysql" },
          { name: "SQL & PostgreSQL", icon: "postgres" },
          { name: "Firebase", icon: "firebase" },
          { name: "Docker", icon: "docker" },
          { name: "Full-Stack Development", icon: "fullstack" }
        ]
      }
    ],
    projects: [
      {
        id: "proj-1",
        title: "Distributed Fault-Tolerant Key-Value Store",
        category: "Systems",
        description: "High-throughput distributed storage engine engineered in C++20 implementing the Raft consensus algorithm with leader election, log compaction, snapshotting, and write-ahead logging.",
        tags: ["C++20", "Raft Consensus", "gRPC", "Multi-Threading", "Distributed Systems"],
        githubUrl: "https://github.com"
      },
      {
        id: "proj-2",
        title: "CUDA GPU Tensor Acceleration Engine",
        category: "AI / HPC",
        description: "Custom GPU kernels in CUDA utilizing shared memory tiling and warp-level primitives to accelerate large-scale matrix operations, achieving 3.8x speedup over standard baseline CPU executions.",
        tags: ["CUDA", "C++", "PyTorch C++ API", "GPU Optimization", "HPC"],
        githubUrl: "https://github.com"
      },
      {
        id: "proj-3",
        title: "Custom Linux Kernel CPU Scheduler",
        category: "Systems",
        description: "Engineered a multi-level priority CPU scheduler inside the Linux Kernel (v5.15) with automated starvation prevention, dynamic task weighting, and eBPF tracing.",
        tags: ["C", "Linux Kernel", "Operating Systems", "Kernel Modules", "eBPF"],
        githubUrl: "https://github.com"
      },
      {
        id: "proj-4",
        title: "Parallel Graph Analytics Engine with OpenMP",
        category: "Algorithms",
        description: "High-performance multi-threaded graph analytics pipeline computing PageRank and Betweenness Centrality on graphs with 10M+ edges in under 4 seconds.",
        tags: ["Modern C++", "OpenMP", "SIMD", "Graph Algorithms", "Data Structures"],
        githubUrl: "https://github.com"
      }
    ],
    showPublications: true,
    publications: [
      {
        id: "pub-1",
        title: "Optimizing Consensus and Tail Latency in Geographically Distributed Raft Clusters",
        authors: "Gaurab Samadder, Research Collaborators",
        venue: "IEEE / ACM Conference on High Performance Computing & Distributed Systems",
        year: "2026",
        type: "Conference Paper",
        badge: "Accepted / In Proceedings",
        abstract: "Investigating pipelined log replication, asynchronous quorum acknowledgments, and low-latency transport primitives to reduce tail latencies in distributed storage engines across wide-area network topologies.",
        codeUrl: "https://github.com"
      }
    ],
    experiences: [
      {
        id: "exp-1",
        role: "Graduate Teaching Assistant (TA)",
        company: "Department of Computer Science & Engineering, IIT Kharagpur",
        period: "2024 — Present",
        description: "Mentoring undergraduate students in Algorithms and Operating Systems laboratory sessions, designing coding assessments, and evaluating system programming assignments."
      },
      {
        id: "exp-2",
        role: "M.Tech Systems Researcher",
        company: "Dept. of CSE, Indian Institute of Technology, Kharagpur",
        period: "2024 — Present",
        description: "Conducting master's research focusing on scalable systems, distributed computation, consensus optimization, and applied machine learning models."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Master of Technology (M.Tech) in CSE",
        institution: "Indian Institute of Technology, Kharagpur (IIT KGP)",
        period: "2024 — 2026 (Expected)",
        description: "Department of Computer Science & Engineering. Core Coursework: Advanced Algorithms, Distributed Systems, High Performance Computer Architecture, Deep Learning."
      },
      {
        id: "edu-2",
        degree: "Bachelor of Technology (B.Tech) in CSE",
        institution: "Swami Vivekananda Institute of Science and Technology",
        period: "2020 — 2024",
        description: "Graduated with First Class with Distinction. Strong foundation in Data Structures, Algorithms, Computer Architecture, Mathematics, and Database Systems. Qualified GATE CS with top rank."
      }
    ],
    certifications: [
      {
        id: "cert-1",
        name: "Graduate Aptitude Test in Engineering (GATE Computer Science)",
        issuer: "IIT / Ministry of Education, India",
        date: "2026"
      }
    ]
  };

  // =========================================================================
  // 1. INTERACTIVE SYNAPSE PARTICLE CANVAS (Neural & Distributed Network)
  // =========================================================================
  function initSynapseCanvas() {
    const canvas = document.getElementById('synapseCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    const nodes = [];
    const count = 48;
    const pointer = { x: -2000, y: -2000, active: false };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * (window.devicePixelRatio || 1);
      height = canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      const cssW = rect.width;
      const cssH = rect.height;

      if (nodes.length === 0) {
        for (let i = 0; i < count; i++) {
          nodes.push({
            x: Math.random() * cssW,
            y: Math.random() * cssH,
            vx: (Math.random() - 0.5) * 0.55,
            vy: (Math.random() - 0.5) * 0.55,
            radius: Math.random() * 2.2 + 1.2,
            pulse: Math.random() * Math.PI * 2
          });
        }
      }
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    });

    window.addEventListener('mouseleave', () => {
      pointer.active = false;
    });

    let animId = null;

    function render(time) {
      const rect = canvas.getBoundingClientRect();
      const cssW = rect.width;
      const cssH = rect.height;

      ctx.clearRect(0, 0, cssW, cssH);

      const isLight = document.body.getAttribute('data-theme') === 'light';
      const maxDist = Math.min(145, Math.max(90, cssW * 0.12));

      // Color tokens (Monochromatic Cobalt Blue Shades)
      const nodeColor = isLight ? 'rgba(29, 78, 216, 0.5)' : 'rgba(59, 130, 246, 0.65)';
      const edgeBase = isLight ? '29, 78, 216' : '59, 130, 246';
      const cyanEdge = isLight ? '37, 99, 235' : '96, 165, 250';

      // Update & render nodes
      nodes.forEach((node, idx) => {
        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0) node.x = cssW;
          if (node.x > cssW) node.x = 0;
          if (node.y < 0) node.y = cssH;
          if (node.y > cssH) node.y = 0;

          // Mouse gentle gravity
          if (pointer.active) {
            const dx = pointer.x - node.x;
            const dy = pointer.y - node.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 130) {
              node.x += (dx / dist) * 0.45;
              node.y += (dy / dist) * 0.45;
            }
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      // Render synaptic connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${i % 2 === 0 ? edgeBase : cyanEdge}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else animId = requestAnimationFrame(render);
    });
  }

  // =========================================================================
  // 2. 3D INTERACTIVE TILT CARD (Hero Showcase)
  // =========================================================================
  function initTiltCard() {
    const card = document.getElementById('heroTiltCard');
    if (!card) return;

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // =========================================================================
  // 3. SPOTLIGHT MOUSE FOLLOW (Aceternity / Linear Style)
  // =========================================================================
  function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // =========================================================================
  // 4. SCROLL REVEAL, PROGRESS BAR & STATS COUNTERS
  // =========================================================================
  let revealObserver = null;

  function observeReveals(root = document) {
    if (!revealObserver) return;
    root.querySelectorAll('.reveal').forEach(r => revealObserver.observe(r));
  }

  function initScrollReveal() {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else if (entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

    observeReveals(document);

    // Top scroll progress bar
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
      const updateProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
        progressBar.style.width = `${pct}%`;
      };
      window.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress();
    }

    // Stats counter trigger
    const counterStrip = document.querySelector('.stats-counter-strip');
    if (counterStrip) {
      let started = false;
      const counterObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          document.querySelectorAll('.counter-num').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const start = +counter.textContent;
            const duration = 1200;
            const startTime = performance.now();

            function updateCounter(now) {
              const progress = Math.min((now - startTime) / duration, 1);
              const val = Math.floor(start + progress * (target - start));
              counter.textContent = val;
              if (progress < 1) requestAnimationFrame(updateCounter);
              else counter.textContent = target;
            }

            requestAnimationFrame(updateCounter);
          });
        }
      }, { threshold: 0.2 });

      counterObserver.observe(counterStrip);
    }
  }

  // =========================================================================
  // 7. THEME & FONT CONTROLLER
  // =========================================================================
  function applyFontStyle(fontKey) {
    const valid = ['space-grotesk', 'inter', 'ibm-plex', 'jetbrains-mono', 'source-serif'];
    const chosen = valid.includes(fontKey) ? fontKey : 'space-grotesk';
    document.body.setAttribute('data-font', chosen);
    localStorage.setItem('site-font-style', chosen);
  }

  function initTheme() {
    const saved = localStorage.getItem('site-theme') || 'dark';
    document.body.setAttribute('data-theme', saved);

    const savedFont = localStorage.getItem('site-font-style') || 'space-grotesk';
    applyFontStyle(savedFont);

    const toggleTheme = () => {
      const current = document.body.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('site-theme', next);
    };

    ['themeToggleBtn', 'mobileThemeToggleBtn'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', toggleTheme);
    });
  }

  // =========================================================================
  // 8. MOBILE MENU DRAWER
  // =========================================================================
  function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('navDock');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // 9. PROJECT & SKILL FILTER CONTROLS
  // =========================================================================
  function getSkillDescription(name) {
    const n = (name || '').toLowerCase().trim();
    if (n.includes('c++') || n.includes('modern c')) {
      return 'Used to engineer low-latency distributed storage engines, custom memory allocators, and high-throughput multi-threaded systems where deterministic performance and zero-overhead abstractions matter.';
    }
    if (n === 'c' || n.startsWith('c ') || n.includes('c /')) {
      return 'Applied for Linux kernel modules, system-call programming, and low-level operating system internals requiring direct memory control, minimal footprint, and hardware-level efficiency.';
    }
    if (n.includes('python')) {
      return 'Primary language for deep learning experimentation, data preprocessing pipelines, automation scripts, and rapid prototyping of machine learning models and benchmarks.';
    }
    if (n.includes('java')) {
      return 'Used for object-oriented backend services, concurrent server applications, and building structured, maintainable enterprise and distributed software components.';
    }
    if (n.includes('vs code') || n.includes('vscode')) {
      return 'Daily development environment configured with C/C++, Python, remote SSH, and debugging extensions for writing, profiling, and navigating large codebases.';
    }
    if (n.includes('colab')) {
      return 'Used for cloud-hosted GPU/TPU notebooks to train deep learning models, run computer vision experiments, and share reproducible machine learning workflows.';
    }
    if (n.includes('windows')) {
      return 'Used as a daily workstation environment alongside WSL2 for cross-platform software development, debugging, and local web and systems tooling.';
    }
    if (n.includes('linux')) {
      return 'Core operating system used for kernel CPU scheduling, server deployment, shell scripting, eBPF tracing, and benchmarking distributed systems workloads.';
    }
    if (n.includes('raft') || n.includes('distributed')) {
      return 'Used to build fault-tolerant replicated state machines with leader election, log compaction, snapshotting, and linearizable quorum reads across networked nodes.';
    }
    if (n.includes('algorithm') || n.includes('data structure')) {
      return 'Applied to optimize graph analytics, shortest-path and centrality computations, lock-free data structures, and competitive problem-solving with tight time-space bounds.';
    }
    if (n.includes('pytorch')) {
      return 'Used to design, train, and evaluate deep neural networks, custom autograd layers, and GPU-accelerated vision and sequence models.';
    }
    if (n.includes('opencv')) {
      return 'Applied in computer vision pipelines for image preprocessing, feature extraction, real-time frame analysis, and preparing visual datasets for neural networks.';
    }
    if (n.includes('numpy')) {
      return 'Used for vectorized numerical computing, multi-dimensional array transformations, linear algebra operations, and fast matrix preprocessing in ML pipelines.';
    }
    if (n.includes('pandas')) {
      return 'Used for cleaning, aggregating, and analyzing structured tabular datasets before feeding features into machine learning and statistical models.';
    }
    if (n.includes('transformer')) {
      return 'Used to build and fine-tune attention-based architectures for sequence modeling, representation learning, and modern deep learning research tasks.';
    }
    if (n.includes('kaggle')) {
      return 'Used to benchmark machine learning pipelines on real-world datasets, run GPU-backed notebooks, and validate model generalization against competitive baselines.';
    }
    if (n.includes('matplotlib')) {
      return 'Used to visualize training curves, latency distributions, system benchmark results, and exploratory data insights in clear publication-ready plots.';
    }
    if (n.includes('cuda') || n.includes('gpu')) {
      return 'Used to write custom parallel GPU kernels with shared-memory tiling and warp-level primitives to accelerate matrix math and deep learning compute.';
    }
    if (n.includes('scikit')) {
      return 'Used for classical machine learning baselines, feature scaling, cross-validation, clustering, and quick evaluation of classification and regression models.';
    }
    if (n.includes('github')) {
      return 'Used for version control, collaborative code reviews, automated GitHub Actions workflows, issue tracking, and hosting open-source research implementations.';
    }
    if (n.includes('html')) {
      return 'Used to structure semantic, accessible web interfaces and portfolio layouts with clean document hierarchy and standards-compliant markup.';
    }
    if (n.includes('css')) {
      return 'Used to craft responsive grid/flex layouts, dark and light themes, custom design systems, and smooth hardware-accelerated UI transitions.';
    }
    if (n.includes('vercel')) {
      return 'Used to deploy fast static sites and full-stack web applications with automatic Git-triggered builds, preview URLs, and edge delivery.';
    }
    if (n.includes('mysql')) {
      return 'Used to design normalized relational schemas, write indexed SQL queries, and manage transactional data persistence for web applications.';
    }
    if (n.includes('sql') || n.includes('postgres')) {
      return 'Used for reliable relational data modeling, complex analytical queries, ACID transactions, and backend storage in scalable applications.';
    }
    if (n.includes('firebase')) {
      return 'Used for real-time NoSQL data syncing, user authentication, and rapid cloud backend integration in interactive web projects.';
    }
    if (n.includes('docker')) {
      return 'Used to containerize development environments, isolate multi-node distributed test clusters, and ensure reproducible builds across machines.';
    }
    if (n.includes('full-stack') || n.includes('fullstack')) {
      return 'Applied to connect responsive frontend interfaces with backend APIs, databases, and deployment pipelines into complete end-to-end web systems.';
    }
    return `Used in engineering and research projects to build reliable, scalable, and well-structured software systems.`;
  }

  function initSkillDetails() {
    const grid = document.getElementById('skillsGridContainer');
    const detailBox = document.getElementById('skillDetailBox');
    const detailLogo = document.getElementById('skillDetailLogo');
    const detailCat = document.getElementById('skillDetailCategory');
    const detailTitle = document.getElementById('skillDetailTitle');
    const detailDesc = document.getElementById('skillDetailDesc');
    const closeBtn = document.getElementById('skillDetailClose');
    if (!grid || !detailBox) return;

    const closePanel = () => {
      detailBox.hidden = true;
      grid.querySelectorAll('.tech-chip.active').forEach(c => c.classList.remove('active'));
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closePanel);
    }

    grid.addEventListener('click', e => {
      const chip = e.target.closest('.tech-chip');
      if (!chip) return;

      const wasActive = chip.classList.contains('active') && !detailBox.hidden;
      grid.querySelectorAll('.tech-chip.active').forEach(c => c.classList.remove('active'));

      if (wasActive) {
        detailBox.hidden = true;
        return;
      }

      chip.classList.add('active');
      const card = chip.closest('.arsenal-card');
      const catTitle = card ? (card.querySelector('.arsenal-title')?.textContent || 'TECHNOLOGY') : 'TECHNOLOGY';
      const spans = chip.querySelectorAll('span');
      const techName = spans.length > 1 ? spans[spans.length - 1].textContent.trim() : chip.textContent.trim();
      const logoEl = chip.querySelector('.tech-logo');

      if (detailLogo && logoEl) detailLogo.innerHTML = logoEl.innerHTML;
      if (detailCat) detailCat.textContent = catTitle.toUpperCase();
      if (detailTitle) detailTitle.textContent = techName;
      if (detailDesc) detailDesc.textContent = getSkillDescription(techName);

      detailBox.hidden = false;
    });
  }

  function initSkillFilters() {
    const dock = document.getElementById('skillFilterDock');
    if (!dock) return;

    dock.addEventListener('click', e => {
      const btn = e.target.closest('.filter-dock-btn');
      if (!btn) return;

      dock.querySelectorAll('.filter-dock-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';
      const cards = document.querySelectorAll('#skillsGridContainer .arsenal-card');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.toLowerCase().includes(filter.toLowerCase())) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      const track = document.getElementById('projectsGridContainer');
      if (track) track.scrollLeft = 0;
      setTimeout(updateProjectSliderButtons, 50);
    });
  }

  function updateSliderButtons(trackId, prevId, nextId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!track || !prevBtn || !nextBtn) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft >= maxScroll - 2 || maxScroll <= 2;
  }

  function updateProjectSliderButtons() {
    updateSliderButtons('projectsGridContainer', 'projSliderPrev', 'projSliderNext');
    updateSliderButtons('certListContainer', 'certSliderPrev', 'certSliderNext');
  }

  function initSlider(trackId, prevId, nextId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!track || !prevBtn || !nextBtn) return;

    const getStep = () => {
      const card = track.querySelector('.modern-project-card:not([style*="display: none"])');
      return card ? card.offsetWidth + 24 : 340;
    };

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', () => updateSliderButtons(trackId, prevId, nextId), { passive: true });
    window.addEventListener('resize', () => updateSliderButtons(trackId, prevId, nextId));
    updateSliderButtons(trackId, prevId, nextId);
  }

  function initProjectSlider() {
    initSlider('projectsGridContainer', 'projSliderPrev', 'projSliderNext');
    initSlider('certListContainer', 'certSliderPrev', 'certSliderNext');
  }

  function initProjectFilters() {
    const dock = document.getElementById('projectFilterDock');
    if (!dock) return;

    dock.addEventListener('click', e => {
      const btn = e.target.closest('.filter-dock-btn');
      if (!btn) return;

      dock.querySelectorAll('.filter-dock-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';
      const cards = document.querySelectorAll('#projectsGridContainer .modern-project-card');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.toLowerCase().includes(filter.toLowerCase())) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      const track = document.getElementById('projectsGridContainer');
      if (track) track.scrollLeft = 0;
      setTimeout(updateProjectSliderButtons, 50);
    });
  }

  // =========================================================================
  // 10. DATA BINDING & SERVER SYNC
  // =========================================================================
  function renderAllData(data) {
    if (!data) return;

    const p = data.personal || {};

    if (p.fontStyle) {
      applyFontStyle(p.fontStyle);
    }

    // Navbar & Footer Brand
    setText('navLogoBadge', p.logoBadge || 'GS');
    setText('navBrandName', p.name || 'Gaurab Samadder');
    setText('footerBrandBadge', p.logoBadge || 'GS');
    setText('footerBrandName', p.name || 'Gaurab Samadder');

    // Hero Section
    setText('heroStatusText', p.status || 'M.Tech CSE Scholar @ IIT Kharagpur • 2026');
    setText('heroBioText', p.bio || '');
    setText('heroAvatarName', p.name || 'Gaurab Samadder');
    setText('aboutCardName', p.name || 'Gaurab Samadder');

    // Updated Photos
    const heroImg = document.getElementById('heroAvatarImg');
    if (heroImg && p.avatar) {
      heroImg.src = resolveImagePath(p.avatar);
    }

    const aboutImg = document.getElementById('aboutPortraitImg');
    if (aboutImg && p.aboutImage) {
      aboutImg.src = resolveImagePath(p.aboutImage);
    }

    // About Narrative & Verified Contact Info
    if (p.about) setText('aboutNarrativeText', p.about);
    if (p.location) setText('aboutLocationText', p.location);

    if (p.email) {
      const emailLink = document.getElementById('aboutEmailLink');
      if (emailLink) {
        emailLink.href = `mailto:${p.email}`;
        emailLink.textContent = p.email;
      }
      const contactBtn = document.getElementById('contactEmailBtn');
      if (contactBtn) {
        contactBtn.href = `mailto:${p.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`;
      }
    }

    if (p.officialEmail) {
      const officialLink = document.getElementById('aboutOfficialEmailLink');
      if (officialLink) {
        officialLink.href = `mailto:${p.officialEmail}`;
        officialLink.textContent = p.officialEmail;
      }
    }

    if (p.phone) {
      const phoneLink = document.getElementById('aboutPhoneLink');
      if (phoneLink) {
        phoneLink.href = `tel:${p.phone.replace(/\s+/g, '')}`;
        phoneLink.textContent = p.phone;
      }
    }

    // Resume buttons
    if (p.resumeUrl) {
      const isExternal = p.resumeUrl.startsWith('http://') || p.resumeUrl.startsWith('https://');
      const isDataUrl = p.resumeUrl.startsWith('data:');
      const rUrl = (isExternal || isDataUrl) ? p.resumeUrl : p.resumeUrl.replace(/^(\.\.\/)+/, '');
      const dlName = p.resumePdfName || 'Gaurab_Samadder_CV.pdf';
      ['navResumeBtn', 'mobileNavResumeBtn', 'heroResumeBtn', 'aboutCvDownloadBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.href = rUrl;
        if (isExternal) {
          btn.removeAttribute('download');
        } else {
          btn.setAttribute('download', dlName);
        }
      });
    }

    // Skills
    if (Array.isArray(data.skills) && data.skills.length > 0) {
      renderSkills(data.skills);
    }

    // Projects
    if (Array.isArray(data.projects) && data.projects.length > 0) {
      renderProjects(data.projects);
    }

    // Publications (Honoring Show/Hide Toggle)
    const pubSection = document.getElementById('publications');
    const navPubItem = document.getElementById('navPubItem');
    if (data.showPublications === false) {
      if (pubSection) pubSection.style.display = 'none';
      if (navPubItem) navPubItem.style.display = 'none';
    } else {
      if (pubSection) pubSection.style.display = '';
      if (navPubItem) navPubItem.style.display = '';
      if (Array.isArray(data.publications) && data.publications.length > 0) {
        renderPublications(data.publications);
      }
    }

    // Experiences & Education
    if (Array.isArray(data.experiences) && data.experiences.length > 0) {
      renderExperiences(data.experiences);
    }
    if (Array.isArray(data.education) && data.education.length > 0) {
      renderEducation(data.education);
    }
    if (Array.isArray(data.certifications)) {
      renderCertifications(data.certifications);
    }
    if (Array.isArray(data.socials) && data.socials.length > 0) {
      renderSocials(data.socials);
    }
  }

  function resolveImagePath(path) {
    if (!path) return 'image/avatar.jpg';
    if (path.startsWith('data:image')) return path;
    if (path.startsWith('http')) return path;
    let clean = path.replace(/^(\.\.\/)+/, '');
    if (clean.startsWith('assets/images/')) {
      if (clean.includes('avatar') || clean.includes('portrait')) clean = 'image/avatar.jpg';
      else if (clean.includes('about')) clean = 'image/about.jpg';
      else if (clean.includes('banner')) clean = 'image/banner.jpg';
      else if (clean.includes('research') || clean.includes('cnerg')) clean = 'image/research.jpg';
    }
    return clean;
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text) el.textContent = text;
  }

  function getTechLogoHtml(name, iconKey = '') {
    const k = (iconKey || '').toLowerCase();
    const n = (name || '').toLowerCase();
    const devicon = (slug, variant = 'original') =>
      `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-${variant}.svg" alt="${escapeHtml(name || slug)}" onerror="this.outerHTML='<svg viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><polyline points=\\'16 18 22 12 16 6\\'/><polyline points=\\'8 6 2 12 8 18\\'/></svg>'" />`;

    if (k === 'cpp' || n.includes('c++') || n.includes('modern c')) return devicon('cplusplus');
    if (k === 'c' || n === 'c' || n.startsWith('c ') || n.includes('c /')) return devicon('c');
    if (k === 'vscode' || n.includes('vs code') || n.includes('vscode')) return devicon('vscode');
    if (k === 'windows' || n.includes('windows')) return devicon('windows8');
    if (k === 'pytorch' || n.includes('pytorch')) return devicon('pytorch');
    if (k === 'python' || n.includes('python')) return devicon('python');
    if (k === 'tensorflow' || n.includes('tensorflow')) return devicon('tensorflow');
    if (k === 'numpy' || n.includes('numpy')) return devicon('numpy');
    if (k === 'pandas' || n.includes('pandas')) return devicon('pandas');
    if (k === 'scikit' || n.includes('scikit')) return devicon('scikitlearn');
    if (k === 'opencv' || n.includes('opencv')) return devicon('opencv');
    if (k === 'matplotlib' || n.includes('matplotlib')) return devicon('matplotlib');
    if (k === 'kaggle' || n.includes('kaggle')) return devicon('kaggle');
    if (k === 'docker' || n.includes('docker')) return devicon('docker');
    if (k === 'kubernetes' || n.includes('kubernetes')) return devicon('kubernetes', 'plain');
    if (k === 'linux' || n.includes('linux') || n.includes('operating')) return devicon('linux');
    if (k === 'golang' || n.includes('golang') || n.includes('go (')) return devicon('go');
    if (k === 'java' || (n.includes('java') && !n.includes('javascript'))) return devicon('java');
    if (k === 'javascript' || n.includes('javascript')) return devicon('javascript');
    if (k === 'typescript' || n.includes('typescript')) return devicon('typescript');
    if (k === 'rust' || n.includes('rust')) return devicon('rust');
    if (k === 'mysql' || n.includes('mysql')) return devicon('mysql');
    if (k === 'postgres' || k === 'database' || n.includes('postgres')) return devicon('postgresql');
    if (k === 'redis' || n.includes('redis')) return devicon('redis');
    if (k === 'mongodb' || n.includes('mongodb')) return devicon('mongodb');
    if (k === 'firebase' || n.includes('firebase')) return devicon('firebase', 'plain');
    if (k === 'git' || (n.includes('git') && !n.includes('github'))) return devicon('git');
    if (k === 'react' || k === 'web' || n.includes('react')) return devicon('react');
    if (k === 'nodejs' || n.includes('node')) return devicon('nodejs');
    if (k === 'html' || n.includes('html')) return devicon('html5');
    if (k === 'css' || n.includes('css')) return devicon('css3');
    if (k === 'aws' || k === 'cloud' || n.includes('aws')) return devicon('amazonwebservices', 'original-wordmark');

    // Clean domain-specific inline SVGs for abstract systems/AI concepts
    if (k === 'github' || n.includes('github')) {
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.27a11 11 0 0 0-3.48 21.46c.55.1.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.26-1.21-1.6-1.21-1.6-.99-.68.07-.66.07-.66 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.42-.27-4.96-1.21-4.96-5.4 0-1.19.42-2.16 1.12-2.93-.11-.28-.49-1.39.11-2.89 0 0 .92-.3 3 1.12a10.4 10.4 0 0 1 5.5 0c2.08-1.42 3-1.12 3-1.12.6 1.5.22 2.61.11 2.89.7.77 1.12 1.74 1.12 2.93 0 4.2-2.55 5.12-4.98 5.39.39.34.74 1.01.74 2.04v3.02c0 .29.19.63.74.53A11 11 0 0 0 12 1.27z"/></svg>`;
    }
    if (k === 'vercel' || n.includes('vercel')) {
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 20h20L12 3z"/></svg>`;
    }
    if (k === 'colab' || n.includes('colab')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8.5 16.5a4.5 4.5 0 1 1 0-9c1.6 0 3 .8 3.5 2 .5-1.2 1.9-2 3.5-2a4.5 4.5 0 1 1 0 9c-1.6 0-3-.8-3.5-2-.5 1.2-1.9 2-3.5 2z"/></svg>`;
    }
    if (k === 'fullstack' || n.includes('full-stack')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>`;
    }
    if (k === 'systems' || n.includes('raft') || n.includes('distributed')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M10.8 7.2 6.2 16.8M13.2 7.2l4.6 9.6M7.5 19h9"/></svg>`;
    }
    if (k === 'algo' || n.includes('algorithm') || n.includes('data structure')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="4"/><rect x="3" y="17" width="6" height="4"/><rect x="15" y="17" width="6" height="4"/><path d="M12 7v5M6 17v-5h12v5"/></svg>`;
    }
    if (k === 'cuda' || n.includes('cuda') || n.includes('gpu')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>`;
    }
    if (k === 'ai' || n.includes('deep learning') || n.includes('transformer') || n.includes('neural')) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="7" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="7" r="2"/><circle cx="19" cy="17" r="2"/><path d="M7 8l3.3 2.7M7 16l3.3-2.7M13.7 10.7 17 8M13.7 13.3 17 16"/></svg>`;
    }
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
  }

  function renderSkills(skills) {
    const container = document.getElementById('skillsGridContainer');
    if (!container) return;

    container.innerHTML = skills.map(group => {
      const catName = group.category || 'Core';
      const badgeText = catName.toLowerCase().includes('system') ? 'C++ / OS' :
        (catName.toLowerCase().includes('machine') || catName.toLowerCase().includes('ai') ? 'GPU / DL' : 'INFRA');
      const items = Array.isArray(group.items) ? group.items : [];
      return `
        <div class="arsenal-card spotlight-card reveal" data-category="${escapeHtml(catName)}">
          <div class="card-corner-badge">${escapeHtml(badgeText)}</div>
          <div class="card-icon-header">
            <div class="icon-avatar emerald-grad">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="1"/><polyline points="9 12 11 14 15 10"/></svg>
            </div>
            <h3 class="arsenal-title">${escapeHtml(catName)}</h3>
          </div>
          <div class="tech-chips-grid">
            ${items.map(item => `
              <div class="tech-chip">
                <span class="tech-logo">${getTechLogoHtml(item.name, item.icon)}</span>
                <span>${escapeHtml(item.name || '')}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    initSpotlightCards();
    observeReveals(container);
    setTimeout(updateProjectSliderButtons, 60);
  }

  function getProjectMediaHtml(proj) {
    const coverImg = resolveImagePath(proj.image || 'image/research.jpg');
    const videoUrl = (proj.videoUrl || '').trim();
    const hasDistinctLive = proj.liveUrl && proj.liveUrl !== proj.githubUrl && proj.liveUrl !== 'https://github.com';
    const liveBadge = hasDistinctLive
      ? `<a href="${escapeHtml(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="media-live-badge">Live Site ↗</a>`
      : '';

    if (videoUrl) {
      let embedSrc = '';
      if (videoUrl.includes('youtube.com/watch?v=')) {
        const vidId = videoUrl.split('v=')[1].split('&')[0];
        embedSrc = `https://www.youtube.com/embed/${vidId}`;
      } else if (videoUrl.includes('youtu.be/')) {
        const vidId = videoUrl.split('youtu.be/')[1].split('?')[0];
        embedSrc = `https://www.youtube.com/embed/${vidId}`;
      } else if (videoUrl.includes('vimeo.com/')) {
        const vidId = videoUrl.split('vimeo.com/')[1].split('?')[0];
        embedSrc = `https://player.vimeo.com/video/${vidId}`;
      }

      if (embedSrc) {
        return `
          <div class="project-media-box">
            <iframe src="${escapeHtml(embedSrc)}" title="${escapeHtml(proj.title || 'Project Video')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            ${liveBadge}
            <span class="media-type-badge">VIDEO</span>
          </div>
        `;
      }

      return `
        <div class="project-media-box">
          <video src="${escapeHtml(videoUrl)}" poster="${escapeHtml(coverImg)}" controls muted playsinline preload="metadata"></video>
          ${liveBadge}
          <span class="media-type-badge">VIDEO</span>
        </div>
      `;
    }

    return `
      <div class="project-media-box">
        <img src="${escapeHtml(coverImg)}" alt="${escapeHtml(proj.title || 'Project Cover')}" onerror="this.src='image/research.jpg'" />
        ${liveBadge}
      </div>
    `;
  }

  function renderProjects(projects) {
    const container = document.getElementById('projectsGridContainer');
    if (!container) return;

    container.innerHTML = projects.map(proj => {
      const tags = Array.isArray(proj.tags) ? proj.tags : [];
      const catClass = proj.category === 'AI / HPC' ? 'hpc-pill' : (proj.category === 'Algorithms' ? 'algo-pill' : 'systems-pill');
      const primaryUrl = proj.githubUrl || proj.liveUrl || '';
      const primaryLabel = proj.githubUrl ? 'View Source Implementation' : 'View Project';
      return `
        <article class="modern-project-card spotlight-card reveal" data-category="${escapeHtml(proj.category || 'Systems')}">
          ${getProjectMediaHtml(proj)}
          <div class="project-card-body">
            <div class="project-badge-bar">
              <span class="cat-pill ${catClass}">${escapeHtml(proj.category || 'Systems')}</span>
            </div>
            <h3 class="proj-title">${escapeHtml(proj.title || '')}</h3>
            <p class="proj-desc">${escapeHtml(proj.description || '')}</p>
            <div class="proj-tags-list">
              ${tags.map(t => `<span class="proj-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            ${primaryUrl ? `
              <div class="project-card-footer">
                <a href="${escapeHtml(primaryUrl)}" target="_blank" rel="noopener noreferrer" class="project-note-link">
                  <span>${primaryLabel}</span>
                  <span>↗</span>
                </a>
              </div>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');

    initSpotlightCards();
    observeReveals(container);
    setTimeout(updateProjectSliderButtons, 60);
  }

  function renderPublications(publications) {
    const container = document.getElementById('publicationsGridContainer');
    if (!container) return;

    container.innerHTML = publications.map(pub => `
      <div class="paper-card spotlight-card reveal">
        <div class="paper-top-badge">
          <span class="pulse-emerald"></span>
          <span>${escapeHtml(pub.type || 'Conference Paper')} · ${escapeHtml(pub.badge || 'In Proceedings')} (${escapeHtml(pub.year || '2026')})</span>
        </div>
        <h3 class="paper-headline">${escapeHtml(pub.title || '')}</h3>
        <p class="paper-authors"><strong>${escapeHtml(pub.authors || 'Gaurab Samadder')}</strong></p>
        <p class="paper-venue">${escapeHtml(pub.venue || '')}</p>
        ${pub.abstract ? `
          <div class="paper-abstract-box">
            <p><strong>Abstract —</strong> ${escapeHtml(pub.abstract)}</p>
          </div>
        ` : ''}
        <div class="paper-footer-actions">
          ${pub.codeUrl ? `<a href="${escapeHtml(pub.codeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-emerald btn-sm">Source Code ↗</a>` : ''}
          ${pub.paperUrl ? `<a href="${escapeHtml(pub.paperUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm">Read Paper ↗</a>` : ''}
          <span class="meta-tag">Peer-Reviewed</span>
          <span class="meta-tag">Raft Consensus</span>
        </div>
      </div>
    `).join('');

    initSpotlightCards();
    observeReveals(container);
    setTimeout(updateProjectSliderButtons, 60);
  }

  function renderExperiences(experiences) {
    const container = document.getElementById('experienceListContainer');
    if (!container) return;

    container.innerHTML = experiences.map(exp => `
      <div class="trajectory-node spotlight-card reveal">
        <span class="node-year">${escapeHtml(exp.period || '')}</span>
        <h4 class="node-title">${escapeHtml(exp.role || '')}</h4>
        <p class="node-inst">${escapeHtml(exp.company || '')}</p>
        <p class="node-body">${escapeHtml(exp.description || '')}</p>
      </div>
    `).join('');

    initSpotlightCards();
    observeReveals(container);
    setTimeout(updateProjectSliderButtons, 60);
  }

  function renderEducation(education) {
    const container = document.getElementById('educationListContainer');
    if (!container) return;

    container.innerHTML = education.map((edu, idx) => `
      <div class="trajectory-node spotlight-card reveal ${idx === 0 ? 'prime-border' : ''}">
        <span class="node-year">${escapeHtml(edu.period || '')}</span>
        <h4 class="node-title">${escapeHtml(edu.degree || '')}</h4>
        <p class="node-inst">${escapeHtml(edu.institution || '')}</p>
        <p class="node-body">${escapeHtml(edu.description || '')}</p>
      </div>
    `).join('');

    initSpotlightCards();
    observeReveals(container);
    setTimeout(updateProjectSliderButtons, 60);
  }

  function renderCertifications(certs) {
    const container = document.getElementById('certListContainer');
    if (!container) return;
    if (certs.length === 0) {
      container.innerHTML = '<div style="color: var(--text-muted); font-size: 0.9rem;">No certificates listed.</div>';
      updateSliderButtons('certListContainer', 'certSliderPrev', 'certSliderNext');
      return;
    }
    container.innerHTML = certs.map(c => {
      const imgUrl = resolveImagePath(c.image || 'image/research.jpg');
      return `
        <article class="modern-project-card spotlight-card reveal">
          <div class="project-media-box">
            <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(c.name || 'Certificate')}" onerror="this.src='image/research.jpg'" />
            <span class="media-type-badge">VERIFIED</span>
          </div>
          <div class="project-card-body">
            <div class="project-badge-bar">
              <span class="cat-pill systems-pill">${escapeHtml(c.date || '2024')}</span>
            </div>
            <h3 class="proj-title">${escapeHtml(c.name || '')}</h3>
            <p class="proj-desc">${escapeHtml(c.issuer || '')}</p>
            ${c.url ? `
              <div class="project-card-footer">
                <a href="${escapeHtml(c.url)}" target="_blank" rel="noopener noreferrer" class="project-note-link">
                  <span>Verify Credential</span>
                  <span>↗</span>
                </a>
              </div>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');

    initSpotlightCards();
    observeReveals(container);
    setTimeout(() => updateSliderButtons('certListContainer', 'certSliderPrev', 'certSliderNext'), 60);
  }

  function getSocialLogoSvg(platformOrIcon) {
    const p = (platformOrIcon || '').toLowerCase();
    if (p.includes('github')) {
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
    }
    if (p.includes('linkedin')) {
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;
    }
    if (p.includes('leetcode') || p.includes('code')) {
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    }
    if (p.includes('mail') || p.includes('email')) {
      return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
    }
    if (p.includes('twitter') || p === 'x') {
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
    }
    return `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
  }

  function renderSocials(socials) {
    const container = document.getElementById('socialPillsWrap');
    if (container) {
      container.innerHTML = socials.map(s => `
        <a href="${escapeHtml(s.url || '#')}" target="_blank" rel="noopener noreferrer" class="social-pill-link">
          ${getSocialLogoSvg(s.icon || s.platform)}
          ${escapeHtml(s.platform || 'Link')}
        </a>
      `).join('');
    }

    const quick = document.getElementById('heroQuickSocials');
    if (quick) {
      quick.innerHTML = socials.map(s => `
        <a href="${escapeHtml(s.url || '#')}" target="_blank" rel="noopener noreferrer" class="quick-social-btn" title="${escapeHtml(s.platform || 'Link')}" aria-label="${escapeHtml(s.platform || 'Link')}">
          ${getSocialLogoSvg(s.icon || s.platform)}
        </a>
      `).join('');
    }
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // 11. BOOTSTRAP ENGINE
  // =========================================================================
  const PROFILE_STORAGE_KEY = 'portfolio_profile_data';

  async function loadData() {
    let localJson = null;
    try {
      const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (raw) localJson = JSON.parse(raw);
    } catch (e) {}

    if (localJson) {
      if (Array.isArray(localJson.skills) && localJson.skills.length > 0 && localJson.skills[0].category === 'Systems & Core CS' && !localJson._skillsMigrated) {
        localJson.skills = FALLBACK_PROFILE.skills;
        localJson._skillsMigrated = true;
        try { localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(localJson)); } catch (e) {}
      }
      renderAllData(localJson);
    } else {
      renderAllData(FALLBACK_PROFILE);
    }

    try {
      const res = await fetch('data/profile.json?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const live = await res.json();
        const localTs = localJson && localJson._updatedAt ? Number(localJson._updatedAt) : 0;
        const liveTs = live && live._updatedAt ? Number(live._updatedAt) : 0;
        if (!localJson || liveTs >= localTs) {
          renderAllData(live);
        }
      }
    } catch (e) {}
  }

  window.addEventListener('storage', e => {
    if (e.key === PROFILE_STORAGE_KEY && e.newValue) {
      try {
        renderAllData(JSON.parse(e.newValue));
      } catch (err) {}
    }
  });

  // Set current year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initSynapseCanvas();
    initTiltCard();
    initSpotlightCards();
    initSkillFilters();
    initSkillDetails();
    initProjectFilters();
    initProjectSlider();
    initScrollReveal();
    loadData();
  });
})();
