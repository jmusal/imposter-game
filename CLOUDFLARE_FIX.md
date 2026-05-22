# Cloudflare Pages Deployment Fix

## What Went Wrong

Cloudflare tried to deploy using **Cloudflare Workers** instead of **Cloudflare Pages**, which caused an infinite redirect loop error in the `_redirects` file.

The error:
```
Invalid _redirects configuration:
Line 1: Infinite loop detected in this rule.
```

## What We Fixed

1. **Removed problematic Wrangler configs** - `wrangler.jsonc`, `wrangler.toml`, `src/worker.ts`
2. **Simplified `_redirects`** - Now just `/* /index.html 200` (the simplest valid rule)
3. **Kept Vite + PWA config** - This is what Cloudflare Pages uses

## Key Difference

- **Cloudflare Workers** = Serverless compute (like AWS Lambda) - needs special config
- **Cloudflare Pages** = Static site hosting with auto-routing - much simpler

We want **Pages**, not **Workers**.

## How to Deploy Now

You need to tell Cloudflare Pages to use Cloudflare Pages, not Workers:

1. Go to **Cloudflare Dashboard** → **Pages**
2. Click your **imposter-game** project
3. Go to **Settings** → **Build & Deploy**
4. Verify:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** (blank)
5. **Remove** any Deploy Command (don't use `wrangler deploy`)
6. Save and redeploy

Or use GitHub UI to trigger a redeploy by pushing to master (we just did that).

## Status

✅ Code updated and pushed to GitHub  
⏳ Waiting for Cloudflare Pages to rebuild (check dashboard)

The next build should succeed without the infinite redirect error!
