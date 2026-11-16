# Pricing and packages

Reviewed: 1 November 2026. Public route: `/pricing`. Admin route: `/admin/pricing`.

## Estimate basis

These are WebCom planning estimates, not industry-standard prices or verified WebCom delivery quotes. Clutch's [pricing guide](https://clutch.co/developers/pricing), updated 21 September 2026 and accessed 1 November 2026, reports a commonly reviewed project band around USD 10,000–49,000 and typical listed rates around USD 24–49/hour. Its Java table lists USD 25–49/hour. [Upwork's developer marketplace](https://www.upwork.com/hire/web-developers/) describes a broad USD 15–50/hour band with specialist variation. Marketplace scopes and providers differ from WebCom.

The proposed WebCom baseline is approximately USD 50 per engineering hour, covering planned design, implementation, testing, and handover. This is a studio planning assumption, not a rate supplied by either source. Review profitability, capacity, local demand, and taxes before making binding offers.

| Package                     | Planning effort     | Initial USD range | Basis          |
| --------------------------- | ------------------- | ----------------- | -------------- |
| Discovery & architecture    | 15–40 hours         | 750–2,000         | Engagement     |
| Business website            | 30–90 hours         | 1,500–4,500       | Project        |
| Workflow application / MVP  | 120–300 hours       | 6,000–15,000      | Project        |
| Enterprise & fleet platform | 360–1,200 hours     | 18,000–60,000     | Phased project |
| ISP billing & provisioning  | 50–160 hours        | 2,500–8,000       | Project        |
| Cloud & delivery foundation | 30–100 hours        | 1,500–5,000       | Project        |
| Engineering care            | 10–40 hours monthly | 500–2,000         | Month          |

Feature caps define the starting scope. Hours are an internal rationale, not an unlimited entitlement; only care explicitly offers contracted monthly capacity. Timelines depend on capacity, approvals, access, content, and integrations. Taxes and listed third-party costs are separate. Discovery is separate unless expressly included; enterprise discovery is included within its stated scope. A written proposal confirms cost, acceptance criteria, schedule, and milestones. There is no checkout or automatic contract.

## Setup and management

1. Apply the existing admin migration first.
2. Run all SQL inside `supabase/migrations/202611010001_pricing.sql` in Supabase SQL Editor. It also creates private notification settings, and preserves existing packages and settings on reruns.
3. Open **Admin → Pricing & packages**. Review the seven seeded packages before making offers.
4. Edit prices, currency, billing basis, name, description, category, timeline, features, exclusions, and display order. Use one line per feature or exclusion.
5. Check **Publish on the website** and save. Uncheck to hide a package. Delete permanently removes it after confirmation.

Amounts are whole currency units. USD, KES, EUR, and GBP are supported; selecting a currency does not convert prices. Package IDs stay fixed after creation. Published updates appear on the homepage and `/pricing` without rebuilding. Choosing a package prefills the contact message; visitors can edit it.

Anonymous users read only published rows. APIs and RLS require admin membership for changes. If a configured database fails, public pricing shows an estimate-request message instead of obsolete fallback prices. Defaults are used only when Supabase is entirely unconfigured. An empty catalog stays empty.

The browser suite covers draft/publish/edit/hide/delete, feature changes, invalid ranges, inquiry context, mobile layout, origin checks, and anonymous API denial using mocked Supabase. Live database installation remains a setup step.
