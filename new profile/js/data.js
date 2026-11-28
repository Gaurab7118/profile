// js/data.js - Central Data Engine & Cross-Browser Synchronization

const DEFAULT_PROFILE_DATA = {
  "personal": {
    "name": "Gaurab Samadder",
    "logoBadge": "GS",
    "headline": "M.Tech in Computer Science & Engineering @ IIT Kharagpur",
    "status": "M.Tech CSE Student @ IIT Kharagpur • 2026",
    "bio": "M.Tech student in Computer Science & Engineering at the Indian Institute of Technology Kharagpur, specializing in High-Performance Computing, Distributed Systems, and Machine Learning.",
    "about": "Hi, I am Gaurab Samadder. I am currently pursuing my M.Tech in Computer Science & Engineering at the Indian Institute of Technology, Kharagpur (IIT KGP). My technical and research interests lie in Distributed Systems, Systems Programming, Deep Learning, and Advanced Algorithms.\n\nAt IIT Kharagpur, I have been working on building scalable systems, optimizing computational workflows, and exploring neural architectures. Prior to joining IIT KGP, I completed my Bachelor of Technology in Computer Science & Engineering with distinction.",
    "location": "IIT Kharagpur, West Bengal, India",
    "email": "gaurabsamadder711826@iitkgp.ac.in",
    "phone": "+91 75959 23688",
    "avatar": "image/avatar.jpg",
    "aboutImage": "image/about.jpg",
    "banner": "image/banner.jpg",
    "labImage": "image/research.jpg",
    "resumeUrl": "assets/resume.pdf",
    "resumePdfName": "Gaurab_Samadder_IITKGP_Resume.pdf"
  },
  "socials": [
    { "platform": "GitHub", "icon": "github", "url": "https://github.com" },
    { "platform": "LinkedIn", "icon": "linkedin", "url": "https://linkedin.com" },
    { "platform": "LeetCode", "icon": "code", "url": "https://leetcode.com" },
    { "platform": "Email", "icon": "mail", "url": "mailto:gaurab.samadder@iitkgp.ac.in" }
  ],
  "stats": [],
  "skills": [
    {
      "category": "Systems & Programming",
      "items": [
        { "name": "C++", "icon": "cpp" },
        { "name": "C", "icon": "c" },
        { "name": "Python", "icon": "python" },
        { "name": "Java", "icon": "java" },
        { "name": "VS Code", "icon": "vscode" },
        { "name": "Google Colab", "icon": "colab" },
        { "name": "Windows", "icon": "windows" },
        { "name": "Linux", "icon": "linux" },
        { "name": "Distributed Systems & Raft", "icon": "systems" },
        { "name": "Data Structures & Algorithms", "icon": "algo" }
      ]
    },
    {
      "category": "AI & Machine Learning",
      "items": [
        { "name": "PyTorch", "icon": "pytorch" },
        { "name": "OpenCV", "icon": "opencv" },
        { "name": "NumPy", "icon": "numpy" },
        { "name": "Pandas", "icon": "pandas" },
        { "name": "Transformers", "icon": "ai" },
        { "name": "Kaggle", "icon": "kaggle" },
        { "name": "Matplotlib", "icon": "matplotlib" },
        { "name": "CUDA GPU Programming", "icon": "cuda" },
        { "name": "Scikit-Learn", "icon": "scikit" }
      ]
    },
    {
      "category": "Databases, Web & Cloud",
      "items": [
        { "name": "GitHub", "icon": "github" },
        { "name": "HTML", "icon": "html" },
        { "name": "CSS", "icon": "css" },
        { "name": "Vercel", "icon": "vercel" },
        { "name": "MySQL", "icon": "mysql" },
        { "name": "SQL & PostgreSQL", "icon": "postgres" },
        { "name": "Firebase", "icon": "firebase" },
        { "name": "Docker", "icon": "docker" },
        { "name": "Full-Stack Development", "icon": "fullstack" }
      ]
    }
  ],
  "projects": [
    {
      "id": "proj-1",
      "title": "Distributed Fault-Tolerant Key-Value Store",
      "category": "Systems",
      "description": "High-throughput distributed storage engine in C++ implementing the Raft consensus algorithm with leader election, log compaction, snapshotting, and write-ahead logging.",
      "tags": ["C++20", "Raft Consensus", "gRPC", "Multi-Threading", "Distributed Systems"],
      "image": "image/research.jpg",
      "liveUrl": "https://github.com",
      "githubUrl": "https://github.com",
      "featured": true
    },
    {
      "id": "proj-2",
      "title": "CUDA GPU Tensor Acceleration Engine",
      "category": "AI / HPC",
      "description": "Custom GPU kernels in CUDA utilizing shared memory tiling and warp-level primitives to accelerate large-scale matrix operations, achieving 3.8x speedup over standard baseline CPU executions.",
      "tags": ["CUDA", "C++", "PyTorch C++ API", "GPU Optimization", "HPC"],
      "image": "image/avatar.jpg",
      "liveUrl": "https://github.com",
      "githubUrl": "https://github.com",
      "featured": true
    },
    {
      "id": "proj-3",
      "title": "Custom Linux Kernel CPU Scheduler",
      "category": "Systems",
      "description": "Engineered a multi-level priority CPU scheduler inside the Linux Kernel (v5.15) with automated starvation prevention, dynamic task weighting, and eBPF tracing.",
      "tags": ["C", "Linux Kernel", "Operating Systems", "Kernel Modules", "gdb"],
      "image": "image/banner.jpg",
      "liveUrl": "https://github.com",
      "githubUrl": "https://github.com",
      "featured": true
    },
    {
      "id": "proj-4",
      "title": "Parallel Graph Analytics Engine with OpenMP",
      "category": "Algorithms",
      "description": "High-performance multi-threaded graph analytics pipeline computing PageRank and Betweenness Centrality on graphs with 10M+ edges in under 4 seconds.",
      "tags": ["Modern C++", "OpenMP", "SIMD", "Graph Algorithms", "Data Structures"],
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "liveUrl": "https://github.com",
      "githubUrl": "https://github.com",
      "featured": false
    }
  ],
  "experiences": [
    {
      "id": "exp-1",
      "role": "Graduate Teaching Assistant (TA)",
      "company": "Department of Computer Science & Engineering, IIT Kharagpur",
      "period": "2024 - Present",
      "location": "Kharagpur, India",
      "description": "Mentoring a cohort of 120+ undergraduate students in Algorithms and Operating Systems laboratory sessions, designing coding assessments, and evaluating system programming assignments."
    },
    {
      "id": "exp-2",
      "role": "M.Tech Researcher",
      "company": "Dept. of CSE, Indian Institute of Technology, Kharagpur",
      "period": "2023 - Present",
      "location": "Kharagpur, India",
      "description": "Conducting master's research focusing on scalable systems, distributed computation, and applied machine learning models."
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "degree": "Master of Technology (M.Tech) in Computer Science & Engineering",
      "institution": "Indian Institute of Technology, Kharagpur (IIT KGP)",
      "period": "2026 - 2028 (Expected)",
      "location": "Kharagpur, West Bengal",
      "description": "Department of Computer Science & Engineering. Core Coursework: Advanced Algorithms, Distributed Systems, High Performance Computer Architecture, Deep Learning, Foundation of Cryptography."
    },
    {
      "id": "edu-2",
      "degree": "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
      "institution": "Engineering Institute / University",
      "period": "2019 - 2023",
      "location": "India",
      "description": "Graduated with First Class with Distinction. Strong foundation in Data Structures, Algorithms, Computer Architecture, Mathematics, and Database Systems. Qualified GATE CS with top rank."
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "name": "Graduate Aptitude Test in Engineering (GATE Computer Science)",
      "issuer": "IIT / Ministry of Education, India",
      "date": "2023",
      "url": "https://gate.iitk.ac.in/"
    },
    {
      "id": "cert-2",
      "name": "Deep Learning & Neural Networks Specialization",
      "issuer": "Coursera / DeepLearning.AI",
      "date": "2023",
      "url": "https://coursera.org"
    }
  ],
  "showPublications": true,
  "publications": [
    {
      "id": "pub-1",
      "title": "Optimizing Consensus and Tail Latency in Geographically Distributed Raft Clusters",
      "authors": "Gaurab Samadder, Research Collaborators",
      "venue": "IEEE / ACM Conference on High Performance Computing & Distributed Systems",
      "year": "2026",
      "type": "Conference Paper",
      "badge": "Accepted / In Proceedings",
      "paperUrl": "",
      "codeUrl": "https://github.com",
      "abstract": "Investigating pipelined log replication, asynchronous quorum acknowledgments, and low-latency transport primitives to reduce tail latencies in distributed storage engines across wide-area network topologies."
    }
  ],
  "admin": {
    "pinHash": "049bf09618bfef6306ad1d890fb2639473c67f0343d7cb17fa06d3754cd0f784"
  }
};

