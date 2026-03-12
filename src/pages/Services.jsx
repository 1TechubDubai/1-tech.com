import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// Import your centralized data here! 
// Adjust the path if your file is located somewhere else.
import { servicesData } from "../Data/ServicesData.js";

import { 
  ChevronRight,
  CheckCircle2,
  ArrowRight
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
  
  // Default to the first service in your imported data
  const [activeService, setActiveService] = useState(servicesData[0]);

  // Handle incoming navigation (e.g., if clicked from the Home page)
  useEffect(() => {
    if (location.pathname.includes('/services/')) {
      const slug = location.pathname.split('/').pop();
      const matchedService = servicesData.find(s => s.id === slug);
      if (matchedService) {
        setActiveService(matchedService);
      }
    }
  }, [location]);

  // Automatically scroll to top when switching services
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeService]);

  // Handle routing CTA click with pre-filled state to MessageForm
  const handleConsultationClick = () => {
    navigate('/contact', { 
      state: { 
        selectedService: activeService.title,
        prefilledMessage: `Hi team,\n\nI would like to speak with an architect regarding ${activeService.title}.\n\nPlease let me know the next steps.`
      } 
    });
  };

  // Safe fallback if data hasn't loaded
  if (!activeService) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900">
      <AmbientBackground />
      <Navbar />

      {/* CRITICAL LAYOUT FIX: 
        `items-start` ensures the flex children don't stretch to equal height. 
        This is required for the sticky sidebar to work properly.
      */}
      <main className="flex-grow pt-24 pb-20 relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-8">
        
        {/* --- SIDEBAR --- */}
        <aside className="
          w-full lg:w-1/4 shrink-0 
          lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] /* Sticky & Height restrictions */
          lg:overflow-y-auto custom-scrollbar /* Allows internal scrolling if list gets long */
          border-b lg:border-b-0 lg:border-r border-slate-200 
          pb-6 lg:pb-12 lg:pr-6 z-20 
          bg-[#f8fafc] lg:bg-transparent
        ">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 ml-2">
            Our Capabilities
          </h4>
          
          {/* Scrollable list on mobile, vertical stack on desktop */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar snap-x">
            {servicesData.map((service) => {
              const isActive = activeService.id === service.id;
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveService(service);
                    // Optional: update URL silently for shareability without full reload
                    window.history.pushState(null, '', `/services/${service.id}`);
                  }}
                  className={`
                    flex items-center text-left w-64 lg:w-full shrink-0 snap-start
                    p-4 rounded-2xl transition-all duration-300 border
                    ${isActive 
                      ? 'bg-white border-blue-500 shadow-[0_8px_30px_-12px_rgba(59,130,246,0.3)] lg:border-l-4 lg:border-l-blue-600' 
                      : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm'}
                  `}
                >
                  {Icon && (
                    <Icon 
                      size={20} 
                      className={`shrink-0 mr-4 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`} 
                    />
                  )}
                  <span className={`text-sm font-bold flex-grow transition-colors pr-2 ${isActive ? 'text-blue-700' : 'text-slate-600'}`}>
                    {service.sidebarTitle}
                  </span>
                  <ChevronRight 
                    size={16} 
                    className={`shrink-0 transition-all ${isActive ? 'text-blue-600 translate-x-0 opacity-100' : 'text-slate-300 -translate-x-2 opacity-0 lg:opacity-100 lg:translate-x-0'}`} 
                  />
                </button>
              );
            })}
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <section className="w-full lg:w-3/4 flex flex-col space-y-12 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeService.id}>
          
          {/* Cover Image (Reduced Size) */}
          <div className="w-full h-48 md:h-64 lg:h-80 rounded-[2rem] overflow-hidden relative shadow-sm border border-slate-200 bg-slate-100">
            <img 
              src={activeService.coverImage} 
              alt={activeService.title} 
              className="w-full h-full object-cover object-center"
            />
            {/* Inner shadow/overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center shadow-lg">
                {activeService.icon && <activeService.icon size={24} className="text-white" />}
              </div>
              <div className="text-white font-bold tracking-widest text-xs uppercase opacity-80 hidden sm:block">
                {activeService.sidebarTitle}
              </div>
            </div>
          </div>

          {/* Header Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
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
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Our Capabilities & Solutions</h2>
                <p className="text-slate-500 font-medium">Comprehensive services backed by enterprise-grade frameworks.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeService.portfolio.map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group flex flex-col h-full">
                    <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                    <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed flex-grow">{item.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-3 py-1.5 bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-100 transition-colors text-xs font-bold rounded-md border border-slate-100">
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
            <div className="space-y-6 pt-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">The 1TecHub Advantage</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeService.benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:border-blue-200 transition-colors group">
                    <div className="mt-1 bg-blue-50 rounded-full p-1.5 group-hover:bg-blue-600 transition-colors shrink-0">
                      <CheckCircle2 size={18} className="text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1">{benefit.title}</h4>
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Banner */}
          <div className="mt-12 w-full bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#0a192f] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            {/* Decorative background glows */}
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
              className="relative z-10 shrink-0 bg-white text-blue-900 font-bold py-4 px-8 rounded-full flex items-center gap-2 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl group"
            >
              Speak to an Architect
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </section>
      </main>

      <Footer />

      {/* Essential Custom Scrollbar CSS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Sidebar desktop scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; /* slate-300 */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; /* slate-400 */
        }
      `}</style>
    </div>
  );
};

export default Services;