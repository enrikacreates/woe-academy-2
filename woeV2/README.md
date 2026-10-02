# World of Explorers — v2

A faithful copy of the live site at worldofexplorers.com (built originally on
Emergent), moved to a standard Vite + React project so it can be hosted on
Vercel.

- `src/` is the original component source, recovered from the live build.
  Only two things changed: the entry files were renamed for Vite
  (`index.js` → `main.jsx`, `App.js` → `App.jsx`), and the backend URL is now
  read from `VITE_BACKEND_URL` instead of `REACT_APP_BACKEND_URL`.
- `tailwind.config.js` was rebuilt from the original compiled CSS.
- `lucide-react` is pinned to `0.524.0`, the release whose icons match the
  live site exactly.

Rendered side by side with the original build, every page (home, programs,
quote, admin and the call popup) is pixel-identical at 1440px and 390px wide.

## Pages

| Route       | What it is                                       |
| ----------- | ------------------------------------------------ |
| `/`         | Landing page, booking form, "talk it through" popup |
| `/programs` | Full programs & experiences menu                 |
| `/quote`    | Quote questionnaire                              |
| `/admin`    | Owner login to view meeting and quote requests   |

## Backend

The booking form (`POST /api/inquiries`), quote form (`POST /api/quotes`) and
admin page (`/api/auth/*`, `/api/admin/*`) talk to the Emergent backend at
`VITE_BACKEND_URL` (see `.env.example`). That backend is served from the
worldofexplorers.com domain, so it needs a replacement before the domain is
pointed at this project.

## Commands

```sh
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Deploying on Vercel

Create a Vercel project from this repository with **Root Directory** set to
`woeV2`. `VITE_BACKEND_URL` defaults to `https://worldofexplorers.com`
(see `vite.config.js`); set it in the project's environment variables to
point the forms somewhere else.
`vercel.json` adds the SPA rewrite so `/programs`, `/quote` and `/admin` load
directly.
