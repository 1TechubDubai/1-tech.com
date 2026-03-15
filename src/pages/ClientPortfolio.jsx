import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Smartphone, 
  Truck, 
  Database, 
  BrainCircuit, 
  Server, 
  ShieldCheck, 
  Cloud, 
  Network, 
  Key, 
  PieChart, 
  LineChart, 
  Recycle, 
  ArrowRight,
  ChevronRight,
  HeartPulse,
  Globe 
} from 'lucide-react';

// --- SUBTLE AMBIENT BACKGROUND ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes ambDrift1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33%  { transform: translate(40px, -50px) scale(1.08); }
        66%  { transform: translate(-25px, 25px) scale(0.95); }
      }
      @keyframes ambDrift2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        40%  { transform: translate(-45px, 35px) scale(1.1); }
        70%  { transform: translate(30px, -40px) scale(0.93); }
      }
      @keyframes ambDrift3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        35%  { transform: translate(25px, 45px) scale(1.06); }
        70%  { transform: translate(-35px, -20px) scale(0.96); }
      }
      @keyframes gridBreathe {
        0%, 100% { opacity: 0.05; }
        50%      { opacity: 0.09; }
      }
      .ad1  { animation: ambDrift1 22s ease-in-out infinite; }
      .ad2  { animation: ambDrift2 28s ease-in-out infinite; animation-delay: -9s; }
      .ad3  { animation: ambDrift3 19s ease-in-out infinite; animation-delay: -5s; }
      .ad4  { animation: ambDrift1 25s ease-in-out infinite; animation-delay: -13s; }
      .ad5  { animation: ambDrift2 32s ease-in-out infinite; animation-delay: -17s; }
      .gb   { animation: gridBreathe 9s ease-in-out infinite; }
    `}</style>

    <div className="absolute inset-0" style={{
      background: `linear-gradient(160deg, #eef6f8 0%, #f0f7fa 18%, #e8f4f8 35%, #f2f8fb 52%, #e6f3f8 68%, #edf6f9 85%, #e9f4f8 100%)`
    }} />
    <div className="absolute inset-0" style={{
      background: `radial-gradient(ellipse 120% 80% at 60% 20%, rgba(14,116,144,0.07) 0%, transparent 60%), radial-gradient(ellipse 100% 80% at 20% 80%, rgba(15,118,110,0.06) 0%, transparent 55%)`
    }} />

    <div className="ad1 absolute -top-[18%] -left-[12%]" style={{ width: 'clamp(380px, 58vw, 780px)', height: 'clamp(380px, 58vw, 780px)', background: 'radial-gradient(ellipse at 45% 45%, rgba(8,145,178,0.20) 0%, rgba(6,116,142,0.10) 38%, rgba(103,193,214,0.04) 62%, transparent 78%)', filter: 'blur(44px)', borderRadius: '50%' }} />
    <div className="ad2 absolute -top-[12%] -right-[14%]" style={{ width: 'clamp(340px, 52vw, 720px)', height: 'clamp(340px, 52vw, 720px)', background: 'radial-gradient(ellipse at 55% 40%, rgba(14,148,168,0.18) 0%, rgba(6,120,150,0.09) 38%, rgba(94,195,220,0.04) 62%, transparent 80%)', filter: 'blur(50px)', borderRadius: '50%' }} />
    <div className="ad3 absolute top-[30%] left-[22%]" style={{ width: 'clamp(280px, 44vw, 620px)', height: 'clamp(280px, 44vw, 620px)', background: 'radial-gradient(ellipse at 50% 50%, rgba(7,89,133,0.13) 0%, rgba(8,96,150,0.07) 44%, rgba(56,142,190,0.03) 65%, transparent 80%)', filter: 'blur(56px)', borderRadius: '50%' }} />
    <div className="ad4 absolute -bottom-[16%] -left-[8%]" style={{ width: 'clamp(360px, 55vw, 760px)', height: 'clamp(360px, 55vw, 760px)', background: 'radial-gradient(ellipse at 40% 55%, rgba(15,118,110,0.16) 0%, rgba(13,100,95,0.08) 38%, rgba(94,186,178,0.04) 62%, transparent 80%)', filter: 'blur(46px)', borderRadius: '50%' }} />
    <div className="ad5 absolute -bottom-[10%] -right-[10%]" style={{ width: 'clamp(300px, 46vw, 660px)', height: 'clamp(300px, 46vw, 660px)', background: 'radial-gradient(ellipse at 55% 55%, rgba(7,89,133,0.17) 0%, rgba(10,105,155,0.09) 38%, rgba(72,155,200,0.04) 62%, transparent 80%)', filter: 'blur(48px)', borderRadius: '50%' }} />

    <div className="gb absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(7,89,133,0.32) 1.1px, transparent 1.1px)', backgroundSize: '34px 34px' }} />
  </div>
);

