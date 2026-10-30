import type { Portfolio } from '../types/portfolio'

/**
 * English content. Every entry cites the cv_master.json ids it comes from:
 * shortening and rephrasing are fine, new claims are not.
 */
const en: Portfolio = {
  person: {
    name: 'Firas Saada',
    email: 'firassaada1111@gmail.com',
    location: 'Tunis, Tunisia',
    address: { locality: 'Tunis', countryCode: 'TN' },
    linkedin: 'https://www.linkedin.com/in/firas-saada-8b037a199/',
    cv: { href: '/Firas_Saada_CV.pdf', fileName: 'Firas_Saada_CV.pdf' },
    sources: ['profile.name', 'profile.email', 'profile.location', 'profile.links'],
  },

  seo: {
    title: 'Firas Saada — Software Engineer, Backend & Integrations',
    description: 'Software engineer (Node.js / TypeScript) building supplier integrations for METIS, a corporate travel booking platform in production: Hertz, Carbookr and the Transavia booking flow.',
    sources: ['profile.name', 'variants.A.title', 'variants.A.summary'],
  },

  hello: {
    greetings: [
      { text: 'Hello', lang: 'en' },
      { text: 'Bonjour', lang: 'fr' },
      { text: 'مرحبا', lang: 'ar', dir: 'rtl' },
    ],
    sources: ['profile.languages'],
  },

  hero: {
    pills: [
      { text: 'Available for opportunities', tone: 'green', dot: true, sources: ['profile'] },
      { text: 'Open to relocation: France / EU, or remote', tone: 'neutral', sources: ['profile.location'] },
      { text: 'AWS Certified Developer – Associate', tone: 'neutral', sources: ['certifications'] },
    ],
    name: { first: 'Firas', last: 'Saada', sources: ['profile.name'] },
    role: {
      text: 'Software Engineer, Backend & Integrations (Node.js / TypeScript)',
      sources: ['variants.A.title'],
    },
    summary: {
      text: 'I build supplier integrations for METIS, a corporate travel booking platform in production: Hertz (production-certified, first live car provider), Carbookr and the Transavia booking flow. I own the platform’s car rental section, from the API to the Vue 3 front end.',
      sources: ['variants.A.summary'],
    },
    terminal: [
      { status: 'ok', name: 'hertz', text: 'OTA 2003/05 XML · production-certified · first live car provider', sources: ['hertz.1', 'hertz.12'] },
      { status: 'ok', name: 'carbookr', text: 'REST · live since Sep 2026', sources: ['carbookr.1', 'carbookr.8'] },
      { status: 'info', name: 'transavia', text: 'main developer of the booking flow', sources: ['transavia.1'] },
      { status: 'pending', name: 'bsp-auto', text: 'XML · production certification in progress', sources: ['bspauto.1', 'bspauto.3'] },
      { status: 'ok', name: 'aws', text: 'Certified Developer – Associate', sources: ['certifications'] },
    ],
  },

  keyFacts: [
    { value: '1st', label: 'car rental provider live on METIS (Hertz, production-certified)', sources: ['hertz.12'] },
    { value: '6', label: 'OTA 2003/05 XML flows built for Hertz', sources: ['hertz', 'hertz.1'] },
    { value: 'Sep 2026', label: 'Carbookr integration live in production', sources: ['carbookr.8'] },
    { value: 'Top contributor', label: 'to the car API, ~167 commits in 12 months', sources: ['commits', 'workflow.1'] },
  ],

  work: {
    intro: {
      text: 'The supplier integrations I work on for METIS, a corporate travel booking platform in production, each with its booking flow step by step.',
      sources: ['everbloo', 'variants.A.summary'],
    },
    integrations: [
      {
        id: 'hertz',
        icon: 'car',
        title: 'Hertz',
        company: 'Everbloo · METIS',
        domain: 'Car rental · OTA 2003/05 XML',
        status: { kind: 'live', label: 'Live', sources: ['hertz.12'] },
        summary: {
          text: 'Built from scratch on the OTA 2003/05 XML standard: six message flows, from availability to modification. It passed Hertz production certification, making Hertz the platform’s first live car provider.',
          sources: ['hertz', 'hertz.1', 'hertz.12'],
        },
        detail: {
          text: 'Corporate codes are queried in parallel, then merged and deduplicated; vouchers support direct billing; every request and response is archived to AWS S3.',
          sources: ['hertz.3', 'hertz.6', 'hertz.10'],
        },
        flow: [
          { label: 'Availability & rates', detail: 'OTA_VehAvailRateRQ', sources: ['hertz.1'] },
          { label: 'Station details', detail: 'OTA_VehLocDetailRQ', sources: ['hertz.1'] },
          { label: 'Booking', detail: 'OTA_VehResRQ', sources: ['hertz.1'] },
          { label: 'Retrieve', detail: 'OTA_VehRetResRQ', sources: ['hertz.1'] },
          { label: 'Cancel', detail: 'OTA_VehCancelRQ', sources: ['hertz.1'] },
          { label: 'Modify', detail: 'OTA_VehModifyRQ', sources: ['hertz.1'] },
        ],
        impact: [
          { text: 'Passed Hertz production certification', sources: ['hertz.12'] },
          { text: 'First car provider live on the platform', sources: ['hertz.12'] },
          { text: 'Extended to Thrifty, Dollar and Firefly', sources: ['hertz.11'] },
        ],
        tags: ['Node.js', 'Express', 'PostgreSQL', 'XML', 'AWS S3'],
        sources: ['hertz', 'hertz.1', 'hertz.3', 'hertz.6', 'hertz.7', 'hertz.10', 'hertz.11', 'hertz.12', 's3_logging', 'car_owner'],
      },
      {
        id: 'carbookr',
        icon: 'network',
        title: 'Carbookr',
        company: 'Everbloo · METIS',
        domain: 'Car rental aggregator · REST',
        status: { kind: 'live', label: 'Live since Sep 2026', sources: ['carbookr.8'] },
        summary: {
          text: 'Built end to end over REST/JSON: authentication, geo search, booking, two-step modification and after-sales, with the actual renting company shown white-label in the UI.',
          sources: ['carbookr', 'carbookr.1', 'carbookr.2', 'carbookr.3', 'carbookr.6'],
        },
        flow: [
          { label: 'Auth', detail: 'token cached · refreshed before expiry · re-auth fallback', sources: ['carbookr.1'] },
          { label: 'Geo search', detail: 'lat/long · one-way rentals', sources: ['carbookr.2'] },
          { label: 'Offer detail', sources: ['carbookr.2'] },
          { label: 'Booking', detail: 'driver info', sources: ['carbookr.2'] },
          { label: 'Modify', detail: 'ask, then validate with a modification token', sources: ['carbookr.3'] },
          { label: 'Retrieve / cancel', sources: ['carbookr.2'] },
        ],
        impact: [
          { text: 'In production since Sep 2026', sources: ['carbookr.8'] },
          { text: 'White-label display of the actual renting company', sources: ['carbookr.6'] },
          { text: 'Per-company client IDs for corporate customers', sources: ['carbookr.5'] },
        ],
        tags: ['Node.js', 'REST/JSON', 'PostgreSQL', 'Vue 3'],
        sources: ['carbookr', 'carbookr.1', 'carbookr.2', 'carbookr.3', 'carbookr.5', 'carbookr.6', 'carbookr.7', 'carbookr.8'],
      },
      {
        id: 'transavia',
        icon: 'plane',
        title: 'Transavia',
        company: 'Everbloo · METIS',
        domain: 'Airline · LCC API',
        summary: {
          text: 'Main developer of the Transavia booking flow, from offer details to after-sales, including ancillaries and payment. I joined after colleagues had set up authentication and shopping.',
          sources: ['transavia', 'transavia.1'],
        },
        flow: [
          { label: 'Offer details', sources: ['transavia.1'] },
          { label: 'Booking', sources: ['transavia.1'] },
          { label: 'Payment', detail: 'fees · card · status checks', sources: ['transavia.3'] },
          { label: 'Order retrieval', sources: ['transavia.1'] },
          { label: 'After-sales', detail: 'reshop / change', sources: ['transavia.1', 'transavia.5'] },
        ],
        impact: [
          { text: 'Main developer of the booking flow', sources: ['transavia.1'] },
          { text: 'Ancillaries: baggage, seats, sports equipment', sources: ['transavia.2'] },
          { text: 'Both airline codes (HV, TO) and Flying Blue loyalty', sources: ['transavia.4'] },
        ],
        tags: ['Node.js', 'Vue 3'],
        sources: ['transavia', 'transavia.1', 'transavia.2', 'transavia.3', 'transavia.4', 'transavia.5'],
      },
      {
        id: 'bsp-auto',
        icon: 'exchange',
        title: 'BSP Auto',
        company: 'Everbloo · METIS',
        domain: 'Car rental broker · XML',
        status: { kind: 'certification', label: 'In certification', sources: ['bspauto.3', 'partners.4'] },
        summary: {
          text: 'Integrating the BSP Auto broker XML API: location import, rate search, booking and cancellation. Production certification is under way with BSP Auto’s IT support.',
          sources: ['bspauto', 'bspauto.3', 'partners.4'],
        },
        flow: [
          { label: 'Location import', detail: 'batches of 500', sources: ['bspauto.2'] },
          { label: 'Rate search', sources: ['bspauto.2'] },
          { label: 'Booking', sources: ['bspauto.3'] },
          { label: 'Cancellation', sources: ['bspauto.3'] },
        ],
        impact: [
          { text: 'Production account activated', sources: ['bspauto.3', 'partners.4'] },
          { text: 'Certification bookings run with BSP Auto’s IT support', sources: ['partners.4'] },
          { text: 'Go-live pending', sources: ['partners.4'] },
        ],
        tags: ['Node.js', 'XML over HTTP', 'ISO-8859-1 / UTF-8'],
        sources: ['bspauto', 'bspauto.1', 'bspauto.2', 'bspauto.3', 'partners.4'],
      },
      {
        id: 'car-section',
        icon: 'layers',
        title: 'The car rental section, end to end',
        company: 'Everbloo · METIS',
        domain: 'Car rental · API + front end',
        featured: true,
        summary: {
          text: 'I own the platform’s car rental section, from the Node.js/Express/PostgreSQL API to the Vue 3/Nuxt front end, and handle most of its features and fixes.',
          sources: ['car_owner'],
        },
        flow: [
          { label: 'Station search', detail: 'PostgreSQL full-text + Haversine radius · Google Places', sources: ['geo_search', 'car.1', 'car.2', 'car.3'] },
          { label: 'Results & filters', sources: ['car_frontend', 'hertz.8'] },
          { label: 'Booking funnel', detail: 'supplier-specific payment', sources: ['car_frontend', 'car.8'] },
          { label: 'After-sales', detail: 'retrieve · cancel · modify', sources: ['car.6'] },
          { label: 'PDF voucher', detail: 'jsPDF · emailed to the client', sources: ['car_frontend', 'car.7'] },
        ],
        impact: [
          { text: 'I own the section, from the Node.js API to the Vue 3 front end', sources: ['car_owner'] },
          { text: 'Corporate rates, loyalty programs and voucher billing', sources: ['corporate_rates'] },
          { text: 'UI in 5 languages', sources: ['car.9'] },
        ],
        tags: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Keycloak', 'Vue 3', 'Nuxt', 'Pinia', 'Vuetify', 'TypeScript', 'Google Maps / Places', 'jsPDF'],
        sources: ['car_owner', 'geo_search', 'car_frontend', 'corporate_rates', 'multi_tenant_creds', 'car.1', 'car.2', 'car.3', 'car.4', 'car.5', 'car.6', 'car.7', 'car.8', 'car.9'],
      },
    ],
  },

  experience: [
    {
      id: 'everbloo',
      role: 'Software Engineer (Freelance, Full-time)',
      company: 'Everbloo',
      product: 'METIS, corporate travel booking platform (Groupe Adenis)',
      location: 'France (Remote)',
      start: '2025-04',
      end: 'present',
      bullets: [
        {
          text: 'Own the car rental section across the Node.js/Express/PostgreSQL API and the Vue 3/Nuxt front end, and handle most of its features and fixes.',
          sources: ['car_owner'],
        },
        {
          text: 'Implemented corporate pricing (negotiated-rate codes queried in parallel, then merged and deduplicated; loyalty programs; voucher direct billing) and per-company supplier credentials resolved from Keycloak groups.',
          sources: ['corporate_rates', 'multi_tenant_creds'],
        },
        {
          text: 'Archived supplier requests and responses to AWS S3 and normalized supplier errors for production support; served vehicle images via S3 presigned URLs.',
          sources: ['s3_logging'],
        },
        {
          text: 'Technical contact with the car rental providers (Hertz, Carbookr, BSP Auto), and primary contact for production issues on the car section reported by client travel agencies.',
          sources: ['partners.1', 'support.1'],
        },
        {
          text: 'Work through GitLab merge requests with code review and tickets in Linear; added the merge-request templates to the car API repository.',
          sources: ['workflow.2'],
        },
      ],
      note: {
        text: 'The supplier integrations (Hertz, Carbookr, Transavia, BSP Auto) are detailed under Work.',
        href: '#work',
        sources: ['hertz', 'carbookr', 'transavia', 'bspauto'],
      },
      sources: ['everbloo'],
    },
    {
      id: 'callem',
      role: 'DevOps & Frontend Engineer Intern',
      company: 'Callem',
      product: 'Voice-AI startup',
      location: 'France',
      start: '2024-06',
      end: '2024-12',
      bullets: [
        {
          text: 'Replaced manual deployments with 10 Azure DevOps CI/CD pipelines (dev + prod) for the startup’s 5 apps: frontend, backend, LLM executor, vector store, website.',
          sources: ['cicd_pipelines'],
        },
        {
          text: 'Four-stage pipelines: SonarCloud analysis, Docker build to Azure Container Registry, Trivy vulnerability scan, then Azure App Service deploy with manual production approval.',
          sources: ['pipeline_stages'],
        },
        {
          text: 'Built the Angular chat interface connecting users to the platform’s AI agents in real time over WebSockets (front end only).',
          sources: ['ai_chat', 'callem.5'],
        },
        {
          text: 'Set up the Azure environment: resource group, registry with pull-only access, health checks, logging and downtime alerts.',
          sources: ['azure_setup'],
        },
        {
          text: 'Built monitoring dashboards and data visualizations in Angular with amCharts.',
          sources: ['dashboards'],
        },
      ],
      sources: ['callem'],
    },
    {
      id: 'upwork',
      role: 'AWS / DevOps Freelancer',
      company: 'Upwork client',
      location: 'United Kingdom (Remote)',
      start: '2024-05',
      end: '2024-06',
      bullets: [
        { text: 'Designed and deployed a highly available AWS architecture with Terraform.', sources: ['terraform_ha'] },
        { text: 'Ran containers on ECS behind Application Load Balancers with automated scaling and deployments.', sources: ['ecs_alb'] },
        { text: 'Configured VPCs, subnets and NAT Gateways; exposed APIs through Amazon API Gateway.', sources: ['networking'] },
      ],
      sources: ['upwork'],
    },
    {
      id: 'axe-finance',
      role: 'DevOps Intern',
      company: 'Axe Finance',
      location: 'Tunis, Tunisia',
      start: '2023-06',
      end: '2023-08',
      bullets: [
        { text: 'Added SonarQube static analysis to Azure DevOps CI pipelines.', sources: ['sonarqube'] },
      ],
      sources: ['axe_finance'],
    },
  ],

  projects: [
    {
      id: 'ai-tooling',
      icon: 'terminal',
      title: 'AI agent skills (Claude Code) and a source-cited CV generator (Python)',
      bullets: [
        {
          text: '/ship, a Claude Code skill: branches from development, commits, pushes and opens a merge request with the team’s template, assignee and reviewer, and refuses to push to protected branches.',
          sources: ['tooling.1'],
        },
        {
          text: 'A CV pipeline: a JSON fact base where every generated line cites a source id, a tailoring skill, and a Python (fpdf) renderer for one-page PDFs.',
          sources: ['tooling.2'],
        },
      ],
      note: {
        text: 'This site follows the same rule: every entry in its content cites its source ids, and a script checks them.',
        sources: ['tooling.2'],
      },
      tags: ['Claude Code', 'git', 'GitLab CLI', 'Python', 'fpdf'],
      sources: ['ai_tooling', 'tooling.1', 'tooling.2'],
    },
  ],

  skills: [
    { id: 'languages', label: 'Programming', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'], sources: ['skills.languages'] },
    { id: 'backend', label: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Sequelize', 'Keycloak'], sources: ['skills.backend'] },
    { id: 'integration', label: 'APIs & integration', items: ['REST APIs', 'XML / OTA 2003/05 supplier APIs', 'token-based auth', 'WebSockets'], sources: ['skills.integration'] },
    { id: 'frontend', label: 'Frontend', items: ['Vue 3', 'Nuxt', 'Pinia', 'Vuetify', 'Angular', 'Google Maps / Places API', 'jsPDF'], sources: ['skills.frontend'] },
    { id: 'data', label: 'Databases', items: ['PostgreSQL (full-text and geo queries)'], sources: ['skills.data'] },
    { id: 'cloud', label: 'Cloud', items: ['AWS (S3, ECS, ALB, VPC, API Gateway)', 'Azure (App Service, DevOps, Container Registry)'], sources: ['skills.cloud'] },
    { id: 'devops', label: 'DevOps & tools', items: ['Docker', 'Terraform', 'Azure DevOps Pipelines', 'SonarQube / SonarCloud', 'Trivy', 'Git'], sources: ['skills.devops'] },
    { id: 'other', label: 'Practices', items: ['AI-assisted development (Claude Code, Cursor)', 'Agile', 'Code review via merge requests'], sources: ['skills.other'] },
  ],

  about: {
    paragraphs: [
      {
        text: 'I’m a software engineer (Node.js / TypeScript). Since April 2025 I’ve been a full-time freelancer at Everbloo, building supplier integrations for METIS, a corporate travel booking platform in production (Groupe Adenis), and I own its car rental section, from the API to the Vue 3 front end.',
        sources: ['variants.A.summary', 'everbloo', 'car_owner'],
      },
      {
        text: 'I’m the technical contact with the car rental providers (Hertz, Carbookr, BSP Auto), in Teams meetings and written threads with their business and technical teams, and the primary contact for production issues on the car section. Day to day, changes go through GitLab merge requests with code review, tickets live in Linear, and I develop with Claude Code and Cursor.',
        sources: ['partners.1', 'support.1', 'workflow.2', 'workflow.3'],
      },
    ],
    education: {
      school: 'INSAT',
      schoolFull: 'National Institute of Applied Science and Technology',
      degree: 'Engineering degree (MEng, Bac+5)',
      field: 'Software Engineering / Mathematics and Computer Science',
      location: 'Tunis, Tunisia',
      start: '2020',
      end: '2025',
      sources: ['education'],
    },
    certification: {
      name: 'AWS Certified Developer – Associate',
      href: 'https://www.credly.com/badges/8cc6affa-4cad-4cfa-881f-0191fe30c22d',
      sources: ['certifications'],
    },
    languages: {
      items: [
        { name: 'Arabic', level: 'Native' },
        { name: 'French', level: 'C1' },
        { name: 'English', level: 'B2/C1' },
      ],
      sources: ['profile.languages'],
    },
  },

  contact: {
    intro: {
      text: 'I’m looking for backend and integration roles in France or anywhere in the EU, or remote. Email is the quickest way to reach me.',
      sources: ['profile.location'],
    },
    location: {
      text: 'Tunis, Tunisia · open to relocation (France / EU) or remote',
      sources: ['profile.location'],
    },
  },
}

export default en