const STORAGE_KEY = 'portfolio_profile_data';
const GITHUB_CONFIG_KEY = 'portfolio_gh_config';

/**
 * Cryptographic SHA-256 PIN hashing with salt
 */
async function hashPin(pin) {
  try {
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode('kgp_portfolio_salt:' + String(pin).trim());
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {
    console.warn("crypto.subtle unavailable, using fallback hash", e);
  }
  let hash = 0;
  const str = 'kgp_portfolio_salt:' + String(pin).trim();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

/**
 * Loads profile data:
 * Prioritizes fresh fetch from data/profile.json so all browsers stay in sync.
 * Works seamlessly across both http:// and file:// protocols.
 */
async function loadProfileData() {
  let localJson = null;
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    try {
      localJson = JSON.parse(localData);
    } catch (e) {
      console.warn("Failed to parse local storage data", e);
    }
  }

  const cacheBust = Date.now();
  let serverUrls = [
    `data/profile.json?t=${cacheBust}`,
    `/new%20profile/data/profile.json?t=${cacheBust}`,
    `/data/profile.json?t=${cacheBust}`
  ];

  if (window.location.protocol === 'file:') {
    serverUrls = [
      `data/profile.json?t=${cacheBust}`,
      `http://localhost:8000/new%20profile/data/profile.json?t=${cacheBust}`,
      `http://127.0.0.1:8000/new%20profile/data/profile.json?t=${cacheBust}`
    ];
  }

  for (const url of serverUrls) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        const localTs = localJson && localJson._updatedAt ? Number(localJson._updatedAt) : 0;
        const serverTs = json && json._updatedAt ? Number(json._updatedAt) : 0;
        if (localJson && localTs > serverTs) {
          return localJson;
        }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
        } catch (e) {}
        return json;
      }
    } catch (err) {
      // continue to next fallback
    }
  }

  if (localJson) {
    return localJson;
  }

  return DEFAULT_PROFILE_DATA;
}

