# WebCom architecture

## October 31 expansion

The public website now has dedicated industry, delivery, engagement, standards, and FAQ routes in addition to the original service/project/article pages. Detailed review and decisions: `COMPETITOR-REVIEW.md`.

The new `/admin` workspace uses the official Supabase client for password sign-in. A server-only HTTP-only cookie holds a short-lived access token; no refresh token is stored. Every page/API checks `auth.getUser()` and UUID membership in `admin_members`. Supabase RLS also limits inquiry reads/status updates and blog writes to those members. Public signup and membership writes are not exposed. Setup: `ADMIN.md`.

The Java application continues to own public inquiry intake and persistence. Next.js admin operations use the administrator's own token and the project's publishable key, rather than the Java service-role credential. Only the inquiry status column is granted for admin updates.

Local trusted MDX remains for the original three guides. New posts are stored in `blog_posts` and rendered as Markdown with raw HTML, executable MDX, and images disabled. Public reads use an anonymous client and explicit publication filters. Homepage, blog listing/details, and sitemap are rendered dynamically so publishing does not require a rebuild. DB failures fall back to the original articles and log a sanitized diagnostic event; the admin reports data-load errors.

Admin pages are dynamic, noindex, and outside the sitemap. Mutation endpoints enforce same-origin requests. Login throttling is process-local; production requires an edge limiter. A separate mock Supabase fixture supports reproducible admin tests without live credentials.

## System boundaries

```text
Visitor
  │ HTTPS
  ▼
Next.js / React / TypeScript
  ├─ Static service, project, about, and privacy pages
  ├─ Server-rendered local MDX engineering journal
  └─ POST /api/inquiries
       │ origin check, body limit, validation, process-local rate limit
       │ server-only X-WebCom-Token
       ▼
Java 21 / Spring Boot
  └─ POST /api/inquiries
       │ shared-token authentication + Bean Validation
       ▼
Supabase Data API / PostgreSQL
  └─ private public.inquiries table, RLS enabled
```

The website's stack is Next.js/React, Java, and Supabase. Other technologies listed in case studies describe those separate projects, not additional dependencies for this portfolio.

## Decisions

- **Next.js App Router:** pre-rendered service, industry, and company pages; dynamic public blog content; individual metadata, sitemap, and React interactions where useful. The private admin workspace is authenticated separately.
- **Plain CSS token system:** deliberate, responsive styling with minimal runtime dependencies. Navy `#090d16`, surface `#131c2e`, cyan `#00f2fe`, blue `#4facfe`, text `#f8fafc`, muted `#94a3b8`.
- **Typography:** Space Grotesk for headings and DM Sans for body copy. Google Fonts is currently a stylesheet import with system fallbacks; self-host the fonts if third-party font requests are unsuitable for deployment.
- **Java application boundary:** the API owns the inquiry persistence operation. Next.js exposes a same-origin proxy; no database credentials reach the browser. Java is separately deployable.
- **Supabase REST rather than a browser SDK:** this use case needs one private write operation and no browser data access. The Java server uses the Supabase Data API over HTTPS with a server secret key (or legacy service role key).
- **Local trusted MDX:** articles live in `content/blog`. The explicit catalog in `src/lib/blog.ts` controls published slugs and metadata. Never compile untrusted MDX; it executes code on the server.
- **Content integrity:** no invented client logos, testimonials, uptime claims, success metrics, biographies, or deployment certifications. Case-study UI illustrations are conceptual and labeled. The studio facts count disciplines and featured projects.

## Contact behavior

The form validates in the browser, Next.js, and Java. Success follows a successful Supabase write; missing credentials, API failures, and storage failures cannot produce a success message. The browser preserves input on failure. There is no email notification integration: review inquiries in Supabase or add a transactional mail provider later.

An optional real HTTPS scheduling link is enabled with `NEXT_PUBLIC_BOOKING_URL`. Without it, the visitor is directed to the inquiry form. No fake calendar slots or contact details are displayed.

The local limiter is not distributed. In production, enforce a body limit and rate limit at the trusted reverse proxy/CDN, overwrite incoming forwarding headers, keep Java private, and consider a verified challenge if spam warrants it. The current frontend checks payload size after reading the body; proxy-level limits prevent oversized bodies from consuming application memory. A shared limiter is needed if using multiple Next.js processes.

## Suggested deployment

1. Next.js on a Node-capable host; Java on a private container service, both behind HTTPS.
2. Supabase in the appropriate region, with the migration applied and table access checked.
3. Set the website's real canonical origin before building; use the same value at runtime.
4. Give Next.js the private Java URL and a random shared token of at least 32 characters. Give Java the matching token and Supabase server credential.
5. Configure a real scheduling URL if desired; review the privacy notice, contact ownership, and retention policy.

## Future changes

Add a CMS only when nontechnical editing is needed. Add authentication only for an actual private workflow. Add measured project outcomes only when the studio can substantiate them. Avoid adding background workers or microservices until their operational requirements justify them.
