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
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#f4f8ff] pointer-events-none">
    <style>{`
      @keyframes driftA {
        0%   { transform: translate(0,0) scale(1); }
        33%  { transform: translate(35px,-55px) scale(1.1); }
        66%  { transform: translate(-25px,20px) scale(0.93); }
        100% { transform: translate(0,0) scale(1); }
      }
      @keyframes driftB {
        0%   { transform: translate(0,0) scale(1); }
        40%  { transform: translate(-45px,35px) scale(1.12); }
        75%  { transform: translate(30px,-40px) scale(0.91); }
        100% { transform: translate(0,0) scale(1); }
      }
      @keyframes driftC {
        0%   { transform: translate(0,0) scale(1); }
        45%  { transform: translate(20px,50px) scale(1.07); }
        80%  { transform: translate(-35px,-20px) scale(0.95); }
        100% { transform: translate(0,0) scale(1); }
      }
      @keyframes gridBreath {
        0%,100% { opacity: 0.055; }
        50%      { opacity: 0.1; }
      }
      @keyframes orbitSpin    { to { transform: rotate(360deg); } }
      @keyframes orbitSpinRev { to { transform: rotate(-360deg); } }
      @keyframes nodePulse {
        0%,100% { opacity: 0.35; }
        50%      { opacity: 0.85; }
      }
      @keyframes shimmerH {
        0%   { transform: translateX(-110%); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { transform: translateX(110vw); opacity: 0; }
      }
      .da { animation: driftA 22s ease-in-out infinite; }
      .db { animation: driftB 27s ease-in-out infinite; animation-delay:-8s; }
      .dc { animation: driftC 19s ease-in-out infinite; animation-delay:-4s; }
      .dd { animation: driftA 31s ease-in-out infinite; animation-delay:-14s; }
      .de { animation: driftB 24s ease-in-out infinite; animation-delay:-18s; }
      .gb { animation: gridBreath 10s ease-in-out infinite; }
      .os1 { animation: orbitSpin    100s linear infinite; }
      .os2 { animation: orbitSpinRev 150s linear infinite; }
      .os3 { animation: orbitSpin    200s linear infinite; animation-delay:-40s; }
    `}</style>

    {/* Base tinted canvas */}
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(145deg, #dbeafe 0%, #eff6ff 25%, #f5f3ff 55%, #e0f2fe 80%, #f0fdf4 100%)'
    }} />

    {/* ── Blobs ── */}
    {/* Top-left: blue */}
    <div className="da absolute -top-[18%] -left-[12%] rounded-full" style={{
      width: 'clamp(380px,58vw,780px)', height: 'clamp(380px,58vw,780px)',
      background: 'radial-gradient(ellipse at 45% 45%, rgba(96,165,250,0.45) 0%, rgba(59,130,246,0.22) 40%, transparent 72%)',
      filter: 'blur(48px)'
    }} />

    {/* Top-right: cyan */}
    <div className="db absolute -top-[8%] -right-[12%] rounded-full" style={{
      width: 'clamp(320px,50vw,700px)', height: 'clamp(320px,50vw,700px)',
      background: 'radial-gradient(ellipse at 55% 40%, rgba(34,211,238,0.38) 0%, rgba(6,182,212,0.18) 45%, transparent 72%)',
      filter: 'blur(52px)'
    }} />

    {/* Center: violet */}
    <div className="dc absolute top-[35%] left-[28%] rounded-full" style={{
      width: 'clamp(280px,42vw,580px)', height: 'clamp(280px,42vw,580px)',
      background: 'radial-gradient(ellipse, rgba(167,139,250,0.32) 0%, rgba(139,92,246,0.14) 45%, transparent 72%)',
      filter: 'blur(56px)'
    }} />

    {/* Bottom-left: indigo */}
    <div className="dd absolute -bottom-[14%] -left-[8%] rounded-full" style={{
      width: 'clamp(340px,52vw,720px)', height: 'clamp(340px,52vw,720px)',
      background: 'radial-gradient(ellipse at 42% 55%, rgba(99,102,241,0.35) 0%, rgba(79,70,229,0.15) 45%, transparent 72%)',
      filter: 'blur(50px)'
    }} />

    {/* Bottom-right: sky */}
    <div className="de absolute -bottom-[8%] -right-[8%] rounded-full" style={{
      width: 'clamp(300px,45vw,640px)', height: 'clamp(300px,45vw,640px)',
      background: 'radial-gradient(ellipse at 55% 55%, rgba(56,189,248,0.32) 0%, rgba(14,165,233,0.14) 45%, transparent 72%)',
      filter: 'blur(54px)'
    }} />

    {/* ── Dot grid ── */}
    <div className="gb absolute inset-0" style={{
      backgroundImage: 'radial-gradient(rgba(30,58,138,0.45) 1.2px, transparent 1.2px)',
      backgroundSize: '34px 34px'
    }} />

    {/* ── Diagonal crosshatch ── */}
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.032 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="xh" x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
          <path d="M52 0L0 52" stroke="#3730a3" strokeWidth="0.7" fill="none"/>
          <path d="M0 0L52 52" stroke="#1e3a8a" strokeWidth="0.4" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#xh)" />
    </svg>

    {/* ── Orbit rings (centered) ── */}
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="os1 absolute" style={{ width:'min(105vw,1060px)', height:'min(105vw,1060px)' }}>
        <svg width="100%" height="100%" viewBox="0 0 1060 1060">
          <circle cx="530" cy="530" r="500" fill="none"
            stroke="rgba(99,102,241,0.11)" strokeWidth="1" strokeDasharray="5 22"/>
          <circle cx="1028" cy="530" r="4.5" fill="rgba(99,102,241,0.55)"
            style={{ filter:'drop-shadow(0 0 5px rgba(99,102,241,0.7))' }}>
            <animateMotion dur="100s" repeatCount="indefinite">
              <mpath href="#r1"/>
            </animateMotion>
          </circle>
          <path id="r1" d="M530,30 a500,500 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>

      <div className="os2 absolute" style={{ width:'min(72vw,730px)', height:'min(72vw,730px)' }}>
        <svg width="100%" height="100%" viewBox="0 0 730 730">
          <circle cx="365" cy="365" r="335" fill="none"
            stroke="rgba(34,211,238,0.1)" strokeWidth="0.8" strokeDasharray="3 18"/>
          <circle cx="700" cy="365" r="3.5" fill="rgba(34,211,238,0.6)"
            style={{ filter:'drop-shadow(0 0 4px rgba(34,211,238,0.75))' }}>
            <animateMotion dur="150s" repeatCount="indefinite">
              <mpath href="#r2"/>
            </animateMotion>
          </circle>
          <path id="r2" d="M365,30 a335,335 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>

      <div className="os3 absolute" style={{ width:'min(45vw,460px)', height:'min(45vw,460px)' }}>
        <svg width="100%" height="100%" viewBox="0 0 460 460">
          <circle cx="230" cy="230" r="210" fill="none"
            stroke="rgba(167,139,250,0.09)" strokeWidth="0.7" strokeDasharray="4 26"/>
          <circle cx="440" cy="230" r="3" fill="rgba(167,139,250,0.65)"
            style={{ filter:'drop-shadow(0 0 4px rgba(167,139,250,0.8))' }}>
            <animateMotion dur="200s" repeatCount="indefinite">
              <mpath href="#r3"/>
            </animateMotion>
          </circle>
          <path id="r3" d="M230,20 a210,210 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>
    </div>

    {/* ── Node constellation: top-right ── */}
    <svg className="absolute top-0 right-0 w-[46vw] h-[46vw] max-w-[520px] max-h-[520px]"
      viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg">
      {[[75,55,'#818cf8'],[185,88,'#38bdf8'],[310,42,'#a78bfa'],[445,125,'#818cf8'],
        [140,195,'#38bdf8'],[285,175,'#a78bfa'],[420,240,'#818cf8'],[55,305,'#38bdf8'],[210,310,'#a78bfa'],[390,355,'#818cf8']]
        .map(([x,y,c],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill={c} opacity="0.1"
            style={{ animation:`nodePulse ${4+(i%4)}s ease-in-out infinite`, animationDelay:`${i*0.4}s` }}/>
          <circle cx={x} cy={y} r="2.5" fill={c} opacity="0.7"
            style={{ animation:`nodePulse ${4+(i%4)}s ease-in-out infinite`, animationDelay:`${i*0.4}s`, filter:`drop-shadow(0 0 3px ${c})` }}/>
        </g>
      ))}
      {[[75,55,185,88],[185,88,310,42],[310,42,445,125],[185,88,140,195],[310,42,285,175],
        [445,125,420,240],[140,195,285,175],[285,175,420,240],[55,305,140,195],
        [140,195,210,310],[285,175,210,310],[420,240,390,355],[210,310,390,355]]
        .map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(99,102,241,0.13)" strokeWidth="0.8"/>
      ))}
    </svg>

    {/* ── Node constellation: bottom-left (mirrored) ── */}
    <svg className="absolute bottom-0 left-0 w-[38vw] h-[38vw] max-w-[440px] max-h-[440px]"
      viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg"
      style={{ transform:'scaleX(-1) scaleY(-1)' }}>
      {[[55,40,'#34d399'],[155,72,'#38bdf8'],[275,38,'#a78bfa'],[385,105,'#34d399'],
        [110,160,'#38bdf8'],[255,148,'#a78bfa'],[370,210,'#34d399'],[45,265,'#38bdf8'],[200,270,'#a78bfa']]
        .map(([x,y,c],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" fill={c} opacity="0.1"
            style={{ animation:`nodePulse ${5+(i%3)}s ease-in-out infinite`, animationDelay:`${i*0.55}s` }}/>
          <circle cx={x} cy={y} r="2.2" fill={c} opacity="0.65"
            style={{ animation:`nodePulse ${5+(i%3)}s ease-in-out infinite`, animationDelay:`${i*0.55}s`, filter:`drop-shadow(0 0 3px ${c})` }}/>
        </g>
      ))}
      {[[55,40,155,72],[155,72,275,38],[275,38,385,105],[155,72,110,160],
        [275,38,255,148],[385,105,370,210],[110,160,255,148],[255,148,370,210],
        [45,265,110,160],[110,160,200,270],[255,148,200,270],[370,210,200,270]]
        .map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(56,189,248,0.12)" strokeWidth="0.8"/>
      ))}
    </svg>

    {/* ── Shimmer scan lines ── */}
    {[
      { top:'16%', dur:'10s', delay:'0s',   color:'rgba(99,102,241,0.28)' },
      { top:'44%', dur:'13s', delay:'3.5s', color:'rgba(34,211,238,0.24)' },
      { top:'70%', dur:'9s',  delay:'6s',   color:'rgba(167,139,250,0.26)' },
      { top:'88%', dur:'15s', delay:'1s',   color:'rgba(99,102,241,0.18)' },
    ].map((b,i) => (
      <div key={i} className="absolute left-0 right-0 overflow-hidden" style={{ top:b.top, height:'1px' }}>
        <div style={{
          position:'absolute', top:0, left:0, width:'28%', height:'100%',
          background:`linear-gradient(90deg, transparent 0%, ${b.color} 40%, ${b.color} 60%, transparent 100%)`,
          animation:`shimmerH ${b.dur} ease-in-out infinite`,
          animationDelay: b.delay
        }} />
      </div>
    ))}

    {/* ── Soft edge vignette ── */}
    <div className="absolute inset-0" style={{
      background:'radial-gradient(ellipse 95% 95% at 50% 50%, transparent 50%, rgba(244,248,255,0.5) 80%, rgba(244,248,255,0.82) 100%)'
    }} />
  </div>
);

