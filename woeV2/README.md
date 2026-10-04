# World of Explorers — v2

A faithful copy of the live site at worldofexplorers.com (built originally on
Emergent), moved to a standard Vite + React project so it can be hosted on
Vercel.

- `src/` is the original component source, recovered from the live build.
  The entry files were renamed for Vite (`index.js` → `main.jsx`,
  `App.js` → `App.jsx`), and the forms now post to this project's own `/api`.
- `tailwind.config.js` was rebuilt from the original compiled CSS.
- `lucide-react` is pinned to `0.524.0`, the release whose icons match the
  live site exactly.

Rendered side by side with the original build, every page (home, programs,
quote and the call popup) is pixel-identical at 1440px and 390px wide.

## Pages

| Route       | What it is                                          |
| ----------- | --------------------------------------------------- |
| `/`         | Landing page, booking form, "talk it through" popup |
| `/programs` | Full programs & experiences menu                    |
| `/quote`    | Quote questionnaire                                 |

The original `/admin` dashboard was removed: submissions now arrive by email.

## Forms

The booking form posts to `api/inquiries.js` and the quote form to
`api/quotes.js`, two Vercel functions that send email through
[Resend](https://resend.com). Each submission sends:

1. a notification to `FORM_TO_EMAIL`, with Reply-To set to the visitor so
   replying goes straight to them, and
2. a short confirmation to the visitor (best effort: if it fails, the
   submission still succeeds).

Both forms carry a hidden `company_website` field. Bots that fill it in get
a fake success and no email is sent.

Set these in the Vercel project (see `.env.example`):

| Variable          | Example                                            |
| ----------------- | -------------------------------------------------- |
| `RESEND_API_KEY`  | `re_...` from resend.com/api-keys                  |
| `FORM_TO_EMAIL`   | `connect@worldofexplorers.com` (comma-separate several) |
| `FORM_FROM_EMAIL` | `World of Explorers <hello@worldofexplorers.com>`  |

The sender's domain must be verified in Resend (DNS records added at
Namecheap) before emails can go to anyone other than the Resend account owner.

## Commands

```sh
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Deploying on Vercel

The `woev2` Vercel project builds this folder (Root Directory `woeV2`).
`vercel.json` adds the SPA rewrite so `/programs` and `/quote` load directly,
while `/api/*` goes to the functions.
