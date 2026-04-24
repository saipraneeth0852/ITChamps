"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { NarrativeBackdrop } from "../components/NarrativeBackdrop";

const trustBadges = [
  "SAP Extended Business Member + VAR",
  "20+ Years of SAP Consulting",
  "30+ Countries in Payroll Delivery",
  "D-U-N-S Registered Organization"
];

const logoStrip = ["ABB", "ONGC Videsh", "Manipal Global", "AT&S"];
const heroTitle = ["Mastering Complexity.", "Driving Agility.", "Beyond ECC."];

const services = [
  {
    tag: "Transformation",
    title: "S/4HANA Migration",
    description:
      "We deliver S/4HANA migrations with rigorous governance and precision architecture, eliminating execution risk for complex enterprise footprints.",
    image: "/system-orbit.svg",
    alt: "S/4HANA migration architecture",
    bullets: [
      "Strategic discovery, fit-gap analysis, and migration roadmapping",
      "Tailored brownfield, greenfield, and selective data transitions",
      "Seamless cutover execution and post-go-live stabilization"
    ],
    highlight: "Controlled data transition and cutover"
  },
  {
    tag: "Support",
    title: "SLA-Driven AMS Support",
    description:
      "Engineered for enterprises demanding stable operations, transparent SLAs, and continuous optimization across their SAP landscape.",
    image: "/process-grid.svg",
    alt: "SAP AMS service framework",
    bullets: [
      "Comprehensive functional and technical SAP landscape support",
      "Rigorous incident, release, and enhancement governance",
      "Seamless AMS transition and continuous system optimization"
    ],
    highlight: "Transparent SLAs and release governance"
  },
  {
    tag: "People Systems",
    title: "SuccessFactors Integration",
    description:
      "Aligning SAP SuccessFactors to your enterprise HR transformation strategy, mitigating integration complexity and defining long-term operating models.",
    image: "/insight-sheet.svg",
    alt: "SuccessFactors HR ecosystem",
    bullets: [
      "Core HR, talent acquisition, and employee lifecycle architecture",
      "Complex hybrid SAP HCM and SuccessFactors integrations",
      "Strategic rollout planning and enterprise change management"
    ],
    highlight: "Unified HR architecture without integration drift"
  },
  {
    tag: "Payroll",
    title: "Global Payroll Operations",
    description:
      "Architecting global payroll solutions for multi-country enterprises requiring absolute compliance, system discipline, and operational reliability.",
    image: "/system-orbit.svg",
    alt: "Global payroll compliance model",
    bullets: [
      "Scalable payroll design and execution across 30+ countries",
      "Deep integration with finance, reporting, and HR workflows",
      "Stringent compliance controls and payroll readiness audits"
    ],
    highlight: "Cross-border compliance and execution"
  }
];

const caseStudies = [
  {
    client: "ABB",
    title: "Standardizing Global Operations for ABB",
    result: "40% increase in operational efficiency",
    description:
      "Deployed standardized process flows and rigorous deployment governance across distributed teams, dramatically improving rollout predictability.",
    image: "/case_abb.png"
  },
  {
    client: "ONGC Videsh",
    title: "Modernizing a Complex Energy Enterprise",
    result: "Unified reporting across global business units",
    description:
      "Engineered a structured enterprise model that eliminated workflow fragmentation across finance, operations, and support networks.",
    image: "/case_ongc.png"
  },
  {
    client: "Manipal Global",
    title: "Scaling HR & Payroll Transformation",
    result: "Flawless cross-system data coordination",
    description:
      "Architected a unified HR structure and robust payroll integration for a multi-entity organization managing highly sensitive employee operations.",
    image: "/case_manipal.png"
  }
];

const urgencyMetrics = [
  { value: "2027", label: "ECC mainstream support deadline" },
  { value: "67%", label: "of enterprises lag in migration readiness" },
  { value: "30+", label: "countries unified in our payroll programs" }
];

const mediaPanels = [
  {
    title: "Transformation Telemetry",
    label: "Live Pipeline",
    text: "Visualize your S/4HANA migration pipeline with real-time operational telemetry and deployment status.",
    image: "/system-orbit.svg",
    alt: "Transformation pipeline dashboard"
  },
  {
    title: "Program Control Matrix",
    label: "Workflow Mesh",
    text: "Track complex sequences, critical dependencies, and executive visibility metrics across your SAP ecosystem.",
    image: "/process-grid.svg",
    alt: "Program control metrics"
  },
  {
    title: "Executive Readiness Brief",
    label: "Data Audit",
    text: "Gain immediate oversight into cutover readiness, system health, and post-go-live stabilization metrics.",
    image: "/insight-sheet.svg",
    alt: "Executive data brief"
  }
];

