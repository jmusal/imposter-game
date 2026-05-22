# Cloudflare Pages Deployment Guide

Deploy your Imposter Game to Cloudflare Pages at `imposter.jmusal.com` with automatic HTTPS and privacy settings.

## Prerequisites

- ✅ Cloudflare account (you already have this with your domain)
- ✅ Domain on Cloudflare (you already have jmusal.com)
- ✅ Git repository (we just created this!)
- ✅ GitHub/GitLab account (for Cloudflare to pull from)

## Step 1: Push to GitHub

First, create a repo on GitHub and push your code there.

```bash
cd /var/home/jmusal/imposter-game

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/imposter-game.git

# Rename branch to main (GitHub default)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 2: Connect Cloudflare Pages to GitHub

1. Go to **Cloudflare Dashboard** → **Pages**
2. Click **Create a project**
3. Select **Connect to Git**
4. Authorize GitHub and select your `imposter-game` repository
5. Click **Begin setup**

## Step 3: Configure Build Settings

In the Cloudflare Pages setup:

**Framework:** Vite
**Build command:** `npm run build`
**Build output directory:** `dist`
**Root directory:** (leave blank)

Then click **Environment variables** and add (if needed):
- None required for this MVP

## Step 4: Set Your Domain

1. After the initial deploy, go to **Settings** → **Domains**
2. Click **Add domain**
3. Enter `imposter.jmusal.com`
4. Follow Cloudflare's DNS setup (if needed)
   - Cloudflare should detect your domain already
   - Just confirm the CNAME record pointing to Cloudflare Pages

## Step 5: Verify No-Index Settings

Your privacy/no-crawl settings are already in place:

✅ `robots.txt` - Disallows all bots  
✅ `index.html` - Meta tag: `noindex, nofollow`  
✅ `_headers` - HTTP header: `X-Robots-Tag: noindex, nofollow`

**Result:** Search engines won't index or crawl your site. It's completely private.

## Step 6: Enable HTTPS (Automatic)

Cloudflare Pages **automatically** provisions SSL/TLS certificates. Your site will be:
- ✅ Served over HTTPS
- ✅ Using Cloudflare's free SSL
- ✅ A-grade SSL rating

## Step 7: Test Your PWA

Visit **https://imposter.jmusal.com** and:

1. ✅ Page loads over HTTPS
2. ✅ Browser shows PWA install prompt (mobile)
3. ✅ Can "Add to Home Screen" to install as PWA
4. ✅ Offline functionality works
5. ✅ Robots.txt blocks crawlers (verify at `https://imposter.jmusal.com/robots.txt`)

---

## Going Live: The Step-by-Step Flow

### First Time Deploy
```
1. Push to GitHub
   git push -u origin main

2. Cloudflare Pages auto-builds
   (watch the build log in Cloudflare dashboard)

3. Deployed at temporary URL first
   https://[hash].pages.dev

4. Add custom domain imposter.jmusal.com
   (Settings → Domains → Add custom domain)

5. Wait ~5 minutes for DNS to propagate

6. Visit https://imposter.jmusal.com
   ✅ Live and private!
```

### Future Deploys
```
1. Make changes locally
   git add .
   git commit -m "feat: new feature"

2. Push to GitHub
   git push origin main

3. Cloudflare auto-rebuilds and deploys
   (no manual steps needed!)
```

---

## Security & Privacy Headers

Cloudflare Pages automatically sends these headers (configured in `_headers`):

```
X-Robots-Tag: noindex, nofollow          # Tell search engines to ignore
X-Frame-Options: SAMEORIGIN              # Prevent clickjacking
X-Content-Type-Options: nosniff           # Prevent MIME sniffing
X-XSS-Protection: 1; mode=block           # Protect against XSS
Referrer-Policy: strict-origin-when-cross-origin  # Control referrer info
Permissions-Policy: geolocation=(), microphone=(), camera=()  # No device access
```

---

## Disable Indexing (Double-Check)

Even though we've set it up, verify it's working:

1. **Check robots.txt:**
   ```
   https://imposter.jmusal.com/robots.txt
   ```
   Should show all bots disallowed.

2. **Check meta tags:**
   Right-click → Inspect → Look for:
   ```html
   <meta name="robots" content="noindex, nofollow">
   ```

3. **Verify with Google (later):**
   Once deployed, you can test with Google Search Console to confirm Google respects the noindex tag.

---

## What If Something Goes Wrong?

### Build fails
- Check the build logs in Cloudflare dashboard
- Common issue: missing environment variables
- Solution: Add to Environment variables in Cloudflare settings

### Site shows old version
- Cloudflare caches by default
- Purge cache: Dashboard → **Caching** → **Purge Cache**
- Or wait 5 minutes

### Domain not resolving
- Check DNS settings in Cloudflare dashboard
- Ensure CNAME points to `[your-pages-project].pages.dev`
- SSL/TLS mode should be "Full"

### PWA won't install
- Must be HTTPS (✅ Cloudflare provides this)
- Must have valid manifest (✅ Vite PWA plugin creates this)
- Try hard refresh: Ctrl+Shift+R or Cmd+Shift+R

---

## Advanced Options (Optional)

### Add Cloudflare Analytics
1. Dashboard → **Analytics & Logs** → **Analytics**
2. See traffic to imposter.jmusal.com (anonymized, respects no-crawl)

### Enable Caching
1. Dashboard → **Caching** → Set to "Standard"
2. Improves performance (recommended for PWA)

### Block by Country
1. Dashboard → **Security** → **Geo-blocking**
2. Optional: restrict access by geography

### Rate Limiting
1. Dashboard → **Security** → **Rate limiting**
2. Optional: prevent abuse (probably not needed for a game)

---

## Deployment Checklist

- [ ] GitHub account created
- [ ] Repository pushed to GitHub
- [ ] Cloudflare Pages connected to GitHub repo
- [ ] Build settings configured (Vite, npm run build, dist/)
- [ ] Custom domain `imposter.jmusal.com` added
- [ ] DNS propagated (~5 min)
- [ ] Site accessible at https://imposter.jmusal.com
- [ ] PWA installs on mobile
- [ ] robots.txt confirms no-crawl
- [ ] Shared with daughter & friends!

---

## Cost

**Cloudflare Pages:** FREE
- Unlimited deployments
- Unlimited bandwidth
- Free SSL/HTTPS
- No credit card required for this use case

---

## Summary

You now have:
- ✅ Private, no-index site at imposter.jmusal.com
- ✅ Free HTTPS/SSL
- ✅ PWA fully functional
- ✅ Auto-deploys on every git push
- ✅ Zero crawling/indexing

Your daughter can share the link with friends, install it as a PWA on their phones, and play offline. Perfect! 🎮
