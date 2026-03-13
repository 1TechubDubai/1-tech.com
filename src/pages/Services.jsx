import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { servicesData } from "../Data/ServicesData.js";

import { 
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  ChevronsRight
} from 'lucide-react';

// --- SUBTLE BACKGROUND ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes sd1 {
        0%, 100% { transform: translate(0,0) scale(1); }
        33%  { transform: translate(35px,-45px) scale(1.07); }
        66%  { transform: translate(-20px,20px) scale(0.95); }
      }
      @keyframes sd2 {
        0%, 100% { transform: translate(0,0) scale(1); }
        40%  { transform: translate(-40px,30px) scale(1.08); }
        70%  { transform: translate(28px,-35px) scale(0.94); }
      }
      @keyframes sd3 {
        0%, 100% { transform: translate(0,0) scale(1); }
        35%  { transform: translate(22px,40px) scale(1.05); }
        70%  { transform: translate(-30px,-18px) scale(0.96); }
      }
      @keyframes gbr {
        0%, 100% { opacity: 0.04; }
        50%       { opacity: 0.075; }
      }
      @keyframes smH {
        0%   { transform: translateX(-110%); opacity: 0; }
        12%  { opacity: 1; }
        88%  { opacity: 1; }
        100% { transform: translateX(110vw); opacity: 0; }
      }
      @keyframes np {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50%       { opacity: 0.6; transform: scale(1.8); }
      }
      .sd1 { animation: sd1 24s ease-in-out infinite; }
      .sd2 { animation: sd2 30s ease-in-out infinite; animation-delay: -10s; }
      .sd3 { animation: sd3 20s ease-in-out infinite; animation-delay: -6s; }
      .sd4 { animation: sd1 27s ease-in-out infinite; animation-delay: -14s; }
      .sd5 { animation: sd2 34s ease-in-out infinite; animation-delay: -19s; }
      .gbr { animation: gbr 10s ease-in-out infinite; }
    `}</style>

    {/* Base — very warm white with the faintest violet-rose tint */}
    <div className="absolute inset-0" style={{
      background: `linear-gradient(150deg,
        #fdf8ff 0%,
        #fff9fb 18%,
        #fef3f8 35%,
        #fff8fd 52%,
        #f8f0ff 68%,
        #fdf4ff 82%,
        #fff5f9 100%
      )`
    }} />

    {/* Orb 1: top-left — soft rose */}
    <div className="sd1 absolute -top-[16%] -left-[10%]" style={{
      width: 'clamp(320px, 50vw, 680px)',
      height: 'clamp(320px, 50vw, 680px)',
      background: 'radial-gradient(ellipse at 45% 45%, rgba(251,113,133,0.14) 0%, rgba(244,63,94,0.07) 38%, rgba(253,164,175,0.03) 62%, transparent 78%)',
      filter: 'blur(52px)', borderRadius: '50%',
    }} />

    {/* Orb 2: top-right — lavender */}
    <div className="sd2 absolute -top-[10%] -right-[12%]" style={{
      width: 'clamp(300px, 46vw, 640px)',
      height: 'clamp(300px, 46vw, 640px)',
      background: 'radial-gradient(ellipse at 55% 40%, rgba(167,139,250,0.16) 0%, rgba(139,92,246,0.08) 38%, rgba(196,181,253,0.03) 62%, transparent 80%)',
      filter: 'blur(56px)', borderRadius: '50%',
    }} />

    {/* Orb 3: center — mauve bridge */}
    <div className="sd3 absolute top-[32%] left-[24%]" style={{
      width: 'clamp(260px, 40vw, 560px)',
      height: 'clamp(260px, 40vw, 560px)',
      background: 'radial-gradient(ellipse at 50% 50%, rgba(217,70,239,0.08) 0%, rgba(192,132,252,0.05) 44%, transparent 72%)',
      filter: 'blur(60px)', borderRadius: '50%',
    }} />

    {/* Orb 4: bottom-left — fuchsia-pink */}
    <div className="sd4 absolute -bottom-[14%] -left-[8%]" style={{
      width: 'clamp(340px, 52vw, 720px)',
      height: 'clamp(340px, 52vw, 720px)',
      background: 'radial-gradient(ellipse at 40% 55%, rgba(236,72,153,0.13) 0%, rgba(219,39,119,0.06) 38%, rgba(249,168,212,0.03) 62%, transparent 80%)',
      filter: 'blur(50px)', borderRadius: '50%',
    }} />

    {/* Orb 5: bottom-right — violet */}
    <div className="sd5 absolute -bottom-[10%] -right-[10%]" style={{
      width: 'clamp(280px, 44vw, 620px)',
      height: 'clamp(280px, 44vw, 620px)',
      background: 'radial-gradient(ellipse at 55% 55%, rgba(147,51,234,0.12) 0%, rgba(126,34,206,0.06) 38%, rgba(216,180,254,0.03) 62%, transparent 80%)',
      filter: 'blur(54px)', borderRadius: '50%',
    }} />

    {/* Dot grid — rose tinted */}
    <div className="gbr absolute inset-0" style={{
      backgroundImage: 'radial-gradient(rgba(159,18,57,0.3) 1.1px, transparent 1.1px)',
      backgroundSize: '34px 34px',
    }} />

    {/* Diagonal texture */}
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.025 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diagR" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0L0 56" stroke="#9d174d" strokeWidth="0.7" fill="none"/>
          <path d="M0 0L56 56" stroke="#6d28d9" strokeWidth="0.4" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagR)" />
    </svg>

    {/* Shimmer lines */}
    {[
      { top: '22%', dur: '11s', delay: '0s',   color: 'rgba(251,113,133,0.2)'  },
      { top: '51%', dur: '14s', delay: '4s',   color: 'rgba(167,139,250,0.18)' },
      { top: '76%', dur: '10s', delay: '7.5s', color: 'rgba(236,72,153,0.16)'  },
    ].map((b, i) => (
      <div key={i} className="absolute left-0 right-0" style={{ top: b.top, height: '1px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '24%', height: '100%',
          background: `linear-gradient(90deg, transparent, ${b.color} 40%, ${b.color} 60%, transparent)`,
          animation: `smH ${b.dur} ease-in-out infinite`,
          animationDelay: b.delay,
        }} />
      </div>
    ))}

    {/* Constellation: top-right */}
    <svg className="absolute top-0 right-0 w-[38vw] h-[38vw] max-w-[440px] max-h-[440px]"
      viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
      {[
        [65,42,'#f472b6'],[170,75,'#c084fc'],[295,38,'#f472b6'],
        [395,115,'#c084fc'],[130,178,'#a78bfa'],[265,162,'#f472b6'],
        [385,218,'#c084fc'],[55,278,'#a78bfa'],[200,285,'#f472b6'],
      ].map(([x,y,c],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" fill={c} opacity="0.1"
            style={{ animation: `np ${4+(i%4)}s ease-in-out infinite`, animationDelay: `${i*0.5}s` }}/>
          <circle cx={x} cy={y} r="2.2" fill={c} opacity="0.5"
            style={{ filter: `drop-shadow(0 0 3px ${c})` }}/>
        </g>
      ))}
      {[[65,42,170,75],[170,75,295,38],[295,38,395,115],[170,75,130,178],
        [295,38,265,162],[395,115,385,218],[130,178,265,162],[265,162,385,218],
        [55,278,130,178],[130,178,200,285],[265,162,200,285]
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(244,114,182,0.12)" strokeWidth="0.7"/>
      ))}
    </svg>

    {/* Constellation: bottom-left (mirrored) */}
    <svg className="absolute bottom-0 left-0 w-[32vw] h-[32vw] max-w-[380px] max-h-[380px]"
      viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'scaleX(-1) scaleY(-1)' }}>
      {[
        [50,32,'#c084fc'],[140,65,'#f472b6'],[255,34,'#a78bfa'],
        [355,105,'#c084fc'],[100,155,'#f472b6'],[235,142,'#c084fc'],
        [345,198,'#a78bfa'],[42,248,'#f472b6'],[185,255,'#c084fc'],
      ].map(([x,y,c],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill={c} opacity="0.1"
            style={{ animation: `np ${5+(i%3)}s ease-in-out infinite`, animationDelay: `${i*0.65}s` }}/>
          <circle cx={x} cy={y} r="2" fill={c} opacity="0.45"
            style={{ filter: `drop-shadow(0 0 3px ${c})` }}/>
        </g>
      ))}
      {[[50,32,140,65],[140,65,255,34],[255,34,355,105],[140,65,100,155],
        [255,34,235,142],[355,105,345,198],[100,155,235,142],[235,142,345,198],
        [42,248,100,155],[100,155,185,255],[235,142,185,255]
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(192,132,252,0.11)" strokeWidth="0.7"/>
      ))}
    </svg>

    {/* Edge vignette */}
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(253,244,255,0.4) 80%, rgba(255,245,249,0.7) 100%)'
    }} />
  </div>
);

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  const [activeService, setActiveService] = useState(servicesData[0]);
  const contentRef = useRef(null); // Used to scroll to content on mobile

  // Handle incoming navigation from URLs
  useEffect(() => {
    if (id) {
      const matchedService = servicesData.find(s => s.id === id);
      if (matchedService) {
        setActiveService(matchedService);
      } else {
        setActiveService(servicesData[0]);
      }
    }
  }, [id]);

  // Automatically scroll to top on initial load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleServiceSelect = (service) => {
    setActiveService(service);
    window.history.pushState(null, '', `/services/${service.id}`);
    
    // Smart Scrolling:
    // On mobile, scroll to the content section so it sits right under the sticky nav.
    // On desktop, scroll to the very top.
    if (window.innerWidth < 1024 && contentRef.current) {
      const yOffset = contentRef.current.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConsultationClick = () => {
    navigate('/contact', { 
      state: { 
        selectedService: activeService.title,
        prefilledMessage: `Hi team,\n\nI would like to speak with an architect regarding ${activeService.title}.\n\nPlease let me know the next steps.`
      } 
    });
  };

  if (!activeService) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900">
      <AmbientBackground />
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-32 pb-20 relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-0 lg:gap-12 items-start mt-4 lg:mt-8">
        
        {/* --- STICKY SIDEBAR / MOBILE NAVIGATION --- */}
        <aside className="
          w-[calc(100%+2rem)] -ml-4 sm:w-[calc(100%+3rem)] sm:-ml-6 lg:w-1/4 lg:ml-0 shrink-0 
          sticky top-[80px] sm:top-[75px] lg:top-35 z-40 
          bg-[#f8fafc]/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none
          border-b lg:border-b-0 lg:border-r border-slate-200 
          pt-4 pb-3 lg:py-0 lg:pb-12 
          px-4 sm:px-6 lg:px-0 lg:pr-6 
          mb-8 lg:mb-0 shadow-sm lg:shadow-none
          lg:h-[calc(100vh-8rem)] lg:overflow-y-auto custom-scrollbar
        ">
          <div className="flex items-center justify-between mb-4 lg:mb-6 ml-1 lg:ml-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Our Capabilities
            </h4>
            {/* Visual cue for mobile: Swipe Indicator */}
            <div className="lg:hidden flex items-center gap-1 text-[10px] font-bold text-blue-500 uppercase tracking-wider animate-pulse bg-blue-50 px-2 py-1 rounded-full">
              Swipe <ChevronsRight size={12} />
            </div>
          </div>
          
          <div className="relative w-full">
            {/* Scrollable List */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar snap-x relative z-10">
              {servicesData.map((service) => {
                const isActive = activeService.id === service.id;
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className={`
                      flex items-center text-left w-[260px] sm:w-[280px] lg:w-full shrink-0 snap-start
                      p-3.5 lg:p-4 rounded-2xl transition-all duration-300 border
                      ${isActive 
                        ? 'bg-white border-blue-500 shadow-md lg:shadow-[0_8px_30px_-12px_rgba(59,130,246,0.3)] lg:border-l-4 lg:border-l-blue-600' 
                        : 'bg-white/50 lg:bg-transparent border-slate-200 lg:border-transparent hover:bg-white hover:border-slate-300 hover:shadow-sm'}
                    `}
                  >
                    {Icon && (
                      <Icon 
                        size={20} 
                        className={`shrink-0 mr-3 lg:mr-4 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`} 
                      />
                    )}
                    <span className={`text-xs lg:text-sm font-bold flex-grow transition-colors pr-2 leading-tight ${isActive ? 'text-blue-700' : 'text-slate-600'}`}>
                      {service.sidebarTitle}
                    </span>
                    <ChevronRight 
                      size={16} 
                      className={`shrink-0 transition-all hidden lg:block ${isActive ? 'text-blue-600 translate-x-0 opacity-100' : 'text-slate-300 -translate-x-2 opacity-0 lg:opacity-100 lg:translate-x-0'}`} 
                    />
                  </button>
                );
              })}
              {/* Spacer element to ensure the last mobile item isn't hidden under the fade gradient */}
              <div className="w-8 shrink-0 lg:hidden block"></div>
            </div>

            {/* Mobile Right Edge Fade Gradient - Fixed to sit flush against the right edge */}
            <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/80 to-transparent pointer-events-none lg:hidden z-20"></div>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <section 
          ref={contentRef}
          className="w-full lg:w-3/4 flex flex-col space-y-10 lg:space-y-12 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-32" 
          key={activeService.id}
        >
          
          {/* Cover Image */}
          <div className="w-full h-48 md:h-64 lg:h-80 rounded-[2rem] overflow-hidden relative shadow-sm border border-slate-200 bg-slate-100 group">
            <img 
              src={activeService.coverImage} 
              alt={activeService.title} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center shadow-lg">
                {activeService.icon && <activeService.icon size={24} className="text-white" />}
              </div>
              <div className="text-white font-bold tracking-widest text-xs uppercase opacity-90 hidden sm:block shadow-sm">
                {activeService.sidebarTitle}
              </div>
            </div>
          </div>

          {/* Header Content */}
          <div className="space-y-5 lg:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              {activeService.title}
            </h1>
            <h3 className="text-lg md:text-xl font-bold text-blue-600">
              {activeService.subtitle}
            </h3>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              {activeService.description}
            </p>
          </div>

          {/* Portfolio Grid */}
          {activeService.portfolio && activeService.portfolio.length > 0 && (
            <div className="space-y-6">
              <div className="mb-6 lg:mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Our Capabilities & Solutions</h2>
                <p className="text-slate-500 font-medium">Comprehensive services backed by enterprise-grade frameworks.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                {activeService.portfolio.map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group flex flex-col h-full">
                    <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                    <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed flex-grow">{item.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-3 py-1.5 bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-100 transition-colors text-[11px] font-bold rounded-md border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why Choose Us / Benefits Grid */}
          {activeService.benefits && activeService.benefits.length > 0 && (
            <div className="space-y-6 pt-4 lg:pt-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 lg:mb-6">The 1TecHub Advantage</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {activeService.benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6 flex items-start gap-4 shadow-sm hover:border-blue-200 transition-colors group">
                    <div className="mt-0.5 bg-blue-50 rounded-full p-1.5 group-hover:bg-blue-600 transition-colors shrink-0">
                      <CheckCircle2 size={16} className="text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1.5">{benefit.title}</h4>
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Banner */}
          <div className="mt-12 w-full bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#0a192f] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 text-center md:text-left space-y-3">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Ready to transform your business?
              </h3>
              <p className="text-blue-200 font-medium text-sm md:text-base max-w-xl">
                Partner with us to deploy {activeService.sidebarTitle.toLowerCase()} that drive predictable operations, reduce costs, and accelerate innovation.
              </p>
            </div>

            <button 
              onClick={handleConsultationClick}
              className="relative z-10 shrink-0 w-full sm:w-auto bg-white text-blue-900 font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl group"
            >
              Speak to an Architect
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </section>
      </main>

      <Footer />

      <style>{`
        /* Hide standard scrollbar completely */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Desktop sidebar scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Services;