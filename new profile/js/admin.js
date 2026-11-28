// js/admin.js - Admin Portal Logic & Cross-Browser Synchronization

let currentProfile = null;
let currentProjectEditId = null;

document.addEventListener('DOMContentLoaded', async () => {
  currentProfile = await loadProfileData();
  
  try { checkServerConnection(); } catch (e) { console.error('checkServerConnection error:', e); }
  try { initAuthGate(); } catch (e) { console.error('initAuthGate error:', e); }
  try { initTabNavigation(); } catch (e) { console.error('initTabNavigation error:', e); }
  try { initPhotoCropper(); } catch (e) { console.error('initPhotoCropper error:', e); }
  try { initForms(); } catch (e) { console.error('initForms error:', e); }
  try { initGitHubSync(); } catch (e) { console.error('initGitHubSync error:', e); }
});

/**
 * Check if python local server is running
 */
async function checkServerConnection() {
  const badge = document.getElementById('serverStatusBadge');
  if (!badge) return;

  const endpoints = ['/api/status', 'http://localhost:8000/api/status', 'http://127.0.0.1:8000/api/status'];
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, { cache: 'no-store' });
      if (res.ok) {
        badge.textContent = '🟢 Local Server Active (Direct Disk Save)';
        badge.style.color = '#10b981';
        badge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        badge.style.background = 'rgba(16, 185, 129, 0.15)';
        return;
      }
    } catch (e) {
      // try next
    }
  }

  badge.textContent = '🌐 Static / GitHub Pages Mode';
  badge.style.color = '#818cf8';
  badge.style.borderColor = 'rgba(129, 140, 248, 0.4)';
  badge.style.background = 'rgba(129, 140, 248, 0.15)';
}

/**
 * Toast Notifications
 */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : '⚠️'}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = '0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Authentication Gate
 */
function initAuthGate() {
  const gate = document.getElementById('authGate');
  const pinInput = document.getElementById('adminPinInput');
  const loginBtn = document.getElementById('adminLoginBtn');
  const authError = document.getElementById('authError');
  const logoutBtn = document.getElementById('logoutBtn');

  const isAuthenticated = sessionStorage.getItem('portfolio_admin_auth') === 'true';
  if (isAuthenticated && gate) {
    gate.style.display = 'none';
  }

  async function handleLogin() {
    const inputPin = (pinInput.value || '').trim();
    if (!inputPin) return;

    const inputHash = await hashPin(inputPin);
    const expectedHash = (currentProfile.admin && currentProfile.admin.pinHash)
      ? currentProfile.admin.pinHash
      : '049bf09618bfef6306ad1d890fb2639473c67f0343d7cb17fa06d3754cd0f784';
    const legacyPin = (currentProfile.admin && currentProfile.admin.pin) ? String(currentProfile.admin.pin) : null;

    if (inputHash === expectedHash || (legacyPin && inputPin === legacyPin)) {
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      gate.style.display = 'none';
      if (authError) authError.style.display = 'none';
      showToast('Logged in successfully!');
    } else {
      if (authError) {
        authError.style.display = 'block';
        authError.textContent = 'Incorrect security PIN. Access denied.';
      }
    }
  }

  if (loginBtn) loginBtn.addEventListener('click', handleLogin);
  if (pinInput) {
    pinInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('portfolio_admin_auth');
      window.location.reload();
    });
  }
}

/**
 * Tab Navigation
 */
function initTabNavigation() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${tabTarget}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/**
 * Initialize and populate all forms
 */
