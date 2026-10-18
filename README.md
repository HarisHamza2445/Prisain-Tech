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

## Signed agreements

The last booking step shows the client agreement (`lib/contract.js`). The client signs by typing their name (or drawing), and gets a signed PDF copy.

To keep a copy of every signed agreement, set these in Vercel (see `.env.example`):

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — run `supabase/agreements.sql` in the Supabase SQL editor first. PDFs go to the private `agreements` bucket, details to the `agreements` table.
- `RESEND_API_KEY`, `AGREEMENT_NOTIFY_EMAIL` — an email with the PDF attached for each signature.

- `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_NOTIFY_TO`, `WHATSAPP_TEMPLATE` — the signed PDF and the signer's details sent to your WhatsApp through the WhatsApp Business Platform (Meta). Create a **Utility** template named as in `WHATSAPP_TEMPLATE`, with a **Document** header and this body:

  ```
  New signed agreement
  Name: {{1}}
  WhatsApp: {{2}}
  Package: {{3}}
  Reference: {{4}}
  Signed: {{5}}
  ```

Any one of these is enough. Without any, signing still works and the client is asked to send the PDF on WhatsApp.
