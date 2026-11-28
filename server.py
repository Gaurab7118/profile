#!/usr/bin/env python3
"""
server.py - Local Development Server for Independent Profiles
Syncs edits & uploads between:
  - d:\profile\new profile
  - d:\profile\old profile
"""

import http.server
import json
import os
import sys
import base64
import urllib.parse
import time
from socketserver import ThreadingMixIn

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Ensure directories exist only inside profile folders
for sub in ['new profile', 'old profile']:
    os.makedirs(os.path.join(BASE_DIR, sub, 'data'), exist_ok=True)
    os.makedirs(os.path.join(BASE_DIR, sub, 'image'), exist_ok=True)
    os.makedirs(os.path.join(BASE_DIR, sub, 'assets'), exist_ok=True)

class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Cache-Control, Pragma')
        self.send_header('Access-Control-Allow-Private-Network', 'true')
        super().end_headers()

    def do_GET(self):
        # Auto-redirect root requests to new profile
        if self.path in ('/', '/index.html'):
            self.send_response(302)
            self.send_header('Location', '/new%20profile/')
            self.end_headers()
            return

        if self.path in ('/admin', '/admin.html'):
            self.send_response(302)
            self.send_header('Location', '/new%20profile/admin.html')
            self.end_headers()
            return

        # Health / Server check endpoint
        if self.path.startswith('/api/status'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            file_path = os.path.join(BASE_DIR, 'new profile', 'data', 'profile.json')
            mtime = os.path.getmtime(file_path) if os.path.exists(file_path) else 0
            self.wfile.write(json.dumps({"status": "ok", "mode": "local_server", "mtime": mtime}).encode('utf-8'))
            return
        
        # Route generic /data/profile.json to new profile
        if self.path.startswith('/data/profile.json'):
            file_path = os.path.join(BASE_DIR, 'new profile', 'data', 'profile.json')
            if os.path.exists(file_path):
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                with open(file_path, 'rb') as f:
                    self.wfile.write(f.read())
                return

        super().do_GET()

    def do_POST(self):
        # API: Save profile data to both new profile and old profile
        if self.path == '/api/save-profile':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode('utf-8'))
                paths_to_update = [
                    os.path.join(BASE_DIR, 'new profile', 'data', 'profile.json'),
                    os.path.join(BASE_DIR, 'old profile', 'data', 'profile.json')
                ]
                for p in paths_to_update:
                    os.makedirs(os.path.dirname(p), exist_ok=True)
                    with open(p, 'w', encoding='utf-8') as f:
                        json.dump(data, f, indent=2, ensure_ascii=False)
                        f.flush()
                        os.fsync(f.fileno())
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "success",
                    "message": "Saved directly to profile.json in both new profile and old profile!"
                }).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
            return

        # API: Upload image to both new profile/image and old profile/image & purge old versions
        if self.path == '/api/upload-image':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                payload = json.loads(body.decode('utf-8'))
                img_type = payload.get('type', 'general')
                raw_filename = payload.get('filename', '')
                base64_data = payload.get('data', '')

                if not base64_data or (',' not in base64_data and not base64_data.startswith('data:')):
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "error", "message": "Invalid base64 image data"}).encode('utf-8'))
                    return

                ext = '.jpg'
                if base64_data.startswith('data:image/png'):
                    ext = '.png'
                elif base64_data.startswith('data:image/webp'):
                    ext = '.webp'
                elif base64_data.startswith('data:image/svg'):
                    ext = '.svg'
                elif base64_data.startswith('data:image/jpeg'):
                    ext = '.jpg'
                elif raw_filename:
                    _, file_ext = os.path.splitext(raw_filename)
                    if file_ext.lower() in ('.jpg', '.jpeg', '.png', '.webp', '.svg'):
                        ext = '.jpg' if file_ext.lower() == '.jpeg' else file_ext.lower()

                if ',' in base64_data:
                    base64_data = base64_data.split(',', 1)[1]

                img_bytes = base64.b64decode(base64_data)

                target_dirs = [
                    os.path.join(BASE_DIR, 'new profile', 'image'),
                    os.path.join(BASE_DIR, 'old profile', 'image')
                ]
                for d in target_dirs:
                    os.makedirs(d, exist_ok=True)

                if img_type == 'avatar':
                    clean_name = f"avatar{ext}"
                    prefix_match = "avatar"
                elif img_type in ('aboutImage', 'portrait', 'about'):
                    clean_name = f"about{ext}"
                    prefix_match = "about"
                elif img_type == 'banner':
                    clean_name = f"banner{ext}"
                    prefix_match = "banner"
                elif img_type in ('labImage', 'lab', 'spotlight'):
                    clean_name = f"research{ext}"
                    prefix_match = "research"
                elif img_type == 'project':
                    safe_part = "".join(c for c in os.path.splitext(raw_filename)[0] if c.isalnum() or c in ('-', '_')).strip()
                    if not safe_part:
                        safe_part = f"project_{int(time.time())}"
                    else:
                        safe_part = f"proj_{safe_part}"
                    clean_name = f"{safe_part}{ext}"
                    prefix_match = safe_part
                else:
                    safe_part = "".join(c for c in os.path.splitext(raw_filename)[0] if c.isalnum() or c in ('-', '_')).strip()
                    if not safe_part:
                        safe_part = f"image_{int(time.time())}"
                    clean_name = f"{safe_part}{ext}"
                    prefix_match = safe_part

                for folder in target_dirs:
                    try:
                        for existing_file in os.listdir(folder):
                            base_no_ext, _ = os.path.splitext(existing_file)
                            if base_no_ext == prefix_match and existing_file != clean_name:
                                try:
                                    os.remove(os.path.join(folder, existing_file))
                                    print(f"Deleted previous image in {folder}: {existing_file}")
                                except Exception:
                                    pass
                    except Exception:
                        pass

                for folder in target_dirs:
                    target_path = os.path.join(folder, clean_name)
                    with open(target_path, 'wb') as f:
                        f.write(img_bytes)
                        f.flush()
                        os.fsync(f.fileno())

                timestamp = int(time.time())
                rel_url = f"image/{clean_name}?t={timestamp}"

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "success",
                    "url": rel_url,
                    "cleanUrl": f"image/{clean_name}",
                    "filename": clean_name,
                    "message": f"Image saved across both profiles in image/{clean_name} (older versions removed)!"
                }).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
            return

        # API: Upload CV / Resume to both new profile/assets and old profile/assets
        if self.path == '/api/upload-cv':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                payload = json.loads(body.decode('utf-8'))
                raw_filename = payload.get('filename', 'resume.pdf')
                base64_data = payload.get('data', '')

                if not base64_data:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "error", "message": "No file data"}).encode('utf-8'))
                    return

                if ',' in base64_data:
                    base64_data = base64_data.split(',', 1)[1]

                file_bytes = base64.b64decode(base64_data)

                target_asset_dirs = [
                    os.path.join(BASE_DIR, 'new profile', 'assets'),
                    os.path.join(BASE_DIR, 'old profile', 'assets')
                ]
                for d in target_asset_dirs:
                    os.makedirs(d, exist_ok=True)
                    with open(os.path.join(d, 'resume.pdf'), 'wb') as f:
                        f.write(file_bytes)
                    with open(os.path.join(d, 'cv.pdf'), 'wb') as f:
                        f.write(file_bytes)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "success",
                    "url": "assets/resume.pdf",
                    "message": "Resume/CV saved across both profiles!"
                }).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
            return

        super().do_POST()

class ThreadingHTTPServer(ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True

def run():
    server_address = ('', PORT)
    httpd = ThreadingHTTPServer(server_address, PortfolioHandler)
    print("=" * 64)
    print(f"  Gaurab Samadder - Portfolio Server running at http://localhost:{PORT}")
    print(f"  New Website : http://localhost:{PORT}/new%20profile/")
    print(f"  Old Website : http://localhost:{PORT}/old%20profile/")
    print(f"  Admin Portal: http://localhost:{PORT}/new%20profile/admin.html")
    print("=" * 64)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close()

if __name__ == '__main__':
    run()