function initForms() {
  try { populatePersonalForm(); } catch (e) { console.error('populatePersonalForm error:', e); }
  try { populateSocials(); } catch (e) { console.error('populateSocials error:', e); }
  try { populateSkillsManager(); } catch (e) { console.error('populateSkillsManager error:', e); }
  try { populateProjectsManager(); } catch (e) { console.error('populateProjectsManager error:', e); }
  try { populatePublicationsManager(); } catch (e) { console.error('populatePublicationsManager error:', e); }
  try { populateExperienceManager(); } catch (e) { console.error('populateExperienceManager error:', e); }
  try { populateEducationManager(); } catch (e) { console.error('populateEducationManager error:', e); }
  try { populateCertificationsManager(); } catch (e) { console.error('populateCertificationsManager error:', e); }
  try { populateResumeManager(); } catch (e) { console.error('populateResumeManager error:', e); }
  try { populateSettingsManager(); } catch (e) { console.error('populateSettingsManager error:', e); }

  // Save All Changes button
  const quickSaveBtn = document.getElementById('quickSaveBtn');
  if (quickSaveBtn) {
    quickSaveBtn.addEventListener('click', async () => {
      quickSaveBtn.disabled = true;
      quickSaveBtn.textContent = 'Saving...';

      const result = await saveProfileData(currentProfile);

      quickSaveBtn.disabled = false;
      quickSaveBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        Save All Changes
      `;

      if (result.savedToServer) {
        showToast('Saved to data/profile.json! All browsers and devices will see this immediately.');
      } else {
        const ghCfg = JSON.parse(localStorage.getItem(GITHUB_CONFIG_KEY) || '{}');
        if (ghCfg.token && ghCfg.repo) {
          try {
            await commitDataToGitHub(ghCfg.token, ghCfg.repo, ghCfg.branch || 'main', ghCfg.path || 'data/profile.json', currentProfile);
            showToast('Published to GitHub! Other devices will see this in ~1 minute.');
          } catch (ghErr) {
            console.warn('Auto GitHub sync failed:', ghErr);
            showToast('Saved in this browser only. GitHub auto-sync failed — check your token in GitHub Sync & Backup.', 'error');
          }
        } else {
          showToast('Saved in this browser only. Add your GitHub Token once in "GitHub Sync & Backup" to sync across all devices!');
        }
      }
    });
  }
}

/**
 * Debounced Auto-Save to Local Disk & Storage (guarantees cross-browser sync)
 */
let autoSaveDebounceTimer = null;
function triggerAutoSave() {
  clearTimeout(autoSaveDebounceTimer);
  autoSaveDebounceTimer = setTimeout(async () => {
    try {
      await saveProfileData(currentProfile);
    } catch (e) {
      console.warn('Auto-save error:', e);
    }
  }, 600);
}

/**
 * 1. Personal & Photo Management
 */
function populatePersonalForm() {
  const p = currentProfile.personal || {};

  setValue('inputName', p.name);
  setValue('inputLogoBadge', p.logoBadge || 'GS');
  setValue('inputHeadline', p.headline);
  setValue('inputStatus', p.status);
  setValue('inputBio', p.bio);
  setValue('inputAbout', p.about);
  setValue('inputLocation', p.location);
  setValue('inputEmail', p.email);
  setValue('inputOfficialEmail', p.officialEmail || '');
  setValue('inputPhone', p.phone);
  setValue('inputAvatarUrl', p.avatar);
  setValue('inputAboutImageUrl', p.aboutImage || p.avatar);
  setValue('inputBannerUrl', p.banner);
  setValue('inputLabImageUrl', p.labImage || 'image/research.jpg');

  updateImagePreview('avatarPreview', p.avatar);
  updateImagePreview('aboutImagePreview', p.aboutImage || p.avatar);
  updateImagePreview('bannerPreview', p.banner);
  updateImagePreview('labImagePreview', p.labImage || 'image/research.jpg');

  const fields = [
    { id: 'inputName', key: 'name' },
    { id: 'inputLogoBadge', key: 'logoBadge' },
    { id: 'inputHeadline', key: 'headline' },
    { id: 'inputStatus', key: 'status' },
    { id: 'inputBio', key: 'bio' },
    { id: 'inputAbout', key: 'about' },
    { id: 'inputLocation', key: 'location' },
    { id: 'inputEmail', key: 'email' },
    { id: 'inputOfficialEmail', key: 'officialEmail' },
    { id: 'inputPhone', key: 'phone' },
    { id: 'inputAvatarUrl', key: 'avatar', previewId: 'avatarPreview' },
    { id: 'inputAboutImageUrl', key: 'aboutImage', previewId: 'aboutImagePreview' },
    { id: 'inputBannerUrl', key: 'banner', previewId: 'bannerPreview' },
    { id: 'inputLabImageUrl', key: 'labImage', previewId: 'labImagePreview' }
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el) return;
    el.addEventListener('input', () => {
      currentProfile.personal[f.key] = el.value;
      if (f.previewId) updateImagePreview(f.previewId, el.value);
      triggerAutoSave();
    });
  });

  // Avatar File Upload -> Immediately optimize, upload, preview & save
  const avatarFile = document.getElementById('inputAvatarFile');
  if (avatarFile) {
    avatarFile.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      showToast('Uploading & resizing avatar photo...', 'info');
      try {
        const res = await uploadImageFile(file, 'avatar', file.name);
        currentProfile.personal.avatar = res.url;
        setValue('inputAvatarUrl', res.url);
        updateImagePreview('avatarPreview', res.url);
        await saveProfileData(currentProfile);
        showToast('✓ Photo updated & saved! Click "✂️ Resize & Place" anytime to adjust crop.', 'success');
      } catch (err) {
        console.error('Avatar upload error:', err);
        showToast('Failed to upload image.', 'error');
      } finally {
        avatarFile.value = '';
      }
    });
  }

  const repAvatarBtn = document.getElementById('repositionAvatarBtn');
  if (repAvatarBtn) {
    repAvatarBtn.onclick = () => {
      const src = currentProfile.personal.avatar || 'image/avatar.jpg';
      openPhotoCropper(src, 'avatar', async (croppedDataUrl) => {
        showToast('Saving cropped avatar...', 'info');
        try {
          const res = await uploadImageFile(croppedDataUrl, 'avatar', 'avatar_cropped.jpg');
          currentProfile.personal.avatar = res.url;
          setValue('inputAvatarUrl', res.url);
          updateImagePreview('avatarPreview', res.url);
          await saveProfileData(currentProfile);
          showToast('✓ Avatar resized & saved properly!', 'success');
        } catch (err) {
          currentProfile.personal.avatar = croppedDataUrl;
          setValue('inputAvatarUrl', croppedDataUrl);
          updateImagePreview('avatarPreview', croppedDataUrl);
          await saveProfileData(currentProfile);
          showToast('✓ Avatar saved!', 'success');
        }
      });
    };
  }

  // About Me Large Portrait Photo Upload -> Independent from Hero Avatar
  const aboutImgFile = document.getElementById('inputAboutImageFile');
  if (aboutImgFile) {
    aboutImgFile.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      showToast('Uploading & resizing About Me portrait...', 'info');
      try {
        const res = await uploadImageFile(file, 'aboutImage', file.name);
        currentProfile.personal.aboutImage = res.url;
        setValue('inputAboutImageUrl', res.url);
        updateImagePreview('aboutImagePreview', res.url);
        await saveProfileData(currentProfile);
        showToast('✓ About Me portrait updated & saved! Click "✂️ Resize & Place" anytime to adjust crop.', 'success');
      } catch (err) {
        console.error('About photo upload error:', err);
        showToast('Failed to upload About Me photo.', 'error');
      } finally {
        aboutImgFile.value = '';
      }
    });
  }

  const repAboutBtn = document.getElementById('repositionAboutImgBtn');
  if (repAboutBtn) {
    repAboutBtn.onclick = () => {
      const src = currentProfile.personal.aboutImage || currentProfile.personal.avatar || 'image/avatar.jpg';
      openPhotoCropper(src, 'portrait', async (croppedDataUrl) => {
        showToast('Saving cropped About Me portrait...', 'info');
        try {
          const res = await uploadImageFile(croppedDataUrl, 'aboutImage', 'about_portrait_cropped.jpg');
          currentProfile.personal.aboutImage = res.url;
          setValue('inputAboutImageUrl', res.url);
          updateImagePreview('aboutImagePreview', res.url);
          await saveProfileData(currentProfile);
          showToast('✓ About Me portrait resized & saved properly!', 'success');
        } catch (err) {
          currentProfile.personal.aboutImage = croppedDataUrl;
          setValue('inputAboutImageUrl', croppedDataUrl);
          updateImagePreview('aboutImagePreview', croppedDataUrl);
          await saveProfileData(currentProfile);
          showToast('✓ About Me portrait saved!', 'success');
        }
      });
    };
  }

  // Banner File Upload -> Immediately optimize, upload, preview & save
  const bannerFile = document.getElementById('inputBannerFile');
  if (bannerFile) {
    bannerFile.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      showToast('Uploading & resizing banner...', 'info');
      try {
        const res = await uploadImageFile(file, 'banner', file.name);
        currentProfile.personal.banner = res.url;
        setValue('inputBannerUrl', res.url);
        updateImagePreview('bannerPreview', res.url);
        await saveProfileData(currentProfile);
        showToast('✓ Banner updated & saved! Click "✂️ Resize & Place" anytime to adjust crop.', 'success');
      } catch (err) {
        console.error('Banner upload error:', err);
        showToast('Failed to upload banner.', 'error');
      } finally {
        bannerFile.value = '';
      }
    });
  }

  const repBannerBtn = document.getElementById('repositionBannerBtn');
  if (repBannerBtn) {
    repBannerBtn.onclick = () => {
      const src = currentProfile.personal.banner || 'image/banner.jpg';
      openPhotoCropper(src, 'banner', async (croppedDataUrl) => {
        showToast('Saving cropped banner...', 'info');
        try {
          const res = await uploadImageFile(croppedDataUrl, 'banner', 'banner_cropped.jpg');
          currentProfile.personal.banner = res.url;
          setValue('inputBannerUrl', res.url);
          updateImagePreview('bannerPreview', res.url);
          await saveProfileData(currentProfile);
          showToast('✓ Banner resized & saved properly!', 'success');
        } catch (err) {
          currentProfile.personal.banner = croppedDataUrl;
          setValue('inputBannerUrl', croppedDataUrl);
          updateImagePreview('bannerPreview', croppedDataUrl);
          await saveProfileData(currentProfile);
          showToast('✓ Banner saved!', 'success');
        }
      });
    };
  }

  // Lab / Systems & AI Spotlight File Upload -> Immediately optimize, upload, preview & save
  const labFile = document.getElementById('inputLabImageFile');
  if (labFile) {
    labFile.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      showToast('Uploading & resizing research spotlight photo...', 'info');
      try {
        const res = await uploadImageFile(file, 'labImage', file.name);
        currentProfile.personal.labImage = res.url;
        setValue('inputLabImageUrl', res.url);
        updateImagePreview('labImagePreview', res.url);
        await saveProfileData(currentProfile);
        showToast('✓ Spotlight photo updated & saved! Click "✂️ Resize & Place" anytime to adjust crop.', 'success');
      } catch (err) {
        console.error('Lab image upload error:', err);
        showToast('Failed to upload photo.', 'error');
      } finally {
        labFile.value = '';
      }
    });
  }

  const repLabBtn = document.getElementById('repositionLabImgBtn');
  if (repLabBtn) {
    repLabBtn.onclick = () => {
      const src = currentProfile.personal.labImage || 'image/research.jpg';
      openPhotoCropper(src, 'project', async (croppedDataUrl) => {
        showToast('Saving cropped photo...', 'info');
        try {
          const res = await uploadImageFile(croppedDataUrl, 'labImage', 'lab_spotlight_cropped.jpg');
          currentProfile.personal.labImage = res.url;
          setValue('inputLabImageUrl', res.url);
          updateImagePreview('labImagePreview', res.url);
          await saveProfileData(currentProfile);
          showToast('✓ Spotlight photo resized & saved properly!', 'success');
        } catch (err) {
          currentProfile.personal.labImage = croppedDataUrl;
          setValue('inputLabImageUrl', croppedDataUrl);
          updateImagePreview('labImagePreview', croppedDataUrl);
          await saveProfileData(currentProfile);
          showToast('✓ Spotlight photo saved!', 'success');
        }
      });
    };
  }
}

function updateImagePreview(imgId, url) {
  const img = document.getElementById(imgId);
  if (img && url) {
    img.src = url;
  }
}

/**
 * Image input helper
 */
function setupImageInput(inputId, onImageLoaded) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onImageLoaded(event.target.result);
      input.value = '';
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Helper to auto-detect social icon from platform name
 */
function detectSocialIcon(platform = '') {
  const p = platform.toLowerCase();
  if (p.includes('insta')) return 'instagram';
  if (p.includes('facebook') || p === 'fb') return 'facebook';
  if (p.includes('github')) return 'github';
  if (p.includes('linkedin')) return 'linkedin';
  if (p.includes('twitter') || p.includes('x')) return 'twitter';
  if (p.includes('whatsapp') || p.includes('wa')) return 'whatsapp';
  if (p.includes('youtube') || p.includes('yt')) return 'youtube';
  if (p.includes('telegram') || p.includes('tg')) return 'telegram';
  if (p.includes('leetcode')) return 'leetcode';
  if (p.includes('mail') || p.includes('email')) return 'email';
  if (p.includes('scholar')) return 'scholar';
  if (p.includes('discord')) return 'discord';
  return 'globe';
}

/**
 * Helper to auto-detect skill icon from skill name
 */
function detectSkillIcon(skillName = '') {
  const n = (skillName || '').toLowerCase().trim();
  if (n.includes('c++') || n.includes('modern c')) return 'cpp';
  if (n === 'c' || n.startsWith('c ') || n.includes('c /')) return 'c';
  if (n.includes('pytorch')) return 'pytorch';
  if (n.includes('python')) return 'python';
  if (n.includes('tensorflow')) return 'tensorflow';
  if (n.includes('numpy')) return 'numpy';
  if (n.includes('pandas')) return 'pandas';
  if (n.includes('scikit')) return 'scikit';
  if (n.includes('opencv')) return 'opencv';
  if (n.includes('matplotlib')) return 'matplotlib';
  if (n.includes('kaggle')) return 'kaggle';
  if (n.includes('colab')) return 'colab';
  if (n.includes('vs code') || n.includes('vscode')) return 'vscode';
  if (n.includes('windows')) return 'windows';
  if (n.includes('cuda') || n.includes('gpu')) return 'cuda';
  if (n.includes('linux') || n.includes('kernel') || n.includes('operating')) return 'linux';
  if (n.includes('docker') || n.includes('container')) return 'docker';
  if (n.includes('kubernetes') || n.includes('k8s')) return 'kubernetes';
  if (n.includes('postgres')) return 'postgres';
  if (n.includes('mysql')) return 'mysql';
  if (n.includes('redis')) return 'redis';
  if (n.includes('mongodb')) return 'mongodb';
  if (n.includes('firebase')) return 'firebase';
  if (n.includes('vercel')) return 'vercel';
  if (n.includes('github')) return 'github';
  if (n.includes('sql') || n.includes('database')) return 'postgres';
  if (n.includes('git') || n.includes('ci/cd')) return 'git';
  if (n.includes('javascript') || n === 'js') return 'javascript';
  if (n.includes('typescript') || n === 'ts') return 'typescript';
  if (n.includes('java')) return 'java';
  if (n.includes('golang') || n === 'go' || n.includes('go (')) return 'golang';
  if (n.includes('rust')) return 'rust';
  if (n.includes('react')) return 'react';
  if (n.includes('node')) return 'nodejs';
  if (n.includes('html')) return 'html';
  if (n.includes('css')) return 'css';
  if (n.includes('full-stack') || n.includes('fullstack')) return 'fullstack';
  if (n.includes('aws') || n.includes('cloud')) return 'aws';
  if (n.includes('algorithm') || n.includes('structure')) return 'algo';
  if (n.includes('deep learning') || n.includes('transformer') || n.includes('neural') || n.includes('machine learning')) return 'ai';
  if (n.includes('raft') || n.includes('distributed') || n.includes('systems')) return 'systems';
  return 'code';
}

/**
 * Social Links Management with Live Logo Picker
 */
function populateSocials() {
  const list = document.getElementById('socialLinksList');
  if (!list) return;

  function render() {
    list.innerHTML = (currentProfile.socials || []).map((s, index) => {
      const currentIcon = s.icon || detectSocialIcon(s.platform);
      return `
      <div class="item-card" style="margin-bottom: 12px; padding: 14px;">
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="social-icon-preview" id="social-preview-${index}">
              ${getSocialIconSvg(currentIcon)}
            </span>
            <select class="form-input" style="width: 150px; font-weight: 600;" data-social-index="${index}" data-field="icon">
              <option value="instagram" ${currentIcon === 'instagram' ? 'selected' : ''}>📸 Instagram</option>
              <option value="facebook" ${currentIcon === 'facebook' ? 'selected' : ''}>📘 Facebook</option>
              <option value="github" ${currentIcon === 'github' ? 'selected' : ''}>🐙 GitHub</option>
              <option value="linkedin" ${currentIcon === 'linkedin' ? 'selected' : ''}>💼 LinkedIn</option>
              <option value="twitter" ${currentIcon === 'twitter' ? 'selected' : ''}>🐦 Twitter / X</option>
              <option value="whatsapp" ${currentIcon === 'whatsapp' ? 'selected' : ''}>💬 WhatsApp</option>
              <option value="youtube" ${currentIcon === 'youtube' ? 'selected' : ''}>🎥 YouTube</option>
              <option value="telegram" ${currentIcon === 'telegram' ? 'selected' : ''}>✈️ Telegram</option>
              <option value="leetcode" ${currentIcon === 'leetcode' ? 'selected' : ''}>💡 LeetCode</option>
              <option value="email" ${currentIcon === 'email' ? 'selected' : ''}>✉️ Email</option>
              <option value="scholar" ${currentIcon === 'scholar' ? 'selected' : ''}>🎓 Google Scholar</option>
              <option value="discord" ${currentIcon === 'discord' ? 'selected' : ''}>🎮 Discord</option>
              <option value="globe" ${currentIcon === 'globe' ? 'selected' : ''}>🌐 Website</option>
            </select>
          </div>
          <input type="text" class="form-input" style="width: 140px;" value="${s.platform || ''}" placeholder="Platform" data-social-index="${index}" data-field="platform" />
          <input type="text" class="form-input" style="flex-grow: 1; min-width: 200px;" value="${s.url || ''}" placeholder="Profile URL" data-social-index="${index}" data-field="url" />
          <button class="btn-admin btn-admin-danger btn-admin-sm" data-delete-social="${index}">Delete</button>
        </div>
      </div>
      `;
    }).join('');

    list.querySelectorAll('[data-social-index]').forEach(input => {
      const handler = (e) => {
        const idx = e.target.getAttribute('data-social-index');
        const field = e.target.getAttribute('data-field');
        currentProfile.socials[idx][field] = e.target.value;

        if (field === 'icon') {
          const preview = document.getElementById(`social-preview-${idx}`);
          if (preview) preview.innerHTML = getSocialIconSvg(e.target.value);
          const platformInput = list.querySelector(`input[data-social-index="${idx}"][data-field="platform"]`);
          if (platformInput && (!platformInput.value || platformInput.value === 'New Platform' || platformInput.value === 'Instagram')) {
            const matched = SUPPORTED_SOCIAL_PLATFORMS.find(p => p.id === e.target.value);
            if (matched) {
              platformInput.value = matched.name;
              currentProfile.socials[idx].platform = matched.name;
            }
          }
        }
        triggerAutoSave();
      };

      input.addEventListener('input', handler);
      if (input.tagName === 'SELECT') input.addEventListener('change', handler);
    });

    list.querySelectorAll('[data-delete-social]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-delete-social'), 10);
        if (!isNaN(idx)) {
          currentProfile.socials.splice(idx, 1);
          render();
          triggerAutoSave();
          showToast('✓ Social link removed');
        }
      });
    });
  }

  render();

  const addSocialBtn = document.getElementById('addSocialBtn');
  if (addSocialBtn) {
    addSocialBtn.onclick = () => {
      if (!currentProfile.socials) currentProfile.socials = [];
      currentProfile.socials.push({ platform: 'Instagram', icon: 'instagram', url: 'https://instagram.com/' });
      render();
      triggerAutoSave();
    };
  }
}

/**
 * 2. Skills Management with Tech Logo Selector
 */
function populateSkillsManager() {
  const container = document.getElementById('skillsCategoryContainer');
  if (!container) return;

  function render() {
    container.innerHTML = (currentProfile.skills || []).map((cat, catIdx) => `
      <div class="skill-category-block">
        <div class="skill-category-header">
          <input type="text" class="form-input" style="max-width: 300px; font-weight: 700;" value="${cat.category}" data-cat-idx="${catIdx}" />
          <div style="display: flex; gap: 8px;">
            <button class="btn-admin btn-admin-secondary btn-admin-sm" data-add-skill-to="${catIdx}">+ Add Skill</button>
            <button class="btn-admin btn-admin-danger btn-admin-sm" data-delete-cat="${catIdx}">Delete Category</button>
          </div>
        </div>
        <div class="skills-rows">
          ${(cat.items || []).map((skill, skillIdx) => {
            const currentSkillIcon = skill.icon || detectSkillIcon(skill.name);
            return `
            <div class="skill-single-row">
              <span class="skill-logo-preview" id="skill-logo-preview-${catIdx}-${skillIdx}" title="Technology Logo">
                ${getSkillLogoHtml(currentSkillIcon, skill.name)}
              </span>
              <select class="form-input" style="font-weight: 600; font-size: 0.85rem;" data-cat="${catIdx}" data-skill="${skillIdx}" data-skill-field="icon">
                ${SUPPORTED_SKILL_ICONS.map(ic => `
                  <option value="${ic.id}" ${currentSkillIcon === ic.id ? 'selected' : ''}>${ic.label}</option>
                `).join('')}
              </select>
              <input type="text" class="form-input" value="${skill.name}" placeholder="Skill Name" data-cat="${catIdx}" data-skill="${skillIdx}" data-skill-field="name" />
              <button class="btn-admin btn-admin-danger btn-admin-sm" style="padding: 4px 8px;" data-del-cat="${catIdx}" data-del-skill="${skillIdx}">✕</button>
            </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    container.querySelectorAll('[data-cat-idx]').forEach(input => {
      input.addEventListener('input', (e) => {
        const catIdx = e.target.getAttribute('data-cat-idx');
        currentProfile.skills[catIdx].category = e.target.value;
        triggerAutoSave();
      });
    });

    container.querySelectorAll('[data-skill-field]').forEach(input => {
      const handler = (e) => {
        const catIdx = e.target.getAttribute('data-cat');
        const skillIdx = e.target.getAttribute('data-skill');
        const field = e.target.getAttribute('data-skill-field');
        const val = field === 'level' ? parseInt(e.target.value, 10) : e.target.value;
        const skillObj = currentProfile.skills[catIdx].items[skillIdx];
        skillObj[field] = val;

        const previewEl = document.getElementById(`skill-logo-preview-${catIdx}-${skillIdx}`);
        if (field === 'name') {
          const detected = detectSkillIcon(val);
          skillObj.icon = detected;
          const selectEl = container.querySelector(`select[data-cat="${catIdx}"][data-skill="${skillIdx}"][data-skill-field="icon"]`);
          if (selectEl) selectEl.value = detected;
          if (previewEl) previewEl.innerHTML = getSkillLogoHtml(detected, val);
        } else if (field === 'icon') {
          if (previewEl) previewEl.innerHTML = getSkillLogoHtml(val, skillObj.name);
        } else if (field === 'level') {
          const displayEl = document.getElementById(`level-display-${catIdx}-${skillIdx}`);
          if (displayEl) displayEl.textContent = `${val}%`;
        }
        triggerAutoSave();
      };
      input.addEventListener('input', handler);
      if (input.tagName === 'SELECT') input.addEventListener('change', handler);
    });

    container.querySelectorAll('[data-add-skill-to]').forEach(btn => {
      btn.addEventListener('click', () => {
        const catIdx = parseInt(btn.getAttribute('data-add-skill-to'), 10);
        if (!isNaN(catIdx) && currentProfile.skills[catIdx]) {
          currentProfile.skills[catIdx].items.push({ name: 'New Skill', level: 85, icon: 'code' });
          render();
          triggerAutoSave();
          showToast('✓ Added new skill!');
        }
      });
    });

    container.querySelectorAll('[data-del-skill]').forEach(btn => {
      btn.addEventListener('click', () => {
        const catIdx = parseInt(btn.getAttribute('data-del-cat'), 10);
        const skillIdx = parseInt(btn.getAttribute('data-del-skill'), 10);
        if (!isNaN(catIdx) && !isNaN(skillIdx) && currentProfile.skills[catIdx]) {
          currentProfile.skills[catIdx].items.splice(skillIdx, 1);
          render();
          triggerAutoSave();
          showToast('✓ Skill removed');
        }
      });
    });

    container.querySelectorAll('[data-delete-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        const catIdx = parseInt(btn.getAttribute('data-delete-cat'), 10);
        if (!isNaN(catIdx) && confirm('Delete this entire skill category?')) {
          currentProfile.skills.splice(catIdx, 1);
          render();
          triggerAutoSave();
          showToast('✓ Category deleted');
        }
      });
    });
  }

  render();

  const addCatBtn = document.getElementById('addSkillCategoryBtn');
  if (addCatBtn) {
    addCatBtn.onclick = () => {
      if (!currentProfile.skills) currentProfile.skills = [];
      currentProfile.skills.push({ category: 'New Category', items: [{ name: 'Skill 1', level: 85, icon: 'code' }] });
      render();
      triggerAutoSave();
    };
  }
}

/**
 * 3. Projects Management (CRUD)
 */
function populateProjectsManager() {
  const list = document.getElementById('projectsAdminList');
  const modal = document.getElementById('projectEditModal');
  const form = document.getElementById('projectEditForm');
  const newBtn = document.getElementById('addNewProjectBtn');
  const closeBtn = document.getElementById('closeProjectModal');

  function render() {
    if (!list) return;
    list.innerHTML = (currentProfile.projects || []).map((p, idx) => `
      <div class="item-card">
        <div class="item-card-header">
          <div style="display: flex; gap: 14px; align-items: center;">
            <img src="${p.image || ''}" style="width: 50px; height: 50px; border-radius: 6px; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=100&q=80'" />
            <div>
              <h4>${p.title}</h4>
              <span style="font-size: 0.8rem; color: var(--admin-muted);">${p.category || 'General'}</span>
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-admin btn-admin-secondary btn-admin-sm" data-edit-project="${p.id || idx}">Edit</button>
            <button class="btn-admin btn-admin-danger btn-admin-sm" data-delete-project="${p.id || idx}">Delete</button>
          </div>
        </div>
        <p style="font-size: 0.88rem; color: var(--admin-muted); margin-bottom: 8px;">${p.description}</p>
        <div style="font-size: 0.8rem; color: var(--admin-primary);">Tags: ${(p.tags || []).join(', ')}</div>
      </div>
    `).join('');

    list.querySelectorAll('[data-edit-project]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-project');
        openProjectModal(id);
      });
    });

    list.querySelectorAll('[data-delete-project]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-delete-project');
        if (confirm('Are you sure you want to delete this project?')) {
          currentProfile.projects = currentProfile.projects.filter((p, i) => (p.id || i) != id);
          render();
          await saveProfileData(currentProfile);
          showToast('✓ Project removed and saved.');
        }
      });
    });
  }

  render();

  function openProjectModal(id = null) {
    currentProjectEditId = id;
    if (modal) modal.classList.add('open');

    let project = null;
    if (id !== null) {
      project = currentProfile.projects.find((p, i) => (p.id || i) == id);
    }

    setValue('projModalTitle', project ? project.title : '');
    setValue('projModalCategory', project ? project.category : '');
    setValue('projModalDesc', project ? project.description : '');
    setValue('projModalTags', project ? (project.tags || []).join(', ') : '');
    setValue('projModalLive', project ? project.liveUrl : '');
    setValue('projModalGitHub', project ? project.githubUrl : '');
    setValue('projModalImage', project ? project.image : '');
    setValue('projModalVideo', project ? (project.videoUrl || '') : '');
    updateImagePreview('projModalImagePreview', project ? project.image : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80');

    const featuredCheck = document.getElementById('projModalFeatured');
    if (featuredCheck) featuredCheck.checked = project ? Boolean(project.featured) : true;
  }

  if (newBtn) {
    newBtn.addEventListener('click', () => openProjectModal(null));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.classList.remove('open');
    });
  }

  // Cover image file upload -> Auto-resize, optimize & persist immediately
  const projImgFile = document.getElementById('projModalImageFile');
  if (projImgFile) {
    projImgFile.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      showToast('Uploading & resizing project cover...', 'info');
      try {
        const res = await uploadImageFile(file, 'project', file.name);
        setValue('projModalImage', res.url);
        updateImagePreview('projModalImagePreview', res.url);
        showToast('✓ Project cover uploaded & resized! Click "✂️ Resize & Place" anytime to adjust crop.', 'success');
      } catch (err) {
        console.error('Project image upload error:', err);
        showToast('Failed to upload image.', 'error');
      } finally {
        projImgFile.value = '';
      }
    });
  }

  const repProjBtn = document.getElementById('repositionProjImgBtn');
  if (repProjBtn) {
    repProjBtn.onclick = () => {
      const src = getValue('projModalImage') || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80';
      openPhotoCropper(src, 'project', async (croppedDataUrl) => {
        showToast('Saving cropped cover...', 'info');
        try {
          const res = await uploadImageFile(croppedDataUrl, 'project', 'proj_cropped.jpg');
          setValue('projModalImage', res.url);
          updateImagePreview('projModalImagePreview', res.url);
          showToast('✓ Project cover resized & saved properly!', 'success');
        } catch (err) {
          setValue('projModalImage', croppedDataUrl);
          updateImagePreview('projModalImagePreview', croppedDataUrl);
        }
      });
    };
  }

  const projImageInput = document.getElementById('projModalImage');
  if (projImageInput) {
    projImageInput.addEventListener('input', (e) => {
      updateImagePreview('projModalImagePreview', e.target.value);
    });
  }

  // Save Project Form Submit
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newProj = {
        id: currentProjectEditId ? currentProjectEditId : `proj-${Date.now()}`,
        title: getValue('projModalTitle'),
        category: getValue('projModalCategory'),
        description: getValue('projModalDesc'),
        tags: getValue('projModalTags').split(',').map(t => t.trim()).filter(Boolean),
        liveUrl: getValue('projModalLive'),
        githubUrl: getValue('projModalGitHub'),
        image: getValue('projModalImage') || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        videoUrl: getValue('projModalVideo').trim(),
        featured: document.getElementById('projModalFeatured') ? document.getElementById('projModalFeatured').checked : true
      };

      if (currentProjectEditId !== null) {
        const idx = currentProfile.projects.findIndex((p, i) => (p.id || i) == currentProjectEditId);
        if (idx !== -1) currentProfile.projects[idx] = newProj;
      } else {
        if (!currentProfile.projects) currentProfile.projects = [];
        currentProfile.projects.unshift(newProj);
      }

      if (modal) modal.classList.remove('open');
      render();
      await saveProfileData(currentProfile);
      showToast('Project saved!');
    });
  }
}

/**
 * 3.5 Publications Manager & Show/Hide Section Toggle
 */
function populatePublicationsManager() {
  const container = document.getElementById('publicationsAdminList');
  const addBtn = document.getElementById('addNewPublicationBtn');
  const toggleBtn = document.getElementById('togglePublicationsBtn');
  const statusBadge = document.getElementById('pubVisibilityBadge');
  const toggleText = document.getElementById('togglePubText');
  const toggleIcon = document.getElementById('togglePubIcon');
  const noticeText = document.getElementById('pubVisibilityNoticeText');
  const countBadge = document.getElementById('pubCountBadge');

  if (!container) return;

  function updateVisibilityUI() {
    const isVisible = currentProfile.showPublications !== false;

    if (isVisible) {
      if (statusBadge) {
        statusBadge.textContent = 'Status: VISIBLE ON WEBSITE';
        statusBadge.style.color = '#10b981';
        statusBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        statusBadge.style.background = 'rgba(16, 185, 129, 0.12)';
      }
      if (toggleBtn) {
        toggleBtn.style.background = 'rgba(239, 68, 68, 0.15)';
        toggleBtn.style.color = '#ef4444';
        toggleBtn.style.border = '1px solid rgba(239, 68, 68, 0.35)';
      }
      if (toggleText) toggleText.textContent = 'Hide Section on Website';
      if (toggleIcon) toggleIcon.textContent = '🙈';
      if (noticeText) noticeText.textContent = 'The Publications section is currently VISIBLE to visitors on your public portfolio.';
    } else {
      if (statusBadge) {
        statusBadge.textContent = 'Status: HIDDEN FROM WEBSITE';
        statusBadge.style.color = '#fbbf24';
        statusBadge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        statusBadge.style.background = 'rgba(245, 158, 11, 0.12)';
      }
      if (toggleBtn) {
        toggleBtn.style.background = 'rgba(16, 185, 129, 0.15)';
        toggleBtn.style.color = '#10b981';
        toggleBtn.style.border = '1px solid rgba(16, 185, 129, 0.35)';
      }
      if (toggleText) toggleText.textContent = 'Show Section on Website';
      if (toggleIcon) toggleIcon.textContent = '👁️';
      if (noticeText) noticeText.textContent = 'The Publications section is currently HIDDEN from your public website (visitors cannot see it).';
    }
  }

  // Toggle button click handler
  if (toggleBtn) {
    toggleBtn.onclick = async () => {
      currentProfile.showPublications = currentProfile.showPublications === false ? true : false;
      updateVisibilityUI();
      triggerAutoSave();
      showToast(currentProfile.showPublications 
        ? '✓ Publications section is now VISIBLE on your website!' 
        : '🙈 Publications section is now HIDDEN from your website!');
    };
  }

  function render() {
    updateVisibilityUI();
    const pubs = currentProfile.publications || [];
    if (countBadge) countBadge.textContent = `${pubs.length} Paper${pubs.length === 1 ? '' : 's'}`;

    if (pubs.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; background: var(--admin-card-inner); border-radius: 8px; border: 1px dashed var(--admin-border);">
          <p style="color: var(--admin-muted); margin-bottom: 12px;">No paper publications added yet.</p>
          <button type="button" id="btnEmptyAddPub" class="btn-admin btn-admin-primary btn-admin-sm">+ Add First Publication</button>
        </div>
      `;
      const emptyAdd = document.getElementById('btnEmptyAddPub');
      if (emptyAdd && addBtn) emptyAdd.onclick = () => addBtn.click();
      return;
    }

    container.innerHTML = pubs.map((pub, idx) => `
      <div class="item-card" id="pub-card-${idx}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--admin-primary); margin: 0;">Paper #${idx + 1}</h4>
            <span class="tag-pill" style="font-size: 0.72rem; padding: 3px 8px;">${escapeHtml(pub.type || 'Conference')}</span>
          </div>
          <button type="button" class="btn-admin btn-admin-danger btn-admin-sm" data-del-pub="${idx}">🗑️ Delete</button>
        </div>

        <div class="form-grid">
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">Paper Title *</label>
            <input type="text" class="form-input" value="${escapeHtml(pub.title || '')}" data-pub-idx="${idx}" data-field="title" placeholder="e.g. Distributed Consensus in Heterogeneous Cloud Environments" />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">Authors List *</label>
            <input type="text" class="form-input" value="${escapeHtml(pub.authors || '')}" data-pub-idx="${idx}" data-field="authors" placeholder="e.g. Gaurab Samadder, Dr. Collaborator Name" />
          </div>

          <div class="form-group">
            <label class="form-label">Conference / Journal / Venue *</label>
            <input type="text" class="form-input" value="${escapeHtml(pub.venue || '')}" data-pub-idx="${idx}" data-field="venue" placeholder="e.g. IEEE TPDS / ACM SIGOPS / NeurIPS Workshop" />
          </div>

          <div class="form-group">
            <label class="form-label">Year / Date</label>
            <input type="text" class="form-input" value="${escapeHtml(pub.year || '')}" data-pub-idx="${idx}" data-field="year" placeholder="e.g. 2026" />
          </div>

          <div class="form-group">
            <label class="form-label">Publication Type</label>
            <select class="form-select" data-pub-idx="${idx}" data-field="type">
              <option value="Conference Paper" ${(pub.type || '').includes('Conference') ? 'selected' : ''}>Conference Paper</option>
              <option value="Journal Article" ${(pub.type || '').includes('Journal') ? 'selected' : ''}>Journal Article</option>
              <option value="Workshop Paper" ${(pub.type || '').includes('Workshop') ? 'selected' : ''}>Workshop Paper</option>
              <option value="Preprint / arXiv" ${(pub.type || '').includes('Preprint') || (pub.type || '').includes('arXiv') ? 'selected' : ''}>Preprint / arXiv</option>
              <option value="Under Review" ${(pub.type || '').includes('Review') ? 'selected' : ''}>Under Review</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Status Badge / Tag</label>
            <input type="text" class="form-input" value="${escapeHtml(pub.badge || '')}" data-pub-idx="${idx}" data-field="badge" placeholder="e.g. Accepted, Best Paper, Oral Presentation" />
          </div>

          <div class="form-group">
            <label class="form-label">Paper Link / PDF URL</label>
            <input type="url" class="form-input" value="${escapeHtml(pub.paperUrl || '')}" data-pub-idx="${idx}" data-field="paperUrl" placeholder="https://doi.org/... or https://arxiv.org/abs/..." />
          </div>

          <div class="form-group">
            <label class="form-label">Source Code / GitHub URL</label>
            <input type="url" class="form-input" value="${escapeHtml(pub.codeUrl || '')}" data-pub-idx="${idx}" data-field="codeUrl" placeholder="https://github.com/..." />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">Abstract / Summary Description</label>
            <textarea class="form-textarea" rows="3" data-pub-idx="${idx}" data-field="abstract" placeholder="Brief summary of research contribution, methodology, and empirical findings...">${escapeHtml(pub.abstract || '')}</textarea>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('[data-pub-idx]').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-pub-idx'), 10);
        const field = e.target.getAttribute('data-field');
        if (currentProfile.publications && currentProfile.publications[idx]) {
          currentProfile.publications[idx][field] = e.target.value;
          triggerAutoSave();
        }
      });
      if (input.tagName === 'SELECT') {
        input.addEventListener('change', (e) => {
          const idx = parseInt(e.target.getAttribute('data-pub-idx'), 10);
          const field = e.target.getAttribute('data-field');
          if (currentProfile.publications && currentProfile.publications[idx]) {
            currentProfile.publications[idx][field] = e.target.value;
            triggerAutoSave();
          }
        });
      }
    });

    container.querySelectorAll('[data-del-pub]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-del-pub'), 10);
        if (!isNaN(idx) && currentProfile.publications && idx >= 0 && idx < currentProfile.publications.length) {
          const removed = currentProfile.publications.splice(idx, 1)[0];
          render();
          triggerAutoSave();
          showToast(`✓ Removed paper "${removed.title || ''}"`);
        }
      });
    });
  }

  render();

  if (addBtn) {
    addBtn.onclick = () => {
      if (!currentProfile.publications) currentProfile.publications = [];
      const newPub = {
        id: `pub-${Date.now()}`,
        title: 'New Research Paper Title',
        authors: `${currentProfile.personal?.name || 'Gaurab Samadder'}, Research Collaborators`,
        venue: 'International Conference / Journal Venue',
        year: '2026',
        type: 'Conference Paper',
        badge: 'Accepted / In Review',
        paperUrl: '',
        codeUrl: 'https://github.com',
        abstract: 'Detailed description of the proposed methodology, architecture, and performance benchmarking results...'
      };
      currentProfile.publications.unshift(newPub);
      render();
      triggerAutoSave();
      showToast('✓ Added new publication! Edit details below.');
    };
  }
}

/**
 * 4. Experience & Education Management
 */
function populateExperienceManager() {
  const container = document.getElementById('experienceAdminList');
  const addBtn = document.getElementById('addExperienceBtn');
  if (!container) return;

  function render() {
    container.innerHTML = (currentProfile.experiences || []).map((exp, idx) => `
      <div class="item-card" id="exp-card-${idx}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--admin-accent);">Experience #${idx + 1}</h4>
          <button type="button" class="btn-admin btn-admin-danger btn-admin-sm" data-del-exp="${idx}">🗑️ Delete</button>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Role / Job Title</label>
            <input type="text" class="form-input" value="${escapeHtml(exp.role || '')}" data-exp-idx="${idx}" data-field="role" placeholder="e.g. Graduate Teaching Assistant" />
          </div>
          <div class="form-group">
            <label class="form-label">Company / Department</label>
            <input type="text" class="form-input" value="${escapeHtml(exp.company || '')}" data-exp-idx="${idx}" data-field="company" placeholder="e.g. Dept. of CSE, IIT Kharagpur" />
          </div>
          <div class="form-group">
            <label class="form-label">Period (e.g. 2024 - Present)</label>
            <input type="text" class="form-input" value="${escapeHtml(exp.period || '')}" data-exp-idx="${idx}" data-field="period" placeholder="e.g. 2024 - Present" />
          </div>
          <div class="form-group">
            <label class="form-label">Location</label>
            <input type="text" class="form-input" value="${escapeHtml(exp.location || '')}" data-exp-idx="${idx}" data-field="location" placeholder="e.g. Kharagpur, India" />
          </div>
        </div>
        <div class="form-group" style="margin-top: 10px;">
          <label class="form-label">Description & Achievements</label>
          <textarea class="form-textarea" data-exp-idx="${idx}" data-field="description" placeholder="Describe key accomplishments, responsibilities, or research work...">${escapeHtml(exp.description || '')}</textarea>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('[data-exp-idx]').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-exp-idx'), 10);
        const field = e.target.getAttribute('data-field');
        if (currentProfile.experiences && currentProfile.experiences[idx]) {
          currentProfile.experiences[idx][field] = e.target.value;
          triggerAutoSave();
        }
      });
    });

    container.querySelectorAll('[data-del-exp]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-del-exp'), 10);
        if (!isNaN(idx) && currentProfile.experiences && idx >= 0 && idx < currentProfile.experiences.length) {
          const removed = currentProfile.experiences.splice(idx, 1)[0];
          render();
          triggerAutoSave();
          showToast(`✓ Removed "${removed.role || 'Experience'}"`);
        }
      });
    });
  }

  render();

  if (addBtn) {
    addBtn.onclick = () => {
      if (!currentProfile.experiences) currentProfile.experiences = [];
      const newExp = {
        id: `exp-${Date.now()}`,
        role: 'Teaching Assistant / Researcher',
        company: 'Department of Computer Science & Engineering, IIT Kharagpur',
        period: '2024 - Present',
        location: 'Kharagpur, India',
        description: 'Key accomplishments, course mentoring, or systems development responsibilities...'
      };
      currentProfile.experiences.unshift(newExp);
      render();
      triggerAutoSave();
      showToast('✓ Added new experience! Edit fields below.');
    };
  }
}

