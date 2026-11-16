export const industries = [
  {
    slug: 'logistics-and-transport',
    title: 'Logistics & transport',
    headline: 'Keep the operation moving. Make the decisions clearer.',
    description:
      'Software for dispatchers, fleet managers, and transport operators who need to connect live vehicle activity with the work happening on the ground.',
    service: 'logistics-systems',
    project: 'fleet-command',
    problems: [
      [
        'Fragmented dispatch',
        'Assignments, driver updates, and vehicle availability live in different tools. We map the handoffs before designing a shared dispatch workflow.',
      ],
      [
        'Location without context',
        'A moving dot is not an operating picture. Position freshness, route history, and assignment state need to be visible together.',
      ],
      [
        'Planning meets reality',
        'Traffic, terrain, connectivity, and maintenance interrupt ideal plans. Software should make exceptions actionable rather than hide them.',
      ],
    ],
    solutions: [
      [
        'Dispatch workspaces',
        'Role-based assignment queues, vehicle availability, driver history, and exception handling in one interface.',
      ],
      [
        'Telematics integration',
        'GPS ingestion, event validation, WebSocket delivery, stale-location indicators, and durable route history.',
      ],
      [
        'Route intelligence',
        'Geospatial inputs, graph-based route alternatives, configurable objectives, and clear boundaries on what the data can support.',
      ],
      [
        'Operational reporting',
        'Dispatch records, maintenance schedules, exports, and integrations with existing business systems.',
      ],
    ],
    questions: [
      'Which vehicles and devices report positions, and how often?',
      'Who assigns, accepts, and closes a dispatch task?',
      'What must remain usable during connectivity loss?',
      'Which operational measures can we baseline before a pilot?',
    ],
  },
  {
    slug: 'internet-service-providers',
    title: 'Internet service providers',
    headline: 'Connect billing, subscriber access, and network operations.',
    description:
      'Engineering for regional ISPs building repeatable subscriber workflows across MikroTik gateways, fiber access networks, and mobile-money payments.',
    service: 'network-infrastructure',
    project: 'isp-billing',
    problems: [
      [
        'Paid but disconnected',
        'A successful payment does not guarantee access was provisioned. We separate payment confirmation from network changes and make retries traceable.',
      ],
      [
        'Manual subscriber administration',
        'Renewals, bandwidth profiles, and suspensions become fragile when they depend on manual router changes.',
      ],
      [
        'Limited operational visibility',
        'Subscriber plans, payment events, and session state need a coherent view, with appropriate access controls.',
      ],
    ],
    solutions: [
      [
        'Subscriber lifecycle',
        'Plan activation, renewals, suspensions, and operator controls with recorded state transitions.',
      ],
      [
        'M-Pesa billing',
        'STK push integration, callback reconciliation, idempotency, and a visible recovery path for failed provisioning.',
      ],
      [
        'Access automation',
        'RouterOS API integration, PPPoE and Hotspot policy application, and bandwidth profile management.',
      ],
      [
        'Fiber operations',
        'GPON/EPON OLT configuration, provisioning workflows, and documented network handover.',
      ],
    ],
    questions: [
      'Which RouterOS and OLT versions are in service?',
      'How are plans, entitlements, and renewals represented today?',
      'Which M-Pesa application and transaction flow will be used?',
      'Who approves network changes and handles failed provisioning?',
    ],
  },
  {
    slug: 'saas-and-enterprise',
    title: 'SaaS & enterprise platforms',
    headline: 'Turn a complex workflow into a product people can use.',
    description:
      'Architecture and application development for founders and enterprise teams building new products, replacing manual workflows, or modernizing existing systems.',
    service: 'software-engineering',
    project: 'ecoroute',
    problems: [
      [
        'An idea without a delivery plan',
        'A feature list needs user journeys, integration boundaries, acceptance criteria, and a phased scope before it becomes a credible build plan.',
      ],
      [
        'Growing integration complexity',
        'Business rules, external services, and data ownership become harder to change when every component depends on every other one.',
      ],
      [
        'A difficult production handover',
        'Launching without operational visibility, recovery procedures, or clear ownership creates avoidable support risk.',
      ],
    ],
    solutions: [
      [
        'Product discovery',
        'Workflow mapping, assumptions, technical feasibility, and an architecture-backed delivery proposal.',
      ],
      [
        'Application platforms',
        'Responsive React interfaces, Java or other fit-for-purpose services, and well-defined API contracts.',
      ],
      [
        'Data and integrations',
        'PostgreSQL modeling, Supabase integration, access policies, background work, and external system connections.',
      ],
      [
        'Production foundations',
        'Automated tests, CI/CD pipelines, environment separation, monitoring, and maintainable handover documentation.',
      ],
    ],
    questions: [
      'Which user journey creates the most business value?',
      'What data and integrations must the first release support?',
      'Which roles, permissions, and retention rules are required?',
      'What evidence will make the first release acceptable?',
    ],
  },
] as const;
export const deliveryPhases = [
  {
    name: 'Understand the operating context',
    output: 'Agreed problem, constraints, and success criteria',
    detail:
      'We map users, existing workflows, business rules, integrations, and the operational risks around the project. Discovery separates facts from assumptions before scope is committed.',
    check:
      'Stakeholders agree which problem is in scope and how the first useful outcome will be assessed.',
  },
  {
    name: 'Design the boundaries',
    output: 'Architecture, data model, and delivery proposal',
    detail:
      'We define system responsibilities, API contracts, access requirements, and the main user journeys. Tradeoffs are recorded so future decisions have context.',
    check:
      'Architecture and acceptance criteria are reviewed, including dependencies, exclusions, and open questions.',
  },
  {
    name: 'Build in reviewable increments',
    output: 'Working slices of the system',
    detail:
      'Each increment connects interface, application behavior, and storage where needed. Demonstrations focus on a complete workflow rather than disconnected screens.',
    check:
      'The agreed workflow works against its acceptance criteria, with tests covering the important failure paths.',
  },
  {
    name: 'Validate the operating conditions',
    output: 'Test evidence and release readiness',
    detail:
      'We check permissions, invalid inputs, integration failures, and the environments in which the system will run. Testing depth follows the risks in the scope.',
    check:
      'Known limitations, outstanding issues, and release responsibilities are documented and accepted.',
  },
  {
    name: 'Deploy and transfer ownership',
    output: 'Deployment, documentation, and handover',
    detail:
      'We prepare configuration, deployment instructions, recovery procedures, and the information the operating team needs to maintain the system.',
    check:
      'The responsible team can deploy, observe, and recover the agreed system using the handover material.',
  },
  {
    name: 'Improve with operational evidence',
    output: 'A prioritized improvement backlog',
    detail:
      'Where ongoing support is agreed, we review actual usage and incidents, address defects, and plan improvements against business priorities.',
    check:
      'Support scope, availability, response expectations, and escalation ownership are agreed separately.',
  },
] as const;
export const faqs = [
  [
    'Do we need a complete specification before contacting WebCom?',
    'No. Start with the problem, who it affects, and the systems involved. If scope is uncertain, a discovery engagement can produce the workflows, architecture, and acceptance criteria needed for a build proposal.',
  ],
  [
    'How is a project estimated?',
    'We assess scope, integrations, data quality, delivery risks, and operational requirements. A proposal should identify assumptions, milestones, responsibilities, exclusions, and how changes will be handled. No universal price or timeline is promised before discovery.',
  ],
  [
    'Can you work with an existing application or network?',
    'Yes, subject to a technical assessment. Existing code, documentation, dependencies, access methods, and operational constraints determine whether to extend, refactor, integrate, or replace a component.',
  ],
  [
    'What technology stack will you use?',
    'The choice follows the problem. WebCom’s portfolio uses React/Next.js, Java Spring Boot, and Supabase. Client projects may use Node.js, FastAPI, Redis, geospatial tooling, or RouterOS integrations when their requirements justify them.',
  ],
  [
    'Who owns the source code and accounts?',
    'Ownership, licensing, third-party dependencies, and account access must be defined in the signed agreement. We recommend client-controlled production accounts and a documented source-code and configuration handover.',
  ],
  [
    'How will we review progress?',
    'Agree a demonstration and communication cadence at kickoff. Review complete workflows against acceptance criteria, keep open questions in a shared backlog, and record changes before they affect delivery commitments.',
  ],
  [
    'Can you integrate M-Pesa and MikroTik?',
    'These are core integration areas in the studio brief. Feasibility depends on the approved Daraja application, transaction flow, RouterOS version, network access, and the provisioning policies involved.',
  ],
  [
    'Do you offer hosting and ongoing maintenance?',
    'Cloud deployment and DevOps are services. Hosting charges, maintenance scope, monitoring ownership, support hours, response targets, and recurring work must be agreed in the proposal rather than assumed.',
  ],
  [
    'How do you approach security?',
    'We define access roles, keep credentials on the server, validate inputs, and review data flow and integration boundaries. Specific regulatory obligations, penetration testing, and certification requirements need explicit scope; the website does not claim certifications.',
  ],
  [
    'Can you sign an NDA before reviewing detailed information?',
    'Raise confidentiality requirements during the first conversation so the appropriate agreement can be reviewed before sensitive material is shared. Do not put credentials, personal records, or confidential customer data into the public inquiry form.',
  ],
  [
    'Can you guarantee performance improvements?',
    'Performance goals should start with a measurable baseline, representative workload, and agreed test conditions. We do not publish invented uplift percentages or guarantee outcomes without a defined scope and evidence.',
  ],
  [
    'What happens after we send an inquiry?',
    'The studio reviews your context, identifies open questions, and agrees the next conversation. A discovery or delivery proposal follows when enough information is available to scope the work responsibly.',
  ],
] as const;
