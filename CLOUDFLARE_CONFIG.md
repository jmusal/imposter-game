# ✅ Correct Cloudflare Pages Configuration

## Settings Should Be:

| Setting | Value |
|---------|-------|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | **(blank/empty)** ← IMPORTANT |
| Deploy command | `npm run deploy` |

## Important:

- **Root directory** should be BLANK (the repo root is the source)
- **Build output directory** is `dist` (where built files go)
- Cloudflare Pages automatically serves from the build output directory

## If Still Showing "Hello World":

The issue might be that there's a conflict. Let me check if `_routes.json` is causing problems by deleting it and using Cloudflare's native SPA routing instead.
