# URGENT: Fix Cloudflare Pages Deploy Settings

## The Problem

Cloudflare Pages is trying to run `wrangler deploy` as a deploy command, which causes the infinite redirect error because Wrangler is trying to deploy as a **Cloudflare Worker** instead of **Pages**.

## The Solution: Disable Deploy Command

You MUST do this in Cloudflare Dashboard:

### Steps:

1. Go to **Cloudflare Dashboard**
2. Navigate to **Workers & Pages** → **Pages**
3. Click your **imposter-game** project
4. Go to **Settings** → **Build & Deploy**
5. Look for **Build command** section
6. Find the **Deploy Command** field
7. **DELETE** the content (should currently show `npx wrangler deploy` or similar)
8. Leave it **empty/blank**
9. Click **Save**

### Verify Settings Should Be:

- ✅ Framework preset: Vite
- ✅ Build command: `npm run build`
- ✅ Build output directory: `dist`
- ✅ Root directory: (blank)
- ✅ **Deploy command: (EMPTY - DELETE THIS)**

## Then Rebuild

Once the Deploy Command is removed:
1. Go back to **Deployments** tab
2. Click the **three dots** on the most recent failed deployment
3. Click **Retry**
4. It should now succeed ✅

## Why This Works

- Cloudflare Pages handles SPA routing automatically
- We use `_routes.json` to configure the routing rules
- We DON'T need Wrangler at all for Pages
- The Deploy Command was auto-added and breaking everything
