# 🚀 Deployment Guide

Your Imposter Game PWA is built and ready to share with the world. Here's how to deploy it.

---

## Quick Deploy (Pick One)

### 🟦 **Vercel** (Fastest - Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Build the app**:
   ```bash
   cd /var/home/jmusal/imposter-game
   npm run build
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Done!** Your app is live. Get the URL from the output.

---

### 🟠 **Netlify** (Also Easy)

1. **Build the app**:
   ```bash
   cd /var/home/jmusal/imposter-game
   npm run build
   ```

2. **Create account at netlify.com**

3. **Drag & drop** the `dist/` folder onto Netlify

4. **Done!** Get your URL and share it.

---

### 🐙 **GitHub Pages** (Free, Forever)

1. **Build the app**:
   ```bash
   cd /var/home/jmusal/imposter-game
   npm run build
   ```

2. **Create a GitHub repo** (or use existing)

3. **Push the `dist/` folder**:
   ```bash
   git init
   git add dist/
   git commit -m "Deploy Imposter Game"
   git branch -M gh-pages
   git remote add origin https://github.com/YOUR_USERNAME/imposter-game.git
   git push -u origin gh-pages
   ```

4. **Enable Pages** in GitHub Settings → Pages → Source: gh-pages

5. **Your app is live** at: `https://YOUR_USERNAME.github.io/imposter-game/`

---

### 🔧 **Self-Hosted** (VPS, Heroku, etc.)

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your server

3. **Configure web server** to serve `dist/index.html` for all routes

   **Nginx example**:
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     root /var/www/imposter-game/dist;
     index index.html;
     try_files $uri $uri/ /index.html;
   }
   ```

   **Apache example** (add to `dist/.htaccess`):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. **Restart your server** and visit your domain

---

## ✅ Pre-Deploy Checklist

Before deploying, make sure:

- [ ] App builds without errors: `npm run build`
- [ ] No TypeScript errors: Check build output
- [ ] Tested on mobile: Works on iPhone and Android
- [ ] PWA installs properly: Try "Install app" from browser menu
- [ ] Offline mode works: Disconnect internet, play a game
- [ ] Scores persist: Start a game, reload, scores are still there

---

## 🌐 After Deployment

### Share the Link
- **Send to friends**: Simple URL they can visit and install
- **Add to home screen**: Works on any device
- **No app store needed**: Just a web link

### Monitor Performance
- Check browser DevTools Network tab for bundle size
- Test on slow 3G to ensure responsiveness
- Verify PWA manifest is served with correct MIME type

### Updates
If you modify the game and redeploy:
- Deployed version auto-updates via service worker
- Users will see an "App updated" notification (browser-dependent)

---

## 🔐 HTTPS Requirement

PWA features (service worker, install prompts) **require HTTPS** on production:
- ✅ Vercel/Netlify: Automatic HTTPS
- ✅ GitHub Pages: Automatic HTTPS
- ⚠️ Self-hosted: Use Let's Encrypt (free) or buy a certificate

---

## 📊 Performance Tips

1. **Reduce bundle size** (if needed):
   - Remove unused Tailwind components
   - Code-split components (not needed for this app)

2. **Cache strategy** already configured via PWA plugin:
   - Static assets cached forever
   - HTML/JS/CSS update with new service worker
   - Optimal for offline play

3. **CDN** (optional):
   - Vercel/Netlify already use global CDNs
   - Faster worldwide, especially outside US

---

## 🐛 Troubleshooting Deployments

| Problem | Cause | Solution |
|---------|-------|----------|
| "Cannot find module" at deploy | Local modules missing | Run `npm install` before build |
| Blank page after deploy | Wrong base URL | Check `vite.config.ts` base path |
| PWA won't install | Not HTTPS | Use Vercel/Netlify (free HTTPS) |
| Scores not saving | Browser storage disabled | Ensure localStorage is enabled |
| Old version after update | Service worker caching | Hard refresh (Ctrl+Shift+R) |

---

## 🎯 Environment Variables (if you add API calls later)

Create `.env.production`:
```
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📈 Example: Complete Vercel Deploy

```bash
# 1. Build
cd /var/home/jmusal/imposter-game
npm run build

# 2. Install Vercel CLI (one-time)
npm install -g vercel

# 3. Login
vercel login

# 4. Deploy production
vercel --prod

# Output: Your URL is: https://imposter-game.vercel.app
```

That's it! Share the URL with your daughter's friends.

---

## 🎉 Done!

Your game is live and ready to play. Enjoy! 🕵️✨

**Next Steps**:
- Test the deployed link on your phone
- Install as an app
- Share with friends
- Have fun!
