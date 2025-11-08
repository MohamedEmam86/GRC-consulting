import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, Home as HomeIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

// Define the structure for an infographic item
interface Infographic {
  title: string;
  color: string;
}

// Data for the 5 infographics (same as in InfographicPage.tsx)
const infographicsData: Infographic[] = [
  {
    title: 'KYC Customer Onboarding',
    color: 'purple',
  },
  {
    title: 'AML Risk Assessment',
    color: 'cyan',
  },
  {
    title: 'Three Lines of Defense',
    color: 'emerald',
  },
  {
    title: 'Transaction Monitoring',
    color: 'pink',
  },
  {
    title: 'FATF Recommendations',
    color: 'orange',
  }
];

// Function to slugify the title for use in the URL (same as in InfographicPage.tsx)
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function InfographicsList() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Compliance Infographics
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center mb-16">
            Explore our detailed visual guides on key GRC topics. Click on any title to view the full infographic.
          </p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {infographicsData.map((infographic, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Link
                  href={`/infographics/${slugify(infographic.title)}`}
                  className="block h-full"
                >
                  <div className={`bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-xl border border-slate-600/50 transition-all duration-300 h-full hover:shadow-lg cursor-pointer flex flex-col justify-between`}>
                    <h2 className={`text-2xl font-bold mb-4 text-${infographic.color}-400`}>
                      {infographic.title}
                    </h2>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-400">View Infographic</span>
                      <ArrowRight size={24} className={`text-${infographic.color}-400 group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
