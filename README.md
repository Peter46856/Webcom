# WebCom Engineering Studio

A complete source project for the WebCom company portfolio: Next.js + React + TypeScript frontend, Java Spring Boot inquiry API, Supabase PostgreSQL migration, local MDX engineering journal, and deployment configuration.

## Expanded website and administration

**Pricing and email:** `/pricing` explains seven feature-based package ranges. `/admin/pricing` manages packages, prices, features, exclusions, and publication. `/admin/notifications` manages the private inquiry recipient. Run the contents of `supabase/migrations/202611010001_pricing.sql` after the admin migration, then follow [pricing setup](docs/PRICING.md) and [email setup](docs/EMAIL-NOTIFICATIONS.md). Email requires a Resend key, verified sender, and a restart of both Next.js and the updated Java backend. Inquiries remain saved in admin even if mail fails.

The website now includes 25 public content pages before any additional managed articles: dedicated service and case-study details, industry hub and three industry pages, delivery process, engagement models, engineering standards, buyer FAQs, and the original pages. Navigation connects these routes rather than relying on homepage sections.

Visit `/admin` for the private studio workspace: inquiry inbox, status management, and blog draft/preview/publish/edit/unpublish/delete. It uses Supabase authentication and explicit administrator membership. **Follow [docs/ADMIN.md](docs/ADMIN.md)** to apply the new migration, create your account, and add the project URL and publishable key to `.env.local`. New content uses safe Markdown in Supabase; the three original MDX guides are preserved.

The research and improvement rationale are in [docs/COMPETITOR-REVIEW.md](docs/COMPETITOR-REVIEW.md), with a dated, sourced comparison against Thoughtworks, Netguru, BairesDev, Intellectsoft, and Andela. Claims about their private admin systems or unverified service outcomes are not made.

## Quick start — website

Requires Node.js 20.9+ (Node 24 recommended).

```powershell
cd C:\Users\pjuma\OneDrive\Desktop\WebCom
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. All public pages and interactions work without database credentials. The contact form explicitly reports that inquiries are unavailable until the Java API and Supabase are configured.

## Connect inquiries

1. Create a Supabase project. Run `supabase/migrations/202610300001_inquiries.sql` in its SQL editor. RLS is enabled with no browser policies; only the backend service role can access submissions.
2. Generate a random shared token of at least 32 characters. For example, in Node: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Do not commit it.
3. Install JDK 21 and Maven 3.9+ to run Java locally (or use Docker below).
4. Set the backend environment in a separate PowerShell terminal:

```powershell
$env:SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co'
$env:SUPABASE_SECRET_KEY = 'YOUR-SERVER-SECRET-KEY'
$env:WEBCOM_API_TOKEN = 'YOUR-RANDOM-SHARED-TOKEN'
cd C:\Users\pjuma\OneDrive\Desktop\WebCom\backend
mvn spring-boot:run
```

Maven does not automatically read `backend/.env.example` or `.env` files. Set environment variables in the shell or IDE. Both a modern Supabase secret key and a legacy service_role JWT are supported. Never use a browser/publishable key for the backend and never expose a server secret through `NEXT_PUBLIC_*`.

5. In the root `.env.local`, set:

```dotenv
JAVA_API_URL=http://localhost:8080
JAVA_API_TOKEN=YOUR-RANDOM-SHARED-TOKEN
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Optional: real HTTPS consultation scheduling URL
NEXT_PUBLIC_BOOKING_URL=
```

6. Restart Next.js, submit an inquiry, and confirm the new row in Supabase. There is no email delivery integration; inquiries are stored for review in Supabase.

## Pages

- `/` — hero, interactive system map, capabilities, projects, engineering approach, facts, journal
- `/services` and four service detail pages
- `/projects` and three case studies with selectable architecture components
- `/blog` — search and category filtering; three full MDX articles
- `/about`, `/contact`, `/privacy`
- `/sitemap.xml`, `/robots.txt`, favicon, and custom error/404 pages

## Editing content

The detailed reading chapters are in `src/lib/page-guides.ts` (company and hub pages) and `src/lib/domain-guides.ts` (service, project, and industry pages). They render through `src/components/page-guide.tsx` with chapter navigation and reference tables. The page-by-page content expansion audit is in `docs/CONTENT-DEPTH.md`. Original MDX articles include their own chapter navigation and computed reading times.

- Services and projects: `src/lib/content.ts`
- Articles: `content/blog/*.mdx`; add a catalog entry in `src/lib/blog.ts` when publishing a new file
- Company metadata and canonical URL: `src/lib/site.ts` and environment variables
- Design tokens and responsive styles: `src/app/globals.css`
- Contact scope/budget options: `src/lib/inquiry.ts`; keep the Java validation and SQL constraints in sync

The articles are original starter engineering guides, not claims of measured production results. Replace or review them before publishing. Conceptual project illustrations are labeled. No stock photos, invented testimonials, customer logos, or unsupported performance numbers are included.

## Project structure

```text
src/app/                 App Router pages, metadata, and same-origin inquiry endpoint
src/components/          Shared layout and interactive React components
src/lib/                 Site config, content catalog, validation, MDX loading
content/blog/            Trusted local MDX source
backend/                 Java 21 Spring Boot API and unit tests
supabase/migrations/     Private inquiry table and access rules
tests/                   Playwright navigation, interaction, mobile, and form tests
docs/                    Architecture and design decisions
compose.yaml             Website + private Java API containers
```

## Checks

```powershell
npm run lint
npm run typecheck
npm run build
npm test
npm run test:admin
cd backend
mvn test
```

Playwright uses installed Microsoft Edge on Windows (`channel: 'msedge'`). On another OS, install a supported browser and change the project channel or use Playwright Chromium. Form success tests mock the API response; they do not claim a live Supabase connection.

The admin suite starts an isolated production server at port 3100 and a local Supabase fixture at 54329. It tests authorization and publishing behavior without using real credentials. Its database responses are mocks; apply and verify actual Supabase RLS in your own project before production use. Build before either browser suite.

## Docker

Create a root `.env` with `SUPABASE_URL`, `SUPABASE_SECRET_KEY` (Java only), `SUPABASE_PUBLISHABLE_KEY` (admin/blog), `WEBCOM_API_TOKEN`, and optionally `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_BOOKING_URL`. Then:

```powershell
docker compose up --build
```

Next.js is exposed at port 3000; the Java API is internal to the Compose network. Apply the Supabase migration separately. Docker uses `.env` for Compose interpolation; Next.js local development uses `.env.local`. Match the shared token in both configurations.

## Before publishing

Set the real site origin and consultation URL, configure credentials, verify one stored inquiry, review the content and privacy notice, and configure the hosting proxy's request size limits and rate limiting. Restrict Java ingress, enforce HTTPS, set a retention policy, and assign an owner to review new inquiries. Font CSS currently loads Google Fonts with system fallbacks; self-host if required. See `docs/ARCHITECTURE.md` for operational limitations.