function populateEducationManager() {
  const container = document.getElementById('educationAdminList');
  const addBtn = document.getElementById('addEducationBtn');
  if (!container) return;

  function render() {
    container.innerHTML = (currentProfile.education || []).map((edu, idx) => `
      <div class="item-card" id="edu-card-${idx}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--admin-accent);">Education #${idx + 1}</h4>
          <button type="button" class="btn-admin btn-admin-danger btn-admin-sm" data-del-edu="${idx}">🗑️ Delete</button>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Degree / Program</label>
            <input type="text" class="form-input" value="${escapeHtml(edu.degree || '')}" data-edu-idx="${idx}" data-field="degree" placeholder="e.g. Master of Technology (M.Tech) in CSE" />
          </div>
          <div class="form-group">
            <label class="form-label">Institution / University</label>
            <input type="text" class="form-input" value="${escapeHtml(edu.institution || '')}" data-edu-idx="${idx}" data-field="institution" placeholder="e.g. Indian Institute of Technology, Kharagpur" />
          </div>
          <div class="form-group">
            <label class="form-label">Period</label>
            <input type="text" class="form-input" value="${escapeHtml(edu.period || '')}" data-edu-idx="${idx}" data-field="period" placeholder="e.g. 2024 - 2026" />
          </div>
          <div class="form-group">
            <label class="form-label">Location</label>
            <input type="text" class="form-input" value="${escapeHtml(edu.location || '')}" data-edu-idx="${idx}" data-field="location" placeholder="e.g. Kharagpur, West Bengal" />
          </div>
        </div>
        <div class="form-group" style="margin-top: 10px;">
          <label class="form-label">Details / Highlights / Coursework</label>
          <textarea class="form-textarea" data-edu-idx="${idx}" data-field="description" placeholder="Relevant coursework, achievements, CGPA, thesis topics...">${escapeHtml(edu.description || '')}</textarea>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('[data-edu-idx]').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-edu-idx'), 10);
        const field = e.target.getAttribute('data-field');
        if (currentProfile.education && currentProfile.education[idx]) {
          currentProfile.education[idx][field] = e.target.value;
          triggerAutoSave();
        }
      });
    });

    container.querySelectorAll('[data-del-edu]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-del-edu'), 10);
        if (!isNaN(idx) && currentProfile.education && idx >= 0 && idx < currentProfile.education.length) {
          const removed = currentProfile.education.splice(idx, 1)[0];
          render();
          triggerAutoSave();
          showToast(`✓ Removed "${removed.degree || 'Education'}"`);
        }
      });
    });
  }

  render();

  if (addBtn) {
    addBtn.onclick = () => {
      if (!currentProfile.education) currentProfile.education = [];
      const newEdu = {
        id: `edu-${Date.now()}`,
        degree: 'Degree / Program',
        institution: 'Indian Institute of Technology, Kharagpur',
        period: '2024 - 2026',
        location: 'Kharagpur, West Bengal',
        description: 'Department of Computer Science & Engineering. Core Coursework and highlights...'
      };
      currentProfile.education.unshift(newEdu);
      render();
      triggerAutoSave();
      showToast('✓ Added new education entry! Edit fields below.');
    };
  }
}

function populateCertificationsManager() {
  const container = document.getElementById('certAdminList');
  const addBtn = document.getElementById('addCertBtn');
  if (!container) return;

  function render() {
    container.innerHTML = (currentProfile.certifications || []).map((c, idx) => `
      <div class="item-card" id="cert-card-${idx}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--admin-accent);">Certificate #${idx + 1}</h4>
          <button type="button" class="btn-admin btn-admin-danger btn-admin-sm" data-del-cert="${idx}">Delete</button>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Certificate Name</label>
            <input type="text" class="form-input" value="${escapeHtml(c.name || '')}" data-cert-idx="${idx}" data-field="name" placeholder="e.g. GATE Computer Science" />
          </div>
          <div class="form-group">
            <label class="form-label">Issuing Organization / Authority</label>
            <input type="text" class="form-input" value="${escapeHtml(c.issuer || '')}" data-cert-idx="${idx}" data-field="issuer" placeholder="e.g. IIT / Ministry of Education" />
          </div>
          <div class="form-group">
            <label class="form-label">Certificate Image URL (Optional)</label>
            <input type="text" class="form-input" value="${escapeHtml(c.image || '')}" data-cert-idx="${idx}" data-field="image" placeholder="image/cert.jpg or image URL" />
          </div>
          <div class="form-group">
            <label class="form-label">Year / Date</label>
            <input type="text" class="form-input" value="${escapeHtml(c.date || '')}" data-cert-idx="${idx}" data-field="date" placeholder="e.g. 2023" />
          </div>
          <div class="form-group">
            <label class="form-label">Verification / Credential URL</label>
            <input type="url" class="form-input" value="${escapeHtml(c.url || '')}" data-cert-idx="${idx}" data-field="url" placeholder="https://..." />
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('[data-cert-idx]').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-cert-idx'), 10);
        const field = e.target.getAttribute('data-field');
        if (currentProfile.certifications && currentProfile.certifications[idx]) {
          currentProfile.certifications[idx][field] = e.target.value;
          triggerAutoSave();
        }
      });
    });

    container.querySelectorAll('[data-del-cert]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-del-cert'), 10);
        if (!isNaN(idx) && currentProfile.certifications && idx >= 0 && idx < currentProfile.certifications.length) {
          const removed = currentProfile.certifications.splice(idx, 1)[0];
          render();
          triggerAutoSave();
          showToast(`✓ Removed certification "${removed.name || ''}"`);
        }
      });
    });
  }

  render();

  if (addBtn) {
    addBtn.onclick = () => {
      if (!currentProfile.certifications) currentProfile.certifications = [];
      const newCert = {
        id: `cert-${Date.now()}`,
        name: 'Certification / Honor Title',
        issuer: 'Issuing Organization',
        date: new Date().getFullYear().toString(),
        url: 'https://'
      };
      currentProfile.certifications.unshift(newCert);
      render();
      triggerAutoSave();
      showToast('✓ Added new certification! Edit fields below.');
    };
  }
}

