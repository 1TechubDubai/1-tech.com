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
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#f8fafc] pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{
        backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }}
    ></div>
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-400/5 blur-[120px] animate-pulse mix-blend-multiply"></div>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-cyan-400/5 blur-[120px] animate-pulse mix-blend-multiply" style={{ animationDelay: '2s' }}></div>
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