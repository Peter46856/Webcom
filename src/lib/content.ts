export const services = [
  {
    slug: 'software-engineering',
    title: 'Software engineering',
    short: 'Software that moves your business forward.',
    description:
      'From the first architecture decision to the production deployment. We build SaaS products, responsive applications, and distributed systems around the way your business works.',
    icon: 'code',
    tags: ['SaaS platforms', 'API architecture', 'Real-time systems'],
    capabilities: [
      'Product discovery and system architecture',
      'React and Next.js application development',
      'Java, Node.js, Express, and FastAPI services',
      'PostgreSQL data modeling and API integrations',
    ],
    outcome:
      'A maintainable product with clear system boundaries, observable services, and a practical path to scale.',
    deliverables: [
      'Architecture and data model',
      'Accessible application interfaces',
      'Documented APIs and automated tests',
      'Deployment and operational handover',
    ],
  },
  {
    slug: 'logistics-systems',
    title: 'Logistics & fleet systems',
    short: 'A clearer view of every moving part.',
    description:
      'Connect dispatch, drivers, vehicles, and operations in one purposeful platform. We design software for the complexity of real-world movement.',
    icon: 'route',
    tags: ['Fleet telematics', 'Route optimization', 'Dispatch workflows'],
    capabilities: [
      'Live GPS tracking and WebSocket event pipelines',
      'Geospatial route planning and optimization',
      'Dispatch, driver, and maintenance workflows',
      'Route history, operational reporting, and integrations',
    ],
    outcome:
      'A shared operational picture that helps teams coordinate work and respond when plans change.',
    deliverables: [
      'Fleet and dispatch dashboards',
      'Geospatial data pipeline',
      'Operational alerts and event history',
      'Integration and deployment documentation',
    ],
  },
  {
    slug: 'network-infrastructure',
    title: 'Network infrastructure',
    short: 'The infrastructure behind the connection.',
    description:
      'Bring subscriber management, access networks, and payments together. We help regional ISPs turn network operations into reliable, repeatable workflows.',
    icon: 'network',
    tags: ['MikroTik RouterOS', 'Fiber networks', 'Subscriber billing'],
    capabilities: [
      'MikroTik gateways and RouterOS API integration',
      'GPON/EPON OLT configuration and fiber provisioning',
      'PPPoE and Hotspot subscriber lifecycle management',
      'M-Pesa Daraja payments and bandwidth policies',
    ],
    outcome:
      'Consistent provisioning, traceable billing events, and a network your operations team can understand.',
    deliverables: [
      'Network design and configuration',
      'Subscriber and payment integration',
      'Access and bandwidth policy automation',
      'Monitoring and operations runbooks',
    ],
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    short: 'Built to run. Ready to evolve.',
    description:
      'Shipping is the beginning of operating a system. We build the delivery pipelines, infrastructure, and operational visibility that keep it healthy.',
    icon: 'cloud',
    tags: ['Cloud deployments', 'CI/CD pipelines', 'Linux operations'],
    capabilities: [
      'Cloud infrastructure and container deployment',
      'Linux server hardening and access controls',
      'Automated build, test, and deployment pipelines',
      'Database tuning, backups, and observability',
    ],
    outcome:
      'Repeatable deployments and an operational foundation with fewer manual steps and clearer recovery procedures.',
    deliverables: [
      'Infrastructure configuration',
      'CI/CD workflows',
      'Monitoring and backup strategy',
      'Deployment and recovery runbooks',
    ],
  },
] as const;

