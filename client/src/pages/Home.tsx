import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Play, CheckCircle, ArrowRight, BookOpen, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

// Helper component for the new card pattern
const AnimatedCard = ({ id, title, excerpt, imagePath, isCaseStudy = false, link }) => {
  const ariaLabel = isCaseStudy ? `Open case study: ${title}` : `Open service details: ${title}`;
  const dataArticle = link || id;

  const CardContent = () => (
    <>
      <div className="relative h-56 md:h-64">
        <img
          src={imagePath}
          alt={`${title} image`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/90 mt-1 hidden md:block">{excerpt}</p>
          <ChevronRight className="w-6 h-6 text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </>
  );

  return (
    <a
      role="button"
      tabIndex="0"
      data-article={dataArticle}
      className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      aria-label={ariaLabel}
    >
      <CardContent />
    </a>
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const services = [
    {
      id: 'policy',
      title: 'Compliance Policy Development',
      excerpt: 'Clear policies that align operations with regulations.',
      imagePath: '/assets/images/services/policy-dev.webp',
    },
    {
      id: 'risk',
      title: 'Risk Management Framework Design',
      excerpt: 'Actionable risk analysis and prioritized remediation.',
      imagePath: '/assets/images/services/risk-assessment.webp',
    },
    {
      id: 'training',
      title: 'Compliance Training & Advisory',
      excerpt: 'Bespoke training and advisory to build a culture of compliance.',
      imagePath: '/assets/images/services/training.webp',
    },
    {
      id: 'audit',
      title: 'Regulatory Readiness & Audit Support',
      excerpt: 'Pre-audit assessments and remediation roadmaps for regulatory readiness.',
      imagePath: '/assets/images/services/audit.webp',
    },
    {
      id: 'presentations',
      title: 'Custom Compliance Presentations',
      excerpt: 'Custom presentations for board reporting and compliance training.',
      imagePath: '/assets/images/services/presentations.webp',
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
      id: 'aml-cft',
      title: 'AML/CFT Program Implementation',
      excerpt: 'Improved compliance coverage and reduced manual effort by 60%.',
      imagePath: '/assets/images/case-studies/client-a-thumb.webp',
      link: 'aml-cft'
    },
    {
      id: 'risk-transform',
      title: 'Risk Framework Transformation',
      excerpt: 'Designing and implementing enterprise risk management for a financial services firm',
      imagePath: '/assets/images/case-studies/client-b-thumb.webp',
      link: 'risk-transform'
    },
    {
      id: 'readiness-assess',
      title: 'Compliance Readiness Assessment',
      excerpt: 'Regulatory readiness evaluation and remediation roadmap for a tech company',
      imagePath: '/assets/images/case-studies/client-c-thumb.webp',
      link: 'readiness-assess'
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
      question: 'What is the typical engagement timeline?',
      answer: 'Timelines depend on the service. Policy development can take 2-4 weeks, risk framework design 6-12 weeks, and readiness assessments 3-6 weeks. We establish a detailed project plan with milestones at the start of each engagement.'
    },
    {
      question: 'How do you ensure confidentiality?',
      answer: 'All client engagements are governed by a strict non-disclosure agreement (NDA). I use secure, encrypted channels for all communications and data transfer, ensuring your sensitive information is protected at all times.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            GRC Consulting
          </Link>
          <nav className="hidden lg:flex space-x-8">
            <a href="#services" className="text-gray-600 hover:text-indigo-600 transition duration-150">
              Services
            </a>
            <a href="#about" className="text-gray-600 hover:text-indigo-600 transition duration-150">
              About Me
            </a>
            <a href="#case-studies" className="text-gray-600 hover:text-indigo-600 transition duration-150">
              Case Studies
            </a>
            <a href="#process" className="text-gray-600 hover:text-indigo-600 transition duration-150">
              Process
            </a>
            <a href="#faq" className="text-gray-600 hover:text-indigo-600 transition duration-150">
              FAQ
            </a>
            <Link href="/resources" className="text-gray-600 hover:text-indigo-600 transition duration-150">
              Resources
            </Link>
            <Link
              href="/contact"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-150"
            >
              Contact
            </Link>
          </nav>
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white p-6 lg:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                GRC Consulting
              </Link>
              <button
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4 text-lg">
              <a
                href="#services"
                className="text-gray-800 hover:text-indigo-600 transition duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-800 hover:text-indigo-600 transition duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Me
              </a>
              <a
                href="#case-studies"
                className="text-gray-800 hover:text-indigo-600 transition duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </a>
              <a
                href="#process"
                className="text-gray-800 hover:text-indigo-600 transition duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Process
              </a>
              <a
                href="#faq"
                className="text-gray-800 hover:text-indigo-600 transition duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <Link
                href="/resources"
                className="text-gray-800 hover:text-indigo-600 transition duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="bg-indigo-600 text-white px-4 py-2 rounded-full text-center hover:bg-indigo-700 transition duration-150 mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section (New Animated Version) */}
      <section id="hero" className="relative h-screen flex items-center pt-20 lg:pt-0">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/assets/images/hero-poster.jpg"
          >
            <source src="/assets/video/hero-loop.mp4" type="video/mp4" />
            <source src="/assets/video/hero-loop.webm" type="video/webm" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8">
          <img
            src="/assets/images/channels4_profile.jpg"
            alt="GRC Consulting channel logo"
            className="h-20 lg:h-28 object-contain"
          />
          <div>
            <h1 id="hero-headline" className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
              {/* Content is injected by hero-cards.js */}
            </h1>
            <p id="hero-sub" className="mt-4 text-lg text-white/90 max-w-3xl">
              We transform compliance from a cost center into a strategic enabler — bridging governance, risk, and technology.
            </p>
            <a
              href="#services"
              className="inline-block mt-6 rounded-full px-5 py-3 bg-white text-black font-medium focus:ring-4 focus:ring-white/40 hover:bg-gray-200 transition duration-150"
            >
              See what we do
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose GRC Consulting?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoose.map((item, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section (Updated to use AnimatedCard) */}
      <section id="services" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <AnimatedCard
                key={service.id}
                id={service.id}
                title={service.title}
                excerpt={service.excerpt}
                imagePath={service.imagePath}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section (New) */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About Me</h2>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3">
              <a
                role="button"
                tabIndex="0"
                data-article="about-me"
                className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                aria-label="Open About profile"
              >
                <div className="relative h-96">
                  <img
                    src="/assets/images/channels4_profile.jpg"
                    alt="Mohamed Emam profile photo"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold text-white">Mohamed Emam</h3>
                    <p className="text-sm text-white/90 mt-1 hidden md:block">GRC Consultant — Strategy & Controls</p>
                    <ChevronRight className="w-6 h-6 text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </a>
            </div>
            <div className="lg:w-2/3">
              <p className="text-xl text-gray-600 mb-6">
                I’m Mohamed Emam — a GRC consultant dedicated to turning regulatory compliance into measurable business value.
              </p>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Services Summary:</h3>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-600">
                <li>Compliance program design & policies</li>
                <li>Risk & control assessments</li>
                <li>Regulatory readiness & remediation</li>
                <li>GRC automation & tooling</li>
                <li>Training & awareness programs</li>
              </ul>
              <a
                href="#contact"
                className="inline-block mt-8 bg-indigo-600 text-white text-lg font-medium px-10 py-4 rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg"
              >
                Let's Connect
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Consulting Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-indigo-100 rounded-full text-indigo-600 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section (Updated to use AnimatedCard) */}
      <section id="case-studies" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <AnimatedCard
                key={study.id}
                id={study.id}
                title={study.title}
                excerpt={study.excerpt}
                imagePath={study.imagePath}
                link={study.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  aria-expanded={expandedFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Ready to Transform Your Compliance?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how GRC Consulting can help you achieve compliance excellence.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-indigo-600 text-white text-lg font-medium px-10 py-4 rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Useful Resources</h2>
          <div className="space-y-8">
            {usefulSites.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4 border-b pb-2">{group.category}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.sites.map((site, siteIndex) => (
                    <a
                      key={siteIndex}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                    >
                      <div className="flex items-center mb-2">
                        <Globe className="w-5 h-5 text-indigo-600 mr-2" />
                        <h4 className="text-xl font-semibold text-gray-800">{site.name}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{site.description}</p>
                      <ExternalLink className="w-4 h-4 text-gray-400 mt-2" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p>&copy; {new Date().getFullYear()} GRC Consulting. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition duration-150">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition duration-150">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