/**
 * 5. CV / Resume Manager with Direct Upload & Download Verification
 */
function populateResumeManager() {
  const p = currentProfile.personal || {};
  const currentDisplay = document.getElementById('currentResumeDisplay');
  const testBtn = document.getElementById('testDownloadCvBtn');
  const uploadMsg = document.getElementById('cvUploadMessage');

  function updateStatus() {
    const resumeUrl = currentProfile.personal.resumeUrl;
    const name = currentProfile.personal.resumePdfName || 'Attached Document';
    if (currentDisplay) {
      if (resumeUrl && resumeUrl !== '#') {
        currentDisplay.textContent = `${name} (${resumeUrl.length > 50 ? resumeUrl.substring(0, 45) + '...' : resumeUrl})`;
      } else {
        currentDisplay.textContent = 'No resume attached yet';
      }
    }
    setValue('inputResumeUrl', resumeUrl || '');
  }

  updateStatus();

  // Test / Download CV button
  if (testBtn) {
    testBtn.addEventListener('click', () => {
      const resumeUrl = currentProfile.personal.resumeUrl;
      const filename = currentProfile.personal.resumePdfName || 'Resume.pdf';

      if (!resumeUrl || resumeUrl === '#') {
        alert('No CV uploaded yet! Click "Choose PDF Resume from Computer" below to attach one.');
        return;
      }

      // If Base64
      if (resumeUrl.startsWith('data:')) {
        const parts = resumeUrl.split(';base64,');
        const raw = window.atob(parts[1] || parts[0]);
        const uInt8Array = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        const blob = new Blob([uInt8Array], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.href = blobUrl;
        tempLink.download = filename;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        showToast('Download started for: ' + filename);
        return;
      }

      // Normal URL or relative path
      const a = document.createElement('a');
      a.href = resumeUrl;
      a.download = filename;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Opening resume: ' + filename);
    });
  }

  // URL manual input
  const resumeInput = document.getElementById('inputResumeUrl');
  if (resumeInput) {
    resumeInput.addEventListener('input', (e) => {
      currentProfile.personal.resumeUrl = e.target.value;
      updateStatus();
    });
  }

  // PDF File Upload
  const pdfInput = document.getElementById('inputResumeFile');
  if (pdfInput) {
    pdfInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (uploadMsg) {
        uploadMsg.textContent = `⏳ Processing and uploading "${file.name}"...`;
      }

      try {
        const uploadResult = await uploadCvFile(file);
        currentProfile.personal.resumeUrl = uploadResult.url;
        currentProfile.personal.resumePdfName = uploadResult.filename;

        updateStatus();
        await saveProfileData(currentProfile);

        if (uploadMsg) {
          uploadMsg.innerHTML = `<span style="color: #10b981;">✓ Successfully uploaded <strong>${uploadResult.filename}</strong>!</span>`;
        }
        showToast(`✅ CV "${uploadResult.filename}" uploaded & saved! Click "Test / Download" to verify.`);
      } catch (err) {
        console.error("Resume upload failed:", err);
        if (uploadMsg) {
          uploadMsg.innerHTML = `<span style="color: #ef4444;">Upload error: ${err.message}</span>`;
        }
      }
    });
  }
}