// --- PORTFOLIO DATA ---
const portfolioData = [
  {
    id: 1,
    client: "Leading Fast-Moving Consumer Goods (FMCG) Company",
    shortName: "Global FMCG Leader", // Used for the sidebar
    location: "Global",
    type: "Full Digital Transformation",
    status: "Completely Outsourced to 1TecHub",
    overview: "1TecHub is the exclusive digital transformation partner for a leading global FMCG enterprise, managing every technology initiative across applications, mobility, Artificial Intelligence (AI), analytics, cloud, and IT operations.",
    icon: Building2,
    programs: [
      { title: "Application Modernization", desc: "Consumer application modernization, SBD Admin platform, retail engagement apps, and field-force enablement tools providing data-driven mobile capabilities for sales, inventory, and marketing.", icon: Smartphone },
      { title: "Fleet & Logistics Automation", desc: "Intelligent routing and dispatch, AI-powered fleet monitoring, and driver workflow automation creating a real-time logistics control tower.", icon: Truck },
      { title: "Data Warehouse & Data Lake", desc: "Unified corporate data platform featuring standardized data models and a multi-source ingestion framework as the foundation for enterprise analytics and AI.", icon: Database },
      { title: "AI Insights & Agentic Automation", desc: "Retail sales intelligence, inventory and demand forecasting, agentic bots for reporting, and AI-driven decision automation.", icon: BrainCircuit },
      { title: "Enterprise Resource Planning (ERP) Support", desc: "Ticketing and L1-L3 support, incident, change, and release governance, alongside a continuous enhancement and stabilization roadmap.", icon: Server },
      { title: "Full IT & Infrastructure Support", desc: "Cloud hosting and infrastructure modernization, server and network administration, disaster recovery readiness, and Azure cloud roadmap execution.", icon: Cloud }
    ],
    outcome: "A fully digital, data-driven enterprise ecosystem built, run, and governed entirely by 1TecHub—enabling rapid market expansion and operational excellence across global markets."
  },
  {
    id: 2,
    client: "Leading Healthcare Distribution Group",
    shortName: "Global Healthcare Distributor", // Used for the sidebar
    location: "Global",
    type: "Complete IT Managed Services",
    status: "Outsourced to 1TecHub",
    overview: "This multi-country healthcare distributor relies on 1TecHub as its central IT engine, outsourcing operations across ERP, cybersecurity, integrations, automation, and cloud environments.",
    icon: HeartPulse,
    programs: [
        { title: "SAP S4 Hana Managed Services", desc: "Multi-year contract delivered through a certified Systems Integrator (SI). Features centralized global support, onsite/offshore hybrid models, and 24/7 functional and technical operations.", icon: Database },
        { title: "Multi-Year Cloud Managed Services", desc: "Comprehensive management across Amazon Web Services (AWS), Azure, and Oracle Cloud Infrastructure (OCI), handling rollouts, enhancements, and integrations.", icon: Cloud },
        { title: "Enterprise API Modernization", desc: "Modernization of Application Programming Interface (API) gateways, implementing cross-business system integrations and secure interoperability frameworks.", icon: Network },
        { title: "Cybersecurity Managed Services", desc: "24/7 Security Operations Center (SOC) operations, threat detection, incident response, vulnerability lifecycle management, and regulatory compliance oversight.", icon: ShieldCheck },
        { title: "IAM & PAM Managed Services", desc: "End-to-end Identity and Access Management (IAM) and Privileged Access Management (PAM), encompassing identity governance, user lifecycle automation, and auditing.", icon: Key },
        { title: "Offshore Resource Managed Services", desc: "Dedicated offshore engineering and support teams, providing cost-efficient and scalable enterprise capabilities across application management, cloud operations, cybersecurity, and development. Structured engagement models ensure seamless integration with client teams through hybrid onsite–offshore delivery and 24/7 operational coverage.", icon: Globe }
    ],
    outcome: "A modern, secure, and fully governed IT ecosystem enabling streamlined, compliant healthcare distribution across their entire global footprint."
  },
  {
    id: 3,
    client: "Global Healthcare Group",
    shortName: "Global Healthcare Group", // Used for the sidebar
    location: "Global",
    type: "Enterprise Finance Transformation",
    status: "Oracle Suite Implementation",
    overview: "A multinational healthcare organization partnered with 1TecHub to completely modernize their financial consolidation, compliance, and multi-entity reporting structures.",
    icon: Building2,
    programs: [
      { title: "Oracle FCCS Implementation", desc: "Deployment of Oracle Financial Consolidation and Close Cloud Service (FCCS) to automate financial consolidation, handling currency, entity, and intercompany eliminations.", icon: PieChart },
      { title: "Enterprise Financial Analytics", desc: "Establishment of unified group reporting frameworks to provide deep, actionable insights into financial health across the enterprise.", icon: LineChart },
      { title: "Deep ERP-Finance Integrations", desc: "Two additional ongoing Oracle programs dedicated to global financial visibility and deep digital finance modernization.", icon: Network }
    ],
    outcome: "A real-time, standardized, and fully compliant multi-entity financial reporting ecosystem seamlessly spanning multiple global companies."
  },
  {
    id: 4,
    client: "Global Waste Management Company",
    shortName: "Global Waste Management", // Used for the sidebar
    location: "Global",
    type: "Complete Digital Transformation",
    status: "Outsourced to 1TecHub",
    overview: "A leading global waste management operator entrusted 1TecHub with the complete, end-to-end digitalization of its ERP, fleet operations, and overarching cloud landscape.",
    icon: Recycle,
    programs: [
      { title: "SAP Business One Implementation", desc: "Full module deployment covering Finance, Procurement, Inventory, Contracting, and Billing. Delivered through a certified SI with 1TecHub governing quality and timelines.", icon: Database },
      { title: "AI-Powered Fleet Operations", desc: "Implementation of route optimization, truck tracking via geo-intelligence, landfill automation, and smart-bin intelligence for collection scheduling.", icon: Truck },
      { title: "Cloud & Network Modernization", desc: "Comprehensive infrastructure assessment and architecture, executing a secure cloud migration roadmap to create a modernized network backbone.", icon: Cloud },
      { title: "Microsoft 365 Tenant Migration", desc: "Complex tenant-to-tenant consolidation including identity, mailbox, and data migration executed with a zero-downtime cutover strategy.", icon: Server },
      { title: "Offshore Resource Managed Services", desc: "Dedicated offshore engineering and support teams, providing cost-efficient and scalable enterprise capabilities across application management, cloud operations, cybersecurity, and development. Structured engagement models ensure seamless integration with client teams through hybrid onsite–offshore delivery and 24/7 operational coverage.", icon: Globe }
    ],
    outcome: "A fully digital, AI-enabled waste management platform featuring central governance, real-time fleet visibility, and seamless ERP operations."
  }
];

