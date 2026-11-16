import type { PageGuide } from './page-guides';
export const domainGuides: Record<string, PageGuide> = {
  'service-software-engineering': {
    title: 'From a business workflow to a maintainable application.',
    intro:
      'Custom software development includes the decisions that connect users, rules, data, and operations. The following walkthrough explains how those decisions become a scoped platform rather than a collection of independent features.',
    sections: [
      {
        title: 'Map the user journey and its permissions',
        paragraphs: [
          'Start with one complete operation: a customer submits a request, an operator reviews it, and an authorized person approves or rejects the next step. Identify what each actor can see, which fields they may change, and which actions need a durable history. The user interface should reflect those responsibilities rather than assume every signed-in user has the same access.',
          'Work through the exceptions before finalizing the screens. A user may lack permission, a record may already have changed, a required attachment may be missing, or a dependency may be unavailable. These conditions influence both the interaction design and the contract exposed by the application service.',
        ],
      },
      {
        title: 'Assign ownership to the application and data model',
        paragraphs: [
          'The application service coordinates the business operation. It validates the request, checks authorization, applies the relevant transition, and records the result. The database protects relationships and constraints that must remain true even when several requests arrive at once. The browser presents the state; it should not be the only place a critical rule is enforced.',
          'For a SaaS platform, discuss tenant boundaries explicitly. Decide which records belong to an organization, whether users can belong to several organizations, and which support or administrator roles need exceptional access. A tenancy model affects queries, policies, tests, and account lifecycle behavior.',
        ],
      },
      {
        title: 'Define contracts for external integrations',
        paragraphs: [
          'An integration contract needs more than a URL and a successful response example. Record authentication requirements, input validation, expected state changes, timeout behavior, retry rules, and the evidence that confirms completion. Decide which system is authoritative when the records disagree.',
          'A provider may accept a request before finishing the work. In that situation, the interface needs to distinguish submitted, pending, completed, and failed states. Recovery can involve checking the provider’s status, reconciling a stored intent, or asking an operator to review an exception. The appropriate path belongs in the scope.',
        ],
      },
      {
        title: 'Deliver a vertical slice before broadening the platform',
        paragraphs: [
          'A vertical slice connects the interface, application logic, and storage for one useful task. It allows the client to review behavior that actually completes an operation. It also exposes missing assumptions earlier than developing the entire frontend before the integration and data layers are exercised.',
          'After reviewing the first slice, expand the backlog with evidence. Reporting, advanced automation, bulk operations, and additional roles should follow an agreed priority. The architecture should make these additions understandable without requiring every possible future feature to be implemented immediately.',
        ],
      },
      {
        title: 'Prepare the receiving team to operate the result',
        paragraphs: [
          'The final delivery should identify required environment settings, external accounts, deployment steps, and the way to investigate common failures. Source access and account ownership should be settled in the agreement. Document known limitations so the receiving team can distinguish an expected boundary from a defect.',
          'If the application needs a migration, plan how records are mapped, checked, and reconciled. Agree whether there is a rollback path or a point after which the new system becomes authoritative. A migration plan is part of the operating change, not merely a script attached to the last deployment.',
        ],
      },
    ],
    table: {
      title: 'Example acceptance review for a request workflow',
      columns: ['Area', 'Behavior to demonstrate', 'Question for the client'],
      rows: [
        [
          'Identity and access',
          'An authorized user completes the action; another role is denied.',
          'Which roles may approve or override this operation?',
        ],
        [
          'Data correctness',
          'Invalid and conflicting changes do not silently corrupt the record.',
          'Which business condition must always remain true?',
        ],
        [
          'Integration failure',
          'A dependency failure produces a useful state and a recovery path.',
          'Who is responsible for resolving this exception?',
        ],
        [
          'Operations',
          'The release can be deployed and investigated using the agreed instructions.',
          'Which team takes ownership after handover?',
        ],
      ],
    },
  },
  'service-logistics-systems': {
    title: 'Design the operational loop around every vehicle.',
    intro:
      'A logistics platform joins several different timelines: plans created by dispatchers, observations reported by devices, actions taken by drivers, and records needed for later review. A coherent system keeps their relationship understandable.',
    sections: [
      {
        title: 'Model a dispatch as a controlled workflow',
        paragraphs: [
          'Define the dispatch states before designing the assignment board. A request may be unassigned, assigned, accepted, in progress, completed, cancelled, or awaiting review. The exact states depend on the operation; they should not be copied from another company’s dashboard without checking the local process.',
          'For each transition, identify the actor, required information, and possible conflict. Two dispatchers might attempt to assign the same vehicle. A driver might reject a job after the route changes. An operator may need to cancel an assignment while preserving its history. These are application rules with user-interface consequences.',
        ],
      },
      {
        title: 'Treat telematics as a stream of observations',
        paragraphs: [
          'A device report should be tied to an identified vehicle and an observation time. The time the server receives it is a separate fact. Devices can queue events during poor connectivity, so the most recently received message is not necessarily the most recent position.',
          'Define validation rules for coordinates, timestamps, device ownership, and message identity. Decide how duplicates and late observations affect live state versus route history. A stale marker should be communicated as stale; a connected web session alone does not establish that the vehicle has reported recently.',
        ],
      },
      {
        title: 'Make the map support an operational decision',
        paragraphs: [
          'The map should answer the dispatcher’s question in context: which vehicle is available, which assignment it is performing, how recent its location is, and which exception requires attention. Showing every available data layer can obscure those decisions rather than improve them.',
          'Define filters, selection behavior, location freshness indicators, and the relationship between map markers and the assignment list. Discuss whether the user needs to inspect a historical route, compare planned and observed movement, or recover a task that has not progressed as expected.',
        ],
      },
      {
        title: 'Scope routing, maintenance, and reporting separately',
        paragraphs: [
          'Route planning needs an objective and data that can support it. Minimizing distance, minimizing expected duration, and incorporating environmental considerations are different decisions. Road restrictions, vehicle constraints, traffic information, and topography may change the appropriate model.',
          'Maintenance scheduling and operational reporting introduce other records and responsibilities. Agree the source of mileage or usage data, who closes a maintenance task, and which reports are needed for the initial release. Avoid implying that a tracking feed automatically supplies every input needed for these workflows.',
        ],
      },
      {
        title: 'Use a bounded pilot to assess the operating fit',
        paragraphs: [
          'Select a representative but controlled pilot group. Define the devices, routes, users, and assignment types in scope. Establish what the team will observe: freshness, incomplete tasks, manual overrides, reconnect behavior, and the usefulness of the available history.',
          'Record findings with enough context to guide the next iteration. A pilot can reveal that a device protocol, connectivity pattern, or dispatch convention needs a different design. That is useful evidence when the pilot has explicit questions and does not silently expand into an undefined rollout.',
        ],
      },
    ],
    table: {
      title: 'Questions to resolve before a fleet integration',
      columns: ['Input', 'Design consequence', 'Evidence to request'],
      rows: [
        [
          'Device protocol and identity',
          'Determines ingestion and ownership validation.',
          'Provider documentation and representative, non-sensitive messages.',
        ],
        [
          'Connectivity pattern',
          'Determines stale states and delayed-event handling.',
          'Examples from the intended operating environment.',
        ],
        [
          'Assignment rules',
          'Determines permissions and conflict handling.',
          'A walkthrough with dispatchers and an acceptance owner.',
        ],
        [
          'Reporting needs',
          'Determines durable history and retention.',
          'The decisions each proposed report must support.',
        ],
      ],
    },
  },
  'service-network-infrastructure': {
    title: 'Build a subscriber lifecycle that can explain itself.',
    intro:
      'An ISP workflow crosses financial confirmation, application state, device configuration, and actual sessions. Each stage needs a clear source of truth and a recovery method when the stages do not agree.',
    sections: [
      {
        title: 'Define plans and entitlements before automating access',
        paragraphs: [
          'A plan describes the commercial offer; an entitlement describes the access a subscriber is currently allowed to receive. Record the rules for activation, renewal, expiry, suspension, and an authorized override. Identify whether a renewal extends an existing entitlement or creates a new period with different policy.',
          'These rules determine what the billing application must persist and what it asks the network to apply. Ambiguity here becomes operational confusion later: a payment can be valid while the intended duration, speed profile, or subscriber account remains uncertain.',
        ],
      },
      {
        title: 'Verify the payment against the original intent',
        paragraphs: [
          'A payment event needs to be correlated with an expected transaction and subscriber context. Define the amount, account reference, provider identifiers, and final status that must be checked before entitlement changes. The approved provider integration and its supported verification methods determine the implementation details.',
          'Callbacks may arrive more than once or after the initial request has timed out. The billing record should preserve a stable transaction identity and make repeated delivery harmless. A browser notification or an uncorrelated callback should not independently establish that access must be granted.',
        ],
      },
      {
        title: 'Reconcile intended policy with actual device state',
        paragraphs: [
          'Provisioning is a separate operation from payment confirmation. A gateway can be unreachable or a management request can time out after the device has applied a change. Repeating commands without examining state can make the subscriber record harder to reconcile.',
          'Record the intended access policy and the result of each provisioning attempt. Define when the system should read actual state, retry with a bounded policy, or ask an operator to review the exception. Support teams need to distinguish paid, pending provisioning, active, and failed states.',
        ],
      },
      {
        title: 'Keep management access within a controlled boundary',
        paragraphs: [
          'The network management interface, the operator console, and the public subscriber portal have different access requirements. Agree the minimum management permissions, network reachability, credential handling, and change approval needed for the work. Credentials should not become part of public application code or routine diagnostic output.',
          'For fiber provisioning, review the actual OLT models, software versions, topology, and operator procedures. Configuration work also needs a record of the starting state, an agreed change window where applicable, and a practical recovery or rollback method.',
        ],
      },
      {
        title: 'Prepare the operator view and handover',
        paragraphs: [
          'An operator should be able to connect a subscriber’s entitlement to its authorizing payment and last known network state. The interface should expose the unresolved step rather than collapse the whole process into a single green or red indicator. An authorized manual action should retain its reason and context.',
          'The handover should explain supported devices and flows, required configuration, diagnostic events, recovery steps, and responsibility for provider accounts. Future plan changes, network upgrades, and support coverage should be scoped deliberately rather than assumed to be included forever.',
        ],
      },
    ],
    table: {
      title: 'A recoverable renewal sequence',
      columns: ['Stage', 'Record or observation', 'If it cannot complete'],
      rows: [
        [
          'Initiate payment',
          'Expected subscriber, amount, and provider request identity.',
          'Show a meaningful initiation failure without granting access.',
        ],
        [
          'Confirm payment',
          'Verified transaction correlated to the intended renewal.',
          'Keep the request pending or rejected according to verified status.',
        ],
        [
          'Apply entitlement',
          'Durable access intent and a traceable provisioning attempt.',
          'Preserve payment confirmation and schedule or surface recovery.',
        ],
        [
          'Verify access state',
          'The relevant device policy or session evidence.',
          'Reconcile intended and actual state before another change.',
        ],
      ],
    },
  },
  'service-cloud-devops': {
    title: 'Make production an understandable operating environment.',
    intro:
      'Cloud and DevOps work should reduce uncertainty around how code is released, how the system is observed, and who responds when something changes. Automation is useful when its inputs, permissions, and recovery paths are explicit.',
    sections: [
      {
        title: 'Inventory the service before automating deployment',
        paragraphs: [
          'Identify the running components, repositories, external dependencies, data stores, account owners, and required configuration. A deployment pipeline cannot be reliable if its important inputs exist only in someone’s shell history or a set of undocumented manual changes.',
          'Document how development, staging, and production differ. Decide which integrations can be exercised safely outside production and which require an approved test account or dataset. This inventory also helps reveal credentials and permissions that are broader than the service actually needs.',
        ],
      },
      {
        title: 'Design a release path with clear gates',
        paragraphs: [
          'A release path can include dependency installation, source checks, tests, artifact creation, configuration review, deployment, and a post-release check. Choose the gates according to the risks of the service rather than adding tools for their own sake. The team should know what a failing gate means and who can resolve it.',
          'Define which changes need approval and how the release is identified. A recorded artifact or version gives operators a shared reference when investigating an incident or comparing environments. The pipeline should not require secrets to be committed into source to make the process reproducible.',
        ],
      },
      {
        title: 'Plan the failure and recovery path',
        paragraphs: [
          'A failed release may involve application code, configuration, a schema change, or an unavailable provider. These failures do not always share the same recovery method. Rolling back an application artifact does not necessarily reverse a database migration or an external side effect.',
          'Agree what is recoverable automatically, which operations need review, and how the team identifies the currently deployed version. Where backups are in scope, discuss what is covered, who can restore it, and how restore expectations will be checked. A backup’s existence is not sufficient evidence of a usable recovery process.',
        ],
      },
      {
        title: 'Select operational signals with an owner',
        paragraphs: [
          'Metrics, logs, and alerts should support decisions. An operator may need to know that a service is unavailable, an integration is rejecting requests, a job queue is not progressing, or a storage limit is approaching. The useful signal depends on the system and the response the team can take.',
          'Agree who receives the signal, what context it includes, and what procedure follows. Keep private user content and credentials out of routine logs. Alert noise can be an operating failure of its own when it makes the important event difficult to recognize.',
        ],
      },
      {
        title: 'Document the boundary of ongoing responsibility',
        paragraphs: [
          'Cloud hosting, software maintenance, security patching, data retention, incident response, and business-hours support are related but distinct commitments. Identify which accounts and services are included in the engagement and which remain under another team’s control.',
          'At handover, provide the agreed deployment and recovery instructions, configuration references, access ownership, and known limitations. If the studio continues to operate part of the environment, define the service boundary, support hours, response expectations, and process for requesting new work.',
        ],
      },
    ],
    table: {
      title: 'A practical operations handover',
      columns: ['Material', 'What it should explain', 'Owner to identify'],
      rows: [
        [
          'Environment reference',
          'Required settings, dependencies, and safe secret storage.',
          'The person responsible for production configuration.',
        ],
        [
          'Deployment runbook',
          'Release gates, artifact identity, and verification.',
          'The person allowed to approve and perform releases.',
        ],
        [
          'Recovery procedure',
          'The response to a failed release or scoped data-loss scenario.',
          'The person authorized to restore or reconcile the system.',
        ],
        [
          'Monitoring plan',
          'Important events, alert routing, and initial response.',
          'The team that will receive and act on alerts.',
        ],
      ],
    },
  },
  'project-ecoroute': {
    title: 'An engineering walkthrough of a routing decision.',
    intro:
      'The supplied EcoRoute brief combines a graph-based routing service, a map interface, traffic observations, and topographical inputs. This worked design explanation shows the responsibilities to examine; it does not assert unpublished production measurements.',
    sections: [
      {
        title: 'Translate a trip request into a defined routing objective',
        paragraphs: [
          'The user provides an origin and destination, but the system still needs to know what “better” means. A shortest-distance route, an expected-time route, and a route weighted for environmental considerations can select different paths. The objective and its assumptions should be visible enough to evaluate.',
          'An initial request contract can include validated coordinates, the selected routing mode, and the supported constraints. Decide what happens when an origin is outside the represented network, no connected path exists, or a required data layer is unavailable. These are normal outcomes that the interface needs to communicate.',
        ],
      },
      {
        title: 'Separate durable network data from changing observations',
        paragraphs: [
          'The transit graph represents connections and the attributes needed to evaluate them. Traffic observations change at a different rate and may have different provenance and freshness. Keeping the responsibilities separate makes it easier to reason about which input affected a route calculation.',
          'Define how an observation is linked to the represented network, how long it remains relevant, and what validation is required before it can influence a weight. A sparse or stale observation set should have a documented fallback rather than silently being treated as complete current knowledge.',
        ],
      },
      {
        title: 'Return an explainable route result',
        paragraphs: [
          'A useful result can include the chosen path, the relevant objective, and the information necessary to compare alternatives. The map should make it possible to inspect the route and understand the limits of the available inputs. It should not imply live certainty when the calculation relied on older observations.',
          'The application boundary also needs response limits and failure behavior. A route calculation that cannot complete within the agreed operating conditions should return a useful error or pending state rather than leave the interface indefinitely waiting without context.',
        ],
      },
      {
        title: 'Evaluate the routing model before claiming improvement',
        paragraphs: [
          'Choose representative origin/destination pairs and a baseline for comparison. Record the graph version, input conditions, routing objective, and the method used to assess each result. This distinguishes a change in the algorithm from a change in the underlying observations.',
          'An environmental or travel improvement claim requires evidence that connects the model’s assumptions to the claimed outcome. The brief establishes the intended eco-routing purpose, but it does not establish a validated percentage reduction in fuel use, emissions, distance, or journey time.',
        ],
      },
      {
        title: 'What a technical review should request',
        paragraphs: [
          'A deeper review can examine the graph schema, route request and response examples, observation validation rules, fallback behavior, and tests for disconnected or unsupported journeys. These materials help determine whether the system’s contracts match its intended use.',
          'For a related engagement, the first task is to assess available geospatial data and the operating objective. The architecture is a starting pattern; the correct weighting, update process, and evaluation method depend on the client’s actual network and data.',
        ],
      },
    ],
    table: {
      title: 'Worked route-request responsibilities',
      columns: ['Component', 'Responsibility', 'Important boundary'],
      rows: [
        [
          'React map experience',
          'Capture trip intent and present route alternatives.',
          'User input does not establish that the route is feasible.',
        ],
        [
          'FastAPI routing service',
          'Validate the objective and coordinate the calculation.',
          'Computation depends on a documented graph and supported constraints.',
        ],
        [
          'Observation processing',
          'Validate and associate changing traffic inputs.',
          'An observation has limited provenance and freshness.',
        ],
        [
          'Supabase PostgreSQL',
          'Persist the data needed by the scoped model.',
          'Access and data integrity must be controlled independently of the map.',
        ],
      ],
    },
  },
  'project-fleet-command': {
    title: 'Follow a dispatch from assignment to historical record.',
    intro:
      'Fleet Command’s brief describes live GPS tracking, dispatch workflows, route history, and maintenance scheduling. The walkthrough below explains how those capabilities can be reasoned about as one system, without inventing unverified scale or delivery outcomes.',
    sections: [
      {
        title: 'Establish the authoritative assignment record',
        paragraphs: [
          'A dispatcher begins with a task, an available vehicle, and the information required to make an assignment. The application needs to decide which state transition is permitted and how to prevent conflicting changes from silently creating an inconsistent operating picture.',
          'The durable assignment record should carry the context needed for later review: the task identity, responsible actor, selected resources, relevant times, and current state. Live map updates can enrich that view, but they should not replace the record that explains what work was actually assigned.',
        ],
      },
      {
        title: 'Process location updates without confusing time',
        paragraphs: [
          'A vehicle report describes an observation at a particular time. The receiving system also observes an arrival time. When connectivity is intermittent, those timelines diverge. A late report can still be useful in history while being unsuitable as the current live position.',
          'Stable event identity and explicit ordering rules help distinguish a repeated message from a new observation. The application should decide which event updates the live view and which belongs only in history, then communicate the position’s freshness to the dispatcher.',
        ],
      },
      {
        title: 'Reconnect the interface to a coherent state',
        paragraphs: [
          'A browser can disconnect while the fleet continues to generate events. On reconnect, the interface needs a current snapshot and a way to resume updates without leaving a gap between the snapshot and the stream. An open WebSocket alone does not establish that the client has a complete state.',
          'The appropriate resumption mechanism depends on the delivery design. It may involve a cursor, a sequence, or a new authoritative snapshot. The important contract is what the client may assume after reconnecting and how duplicated or missed events are handled.',
        ],
      },
      {
        title: 'Keep maintenance and reporting tied to defined inputs',
        paragraphs: [
          'A maintenance view can use schedules, usage readings, recorded work, and operator actions, but each input needs a source and an owner. The initial brief identifies maintenance scheduling; it does not specify every sensor or third-party maintenance integration. Those details require additional scope.',
          'Historical reports should answer explicit operating questions. A dispatcher may need to review the sequence of a particular job, while a fleet manager may need a maintenance backlog. Persist the records needed for the agreed questions rather than imply that a live stream automatically provides a complete audit history.',
        ],
      },
      {
        title: 'Review the failure cases as well as the dashboard',
        paragraphs: [
          'A meaningful demonstration should include a late vehicle event, a disconnected browser, an unauthorized dispatch transition, and a change that conflicts with another operator’s action. Each case should leave a state the team can understand and recover from.',
          'Before claiming operational improvement, establish how the existing process is measured. Dispatch latency, stale-position incidents, and unresolved assignments are different measures. Any comparison needs representative conditions and a clear explanation of the workflow that changed.',
        ],
      },
    ],
    table: {
      title: 'What the operator needs to distinguish',
      columns: ['Observation', 'What it tells you', 'What it does not prove'],
      rows: [
        [
          'Browser connected',
          'The interface has an active delivery connection.',
          'Every vehicle has reported recently.',
        ],
        [
          'New event received',
          'The server received a message.',
          'The message describes a newer observation than current state.',
        ],
        [
          'Assignment accepted',
          'The configured workflow recorded an acceptance.',
          'The job is already completed.',
        ],
        [
          'Route history available',
          'Relevant position records were retained.',
          'Every route segment or device report was observed without gaps.',
        ],
      ],
    },
  },
  'project-isp-billing': {
    title: 'Trace the boundary between money and network access.',
    intro:
      'The gateway brief connects M-Pesa STK push billing, subscriber management, MikroTik policy changes, and live session visibility. This explanation follows the state transitions that need to remain understandable when the systems respond at different times.',
    sections: [
      {
        title: 'Record the intended renewal before relying on a callback',
        paragraphs: [
          'A subscriber selects a plan and initiates payment. The application should be able to correlate later provider events with the expected account, amount, plan, and request identity. That correlation is the context needed to decide what the payment authorizes.',
          'The initial response may indicate that a payment request was accepted for processing rather than that payment is final. The subscriber experience should present that distinction clearly and provide a way to understand a pending or unsuccessful attempt without prematurely promising active access.',
        ],
      },
      {
        title: 'Make repeated delivery safe to process',
        paragraphs: [
          'Payment callbacks and application retries can repeat. A stable provider transaction identity and a database uniqueness rule can help prevent the same verified payment from being recorded as separate new entitlements. The complete design must also define how conflicting or incomplete events are reconciled.',
          'Where the workflow uses a provisioning job, recording the confirmed payment and the intended job in one durable transaction can reduce the gap between those facts. The job processor should converge on the intended subscriber state rather than create another entitlement every time it runs.',
        ],
      },
      {
        title: 'Treat the gateway as an external stateful system',
        paragraphs: [
          'A MikroTik management request crosses a network boundary and changes state outside the billing database. If the request times out, the caller may not know whether the device applied the policy. A retry strategy should account for that uncertainty.',
          'Read and compare actual state when appropriate, record attempts, and surface an exception that cannot be resolved within the agreed retry policy. An operator should be able to identify the payment, the intended plan, the last observed device state, and the next safe recovery action.',
        ],
      },
      {
        title: 'Distinguish policy from an observed session',
        paragraphs: [
          'An access policy describes what a subscriber is permitted to receive. A session record describes a particular observed connection. These facts are related, but one does not always imply that the other exists at that instant. The interface should avoid collapsing them into an ambiguous “active” label.',
          'Define the relevant states with the network team. Depending on the integration, operators may need separate views for paid entitlement, policy applied, session observed, expired plan, and unresolved provisioning. Clear terminology makes troubleshooting more efficient and reduces unsupported assumptions.',
        ],
      },
      {
        title: 'Prepare a reconciliation and support workflow',
        paragraphs: [
          'The recovery path should explain what a support operator may inspect or change, which actions require additional authorization, and how the reason for a manual intervention is recorded. This becomes especially important when a payment is confirmed but an access change remains unresolved.',
          'A production review would examine transaction correlation, callback verification, idempotency, router access controls, diagnostic events, and operator runbooks. The portfolio brief does not establish carrier availability or independently audited payment controls, so those requirements must be scoped and verified for an actual deployment.',
        ],
      },
    ],
    table: {
      title: 'Subscriber states that should remain separate',
      columns: ['State', 'Evidence', 'Next question'],
      rows: [
        [
          'Payment pending',
          'An expected request exists, but final status is not confirmed.',
          'Has the provider supplied a verifiable final outcome?',
        ],
        [
          'Payment confirmed',
          'The transaction matches the expected renewal context.',
          'Has the corresponding entitlement been recorded?',
        ],
        [
          'Provisioning pending',
          'A durable access intent awaits device confirmation.',
          'Should the system inspect, retry, or escalate?',
        ],
        [
          'Access policy applied',
          'The relevant network configuration was observed or confirmed.',
          'Is the subscriber connected, and what session evidence exists?',
        ],
      ],
    },
  },
  'industry-logistics-and-transport': {
    title: 'Build around the working day of a transport operation.',
    intro:
      'A logistics platform needs to support both planned work and the exceptions that interrupt it. The useful design begins with dispatch decisions, available evidence, and the people responsible for keeping an assignment moving.',
    sections: [
      {
        title: 'Walk through the day before drawing the dashboard',
        paragraphs: [
          'Start with how work enters the operation. A task may arrive from a customer request, a recurring schedule, or another business system. Identify who prioritizes it, how vehicle availability is assessed, and what information a driver needs before accepting the assignment.',
          'Then examine what happens during execution: changes to the route, delayed reporting, vehicle unavailability, cancellation, and completion. The software needs to support those transitions in a way that matches the operating authority of dispatchers, drivers, supervisors, and maintenance staff.',
        ],
      },
      {
        title: 'Define the relationship between location and work',
        paragraphs: [
          'A coordinate describes a position; it does not explain the assignment being performed. The application should connect live observations with the current task while preserving the difference between inferred movement and confirmed workflow progress.',
          'Ask which events are recorded by a device, which are entered by a person, and which are derived by the application. This distinction affects trust, correction procedures, and the history available during a later dispute or operational review.',
        ],
      },
      {
        title: 'Integrate the existing business systems deliberately',
        paragraphs: [
          'An operations platform may need to exchange information with customer portals, order systems, billing tools, or maintenance records. For each integration, identify the source of truth and how discrepancies are resolved. A field with the same name in two applications may still represent a different business concept.',
          'Agree whether the integration is synchronous, event-driven, scheduled, or operator-assisted. Document authentication, rate limits or capacity constraints where known, failure behavior, and any manual fallback needed for the initial release.',
        ],
      },
      {
        title: 'Choose the pilot and the measures together',
        paragraphs: [
          'A pilot should represent the conditions that matter without attempting to cover the entire operation immediately. Select the vehicle group, users, routes, device types, and assignment process. Identify the situations that would make the pilot unsuitable as evidence for a larger rollout.',
          'Measure the behaviors the system is intended to improve. A useful review might look at how quickly an assignment becomes visible, whether stale location is correctly indicated, or how unresolved tasks are recovered. Avoid treating a single broad “efficiency” number as a substitute for a defined operating measure.',
        ],
      },
      {
        title: 'Make training and handover workflow-specific',
        paragraphs: [
          'Users need to know how to complete their work, recognize uncertain data, and handle an exception. Training should follow the actual dispatch and review tasks rather than provide only a feature tour. Supervisors may need a different view from the people assigning jobs throughout the day.',
          'The operating team also needs clear responsibility for device connectivity, account access, integration credentials, and support escalation. These responsibilities can cross organizations, so record who owns each boundary before moving beyond the pilot.',
        ],
      },
    ],
    table: {
      title: 'A discovery workshop for logistics operations',
      columns: ['Perspective', 'Bring an example of', 'Decision to make'],
      rows: [
        [
          'Dispatch',
          'A job that needed reassignment or manual intervention.',
          'Which transitions and overrides the software must support.',
        ],
        [
          'Drivers and field devices',
          'A task completed under weak connectivity.',
          'Which information can be delayed and how it is presented.',
        ],
        [
          'Fleet management',
          'A maintenance issue that affected availability.',
          'How availability and maintenance records should interact.',
        ],
        [
          'Business systems',
          'A mismatch between operational and billing records.',
          'Which system owns the record and how reconciliation works.',
        ],
      ],
    },
  },
  'industry-internet-service-providers': {
    title: 'Create a consistent subscriber operation across systems.',
    intro:
      'Regional ISPs often manage a mix of network equipment, access methods, payment processes, and manual support knowledge. Automation is most useful when it preserves the business rules and makes exceptions easier to explain.',
    sections: [
      {
        title: 'Inventory the actual access environment',
        paragraphs: [
          'Document gateway and OLT models, software versions, topology, available management interfaces, and the access methods in use. Identify where PPPoE and Hotspot subscribers are represented and whether account records are consistent across the billing and network tools.',
          'Also map operational ownership. The person maintaining the fiber network may not own the payment application or the subscriber support process. The initial assessment should identify who can authorize configuration changes, provide approved access, and accept the resulting workflow.',
        ],
      },
      {
        title: 'Describe the complete subscriber lifecycle',
        paragraphs: [
          'A new connection, a renewal, a plan change, an expiry, and a suspension are different business operations. Define the record and authorization required for each one. Clarify whether a plan change is immediate or deferred and how an operator should handle an exception.',
          'This lifecycle becomes the shared language between billing and network provisioning. Without it, an integration may correctly execute a device command while applying the wrong commercial rule. The goal is consistent interpretation, not merely removing a manual click.',
        ],
      },
      {
        title: 'Make mobile-money integration recoverable',
        paragraphs: [
          'Payment initiation, provider confirmation, entitlement recording, and access activation should be separate observable steps. The application needs to correlate the provider event with the expected transaction and protect the subscriber lifecycle against repeated or incomplete delivery.',
          'Discuss what support sees when a payment is confirmed but access is not yet active. A useful tool identifies the unresolved step and provides an authorized recovery procedure. It should not require an operator to search several systems without a common transaction or subscriber reference.',
        ],
      },
      {
        title: 'Agree safe network change procedures',
        paragraphs: [
          'Network automation can affect a live operating environment. Identify which changes are included, the management access required, the relevant backup or starting-state record, and the process for approving a rollout. Device-specific behavior needs to be checked against the equipment in service.',
          'A staged release may begin with a defined plan type or subscriber group. Specify the observations and recovery actions needed before expanding coverage. Do not treat a successful test against one gateway as automatic evidence that every topology and access method is supported.',
        ],
      },
      {
        title: 'Prepare for the everyday support questions',
        paragraphs: [
          'Support teams need practical answers: what was paid, what entitlement was created, what policy was requested, what was observed on the network, and what can safely be done next. These questions shape the data model, diagnostic records, and operator console.',
          'The handover should explain supported flows, known limitations, account ownership, manual intervention controls, and escalation responsibilities. Recurring hosting, payment provider changes, device upgrades, and extended support should be identified as ongoing operating concerns with agreed owners.',
        ],
      },
    ],
    table: {
      title: 'Records that should be traceable together',
      columns: ['Record', 'Operational purpose', 'Authority to establish'],
      rows: [
        [
          'Subscriber account',
          'Identifies the service relationship and current plan context.',
          'Who may create, edit, suspend, or merge records.',
        ],
        [
          'Verified payment',
          'Explains the transaction authorizing an entitlement.',
          'Which provider evidence confirms a final payment.',
        ],
        [
          'Provisioning intent',
          'Defines the network state the application wants to apply.',
          'Which application or operator may request a change.',
        ],
        [
          'Observed policy/session',
          'Explains the last relevant network observation.',
          'Which device or interface reports the state and when.',
        ],
      ],
    },
  },
  'industry-saas-and-enterprise': {
    title: 'Build a platform around the business rules that matter.',
    intro:
      'SaaS and enterprise projects often begin with a product idea or a manual process that has outgrown its tools. The main challenge is turning that context into a bounded user journey, a trustworthy data model, and an operable release.',
    sections: [
      {
        title: 'Identify the first valuable user journey',
        paragraphs: [
          'Choose a workflow that can be described from initial intent to completion. It might be a customer request, an internal approval, a provisioning action, or a reporting task. Identify the roles, required information, state transitions, and business conditions that make the workflow useful.',
          'For a new product, separate assumptions from known user needs. For an existing enterprise process, examine real examples and exceptions. This helps distinguish work that must be in the first release from ideas that should be validated or delivered later.',
        ],
      },
      {
        title: 'Define tenant, organization, and role boundaries',
        paragraphs: [
          'A platform may have users, organizations, teams, administrators, and support roles. Decide which records belong to each boundary and how access changes when a person moves role, joins another organization, or leaves the service. Those decisions affect more than the sign-in screen.',
          'Authorization should be part of the application and data access design. Demonstrate both allowed and denied operations. If an administrator needs exceptional access, define the purpose, scope, and any review or logging requirements rather than assuming a universal unrestricted account.',
        ],
      },
      {
        title: 'Plan integrations and migration before committing the release',
        paragraphs: [
          'Existing systems may hold authoritative customer, inventory, transaction, or account information. Record which application owns each important fact and how the new platform will obtain or update it. Integration behavior should include the unavailable or inconsistent case, not only a successful exchange.',
          'If data must move, examine the source quality and mapping rules early. Decide how records are validated, which discrepancies require review, and when the new platform becomes authoritative. Migration work can be a significant part of the delivery scope even when it is not visible in the interface.',
        ],
      },
      {
        title: 'Turn acceptance into a working demonstration',
        paragraphs: [
          'Write acceptance criteria around behavior. An approver can inspect the required information and record a decision. An unauthorized user cannot read another organization’s record. A repeated request does not create an unwanted duplicate operation. A dependency failure has an understandable outcome.',
          'A complete vertical slice gives stakeholders a way to review these behaviors before the entire product is built. Use the findings to refine the backlog and record decisions that change scope, risk, or operating responsibility.',
        ],
      },
      {
        title: 'Treat production ownership as part of the product',
        paragraphs: [
          'Identify who owns hosting accounts, deployment approval, credentials, backups, monitoring, and support escalation. An application can meet its functional specification and still create avoidable operational risk if these responsibilities are missing.',
          'A useful handover includes the architecture boundaries, environment configuration, deployment instructions, integration contracts, known limitations, and recovery procedures appropriate to the scope. Ongoing improvements should then be prioritized using actual operating evidence rather than an indefinite list of speculative features.',
        ],
      },
    ],
    table: {
      title: 'A platform discovery checklist',
      columns: ['Area', 'Question', 'Expected output'],
      rows: [
        [
          'Users and workflow',
          'What complete task should the first release support?',
          'A prioritized user journey with exceptions.',
        ],
        [
          'Identity and access',
          'Which roles may see and change each class of record?',
          'An access model and reviewable permission rules.',
        ],
        [
          'Data and integration',
          'Which system owns each important fact?',
          'A data model and integration boundary map.',
        ],
        [
          'Release and operation',
          'Who deploys, observes, and supports the result?',
          'A deployment, handover, and responsibility plan.',
        ],
      ],
    },
  },
};