const About = () => {
  // State for the interactive Specializations section
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
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white shadow-sm">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase font-mono">
                  About 1TecHub
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Technology Has No Borders. Neither Should Innovation.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                We are your strategic partner in digital transformation, bringing together global expertise, governance excellence, and market expansion capabilities to drive your success.
              </p>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-square max-w-lg mx-auto lg:ml-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2064&auto=format&fit=crop" 
                  alt="Abstract Technology" 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
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
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                What Makes Us Unique
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium">
                Integrating international best practices with regional insights to drive measurable business impact.
            </p>
            </div>

            <div className="space-y-16 lg:space-y-24">
            {uniquePoints.map((point, idx) => {
                const isOdd = idx % 2 !== 0;

                return (
                <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-center gap-8 lg:gap-16 group ${
                    isOdd ? "md:flex-row-reverse" : ""
                    }`}
                >
                    {/* ── Image ── */}
                    <div className="w-full md:w-1/2">
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 border border-slate-100">
                        <img
                        src={point.image}
                        alt={point.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    </div>

                    {/* ── Text ── */}
                    <div className="w-full md:w-1/2 relative">
                    {/* Ghost number */}
                    <div className="absolute -top-12 -left-4 text-[8rem] lg:text-[10rem] font-extrabold leading-none select-none -z-10 text-slate-100 group-hover:text-blue-50 transition-colors duration-500">
                        {point.num}
                    </div>

                    <span className="text-[11px] font-black tracking-[0.3em] uppercase text-blue-400 mb-4 block">
                        {String(idx + 1).padStart(2, "0")} / {String(uniquePoints.length).padStart(2, "0")}
                    </span>

                    <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight">
                        {point.title}
                    </h3>

                    <div className="w-10 h-[3px] bg-blue-500 rounded-full mb-5" />

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

        {/* --- INTERACTIVE CORE SPECIALIZATIONS --- */}
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Interactive List */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-32 space-y-4">
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Core Specializations</h2>
                <p className="text-slate-500 font-medium mt-4">Hover or tap to explore our globally delivered capabilities.</p>
              </div>
              
              <div className="flex flex-col gap-2">
                {specializations.map((spec, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveSpec(idx)}
                    onClick={() => setActiveSpec(idx)}
                    className={`text-left text-base lg:text-lg font-bold py-4 px-6 rounded-2xl transition-all duration-300 border ${
                      activeSpec === idx
                        ? 'bg-white border-blue-200 text-blue-700 shadow-md lg:translate-x-2'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50'
                    }`}
                  >
                    {spec.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Display Box */}
            <div className="w-full lg:w-7/12">
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl shadow-blue-900/5 transition-all duration-500 relative overflow-hidden min-h-[350px] lg:min-h-[480px] flex flex-col justify-center group">
                
                {/* Decorative Background Blurs */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-[80px] group-hover:bg-blue-100 transition-colors duration-700"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-50/50 rounded-full blur-[80px] transition-colors duration-700"></div>

                <div className="relative z-10">
                  {(() => {
                    const activeData = specializations[activeSpec];
                    const ActiveIcon = activeData.icon;
                    return (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeSpec}>
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                          <ActiveIcon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                          {activeData.title}
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-medium leading-relaxed mb-10">
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
          <div className="bg-[#0a1128] pt-24 pb-40 px-6 text-center relative overflow-hidden">
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