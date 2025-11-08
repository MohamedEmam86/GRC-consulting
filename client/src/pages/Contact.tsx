import { useState } from 'react';
import { Menu, X, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

export default function Contact() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    industry: '',
    jobTitle: '',
    email: '',
    country: '', // New field for country
    phone: '',
    location: '',
    services: [] as string[],
    description: '',
    hearAbout: '',
    contactMethod: 'email',
    foodSector: 'no',
    supplierPartner: 'no',
    conflictScreening: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const services = [
    { id: 'policy', title: 'Compliance Policy Development' },
    { id: 'risk', title: 'Risk Management Framework Design' },
    { id: 'training', title: 'Compliance Training & Advisory' },
    { id: 'audit', title: 'Regulatory Readiness & Audit Support' },
    { id: 'presentations', title: 'Custom Compliance Presentations' }
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServiceCheckbox = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormSubmitted(true);
        // Reset form
        setFormData({
          fullName: '',
          companyName: '',
          industry: '',
          jobTitle: '',
          email: '',
          country: '', // New field for country
          phone: '',
          location: '',
          services: [],
          description: '',
          hearAbout: '',
          contactMethod: 'email',
          foodSector: 'no',
          supplierPartner: 'no',
          conflictScreening: false,
        });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        console.error('Form submission failed:', result.message);
        alert('Failed to send inquiry. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while sending your inquiry. Please try again.');
    }
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
              <img src="/youtube-logo.jpg" alt="YouTube Channel Logo" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-bold text-xl hidden sm:inline">Compliance Excellence</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                <ArrowLeft size={18} /> Back to Home
              </Link>
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
                <Link href="/" className="block py-2 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <ArrowLeft size={18} /> Back to Home
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Let's discuss how we can help strengthen your compliance framework and drive your organization forward
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleFormSubmit}
            variants={itemVariants}
            className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 md:p-12 rounded-2xl border border-slate-600/50 space-y-8"
          >
            {/* Requested Services (Message Box) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Requested Services *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                placeholder="Describe the services you are requesting and your project details..."
              ></textarea>
            </div>

            {/* Services Interested In */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">Services Interested In</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                  <label key={service.id} className="flex items-center gap-3 cursor-pointer p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service.id)}
                      onChange={() => handleServiceCheckbox(service.id)}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-gray-300">{service.title}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Data Fields (Name, Company, Mail, etc.) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Your company"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="e.g., United States"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location (City/Region)</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="e.g., Dubai, UAE"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                >
                  <option value="">Select an industry</option>
                  <option value="fintech">FinTech</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="tech">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Your role"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">How did you hear about us?</label>
                <select
                  name="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="youtube">YouTube Channel</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="referral">Referral</option>
                  <option value="search">Search Engine</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Contact Method</label>
                <div className="flex space-x-4 mt-3">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={formData.contactMethod === 'email'}
                      onChange={handleFormChange}
                      className="form-radio h-4 w-4 text-purple-600 bg-slate-700 border-slate-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-300">Email</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={formData.contactMethod === 'phone'}
                      onChange={handleFormChange}
                      className="form-radio h-4 w-4 text-purple-600 bg-slate-700 border-slate-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-300">Phone</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Conflict of Interest Screening */}
            <div className="space-y-4 pt-4 border-t border-slate-600/50">
              <h3 className="text-lg font-semibold text-white">Conflict of Interest Screening</h3>
              <p className="text-sm text-gray-400">
                To ensure a conflict-free engagement, please confirm the following:
              </p>
              <div className="space-y-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="foodSector"
                    value="yes"
                    checked={formData.foodSector === 'yes'}
                    onChange={handleFormChange}
                    className="form-radio h-4 w-4 text-red-500 bg-slate-700 border-slate-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-gray-300">My company is in the Food & Beverage, FMCG, or Agricultural sector.</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="foodSector"
                    value="no"
                    checked={formData.foodSector === 'no'}
                    onChange={handleFormChange}
                    className="form-radio h-4 w-4 text-green-500 bg-slate-700 border-slate-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-300">My company is NOT in the Food & Beverage, FMCG, or Agricultural sector.</span>
                </label>
              </div>
              <div className="space-y-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="supplierPartner"
                    value="yes"
                    checked={formData.supplierPartner === 'yes'}
                    onChange={handleFormChange}
                    className="form-radio h-4 w-4 text-red-500 bg-slate-700 border-slate-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-gray-300">My company is a direct supplier or partner to a company in the Food & Beverage, FMCG, or Agricultural sector.</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="supplierPartner"
                    value="no"
                    checked={formData.supplierPartner === 'no'}
                    onChange={handleFormChange}
                    className="form-radio h-4 w-4 text-green-500 bg-slate-700 border-slate-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-300">My company is NOT a direct supplier or partner to a company in the Food & Beverage, FMCG, or Agricultural sector.</span>
                </label>
              </div>
              <div className="flex items-start pt-4">
                <input
                  type="checkbox"
                  name="conflictScreening"
                  checked={formData.conflictScreening}
                  onChange={handleFormChange}
                  required
                  className="form-checkbox h-5 w-5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 mt-1"
                />
                <label className="ml-3 text-sm text-gray-300">
                  I confirm that the above information is accurate for conflict screening purposes. *
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-lg"
            >
              {formSubmitted ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle size={20} /> Message Sent Successfully!
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>

            {/* Success Message */}
            <AnimatePresence>
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-300 text-center"
                >
                  Thank you for reaching out! We'll get back to you shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
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
                <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                <li><a href="/#services" className="hover:text-purple-400 transition-colors">Services</a></li>
                <li><a href="/#resources" className="hover:text-purple-400 transition-colors">Resources</a></li>
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