/**
 * 6. Admin Security Settings (PIN change)
 */
function populateSettingsManager() {
  setValue('inputNewPin', '');

  // Font Style Selector
  const fontSelect = document.getElementById('fontStyleSelect');
  const fontPreview = document.getElementById('fontStylePreview');
  const saveFontBtn = document.getElementById('saveFontStyleBtn');
  const fontMap = {
    'space-grotesk': '"Space Grotesk", sans-serif',
    'inter': '"Inter", sans-serif',
    'ibm-plex': '"IBM Plex Sans", sans-serif',
    'jetbrains-mono': '"JetBrains Mono", monospace',
    'source-serif': '"Source Serif 4", Georgia, serif'
  };

  if (fontSelect) {
    const savedFont = (currentProfile.personal && currentProfile.personal.fontStyle)
      || localStorage.getItem('site-font-style')
      || 'space-grotesk';
    fontSelect.value = fontMap[savedFont] ? savedFont : 'space-grotesk';
    if (fontPreview) fontPreview.style.fontFamily = fontMap[fontSelect.value];

    fontSelect.addEventListener('change', () => {
      if (fontPreview) fontPreview.style.fontFamily = fontMap[fontSelect.value] || fontMap['space-grotesk'];
    });
  }

  if (saveFontBtn && fontSelect) {
    saveFontBtn.addEventListener('click', async () => {
      const chosen = fontSelect.value || 'space-grotesk';
      if (!currentProfile.personal) currentProfile.personal = {};
      currentProfile.personal.fontStyle = chosen;
      localStorage.setItem('site-font-style', chosen);
      await saveProfileData(currentProfile);
      showToast('Font style updated and saved!');
    });
  }

  const savePinBtn = document.getElementById('savePinBtn');
  if (savePinBtn) {
    savePinBtn.addEventListener('click', async () => {
      const newPin = getValue('inputNewPin').trim();
      if (!newPin || newPin.length < 4) {
        alert('Please enter at least a 4-digit PIN.');
        return;
      }
      if (!currentProfile.admin) currentProfile.admin = {};
      const newHash = await hashPin(newPin);
      currentProfile.admin.pinHash = newHash;
      delete currentProfile.admin.pin; // remove any plain text pin
      await saveProfileData(currentProfile);
      setValue('inputNewPin', '');
      showToast('Admin security PIN encrypted with SHA-256 and saved!');
    });
  }
}