/**
 * Saves profile data:
 * Saves directly to local server API (POST /api/save-profile) if running,
 * and updates localStorage.
 */
async function saveProfileData(data) {
  if (data && typeof data === 'object') {
    data._updatedAt = Date.now();
  }
  let savedToServer = false;
  let apiUrls = ['/api/save-profile'];

  if (window.location.protocol === 'file:') {
    apiUrls = [
      'http://localhost:8000/api/save-profile',
      'http://127.0.0.1:8000/api/save-profile'
    ];
  }

  for (const url of apiUrls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        savedToServer = true;
        break;
      }
    } catch (err) {
      // continue
    }
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2));
  } catch (e) {
    console.warn("localStorage quota exceeded or unavailable:", e);
  }

  return { savedToServer };
}

/**
 * Uploads CV file to the local server if running, or returns data URI
 */
async function uploadCvFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target.result;

      let uploadUrls = ['/api/upload-cv'];
      if (window.location.protocol === 'file:') {
        uploadUrls = ['http://localhost:8000/api/upload-cv', 'http://127.0.0.1:8000/api/upload-cv'];
      }

      for (const uploadUrl of uploadUrls) {
        try {
          const res = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              data: base64Data
            })
          });
          if (res.ok) {
            const json = await res.json();
            resolve({
              url: json.url,
              filename: json.filename,
              isServerFile: true
            });
            return;
          }
        } catch (err) {
          // try next
        }
      }

      resolve({
        url: base64Data,
        filename: file.name,
        isServerFile: false
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Downscale and optimize an image client-side to standard web dimensions.
 * Ensures fast loading, smooth canvas manipulation, and prevents localStorage/network bloating.
 * @param {File|string} fileOrDataUrl - A File object or base64 data URL
 * @param {number} maxDim - Maximum width or height (e.g. 1200px)
 * @param {number} quality - JPEG compression quality (0.0 to 1.0, e.g. 0.88)
 * @returns {Promise<string>} Compressed JPEG Data URL
 */
async function resizeAndOptimizeImage(fileOrDataUrl, maxDim = 1200, quality = 0.88) {
  return new Promise((resolve, reject) => {
    const processImageSource = (src) => {
      const img = new Image();
      if (src.startsWith('http://') || src.startsWith('https://')) {
        img.crossOrigin = 'Anonymous';
      }
      img.onload = () => {
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (!w || !h) {
          resolve(src);
          return;
        }

        // Calculate aspect-preserving dimensions within maxDim
        let targetW = w;
        let targetH = h;
        if (w > maxDim || h > maxDim) {
          if (w >= h) {
            targetW = maxDim;
            targetH = Math.round((h * maxDim) / w);
          } else {
            targetH = maxDim;
            targetW = Math.round((w * maxDim) / h);
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetW, targetH);

        try {
          const optimized = canvas.toDataURL('image/jpeg', quality);
          resolve(optimized);
        } catch (e) {
          console.warn('Canvas export fallback:', e);
          resolve(src);
        }
      };
      img.onerror = () => resolve(src);
      img.src = src;
    };

    if (fileOrDataUrl instanceof File || fileOrDataUrl instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (e) => processImageSource(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(fileOrDataUrl);
    } else if (typeof fileOrDataUrl === 'string') {
      processImageSource(fileOrDataUrl);
    } else {
      reject(new Error('Invalid image source'));
    }
  });
}

/**
 * Uploads an image to server.py (POST /api/upload-image) if available.
 * Automatically resizes & optimizes the image first.
 * Falls back to optimized data URL if running static / offline.
 * @param {File|string} fileOrDataUrl
 * @param {string} imageType - 'avatar' | 'banner' | 'labImage' | 'project'
 * @param {string} originalFilename
 * @returns {Promise<{url: string, cleanUrl: string, isServerFile: boolean}>}
 */
async function uploadImageFile(fileOrDataUrl, imageType = 'general', originalFilename = '') {
  let maxDim = 1200;
  if (imageType === 'avatar') maxDim = 800;
  else if (imageType === 'banner') maxDim = 1600;
  else if (imageType === 'labImage' || imageType === 'project') maxDim = 1200;

  // 1. Client-side downscale and compress
  const optimizedDataUrl = await resizeAndOptimizeImage(fileOrDataUrl, maxDim, 0.88);

  if (!optimizedDataUrl || !optimizedDataUrl.startsWith('data:image')) {
    return {
      url: optimizedDataUrl,
      cleanUrl: optimizedDataUrl,
      isServerFile: false
    };
  }

  // 2. Try uploading to local server if running
  let uploadUrls = ['/api/upload-image'];
  if (window.location.protocol === 'file:') {
    uploadUrls = [
      'http://localhost:8000/api/upload-image',
      'http://127.0.0.1:8000/api/upload-image'
    ];
  }

  const filename = originalFilename || `${imageType}.jpg`;

  for (const uploadUrl of uploadUrls) {
    try {
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: imageType,
          filename: filename,
          data: optimizedDataUrl
        })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.status === 'success' && json.url) {
          return {
            url: json.url,
            cleanUrl: json.cleanUrl || json.url.split('?')[0],
            isServerFile: true
          };
        }
      }
    } catch (err) {
      // try next or fall back
    }
  }

  // Fallback to optimized lightweight data URL
  return {
    url: optimizedDataUrl,
    cleanUrl: optimizedDataUrl,
    isServerFile: false
  };
}

