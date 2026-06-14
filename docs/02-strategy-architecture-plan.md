# Duxio Strategy, Architecture, And Implementation Plan

## Brand Strategy

Duxio is not an AI automation agency. Duxio is a revenue infrastructure partner for businesses that already have demand but lose revenue in the handoffs: missed calls, slow DMs, loose forms, manual booking, weak CRM hygiene, and forgotten follow-up.

Core promise: we build the operating layer between attention and revenue.

Brand attributes:

- Intelligent: shows diagnosis before persuasion.
- High-end: restrained, precise, and systemized.
- Fast: one focused pilot shipped in a tight window.
- Trustworthy: shows process, controls, data handling, and ownership.
- Technical: exposes the operating model without overwhelming the buyer.
- Sophisticated: avoids generic AI tropes, glow-heavy visuals, and agency cliches.

Voice:

- Direct, calm, specific.
- Avoid hype and jargon.
- Prefer operational language: capture, qualify, route, recover, measure.
- Speak to revenue loss as a system design issue, not a personal failure.

## Design System

Design language: revenue control room. Dark precision, warm signal accents, modular panels, subtle telemetry grids, and measured reveal. Visual elements should feel like instruments, not decorations.

Color system:

- Void: `#07080a` for depth and premium contrast.
- Panel: `#0d0f12`, `#12161b`, `#171d23` for layered hierarchy.
- Ink: `#f4f2ec` for high-contrast text.
- Muted ink: `#b9b4aa`, `#77726a`, `#3f3c37` for secondary hierarchy.
- Signal: `#f4d19b` for primary attention.
- Copper: `#c97b45` and `#f0b47b` for warmth and urgency without red-alarm cliche.
- Success: `#9fd28a` for confirmed system state.
- Danger: `#ff795f` for true errors only.

Typography system:

- Display: high-contrast serif stack for large brand moments.
- Sans: system UI stack for readability, speed, and interface precision.
- Mono: system monospace for labels, telemetry, status, and operational cues.
- Scale: hero clamp from 4.1rem to 9.4rem, section titles from 2.25rem to 3.75rem, card titles from 1.25rem to 1.5rem, body from 1rem to 1.25rem with generous line height, labels at 0.68rem uppercase mono.

Component system:

- Button variants: primary, secondary, ghost, copper.
- Form fields: input, textarea, select, label with focus-visible states.
- Section heading: eyebrow, title, copy, alignment.
- Metric cards: value, label, detail.
- Panels: consistent border, background, shadow, and radius.
- Motion reveal wrapper.
- GSAP signal scanner.
- Scorecard engine.
- Lead intake form.
- Admin dashboard widgets.

Icon system:

Use Lucide icons only for functional concepts: missed call, workflow, calendar, shield, activity, chart, message, radar. Avoid emoji and brand-icon dependencies.

Motion system:

- Motion should clarify system behavior.
- Use Framer Motion for reveal, opacity, and section entry.
- Use GSAP only where continuous precision animation is meaningful, such as the signal scanner.
- Avoid bounce, elastic, random glow, or excessive parallax.
- Respect `prefers-reduced-motion`.

Accessibility system:

- High text contrast on dark surfaces.
- Visible focus rings.
- Semantic section structure.
- Button and link keyboard access.
- Radix primitives for tabs and accordion behavior.
- Reduced-motion CSS override.
- Form labels tied to inputs.
- Mobile-first layouts with safe hit targets.

## Information Architecture

1. Hero: category, promise, CTAs, operating visual, key metrics.
2. Audit: critique of the old experience and rationale for rebuild.
3. Revenue OS: where demand leaks and how the system changes it.
4. Method: how Duxio scopes, ships, instruments, and compounds systems.
5. Services: capture, pipeline, intelligence.
6. Trust: operating controls and proof posture.
7. Scorecard: progressive diagnostic and qualification signal.
8. Architecture: experience, API, control, and data layers.
9. Book: lead intake and booking handoff.
10. FAQ: category clarity and risk reduction.
11. Admin: protected operator dashboard.

## Backend Architecture

Secure architecture:

- Route handlers validate every payload with Zod.
- In-memory rate limits protect public endpoints.
- JWT session cookie protects admin routes.
- HttpOnly, same-site cookie configuration.
- Prisma schema models all core business entities.
- Integration webhooks are isolated behind adapter functions.
- Logging uses Pino with sensitive-field redaction.

API layer:

- `POST /api/leads`: validate intake, score lead, persist, CRM sync, analytics event.
- `POST /api/scorecard`: validate scorecard, persist result, analytics event.
- `POST /api/booking`: validate booking request, booking webhook handoff, analytics event.
- `POST /api/analytics`: validate event stream, persist, analytics webhook handoff.
- `POST /api/conversations`: validate visitor message, persist conversation, return helpful response.
- `POST /api/auth/login`: validate credentials, rate limit, issue session.

Lead management:

Lead intake captures name, email, company, revenue range, source, and leak description. Lead score combines source intent, revenue range, urgency keywords, and problem detail depth. Priority buckets are nurture, review, qualified, and hot.

Booking integration:

Booking endpoint is designed for Calendly or another scheduler. It currently returns the public booking URL and supports a `BOOKING_WEBHOOK_URL` for production integration.

Analytics pipeline:

Analytics events include page views, CTA clicks, scorecard completions, lead submissions, booking requests, chat messages, and admin actions. Events support session ID, path, referrer, properties, and future fingerprint fields.

CRM integration layer:

CRM sync is abstracted through `syncLeadToCrm`. Production can connect HubSpot, Close, GoHighLevel, Salesforce, Attio, or a custom webhook without changing the UI.

Admin dashboard:

Admin includes protected routes, login, KPI cards, lead qualification queue, and system-health events. The current dashboard is scaffolded with representative data and ready to be connected to Prisma queries.

Logging and error monitoring:

Pino handles structured server logs. Integration failures are caught and logged without breaking user flows. Production should add Sentry or OpenTelemetry for error traces and alerting.

## Database Schema

Implemented in `prisma/schema.prisma`.

- `User`: admin operators and roles.
- `Contact`: unique identity record for email, company, phone, source, consent.
- `Lead`: lead source, problem, score, priority, status, attribution.
- `Conversation`: channel-level thread linked to contact or lead.
- `Message`: individual messages with metadata.
- `Booking`: booking request, scheduled state, external URL or ID.
- `AnalyticsEvent`: typed event stream for user behavior.
- `UserAction`: lower-level interaction tracking.
- `ScorecardResult`: score, answers, result, optional lead link.
- `AuditLog`: admin and system actions.
- `IntegrationSync`: CRM, booking, analytics, and webhook sync state.

## Component Architecture

- `src/components/ui`: primitives and shared UI contracts.
- `src/components/motion`: animation utilities.
- `src/components/layout`: header and footer.
- `src/components/sections`: page sections and conversion flows.
- `src/components/admin`: admin-specific UI.
- `src/lib`: content model, validation, scoring, auth, db, integrations, logging.
- `src/app/api`: typed API route handlers.
- `src/app/admin`: protected dashboard and login.

## Page Architecture

- `/`: static marketing and diagnostic experience, with client islands only where interaction is required.
- `/admin/login`: public login surface.
- `/admin`: dynamic protected operator surface.
- API routes: dynamic server routes.
- `proxy.ts`: route protection for admin paths.

## Animation System

- `Reveal`: Framer Motion scroll reveal with blur reduction and controlled easing.
- `SignalScanner`: GSAP-controlled scanner that communicates capture, score, and route.
- State transitions: scorecard progress, selected answers, form submission, success handoff.
- Reduced motion: CSS clamps animation duration for users who prefer less motion.

## Performance Plan

- Keep homepage mostly server-rendered.
- Use client components only for scorecard, form, tabs, accordion, and GSAP visual.
- Avoid external font downloads during build.
- Avoid giant base64 assets.
- Keep icons tree-shakable.
- Use static generation for the homepage and dynamic rendering only for admin and API routes.
- Instrument before optimizing further with Lighthouse.

## Complete Implementation Plan

Phase 1: Foundation

- Replace static HTML with Next.js App Router, TypeScript, Tailwind, and reusable components.
- Establish tokenized color, typography, spacing, radius, shadow, and focus systems.
- Build initial homepage architecture from strategy.

Phase 2: Conversion system

- Implement scorecard with result logic.
- Implement lead intake with validation.
- Implement booking handoff.
- Add analytics event endpoints.
- Add CRM adapter stubs.

Phase 3: Operations

- Implement Prisma schema.
- Add admin auth.
- Add dashboard scaffold.
- Add logging and rate limits.
- Add integration sync records.

Phase 4: Production hardening

- Replace mock admin data with Prisma queries.
- Add Sentry or OpenTelemetry.
- Add database migrations in the deployment environment.
- Add real CRM and booking credentials.
- Add transactional email/SMS provider.
- Add consent and privacy pages.
- Add automated tests for API routes and scoring.

Phase 5: Proof and scale

- Add anonymized case studies.
- Add live system screenshots.
- Add before/after workflow diagrams.
- Add integration marketplace pages.
- Add segmented landing pages by industry and leak type.
