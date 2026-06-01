# PestControl99 — Customer Website (Vite + React)

Public customer website for [pestcontrol99.com](https://www.pestcontrol99.com), built with **Vite**, **React 19**, and **React Router**. Lives in `pestcontroll99/` inside the backend monorepo and does not affect Django CRM routes.

## Quick start

```bash
cd pestcontroll99
npm install
npm run dev
```

Open **http://localhost:3001**

## Environment

Copy `.env.example` to `.env.local`:

```env
VITE_CRM_API_URL=http://localhost:8000
VITE_GOOGLE_MAPS_API_KEY=your_key
```

In development, Vite proxies `/api/*` to `VITE_CRM_API_URL` (default `http://localhost:8000`), so forms and blogs talk to your local Django backend without CORS issues.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 3001 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |

## Architecture

- **UI**: React + Tailwind CSS v4
- **Routing**: React Router (client-side)
- **SEO**: `react-helmet-async` per page
- **Forms**: Submit directly to Django `/api/inquiries/` (no Next.js API routes)
- **Blog**: Fetches from Django `/api/public/blogs/`

## Deployment

Build static assets:

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, Cloudflare Pages, or any static host. Point `VITE_CRM_API_URL` to production (`https://api.vacationbna.site` or your Railway URL).

## Note on email notifications

Previously, Next.js API routes sent Zoho SMTP emails. With Vite (static frontend), forms only submit to the CRM API. Email can be added later on the Django backend if needed.