/**
 * 7. GitHub 1-Click Sync & JSON Import / Export
 */
function initGitHubSync() {
  const savedGh = JSON.parse(localStorage.getItem(GITHUB_CONFIG_KEY) || '{}');
  setValue('ghTokenInput', savedGh.token || '');
  setValue('ghRepoInput', savedGh.repo || 'Gaurab7118/profile');
  setValue('ghBranchInput', savedGh.branch || 'main');
  setValue('ghPathInput', savedGh.path || 'data/profile.json');

  const publishBtn = document.getElementById('publishToGithubBtn');
  if (publishBtn) {
    publishBtn.addEventListener('click', async () => {
      const token = getValue('ghTokenInput').trim();
      const repo = getValue('ghRepoInput').trim();
      const branch = getValue('ghBranchInput').trim() || 'main';
      const path = getValue('ghPathInput').trim() || 'data/profile.json';

      if (!token || !repo) {
        alert('Please provide your GitHub Personal Access Token (PAT) and Repository name (e.g. username/repo).');
        return;
      }

      localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify({ token, repo, branch, path }));
      await saveProfileData(currentProfile);

      publishBtn.disabled = true;
      publishBtn.textContent = 'Publishing to GitHub...';

      try {
        await commitDataToGitHub(token, repo, branch, path, currentProfile);
        showToast('Successfully committed to GitHub! GitHub Pages will update worldwide shortly.');
      } catch (err) {
        console.error('GitHub Sync Error:', err);
        alert(`GitHub Sync Failed: ${err.message}\n\nPlease check your token permissions (contents:write) and repository name.`);
      } finally {
        publishBtn.disabled = false;
        publishBtn.textContent = '🚀 Publish Live to GitHub Pages';
      }
    });
  }

  // Export / Download profile.json
  const exportBtn = document.getElementById('exportJsonBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const cleanExport = JSON.parse(JSON.stringify(currentProfile));
      if (cleanExport.admin) {
        delete cleanExport.admin.pin;
      }
      const jsonStr = JSON.stringify(cleanExport, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'profile.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Downloaded profile.json! You can place this in your data/ folder on GitHub.');
    });
  }

  // Copy JSON to Clipboard
  const copyBtn = document.getElementById('copyJsonBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const cleanExport = JSON.parse(JSON.stringify(currentProfile));
      if (cleanExport.admin) {
        delete cleanExport.admin.pin;
      }
      const jsonStr = JSON.stringify(cleanExport, null, 2);
      navigator.clipboard.writeText(jsonStr).then(() => {
        showToast('Profile JSON copied to clipboard!');
      });
    });
  }

  // Import JSON File
  const importInput = document.getElementById('importJsonFile');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          currentProfile = imported;
          await saveProfileData(imported);
          initForms();
          showToast('Imported and saved profile.json successfully!');
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    });
  }

  // Reset to defaults
  const resetBtn = document.getElementById('resetDefaultsBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all changes back to original defaults? This will erase local storage changes.')) {
        resetProfileDataLocally();
        window.location.reload();
      }
    });
  }
}

