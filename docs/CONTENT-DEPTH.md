# Public-page content depth review

Reviewed October 31, 2026. All 25 existing public routes received page-specific additions. No new client outcomes, certifications, project dates, founder biography, or customer attributions were invented.

## What changed

- Four or five additional substantive chapters for each of the 22 non-article pages, with chapter navigation and reference tables where useful.
- Distinct workflows for SaaS, dispatch, vehicle observations, subscriber entitlement, payment reconciliation, cloud releases, and handover.
- Worked architecture explanations for all three projects, explicitly separated from unpublished production claims.
- Expanded MDX articles with event sequences, failure analysis, recovery questions, implementation examples, and chapter links.
- Automatic reading-time calculation for file-based articles.
- Task-specific help for the admin overview, inquiry inbox, blog manager, and editor.
- Reading layout with a desktop chapter rail, mobile chapter list, and contained horizontally scrollable reference tables.

## Rendered coverage

Counts measure visible text inside the main landmark, including headings and chapter links, using the same browser method before and after. Closed FAQ answers are not counted. These figures check coverage; word count alone does not establish editorial quality.

| Route                                    | Before | After |
| ---------------------------------------- | -----: | ----: |
| /                                        |    639 |  1176 |
| /services                                |    259 |   762 |
| /services/software-engineering           |    441 |  1126 |
| /services/logistics-systems              |    418 |  1040 |
| /services/network-infrastructure         |    404 |  1029 |
| /services/cloud-devops                   |    406 |  1029 |
| /projects                                |    195 |   718 |
| /projects/ecoroute                       |    431 |  1051 |
| /projects/fleet-command                  |    421 |  1042 |
| /projects/isp-billing                    |    427 |  1057 |
| /blog                                    |    160 |   602 |
| /blog/designing-reliable-event-pipelines |    442 |  1190 |
| /blog/payment-to-provisioning            |    436 |  1192 |
| /blog/clear-system-boundaries            |    382 |  1086 |
| /about                                   |    248 |   796 |
| /contact                                 |    194 |   737 |
| /privacy                                 |    185 |   632 |
| /industries                              |    339 |   767 |
| /industries/logistics-and-transport      |    299 |   898 |
| /industries/internet-service-providers   |    280 |   858 |
| /industries/saas-and-enterprise          |    294 |   896 |
| /how-we-work                             |    429 |   966 |
| /engagements                             |    426 |   961 |
| /engineering                             |    311 |   837 |
| /faq                                     |    147 |   557 |

Total visible words: 8613 → 23005. All routes returned HTTP 200.

## Verification

Production build and TypeScript compilation passed. ESLint passed. Nine public browser tests and six mocked-Supabase admin tests passed. Public route checks now require the new guide chapters or article contents navigation on every page. No Java code, database migration, or authentication policy was changed for this content pass.

## Editorial boundaries

The new sections describe engineering reasoning and expected scoping questions. Worked project examples are not asserted to be verified production implementations. Company-specific evidence such as real screenshots, client permission, measured outcomes, and a verified team biography still requires the studio’s actual information.
