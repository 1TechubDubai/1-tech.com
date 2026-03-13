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
        0%, 100% { opacity: 0.055; }
        50%       { opacity: 0.1; }
      }
      @keyframes shimmerH {
        0%   { transform: translateX(-110%); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { transform: translateX(110vw); opacity: 0; }
      }
      @keyframes nodePulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50%       { opacity: 0.85; transform: scale(1.7); }
      }
      .ad1 { animation: ambDrift1 22s ease-in-out infinite; }
      .ad2 { animation: ambDrift2 28s ease-in-out infinite; animation-delay: -9s; }
      .ad3 { animation: ambDrift3 19s ease-in-out infinite; animation-delay: -5s; }
      .ad4 { animation: ambDrift1 25s ease-in-out infinite; animation-delay: -13s; }
      .ad5 { animation: ambDrift2 32s ease-in-out infinite; animation-delay: -17s; }
      .gb  { animation: gridBreathe 9s ease-in-out infinite; }
    `}</style>

    {/* ── Base canvas: warm white → very pale mint → soft sky ── */}
    <div className="absolute inset-0" style={{
      background: `linear-gradient(160deg,
        #f0fdf8 0%,
        #f8fffc 15%,
        #f0f9ff 35%,
        #fafffe 55%,
        #ecfdf5 70%,
        #eff6ff 85%,
        #f0fdfa 100%
      )`
    }} />

    {/* ── Orb 1: Top-left — emerald-green ── */}
    <div className="ad1 absolute -top-[18%] -left-[12%]" style={{
      width: 'clamp(380px, 58vw, 780px)',
      height: 'clamp(380px, 58vw, 780px)',
      background: 'radial-gradient(ellipse at 45% 45%, rgba(52,211,153,0.38) 0%, rgba(16,185,129,0.18) 35%, rgba(110,231,183,0.08) 60%, transparent 78%)',
      filter: 'blur(38px)',
      borderRadius: '50%',
    }} />

    {/* ── Orb 2: Top-right — sky blue ── */}
    <div className="ad2 absolute -top-[12%] -right-[14%]" style={{
      width: 'clamp(340px, 52vw, 720px)',
      height: 'clamp(340px, 52vw, 720px)',
      background: 'radial-gradient(ellipse at 55% 40%, rgba(56,189,248,0.38) 0%, rgba(14,165,233,0.2) 38%, rgba(103,232,249,0.08) 62%, transparent 80%)',
      filter: 'blur(44px)',
      borderRadius: '50%',
    }} />

    {/* ── Orb 3: Center — teal bridge ── */}
    <div className="ad3 absolute top-[30%] left-[22%]" style={{
      width: 'clamp(280px, 44vw, 620px)',
      height: 'clamp(280px, 44vw, 620px)',
      background: 'radial-gradient(ellipse at 50% 50%, rgba(20,184,166,0.28) 0%, rgba(6,182,212,0.14) 42%, rgba(45,212,191,0.06) 65%, transparent 80%)',
      filter: 'blur(50px)',
      borderRadius: '50%',
    }} />

    {/* ── Orb 4: Bottom-left — green ── */}
    <div className="ad4 absolute -bottom-[16%] -left-[8%]" style={{
      width: 'clamp(360px, 55vw, 760px)',
      height: 'clamp(360px, 55vw, 760px)',
      background: 'radial-gradient(ellipse at 40% 55%, rgba(74,222,128,0.32) 0%, rgba(34,197,94,0.16) 38%, rgba(134,239,172,0.07) 62%, transparent 80%)',
      filter: 'blur(42px)',
      borderRadius: '50%',
    }} />

    {/* ── Orb 5: Bottom-right — blue ── */}
    <div className="ad5 absolute -bottom-[10%] -right-[10%]" style={{
      width: 'clamp(300px, 46vw, 660px)',
      height: 'clamp(300px, 46vw, 660px)',
      background: 'radial-gradient(ellipse at 55% 55%, rgba(59,130,246,0.32) 0%, rgba(37,99,235,0.16) 38%, rgba(147,197,253,0.07) 62%, transparent 80%)',
      filter: 'blur(46px)',
      borderRadius: '50%',
    }} />

    {/* ── Dot grid ── */}
    <div className="gb absolute inset-0" style={{
      backgroundImage: 'radial-gradient(rgba(15,118,110,0.45) 1.2px, transparent 1.2px)',
      backgroundSize: '34px 34px',
    }} />

    {/* ── Subtle diagonal line texture ── */}
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.032 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diagC" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0L0 56" stroke="#065f46" strokeWidth="0.7" fill="none"/>
          <path d="M0 0L56 56" stroke="#1d4ed8" strokeWidth="0.4" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagC)" />
    </svg>

    {/* ── Shimmer scan lines ── */}
    {[
      { top: '20%', dur: '10s', delay: '0s',   color: 'rgba(52,211,153,0.28)'  },
      { top: '48%', dur: '13s', delay: '3.5s', color: 'rgba(56,189,248,0.24)' },
      { top: '74%', dur: '9s',  delay: '7s',   color: 'rgba(20,184,166,0.22)' },
    ].map((b, i) => (
      <div key={i} className="absolute left-0 right-0" style={{ top: b.top, height: '1px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '28%', height: '100%',
          background: `linear-gradient(90deg, transparent 0%, ${b.color} 40%, ${b.color} 60%, transparent 100%)`,
          animation: `shimmerH ${b.dur} ease-in-out infinite`,
          animationDelay: b.delay,
        }} />
      </div>
    ))}

    {/* ── Node constellation: top-right ── */}
    <svg className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[480px] max-h-[480px]"
      viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
      {[
        [70,45,'#34d399'],[180,80,'#38bdf8'],[310,40,'#2dd4bf'],
        [420,120,'#34d399'],[140,185,'#38bdf8'],[280,170,'#34d399'],
        [410,230,'#2dd4bf'],[60,295,'#38bdf8'],[210,300,'#34d399'],
      ].map(([x,y,c],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill={c} opacity="0.1"
            style={{ animation: `nodePulse ${4+(i%4)}s ease-in-out infinite`, animationDelay: `${i*0.5}s` }}/>
          <circle cx={x} cy={y} r="2.5" fill={c} opacity="0.65"
            style={{ filter: `drop-shadow(0 0 4px ${c})` }}/>
        </g>
      ))}
      {[
        [70,45,180,80],[180,80,310,40],[310,40,420,120],[180,80,140,185],
        [310,40,280,170],[420,120,410,230],[140,185,280,170],[280,170,410,230],
        [60,295,140,185],[140,185,210,300],[280,170,210,300],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(52,211,153,0.14)" strokeWidth="0.8"/>
      ))}
    </svg>

    {/* ── Node constellation: bottom-left ── */}
    <svg className="absolute bottom-0 left-0 w-[36vw] h-[36vw] max-w-[420px] max-h-[420px]"
      viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'scaleX(-1) scaleY(-1)' }}>
      {[
        [55,35,'#38bdf8'],[155,70,'#34d399'],[275,38,'#2dd4bf'],
        [380,110,'#38bdf8'],[110,165,'#34d399'],[255,150,'#38bdf8'],
        [370,210,'#2dd4bf'],[45,265,'#34d399'],[200,270,'#38bdf8'],
      ].map(([x,y,c],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" fill={c} opacity="0.1"
            style={{ animation: `nodePulse ${5+(i%3)}s ease-in-out infinite`, animationDelay: `${i*0.65}s` }}/>
          <circle cx={x} cy={y} r="2.2" fill={c} opacity="0.6"
            style={{ filter: `drop-shadow(0 0 3px ${c})` }}/>
        </g>
      ))}
      {[
        [55,35,155,70],[155,70,275,38],[275,38,380,110],[155,70,110,165],
        [275,38,255,150],[380,110,370,210],[110,165,255,150],[255,150,370,210],
        [45,265,110,165],[110,165,200,270],[255,150,200,270],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(56,189,248,0.13)" strokeWidth="0.8"/>
      ))}
    </svg>

    {/* ── Soft edge vignette ── */}
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 88% 88% at 50% 50%, transparent 48%, rgba(240,253,250,0.45) 78%, rgba(240,249,255,0.72) 100%)'
    }} />
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