function resetProfileDataLocally() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * HTML Escaping & URL Sanitization Security Utilities
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('assets/') ||
    trimmed.startsWith('data:image/')
  ) {
    return trimmed;
  }
  return '#';
}

/**
 * Supported Social Icons Collection
 */
const SUPPORTED_SOCIAL_PLATFORMS = [
  { id: 'github', name: 'GitHub' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'twitter', name: 'Twitter / X' },
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'telegram', name: 'Telegram' },
  { id: 'leetcode', name: 'LeetCode' },
  { id: 'email', name: 'Email' },
  { id: 'scholar', name: 'Google Scholar' },
  { id: 'discord', name: 'Discord' },
  { id: 'globe', name: 'Website / Portfolio' }
];

function getSocialIconSvg(platformOrIcon) {
  const p = (platformOrIcon || '').toLowerCase();
  if (p.includes('facebook') || p === 'fb') {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
  } else if (p.includes('instagram') || p.includes('insta')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;
  } else if (p.includes('whatsapp') || p.includes('wa')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
  } else if (p.includes('youtube') || p.includes('yt')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`;
  } else if (p.includes('telegram') || p.includes('tg')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
  } else if (p.includes('discord')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6h0a14.5 14.5 0 0 0-4-1.2 11 11 0 0 0-.4 1.2 13 13 0 0 0-3.2 0A11 11 0 0 0 10 4.8 14.5 14.5 0 0 0 6 6c-2.4 3.6-3 7.2-2.7 10.7a14.8 14.8 0 0 0 4.5 2.3c.4-.5.7-1 1-1.6a9.5 9.5 0 0 1-1.6-.8c.1-.1.3-.2.4-.3a10.5 10.5 0 0 0 9 0c.1.1.3.2.4.3-.5.3-1 .6-1.6.8.3.6.6 1.1 1 1.6a14.8 14.8 0 0 0 4.5-2.3C21 13.2 20.4 9.6 18 6z"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>`;
  } else if (p.includes('github')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
  } else if (p.includes('linkedin')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;
  } else if (p.includes('leetcode') || p.includes('code')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
  } else if (p.includes('scholar') || p.includes('academic')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`;
  } else if (p.includes('twitter') || p.includes('x')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
  } else if (p.includes('mail') || p.includes('email')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
  }
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
}

/**
 * Supported Skill Tech Icons Collection
 */
const SUPPORTED_SKILL_ICONS = [
  { id: 'cpp', label: 'C / C++' },
  { id: 'c', label: 'C Language' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'vscode', label: 'VS Code' },
  { id: 'colab', label: 'Google Colab' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux / OS' },
  { id: 'systems', label: 'Distributed Systems' },
  { id: 'algo', label: 'Algorithms & DSA' },
  { id: 'pytorch', label: 'PyTorch' },
  { id: 'tensorflow', label: 'TensorFlow' },
  { id: 'opencv', label: 'OpenCV' },
  { id: 'numpy', label: 'NumPy' },
  { id: 'pandas', label: 'Pandas' },
  { id: 'matplotlib', label: 'Matplotlib' },
  { id: 'kaggle', label: 'Kaggle' },
  { id: 'scikit', label: 'Scikit-Learn' },
  { id: 'ai', label: 'Transformers / AI' },
  { id: 'cuda', label: 'CUDA / GPU' },
  { id: 'golang', label: 'Go (Golang)' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'rust', label: 'Rust' },
  { id: 'html', label: 'HTML5' },
  { id: 'css', label: 'CSS3' },
  { id: 'react', label: 'React' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'fullstack', label: 'Full-Stack Dev' },
  { id: 'mysql', label: 'MySQL' },
  { id: 'postgres', label: 'PostgreSQL / SQL' },
  { id: 'redis', label: 'Redis' },
  { id: 'mongodb', label: 'MongoDB' },
  { id: 'firebase', label: 'Firebase' },
  { id: 'vercel', label: 'Vercel' },
  { id: 'github', label: 'GitHub' },
  { id: 'docker', label: 'Docker' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'git', label: 'Git / CI-CD' },
  { id: 'aws', label: 'AWS / Cloud' },
  { id: 'code', label: 'General Code' }
];

function getSkillLogoHtml(iconKey, skillName = '') {
  const k = (iconKey || '').toLowerCase();
  const n = (skillName || '').toLowerCase();
  const devicon = (slug, variant = 'original') =>
    `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-${variant}.svg" alt="${slug}" onerror="this.outerHTML='<svg viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><polyline points=\\'16 18 22 12 16 6\\'/><polyline points=\\'8 6 2 12 8 18\\'/></svg>'" />`;

  if (k === 'cpp' || (!k && (n.includes('c++') || n.includes('modern c')))) return devicon('cplusplus');
  if (k === 'c' || (!k && (n === 'c' || n.startsWith('c ') || n.includes('c /')))) return devicon('c');
  if (k === 'vscode' || (!k && (n.includes('vs code') || n.includes('vscode')))) return devicon('vscode');
  if (k === 'windows' || (!k && n.includes('windows'))) return devicon('windows8');
  if (k === 'pytorch' || (!k && n.includes('pytorch'))) return devicon('pytorch');
  if (k === 'python' || (!k && n.includes('python'))) return devicon('python');
  if (k === 'tensorflow' || (!k && n.includes('tensorflow'))) return devicon('tensorflow');
  if (k === 'numpy' || (!k && n.includes('numpy'))) return devicon('numpy');
  if (k === 'pandas' || (!k && n.includes('pandas'))) return devicon('pandas');
  if (k === 'matplotlib' || (!k && n.includes('matplotlib'))) return devicon('matplotlib');
  if (k === 'kaggle' || (!k && n.includes('kaggle'))) return devicon('kaggle');
  if (k === 'scikit' || (!k && n.includes('scikit'))) return devicon('scikitlearn');
  if (k === 'opencv' || (!k && n.includes('opencv'))) return devicon('opencv');
  if (k === 'docker' || (!k && n.includes('docker'))) return devicon('docker');
  if (k === 'kubernetes' || (!k && n.includes('kubernetes'))) return devicon('kubernetes', 'plain');
  if (k === 'linux' || (!k && (n.includes('linux') || n.includes('operating')))) return devicon('linux');
  if (k === 'golang' || (!k && (n.includes('golang') || n.includes('go ')))) return devicon('go');
  if (k === 'java' || (!k && n.includes('java') && !n.includes('javascript'))) return devicon('java');
  if (k === 'javascript' || (!k && n.includes('javascript'))) return devicon('javascript');
  if (k === 'typescript' || (!k && n.includes('typescript'))) return devicon('typescript');
  if (k === 'rust' || (!k && n.includes('rust'))) return devicon('rust');
  if (k === 'mysql' || (!k && n.includes('mysql'))) return devicon('mysql');
  if (k === 'postgres' || k === 'database' || (!k && n.includes('postgres'))) return devicon('postgresql');
  if (k === 'redis' || (!k && n.includes('redis'))) return devicon('redis');
  if (k === 'mongodb' || (!k && n.includes('mongodb'))) return devicon('mongodb');
  if (k === 'firebase' || (!k && n.includes('firebase'))) return devicon('firebase', 'plain');
  if (k === 'git' || (!k && n.includes('git') && !n.includes('github'))) return devicon('git');
  if (k === 'react' || k === 'web' || (!k && n.includes('react'))) return devicon('react');
  if (k === 'nodejs' || (!k && n.includes('node'))) return devicon('nodejs');
  if (k === 'html' || (!k && n.includes('html'))) return devicon('html5');
  if (k === 'css' || (!k && n.includes('css'))) return devicon('css3');
  if (k === 'aws' || k === 'cloud' || (!k && n.includes('aws'))) return devicon('amazonwebservices', 'original-wordmark');

  if (k === 'github' || (!k && n.includes('github'))) {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.27a11 11 0 0 0-3.48 21.46c.55.1.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.26-1.21-1.6-1.21-1.6-.99-.68.07-.66.07-.66 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.42-.27-4.96-1.21-4.96-5.4 0-1.19.42-2.16 1.12-2.93-.11-.28-.49-1.39.11-2.89 0 0 .92-.3 3 1.12a10.4 10.4 0 0 1 5.5 0c2.08-1.42 3-1.12 3-1.12.6 1.5.22 2.61.11 2.89.7.77 1.12 1.74 1.12 2.93 0 4.2-2.55 5.12-4.98 5.39.39.34.74 1.01.74 2.04v3.02c0 .29.19.63.74.53A11 11 0 0 0 12 1.27z"/></svg>`;
  }
  if (k === 'vercel' || (!k && n.includes('vercel'))) {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 20h20L12 3z"/></svg>`;
  }
  if (k === 'colab' || (!k && n.includes('colab'))) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8.5 16.5a4.5 4.5 0 1 1 0-9c1.6 0 3 .8 3.5 2 .5-1.2 1.9-2 3.5-2a4.5 4.5 0 1 1 0 9c-1.6 0-3-.8-3.5-2-.5 1.2-1.9 2-3.5 2z"/></svg>`;
  }
  if (k === 'fullstack' || (!k && n.includes('full-stack'))) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>`;
  }
  if (k === 'systems' || (!k && (n.includes('raft') || n.includes('distributed')))) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M10.8 7.2 6.2 16.8M13.2 7.2l4.6 9.6M7.5 19h9"/></svg>`;
  }
  if (k === 'algo' || (!k && (n.includes('algorithm') || n.includes('data structure')))) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="4"/><rect x="3" y="17" width="6" height="4"/><rect x="15" y="17" width="6" height="4"/><path d="M12 7v5M6 17v-5h12v5"/></svg>`;
  }
  if (k === 'cuda' || (!k && (n.includes('cuda') || n.includes('gpu')))) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>`;
  }
  if (k === 'ai' || (!k && (n.includes('deep learning') || n.includes('transformer') || n.includes('neural')))) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="7" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="7" r="2"/><circle cx="19" cy="17" r="2"/><path d="M7 8l3.3 2.7M7 16l3.3-2.7M13.7 10.7 17 8M13.7 13.3 17 16"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
}
