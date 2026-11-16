export type GuideSection = { title: string; paragraphs: string[]; points?: string[] };
export type PageGuide = {
  title: string;
  intro: string;
  sections: GuideSection[];
  table?: { title: string; columns: [string, string, string]; rows: [string, string, string][] };
};
export const pageGuides: Record<string, PageGuide> = {
  home: {
    title: 'What useful engineering looks like in practice.',
    intro:
      'A business system is a sequence of decisions: what a person needs to do, which information the application trusts, what changes in the underlying operation, and how the team knows the change succeeded. WebCom works across that sequence.',
    sections: [
      {
        title: 'Connect the customer experience to the operating system',
        paragraphs: [
          'Consider an internet subscriber renewing a plan. The visible experience is a payment prompt and an access confirmation. Behind that experience are transaction verification, subscriber entitlement, router configuration, session state, and an operator who must resolve exceptions. Designing only the payment screen leaves the most important responsibilities unanswered.',
          'The same reasoning applies to a fleet assignment or a SaaS approval workflow. We start by tracing an operation from intent to observable outcome. That trace reveals where information is missing, where responsibility changes hands, and where a failure could leave people guessing.',
        ],
      },
      {
        title: 'Choose a first release with a complete outcome',
        paragraphs: [
          'A useful first release is a narrow workflow that works from end to end. For a logistics team, that might mean creating an assignment, selecting an available vehicle, receiving a position update, and closing the job with an accurate history. It does not require every report or optimization feature to exist on day one.',
          'We separate the essential path from later improvements, identify external dependencies, and agree acceptance criteria before the build becomes a list of disconnected screens. That gives stakeholders something concrete to review and gives engineers a reason for each component.',
        ],
      },
      {
        title: 'Keep technical choices connected to ownership',
        paragraphs: [
          'React can express an interaction, Java can coordinate an application operation, and PostgreSQL can protect relationships in the data. None of those tools determines who may approve a change, who owns an external account, or who responds when a deployment fails. Those are architecture inputs, not details to defer until launch.',
          'We make the operational boundary part of the conversation: deployment environments, configuration, monitoring, support responsibilities, source-code access, and the documentation needed by the people who take the system forward.',
        ],
      },
      {
        title: 'Evaluate the work using evidence',
        paragraphs: [
          'A polished interface is one form of evidence, but it is not sufficient on its own. Buyers should also look for a coherent workflow, explicit system boundaries, meaningful failure handling, and a demonstration tied to agreed requirements. The project architecture pages explain those considerations in the context of routing, dispatch, and subscriber access.',
          'When an outcome needs a number, establish the baseline and measurement conditions first. A claim about faster dispatch or more reliable provisioning should be supported by an operational comparison, not added to a website because it sounds persuasive.',
        ],
      },
    ],
    table: {
      title: 'Three starting points, three different operating questions',
      columns: ['Your starting point', 'The engineering question', 'A useful next step'],
      rows: [
        [
          'New software product',
          'Which user journey deserves a complete first release?',
          'Discovery, architecture, and a scoped build proposal.',
        ],
        [
          'Fleet or logistics operation',
          'How do assignments, vehicle events, and exceptions stay consistent?',
          'Workflow review and an integration-focused pilot.',
        ],
        [
          'ISP or access network',
          'How does a confirmed payment become a recoverable access change?',
          'Subscriber lifecycle and provisioning assessment.',
        ],
      ],
    },
  },
  services: {
    title: 'How to turn a capability into a scoped engagement.',
    intro:
      'Service names describe areas of expertise. A useful proposal goes further: it identifies the workflow to change, the systems that must cooperate, the deliverables to review, and the operating responsibilities after handover.',
    sections: [
      {
        title: 'Start with the business event, not the requested technology',
        paragraphs: [
          '“We need a React dashboard” describes a possible interface. It does not explain whether the team needs better dispatch coordination, controlled approvals, subscriber renewal, or faster access to operational records. We begin with the event that matters and the people responsible for it.',
          'From there, we identify the current process, the information it depends on, and what a successful replacement would make possible. Technology choices follow those constraints. A small internal workflow may need a different solution from a multi-tenant product or a device integration with intermittent connectivity.',
        ],
      },
      {
        title: 'Separate a build from its dependencies',
        paragraphs: [
          'External providers, account approvals, existing data, hardware access, and deployment environments all influence delivery. A billing gateway cannot complete integration testing without an approved payment environment. A fleet dashboard cannot establish location freshness without understanding its device feed.',
          'The proposal should name these dependencies and who owns each one. It should also distinguish work included in the engagement from recurring hosting charges, third-party subscriptions, hardware procurement, historical data cleanup, and support obligations.',
        ],
      },
      {
        title: 'Review outputs that can be accepted',
        paragraphs: [
          'A technical specification is useful when it leads to reviewable outcomes. The architecture should describe component responsibilities and trust boundaries. API contracts should define input, output, and failure behavior. An interface should support the agreed user journey, including loading, invalid input, and unavailable integrations.',
          'Testing and handover are deliverables too. Agree what will be demonstrated, which failure paths need evidence, which environments will be used, and what the operating team must be able to do without relying on the original developer.',
        ],
      },
      {
        title: 'Combine disciplines without losing accountability',
        paragraphs: [
          'Some engagements stay within one service area. Others cross the whole system: a subscriber portal may need application development, payment orchestration, RouterOS integration, and cloud deployment. Treating each area as an isolated task can create gaps at the handoffs.',
          'We define the boundaries between those areas and the person or team accountable for the overall outcome. A shared backlog, an agreed decision process, and a clear acceptance owner help keep the work coordinated as requirements become more precise.',
        ],
      },
    ],
    table: {
      title: 'What to bring to a scoping conversation',
      columns: ['Information', 'Why it matters', 'An acceptable starting point'],
      rows: [
        [
          'Current workflow',
          'Reveals the real users, steps, and exceptions.',
          'A written example or a walkthrough of a recent task.',
        ],
        [
          'Systems and data',
          'Exposes integration and migration dependencies.',
          'A list of applications, providers, devices, and data sources.',
        ],
        [
          'Constraints',
          'Determines what the delivery plan must respect.',
          'Budget context, deadlines, access restrictions, and obligations.',
        ],
        [
          'Definition of success',
          'Makes acceptance reviewable.',
          'A small set of observable workflows or measurable goals.',
        ],
      ],
    },
  },
  projects: {
    title: 'Read a project as an engineering argument.',
    intro:
      'A project showcase should help you understand the problem, the system boundaries, and the reasoning behind an approach. The three WebCom stories cover different domains, but each can be evaluated using the same practical questions.',
    sections: [
      {
        title: 'Look for the operating problem behind the interface',
        paragraphs: [
          'EcoRoute addresses a routing decision. Fleet Command addresses coordination between vehicle activity and dispatch work. The ISP Billing Gateway addresses the transition from payment to subscriber access. Their interface illustrations show the subject matter, while the architecture descriptions explain the responsibilities behind it.',
          'When reviewing a case study, ask who acts on the information and what decision changes as a result. A map is useful because it supports an operational choice. A billing timeline is useful because it can explain whether an account is paid, provisioned, or awaiting recovery.',
        ],
      },
      {
        title: 'Follow one operation through the components',
        paragraphs: [
          'An architecture diagram becomes informative when you can trace a specific request or event across it. Identify the entry point, the validation step, the component that applies the business rule, the durable record, and the response the user sees. Then ask what happens if the operation stops halfway through.',
          'The interactive component views provide an entry point to that reasoning. The deeper walkthroughs explain data ownership, live versus historical state, reconciliation, and failure handling. They are intended to support a technical conversation rather than substitute for a repository or an independent deployment review.',
        ],
      },
      {
        title: 'Distinguish capabilities from verified outcomes',
        paragraphs: [
          'A feature such as route optimization or automated provisioning describes intended behavior. An outcome such as reduced fuel use or fewer support tickets needs a baseline, a measurement period, and an explanation of what changed. Those are different kinds of evidence.',
          'The supplied project descriptions establish the featured systems and their technologies. They do not establish client attribution, production scale, delivery dates, or independently verified performance. Those details should be added only when the studio can substantiate them and has permission to publish them.',
        ],
      },
      {
        title: 'Use the stories to scope a related challenge',
        paragraphs: [
          'You do not need an identical project to start a useful discussion. A transport operator might recognize the event pipeline in Fleet Command while needing a different dispatch process. An ISP might need subscriber reconciliation without a new public portal. A SaaS team might share EcoRoute’s need to separate specialized computation from the interface.',
          'Bring the workflow, the existing systems, and the main unknowns. We can use the relevant architecture pattern as a starting point, then assess where the analogy holds and where your operating constraints require a different design.',
        ],
      },
    ],
    table: {
      title: 'Which story is most relevant to your problem?',
      columns: ['Project', 'Primary concern', 'Questions to explore'],
      rows: [
        [
          'EcoRoute',
          'Choosing routes from changing geospatial inputs.',
          'Graph weights, data freshness, route alternatives, and evaluation.',
        ],
        [
          'Fleet Command',
          'Keeping operations aligned with live vehicle events.',
          'Dispatch states, reconnects, route history, and permissions.',
        ],
        [
          'ISP Billing Gateway',
          'Reconciling payment with subscriber entitlement.',
          'Verification, duplicate callbacks, policy application, and recovery.',
        ],
      ],
    },
  },
  blog: {
    title: 'Engineering articles that explain the decisions.',
    intro:
      'The journal is organized around problems that operators and software teams actually need to reason about. An article should leave you with a clearer model, a concrete example, and a better set of implementation questions.',
    sections: [
      {
        title: 'Software engineering: boundaries, contracts, and change',
        paragraphs: [
          'Software architecture becomes practical when it explains where a rule belongs and how a change moves through the system. The software engineering category focuses on responsibilities between interfaces, application services, storage, and external dependencies.',
          'The starting guide follows an inquiry through the website and Java API to illustrate a trust boundary. Future articles can build on that foundation with authentication decisions, data modeling, migration strategies, test design, and the operational costs of introducing another service. Each subject should remain tied to a real workflow.',
        ],
      },
      {
        title: 'Logistics technology: events with an operating meaning',
        paragraphs: [
          'A position event is not just a coordinate. It has an origin, an observation time, an arrival time, and a consequence for the person making a dispatch decision. The logistics category explores what happens when those details are delayed, duplicated, incomplete, or out of order.',
          'Read the event-pipeline guide alongside the Fleet Command architecture story. Together they explain why live delivery and durable history are separate responsibilities, and why a connected browser cannot by itself prove that a vehicle’s displayed position is current.',
        ],
      },
      {
        title: 'Network infrastructure: explain the state transitions',
        paragraphs: [
          'Network automation often crosses several systems before the subscriber sees the result. A payment provider confirms a transaction, the billing application records an entitlement, and a network device applies access policy. A failure at any stage changes what the operator needs to know.',
          'The network category focuses on those transitions and their recovery paths. The payment-to-provisioning guide explains idempotency, reconciliation, and the difference between an accepted payment and active access. It provides a reasoning framework rather than provider-specific credentials or a universal production configuration.',
        ],
      },
      {
        title: 'How to use and evaluate a technical guide',
        paragraphs: [
          'Start by checking the assumptions: the actors, the source of truth, the deployment boundary, and the failure conditions. Then compare those assumptions with your own system. A design that is sensible for a single process may need additional coordination when deployed across several workers.',
          'The journal separates examples from measured project results. Review code and configuration in the context of your environment before adopting them. If you want help applying an idea, include the relevant article and your operating constraints in an inquiry so the conversation can begin from a shared technical model.',
        ],
      },
    ],
  },
  about: {
    title: 'A studio built around the complete operating picture.',
    intro:
      'WebCom’s focus combines software development and network infrastructure because useful digital experiences depend on both. The studio’s engineering position is grounded in application behavior, data flow, connectivity, and the needs of the team that operates the result.',
    sections: [
      {
        title: 'The connection between software and infrastructure',
        paragraphs: [
          'An application can be well designed and still fail its users when it assumes reliable connectivity, instant external responses, or unlimited operational support. Infrastructure can be technically sound and still leave a business with manual billing, unclear subscriber state, or no usable interface for everyday tasks.',
          'We approach these concerns together. An application decision can affect network access requirements, and a network constraint can change the way an interface communicates progress or uncertainty. Understanding that relationship helps us ask better questions before choosing the implementation.',
        ],
      },
      {
        title: 'Systems thinking begins with the people doing the work',
        paragraphs: [
          'The important actors are not always the people submitting a form or using a dashboard. A dispatcher may rely on a driver’s device, a support operator may reconcile a payment, and an administrator may approve access to sensitive records. Each role needs a clear responsibility and an appropriate view of the information.',
          'We map these responsibilities before treating a feature request as a specification. That makes it easier to identify missing handoffs, ambiguous approvals, and exceptions that the team currently handles through informal messages or personal knowledge.',
        ],
      },
      {
        title: 'Pragmatism in architecture and delivery',
        paragraphs: [
          'A technology stack is a toolset, not a strategy. We prefer an architecture whose complexity is justified by the problem: a small service when a single service is enough, a separate worker when background work needs its own retry behavior, and a clear data contract wherever responsibility crosses a boundary.',
          'The delivery approach follows the same principle. Build a complete, reviewable slice of the workflow, demonstrate it against acceptance criteria, and record what the increment does not yet address. That creates a more useful discussion than presenting progress as a collection of screens or a percentage without context.',
        ],
      },
      {
        title: 'Ownership should be clear before the handover',
        paragraphs: [
          'Source access, production accounts, third-party licenses, operational documentation, and future maintenance are part of an engineering engagement. They should not become a surprise at the end of a build. The proposal and agreement establish the relevant ownership and responsibilities.',
          'We recommend a handover that helps the receiving team understand the system’s boundaries, configuration, deployment path, known limitations, and recovery procedures. Where ongoing support is needed, it should have an explicit scope, contact path, and set of expectations.',
        ],
      },
      {
        title: 'Where the studio is a useful fit',
        paragraphs: [
          'WebCom is positioned around SaaS and enterprise applications, logistics workflows, subscriber billing, network integration, and cloud operations. These areas share a need to connect user actions to real operational state. A focused technical assessment is often a useful first step when that connection is currently unclear.',
          'Some requirements need additional specialist involvement: formal compliance assurance, independent penetration testing, hardware certification, or a support commitment beyond the agreed capacity. We identify those needs during scoping rather than imply that a general software engagement automatically covers them.',
        ],
      },
    ],
  },
  contact: {
    title: 'Prepare for a conversation that moves the project forward.',
    intro:
      'A useful inquiry does not need to be a finished specification. It should explain the problem, provide enough operating context to ask the right questions, and identify the decisions you need help making.',
    sections: [
      {
        title: 'Describe one real example of the problem',
        paragraphs: [
          'Instead of only listing desired features, describe a recent task that was difficult. For example: a dispatcher had to call several drivers to find an available vehicle, a subscriber paid but remained disconnected, or an approval request moved between email and a spreadsheet without a reliable record.',
          'Explain who was involved, which information was missing, and what the person needed to do next. A concrete example reveals the workflow and its exceptions more quickly than a long technology wish list. If you have several problems, identify the one with the greatest operational importance.',
        ],
      },
      {
        title: 'List the systems that need to cooperate',
        paragraphs: [
          'Tell us about existing applications, databases, payment providers, devices, network equipment, and hosting environments. Include the interfaces you know are available and any approvals or account access that may be required. Unknown details are acceptable; mark them as questions instead of guessing.',
          'Do not paste passwords, API keys, subscriber records, or confidential documents into the public form. A first inquiry only needs a high-level description. If sensitive material is necessary later, agree the confidentiality arrangements and an appropriate transfer method before sharing it.',
        ],
      },
      {
        title: 'Give budget and timing their context',
        paragraphs: [
          'A budget range helps establish whether the first step should be a focused discovery, a narrow pilot, or a larger delivery proposal. The ranges in the form are conversation starters in USD, not fixed package prices or a promise that every project fits within them.',
          'If there is a deadline, explain the event behind it: a contract obligation, an operational change, a pilot window, or a planned launch. That context helps distinguish the genuinely time-critical workflow from work that can follow in a later release.',
        ],
      },
      {
        title: 'What happens after the inquiry is received',
        paragraphs: [
          'A successful form confirmation means the inquiry has been stored for the studio to review. It does not create a contract, reserve delivery capacity, or establish an emergency support arrangement. The next conversation is used to clarify fit, dependencies, and what information is still missing.',
          'When the scope is sufficiently understood, the next step can be a discovery engagement or a delivery proposal with assumptions, responsibilities, milestones, acceptance criteria, and exclusions. If the scope remains uncertain, that uncertainty should be resolved before a large build commitment is made.',
        ],
      },
    ],
    table: {
      title: 'A short inquiry checklist',
      columns: ['Include', 'A useful example', 'Leave out of the public form'],
      rows: [
        [
          'The operating problem',
          'Our payment and subscriber states do not reconcile automatically.',
          'Customer account numbers or payment records.',
        ],
        [
          'The current systems',
          'We use MikroTik gateways and an approved M-Pesa application.',
          'Router passwords, API credentials, and tokens.',
        ],
        [
          'The first useful outcome',
          'An operator can identify and recover a failed provisioning attempt.',
          'A claim that every exception must disappear immediately.',
        ],
        [
          'The delivery constraints',
          'We want to assess feasibility before the next network rollout.',
          'Unapproved confidential contracts or internal documents.',
        ],
      ],
    },
  },
  privacy: {
    title: 'Understand the information flow before you share details.',
    intro:
      'The inquiry form is intended for project conversations, not sensitive operational data. This section explains the categories of information involved, the difference between public content and private administration, and the choices you can make when contacting the studio.',
    sections: [
      {
        title: 'Why each inquiry field exists',
        paragraphs: [
          'Your name, email address, and company help the studio understand who is contacting it and where to respond. The project focus routes the conversation to the relevant engineering area. Budget context and the project description help identify an appropriate next step and the questions that need to be discussed.',
          'These fields should contain only information needed for that initial conversation. Avoid customer or subscriber records, identity documents, financial account information, health information, passwords, and API credentials. If your project requires sensitive material, agree the purpose and a suitable transfer method separately.',
        ],
      },
      {
        title: 'Separate public publishing from private inquiries',
        paragraphs: [
          'Published engineering articles and portfolio pages are public website content. Inquiry submissions are private records. The administration workspace requires sign-in and explicit administrator membership before it can read inquiry data or change a conversation’s status.',
          'Creating a public article is a separate administrative action. Sending a project inquiry does not authorize the studio to publish your company name, project brief, logo, or a testimonial. Any case-study attribution or client quotation should be agreed independently before publication.',
        ],
      },
      {
        title: 'Technical requests and external services',
        paragraphs: [
          'Delivering the website involves technical requests handled by its hosting environment. The application also uses Supabase services for database storage and administrator authentication. Configuration, access controls, and the hosting arrangement affect which technical records are generated and how long they are retained.',
          'The website currently requests font styles from Google Fonts and may show a scheduling link when the operator configures one. Following an external scheduling link takes you to that provider’s service. Review its information practices before submitting booking details; an external provider is not governed by this website’s form behavior.',
        ],
      },
      {
        title: 'Requesting a correction or deletion',
        paragraphs: [
          'If you want to correct information, ask about an inquiry, or request deletion, use the contact form and refer to the email address used for the original submission. Explain the request without adding unnecessary sensitive information. The studio may need an appropriate verification step before disclosing or changing a record.',
          'The operator must define and maintain a practical retention and deletion process, including any records needed for an ongoing contractual relationship or applicable obligations. This notice does not invent a fixed retention period or claim a regulatory certification that has not been established for the deployed service.',
        ],
      },
    ],
  },
  'how-we-work': {
    title: 'Make the collaboration as explicit as the architecture.',
    intro:
      'The delivery phases explain what happens. Equally important is how decisions are made, what evidence is reviewed, and how the team handles a new requirement or an unexpected dependency during the work.',
    sections: [
      {
        title: 'Define the decision-making group',
        paragraphs: [
          'A project needs an accountable business owner, people who understand the operating workflow, and technical contacts for the systems involved. One person may cover several roles in a small engagement, but the responsibilities should still be named. Decisions become slow when every participant assumes someone else can approve them.',
          'At kickoff, agree who accepts a milestone, who can change scope, who supplies integration access, and who owns the production environment. Also identify who will use and support the result. Their operational knowledge often reveals exceptions that are absent from the initial requirements.',
        ],
      },
      {
        title: 'Use demonstrations to test understanding',
        paragraphs: [
          'A demonstration should follow a real task rather than tour a screen. Show the input, the permission check, the important state change, the persistent record, and the visible outcome. Where the milestone includes failure handling, demonstrate an unavailable dependency or an invalid transition as well.',
          'This creates a shared reference for feedback. “The dispatcher cannot recover a rejected assignment” is more actionable than “the dashboard feels unfinished.” Record feedback as a requirement, defect, question, or later enhancement so the next delivery decision is clear.',
        ],
      },
      {
        title: 'Manage change without hiding its consequences',
        paragraphs: [
          'New information is normal during development. A previously undocumented provider restriction may appear, an existing dataset may contain inconsistent records, or stakeholders may discover that the original workflow needs a different approval step. The important part is how those findings affect the agreed plan.',
          'Assess the impact on scope, dependencies, acceptance criteria, cost, and timing before implementing the change. A change log should state the decision and its consequences. If a requirement is deferred, record why and what must be true before it is reconsidered.',
        ],
      },
      {
        title: 'Treat release readiness as a review, not a date',
        paragraphs: [
          'A target date matters, but it does not prove that a system is ready to operate. Review the required configuration, access controls, monitoring, known issues, migration steps, and recovery plan alongside the functional acceptance evidence. Identify who can authorize the release and who will be available during the agreed rollout window.',
          'A staged pilot may be appropriate when the workflow depends on field devices, live network changes, or uncertain data quality. The pilot should have a defined boundary and a review method, so its results inform the next decision rather than become an indefinite trial.',
        ],
      },
      {
        title: 'Close the engagement with usable knowledge',
        paragraphs: [
          'Handover should make the system understandable to the receiving team. Useful material includes a component overview, configuration reference, deployment path, integration contracts, operating procedures, and a list of known limitations. The exact contents depend on the work that was commissioned.',
          'Support after handover is a separate responsibility to define. Agree the covered systems, contact method, support hours, response expectations, and whether improvements are handled through a new scope or an ongoing arrangement. Do not leave those assumptions implicit.',
        ],
      },
    ],
  },
  engagements: {
    title: 'Compare commitments, not just development hours.',
    intro:
      'The right engagement depends on how much is already understood and what decision you need to make next. Discovery reduces uncertainty, a focused build delivers an agreed capability, and ongoing work maintains or improves a defined operating system.',
    sections: [
      {
        title: 'When discovery is the responsible starting point',
        paragraphs: [
          'Discovery is useful when the user journey, data source, integration feasibility, or operating model is still unclear. Its purpose is to create decision-ready information. That may include workflow maps, an architecture outline, a risk register, a prioritized scope, and a proposal for the first delivery increment.',
          'A discovery engagement should have its own boundary and acceptance criteria. It is not an open-ended promise to investigate every possible feature. Agree the questions to answer and the information the client must supply, then use the findings to decide whether to proceed, simplify, or change direction.',
        ],
      },
      {
        title: 'What makes a focused build reviewable',
        paragraphs: [
          'A build works best when the desired workflow can be described and its dependencies are understood. Define milestones around complete capabilities: a user can submit and track a request, an operator can reconcile an entitlement, or a dispatcher can assign and close a job with a consistent history.',
          'The proposal should state which environments, integrations, migrations, tests, and documents are included. It should also explain how changes are assessed and who accepts the delivered work. The objective is an operable capability, not a collection of development activities without an acceptance method.',
        ],
      },
      {
        title: 'How to define ongoing engineering work',
        paragraphs: [
          'An ongoing relationship needs a clear backlog and an operating boundary. Identify whether the work covers planned enhancements, defect investigation, dependency maintenance, infrastructure changes, monitoring review, or some combination. Each has different capacity and response expectations.',
          'Distinguish planned improvement work from incident response. A maintenance arrangement does not automatically create round-the-clock coverage, a guaranteed recovery time, or unlimited scope. Those commitments require explicit agreement, a suitable operating model, and the resources to honor them.',
        ],
      },
      {
        title: 'Understand the commercial inputs before comparing proposals',
        paragraphs: [
          'Two proposals can use the same service name and cover very different responsibilities. One may include migration and training while another assumes clean data and a fully staffed client operations team. Comparing only the total cost obscures the work that is excluded or transferred to the client.',
          'Review assumptions, integration limits, account ownership, recurring charges, acceptance criteria, support terms, intellectual-property provisions, and exit/handover requirements. If an item is important to your organization, make it part of the scope discussion before agreeing the engagement.',
        ],
      },
    ],
    table: {
      title: 'Choosing an entry point',
      columns: ['What you know today', 'What you need next', 'Likely engagement'],
      rows: [
        [
          'A problem exists, but the solution is uncertain.',
          'A feasible architecture and a prioritized scope.',
          'Discovery and architecture.',
        ],
        [
          'The workflow and dependencies are understood.',
          'A working release with acceptance evidence.',
          'A focused engineering build.',
        ],
        [
          'The system is operating and responsibilities are defined.',
          'Planned improvements or a scoped maintenance capability.',
          'Ongoing engineering and operations.',
        ],
        [
          'The system is failing, but the cause is unclear.',
          'A bounded assessment before a repair commitment.',
          'Technical investigation, then a separately scoped next step.',
        ],
      ],
    },
  },
  engineering: {
    title: 'Translate engineering principles into reviewable behavior.',
    intro:
      'Standards become useful when they can be traced to an operation and evaluated in the delivered system. The following examples explain the kinds of decisions and evidence to discuss during architecture, implementation, and release review.',
    sections: [
      {
        title: 'Define invariants before selecting components',
        paragraphs: [
          'An invariant is a condition the business operation must preserve. A payment should not create duplicate entitlement. A user should not read another tenant’s private record. An older position observation should not replace a newer live position. These statements help identify where validation, transactions, and authorization belong.',
          'Document the invariants with examples and failure cases. Then assess whether the proposed architecture can preserve them when requests repeat, a dependency times out, or several actors attempt a change at the same time. The appropriate mechanism depends on the operation rather than a universal preference for one framework.',
        ],
      },
      {
        title: 'Make trust boundaries visible in the data flow',
        paragraphs: [
          'A browser request, a provider callback, a device event, and an administrator action arrive with different trust assumptions. Identify the source of each input, how its identity is established, which fields are validated, and which component is allowed to make the business change.',
          'Keep server credentials separate from client-accessible configuration. Treat access policy as something to verify through denied requests as well as successful ones. A hidden button or an unlinked route does not establish authorization; the operation itself needs to enforce the relevant permission.',
        ],
      },
      {
        title: 'Design observability around the questions operators ask',
        paragraphs: [
          'A useful diagnostic record should help distinguish configuration failure, authentication failure, an unavailable dependency, a rejected state transition, and a successful operation. A correlation identifier can connect the stages without putting private request content or credentials into logs.',
          'Decide what operators need to see before enabling verbose logging. Define sensitive fields that must be excluded, access to diagnostic records, and the retention appropriate to the deployment. More data is not automatically better if it creates exposure or makes the important event harder to find.',
        ],
      },
      {
        title: 'Evaluate recovery as part of correctness',
        paragraphs: [
          'A timeout can leave the caller uncertain about whether an external system applied a change. Repeating the request blindly may create another problem. An appropriate recovery path might query actual state, use an idempotency key, reconcile a durable intent, or require operator review.',
          'Tests should cover these uncertain outcomes where they matter to the scope. A successful happy-path demonstration is valuable, but a system is easier to operate when it also explains what remains true after an interrupted operation and how the team can safely continue.',
        ],
      },
    ],
    table: {
      title: 'Examples of engineering evidence',
      columns: ['Concern', 'Evidence to review', 'What it does not establish alone'],
      rows: [
        [
          'Authorization',
          'An allowed action and an equivalent denied action for another role.',
          'A blanket security or compliance certification.',
        ],
        [
          'Reliability',
          'Defined retry, timeout, and recovery behavior for scoped integrations.',
          'A contractual availability guarantee.',
        ],
        [
          'Performance',
          'A measured workload, baseline, test setup, and result.',
          'Universal production capacity under every workload.',
        ],
        [
          'Operations',
          'A repeatable deployment and an exercised recovery procedure.',
          'Unlimited support coverage after handover.',
        ],
      ],
    },
  },
  faq: {
    title: 'Turn an answer into the right scoping question.',
    intro:
      'The answers above provide a starting position. Before committing to a project, connect them to your organization’s actual constraints so responsibilities, dependencies, and acceptance criteria are written down.',
    sections: [
      {
        title: 'Questions for the person funding the project',
        paragraphs: [
          'Ask which operational change justifies the investment, what a useful first release would achieve, and which assumptions must be tested before spending on a full build. A project with a clear decision owner is easier to scope than one whose success means something different to every stakeholder.',
          'Discuss the cost of maintaining the result as well as the cost of developing it. Hosting, devices, third-party providers, support capacity, and future changes can affect the total operating commitment. These inputs should be reviewed with the people who will own them.',
        ],
      },
      {
        title: 'Questions for the people using the system',
        paragraphs: [
          'Ask users to walk through real work, including interruptions, manual overrides, missing information, and tasks that depend on someone else. These details often determine whether a workflow is practical, even when the main screen looks straightforward.',
          'Identify the situations where the software should pause, warn, escalate, or allow an authorized override. A useful requirement explains both the desired action and the condition under which it should not proceed.',
        ],
      },
      {
        title: 'Questions for technical and operations owners',
        paragraphs: [
          'Confirm the source of truth for important records, the available integration interfaces, the approved access method, and the environment used for testing. Check who can provision accounts, approve configuration changes, and supply representative data without exposing sensitive records unnecessarily.',
          'Then discuss the deployment path, monitoring ownership, backup expectations, and the procedure for recovering from a failed change. If those responsibilities belong to different teams, document the handoffs before they become a release blocker.',
        ],
      },
      {
        title: 'What a useful next step looks like',
        paragraphs: [
          'A good first conversation should produce a clearer problem statement and a list of questions to resolve. Depending on the uncertainty, the next step may be a discovery proposal, a technical assessment, or a scoped build plan. It should not depend on pretending that every risk is already understood.',
          'If you are comparing providers, ask each one to explain the same workflow and its main failure case. Compare the clarity of the proposed responsibilities, assumptions, deliverables, and handover—not just the number of technologies listed on the page.',
        ],
      },
    ],
  },
  industries: {
    title: 'Industry context changes the definition of a good system.',
    intro:
      'The same technical building blocks can support very different operating needs. A transport operator, an ISP, and a SaaS team may all use APIs and PostgreSQL, but they do not share the same events, risks, or acceptance criteria.',
    sections: [
      {
        title: 'Begin with the operating vocabulary',
        paragraphs: [
          'A dispatcher thinks in assignments, vehicle availability, route progress, and exceptions. An ISP operator thinks in plans, payment confirmation, subscriber entitlement, sessions, and network policy. A product team thinks in roles, user journeys, records, and business rules.',
          'Using the right vocabulary helps distinguish meaningful state from technical implementation details. An “active connection” might mean a browser socket in one component and an authorized subscriber session in another. The architecture should make that difference explicit so the interface does not communicate the wrong certainty.',
        ],
      },
      {
        title: 'Understand how information enters the system',
        paragraphs: [
          'Logistics applications may receive device events with intermittent connectivity. Billing applications may receive callbacks that repeat or arrive after the original request has timed out. Enterprise workflows may depend on a human approval or a record held by another application.',
          'These input patterns shape validation, storage, and recovery. Identify the event source, the evidence that makes it trustworthy, the time it describes, and the component that is responsible for interpreting it. The right model reduces ambiguity before the interface is built.',
        ],
      },
      {
        title: 'Select an initial operating boundary',
        paragraphs: [
          'An industry solution should not begin as a promise to replace every existing system. Choose a workflow where the input, expected change, and responsible owner can be identified. A bounded pilot makes it easier to observe behavior and assess the integration assumptions.',
          'For logistics, that could be a dispatch workflow for a defined group of vehicles. For an ISP, it could be renewal and provisioning for a specific plan type. For SaaS, it could be one role-controlled workflow with a clear business outcome. The exact scope follows discovery rather than a universal package.',
        ],
      },
      {
        title: 'Connect the pilot to the longer-term operation',
        paragraphs: [
          'Even a narrow pilot should make its future boundaries visible. Identify which records need to persist, which external systems remain authoritative, and which parts of the solution would need different capacity or controls before a wider rollout.',
          'The purpose is not to engineer every future requirement immediately. It is to avoid hiding a critical dependency behind a successful demonstration. A useful pilot ends with evidence, known limitations, and a practical decision about the next investment.',
        ],
      },
    ],
  },
};
