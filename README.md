# Duxio Rebuild

Premium revenue-infrastructure experience for Duxio, rebuilt from the supplied static HTML into a Next.js App Router project with TypeScript, Tailwind CSS, Framer Motion, Radix UI, Lucide icons, Prisma, API routes, lead scoring, booking handoff, analytics events, CRM adapter stubs, auth, logging, and an optional admin dashboard.

## Key Files

- `docs/01-ux-audit.md`: full audit of the original website.
- `docs/02-strategy-architecture-plan.md`: brand strategy, IA, design system, backend architecture, database schema, component architecture, page architecture, animation system, and implementation plan.
- `src/app/page.tsx`: new homepage composition.
- `src/lib/content.ts`: structured business and page content.
- `prisma/schema.prisma`: database schema.
- `src/app/api/*`: validated API layer.
- `src/app/admin`: protected admin surface.

## Run Locally

```bash
npm install
npx prisma generate
npm run db:init
npm run dev
```

## Launch Notes

The public site is ready to deploy with Formspree and Calendly as the lead pipeline:

- Main form and exit-intent widget submit to `https://formspree.io/f/xlgkonnz`.
- Successful form submission sends visitors to `https://calendly.com/duxio-ai/30min`.
- The admin dashboard is optional and is not linked from the public site.

If you want to use `/admin` in production, configure a persistent database and set these environment variables:

```txt
DATABASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=
AUTH_SECRET=
```

For a simple Vercel launch, Formspree + Calendly is enough. The dashboard can stay protected and unused until a production database is connected.

## Verify

```bash
npm run lint
npm run build
```

Both commands pass in the current build.

Note: `prisma db push` currently fails in this local Prisma 7/SQLite schema-engine path with an opaque engine error, while `prisma validate`, `prisma generate`, and `prisma migrate diff` succeed. `npm run db:init` applies the generated SQL migration directly with `better-sqlite3` for local development.
