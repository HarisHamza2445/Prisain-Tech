# PrisainTech

Marketing site for PrisainTech, built with Next.js (App Router).

```bash
npm install
npm run dev
```

- `app/` — layout, the single page, global styles, icon, robots and sitemap
- `components/sections/` — one file per page section, in page order
- `components/` — navbar, intro, 3D stage, scroll effects, toast
- `lib/site.js` — WhatsApp number, email, intake form link, nav links
- `lib/packages.js`, `lib/services.js` — package and service content
- `lib/stage.js` — the three.js scene behind the page

Set `NEXT_PUBLIC_SITE_URL` to the live address when deploying (used for share links and the sitemap).
