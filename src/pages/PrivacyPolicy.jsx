import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail, Globe, UserCheck, Bell, Users, Archive, ShieldAlert, MessageSquare } from 'lucide-react';
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

const PrivacyPolicy = () => {

  // Ensure page loads at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "collection",
      icon: <Eye className="text-blue-600" />,
      title: "1. Information We Collect",
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="text-slate-900 font-bold mb-2">a. Information You Provide</h4>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              When you contact us through forms or email, subscribe to newsletters, or use our services, you may provide your Name, Email address, Phone number, and any other details you choose to share.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="text-slate-900 font-bold mb-2">b. Automatically Collected Information</h4>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              When you visit our website, we may automatically collect your IP address, browser type and version, pages visited, time spent, and device/operating system information to help us understand user interaction.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
            <h4 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
              <MessageSquare size={16} className="text-blue-600"/> c. Chat and Automated Interactions
            </h4>
            <p className="text-blue-800 text-sm leading-relaxed font-medium">
              When you interact with our automated assistants or AI-powered chat tools, we collect the contents of your conversations to provide relevant support and improve our services. Please refrain from sharing highly sensitive personal or financial information within these chat interfaces.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "usage",
      icon: <FileText className="text-blue-600" />,
      title: "2. How We Use Your Information",
      content: (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600 text-sm font-medium">
          <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" /> Operate and maintain our website</li>
          <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" /> Improve content, AI accuracy, and user experience</li>
          <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" /> Respond to inquiries and support</li>
          <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" /> Prevent fraud and ensure security</li>
        </ul>
      )
    },
    {
      id: "cookies",
      icon: <Globe className="text-blue-600" />,
      title: "3. Cookies and Tracking",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          1techub.com may use cookies to remember user preferences, analyze traffic patterns, and enhance functionality. You can choose to disable cookies through your browser settings.
        </p>
      )
    },
    {
      id: "sharing",
      icon: <Users className="text-blue-600" />,
      title: "4. Data Sharing and Third Parties",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you. This includes cloud hosting providers, analytics services, and automated artificial intelligence processing tools used to power our customer support features. These third parties are bound by strict confidentiality and data protection obligations.
        </p>
      )
    },
    {
      id: "security",
      icon: <Lock className="text-blue-600" />,
      title: "5. Data Security",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          We take reasonable technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security against unauthorized access or breaches.
        </p>
      )
    },
    {
      id: "rights",
      icon: <UserCheck className="text-blue-600" />,
      title: "6. Your Privacy Rights",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          Depending on your location (such as under GDPR or CCPA), you may have the right to access, correct, or delete your data, withdraw consent, restrict processing, or request data portability. To exercise these rights, please contact us using the details below.
        </p>
      )
    },
    {
      id: "retention",
      icon: <Archive className="text-blue-600" />,
      title: "7. Data Retention & Transfers",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. As an international entity, your data may be transferred to, and processed in, countries outside of your jurisdiction. We ensure appropriate safeguards are in place for such cross-border transfers.
        </p>
      )
    },
    {
      id: "children",
      icon: <ShieldAlert className="text-blue-600" />,
      title: "8. Children's Privacy",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          Our services are intended for a general business audience and are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected such data, we will take steps to delete it promptly.
        </p>
      )
    },
    {
      id: "updates",
      icon: <Bell className="text-blue-600" />,
      title: "9. Changes to This Policy",
      content: (
        <p className="text-slate-600 text-base leading-relaxed font-medium">
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on this page, and the "Effective Date" will be updated accordingly.
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
              <Shield size={14} className="text-blue-600" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-700 uppercase font-mono">
                Trust & Transparency
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 font-mono text-sm tracking-wider"
            >
              EFFECTIVE DATE: 23/01/2026
            </motion.p>
          </div>
        </header>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Navigation Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-32">
              <nav className="space-y-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">
                  Contents
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
                  At <span className="font-bold text-slate-900">1TecHub</span> (“we,” “our,” or “us”), your privacy is important to us. This Privacy Policy document explains what information we collect, how we use it, and your rights regarding that information.
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

              {/* Contact Section (CTA Style) */}
              <section className="mt-16 p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-cyan-500 border border-blue-400 relative overflow-hidden shadow-xl shadow-blue-900/10">
                 <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 text-white/10 pointer-events-none transform -rotate-12">
                  <Mail size={250} strokeWidth={1} />
                 </div>
                 
                 <div className="relative z-10">
                   <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">10. Contact Us</h2>
                   <p className="text-blue-100 font-medium mb-8 text-lg">If you have questions or concerns about this Privacy Policy, our team is here to help.</p>
                   
                   <div className="flex flex-col sm:flex-row gap-4">
                      <a href="mailto:contactus@1techub.com" className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-bold transition-all shadow-md">
                        <Mail size={18} /> contactus@1techub.com
                      </a>
                      <a href="https://1techub.com" className="inline-flex items-center justify-center gap-3 bg-blue-700/50 text-white border border-blue-400/50 hover:bg-blue-700/80 px-6 py-3 rounded-full font-bold backdrop-blur-md transition-all">
                        <Globe size={18} /> 1techub.com
                      </a>
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

export default PrivacyPolicy;