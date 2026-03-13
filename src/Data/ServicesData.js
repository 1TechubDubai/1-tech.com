import { 
  Server, 
  Users, 
  Brain, 
  ShieldCheck, 
  TabletSmartphone, 
  Link2, 
  TrendingUp 
} from 'lucide-react';

export const servicesData = [
  {
    id: 'gtm-market-expansion',
    sidebarTitle: 'Enterprise GTM & Expansion',
    icon: TrendingUp,
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    title: 'Enterprise GTM & Market Expansion',
    subtitle: 'Strategic. Proven. Results-Driven.',
    description: "Entering a new geographical market is fraught with high costs, regulatory hurdles, and immense strategic risk. At 1TecHub, our Enterprise GTM & Market Expansion services are specifically engineered to help ambitious technology companies scale into the Middle East, Africa, and India with surgical precision and proven frameworks. We go far beyond traditional consulting—we literally become your on-the-ground regional sales and operational team. We represent your brand to top-tier enterprise clients, navigating local nuances to drive rapid, measurable, and highly profitable revenue growth.",
    portfolio: [
      {
        title: 'Market Entry Strategy & Positioning',
        description: 'Enter highly competitive new markets with absolute clarity through our comprehensive market sizing, strategic buyer persona mapping, and localized pricing strategies.',
        tags: ['Market Sizing', 'Buyer Persona Mapping', 'Pricing Strategy', 'Compliance Insights']
      },
      {
        title: 'End-to-End Sales Execution',
        description: 'We operate directly as your dedicated regional sales force—aggressively handling lead generation, complex POCs, enterprise deal closures, and pipeline reporting.',
        tags: ['Account-Based Targeting', 'Pre-Sales & Demos', 'Deal Closures', 'Pipeline Reporting']
      },
      {
        title: 'Channel & Partner Development',
        description: 'We rapidly build a powerful, localized ecosystem to scale your reach through established strategic alliances, reseller identification, and joint GTM campaigns.',
        tags: ['SI Partnerships', 'Reseller Onboarding', 'Joint GTM Campaigns', 'Partner Lifecycle']
      },
      {
        title: 'Regional Branding & Demand Gen',
        description: 'Dramatically boost your brand visibility and authority in new markets with highly targeted digital campaigns, exclusive CXO-level roundtable events, and localized messaging.',
        tags: ['Targeted Campaigns', 'CXO Roundtables', 'Brand Localization', 'Thought Leadership']
      },
      {
        title: 'Localized Infrastructure Setup',
        description: 'We quickly build a fully operational regional presence for you without the heavy overhead, including legal advisory, local market hiring, and multi-tier support setups.',
        tags: ['Legal & Licensing', 'Local Hiring', 'L1/L2/L3 Support', 'Back-Office Setup']
      },
      {
        title: 'High-Tech & SaaS GTM Frameworks',
        description: 'We utilize specifically tailored GTM execution frameworks optimized for complex technology products spanning AI, highly technical SaaS, Cybersecurity, ERP, and IoT.',
        tags: ['AI & SaaS', 'Cybersecurity', 'ERP Systems', 'IoT & Industry 4.0']
      }
    ],
    benefits: [
      { title: 'Unrivaled Enterprise Network', description: 'Gain immediate, direct access to our established network of top decision-makers in Retail, Healthcare, Government, and Manufacturing across the MEA region.' },
      { title: 'A Proven, Turnkey Sales Engine', description: 'From initial cold prospecting to finalizing complex contract closures, we expertly run and manage your complete, end-to-end regional sales cycle.' },
      { title: 'Deep, Actionable Regional Insights', description: 'We provide the nuanced, on-the-ground understanding of cultural, industry, and regulatory dynamics required to navigate and succeed in the Middle East and Africa.' },
      { title: 'Strict Pipeline Governance', description: 'We operate with total transparency, providing weekly detailed dashboards, highly qualified opportunity metrics, and rigorous, accountable revenue tracking.' },
      { title: 'Relentless Outcome-Focused Approach', description: 'We do not bill for mere activity; we strictly prioritize generating tangible revenue, aggressive customer acquisition, and establishing long-term enterprise client retention.' },
      { title: 'Highly Flexible Engagement Models', description: 'We offer tailored, risk-mitigated partnership models including GTM retainers, hybrid commission structures, and exclusive regional master partnerships.' }
    ]
  },
  {
    id: 'it-managed-services',
    sidebarTitle: 'Enterprise IT Managed Services',
    icon: Server,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    title: 'Enterprise IT Managed Services',
    subtitle: 'Transform Your IT Operations into a High-Performance Engine',
    description: "At 1TecHub, we don't just maintain your technology—we actively elevate it. In an era where digital agility defines market leadership, we shift your IT focus from reactive maintenance to proactive innovation. Whether you are modernizing legacy infrastructure, expanding into global markets, or strengthening system resilience, we operate as your dedicated technology backbone. Through predictive monitoring, expert governance, and round-the-clock specialized support, we ensure your mission-critical operations run on secure, scalable, and always-on systems.",
    portfolio: [
      {
        title: 'Enterprise SAP Managed Services',
        description: 'Comprehensive, end-to-end SAP application and infrastructure management designed to ensure optimal performance, rapid issue resolution, and seamless upgrades.',
        tags: ['SAP S/4HANA', 'ECC', 'BTP Support', 'Incident Management', '24x7 Support']
      },
      {
        title: 'Enterprise Oracle Managed Services',
        description: 'Full-lifecycle Oracle ecosystem management governed by certified experts, ensuring high availability and seamless cloud transformations.',
        tags: ['Fusion Cloud', 'Oracle EBS', 'Integration Cloud', 'Database Admin']
      },
      {
        title: 'Enterprise Cyber Security Managed Services',
        description: 'Vigilant 24/7 security operations providing proactive threat hunting, continuous monitoring, and rapid incident mitigation.',
        tags: ['SOC Operations', 'Vulnerability Assessment', 'Cloud Security & IAM', 'MDR']
      },
      {
        title: 'Enterprise Infrastructure Managed Services',
        description: 'Robust infrastructure orchestration across hybrid cloud environments, enterprise networks, and global data centers.',
        tags: ['AWS / Azure / GCP', 'Network & Data Center', 'Middleware', 'Disaster Recovery']
      }
    ],
    benefits: [
      { title: 'Proactive, Insight-Led Operations', description: 'We utilize predictive monitoring and automated diagnostics to identify and resolve bottlenecks before they impact your seamless operations.' },
      { title: 'Enterprise Governance Framework', description: 'Every client engagement is rigorously governed by Senior Solution Architects, ensuring strict adherence to structured, performance-based SLAs.' },
      { title: 'Full-Stack Expertise', description: 'Gain immediate access to deep, comprehensive expertise across SAP, Oracle, enterprise Cybersecurity, and complex Cloud Infrastructure.' },
      { title: 'Scalable Global Delivery', description: 'Leverage our multi-country delivery capabilities with flexible, follow-the-sun 24x7 support models tailored to your operational hours.' },
      { title: 'Security & Audit Readiness', description: 'Maintain continuous compliance through automated monitoring, ensuring your infrastructure is always prepared for stringent audit reporting frameworks.' },
      { title: 'Continuous Cost Optimization', description: 'We actively identify and eliminate operational waste, optimizing costs across cloud consumption, software licensing, and hardware infrastructure.' }
    ]
  },
  {
    id: 'strategic-talent-solutions',
    sidebarTitle: 'Strategic Tech Talent Solutions',
    icon: Users,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    title: 'Strategic Technology Talent Solutions',
    subtitle: 'Vetted. Certified. Project-Ready.',
    description: "Finding the top 5% of global technology talent is a monumental challenge. At 1TecHub, we help visionary companies build high-performance technology teams with unprecedented speed, precision, and global reach. We mitigate the risks of hiring by delivering rigorously vetted, certified, and project-ready IT professionals. Whether you require highly specialized on-site architects, dedicated remote engineering pods, flexible contract resources, or complete talent lifecycle management, we become your trusted, scalable talent engine.",
    portfolio: [
      {
        title: 'Technology Workforce On-Demand',
        description: 'Instantly scale your technology teams with highly skilled professionals. We provide rapid sourcing across global markets with a strict replacement guarantee for performance.',
        tags: ['Contract-to-Hire', 'Rapid Sourcing', 'SAP / Oracle / Cloud', 'Timesheet Management']
      },
      {
        title: 'Executive Technology Recruitment',
        description: 'Secure top-tier leadership that will shape your digital future. We conduct deep technical, behavioral, and strategic evaluations for CXO and Director roles.',
        tags: ['CXO Hiring', 'Leadership Mapping', 'Confidential Search', 'Domain Assessment']
      },
      {
        title: 'Dedicated Offshore & Nearshore Teams',
        description: 'Build your extended technology organization with zero operational overheads. Access full, cohesive development squads managed natively by 1TecHub.',
        tags: ['Development Squads', 'Monthly Subscription', 'Scalable Teams', 'Compliant Environment']
      },
      {
        title: 'Managed Talent Services (MTS)',
        description: 'Complete end-to-end workforce management encompassing the entire hiring lifecycle—from initial job profiling to payroll, compliance, and visa management.',
        tags: ['Workforce Planning', 'Background Verification', 'Payroll & Compliance', 'Onboarding']
      },
      {
        title: 'Project-Based Resource Deployment',
        description: 'Quickly deploy specialized technical experts precisely when you need them for mission-critical initiatives like ERP rollouts or cloud migrations.',
        tags: ['Rapid Deployment', 'Flexible Term Models', 'Milestone Staffing', 'Transparent Rate Cards']
      }
    ],
    benefits: [
      { title: 'Unmatched Speed & Precision', description: 'Elite talent delivered in days, not weeks. Our proprietary global recruiter network and AI-driven screening ensure rapid, highly accurate shortlisting.' },
      { title: 'Top 5% Quality Guarantee', description: 'Every single profile is rigorously vetted by our own architects for technical depth, real-world project experience, certifications, and communication skills.' },
      { title: 'Global Reach, Local Expertise', description: 'Our expansive network allows us to effortlessly source, seamlessly onboard, and deploy premier talent across the UAE, GCC, Africa, India, and Europe.' },
      { title: 'Ultra-Flexible Engagement Models', description: 'Hire exactly how your evolving business dictates—choose effortlessly from contract, full-time, dedicated offshore, or blended hybrid models.' },
      { title: 'Comprehensive Tech Coverage', description: 'Gain instant access to niche, hard-to-find specialists across SAP, Oracle, Cloud, DevOps, Cybersecurity, Data Science, AI, and Custom Software.' },
      { title: 'Complete Governance & Compliance', description: 'We absorb the administrative burden, handling all timesheets, performance reviews, attendance reporting, and SLA tracking to drastically reduce your risk.' }
    ]
  },
  {
    id: 'ai-analytics',
    sidebarTitle: 'Intelligent AI & Analytics',
    icon: Brain,
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop',
    title: 'Intelligent AI, Agentic AI & Analytics',
    subtitle: 'Deploy Autonomous Agents to Automate Complex Workflows',
    description: "Harness the transformative power of next-generation artificial intelligence. We help enterprises move beyond passive data dashboards into the era of active, autonomous execution. At 1TecHub, we engineer, train, and deploy intelligent, agentic workflows that securely integrate with your proprietary data. These systems don't just provide insights—they continuously analyze patterns, make sophisticated decisions, and autonomously execute complex multi-step tasks across your entire enterprise ecosystem.",
    portfolio: [
      {
        title: 'Agentic AI & Workflow Automation',
        description: 'Deployment of autonomous AI agents capable of contextual reasoning, API interaction, and independent execution of multi-step business processes.',
        tags: ['AutoGPT', 'LangChain', 'Workflow Automation', 'Cognitive Agents']
      },
      {
        title: 'Enterprise RAG & Generative AI',
        description: 'Secure, private Large Language Model (LLM) deployments using Retrieval-Augmented Generation to converse seamlessly with your internal enterprise data.',
        tags: ['Custom LLMs', 'RAG Architecture', 'Knowledge Bases', 'Data Privacy']
      },
      {
        title: 'Predictive Analytics & Forecasting',
        description: 'Advanced machine learning models designed to analyze historical data, accurately forecast market trends, predict demands, and identify deep anomalies.',
        tags: ['Time-Series Analysis', 'Demand Forecasting', 'Risk Modeling', 'Churn Prediction']
      },
      {
        title: 'Computer Vision & Spatial Analytics',
        description: 'Intelligent image and video processing solutions for automated quality control, security monitoring, and complex visual data extraction.',
        tags: ['Object Detection', 'Quality Assurance', 'OCR', 'Real-time Processing']
      }
    ],
    benefits: [
      { title: 'True Autonomous Execution', description: 'Evolve from passive analytics to active AI. Our agents independently solve problems, trigger workflows, and execute tasks without human bottlenecking.' },
      { title: 'Rapid, Measurable ROI', description: 'We focus strictly on highly targeted, outcome-driven AI deployments designed to create immediate, measurable impact on your operational bottom line.' },
      { title: 'Uncompromising Security & Privacy', description: 'We utilize enterprise-grade, privately hosted LLM deployments and stringent data masking to ensure your proprietary information never leaves your perimeter.' },
      { title: 'Seamless Legacy Integration', description: 'Our AI solutions are architected to cleanly integrate with your existing ERPs, CRMs, and databases, enhancing them rather than replacing them.' },
      { title: 'Continuous Model Learning', description: 'We implement robust feedback loops ensuring your AI models continuously learn, adapt, and improve their accuracy over time based on real-world outcomes.' },
      { title: 'Ethical & Explainable AI', description: 'We build transparent AI frameworks where decision-making processes can be audited, ensuring compliance with global data ethics standards.' }
    ]
  },
  {
    id: 'cyber-security',
    sidebarTitle: 'Cyber Security Services',
    icon: ShieldCheck,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    title: 'Enterprise Cyber Security Managed Services',
    subtitle: 'Protect. Detect. Respond. Secure Your Digital World.',
    description: "The modern threat landscape is relentless, and traditional perimeter defenses are no longer sufficient. At 1TecHub, we provide end-to-end cybersecurity services and deploy enterprise-grade security products designed to forge absolute digital resilience. We combine next-generation zero-trust technologies, global threat intelligence, and certified cybersecurity expertise to holistically protect your data, infrastructure, applications, cloud, and users. Our philosophy is uncompromising: Zero Breach. Zero Compromise. Maximum Protection.",
    portfolio: [
      {
        title: '24/7 SOC & Managed Detection (MDR)',
        description: 'Continuous, real-time threat detection, dark web monitoring, and AI-powered automated response protocols to neutralize active threats instantaneously.',
        tags: ['SIEM / SOAR', 'Incident Handling', 'Threat Hunting', 'Ransomware Isolation']
      },
      {
        title: 'Vulnerability Assessment & Pen Testing',
        description: 'Rigorous, proactive identification of attack surfaces and critical vulnerabilities across your web, mobile, API, and deep network environments.',
        tags: ['Red Teaming', 'Ethical Hacking', 'Risk Scoring', 'Application Security']
      },
      {
        title: 'Cloud & Network Security',
        description: 'Comprehensive safeguarding of multi-cloud workloads, deep packet inspection protocols, and flawless implementation of Zero Trust Network Access.',
        tags: ['CSPM / CWPP', 'Next-Gen Firewalls', 'Zero Trust (ZTNA)', 'Kubernetes Security']
      },
      {
        title: 'Identity & Endpoint Protection',
        description: 'Absolute control of privileged access, enforcement of passwordless authentication, and total device protection utilizing AI-driven XDR platforms.',
        tags: ['SSO & MFA', 'Privilege Vaulting (PAM)', 'EDR/XDR', 'Data Loss Prevention']
      },
      {
        title: 'Governance, Risk & Compliance (GRC)',
        description: 'Ensure you remain completely compliant with global data standards through meticulous internal security audits, risk assessments, and policy creation.',
        tags: ['ISO 27001', 'GDPR / HIPAA', 'Disaster Recovery', 'Security Awareness Training']
      }
    ],
    benefits: [
      { title: 'Elite Certified Security Experts', description: 'Your defense is backed directly by industry-leading CISSP, CEH, OSCP, CISM, and ISO 27001 Lead Auditors dedicated entirely to your security.' },
      { title: 'Security-First Zero Trust Architecture', description: 'We build your defenses fundamentally on Zero Trust principles, continuous verification, AI-driven anomaly detection, and layered protective strategies.' },
      { title: 'Completely Vendor-Agnostic Approach', description: 'We independently evaluate, recommend, and deploy the absolute best technology stack for your specific needs, completely untethered from single-vendor bias.' },
      { title: 'Enterprise & Regulatory Focus', description: 'We utilize proven, battle-tested deployment strategies specifically designed for highly regulated sectors such as BFSI, healthcare, and government agencies.' },
      { title: '24/7 Rapid Global Support', description: 'Our always-available, rapid-response monitoring teams span across the UAE, GCC, Africa, India, and Europe, ensuring you are never unprotected.' },
      { title: 'Guaranteed Business Continuity', description: 'We ensure your operations remain resilient and entirely breach-proof with automated immutable backups and rapid disaster recovery protocols.' }
    ]
  },
  {
    id: 'web-app-modernization',
    sidebarTitle: 'Web & App Modernization',
    icon: TabletSmartphone,
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    title: 'Next-Gen Web & App Modernization',
    subtitle: 'Future-Ready. Always-Modern. Enterprise-Scale.',
    description: "Technical debt is the silent killer of enterprise agility. At 1TecHub, we comprehensively modernise your digital ecosystem by implementing the latest technologies, microservice architectures, and frictionless experience frameworks. We meticulously upgrade legacy systems, completely transform outdated interfaces, and robustly rebuild your digital presence using cloud-native, AI-driven, secure, and infinitely scalable solutions. We don't just refresh your applications—we fundamentally future-proof them for blistering performance and bulletproof security.",
    portfolio: [
      {
        title: 'Legacy System Re-Engineering',
        description: 'We safely dismantle slow, outdated, monolithic codebases and strategically transform them into cloud-powered, modern, highly scalable microservice platforms.',
        tags: ['Microservices', 'API-First', 'Node / Python / Go', 'DB Modernization']
      },
      {
        title: 'Full UI/UX Redesign & AI Revamp',
        description: 'Crafting premium, incredibly intuitive user interfaces that are dramatically enhanced with AI-driven personalization, smart search, and predictive content.',
        tags: ['Motion UI', 'Chatbot Integration', 'ADA / WCAG', 'NLP Search']
      },
      {
        title: 'Mobile App Upgrade & Rebuild',
        description: 'Delivering unparalleled next-gen mobile experiences utilizing flawless native development or high-performance cross-platform frameworks.',
        tags: ['iOS & Android', 'Flutter / React Native', 'Real-Time Sync', 'Offline Mode']
      },
      {
        title: 'Cloud-Native Infrastructure',
        description: 'Seamlessly migrating outdated, expensive physical servers to future-ready, serverless cloud architectures with guaranteed high availability and auto-scaling.',
        tags: ['AWS / Azure / GCP', 'Docker & K8s', 'Serverless', 'CI/CD Automation']
      },
      {
        title: 'API & Integration Modernization',
        description: 'Ensuring all your internal systems talk, scale, and automate seamlessly across your entire enterprise ecosystem through robust API gateways.',
        tags: ['REST & GraphQL', 'ERP / CRM Sync', 'RPA Automation', 'Event-Driven']
      },
      {
        title: 'High-Performance & Security Tuning',
        description: 'Implementing future-ready security protection and rigorous speed optimization to ensure your mission-critical digital systems never falter under load.',
        tags: ['Zero-Trust', 'Core Web Vitals', 'VAPT', 'CDN Integration']
      }
    ],
    benefits: [
      { title: 'We Build What Tomorrow Needs', description: 'Our modernization frameworks are strictly aligned with the forefront of future tech trends—AI integration, cloud-native hosting, security-first code, and hyper-automation.' },
      { title: 'Zero Disruption Phased Approach', description: 'We meticulously plan and execute your system upgrades in phases, ensuring complete business continuity, data integrity, and absolutely zero unplanned downtime.' },
      { title: 'Proven Enterprise-Grade Expertise', description: 'From global retail and distribution to healthcare, logistics, and elite finance—we possess the deep, proven engineering experience to modernise securely at scale.' },
      { title: 'Drastically Faster Time-to-Value', description: 'We provide accelerated software delivery powered by dedicated agile squads, highly mature DevOps workflows, and transparent, clear milestone mapping.' },
      { title: 'Global Delivery Capability', description: 'Our elite technical engineering teams are readily available across the UAE, GCC, Africa, India, and Europe for seamless on-site, remote, or hybrid engagements.' },
      { title: 'Future-Proof Performance Metrics', description: 'We guarantee the delivery of digital assets that are demonstrably faster, lighter, and more secure—directly driving user growth and enhancing customer interactions.' }
    ]
  },
  {
    id: 'api-integrations',
    sidebarTitle: 'API & Integrations',
    icon: Link2,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
    title: 'API, Integrations & Customizations',
    subtitle: 'Seamless. Intelligent. Unified.',
    description: "Fragmented systems create operational blind spots and data silos. At 1TecHub, we specialize in engineering seamless API ecosystems, developing powerful enterprise system integrations, and crafting fully customized digital solutions that allow your business to operate smarter and exponentially faster. From seamlessly connecting legacy ERPs with modern CRMs, to tying mobile applications into complex cloud architectures, we ensure your entire technology landscape functions as one unified, intelligent, and highly responsive nervous system.",
    portfolio: [
      {
        title: 'Modern API Development',
        description: 'Engineering robust, highly scalable, and impenetrable APIs featuring modern architecture standards, strict token authentication, and microservices design.',
        tags: ['REST & GraphQL', 'Microservices', 'Secure Endpoints', 'Rate Limiting']
      },
      {
        title: 'Enterprise System Integrations',
        description: 'Flawlessly connecting your entire disparate business ecosystem—including heavy ERP, CRM, HRMS, and WMS platforms—into a single, reliable source of truth.',
        tags: ['SAP & Oracle', 'Salesforce / MS Dynamics', 'WMS & POS', 'Payment Gateways']
      },
      {
        title: 'Custom Middleware Development',
        description: 'Building a unified, highly resilient integration layer that securely bridges legacy systems and modern applications utilizing event-driven architecture.',
        tags: ['Kafka / RabbitMQ', 'API Orchestration', 'Event-Driven', 'Data Transformation']
      },
      {
        title: 'Cloud & SaaS Integrations',
        description: 'Executing modern cloud-first integrations utilizing secure API gateways and advanced serverless logic flows to ensure immediate global scalability.',
        tags: ['AWS / Azure / GCP', 'Serverless Functions', 'Cloud-Native', 'SaaS Connectors']
      },
      {
        title: 'Data Integration & RPA Automation',
        description: 'Ensuring clean, validated, real-time data flows across enterprise data lakes, combined with intelligent, cross-platform robotic workflow automation.',
        tags: ['ETL Pipelines', 'UiPath / RPA', 'Data Synchronization', 'BI Dashboards']
      },
      {
        title: 'Custom Feature Enhancements',
        description: 'Strategically extending the lifespan and utility of your current systems with highly tailored modules, custom UI screens, and deeply specific business logic.',
        tags: ['Custom Modules', 'ERP/CRM Add-ons', 'Workflow Logic', 'UI Extensions']
      }
    ],
    benefits: [
      { title: 'Elite Integration Architects', description: 'Your projects are led by heavily certified professionals specializing in enterprise platforms (SAP, Oracle, Salesforce) with profound API and middleware expertise.' },
      { title: 'Modern & Scalable Architecture', description: 'We refuse to build brittle point-to-point connections. We build cloud-native, microservices-based integration hubs that effortlessly and securely grow with your business.' },
      { title: 'Strictly Vendor-Agnostic Approach', description: 'We operate as impartial technologists. We integrate and work with absolutely any platform, legacy tool, or cutting-edge technology that best fits your precise operational needs.' },
      { title: 'Comprehensive End-to-End Services', description: 'We handle the entire lifecycle—from the initial architectural API design to secure deployment, rigorous stress testing, and ongoing 24/7 SLA-driven monitoring.' },
      { title: 'Massive Proven Track Record', description: 'Our architects have successfully architected and integrated over 500 complex enterprise systems across the global retail, healthcare, BFSI, and heavy manufacturing sectors.' },
      { title: 'Rapid Agile Deployment', description: 'Our mature agile integration methodology guarantees a significantly faster time-to-market through continuous iterative development and automated continuous integration.' }
    ]
  },
];