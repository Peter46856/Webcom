# WebCom administration

Pricing is managed at `/admin/pricing`: edit prices, features, exclusions, currency, visibility, and ordering. Follow [PRICING.md](PRICING.md) to apply the additional migration and review estimate assumptions.

Inquiry recipient settings are at `/admin/notifications`; the initial address is `pjuma655@gmail.com`. See [EMAIL-NOTIFICATIONS.md](EMAIL-NOTIFICATIONS.md) for sender credentials, Java restart, and verification. An inquiry's **Send email notification** button retries to the current recipient while preserving the saved inquiry.

## One-time setup

1. Keep the Java inquiry API running as before. It still receives and saves new public inquiries.
2. Run the **contents** of `supabase/migrations/202610310001_admin_and_blog.sql` in the Supabase SQL editor, in the same project that contains `inquiries`. Apply the original inquiries migration first if this is a new project. Existing inquiry rows are preserved.
3. In Supabase **Authentication → Users**, create your administrator account with an email and strong password. Confirm the email as appropriate. There is no public website sign-up endpoint.
4. Copy that user's UUID. In the SQL editor, grant access with:

```sql
insert into public.admin_members (user_id)
values ('PASTE-THE-AUTH-USER-UUID-HERE')
on conflict do nothing;
```

5. Add these entries to the root `.env.local`, keeping your existing Java settings:

```dotenv
SUPABASE_URL=https://YOUR-ACTUAL-PROJECT.supabase.co
SUPABASE_PUBLISHABLE_KEY=YOUR-PUBLISHABLE-KEY
```

Use the project's **publishable key** (`sb_publishable_...`) or legacy **anon** key. Do not use a `sb_secret_...` or service_role key for these entries. Supabase RLS grants the authenticated user only the permissions assigned through administrator membership. The backend's secret key configuration is unchanged.

6. Restart Next.js. Visit `/admin` or use **Studio admin** in the footer. Sign in with the account from step 3. Supabase sign-in credentials are separate from the Java shared API token.

The administrator role cannot be self-granted through the application. To revoke access:

```sql
delete from public.admin_members where user_id = 'ACTUAL-USER-UUID';
```

Each protected request checks membership again, including existing signed-in sessions.

## Inquiry management

- Inbox shows 25 inquiries per page, newest first, with status filters.
- Select a conversation to read the full brief, contact address, scope, budget, and submission date.
- Mark it new, contacted, qualified, or closed. No response email is automatically sent when status changes.
- The dashboard shows exact inquiry counts and managed draft/published article counts.
- Inquiries are not publicly readable. Ordinary authenticated users are not administrators.

## Blog publishing

- Use **Blog studio → Create article**.
- Enter a title, unique lowercase slug, summary, category, and at least 100 characters of body content.
- Use Markdown headings, paragraphs, lists, links, quotes, and code blocks. HTML and executable MDX are disabled; images are not rendered by the managed content renderer.
- Preview the article, save a private draft, or publish it. You can edit, unpublish, and permanently delete managed posts after confirmation.
- Published posts appear on `/blog`, individual `/blog/[slug]` URLs, the homepage journal, and the sitemap. Drafts are filtered by server queries and database RLS.
- Slugs used by the original three file-based MDX articles are reserved. Those articles remain editable in `content/blog`, preserving the original repository workflow.
- Changing a published slug changes its URL; this version does not automatically create redirects.

The editor warns on browser unload with unsaved changes. Save before navigating within the workspace. No file uploads, scheduled publishing, autosave, or revision history are implied.

## Session and deployment behavior

- Access tokens are stored in an HTTP-only, SameSite Strict cookie, secure on HTTPS. No refresh token or password is persisted by the application.
- Sessions expire after at most one hour; sign in again when expired. Supabase token expiration can make this period shorter.
- Every sensitive page and endpoint checks authorization; a hidden menu is not the security boundary.
- Mutation endpoints require a matching origin. Set `NEXT_PUBLIC_SITE_URL` to the real website origin before production build and restart.
- Public blog queries use the publishable key without an admin session, so private drafts cannot leak into public lists.
- Keep HTTPS enabled, restrict direct Java ingress, and configure edge request size/rate limits. The login limiter is process-local; distributed deployments need a trusted edge limiter.
- Configure account recovery through Supabase. No MFA setup or password reset UI is bundled in this release.

## Troubleshooting

| Symptom                                  | Check                                                                                        |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| Setup notice on login                    | The two Supabase settings above are missing; restart Next.js after setting them.             |
| Credentials accepted but access rejected | Apply the migration and check the signed-in user's exact UUID in admin_members.              |
| Empty inbox despite existing data        | Confirm both Java and Next.js use the same Supabase project.                                 |
| Posts cannot be saved                    | Apply the blog migration; check unique slug, body length, and category.                      |
| A draft appears missing publicly         | This is expected. Only published records are public.                                         |
| Published changes do not appear          | Refresh the public page. Check the publication state, project URL, and `[blog]` server logs. |
| Session expired                          | Sign in again; saved drafts remain in the database.                                          |

Live sign-in and RLS must be verified against your own Supabase project after applying the SQL. Local mock tests are not proof of a live database configuration.

## Managing projects

Run `supabase/migrations/202610310002_projects.sql` in the Supabase SQL editor after the existing admin migration. Paste the SQL file contents, not the filename. This creates the public project catalog and imports the three original case studies without overwriting existing records.

Open `/admin/projects` after signing in. Add the name, URL slug, summary, challenge, approach, technologies, capabilities, and architecture components. Saving publishes immediately. Remove asks for confirmation and permanently deletes the selected project; its URL then returns 404. Project listings, homepage cards, details and sitemap read this catalog without rebuilding. An empty catalog stays empty. If the database is unavailable, public pages temporarily use the original bundled case studies; admin shows a database error rather than pretending changes succeeded.

The sun/moon control in the website header and admin sidebar changes the light/dark theme and remembers the choice in this browser. Dark remains the default.
