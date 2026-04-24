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
const heroTitle = ["S/4HANA Migration", "Services for Enterprises", "Beyond ECC"];

const services = [
  {
    tag: "Transformation",
    title: "S/4HANA Migration Services",
    description:
      "ITChamps delivers S/4HANA migration services for enterprises planning SAP ECC to S/4HANA migration with stronger governance and lower execution risk.",
    image: "/system-orbit.svg",
    alt: "S/4HANA migration service illustration",
    bullets: [
      "Discovery, fit-gap, migration roadmap and architecture planning",
      "Brownfield, greenfield and selective data transition approaches",
      "Cutover planning, testing strategy and post-go-live stabilization"
    ],
    highlight: "Roadmap, data transition, and cutover control"
  },
  {
    tag: "Support",
    title: "SAP AMS Services India",
    description:
      "SAP Application Maintenance and Support built for enterprises that need stable operations, clear SLAs, and continuous improvement after implementation.",
    image: "/process-grid.svg",
    alt: "SAP AMS service illustration",
    bullets: [
      "Functional and technical SAP support services",
      "Incident, enhancement, release and service governance",
      "AMS transition, steady-state support and optimization"
    ],
    highlight: "SLA-led support with release governance"
  },
  {
    tag: "People Systems",
    title: "SAP SuccessFactors Consulting",
    description:
      "SAP SuccessFactors consulting aligned to enterprise HR transformation, integration complexity, and long-term operating model design.",
    image: "/insight-sheet.svg",
    alt: "SuccessFactors consulting illustration",
    bullets: [
      "Core HR, talent, onboarding and employee lifecycle programs",
      "Hybrid SAP HCM and SuccessFactors integration support",
      "Rollout planning, adoption and change management"
    ],
    highlight: "HR transformation without integration drift"
  },
  {
    tag: "Payroll",
    title: "Global Payroll Solutions",
    description:
      "SAP global payroll solutions for multi-country enterprises that need compliance, integration discipline, and reliable operational delivery.",
    image: "/system-orbit.svg",
    alt: "Global payroll solution illustration",
    bullets: [
      "Payroll design and execution support across 30+ countries",
      "Integration with HR, finance and reporting processes",
      "Compliance controls, governance and payroll operating readiness"
    ],
    highlight: "Cross-country control, readiness, and execution"
  }
];

const caseStudies = [
  {
    client: "ABB",
    title: "Global SAP rollout for ABB",
    result: "40% operational efficiency improvement",
    description:
      "Standardized process flows and deployment governance across distributed teams, improving rollout predictability and post-go-live support readiness.",
    image: "/case_abb.png"
  },
  {
    client: "ONGC Videsh",
    title: "Enterprise modernization for a complex energy operation",
    result: "Unified reporting and stronger control across business units",
    description:
      "Aligned regional requirements to a more structured enterprise model, reducing fragmentation across finance, operations, and support workflows.",
    image: "/case_ongc.png"
  },
  {
    client: "Manipal Global",
    title: "HR and payroll transformation at group scale",
    result: "Greater payroll consistency and cleaner cross-system coordination",
    description:
      "Improved HR process structure and payroll integration for a multi-entity organization managing sensitive employee operations.",
    image: "/case_manipal.png"
  }
];

const urgencyMetrics = [
  { value: "2027", label: "ECC mainstream maintenance deadline" },
  { value: "67%", label: "of companies are still behind on migration readiness" },
  { value: "30+", label: "countries supported in payroll delivery programs" }
];