/**
 * GitHub REST API Committer
 */
async function commitDataToGitHub(token, repo, branch, path, data) {
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
  
  let sha = null;
  const getRes = await fetch(apiUrl + `?ref=${branch}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (getRes.ok) {
    const fileInfo = await getRes.json();
    sha = fileInfo.sha;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const base64Content = btoa(unescape(encodeURIComponent(jsonContent)));

  const payload = {
    message: `Update profile data via Admin Panel [${new Date().toISOString()}]`,
    content: base64Content,
    branch: branch
  };
  if (sha) payload.sha = sha;

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify(payload)
  });

  if (!putRes.ok) {
    const errData = await putRes.json();
    throw new Error(errData.message || 'Failed to commit to GitHub.');
  }

  return await putRes.json();
}

/**
 * Form Helper Utilities
 */
function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) {
    el.value = val;
  }
}

/**
 * -------------------------------------------------------------
 * 10. Interactive Photo Resizer, Positioner & Cropper
 * -------------------------------------------------------------
 */
const cropperState = {
  active: false,
  image: null,
  rawUrl: '',
  aspect: '1:1',
  shape: 'circle',
  zoom: 1.0,
  panX: 0,
  panY: 0,
  rotation: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  callback: null,
  targetType: 'avatar'
};

function zoomCropper(step) {
  let newZoom = parseFloat((cropperState.zoom + step).toFixed(2));
  newZoom = Math.max(0.1, Math.min(4.0, newZoom));
  cropperState.zoom = newZoom;
  const zoomSlider = document.getElementById('cropperZoomSlider');
  const zoomVal = document.getElementById('cropperZoomValue');
  if (zoomSlider) zoomSlider.value = String(newZoom);
  if (zoomVal) zoomVal.textContent = Math.round(newZoom * 100) + '%';
  renderCropper();
}

function rotateCropper() {
  cropperState.rotation = (cropperState.rotation + 90) % 360;
  renderCropper();
}

function resetCropper() {
  cropperState.zoom = 1.0;
  cropperState.panX = 0;
  cropperState.panY = 0;
  cropperState.rotation = 0;
  const zoomSlider = document.getElementById('cropperZoomSlider');
  const zoomVal = document.getElementById('cropperZoomValue');
  if (zoomSlider) zoomSlider.value = '1.0';
  if (zoomVal) zoomVal.textContent = '100%';
  renderCropper();
}

function nudgeCropper(dx, dy) {
  cropperState.panX += dx;
  cropperState.panY += dy;
  renderCropper();
}

function initPhotoCropper() {
  const modal = document.getElementById('imageCropperModal');
  const closeBtn = document.getElementById('closeCropperModal');
  const cancelBtn = document.getElementById('cropperCancelBtn');
  const applyBtn = document.getElementById('cropperApplyBtn');
  const viewport = document.getElementById('cropperViewport');
  const zoomSlider = document.getElementById('cropperZoomSlider');
  const zoomVal = document.getElementById('cropperZoomValue');
  const zoomInBtn = document.getElementById('cropperZoomInBtn');
  const zoomOutBtn = document.getElementById('cropperZoomOutBtn');
  const rotateBtn = document.getElementById('cropperRotateBtn');
  const resetBtn = document.getElementById('cropperResetBtn');
  const aspectBtns = document.querySelectorAll('.cropper-aspect-btn');

  if (!modal) return;

  // Use .onclick to overwrite inline onclick attributes so buttons fire EXACTLY ONCE
  if (closeBtn) closeBtn.onclick = closeCropperModal;
  if (cancelBtn) cancelBtn.onclick = closeCropperModal;

  modal.onclick = (e) => {
    if (e.target === modal) closeCropperModal();
  };

  if (zoomSlider) {
    zoomSlider.oninput = (e) => {
      cropperState.zoom = parseFloat(e.target.value);
      if (zoomVal) zoomVal.textContent = Math.round(cropperState.zoom * 100) + '%';
      renderCropper();
    };
  }

  if (zoomInBtn) zoomInBtn.onclick = () => zoomCropper(0.1);
  if (zoomOutBtn) zoomOutBtn.onclick = () => zoomCropper(-0.1);

  if (rotateBtn) rotateBtn.onclick = rotateCropper;
  if (resetBtn) resetBtn.onclick = resetCropper;

  aspectBtns.forEach(btn => {
    btn.onclick = () => {
      const aspect = btn.getAttribute('data-aspect');
      const shape = btn.getAttribute('data-shape');
      setCropperAspect(aspect, shape);
    };
  });

  if (viewport) {
    // Mouse Drag Panning
    viewport.addEventListener('mousedown', (e) => {
      e.preventDefault();
      cropperState.isDragging = true;
      cropperState.dragStartX = e.clientX;
      cropperState.dragStartY = e.clientY;
      viewport.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!cropperState.isDragging) return;
      const dx = e.clientX - cropperState.dragStartX;
      const dy = e.clientY - cropperState.dragStartY;
      cropperState.panX += dx;
      cropperState.panY += dy;
      cropperState.dragStartX = e.clientX;
      cropperState.dragStartY = e.clientY;
      renderCropper();
    });

    window.addEventListener('mouseup', () => {
      if (cropperState.isDragging) {
        cropperState.isDragging = false;
        if (viewport) viewport.style.cursor = 'grab';
      }
    });

    // Touch Drag Panning (Mobile/Tablet)
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        cropperState.isDragging = true;
        cropperState.dragStartX = e.touches[0].clientX;
        cropperState.dragStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!cropperState.isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - cropperState.dragStartX;
      const dy = e.touches[0].clientY - cropperState.dragStartY;
      cropperState.panX += dx;
      cropperState.panY += dy;
      cropperState.dragStartX = e.touches[0].clientX;
      cropperState.dragStartY = e.touches[0].clientY;
      renderCropper();
    }, { passive: true });

    window.addEventListener('touchend', () => {
      cropperState.isDragging = false;
    });

    // Mouse Wheel Zooming
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const step = e.deltaY < 0 ? 0.05 : -0.05;
      zoomCropper(step);
    }, { passive: false });
  }

  if (applyBtn) {
    applyBtn.onclick = applyCropAndSave;
  }
}

function setCropperAspect(aspect, shape) {
  cropperState.aspect = aspect;
  cropperState.shape = shape;

  const viewport = document.getElementById('cropperViewport');
  const canvas = document.getElementById('cropperCanvas');
  if (!viewport || !canvas) return;

  const aspectBtns = document.querySelectorAll('.cropper-aspect-btn');
  aspectBtns.forEach(btn => {
    if (btn.getAttribute('data-aspect') === aspect) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  let targetW = 340;
  let targetH = 340;

  if (aspect === '1:1') {
    targetW = 340;
    targetH = 340;
  } else if (aspect === '4:5') {
    targetW = 280;
    targetH = 350;
  } else if (aspect === '16:9') {
    targetW = 440;
    targetH = 248;
  } else if (aspect === '16:10') {
    targetW = 420;
    targetH = 262;
  }

  const container = document.querySelector('.cropper-viewport-container');
  const availableWidth = container ? (container.clientWidth - 40) : 440;
  if (availableWidth > 0 && targetW > availableWidth) {
    const scaleRatio = availableWidth / targetW;
    targetW = Math.round(targetW * scaleRatio);
    targetH = Math.round(targetH * scaleRatio);
  }

  viewport.style.width = `${targetW}px`;
  viewport.style.height = `${targetH}px`;
  canvas.width = targetW;
  canvas.height = targetH;

  if (shape === 'circle') {
    viewport.classList.add('circle-mask');
  } else {
    viewport.classList.remove('circle-mask');
  }

  renderCropper();
}

/**
 * Converts relative or cross-origin image URLs into clean base64 Data URLs
 * so HTML5 Canvas NEVER gets tainted on file:// or cross-origin protocols.
 */
async function resolveCorsSafeImageSource(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return '';
  const trimmed = imageUrl.trim();
  if (trimmed.startsWith('data:')) return trimmed;

  const candidates = [];
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    candidates.push(trimmed);
  } else {
    const cleanRel = trimmed.replace(/^\/+/, '');
    if (window.location.protocol === 'file:') {
      candidates.push(`http://localhost:8000/${cleanRel}`);
      candidates.push(`http://127.0.0.1:8000/${cleanRel}`);
    } else {
      candidates.push(trimmed);
    }
  }

  for (const url of candidates) {
    try {
      const res = await fetch(url, { mode: 'cors', cache: 'no-store' });
      if (res.ok) {
        const blob = await res.blob();
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        if (dataUrl && typeof dataUrl === 'string' && dataUrl.startsWith('data:image')) {
          return dataUrl;
        }
      }
    } catch (e) {
      // try next candidate
    }
  }

  return trimmed;
}

