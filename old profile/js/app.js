// js/app.js - Public Portfolio Application Logic

let currentAppProfile = null;

document.addEventListener('DOMContentLoaded', async () => {
  try { initTheme(); } catch (e) { console.error('Error in initTheme:', e); }
  try { initMobileMenu(); } catch (e) { console.error('Error in initMobileMenu:', e); }
  
  // Load data (Always prioritized from server data/profile.json so all browsers are synced)
  try {
    currentAppProfile = await loadProfileData();
    renderProfile(currentAppProfile);
  } catch (e) {
    console.error('Error loading or rendering profile:', e);
  }

  try { initCrossBrowserSync(); } catch (e) { console.error('Error in initCrossBrowserSync:', e); }
});

/**
 * Cross-Browser Live Synchronization (Edge <-> Chrome <-> Firefox)
 */
function initCrossBrowserSync() {
  // Sync immediately when switching tabs or focusing window
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
      const fresh = await loadProfileData();
      renderProfile(fresh);
    }
  });

  window.addEventListener('focus', async () => {
    const fresh = await loadProfileData();
    renderProfile(fresh);
  });

  // Background live poll during local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
    let lastMtime = 0;
    setInterval(async () => {
      try {
        const fresh = await loadProfileData();
        renderProfile(fresh);
      } catch (e) {}
    }, 3000);
  }
}

/**
 * Theme Management (Dark / Light)
 */
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  themeToggle.innerHTML = theme === 'dark' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

/**
 * Mobile Navigation Menu
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/**
 * Helper: Converts Base64 Data URL to Blob for clean downloads
 */
function base64ToBlob(base64Data, contentType = 'application/pdf') {
  const parts = base64Data.split(';base64,');
  const raw = window.atob(parts[1] || parts[0]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}

/**
 * Configure CV / Resume buttons (Navbar and Hero)
 */
function setupResumeButtons(resumeUrl, filename = 'Resume.pdf') {
  const buttons = document.querySelectorAll('.cv-trigger-btn');
  buttons.forEach(btn => {
    btn.onclick = (e) => {
      if (!resumeUrl || resumeUrl === '#') {
        e.preventDefault();
        alert('Resume not uploaded yet! You can upload or link your CV inside the Admin Portal (/admin.html).');
        return;
      }

      // If Base64 Data URL, download as Blob to avoid browser popup/navigation restrictions
      if (resumeUrl.startsWith('data:')) {
        e.preventDefault();
        try {
          const blob = base64ToBlob(resumeUrl, 'application/pdf');
          const blobUrl = URL.createObjectURL(blob);
          const tempLink = document.createElement('a');
          tempLink.href = blobUrl;
          tempLink.download = filename || 'Resume.pdf';
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        } catch (err) {
          console.error("Failed to download base64 resume:", err);
          window.open(resumeUrl, '_blank');
        }
        return;
      }

      // Regular URL or relative file path (e.g. assets/resume.pdf)
      btn.href = resumeUrl;
      btn.target = '_blank';
      if (filename) {
        btn.setAttribute('download', filename);
      }
    };
  });
}

/**
 * Main Profile Renderer
 */
function renderProfile(data) {
  if (!data) return;

  const { personal, socials, stats, skills, projects, experiences, education, certifications } = data;

  // Title & Basic Info
  document.title = `${personal.name} | ${personal.headline}`;
  
  // Logos & Brand
  setText('navLogoBadge', personal.logoBadge || 'GS');
  setText('navLogoName', personal.name || 'Gaurab Samadder');
  setText('heroName', personal.name);
  setText('heroHeadline', personal.headline);
  setText('heroBio', personal.bio);
  setText('heroStatus', personal.status || 'Available for opportunities');

  // Avatar & Large Banner Images (update immediately when URL/timestamp changes, without flicker)
  const setImgIfChanged = (el, src, alt) => {
    if (!el || !src) return;
    if (el.getAttribute('src') !== src) {
      el.setAttribute('src', src);
    }
    if (alt) el.alt = alt;
  };
  setImgIfChanged(document.getElementById('heroAvatar'), personal.avatar, personal.name);
  setImgIfChanged(document.getElementById('heroBannerImg'), personal.banner, personal.name);
  setImgIfChanged(document.getElementById('aboutPortraitImg'), personal.aboutImage || personal.avatar, personal.name);
  setImgIfChanged(document.getElementById('spotlightLabImg'), personal.labImage, 'Research Lab');

  // Social Links
  try { renderSocials(socials); } catch (e) { console.error('Error rendering socials:', e); }

  // Resume buttons setup
  try {
    setupResumeButtons(personal.resumeUrl, personal.resumePdfName || `${personal.name.replace(/\s+/g, '_')}_Resume.pdf`);
  } catch (e) {
    console.error('Error setting up resume buttons:', e);
  }

  // About Section
  setText('aboutName', personal.name);
  setText('aboutText', personal.about || personal.bio);
  setText('aboutLocation', personal.location || 'Remote');
  setText('aboutEmail', personal.email || 'hello@example.com');
  const emailLink = document.getElementById('aboutEmailLink');
  if (emailLink && personal.email) {
    emailLink.href = `mailto:${personal.email}`;
  }

  // Phone
  setText('aboutPhone', personal.phone || '');
  const phoneLink = document.getElementById('aboutPhoneLink');
  const phoneContainer = document.getElementById('aboutPhoneContainer');
  if (phoneLink && personal.phone) {
    phoneLink.href = `tel:${personal.phone.replace(/[^0-9+]/g, '')}`;
    if (phoneContainer) phoneContainer.style.display = 'flex';
  } else if (phoneContainer && !personal.phone) {
    phoneContainer.style.display = 'none';
  }

  // Skills Section
  try { renderSkills(skills); } catch (e) { console.error('Error rendering skills:', e); }

  // Projects Section
  try { renderProjects(projects); } catch (e) { console.error('Error rendering projects:', e); }

  // Experience & Education Timeline
  try { renderExperience(experiences); } catch (e) { console.error('Error rendering experiences:', e); }
  try { renderEducation(education); } catch (e) { console.error('Error rendering education:', e); }

  // Certifications
  try { renderCertifications(certifications); } catch (e) { console.error('Error rendering certifications:', e); }

  // Publications Section
  try {
    renderPublications(data.publications, data.showPublications);
  } catch (e) {
    console.error('Error rendering publications:', e);
  }

  // Contact Section
  setText('contactName', personal.name);
  const contactEmailBtn = document.getElementById('contactEmailBtn');
  if (contactEmailBtn && personal.email) {
    contactEmailBtn.href = `mailto:${personal.email}?subject=Hello%20${encodeURIComponent(personal.name)}%20-%20Project%20Inquiry`;
  }

  // Footer
  setText('footerName', personal.name);
  setText('footerYear', new Date().getFullYear());
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) {
    el.textContent = text;
  }
}

