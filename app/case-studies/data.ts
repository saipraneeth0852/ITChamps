export interface CaseStudyMetric {
  value: string;
  label: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  abbr: string;
  sector: string;
  accentHex: string;
  title: string;
  subtitle: string;
  heroImage: string;
  listImage: string;
  result: string;
  resultMetric: string;
  summary: string;
  challenge: {
    heading: string;
    context: string;
    points: string[];
  };
  solution: {
    heading: string;
    description: string;
    steps: { num: string; title: string; desc: string }[];
  };
  results: {
    metrics: CaseStudyMetric[];
    highlights: string[];
  };
  services: string[];
  technologies: string[];
  duration: string;
  teamSize: string;
  countries?: number;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "abb-global-standardization",
    client: "ABB",
    abbr: "ABB",
    sector: "Industrial Automation",
    accentHex: "#CC0000",
    title: "Standardizing Global SAP Operations for ABB",
    subtitle: "Enterprise-wide SAP template rollout across 50+ countries — zero disruption, one operating model.",
    heroImage: "/case_abb.png",
    listImage: "/case_abb.png",
    result: "40% increase in operational efficiency",
    resultMetric: "40%",
    summary:
      "ABB needed a single, governable SAP operating model across its globally distributed industrial divisions. We designed and deployed a standardized SAP template — with controlled local variants — using a phased wave rollout that kept operations running without interruption.",
    challenge: {
      heading: "Fragmented processes across a global industrial enterprise",
      context:
        "ABB's distributed SAP landscape had evolved over two decades into an unmanageable patchwork of configurations. Each country operated on its own variant with no standardized processes, making global reporting impossible and compliance unpredictable.",
      points: [
        "50+ country operations with inconsistent ERP configurations",
        "No single version of operational or financial truth",
        "Manual reporting consuming hundreds of person-hours weekly",
        "Shadow IT systems filling gaps left by fragmented SAP",
        "Compliance exposure across multiple regulatory jurisdictions",
        "Rollout risk too high for conventional big-bang deployment",
      ],
    },
    solution: {
      heading: "Single SAP template with wave-based global rollout",
      description:
        "We built a single global SAP process template with controlled local variants for statutory compliance. A structured wave methodology ensured each rollout was validated before the next began — keeping operational risk near zero throughout the program.",
      steps: [
        { num: "01", title: "Process Discovery", desc: "Baseline mapping across 50+ country configurations to identify core vs. local process variants" },
        { num: "02", title: "Template Design", desc: "Single global SAP template with documented local variant framework and governance rules" },
        { num: "03", title: "Wave Planning", desc: "Risk-ordered wave sequence with readiness gates, rollback procedures and cutover runbooks" },
        { num: "04", title: "Rollout Execution", desc: "Country-by-country wave deployment with embedded hypercare teams and SLA monitoring" },
        { num: "05", title: "Governance Model", desc: "Central process ownership model with regional leads — preventing template drift post-rollout" },
      ],
    },
    results: {
      metrics: [
        { value: "40%", label: "Efficiency gain", description: "Operational efficiency improvement across core processes" },
        { value: "50+", label: "Countries unified", description: "Global operations standardized on a single SAP template" },
        { value: "60%", label: "Reporting time saved", description: "Reduction in manual effort for monthly and annual reporting" },
        { value: "100%", label: "On-time go-lives", description: "Every wave delivered on schedule without rollback" },
      ],
      highlights: [
        "Zero production outages during any rollout wave",
        "Standardized chart of accounts across all 50+ entities",
        "Executive real-time operational visibility across all divisions",
        "Year-end financial close cycle reduced by 4 days",
        "Template reused for 3 subsequent acquisitions",
      ],
    },
    services: ["S/4HANA Migration", "SAP Application Maintenance", "SAP Audit & Value Discovery"],
    technologies: ["SAP S/4HANA", "SAP BTP", "SAP Analytics Cloud", "SAP PI/PO"],
    duration: "18 months",
    teamSize: "24 consultants",
    countries: 50,
  },
  {
    slug: "ongc-enterprise-modernization",
    client: "ONGC Videsh",
    abbr: "OVL",
    sector: "Energy & Resources",
    accentHex: "#1B6B3A",
    title: "Modernizing a Complex Energy Enterprise",
    subtitle: "Unified financial and operational reporting across ONGC Videsh's global upstream oil & gas network.",
    heroImage: "/case_ongc.png",
    listImage: "/case_ongc.png",
    result: "Unified reporting across global business units",
    resultMetric: "15+",
    summary:
      "ONGC Videsh's upstream operations across 15 subsidiaries ran on disconnected systems — making consolidated financial and operational reporting impossible. We architected a unified SAP enterprise model that connected every entity into a single, auditable source of truth.",
    challenge: {
      heading: "Siloed systems across a complex upstream energy operation",
      context:
        "ONGC Videsh operates in politically and operationally complex upstream environments across the globe. Each subsidiary had its own reporting stack, making consolidation manual, slow, and error-prone — and regulatory reporting a recurring fire drill.",
      points: [
        "15+ subsidiaries each running disconnected financial systems",
        "Finance, operations, and supply chain on separate platforms",
        "Monthly reporting cycle took 12+ days with manual reconciliation",
        "No real-time view of the group financial position",
        "Regulatory reporting at risk due to data fragmentation",
        "Integration between upstream operational and ERP systems nonexistent",
      ],
    },
    solution: {
      heading: "Integrated SAP enterprise model with unified reporting",
      description:
        "We built a structured SAP enterprise model connecting all ONGC Videsh subsidiaries — a unified FI/CO/MM backbone with an integration layer linking upstream operational systems, feeding a consolidated BW/4HANA reporting platform.",
      steps: [
        { num: "01", title: "Enterprise Blueprint", desc: "Full mapping of 15+ entities, data flows, intercompany transactions and integration points" },
        { num: "02", title: "Core SAP Build", desc: "Unified Finance (FI/CO), Materials Management, and HR across all group entities" },
        { num: "03", title: "Integration Layer", desc: "SAP PI/PO connecting upstream SCADA, production, and drilling operational systems to SAP" },
        { num: "04", title: "Reporting Platform", desc: "Consolidated BW/4HANA deployment with real-time group financial dashboards" },
        { num: "05", title: "Change Management", desc: "Structured adoption program across multi-country finance and operations teams" },
      ],
    },
    results: {
      metrics: [
        { value: "15+", label: "Entities unified", description: "Global subsidiaries on a single integrated platform" },
        { value: "70%", label: "Faster reporting", description: "Reduction in time to produce monthly consolidated reports" },
        { value: "3 days", label: "Month-end close", description: "Reduced from 12 days through process automation" },
        { value: "100%", label: "Data accuracy", description: "Elimination of manual reconciliation errors across entities" },
      ],
      highlights: [
        "Single source of truth for group financial position",
        "Real-time upstream operational dashboards for C-suite",
        "Regulatory compliance maintained across all jurisdictions",
        "Manual reconciliation effort reduced by 90%",
        "Intercompany transaction processing automated end-to-end",
      ],
    },
    services: ["S/4HANA Implementation", "SAP BTP Implementation", "SAP Application Maintenance"],
    technologies: ["SAP S/4HANA", "SAP BW/4HANA", "SAP PI/PO", "SAP Analytics Cloud"],
    duration: "22 months",
    teamSize: "18 consultants",
    countries: 15,
  },
  {
    slug: "manipal-hr-payroll-transformation",
    client: "Manipal Global",
    abbr: "MG",
    sector: "Education & HR Services",
    accentHex: "#003DA5",
    title: "Scaling HR & Payroll Transformation at Manipal",
    subtitle: "Unified SAP HCM platform for 30,000+ employees across 25 institutions — with 99.9% payroll accuracy.",
    heroImage: "/case_manipal.png",
    listImage: "/case_manipal.png",
    result: "99.9% payroll accuracy across 30,000+ employees",
    resultMetric: "99.9%",
    summary:
      "Manipal Global's 30,000+ workforce was managed across 25+ institutions with fragmented HR systems and multiple disconnected payroll engines. We architected a unified SAP HCM and SuccessFactors platform — delivering a single employee record, automated payroll compliance, and full self-service capability.",
    challenge: {
      heading: "Fragmented HR and payroll across a multi-institution education group",
      context:
        "Manipal Global's scale of operations — 25+ institutions, 30,000+ employees, multiple states — had outgrown its patchwork of HR tools. Payroll errors, compliance gaps, and the inability to generate group-wide workforce insights were creating operational and legal risk.",
      points: [
        "30,000+ employees with no unified HR master data",
        "Multiple disconnected payroll systems causing data inconsistencies",
        "Manual employee lifecycle processes with high error rates",
        "No self-service portal for employees or managers",
        "Multi-state statutory compliance tracked in spreadsheets",
        "Inability to generate group-wide workforce analytics",
      ],
    },
    solution: {
      heading: "Unified SAP HCM with SuccessFactors integration",
      description:
        "We built a single SAP HCM platform covering all 25+ Manipal institutions — integrating SuccessFactors for talent management, deploying a full ESS/MSS portal, and automating state-by-state payroll compliance from a single payroll engine.",
      steps: [
        { num: "01", title: "HR Blueprint", desc: "Organisation structure design and employee master data model across all 25+ institutions" },
        { num: "02", title: "Core HCM Build", desc: "SAP HCM payroll, time management, and organisational management deployment" },
        { num: "03", title: "SuccessFactors", desc: "Employee Central and talent acquisition with hybrid SAP HCM integration" },
        { num: "04", title: "ESS/MSS Portal", desc: "Self-service portal rollout for 30,000+ employees and 2,000+ managers" },
        { num: "05", title: "Compliance Engine", desc: "Multi-state payroll compliance automation covering statutory filings and year-end processing" },
      ],
    },
    results: {
      metrics: [
        { value: "30K+", label: "Employees unified", description: "All staff on one HR and payroll platform" },
        { value: "99.9%", label: "Payroll accuracy", description: "Near-zero payroll errors from day one" },
        { value: "80%", label: "HR effort saved", description: "Reduction in manual HR processing workload" },
        { value: "25+", label: "Institutions integrated", description: "All educational entities on a single record" },
      ],
      highlights: [
        "Single employee master data across all 25+ institutions",
        "Automated statutory compliance for every state",
        "Employee self-service adoption reached 85% within 60 days",
        "Zero payroll reprocessing runs in the first 12 months",
        "Year-end processing time reduced from 3 weeks to 4 days",
      ],
    },
    services: ["SuccessFactors Integration", "Global Payroll Operations", "ESS & MSS Portals", "SAP Application Maintenance"],
    technologies: ["SAP HCM", "SAP SuccessFactors", "SAP BTP", "iEmpPower", "PayCompute"],
    duration: "16 months",
    teamSize: "14 consultants",
  },
];