const mediaPanels = [
  {
    title: "Transformation pulse",
    label: "Live signal",
    text: "A motion-led visual panel that reads like a futuristic operations stream instead of a static brochure block.",
    image: "/system-orbit.svg",
    alt: "Transformation pulse illustration"
  },
  {
    title: "Program control wall",
    label: "Workflow mesh",
    text: "Sequencing, dependencies, and executive visibility shown as an animated media surface.",
    image: "/process-grid.svg",
    alt: "Workflow mesh illustration"
  },
  {
    title: "Executive insight feed",
    label: "Data brief",
    text: "A card that feels closer to a product preview or dashboard tile than a plain marketing section.",
    image: "/insight-sheet.svg",
    alt: "Executive data brief illustration"
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
  const trustY = useTransform(scrollYProgress, [0.05, 0.25], [allowComplexMotion ? 40 : 0, allowComplexMotion ? -30 : 0]);
  const trustRotateX = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [allowComplexMotion ? 4 : 0, 0, allowComplexMotion ? -2 : 0]);
  
  const servicesY = useTransform(scrollYProgress, [0.15, 0.5], [allowComplexMotion ? 70 : 0, allowComplexMotion ? -50 : 0]);
  const servicesRotateX = useTransform(scrollYProgress, [0.15, 0.32, 0.5], [allowComplexMotion ? 6 : 0, 0, allowComplexMotion ? -4 : 0]);
  
  const casesY = useTransform(scrollYProgress, [0.25, 0.7], [allowComplexMotion ? 60 : 0, allowComplexMotion ? -40 : 0]);
  const casesRotateX = useTransform(scrollYProgress, [0.25, 0.45, 0.7], [allowComplexMotion ? 5 : 0, 0, allowComplexMotion ? -3 : 0]);
  
  const urgencyY = useTransform(scrollYProgress, [0.35, 0.8], [allowComplexMotion ? 65 : 0, allowComplexMotion ? -45 : 0]);
  const urgencyRotateX = useTransform(scrollYProgress, [0.35, 0.55, 0.8], [allowComplexMotion ? 6 : 0, 0, allowComplexMotion ? -4 : 0]);
  
  const insightY = useTransform(scrollYProgress, [0.5, 1], [allowComplexMotion ? 30 : 0, allowComplexMotion ? -15 : 0]);

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
            SAP implementation partner India
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
            SAP consulting services • SAP AMS services India • SAP SuccessFactors consulting • SAP global payroll solutions
          </motion.p>
          <motion.p className="lede" variants={textItem}>
            ITChamps Software is a certified SAP partner helping enterprises execute SAP ECC to S/4HANA migration,
            implementation, support, SuccessFactors programs, and multi-country payroll transformation with the
            discipline expected from high-value enterprise delivery teams.
          </motion.p>

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

            <motion.div
              className="hero-visual-card hero-visual-card--orbit"
              animate={allowComplexMotion ? { y: [0, -8, 0] } : undefined}
              transition={allowComplexMotion ? { duration: 12, repeat: Infinity, ease: "easeInOut" } : undefined}
            >
              <div className="hero-visual-card__meta">
                <span>System topology</span>
                <strong>Connected landscape</strong>
              </div>
              <div className="hero-visual-card__img-wrapper">
                <Image src="/hero_main.png" alt="Enterprise systems illustration" width={320} height={360} priority style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }} />
              </div>
            </motion.div>

            <motion.div
              className="hero-visual-card hero-visual-card--process"
              animate={allowComplexMotion ? { y: [0, 7, 0] } : undefined}
              transition={allowComplexMotion ? { duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.2 } : undefined}
            >
              <div className="hero-visual-card__meta">
                <span>Delivery sequence</span>
                <strong>Discover → align → rollout</strong>
              </div>
              <div className="hero-visual-card__img-wrapper">
                <Image src="/hero_process.png" alt="SAP delivery sequence diagram" width={220} height={150} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }} />
              </div>
            </motion.div>

            <motion.div
              className="hero-visual-card hero-visual-card--insight"
              animate={allowComplexMotion ? { y: [0, -6, 0] } : undefined}
              transition={allowComplexMotion ? { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 } : undefined}
            >
              <div className="hero-visual-card__meta">
                <span>Readiness brief</span>
                <strong>Governance, data, stabilization</strong>
              </div>
              <div className="hero-visual-card__img-wrapper">
                <Image src="/hero_insight.png" alt="Migration readiness checklist illustration" width={170} height={210} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }} />
              </div>
            </motion.div>

            <motion.div
              className="hero-visual-card hero-visual-card--cloud"
              animate={allowComplexMotion ? { y: [0, 9, 0] } : undefined}
              transition={allowComplexMotion ? { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2.1 } : undefined}
            >
              <div className="hero-visual-card__meta">
                <span>Cloud Infrastructure</span>
                <strong>Scalable SAP Core</strong>
              </div>
              <div className="hero-visual-card__img-wrapper">
                <Image src="/hero_cloud.png" alt="Cloud infrastructure nodes" width={200} height={180} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }} />
              </div>
            </motion.div>

            <motion.div
              className="hero-visual-card hero-visual-card--analytics"
              animate={allowComplexMotion ? { y: [0, -5, 0] } : undefined}
              transition={allowComplexMotion ? { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.8 } : undefined}
            >
              <div className="hero-visual-card__meta">
                <span>Real-time Insights</span>
                <strong>Enterprise Analytics</strong>
              </div>
              <div className="hero-visual-card__img-wrapper">
                <Image src="/hero_analytics.png" alt="Data analytics dashboard" width={240} height={160} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section className="trust-strip shell" aria-labelledby="trusted-by-title" style={{ y: trustY, rotateX: trustRotateX }}>
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
        style={{ y: servicesY, rotateX: servicesRotateX }}
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="section-heading section-heading--services" variants={textGroup}>
          <div className="section-heading__copy">
            <motion.p className="eyebrow" variants={textItem}>
              Core services
            </motion.p>
            <motion.h2 variants={textItem}>SAP consulting services structured around enterprise transformation outcomes.</motion.h2>
            <motion.p variants={textItem}>
              The offer is intentionally focused for B2B buyers: S/4HANA migration services, SAP AMS services India,
              SAP SuccessFactors consulting, and SAP global payroll solutions.
            </motion.p>
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
        style={{ y: casesY, rotateX: casesRotateX }}
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="section-heading" variants={textGroup}>
          <motion.p className="eyebrow" variants={textItem}>
            Case studies
          </motion.p>
          <motion.h2 variants={textItem}>Proof that ITChamps can handle complex SAP implementation and support environments.</motion.h2>
          <motion.p variants={textItem}>
            Enterprise buyers need visible delivery proof. These examples show the kind of consulting outcomes ITChamps
            is built to support across rollout, modernization, support, HR, and payroll programs.
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
              whileHover={allowComplexMotion ? { y: -10, rotateX: -6, rotateY: index % 2 === 0 ? 5 : -5, scale: 1.02 } : undefined}
            >
              <div className="case-card__visual">
                <Image src={study.image} alt={`${study.client} case study`} width={400} height={200} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '12px' }} />
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
            Futuristic media layer
          </motion.p>
          <motion.h2 variants={textItem}>Media-style panels that feel closer to a product environment than a static website.</motion.h2>
          <motion.p variants={textItem}>
            Since the project does not currently ship real video assets, this section uses animated image panels,
            signal overlays, and motion-driven framing to create the same futuristic effect.
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
              whileHover={allowComplexMotion ? { y: -12, rotateX: -7, rotateY: index % 2 === 0 ? 6 : -6, scale: 1.02 } : undefined}
            >
              <div className="media-panel__screen">
                <span className="media-panel__label">{panel.label}</span>
                <motion.div
                  className="media-panel__image"
                  animate={allowComplexMotion ? { y: [0, -8, 0], scale: [1, 1.02, 1] } : undefined}
                  transition={allowComplexMotion ? { duration: 10 + index, repeat: Infinity, ease: "easeInOut" } : undefined}
                >
                  <Image src={panel.image} alt={panel.alt} width={320} height={220} />
                </motion.div>
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
        style={{ y: urgencyY, rotateX: urgencyRotateX }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={reveal}
      >
        <motion.div className="section-heading" variants={textGroup}>
          <motion.p className="eyebrow" variants={textItem}>
            ECC 2027 urgency
          </motion.p>
          <motion.h2 variants={textItem}>
            SAP ECC 2027 is approaching. Delayed migration planning increases cost, delivery pressure, and business risk.
          </motion.h2>
          <motion.p variants={textItem}>
            Enterprises that postpone SAP ECC to S/4HANA migration often compress assessment, architecture, and
            cutover planning into shorter windows. ITChamps positions itself as the SAP implementation partner India
            teams can use to move with more structure and less disruption.
          </motion.p>
        </motion.div>

        <motion.div className="urgency-panel" variants={textItem}>
          {urgencyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="urgency-stat"
              initial={{ opacity: 0, x: 20, rotateX: -18, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={allowComplexMotion ? { y: -8, rotateX: -5, scale: 1.02 } : undefined}
            >
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section id="insights" className="section shell" style={{ y: insightY }}>
        <div className="lead-magnet holo-panel">
          <motion.div className="lead-magnet__copy" variants={textGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
            <motion.p className="eyebrow" variants={textItem}>
              Executive resource
            </motion.p>
            <motion.h2 variants={textItem}>SAP S/4HANA Migration Readiness Checklist</motion.h2>
            <motion.p variants={textItem}>
              A concise planning resource for CIOs, IT heads, and procurement teams evaluating scope, program
              governance, data dependencies, support readiness, and risk in SAP ECC to S/4HANA migration programs.
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
          <motion.h2 variants={textItem}>Schedule a Consultation with an SAP Expert</motion.h2>
          <motion.p variants={textItem}>
            If you need a credible SAP consulting partner for S/4HANA migration services, SAP AMS services, SAP
            SuccessFactors consulting, or SAP global payroll solutions, ITChamps is structured to engage at enterprise
            buying level.
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