async function openPhotoCropper(imageUrl, targetType = 'avatar', callback = null) {
  const modal = document.getElementById('imageCropperModal');
  if (!modal) return;

  const validUrl = (imageUrl && typeof imageUrl === 'string' && imageUrl.trim())
    ? imageUrl.trim()
    : 'image/avatar.jpg';

  cropperState.callback = callback;
  cropperState.targetType = targetType;
  cropperState.rawUrl = validUrl;
  cropperState.zoom = 1.0;
  cropperState.panX = 0;
  cropperState.panY = 0;
  cropperState.rotation = 0;
  cropperState.image = null;

  const slider = document.getElementById('cropperZoomSlider');
  if (slider) slider.value = '1.0';
  const zoomVal = document.getElementById('cropperZoomValue');
  if (zoomVal) zoomVal.textContent = '100%';

  const applyBtn = document.getElementById('cropperApplyBtn');
  if (applyBtn) {
    applyBtn.disabled = true;
    applyBtn.textContent = 'Loading photo...';
  }

  if (targetType === 'banner') {
    setCropperAspect('16:9', 'rect');
  } else if (targetType === 'project') {
    setCropperAspect('16:10', 'rect');
  } else if (targetType === 'portrait') {
    setCropperAspect('4:5', 'rect');
  } else {
    setCropperAspect('1:1', 'circle');
  }

  modal.classList.add('open');
  renderCropper();

  // Fetch as clean CORS-safe Data URL so canvas export NEVER gets tainted!
  const safeSrc = await resolveCorsSafeImageSource(validUrl);

  const img = new Image();
  if (safeSrc.startsWith('http://') || safeSrc.startsWith('https://')) {
    img.crossOrigin = 'Anonymous';
  }

  img.onload = () => {
    cropperState.image = img;
    cropperState.active = true;
    if (applyBtn) {
      applyBtn.disabled = false;
      applyBtn.textContent = '✓ Apply & Save Cropped Photo';
    }
    renderCropper();
  };

  img.onerror = () => {
    if (img.crossOrigin) {
      img.removeAttribute('crossOrigin');
      img.src = safeSrc;
      return;
    }
    if (applyBtn) {
      applyBtn.disabled = false;
      applyBtn.textContent = '✓ Apply & Save Cropped Photo';
    }
    showToast('Could not load image into editor.', 'error');
  };

  img.src = safeSrc;
}

function renderCropper() {
  const canvas = document.getElementById('cropperCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = '#050914';
  ctx.fillRect(0, 0, w, h);

  if (!cropperState.image) {
    ctx.fillStyle = '#818cf8';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Loading photo...', w / 2, h / 2);
    return;
  }

  const img = cropperState.image;
  const rad = (cropperState.rotation * Math.PI) / 180;
  const isRotated90 = (cropperState.rotation % 180 !== 0);
  const effW = isRotated90 ? img.naturalHeight : img.naturalWidth;
  const effH = isRotated90 ? img.naturalWidth : img.naturalHeight;

  const coverScale = Math.max(w / effW, h / effH);
  const scale = coverScale * cropperState.zoom;

  ctx.save();
  ctx.translate(w / 2 + cropperState.panX, h / 2 + cropperState.panY);
  ctx.rotate(rad);
  ctx.scale(scale, scale);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2, img.naturalWidth, img.naturalHeight);
  ctx.restore();
}

function applyCropAndSave() {
  if (!cropperState.image) return;

  const applyBtn = document.getElementById('cropperApplyBtn');
  if (applyBtn) {
    applyBtn.disabled = true;
    applyBtn.textContent = 'Saving crop...';
  }

  const canvas = document.getElementById('cropperCanvas');
  const w = canvas.width;
  const h = canvas.height;

  let outW = 800;
  let outH = 800;

  if (cropperState.aspect === '1:1') {
    outW = 800;
    outH = 800;
  } else if (cropperState.aspect === '4:5') {
    outW = 800;
    outH = 1000;
  } else if (cropperState.aspect === '16:9') {
    outW = 1600;
    outH = 900;
  } else if (cropperState.aspect === '16:10') {
    outW = 1200;
    outH = 750;
  } else {
    outW = Math.round(w * 2);
    outH = Math.round(h * 2);
  }

  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = outW;
  exportCanvas.height = outH;
  const expCtx = exportCanvas.getContext('2d');

  expCtx.fillStyle = '#050914';
  expCtx.fillRect(0, 0, outW, outH);

  const img = cropperState.image;
  const rad = (cropperState.rotation * Math.PI) / 180;
  const isRotated90 = (cropperState.rotation % 180 !== 0);
  const effW = isRotated90 ? img.naturalHeight : img.naturalWidth;
  const effH = isRotated90 ? img.naturalWidth : img.naturalHeight;

  const ratio = outW / w;
  const coverScale = Math.max(w / effW, h / effH);
  const scale = coverScale * cropperState.zoom * ratio;

  expCtx.save();
  expCtx.translate(outW / 2 + cropperState.panX * ratio, outH / 2 + cropperState.panY * ratio);
  expCtx.rotate(rad);
  expCtx.scale(scale, scale);

  expCtx.imageSmoothingEnabled = true;
  expCtx.imageSmoothingQuality = 'high';

  expCtx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2, img.naturalWidth, img.naturalHeight);
  expCtx.restore();

  let croppedResult = '';
  try {
    croppedResult = exportCanvas.toDataURL('image/jpeg', 0.90);
  } catch (err) {
    console.error('Canvas export error:', err);
    showToast('Could not export crop (browser security blocked this source). Please upload via Choose Photo or open via http://localhost:8000/admin.html', 'error');
    if (applyBtn) {
      applyBtn.disabled = false;
      applyBtn.textContent = '✓ Apply & Save Cropped Photo';
    }
    return;
  }

  const cb = cropperState.callback;
  closeCropperModal();
  if (applyBtn) {
    applyBtn.disabled = false;
    applyBtn.textContent = '✓ Apply & Save Cropped Photo';
  }

  if (typeof cb === 'function') {
    cb(croppedResult);
  }
}

function closeCropperModal() {
  const modal = document.getElementById('imageCropperModal');
  if (modal) modal.classList.remove('open');
  cropperState.active = false;
  cropperState.isDragging = false;
}

// Expose globally for resilient inline and external event handling
window.zoomCropper = zoomCropper;
window.rotateCropper = rotateCropper;
window.resetCropper = resetCropper;
window.nudgeCropper = nudgeCropper;
window.closeCropperModal = closeCropperModal;
window.applyCropAndSave = applyCropAndSave;
window.openPhotoCropper = openPhotoCropper;
window.setCropperAspect = setCropperAspect;