const heroNarrative = [
  {
    label: "Migration governance",
    text: "Program design, architecture sequencing, and cutover control for enterprise SAP landscapes."
  },
  {
    label: "Operational continuity",
    text: "AMS, payroll, and HR transformation support shaped for systems that cannot afford disruption."
  }
];

const capabilityNotes = [
  {
    title: "Architecture first",
    text: "We start with dependency mapping, risk controls, and rollout sequencing before execution pressure starts driving decisions."
  },
  {
    title: "Cross-functional delivery",
    text: "ERP, finance, HR, payroll, and support operations stay coordinated through one operating model instead of fragmented workstreams."
  },
  {
    title: "Built for executive visibility",
    text: "Program sponsors get a clear view of readiness, constraints, and stabilization priorities across the full SAP estate."
  }
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const textGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const textItem = {
  hidden: { opacity: 0, y: 40, rotateX: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
};

const revealLeft = {
  hidden: { opacity: 0, x: -36, rotateX: -10 },
  visible: { opacity: 1, x: 0, rotateX: 0 }
};

const revealRight = {
  hidden: { opacity: 0, x: 36, rotateX: -10 },
  visible: { opacity: 1, x: 0, rotateX: 0 }
};

const popCard = {
  hidden: { opacity: 0, y: 42, scale: 0.92, rotateX: -16 },
  visible: { opacity: 1, y: 0, scale: 1, rotateX: 0 }
};

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const allowComplexMotion = !prefersReducedMotion && !isMobile;
  const { scrollYProgress } = useScroll();
  const heroPanelY = useTransform(scrollYProgress, [0, 0.25], [0, allowComplexMotion ? -40 : -4]);
  const heroClusterY = useTransform(scrollYProgress, [0, 0.35], [0, allowComplexMotion ? -60 : -6]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 40, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 40, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (allowComplexMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <main className="home-page">
      <NarrativeBackdrop variant="home" />

      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={176} height={56} priority />
        </Link>

        <nav className="topnav" aria-label="Primary">
          <a href="#services">SAP Consulting Services</a>
          <a href="#case-studies">Case Studies</a>
          <Link href="/academy">Academy</Link>
          <a href="#contact">Schedule a Consultation</a>
        </nav>

        <a href="#contact" className="button button--primary button--compact">
          Talk to an SAP Expert
        </a>
      </header>

      <section className="hero shell">
        <motion.div
          className="hero__copy"
          variants={textGroup}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p className="eyebrow" variants={textItem}>
            Certified SAP Enterprise Partner
          </motion.p>
          <motion.h1 className="hero-title" variants={textItem}>
            {heroTitle.map((line, index) => (
              <motion.span
                key={line}
                className="hero-word"
                initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: 0.12 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p className="hero__subtext" variants={textItem}>
            S/4HANA Migration • AMS Support • SuccessFactors • Global Payroll
          </motion.p>
          <motion.p className="lede" variants={textItem}>
            We guide global enterprises through critical S/4HANA migrations, standardize complex payroll architectures,
            and deliver uncompromising SLA-driven support. Precision SAP engineering, designed for scale.
          </motion.p>

          <motion.div className="hero-narrative" variants={textItem}>
            {heroNarrative.map((item) => (
              <div key={item.label} className="hero-narrative__item">
                <span>{item.label}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </motion.div>

          <motion.div className="hero-actions" variants={textItem}>
            <a href="#contact" className="button button--primary">
              Talk to an SAP Expert
            </a>
            <a href="#case-studies" className="button button--ghost">
              Review enterprise proof
            </a>
          </motion.div>

          <motion.div className="trust-badges" aria-label="Trust badges" variants={textItem}>
            {trustBadges.map((badge) => (
              <motion.span key={badge} className="trust-badge" whileHover={{ y: -3 }}>
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <div 
          className="hero__visual" 
          onMouseMove={handleMouseMove} 
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1400 }}
        >
          <motion.div
            className="hero-tech-grid"
            style={{ y: heroClusterY }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <motion.div
              className="system-panel"
              style={{ y: heroPanelY, rotateX, rotateY }}
              whileHover={allowComplexMotion ? { y: -2, scale: 1.01 } : undefined}
            >
              <div className="system-panel__header">
                <span>Enterprise SAP transformation model</span>
                <span className="system-status">ECC to S/4HANA readiness</span>
              </div>

              <div className="system-hero">
                <div>
                  <p className="system-kicker">Program architecture</p>
                  <h2 className="system-title">Structured migration control across core enterprise functions.</h2>
                </div>
                <div className="system-panel__badge">
                  <span>Execution view</span>
                  <strong>4 workstreams</strong>
                </div>
              </div>

              <div className="system-grid">
                <div className="system-grid__module">
                  <strong>ERP Core</strong>
                  <span>S/4HANA migration program</span>
                </div>
                <div className="system-grid__module">
                  <strong>SuccessFactors</strong>
                  <span>HR transformation and integration</span>
                </div>
                <div className="system-grid__module">
                  <strong>Finance</strong>
                  <span>Controls, reporting and governance</span>
                </div>
                <div className="system-grid__module">
                  <strong>Payroll</strong>
                  <span>Global payroll delivery across 30+ countries</span>
                </div>
              </div>

              <div className="system-lines">
                <span />
                <span />
                <span />
              </div>
            </motion.div>

            <div className="hero-visual-card hero-visual-card--orbit">
              <div className="hero-visual-card__meta">
                <span>System topology</span>
                <strong>Connected landscape</strong>
              </div>
              <div className="hero-visual-card__img-wrapper">
                <Image src="/hero_main.png" alt="Enterprise systems illustration" width={320} height={360} priority sizes="(max-width: 767px) 100vw, 33vw" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }} />
              </div>
            </div>

            <div className="hero-visual-card hero-visual-card--process">
              <div className="hero-visual-card__meta">
                <span>Delivery sequence</span>
                <strong>Discover → align → rollout</strong>
              </div>
              <div className="hero-visual-card__img-wrapper">
                <Image src="/hero_process.png" alt="SAP delivery sequence diagram" width={220} height={150} sizes="(max-width: 767px) 100vw, 25vw" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }} />
              </div>
            </div>

            <div className="hero-visual-card hero-visual-card--insight">
              <div className="hero-visual-card__meta">
                <span>Readiness brief</span>
                <strong>Governance, data, stabilization</strong>
              </div>
              <div className="hero-visual-card__img-wrapper">
                <Image src="/hero_insight.png" alt="Migration readiness checklist illustration" width={170} height={210} sizes="(max-width: 767px) 100vw, 25vw" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }} />
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      <motion.section className="trust-strip shell" aria-labelledby="trusted-by-title">
        <motion.div
          className="section-heading section-heading--compact"
          variants={textGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.p className="eyebrow" id="trusted-by-title" variants={textItem}>
            Trusted by enterprise teams across industries
          </motion.p>
          <motion.p variants={textItem}>
            Fortune 500 references, repeat consulting engagements, certified SAP partnership status, and a strong
            delivery track record across manufacturing, energy, professional services, and global HR operations.
          </motion.p>
        </motion.div>
        <div className="logo-strip">
          {logoStrip.map((logo) => (
            <motion.span
              key={logo}
              className="logo-chip"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45 }}
              whileHover={allowComplexMotion ? { y: -4, scale: 1.02 } : undefined}
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="services"
        className="section shell"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="section-heading section-heading--services" variants={textGroup}>
          <div className="section-heading__copy">
            <motion.p className="eyebrow" variants={textItem}>
              Core Capabilities
            </motion.p>
            <motion.h2 variants={textItem}>SAP engineering built for enterprise scale.</motion.h2>
            <motion.p variants={textItem}>
              From navigating legacy brownfield migrations to standardizing HR systems across 30+ borders,
              we deliver technical precision that mitigates risk.
            </motion.p>
            <motion.div className="capability-notes" variants={textItem}>
              {capabilityNotes.map((item) => (
                <article key={item.title} className="capability-note">
                  <span>{item.title}</span>
                  <p>{item.text}</p>
                </article>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="services-overview"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="services-overview__panel">
              <div className="services-overview__header">
                <span>Capability mesh</span>
                <strong>4 enterprise towers</strong>
              </div>
              <p className="services-overview__intro">
                A structured SAP service architecture spanning migration, support, people systems, and payroll delivery.
              </p>
              <div className="services-overview__stats">
                <div>
                  <span>Migration</span>
                  <strong>ECC to S/4</strong>
                </div>
                <div>
                  <span>Support</span>
                  <strong>SLA-led AMS</strong>
                </div>
                <div>
                  <span>People</span>
                  <strong>SuccessFactors</strong>
                </div>
                <div>
                  <span>Payroll</span>
                  <strong>30+ countries</strong>
                </div>
              </div>
            </div>

            <div className="services-overview__card services-overview__card--orbit">
              <div className="services-overview__card-meta">
                <span>Landscape model</span>
                <strong>Connected enterprise landscape</strong>
              </div>
              <Image src="/hero_main.png" alt="Enterprise landscape model" width={400} height={300} className="card-image" />
            </div>

            <div className="services-overview__card services-overview__card--process">
              <div className="services-overview__card-meta">
                <span>Delivery sequence</span>
                <strong>Discover, align, rollout</strong>
              </div>
              <Image src="/hero_cloud.png" alt="Delivery sequence visualization" width={400} height={300} className="card-image" />
            </div>

            <div className="services-overview__card services-overview__card--insight">
              <div className="services-overview__card-meta">
                <span>Readiness brief</span>
                <strong>Controls and stabilization view</strong>
              </div>
              <Image src="/hero_analytics.png" alt="Readiness brief illustration" width={400} height={300} className="card-image" />
            </div>
          </motion.div>
        </motion.div>

        <div className="service-grid">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="service-card"
              variants={popCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={allowComplexMotion ? { y: -8, scale: 1.01 } : undefined}
            >
              <div className="service-card__content-wrapper">
                <div className="service-card__header-col">
                  <motion.div
                    className="service-card__visual"
                    animate={allowComplexMotion ? { rotateZ: [0, 0.8, 0] } : undefined}
                    transition={allowComplexMotion ? { duration: 9 + index, repeat: Infinity, ease: "easeInOut" } : undefined}
                  >
                    <Image src={service.image} alt={service.alt} width={140} height={140} />
                  </motion.div>
                  <div className="service-card__meta">
                    <span className="service-chip">{service.tag}</span>
                    <span className="service-highlight">{service.highlight}</span>
                  </div>
                </div>

                <div className="service-card__text-col">
                  <motion.h3 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    {service.title}
                  </motion.h3>
                  <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    {service.description}
                  </motion.p>
                  <ul className="service-list">
                    {service.bullets.map((item) => (
                      <li key={item}>
                        <svg className="service-list-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.a href="#contact" className="card-link" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    Discuss this service
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="case-studies"
        className="section shell"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="section-heading" variants={textGroup}>
          <motion.p className="eyebrow" variants={textItem}>
            Proven Outcomes
          </motion.p>
          <motion.h2 variants={textItem}>Delivering operational resilience for industry leaders.</motion.h2>
          <motion.p variants={textItem}>
            Enterprise buyers demand visible proof. Explore how we've engineered solutions for
            manufacturing, energy, and global education leaders.
          </motion.p>
        </motion.div>

        <div className="case-grid">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              className="case-card"
              variants={index % 2 === 0 ? revealLeft : revealRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={allowComplexMotion ? { y: -6, scale: 1.02 } : undefined}
            >
              <div className="case-card__visual">
                <Image src={study.image} alt={`${study.client} case study`} width={400} height={200} sizes="(max-width: 900px) 50vw, 33vw" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '12px' }} />
              </div>
              <div className="case-card__meta">
                <span>{study.client}</span>
                <span className="case-card__result">{study.result}</span>
              </div>
              <h3>{study.title}</h3>
              <p>{study.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section shell media-lab"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={reveal}
      >
        <motion.div className="section-heading" variants={textGroup}>
          <motion.p className="eyebrow" variants={textItem}>
            Operational Telemetry
          </motion.p>
          <motion.h2 variants={textItem}>Real-time visibility into your SAP transformation ecosystem.</motion.h2>
          <motion.p variants={textItem}>
            Visualize your integration pipelines, track critical migration dependencies, and gain
            executive oversight across complex, multi-layered SAP deployments.
          </motion.p>
        </motion.div>

        <div className="media-lab__grid">
          {mediaPanels.map((panel, index) => (
            <motion.article
              key={panel.title}
              className="media-panel"
              variants={popCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={allowComplexMotion ? { y: -6, scale: 1.02 } : undefined}
            >
              <div className="media-panel__screen">
                <span className="media-panel__label">{panel.label}</span>
                <div className="media-panel__image media-panel__image--float">
                  <Image src={panel.image} alt={panel.alt} width={320} height={220} />
                </div>
                <div className="media-panel__hud">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <h3>{panel.title}</h3>
              <p>{panel.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section shell section--split"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={reveal}
      >
        <motion.div className="section-heading" variants={textGroup}>
          <motion.p className="eyebrow" variants={textItem}>
            The 2027 Horizon
          </motion.p>
          <motion.h2 variants={textItem}>
            The ECC support deadline is closing in. Delaying your migration strategy amplifies costs and operational risk.
          </motion.h2>
          <motion.p variants={textItem}>
            Enterprises postponing their S/4HANA transition are forced to compress critical architecture and
            cutover planning into shrinking windows. Partner with ITChamps to execute your migration with
            structured governance and zero disruption.
          </motion.p>
        </motion.div>

        <motion.div className="urgency-panel" variants={textItem}>
          {urgencyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="urgency-stat"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={allowComplexMotion ? { y: -6, scale: 1.02 } : undefined}
            >
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section id="insights" className="section shell">
        <div className="lead-magnet holo-panel">
          <motion.div className="lead-magnet__copy" variants={textGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
            <motion.p className="eyebrow" variants={textItem}>
              Executive resource
            </motion.p>
            <motion.h2 variants={textItem}>SAP S/4HANA Migration Readiness Framework</motion.h2>
            <motion.p variants={textItem}>
              An executive planning resource for IT leaders evaluating scope, program governance, 
              data dependencies, and risk mitigation strategies in S/4HANA migration programs.
            </motion.p>
          </motion.div>

          <motion.div
            className="lead-magnet__visual"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="floating-image floating-image--sheet"
              animate={allowComplexMotion ? { y: [0, -6, 0] } : undefined}
              transition={allowComplexMotion ? { duration: 12, repeat: Infinity, ease: "easeInOut" } : undefined}
            >
              <Image src="/insight-sheet.svg" alt="Readiness checklist preview" width={240} height={290} />
            </motion.div>
          </motion.div>

          <form className="lead-form">
            <label className="sr-only" htmlFor="work-email">
              Work email
            </label>
            <input id="work-email" name="work-email" type="email" placeholder="Work email" />
            <button type="submit" className="button button--primary">
              Get the Checklist
            </button>
          </form>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="section shell section--last"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={reveal}
      >
        <motion.div className="final-cta" variants={textGroup}>
          <motion.p className="eyebrow" variants={textItem}>
            Speak with delivery leadership
          </motion.p>
          <motion.h2 variants={textItem}>Ready to engineer your transformation?</motion.h2>
          <motion.p variants={textItem}>
            Whether you are evaluating a greenfield S/4HANA rollout or seeking reliable global payroll governance,
            our delivery leadership is ready to align with your enterprise objectives.
          </motion.p>
          <motion.div className="hero-actions" variants={textItem}>
            <a href="mailto:info@itchamps.com" className="button button--primary">
              Schedule a Consultation
            </a>
            <Link href="/academy" className="button button--ghost">
              Visit ITChamps Academy
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      <footer className="footer-section">
        <div className="shell">
          <div className="footer-section__top">
            <div className="footer-section__brand">
              <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={168} height={54} className="footer-logo" />
              <p>
                SAP consulting services, implementation, support, SuccessFactors consulting, and global payroll solutions
                for enterprise organizations.
              </p>
            </div>
            <div className="footer-section__links">
              <div>
                <h3>Consulting</h3>
                <a href="#services">S/4HANA Migration Services</a>
                <a href="#services">SAP AMS Services India</a>
                <a href="#services">SAP SuccessFactors Consulting</a>
                <a href="#services">SAP Global Payroll Solutions</a>
              </div>
              <div>
                <h3>Company</h3>
                <a href="#case-studies">Case Studies</a>
                <Link href="/academy">ITChamps Academy</Link>
                <a href="https://itchamps.com/company/" target="_blank" rel="noreferrer">
                  Company Details
                </a>
              </div>
              <div>
                <h3>Connect</h3>
                <a href="mailto:info@itchamps.com">info@itchamps.com</a>
                <a href="tel:+919342122665">+91 93421 22665</a>
                <span>Mysuru • Bengaluru • London</span>
              </div>
            </div>
          </div>
          <div className="footer-section__bottom">
            <p>© {new Date().getFullYear()} ITChamps Software. All rights reserved.</p>
            <div className="footer-section__legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
