import React, {useEffect} from 'react';
import Navbar from "../components/Navbar";
import MessageForm from "../components/MessageForm";
import Footer from "../components/Footer";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  FileText, 
  Rocket 
} from 'lucide-react';

// Subtle ambient background to match the new brand identity
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#fafbfc] pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{
        backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }}
    ></div>
    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[120px] animate-pulse mix-blend-multiply"></div>
    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-400/10 blur-[120px] animate-pulse mix-blend-multiply" style={{ animationDelay: '2s' }}></div>
  </div>
);

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen flex flex-col relative bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Import Syne font if not already in your global CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
      ` }} />
      
      <AmbientBackground />
      <Navbar />

      {/* --- MAIN CONTENT WRAPPER --- */}
      <main className="flex-grow relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        
        {/* Top Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Text & Contact Details */}
          <div className="space-y-12">
            
            {/* Heading Group */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-700 uppercase font-mono">
                  Get In Touch
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
                Let's Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Future Together.
                </span>
              </h1>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
                Ready to start your autonomous revolution? Reach out to our Dubai HQ 
                to discuss your strategic goals.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-8">
              
              {/* Phone */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <Phone size={24} className="transition-transform group-hover:scale-110" />
                </div>
                <div className="pt-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</h4>
                  <p className="text-lg font-bold text-slate-900">+971 56 800 1040</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <Mail size={24} className="transition-transform group-hover:scale-110" />
                </div>
                <div className="pt-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</h4>
                  <a href="mailto:contactus@1techub.com"                 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    contactus@1techub.com
                  </a>
                </div>
              </div>

              {/* Headquarters */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md shrink-0">
                  <MapPin size={24} className="transition-transform group-hover:scale-110" />
                </div>
                <div className="pt-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Headquarters</h4>
                  <p className="text-lg font-bold text-slate-900 leading-snug">
                    Meydan Grand Stand, 6th Floor,<br/>
                    Meydan Road, Dubai, UAE
                  </p>
                </div>
              </div>
            </div>

            {/* Stylized Map Placeholder */}
            <div 
              onClick={() => window.open("https://share.google/FnUDnFxS1Fl9TTk8R", "_blank")} 
              className="relative h-56 w-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Light Tech Grid */}
              <div className="absolute inset-0 opacity-30" 
                   style={{
                     backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', 
                     backgroundSize: '40px 40px'
                   }}>
              </div>
              
              {/* Location Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full animate-ping absolute opacity-60"></div>
                <div className="relative w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white text-white shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={18} />
                </div>
                <div className="mt-3 bg-white px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 border border-slate-200 shadow-sm tracking-wide">
                  Meydan Grand Stand
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Message Form */}
          <div className="relative lg:mt-8">
            {/* Form Wrapper - Forces a clean white container around the MessageForm */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-blue-900/5 p-2 sm:p-4">
              <MessageForm />
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION: PROCESS STEPS --- */}
        <div className="mt-32 pt-20 border-t border-slate-200 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              What to expect when you reach out.
            </h2>
            <p className="text-slate-500 font-medium">A streamlined process designed for rapid execution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-slate-200 -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-6 group-hover:border-blue-400 group-hover:bg-blue-50 group-hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Initial Discovery</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs font-medium">
                We listen to your challenges and identify immediate AI opportunities tailored to your business.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-6 group-hover:border-blue-400 group-hover:bg-blue-50 group-hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Strategic Roadmap</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs font-medium">
                We present a tailored architecture and implementation plan designed for scale.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-6 group-hover:border-blue-400 group-hover:bg-blue-50 group-hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <Rocket size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Agile Launch</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs font-medium">
                We deploy your pilot within weeks, not months, ensuring rapid time-to-value.
              </p>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Contact;