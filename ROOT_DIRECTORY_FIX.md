# 🔧 Fix: Tell Cloudflare to Serve dist/ Folder

The "Hello world" page means Cloudflare is serving its default index, not your built React app.

## The Problem

Cloudflare Pages is looking for files in the **root** of the repo, not in the `dist/` folder.

## The Solution

Go to **Cloudflare Dashboard** → **imposter-game** → **Settings** → **Build & Deploy**

Find the **Root directory** setting and change it to:

```
dist
```

Leave everything else the same:
- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: **`dist`** ← ADD THIS

Then click **Save** and go to **Deployments** → **Retry build**

This tells Cloudflare Pages to serve files FROM the `dist` folder (where your built app is).

## Why

- Your build creates files in `/dist/index.html`
- By default, Cloudflare looks in `/index.html`
- Setting Root directory to `dist` tells it to serve `/dist/index.html` as `/index.html`
