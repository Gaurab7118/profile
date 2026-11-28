# ⚡ Gaurab Samadder | M.Tech CSE, IIT Kharagpur — Portfolio

Personal Portfolio and Research Showcase of **Gaurab Samadder**, M.Tech Scholar in Computer Science & Engineering at the **Indian Institute of Technology, Kharagpur (IIT KGP)**.

---

## 🌟 Architecture & Directory Structure

```
profile/
├── new profile/                 # Modern Cybernetic Systems Architecture Portfolio
│   ├── index.html               # Public portfolio featuring Synapse Particle Grid, 3D Tilt, & Terminal Bench
│   ├── admin.html               # Built-in CMS Admin Portal (PIN: 1234)
│   ├── style.css                # Obsidian & Neon Emerald/Cyan design system
│   ├── script.js                # Interactive runtime, 3D tilt, and dynamic shell
│   ├── data/profile.json        # Central profile & research data store
│   ├── image/                   # High-resolution research & portrait photography
│   └── assets/                  # Curriculum Vitae & Resume PDFs
│
├── old profile/                 # Classic Terminal & Bento Portfolio (Completely Independent)
│   ├── index.html               # Classic portfolio layout
│   ├── admin.html               # Classic admin portal
│   ├── data/profile.json        # Standalone data store
│   ├── image/                   # Standalone image assets
│   └── assets/                  # Standalone resume & CV files
│
├── index.html                   # Automatic Gateway Router (Routes seamlessly to new profile/)
├── server.py                    # Local multi-threaded synchronization server
└── start_server.bat             # 1-click launcher for local testing
```

---

## 🚀 Running Locally

1. Double-click `start_server.bat` (or run `python server.py`).
2. Open your browser:
   - **Portfolio Website**: [http://localhost:8000/](http://localhost:8000/) *(auto-redirects to `new profile/`)*
   - **Admin CMS Dashboard**: [http://localhost:8000/new%20profile/admin.html](http://localhost:8000/new%20profile/admin.html) *(PIN: `1234`)*
   - **Classic Portfolio**: [http://localhost:8000/old%20profile/](http://localhost:8000/old%20profile/)

---

## 🌐 Deploying to GitHub Pages

1. In GitHub, go to your repository **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select `Deploy from a branch`.
3. Set the Branch to **`main`** and folder to **`/(root)`**, then click **Save**.
4. Your website will be live at: `https://<username>.github.io/profile/`
