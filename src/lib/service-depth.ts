type Depth = {
  fit: string;
  scenarios: [string, string][];
  boundaries: string[];
  acceptance: string[];
  questions: [string, string][];
};
export const serviceDepth: Record<string, Depth> = {
  'software-engineering': {
    fit: 'For founders, product teams, and enterprise operators who need a new application, an integration layer, or a maintainable path away from a manual workflow.',
    scenarios: [
      [
        'Build a SaaS product',
        'Define the roles, core user journey, tenancy needs, billing boundaries, and first useful release. Implement the experience and API around explicit access rules and a clear data model.',
      ],
      [
        'Modernize a business workflow',
        'Map the existing process and data ownership before replacing a spreadsheet or legacy screen. Preserve the business rules that matter and expose the assumptions that need a decision.',
      ],
      [
        'Connect existing systems',
        'Design API contracts, validation, failure handling, and reconciliation around the actual behavior of external systems. Avoid treating a successful HTTP request as proof that a business operation completed.',
      ],
    ],
    boundaries: [
      'User experience, role model, and accessible interaction states',
      'Application services, data model, and integration contracts',
      'Configuration, automated checks, and release handover',
    ],
    acceptance: [
      'The agreed user journey works with valid and invalid input.',
      'Permissions are tested for the roles in scope.',
      'Important integration failure paths have a defined response.',
      'The operating team receives deployment and configuration instructions.',
    ],
    questions: [
      [
        'Can you build with Java, React, and Supabase?',
        'Yes. React/Next.js can provide the user experience, Java Spring Boot the application services, and Supabase PostgreSQL the data and access foundation. The architecture depends on the product’s constraints.',
      ],
      [
        'Do you build every feature in the first release?',
        'No. We agree a useful initial scope and record later work in a backlog. Third-party integrations, migrations, and uncertain features may need a discovery or proof-of-concept step.',
      ],
      [
        'What happens to the code after handover?',
        'Repository ownership, third-party licenses, documentation, and future maintenance responsibilities are defined in the engagement agreement.',
      ],
    ],
  },
  'logistics-systems': {
    fit: 'For fleet operators, dispatch teams, and logistics businesses that need a connected view of vehicles, assignments, route history, and operational exceptions.',
    scenarios: [
      [
        'Coordinate dispatch',
        'Model assignment states, driver availability, manual overrides, and operator responsibilities before building the dashboard. Make exceptional states visible and actionable.',
      ],
      [
        'Integrate vehicle telematics',
        'Define device identity, message shape, freshness thresholds, ingestion rules, and durable history. Keep a distinction between browser connectivity and the time a vehicle last reported.',
      ],
      [
        'Plan routes with context',
        'Work with geospatial inputs and an agreed routing objective. Shortest distance, travel time, and eco-routing are different optimization problems and need different evidence.',
      ],
    ],
    boundaries: [
      'Dispatch workflows and the responsibilities of operators and drivers',
      'GPS/event ingestion, live delivery, and historical storage',
      'Reports and maintenance workflows included in the agreed scope',
    ],
    acceptance: [
      'Delayed, duplicated, and out-of-order location events are considered.',
      'Dispatch state changes follow agreed authorization rules.',
      'Offline or stale data is distinguished from a live position.',
      'The initial pilot has defined operational measures and review criteria.',
    ],
    questions: [
      [
        'Can you integrate existing GPS devices?',
        'Potentially. We first need device documentation, sample payloads, connectivity details, and approved access to the provider interface. Unsupported protocols may require a separate integration effort.',
      ],
      [
        'Will route optimization guarantee fuel savings?',
        'No unsupported savings percentage is promised. An optimization goal, baseline, data quality assessment, and representative pilot are needed before making outcome claims.',
      ],
      [
        'Can dispatchers retain manual control?',
        'Manual review and override workflows can be part of the scope. Their permissions and audit requirements should be agreed during discovery.',
      ],
    ],
  },
  'network-infrastructure': {
    fit: 'For regional ISPs and network operators that need consistent subscriber access, traceable mobile-money billing, and fewer manual provisioning steps.',
    scenarios: [
      [
        'Automate payment to entitlement',
        'Correlate verified M-Pesa transactions with subscriber accounts, handle duplicate callbacks, and keep a recoverable record of the intended network change.',
      ],
      [
        'Manage access policies',
        'Connect plans and subscriber states to PPPoE or Hotspot provisioning through supported RouterOS interfaces. Define what happens when a router is temporarily unavailable.',
      ],
      [
        'Document fiber provisioning',
        'Review OLT models, software versions, topology, and the operator’s change process. Configuration work needs a clear rollback and handover plan.',
      ],
    ],
    boundaries: [
      'Subscriber plan lifecycle and authorized operator controls',
      'Payment verification, reconciliation, and provisioning states',
      'Supported device interfaces, bandwidth policies, and operations documentation',
    ],
    acceptance: [
      'A duplicate payment callback cannot create a duplicate entitlement.',
      'Confirmed payment and successful access activation are separate observable states.',
      'Provisioning retries have a defined recovery path.',
      'Device access, configuration backups, and handover responsibility are agreed.',
    ],
    questions: [
      [
        'What access do you need to the network?',
        'We agree the minimum management access needed for the work, the permitted change window, and how credentials will be shared securely. Do not send router passwords through the inquiry form.',
      ],
      [
        'Does this include M-Pesa approval?',
        'Provider onboarding and application approvals are external dependencies. The engagement must identify who owns the Daraja application, credentials, callbacks, and required approvals.',
      ],
      [
        'Can you promise carrier-grade availability?',
        'Availability targets require an architecture, deployment topology, support model, and evidence. We do not treat a billing integration alone as an availability guarantee.',
      ],
    ],
  },
  'cloud-devops': {
    fit: 'For teams whose software is ready to ship, difficult to deploy, or missing a clear operating foundation.',
    scenarios: [
      [
        'Make releases repeatable',
        'Create a documented path from source changes through checks to deployment. Separate environment configuration from code and define who can approve production changes.',
      ],
      [
        'Harden the operating environment',
        'Review Linux access, service configuration, credentials, network exposure, and patch responsibilities. Apply agreed controls to the systems in scope.',
      ],
      [
        'Make operations understandable',
        'Choose the signals the team needs, document common failures, and agree backup and restore responsibilities. A monitoring chart is useful only when someone knows what action to take.',
      ],
    ],
    boundaries: [
      'Build and deployment pipelines for agreed repositories',
      'Environment configuration, access controls, and operational visibility',
      'Runbooks, backup strategy, and deployment handover',
    ],
    acceptance: [
      'An agreed release can be deployed using documented steps.',
      'Secrets are separated from committed source.',
      'A failed release has an agreed recovery procedure.',
      'The responsible team understands alerts, backup ownership, and escalation.',
    ],
    questions: [
      [
        'Can you work with our existing cloud account?',
        'Yes, subject to the provider, account permissions, and agreed scope. Client-controlled accounts are usually preferable for long-term ownership.',
      ],
      [
        'Are cloud costs included in development fees?',
        'Hosting, domains, external APIs, and recurring service charges should be itemized separately in the proposal. They are not implicitly included.',
      ],
      [
        'Do you provide round-the-clock support?',
        'Support hours, response targets, escalation procedures, and capacity must be separately agreed. This website does not imply a 24/7 support commitment.',
      ],
    ],
  },
};
