import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gavel, Scale, ShieldAlert, Cpu, Share2, AlertTriangle, XCircle, Globe, Mail, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- SUBTLE AMBIENT BACKGROUND ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#f8fafc] pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{
        backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }}
    ></div>
    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[120px] animate-pulse mix-blend-multiply"></div>
    <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-[120px] animate-pulse mix-blend-multiply" style={{ animationDelay: '2s' }}></div>
  </div>
);

const TermsOfService = () => {

  // Ensure page loads at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "usage",
      icon: <Scale className="text-blue-600" />,
      title: "1. Use of the Website",
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            You agree to use this Website only for lawful purposes. Prohibited activities include:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600 font-medium">
            <li className="flex items-center gap-3"><XCircle size={16} className="text-red-500 shrink-0" /> Fraudulent or illegal activities</li>
            <li className="flex items-center gap-3"><XCircle size={16} className="text-red-500 shrink-0" /> Unauthorized system access</li>
            <li className="flex items-center gap-3"><XCircle size={16} className="text-red-500 shrink-0" /> Distributing malicious code</li>
            <li className="flex items-center gap-3"><XCircle size={16} className="text-red-500 shrink-0" /> Interfering with functionality</li>
          </ul>
        </div>
      )
    },
    {
      id: "ip",
      icon: <Cpu className="text-blue-600" />,
      title: "2. Intellectual Property",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          All content on 1techub.com, including Text, Graphics, Logos, and Software, is the property of <span className="font-bold text-slate-900">1TecHub</span>. You may not reproduce or republish content without prior written permission.
        </p>
      )
    },
    {
      id: "links",
      icon: <Share2 className="text-blue-600" />,
      title: "4. Third-Party Links",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          We are not responsible for the content, privacy policies, or practices of any third-party websites linked on our site. Accessing these links is at your own risk.
        </p>
      )
    },
    {
      id: "disclaimer",
      icon: <AlertTriangle className="text-amber-500" />,
      title: "5. Disclaimer of Warranties",
      content: (
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-base italic font-medium shadow-sm">
          "The Website is provided 'as is' and 'as available.' We make no warranties regarding accuracy, reliability, or suitability for any purpose."
        </div>
      )
    },
    {
      id: "liability",
      icon: <ShieldAlert className="text-red-500" />,
      title: "6. Limitation of Liability",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          To the fullest extent permitted by law, <span className="font-bold text-slate-900">1TecHub</span> shall not be liable for any damages arising from the use or inability to use the Website, including data errors or interruptions.
        </p>
      )
    },
    {
      id: "law",
      icon: <Globe className="text-blue-600" />,
      title: "9. Governing Law",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          These Terms shall be governed and interpreted in accordance with the laws of the <span className="font-bold text-slate-900">United Arab Emirates / Dubai</span>, without regard to conflict of law principles.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900">
      <AmbientBackground />
      <Navbar />

      <main className="flex-grow relative z-10">
        
        {/* Header Section */}
        <header className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm"
            >
              <Gavel size={14} className="text-blue-600" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-700 uppercase font-mono">
                Legal Framework
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
            >
              Terms of Service
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 font-mono text-sm tracking-wider"
            >
              LAST UPDATED: 23/01/2026
            </motion.p>
          </div>
        </header>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Navigation Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-32">
              <nav className="space-y-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">
                  Terms Navigation
                </p>
                {sections.map((section) => (
                  <a 
                    key={section.id} 
                    href={`#${section.id}`}
                    className="block text-sm font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-xl px-4 py-3"
                  >
                    {section.title.split('. ')[1]}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Policy Text Area */}
            <div className="lg:col-span-8 space-y-12">
              
              <section className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <p className="text-lg leading-relaxed text-slate-700 font-medium">
                  Welcome to <span className="font-bold text-slate-900">1TecHub</span>. By accessing or using <span className="font-bold text-blue-600">https://1techub.com</span>, you agree to be bound by these Terms of Service. If you do not agree with any part of these Terms, please do not use our Website.
                </p>
              </section>

              {sections.map((section) => (
                <motion.section 
                  key={section.id} 
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-32 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 shrink-0">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="pl-0 lg:pl-16">
                    {section.content}
                  </div>
                </motion.section>
              ))}

              {/* Acceptance Section (CTA Style) */}
              <section className="mt-16 p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-cyan-500 border border-blue-400 relative overflow-hidden shadow-xl shadow-blue-900/10">
                 <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 text-white/10 pointer-events-none transform -rotate-12">
                  <CheckCircle2 size={250} strokeWidth={1} />
                 </div>
                 
                 <div className="relative z-10">
                   <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">11. Contact Us</h2>
                   <p className="text-blue-100 font-medium mb-8 text-lg">Questions regarding these terms? Reach out to our legal and support team.</p>
                   
                   <div className="flex flex-col sm:flex-row gap-4">
                      <a href="mailto:contactus@1techub.com" className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-bold transition-all shadow-md">
                        <Mail size={18} /> contactus@1techub.com
                      </a>
                      <div className="inline-flex items-center justify-center gap-3 bg-blue-700/50 text-white border border-blue-400/50 px-6 py-3 rounded-full font-bold backdrop-blur-md">
                        <Globe size={18} /> 1techub.com
                      </div>
                   </div>
                 </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;