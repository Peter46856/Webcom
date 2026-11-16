# Verification

## Full-page content pass — October 31, 2026

All 25 public routes were checked before and after expansion. Visible main-page text increased from 8,613 to 23,005 words; every route increased. Closed disclosure content is excluded from these browser counts. Coverage and limitations are recorded in `CONTENT-DEPTH.md`.

- Production build and TypeScript compilation passed.
- ESLint passed for source and tests.
- Nine public regression checks passed against the fresh production build, including guide/article chapter coverage on all 25 routes and mobile overflow checks.
- Six mocked-Supabase admin checks passed after adding task-specific guidance.
- Desktop/mobile reading layouts were visually inspected. Guide and article chapter links were checked against their actual target IDs.
- No Java implementation or database policy changes were made in this content pass.

## October 31, 2026 expansion

- Production build: passed with 25 public content routes plus the private admin workspace and APIs.
- ESLint on source, test fixtures, and Playwright configs: passed after updating asynchronous inbox loading.
- TypeScript: passed.
- Public browser suite: 9 passed, including all 25 content routes and responsive checks on the new pages.
- Admin browser suite: 6 workflow checks passed using an isolated local Supabase fixture: anonymous/non-admin denial, cross-origin denial, login and inquiry status changes, article create/preview/publish/unpublish/delete, logout, and mobile overflow.
- Screenshots reviewed: admin dashboard/editor at desktop and mobile sizes; expanded industry and network service pages.
- Dependency audit: 16 moderate reports in the ESLint development dependency chain, rooted in the minimatch advisory GHSA-g3hv-75wg-m249. The audit's affected package nodes are dev-only; no runtime dependency is flagged by this audit snapshot. Do not apply npm's suggested incompatible ESLint downgrade blindly. No new production dependency advisories were reported.
- Java code was unchanged by this expansion; the previous 7 Java tests remain the prior verification baseline.

The admin tests use mock Auth/PostgREST responses and do not prove live Supabase RLS configuration. The new SQL migration must be applied and a real admin account allowlisted before production use. No live inquiry data was read or altered as part of the admin fixture tests. See `ADMIN.md` for setup and `COMPETITOR-REVIEW.md` for research sources and limits.

## Original October 30 baseline

Validated locally on October 30, 2026.

- Next.js production build: passed; public pages are pre-rendered.
- ESLint: passed with no warnings.
- TypeScript: passed.
- npm dependency audit after updating MDX to v6: zero known vulnerabilities reported.
- Playwright / Microsoft Edge: 9 tests passed, including all 17 content routes, mobile overflow/navigation, project diagrams, blog filtering/search, API rejection cases, inquiry failure preservation, mocked inquiry confirmation, and 404 behavior.
- Java 21 / Maven: 7 tests passed (4 validation/controller unit tests and 3 HTTP integration checks). The real Spring application started successfully; HTTP tests confirm authentication, validation, and unavailable-storage responses.
- Desktop homepage, mobile homepage, and mobile contact screenshots: inspected visually.

The form's browser success test mocks the endpoint response. No live Supabase project credentials were supplied, so database creation and a real inquiry persistence check remain deployment configuration steps. Docker configuration is provided but was not executed locally.

Repeat the frontend checks with `npm run lint`, `npm run typecheck`, `npm run build`, and `npm test`. Browser tests run against the production build; build first. Repeat Java checks with `mvn test` in `backend`.