const ClientPortfolio = () => {
  const [activeSection, setActiveSection] = useState(portfolioData[0].id);
  const sectionRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Setup Intersection Observer to highlight the active sidebar item as you scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get ID from the element and update state
            const id = Number(entry.target.getAttribute('data-id'));
            if (id) setActiveSection(id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 } 
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const scrollToSection = (id, index) => {
    setActiveSection(id);
    if (sectionRefs.current[index]) {
      const yOffset = sectionRefs.current[index].getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Import Syne font */}
      <style dangerouslySetInnerHTML={{ __html: `
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      ` }} />
      
      <AmbientBackground />
      <Navbar />

      <main className="flex-grow relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-700 uppercase font-mono">
              Case Studies
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900" style={{ fontFamily: "'Syne', sans-serif" }}>
            Flagship IT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Transformation Programs
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            Trusted by leading enterprises across global markets. At 1TecHub, we don't just implement technology—we govern, orchestrate, and own complex digital programs end-to-end.
          </p>
        </div>

        {/* --- SPLIT LAYOUT (SIDEBAR + CONTENT) --- */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 items-start">
          
          {/* --- STICKY SIDEBAR NAVIGATION --- */}
          <aside className="
            w-[calc(100%+2rem)] -ml-4 sm:w-[calc(100%+3rem)] sm:-ml-6 lg:w-1/4 lg:ml-0 shrink-0 
            sticky top-[60px] sm:top-[75px] lg:top-32 z-40 
            bg-white/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none
            border-b lg:border-b-0 lg:border-r border-slate-200 
            pt-4 pb-3 lg:py-0 lg:pb-12 
            px-4 sm:px-6 lg:px-0 lg:pr-6 
            mb-8 lg:mb-0 shadow-sm lg:shadow-none
            lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto custom-scrollbar
          ">
            <div className="flex items-center justify-between mb-4 lg:mb-6 ml-1 lg:ml-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Select Client Story
              </h4>
            </div>
            
            <div className="relative w-full">
              {/* Scrollable List */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar snap-x relative z-10 items-stretch">
                {portfolioData.map((project, index) => {
                  const isActive = activeSection === project.id;
                  const Icon = project.icon;
                  return (
                    <button
                      key={project.id}
                      onClick={() => scrollToSection(project.id, index)}
                      className={`
                        flex items-center text-left w-[240px] sm:w-[260px] lg:w-full shrink-0 snap-start
                        p-3.5 lg:p-4 rounded-2xl transition-all duration-300 border-0
                        ${isActive
                          ? 'bg-white lg:bg-white'
                          : 'bg-slate-50/50 lg:bg-transparent hover:bg-white/80'}
                      `}
                      style={isActive ? {
                        boxShadow: `
                          0 4px 24px -4px rgba(59,130,246,0.15),
                          0 1px 8px -2px rgba(99,102,241,0.10),
                          0 0 0 1px rgba(147,197,253,0.30)
                        `
                      } : {
                        boxShadow: '0 1px 4px -1px rgba(15,23,42,0.04)'
                      }}
                    >
                      <div className={`shrink-0 mr-3 lg:mr-4 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md'
                          : 'bg-slate-100 text-slate-400'
                      }`}>
                        <Icon size={16} className={`transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      </div>
                      <span className={`text-xs lg:text-sm font-bold flex-grow transition-colors pr-2 leading-tight ${
                        isActive ? 'text-slate-900' : 'text-slate-500'
                      }`}>
                        {project.shortName}
                      </span>
                      <ChevronRight
                        size={15}
                        className={`shrink-0 transition-all duration-300 hidden lg:block ${
                          isActive ? 'text-blue-400 opacity-100 translate-x-0' : 'text-slate-200 opacity-0 -translate-x-1'
                        }`}
                      />
                    </button>
                  );
                })}
                <div className="w-4 shrink-0 lg:hidden block" />
              </div>
              {/* Mobile Right Edge Fade */}
              <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none lg:hidden z-20" />
            </div>
          </aside>

          {/* --- MAIN CONTENT (CARDS) --- */}
          <div className="w-full lg:w-3/4 flex flex-col space-y-16 md:space-y-24">
            {portfolioData.map((project, index) => {
              const MainIcon = project.icon;
              return (
                <div 
                  key={project.id} 
                  ref={(el) => (sectionRefs.current[index] = el)}
                  data-id={project.id}
                  className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-10 md:p-12 border border-slate-200 shadow-2xl shadow-blue-900/5 relative overflow-hidden group scroll-mt-32"
                >
                  {/* Decorative Background Blur inside card */}
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none -z-10 transition-colors duration-700 group-hover:bg-cyan-50/60"></div>

                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 border-b border-slate-100 pb-10">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                          <MainIcon size={24} />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider w-max">
                          <MapPin size={14} className="text-blue-500" />
                          {project.location}
                        </div>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                        {project.client}
                      </h2>
                      
                      <div className="space-y-1">
                        <h4 className="text-lg md:text-xl font-bold text-blue-600">
                          {project.type}
                        </h4>
                        <p className="text-sm font-bold text-cyan-600 uppercase tracking-wide">
                          {project.status}
                        </p>
                      </div>
                    </div>

                    <div className="md:w-5/12 shrink-0">
                      <p className="text-slate-600 font-medium leading-relaxed text-justify md:text-left text-sm bg-slate-50 p-5 rounded-2xl border border-slate-100 text-justify">
                        {project.overview}
                      </p>
                    </div>
                  </div>

                  {/* Programs Grid */}
                  <div className="mb-10">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      Programs & Managed Services Delivered
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                      {project.programs.map((prog, pIdx) => {
                        const ProgIcon = prog.icon;
                        return (
                          <div key={pIdx} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col h-full group/item">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-100 group-hover/item:bg-blue-50 group-hover/item:text-blue-600 group-hover/item:border-blue-100 transition-colors shrink-0">
                                <ProgIcon size={20} />
                              </div>
                              <h4 className="font-bold text-slate-900 leading-tight group-hover/item:text-blue-700 transition-colors">
                                {prog.title}
                              </h4>
                            </div>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed text-justify text-justify">
                              {prog.desc}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Outcome Box */}
                  <div className="bg-gradient-to-r from-[#0a192f] to-[#112240] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none"></div>
                    
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={24} className="text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1.5">Business Outcome</h4>
                      <p className="text-white font-medium leading-relaxed text-sm sm:text-base text-justify sm:text-left">
                        {project.outcome}
                      </p>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-24 md:mt-32 text-center bg-blue-50 border border-blue-100 rounded-[3rem] p-10 md:p-16 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Ready to transform your enterprise?
          </h2>
          <p className="text-slate-600 font-medium mb-8 max-w-xl mx-auto">
            Join our portfolio of global leaders. Let's discuss how our end-to-end digital transformation and managed services can scale your operations.
          </p>
          <Link 
            to="/contact"
            state={{
              selectedServices: [],
              prefilledMessage: "Hi team,\n\nWe recently reviewed your client portfolio and are interested in discussing a digital transformation roadmap for our enterprise.\n\nPlease let us know the best time to schedule a strategic consultation."
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 group"
          >
            Start Your Journey
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ClientPortfolio;