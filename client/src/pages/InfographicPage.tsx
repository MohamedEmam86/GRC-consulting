import { Link, useRoute } from 'wouter';
import { ArrowLeft, Home as HomeIcon, Menu, X } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useEffect } from 'react';

// Define the structure for an infographic item
interface Infographic {
  title: string;
  src: string;
  color: string;
}

// Data for the 5 infographics
const infographicsData: Infographic[] = [
  {
    title: 'KYC Customer Onboarding',
    color: 'purple',
    src: '/infographics/KYCCustomerOnboardingProcess.html'
  },
  {
    title: 'AML Risk Assessment',
    color: 'cyan',
    src: '/infographics/AMLRiskAssessmentProcess.html'
  },
  {
    title: 'Three Lines of Defense',
    color: 'emerald',
    src: '/infographics/ThreeLinesofDefenseModel.html'
  },
  {
    title: 'Transaction Monitoring',
    color: 'pink',
    src: '/infographics/TransactionMonitoringWorkflow.html'
  },
  {
    title: 'FATF Recommendations',
    color: 'orange',
    src: '/infographics/FatfRecommendation.html'
  }
];

// Function to slugify the title for use in the URL
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Map slugs to infographic data for easy lookup
const infographicMap = infographicsData.reduce((acc, item) => {
  acc[slugify(item.title)] = item;
  return acc;
}, {} as Record<string, Infographic>);

export default function InfographicPage() {
	  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	  // Use wouter's useRoute to extract the slug from the URL
	  const [match, params] = useRoute('/infographics/:slug');
	  const slug = params?.slug;
	  const infographic = slug ? infographicMap[slug] : null;
	  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the iframe content
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!infographic) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Infographic Not Found</h1>
        <p className="text-lg text-gray-400 mb-8">The requested infographic could not be found.</p>
        <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
          <HomeIcon size={20} /> Go to Home
        </Link>
      </div>
    );
  }

  return (
	    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
	      {/* Navigation - Copied from Home.tsx */}
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
	                <HomeIcon size={18} /> Back to Home
	              </Link>
	              <Link href="/infographics" className="hover:text-purple-400 transition-colors flex items-center gap-2">
	                <ArrowLeft size={18} /> Back to List
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
	                  <HomeIcon size={18} /> Back to Home
	                </Link>
	                <Link href="/infographics" className="block py-2 hover:text-purple-400 transition-colors flex items-center gap-2">
	                  <ArrowLeft size={18} /> Back to List
	                </Link>
	              </motion.div>
	            )}
	          </AnimatePresence>
	        </div>
	      </nav>
	
	      <div className="max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >


        <h1 className={`text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-${infographic.color}-400 to-cyan-400 bg-clip-text text-transparent`}>
          {infographic.title}
        </h1>

        {/* Infographic Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-slate-800 to-slate-700 p-4 sm:p-8 rounded-2xl border border-slate-600/50 shadow-2xl"
        >
          {loading ? (
            <div className="w-full h-[80vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <p className="ml-4 text-lg text-gray-400">Loading Infographic...</p>
            </div>
          ) : (
            <iframe
              src={infographic.src}
              className="w-full h-[80vh] rounded-lg border border-slate-600 bg-white"
              title={infographic.title}
              loading="lazy"
            ></iframe>
          )}
        </motion.div>
	      </motion.div>
	    </div>
	  );
	}