function renderSocials(socials = []) {
  const container = document.getElementById('heroSocials');
  if (!container) return;
  container.innerHTML = socials.map(s => `
    <a href="${sanitizeUrl(s.url)}" target="_blank" rel="noopener noreferrer" class="social-link" title="${escapeHtml(s.platform)}">
      ${getSocialIconSvg(s.icon || s.platform)}
    </a>
  `).join('');
}

function renderSkills(skills = []) {
  const container = document.getElementById('skillsGrid');
  if (!container) return;
  container.innerHTML = skills.map(cat => `
    <div class="skill-category-card">
      <h3 class="category-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        ${escapeHtml(cat.category)}
      </h3>
      <div class="skill-items-container">
        ${(cat.items || []).map(skill => `
          <div class="skill-row">
            <div class="skill-info">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="skill-badge-icon" style="font-size: 1.05rem; line-height: 1;">${getSkillBadgeIcon(skill.icon, skill.name)}</span>
                <span style="font-weight: 500;">${escapeHtml(skill.name)}</span>
              </div>
              <span style="font-weight: 600; color: var(--accent-light); font-size: 0.85rem;">${escapeHtml(skill.level)}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" style="width: ${Math.min(100, Math.max(0, Number(skill.level) || 0))}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

let activeProjectsList = [];
function renderProjects(projects = []) {
  activeProjectsList = projects;
  const container = document.getElementById('projectsGrid');
  const filtersContainer = document.getElementById('projectFilters');
  if (!container) return;

  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
  
  if (filtersContainer) {
    filtersContainer.innerHTML = categories.map((cat, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-category="${escapeHtml(cat)}">
        ${escapeHtml(cat)}
      </button>
    `).join('');

    filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjectsGrid(btn.getAttribute('data-category'));
      });
    });
  }

  filterProjectsGrid('All');
}

function filterProjectsGrid(category) {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  const filtered = category === 'All' 
    ? activeProjectsList 
    : activeProjectsList.filter(p => p.category === category);

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 40px;">No projects found in this category.</div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="project-card">
      <div class="project-thumb-box">
        <img class="project-thumb" src="${sanitizeUrl(p.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80')}" alt="${escapeHtml(p.title)}" loading="lazy" />
        ${p.category ? `<span class="project-badge">${escapeHtml(p.category)}</span>` : ''}
      </div>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(p.title)}</h3>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-tags">
          ${(p.tags || []).map(t => `<span class="tag-pill">${escapeHtml(t)}</span>`).join('')}
        </div>
        <div class="project-links">
          ${p.liveUrl ? `<a href="${sanitizeUrl(p.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Demo</a>` : ''}
          ${p.githubUrl ? `<a href="${sanitizeUrl(p.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">GitHub</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderExperience(experiences = []) {
  const container = document.getElementById('experienceList');
  if (!container) return;
  container.innerHTML = experiences.map(exp => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-period">${escapeHtml(exp.period)}</div>
        <div class="timeline-role">${escapeHtml(exp.role)}</div>
        <div class="timeline-company">${escapeHtml(exp.company)} ${exp.location ? `• ${escapeHtml(exp.location)}` : ''}</div>
        <p class="timeline-desc">${escapeHtml(exp.description)}</p>
      </div>
    </div>
  `).join('');
}

function renderEducation(education = []) {
  const container = document.getElementById('educationList');
  if (!container) return;
  container.innerHTML = education.map(edu => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-period">${escapeHtml(edu.period)}</div>
        <div class="timeline-role">${escapeHtml(edu.degree)}</div>
        <div class="timeline-company">${escapeHtml(edu.institution)} ${edu.location ? `• ${escapeHtml(edu.location)}` : ''}</div>
        <p class="timeline-desc">${escapeHtml(edu.description)}</p>
      </div>
    </div>
  `).join('');
}

function renderCertifications(certs = []) {
  const container = document.getElementById('certificationsList');
  if (!container || !certs.length) return;
  container.innerHTML = certs.map(c => `
    <a href="${sanitizeUrl(c.url || '#')}" target="_blank" rel="noopener noreferrer" class="cert-card">
      <div class="cert-info">
        <h4>${escapeHtml(c.name)}</h4>
        <p>${escapeHtml(c.issuer)} • ${escapeHtml(c.date)}</p>
      </div>
      <div class="cert-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </div>
    </a>
  `).join('');
}

/**
 * Render Publications Section & Handle Show/Hide Visibility
 */
function renderPublications(publications = [], showPublications = true) {
  const section = document.getElementById('publications');
  const navItem = document.getElementById('navPublicationsItem');

  // If user toggled show/hide to false, hide section and navbar link
  if (showPublications === false) {
    if (section) section.style.display = 'none';
    if (navItem) navItem.style.display = 'none';
    return;
  }

  // Otherwise, make sure both are visible
  if (section) section.style.display = '';
  if (navItem) navItem.style.display = '';

  const grid = document.getElementById('publicationsGrid');
  if (!grid) return;

  if (!publications || publications.length === 0) {
    grid.innerHTML = `
      <div class="publication-card" style="text-align: center; padding: 40px 20px;">
        <h4 style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 8px;">No Publications Listed Yet</h4>
        <p style="color: var(--text-light); font-size: 0.9rem;">
          Research manuscripts and papers are currently under review or can be added in the Admin Portal.
        </p>
      </div>
    `;
    return;
  }

  grid.innerHTML = publications.map(pub => {
    const typeClass = (pub.type || '').toLowerCase().includes('journal') ? 'journal' :
                      (pub.type || '').toLowerCase().includes('preprint') ? 'preprint' : '';
    
    // Check for paper and code buttons
    const paperBtn = pub.paperUrl && pub.paperUrl !== '#' && pub.paperUrl.trim() !== ''
      ? `<a href="${sanitizeUrl(pub.paperUrl)}" target="_blank" rel="noopener noreferrer" class="pub-btn pub-btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Read Paper
        </a>`
      : '';

    const codeBtn = pub.codeUrl && pub.codeUrl !== '#' && pub.codeUrl.trim() !== ''
      ? `<a href="${sanitizeUrl(pub.codeUrl)}" target="_blank" rel="noopener noreferrer" class="pub-btn pub-btn-outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          Source Code
        </a>`
      : '';

    // Bold user's name in authors list if present
    const rawAuthors = escapeHtml(pub.authors || '');
    const formattedAuthors = rawAuthors.replace(/Gaurab Samadder/gi, '<strong>Gaurab Samadder</strong>');

    return `
      <article class="publication-card">
        <div class="publication-top-meta">
          <div class="publication-badges">
            <span class="pub-type-badge ${typeClass}">${escapeHtml(pub.type || 'Conference')}</span>
            ${pub.badge ? `<span class="tag-pill" style="font-size: 0.72rem; color: var(--accent-light); border-color: rgba(245, 158, 11, 0.3);">${escapeHtml(pub.badge)}</span>` : ''}
          </div>
          <span class="pub-year-badge">${escapeHtml(pub.year || '2026')}</span>
        </div>

        <h3 class="publication-title">${escapeHtml(pub.title || 'Untitled Paper')}</h3>
        <p class="publication-authors">${formattedAuthors}</p>
        <div class="publication-venue">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${escapeHtml(pub.venue || 'Academic Conference / Journal')}</span>
        </div>

        ${pub.abstract ? `<p class="publication-abstract">${escapeHtml(pub.abstract)}</p>` : ''}

        ${(paperBtn || codeBtn) ? `<div class="publication-actions">${paperBtn}${codeBtn}</div>` : ''}
      </article>
    `;
  }).join('');
}
