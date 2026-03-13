import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Globe, 
  Shield, 
  Rocket, 
  Server, 
  Users, 
  Brain, 
  ShieldCheck, 
  TabletSmartphone, 
  Link2, 
  TrendingUp, 
  Compass, 
  ArrowUpRight 
} from 'lucide-react';

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

const About = () => {
  // State for the interactive Specializations section (Desktop Only)
  const [activeSpec, setActiveSpec] = useState(0);

  // Ensure page loads at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specializations = [
    { icon: Server, title: "Enterprise IT Managed Services", desc: "Robust SAP, Oracle, and Microsoft ecosystem management delivered to enterprise clients across the globe." },
    { icon: Users, title: "Strategic Technology Talent", desc: "Elite, vetted technology architects and specialized engineering talent deployed across the globe within 24-72 hours." },
    { icon: Brain, title: "Intelligent AI & Analytics", desc: "Autonomous workflows, agentic AI, and predictive analytics used by forward-thinking organizations worldwide." },
    { icon: ShieldCheck, title: "Cyber Security Services", desc: "Zero-trust architectures, 24/7 SOC, and enterprise security frameworks implemented internationally." },
    { icon: TabletSmartphone, title: "Web & App Modernization", desc: "Transforming slow, legacy systems into incredibly fast, modern, and scalable cloud-native digital platforms." },
    { icon: Link2, title: "API & Integrations", desc: "Complex enterprise integrations and custom middleware optimized for seamless operations in global enterprises." },
    { icon: TrendingUp, title: "Enterprise GTM Expansion", desc: "Enabling global product companies to strategically expand their sales and operations into the GCC & Africa." },
  ];

  const uniquePoints = [
    {
      num: "01",
      title: "A Global Talent & Delivery Network",
      desc: "We source, deploy, and govern elite IT professionals from multiple regions across the globe, ensuring unmatched expertise and scalability.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      num: "02",
      title: "International Partner Ecosystem",
      desc: "We collaborate with global AI platforms, cybersecurity leaders, cloud hyperscalers, and technology innovators—bringing international best practices to regional markets.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    },
    {
      num: "03",
      title: "Global Governance Standards",
      desc: "Our delivery model follows global program governance frameworks, ensuring every project, wherever located, is executed with precision, transparency, and accountability.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900">
      <AmbientBackground />
      <Navbar />

      <main className="flex-grow relative z-10 pt-32 pb-0">
        
        {/* --- HERO SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 mb-24 md:mb-32">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-20 items-center">
            
            {/* Left Column wrapper: using 'contents' on mobile to allow reordering */}
            <div className="contents md:flex md:flex-col text-center md:text-left">
              
              {/* 1. Heading Block (Top on mobile, Top Left on desktop) */}
              <div className="order-1 md:order-none flex flex-col space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white shadow-sm w-max mx-auto md:mx-0">
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase font-mono">
                    About 1TecHub
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Technology Has No Borders. Neither Should Innovation.
                </h1>
              </div>

              {/* 3. Description Block (Bottom on mobile, Bottom Left on desktop) */}
              <div className="order-3 md:order-none mt-6 md:mt-6">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  We are your strategic partner in digital transformation, bringing together global expertise, governance excellence, and market expansion capabilities to drive your success.
                </p>
              </div>
            </div>
            
            {/* 2. Image Block (Middle on mobile, Right on desktop) */}
            <div className="order-2 md:order-none w-full my-8 md:my-0">
              <div className="relative w-full aspect-square max-w-lg mx-auto lg:ml-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2064&auto=format&fit=crop" 
                  alt="Abstract Technology" 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent pointer-events-none"></div>
              </div>
            </div>

          </div>
        </section>

        {/* --- WHO WE ARE (3 CARDS) --- */}
        <section className="max-w-7xl mx-auto px-6 mb-24 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Who We Are</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global IT & AI Solutions</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                1TecHub serves as the strategic front-end partner for leading technology vendors and enterprises across the globe, orchestrating advanced infrastructure and autonomous intelligence.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Governance-First</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                We bring enterprise-grade processes, delivery governance, and program oversight to every engagement—ensuring clients benefit from predictable execution and high accountability.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Go-to-Market Engine</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                We help tech companies expand globally, serving as their GTM partner in the MEA region while opening pathways into international markets through our vast network.
              </p>
            </div>
          </div>
        </section>

        {/* --- WHAT MAKES US UNIQUE --- */}
        <section className="bg-white border-y border-slate-200 py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">What Makes Us Unique</h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium">
                Integrating international best practices with regional insights to drive measurable business impact.
              </p>
            </div>

            <div className="space-y-16 lg:space-y-24">
              {uniquePoints.map((point, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div 
                    key={idx} 
                    className={`flex flex-col gap-8 lg:gap-16 group ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
                  >
                    
                    {/* Image Block */}
                    <div className="w-full md:w-1/2">
                      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 border border-slate-100">
                        <img 
                          src={point.image} 
                          alt={point.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                      </div>
                    </div>

                    {/* Text Block */}
                    <div className="w-full md:w-1/2 relative">
                      {/* Large Background Number */}
                      <div className="absolute -top-12 -left-6 text-[8rem] lg:text-[10rem] font-extrabold text-slate-100 -z-10 leading-none select-none group-hover:text-blue-50 transition-colors duration-500">
                        {point.num}
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        {point.title}
                      </h3>
                      <p className="text-slate-600 text-lg leading-relaxed font-medium">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- RESPONSIVE CORE SPECIALIZATIONS --- */}
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center lg:text-left mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Core Specializations</h2>
            <p className="text-slate-500 font-medium mt-4">Hover or tap to explore our globally delivered capabilities.</p>
          </div>

          {/* MOBILE & TABLET VIEW: Grid of Clean Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {specializations.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-[1.5rem] p-6 shadow-sm hover:border-blue-300 transition-colors flex flex-col">
                  <div className="flex flex-col gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{spec.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6 flex-grow">{spec.desc}</p>
                  <Link to="/services" className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs tracking-widest uppercase hover:text-blue-800 transition-colors mt-auto w-max">
                    Explore Services <ArrowUpRight size={14} />
                  </Link>
                </div>
              )
            })}
          </div>

          {/* DESKTOP VIEW: Interactive Split Layout */}
          <div className="hidden lg:flex flex-row gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Interactive List */}
            <div className="w-5/12 sticky top-32 space-y-4">
              <div className="flex flex-col gap-2">
                {specializations.map((spec, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveSpec(idx)}
                    onClick={() => setActiveSpec(idx)}
                    className={`text-left text-lg font-bold py-4 px-6 rounded-2xl transition-all duration-300 border ${
                      activeSpec === idx
                        ? 'bg-white border-blue-200 text-blue-700 shadow-md translate-x-2'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50'
                    }`}
                  >
                    {spec.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Display Box */}
            <div className="w-7/12">
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 lg:p-16 shadow-2xl shadow-blue-900/5 transition-all duration-500 relative overflow-hidden min-h-[480px] flex flex-col justify-center group">
                
                {/* Decorative Background Blurs */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-[80px] group-hover:bg-blue-100 transition-colors duration-700 pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-50/50 rounded-full blur-[80px] transition-colors duration-700 pointer-events-none"></div>

                <div className="relative z-10">
                  {(() => {
                    const activeData = specializations[activeSpec];
                    const ActiveIcon = activeData.icon;
                    return (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeSpec}>
                        <div className="w-20 h-20 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                          <ActiveIcon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                          {activeData.title}
                        </h3>
                        <p className="text-lg lg:text-xl text-slate-600 font-medium leading-relaxed mb-10">
                          {activeData.desc}
                        </p>
                        <Link 
                          to="/services" 
                          className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm tracking-widest uppercase hover:text-blue-800 transition-colors group/link"
                        >
                          Explore Services <ArrowUpRight size={18} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- DARK BANNER & CTA --- */}
        <section className="relative mt-12 pb-24">
          {/* Dark Background Section */}
          <div className="bg-[#0a1128] pt-24 pb-40 px-6 rounded-t-[3rem] text-center relative overflow-hidden">
            {/* Background Details */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <Compass size={32} className="text-slate-400 mb-6" />
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                Your Growth is Global.
              </h2>
              <h2 className="text-4xl md:text-6xl font-extrabold text-blue-500 tracking-tight mb-8">
                Your Partner is 1TecHub.
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                We are committed to supporting our clients' growth across the globe with solutions that are scalable, secure, and shaped for the future.
              </p>
            </div>
          </div>

          {/* Overlapping CTA Box */}
          <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
            <div className="bg-gradient-to-b from-[#f4f8ff] to-white border border-blue-100 rounded-[2rem] p-8 md:p-12 text-center shadow-2xl shadow-blue-900/10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
                Ready to orchestrate your digital transformation?
              </h3>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-all duration-300 group"
              >
                Partner With Us
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;