export const projects = [
  {
    slug: 'ecoroute',
    name: 'EcoRoute',
    category: 'Geospatial engineering',
    title: 'Better routes. A lighter footprint.',
    description:
      'An eco-routing engine that brings graph-based pathfinding, crowdsourced traffic, and topographical context into one transit experience.',
    stack: ['FastAPI', 'React-Leaflet', 'Supabase', 'PostgreSQL'],
    color: 'green',
    challenge:
      'The shortest path does not always reflect the conditions on the road. Routing needs to account for changing traffic and terrain while keeping the experience understandable.',
    approach:
      'Represent the transit network as a weighted graph, combine traffic observations with topographical inputs, and expose route alternatives through a geospatial interface.',
    features: [
      'Graph-based route calculation',
      'Crowdsourced traffic observations',
      'Topographical route weighting',
      'Interactive map and route alternatives',
    ],
    nodes: [
      {
        title: 'Map experience',
        tech: 'React · React-Leaflet',
        detail:
          'Displays route alternatives and map layers, and captures origin and destination input.',
      },
      {
        title: 'Routing engine',
        tech: 'Python · FastAPI',
        detail:
          'Combines graph weights, traffic observations, and terrain parameters to calculate candidate routes.',
      },
      {
        title: 'Geospatial data',
        tech: 'Supabase · PostgreSQL',
        detail: 'Stores transit graph data and observations behind controlled database access.',
      },
    ],
  },
  {
    slug: 'fleet-command',
    name: 'Fleet Command',
    category: 'Enterprise logistics',
    title: 'One command center. Every vehicle.',
    description:
      'A fleet operations platform connecting live vehicle positions, automated dispatch, route history, and maintenance scheduling.',
    stack: ['Next.js', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL'],
    color: 'blue',
    challenge:
      'Dispatchers need a coherent view of moving vehicles, driver activity, and maintenance commitments without stitching together separate tools.',
    approach:
      'Separate durable operational records from transient location events. Stream vehicle updates to a dispatch interface while retaining the history needed for reporting.',
    features: [
      'Live GPS vehicle tracking',
      'Automated dispatch workflows',
      'Driver route history',
      'Maintenance scheduling dashboards',
    ],
    nodes: [
      {
        title: 'Operations console',
        tech: 'Next.js · React',
        detail:
          'Gives dispatchers a shared view of vehicle positions, assignments, and scheduled maintenance.',
      },
      {
        title: 'Event pipeline',
        tech: 'Node.js · WebSockets · Redis',
        detail:
          'Processes incoming location events and distributes updates to connected operations clients.',
      },
      {
        title: 'Fleet records',
        tech: 'PostgreSQL',
        detail: 'Persists dispatch assignments, route history, and maintenance records.',
      },
    ],
  },
  {
    slug: 'isp-billing',
    name: 'ISP Billing Gateway',
    category: 'Network infrastructure',
    title: 'From payment to connected.',
    description:
      'An automated subscriber gateway connecting M-Pesa billing, MikroTik access policies, and real-time PPPoE and Hotspot session tracking.',
    stack: ['MikroTik API', 'M-Pesa Daraja', 'PPPoE', 'Hotspot'],
    color: 'purple',
    challenge:
      'Subscriber payments and network access must stay in sync, even when callbacks are delayed or a gateway is temporarily unavailable.',
    approach:
      'Treat payment confirmation and provisioning as separate, traceable steps. Reconcile billing events before applying access and bandwidth policies through the MikroTik API.',
    features: [
      'M-Pesa STK push billing',
      'Automated subscriber provisioning',
      'Dynamic bandwidth policies',
      'Real-time session tracking',
    ],
    nodes: [
      {
        title: 'Subscriber portal',
        tech: 'Billing · Session management',
        detail:
          'Lets subscribers initiate payments and gives operators visibility into plans and sessions.',
      },
      {
        title: 'Payment orchestration',
        tech: 'M-Pesa Daraja API',
        detail:
          'Reconciles payment callbacks with subscriber accounts before requesting access changes.',
      },
      {
        title: 'Network access',
        tech: 'MikroTik · PPPoE · Hotspot',
        detail: 'Applies subscriber access and bandwidth policies, and reports session state.',
      },
    ],
  },
] as const;

export const categories = [
  'All articles',
  'Software Engineering',
  'Logistics Tech',
  'Network Infrastructure',
] as const;
