import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Play, CheckCircle, ArrowRight, BookOpen, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const services = [
    {
      id: 'policy',
      title: 'Compliance Policy Development',
      icon: '📋',
      description: 'Comprehensive policy drafting and documentation services',
      color: 'from-purple-500 to-purple-600',
      accentColor: 'purple',
      deliverables: [
        'Anti-Money Laundering (AML) & Counter-Terrorist Financing (CTF) policies',
        'Sanctions compliance frameworks and screening procedures',
        'Conflict of Interest policies and disclosure procedures',
        'Code of Conduct and Ethics policies',
        'Anti-Bribery and Anti-Corruption frameworks',
        'Vendor due diligence policies',
        'Whistleblowing and incident reporting procedures',
        'Board governance policies',
        'Policy gap analysis and implementation roadmaps',
        'Compliance with local regulatory requirements',
        'Professional policy documents aligned with international standards'
      ]
    },
    {
      id: 'risk',
      title: 'Risk Management Framework Design',
      icon: '⚠️',
      description: 'End-to-end enterprise risk management solutions',
      color: 'from-cyan-500 to-cyan-600',
      accentColor: 'cyan',
      deliverables: [
        'Risk assessment methodology development',
        'Risk appetite and tolerance framework',
        'Risk register design and implementation',
        'Key Risk Indicators (KRI) development',
        'Risk reporting dashboards and visualizations',
        'Three Lines of Defense model implementation',
        'Customized ERM framework documentation',
        'Risk assessment templates and tools',
        'Training materials for risk owners',
        'Risk governance structure recommendations'
      ]
    },
    {
      id: 'training',
      title: 'Compliance Training & Advisory',
      icon: '🎓',
      description: 'Expert consultation and training services',
      color: 'from-emerald-500 to-emerald-600',
      accentColor: 'emerald',
      deliverables: [
        'Compliance program health checks and assessments',
        'Regulatory interpretation and guidance',
        'AML/CFT transaction monitoring optimization',
        'Sanctions screening process improvement',
        'Compliance culture development workshops',
        'Board and senior management training',
        'Regulatory change impact assessments',
        'Compliance technology selection advisory',
        'Customized training presentations',
        'Workshop facilitation and expert consultation',
        'Advisory reports with actionable recommendations',
        'Ongoing consultation support'
      ]
    },
    {
      id: 'audit',
      title: 'Regulatory Readiness & Audit Support',
      icon: '✓',
      description: 'Preparation and support for regulatory interactions',
      color: 'from-pink-500 to-pink-600',
      accentColor: 'pink',
      deliverables: [
        'Pre-audit readiness assessments',
        'Gap analysis against regulatory requirements',
        'Remediation action plans with timelines',
        'Mock audit exercises and simulations',
        'Regulatory filing and reporting support',
        'Response letter drafting for regulatory inquiries',
        'Compliance program maturity assessments',
        'Audit readiness reports and documentation',
        'Gap remediation roadmaps',
        'Supporting documentation packages',
        'Regulatory communication drafting'
      ]
    },
    {
      id: 'presentations',
      title: 'Custom Compliance Presentations',
      icon: '📊',
      description: 'Professional HTML-based presentations',
      color: 'from-orange-500 to-orange-600',
      accentColor: 'orange',
      deliverables: [
        'Board reporting dashboards and scorecards',
        'Compliance training presentations',
        'Regulatory submissions and filings',
        'Investor presentations (compliance aspects)',
        'Client-facing compliance credentials',
        'Internal awareness campaigns',
        'Interactive HTML presentations',
        'Branded slide decks with custom design',
        'Data visualization and infographics',
        'Presentation coaching and delivery support'
      ]
    }
  ];

  const whyChoose = [
    {
      title: 'MENA Expertise',
      description: 'Deep understanding of regional regulatory landscapes across Egypt, GCC, and African markets'
    },
    {
      title: 'Practical Implementation',
      description: 'Not just theory - frameworks designed for real-world operations and business growth'
    },
    {
      title: 'Cross-Industry Insights',
      description: 'Experience across financial services, fintech, e-commerce brings diverse perspectives'
    },
    {
      title: 'Efficiency Focus',
      description: 'Compliance solutions that enable business growth, not hinder it'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Free consultation with conflict of interest screening to understand your needs'
    },
    {
      step: 2,
      title: 'Scope Definition',
      description: 'Detailed proposal outlining deliverables, timeline, and investment'
    },
    {
      step: 3,
      title: 'Engagement & Delivery',
      description: 'Implementation of solutions with regular updates and stakeholder engagement'
    },
    {
      step: 4,
      title: 'Follow-up Support',
      description: 'Ongoing support and optimization of implemented frameworks'
    }
  ];

  const caseStudies = [
    {
      title: 'AML/CFT Program Implementation',
      description: 'Building a comprehensive anti-money laundering framework for a regional fintech',
      duration: '8 weeks',
      link: 'https://youtu.be/s4kLWH-lKd8?si=nvCc5uR9AK50ApT1'
    },
    {
      title: 'Risk Framework Transformation',
      description: 'Designing and implementing enterprise risk management for a financial services firm',
      duration: '12 weeks',
      link: 'https://youtu.be/ryeF5JwZYvk?si=HIud3P3Y1NdQGyKj'
    },
    {
      title: 'Compliance Readiness Assessment',
      description: 'Regulatory readiness evaluation and remediation roadmap for a tech company',
      duration: '4 weeks',
      link: 'https://youtu.be/b5R_bkt2NT4?si=M2L_ekdPTSwxKrun'
    }
  ];



  const usefulSites = [
    {
      category: 'International Regulatory Bodies',
      sites: [
        { name: 'Financial Action Task Force (FATF)', url: 'https://www.fatf-gafi.org/', description: 'Global standard-setting body for anti-money laundering and counter-terrorist financing' },
        { name: 'United Nations Office on Drugs and Crime (UNODC)', url: 'https://www.unodc.org/', description: 'UN agency providing technical assistance on AML/CFT compliance' },
        { name: 'Financial Crimes Enforcement Network (FinCEN)', url: 'https://www.fincen.gov/', description: 'US bureau combating financial crimes and money laundering' },
        { name: 'Egmont Group of Financial Intelligence Units', url: 'https://www.egmontgroup.org/', description: 'International forum for financial intelligence units' }
      ]
    },
    {
      category: 'European & Regional Authorities',
      sites: [
        { name: 'Authority for Anti-Money Laundering and Countering the Financing of Terrorism (AMLA)', url: 'https://www.amlachecker.eu/', description: 'EU authority for AML/CFT supervision' },
        { name: 'EU Sanctions List', url: 'https://www.consilium.europa.eu/en/policies/sanctions/', description: 'Official EU sanctions and restrictive measures' },
        { name: 'HM Treasury Sanctions', url: 'https://www.gov.uk/government/organisations/hm-treasury', description: 'UK Treasury sanctions and financial restrictions' }
      ]
    },
    {
      category: 'Middle East & Africa',
      sites: [
        { name: 'MLCU Egypt Terror List', url: 'https://www.cbe.org.eg/', description: 'Egyptian Central Bank Money Laundering Combating Unit' },
        { name: 'KWFIU (Kuwait Financial Intelligence Unit)', url: 'https://www.cbk.gov.kw/', description: 'Kuwait Central Bank Financial Intelligence Unit' },
        { name: 'CBUAE (Central Bank of UAE)', url: 'https://www.cbuae.gov.ae/', description: 'UAE Central Bank AML/CFT compliance' }
      ]
    },
    {
      category: 'Sanctions & Screening Databases',
      sites: [
        { name: 'OFAC Sanctions Lists', url: 'https://ofac.treasury.gov/', description: 'US Office of Foreign Assets Control sanctions database' },
        { name: 'LSEG World-Check', url: 'https://www.lseg.com/en/open/world-check', description: 'Comprehensive sanctions and screening database' },
        { name: 'Comply Advantage', url: 'https://complyadvantage.com/', description: 'Real-time AML compliance and sanctions screening' },
        { name: 'Global Sanctions Index (GSI)', url: 'https://www.globalsanctionsindex.com/', description: 'Consolidated global sanctions screening platform' }
      ]
    },
    {
      category: 'Industry Standards & Best Practices',
      sites: [
        { name: 'Wolfsburg Group', url: 'https://www.wolfsberg-group.org/', description: 'Financial services industry AML/CFT best practices' },
        { name: 'Global Initiative Against Transnational Organized Crime', url: 'https://globalinitiative.net/', description: 'Research and policy on organized crime and compliance' }
      ]
    }
  ];

  const faqs = [
    {
      question: 'What industries do you serve?',
      answer: 'I work with organizations across technology, financial services, fintech, e-commerce, professional services, healthcare, and consulting sectors. I do not provide services to companies in food & beverage, FMCG, or agricultural industries.'
    },
    {
      question: 'What is your pricing model?',
      answer: 'Pricing varies based on project scope and complexity. I offer fixed-fee projects for defined deliverables, hourly consulting for advisory services, and retainer arrangements for ongoing support. A complimentary initial consultation is provided to assess your needs and provide a tailored proposal.'
    },
    {
      question: 'How long do typical engagements last?',
      answer: 'Project timelines vary: Policy development (2-4 weeks), Risk framework design (4-8 weeks), Training/workshops (1-2 days), Advisory retainers (3-12 months). Urgent projects can be accommodated with adjusted timelines.'
    },
    {
      question: 'Do you work with startups or only established companies?',
      answer: 'I work with organizations at all stages - from early-stage startups building their first compliance framework to established enterprises optimizing existing programs. Services are tailored to your maturity level and budget.'
    },
    {
      question: 'What sets you apart from other consultants?',
      answer: 'Combination of deep MENA regulatory expertise, practical implementation experience, cross-industry insights, and focus on enabling business growth through compliance. I provide not just frameworks but actionable guidance tailored to your specific context.'
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-lg">
                CA
              </div>
              <span className="font-bold text-xl hidden sm:inline">Compliance AI</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
              <a href="#case-studies" className="hover:text-purple-400 transition-colors">Case Studies</a>
              <a href="#resources" className="hover:text-purple-400 transition-colors">Resources</a>
              <Link href="/infographics" className="hover:text-purple-400 transition-colors">Compliance Infographics</Link>
              <Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
              <a href="https://www.youtube.com/@ComplianceAI" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">YouTube</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pb-4 space-y-2"
              >
                <a href="#services" className="block py-2 hover:text-purple-400 transition-colors">Services</a>
                <a href="#case-studies" className="block py-2 hover:text-purple-400 transition-colors">Case Studies</a>
                <a href="#resources" className="block py-2 hover:text-purple-400 transition-colors">Resources</a>
                <Link href="/infographics" className="block py-2 hover:text-purple-400 transition-colors">Compliance Infographics</Link>
                <Link href="/contact" className="block py-2 hover:text-purple-400 transition-colors">Contact</Link>
                <a href="https://www.youtube.com/@ComplianceAI" target="_blank" rel="noopener noreferrer" className="block py-2 hover:text-purple-400 transition-colors">YouTube</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section with Background Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Video with Looping */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 z-10"></div>
          <iframe
            key="hero-video"
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/lqm1XqA-FjE?autoplay=1&mute=1&loop=1&playlist=lqm1XqA-FjE&controls=0&modestbranding=1&rel=0&showinfo=0"
            frameBorder="0"
            allow="autoplay; muted"
            allowFullScreen
            style={{ pointerEvents: 'none' }}
          ></iframe>
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-20 max-w-4xl mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            Compliance Excellence
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Transform your governance, risk, and compliance frameworks with expert guidance tailored to your business needs
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <a
              href="https://www.youtube.com/@ComplianceAI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Play size={20} /> Watch Videos
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-cyan-400" />
        </motion.div>
      </section>

      {/* About Me Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl blur-2xl opacity-30"></div>
                <img
                  src="/profile_pic.png"
                  alt="Mohamed Emam - GRC Consultant"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  About Me
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  With over 15 years of experience navigating the complex landscape of governance, risk, and compliance across the MENA region, I help organizations transform compliance from a regulatory burden into a strategic advantage.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  My career has spanned financial services, fintech, e-commerce, and professional services sectors, where I've led regional GRC functions, implemented enterprise risk frameworks, and built compliance programs that balance regulatory requirements with business objectives.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  As a member of the Association of Certified Fraud Examiners (ACFE) and holder of international compliance certifications, I bring both theoretical knowledge and practical implementation expertise to every engagement.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700/50">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-400/30"
                >
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">15+</div>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-400/30"
                >
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">15+</div>
                  <p className="text-sm text-gray-400">Regions Served</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-purple-500/10 rounded-xl border border-emerald-400/30"
                >
                  <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">100+</div>
                  <p className="text-sm text-gray-400">Frameworks</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Redesigned with Accenture-inspired layout */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive compliance solutions designed to strengthen your governance framework
            </p>
          </motion.div>

          {/* Accenture-inspired horizontal card layout */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative"
              >
                <motion.div
                  onClick={() => handleServiceClick(service.id)}
                  className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 border border-slate-600/50 hover:border-purple-400/50 overflow-hidden relative"
                  whileHover={{ x: 10 }}
                >
                  {/* Accent bar on left */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-${service.accentColor}-400 to-${service.accentColor}-600`}></div>

                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex items-start gap-6">
                    <div className="text-5xl flex-shrink-0">{service.icon}</div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                      <p className="text-gray-300 mb-4">{service.description}</p>

                      <AnimatePresence>
                        {expandedService === service.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t border-slate-600/50"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {service.deliverables.map((deliverable, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 text-sm text-gray-200"
                                >
                                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-purple-400" />
                                  <span>{deliverable}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedService === service.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown size={24} className="text-purple-400" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Why Choose Us
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyChoose.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-xl border border-slate-600/50 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <h3 className="text-2xl font-bold mb-3 text-purple-400">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Our Process
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-6 rounded-xl border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="text-purple-400" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section - Updated with correct YouTube links */}
      <section id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Real-World Examples
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseStudies.map((study, index) => (
              <motion.a
                key={index}
                href={study.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-xl border border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300 h-full hover:shadow-lg hover:shadow-cyan-500/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{study.title}</h3>
                  <p className="text-gray-300 mb-4">{study.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-400">Duration: {study.duration}</span>
                    <ExternalLink size={20} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Useful Sites Section - New */}
      <section id="resources" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Compliance Resources
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Curated links to essential compliance and regulatory resources
            </p>
          </motion.div>

          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {usefulSites.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600/50 hover:border-purple-400/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-6 text-purple-400 flex items-center gap-2">
                  <Globe size={24} />
                  {section.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.sites.map((site, siteIndex) => (
                    <motion.a
                      key={siteIndex}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="group p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2 flex items-center gap-2">
                        {site.name}
                        <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-gray-400">{site.description}</p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600/50 hover:border-purple-400/50 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white text-left">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={24} className="text-purple-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-4 text-gray-300 border-t border-slate-600/50"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Compliance AI</h3>
              <p className="text-gray-400">Expert GRC consulting services for organizations across MENA and beyond.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-purple-400 transition-colors">Services</a></li>
                <li><a href="#case-studies" className="hover:text-purple-400 transition-colors">Case Studies</a></li>
                <li><a href="#resources" className="hover:text-purple-400 transition-colors">Resources</a></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://www.youtube.com/@ComplianceAI" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">YouTube</a></li>
                <li><a href="https://www.linkedin.com/in/mohamed-emam-ica-crco-168b03124?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BeKxU52EiSxKpVXfKSa%2Fx0A%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Compliance AI. All rights reserved. | Designed with precision for excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
