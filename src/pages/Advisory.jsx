import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Database, Cpu, Settings, Globe, ShieldCheck, ArrowRight, Target, Layers, Sparkles, ChevronRight, TrendingUp, Brain, Share2, Zap, Users, TabletSmartphone, Link2, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- SUBTLE AMBIENT BACKGROUND (Matching Corporate Theme) ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes adv1 {
        0%,100% { transform: translate(0,0) scale(1); }
        30%  { transform: translate(38px,-48px) scale(1.07); }
        65%  { transform: translate(-24px,22px) scale(0.95); }
      }
      @keyframes adv2 {
        0%,100% { transform: translate(0,0) scale(1); }
        35%  { transform: translate(-42px,35px) scale(1.09); }
        70%  { transform: translate(30px,-38px) scale(0.93); }
      }
      @keyframes adv3 {
        0%,100% { transform: translate(0,0) scale(1); }
        40%  { transform: translate(22px,44px) scale(1.06); }
        72%  { transform: translate(-35px,-18px) scale(0.96); }
      }
      @keyframes gridAdv {
        0%,100% { opacity: 0.045; }
        50%      { opacity: 0.085; }
      }
      @keyframes shimAdv {
        0%   { transform: translateX(-110%); opacity: 0; }
        12%  { opacity: 1; }
        88%  { opacity: 1; }
        100% { transform: translateX(110vw); opacity: 0; }
      }
      @keyframes nodeAdv {
        0%,100% { opacity: 0.22; transform: scale(1); }
        50%      { opacity: 0.72; transform: scale(1.9); }
      }
      @keyframes orbitCW  { to { transform: rotate(360deg); } }
      @keyframes orbitCCW { to { transform: rotate(-360deg); } }
      .a1   { animation: adv1 23s ease-in-out infinite; }
      .a2   { animation: adv2 29s ease-in-out infinite; animation-delay: -10s; }
      .a3   { animation: adv3 20s ease-in-out infinite; animation-delay: -6s; }
      .a4   { animation: adv1 26s ease-in-out infinite; animation-delay: -14s; }
      .a5   { animation: adv2 33s ease-in-out infinite; animation-delay: -19s; }
      .gadv { animation: gridAdv 9s ease-in-out infinite; }
      .oCW  { animation: orbitCW  88s linear infinite; }
      .oCCW { animation: orbitCCW 130s linear infinite; }
    `}</style>

    {/* Base — very pale lavender-white, cooler than the original */}
    <div className="absolute inset-0" style={{
      background: `linear-gradient(148deg,
        #f4f5ff 0%,
        #f1f2ff 14%,
        #f5f6ff 28%,
        #f0f2ff 42%,
        #f3f4ff 56%,
        #eef1ff 70%,
        #f2f4ff 84%,
        #f0f3ff 100%
      )`
    }} />

    {/* Secondary luminance layer — gives depth without colour noise */}
    <div className="absolute inset-0" style={{
      background: `
        radial-gradient(ellipse 110% 70% at 65% 15%, rgba(99,102,241,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 90%  75% at 18% 85%, rgba(124,58,237,0.06)  0%, transparent 52%)
      `
    }} />

    {/* Orb 1: top-left — deep royal blue */}
    <div className="a1 absolute -top-[16%] -left-[12%]" style={{
      width: 'clamp(360px, 54vw, 740px)',
      height: 'clamp(360px, 54vw, 740px)',
      background: 'radial-gradient(ellipse at 44% 42%, rgba(37,99,235,0.20) 0%, rgba(29,78,216,0.10) 36%, rgba(147,197,253,0.04) 62%, transparent 78%)',
      filter: 'blur(44px)', borderRadius: '50%',
    }} />

    {/* Orb 2: top-right — violet */}
    <div className="a2 absolute -top-[12%] -right-[12%]" style={{
      width: 'clamp(340px, 50vw, 700px)',
      height: 'clamp(340px, 50vw, 700px)',
      background: 'radial-gradient(ellipse at 56% 38%, rgba(124,58,237,0.18) 0%, rgba(109,40,217,0.09) 38%, rgba(196,181,253,0.04) 62%, transparent 80%)',
      filter: 'blur(48px)', borderRadius: '50%',
    }} />

    {/* Orb 3: centre-right — cool periwinkle */}
    <div className="a3 absolute top-[32%] -right-[8%]" style={{
      width: 'clamp(280px, 42vw, 600px)',
      height: 'clamp(280px, 42vw, 600px)',
      background: 'radial-gradient(ellipse at 55% 50%, rgba(99,102,241,0.17) 0%, rgba(79,70,229,0.08) 40%, rgba(165,180,252,0.04) 65%, transparent 80%)',
      filter: 'blur(50px)', borderRadius: '50%',
    }} />

    {/* Orb 4: centre — slate-blue bridge */}
    <div className="a4 absolute top-[30%] left-[22%]" style={{
      width: 'clamp(260px, 38vw, 540px)',
      height: 'clamp(260px, 38vw, 540px)',
      background: 'radial-gradient(ellipse at 50% 50%, rgba(55,65,181,0.13) 0%, rgba(49,60,170,0.06) 44%, transparent 72%)',
      filter: 'blur(56px)', borderRadius: '50%',
    }} />

    {/* Orb 5: bottom-left — deep sapphire */}
    <div className="a5 absolute -bottom-[15%] -left-[8%]" style={{
      width: 'clamp(360px, 54vw, 750px)',
      height: 'clamp(360px, 54vw, 750px)',
      background: 'radial-gradient(ellipse at 40% 56%, rgba(30,64,175,0.19) 0%, rgba(29,78,216,0.09) 38%, rgba(191,219,254,0.04) 62%, transparent 80%)',
      filter: 'blur(46px)', borderRadius: '50%',
    }} />

    {/* Orb 6: bottom-right — rich violet-indigo */}
    <div className="a1 absolute -bottom-[10%] -right-[10%]" style={{
      width: 'clamp(300px, 46vw, 640px)',
      height: 'clamp(300px, 46vw, 640px)',
      background: 'radial-gradient(ellipse at 55% 55%, rgba(109,40,217,0.17) 0%, rgba(91,33,182,0.08) 38%, rgba(221,214,254,0.04) 62%, transparent 80%)',
      filter: 'blur(50px)', borderRadius: '50%',
    }} />

    {/* Dot grid — deep sapphire */}
    <div className="gadv absolute inset-0" style={{
      backgroundImage: 'radial-gradient(rgba(30,27,120,0.30) 1.2px, transparent 1.2px)',
      backgroundSize: '34px 34px',
    }} />

    {/* Diagonal texture — two blue-violet axes */}
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.028 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="advDiag" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0L0 56" stroke="#3730a3" strokeWidth="0.8" fill="none"/>
          <path d="M0 0L56 56" stroke="#6d28d9" strokeWidth="0.4" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#advDiag)" />
    </svg>

    {/* Shimmer lines — all blue-violet family, two distinct tones */}
    {[
      { top: '18%', dur: '11s', delay: '0s',   color: 'rgba(99,102,241,0.22)'  },
      { top: '44%', dur: '15s', delay: '4s',   color: 'rgba(124,58,237,0.18)'  },
      { top: '68%', dur: '10s', delay: '7.5s', color: 'rgba(37,99,235,0.20)'   },
      { top: '86%', dur: '13s', delay: '2s',   color: 'rgba(79,70,229,0.16)'   },
    ].map((b, i) => (
      <div key={i} className="absolute left-0 right-0" style={{ top: b.top, height: '1px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '25%', height: '100%',
          background: `linear-gradient(90deg, transparent, ${b.color} 40%, ${b.color} 60%, transparent)`,
          animation: `shimAdv ${b.dur} ease-in-out infinite`,
          animationDelay: b.delay,
        }} />
      </div>
    ))}

    {/* Orbit rings */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="oCW absolute" style={{ width: 'min(96vw,980px)', height: 'min(96vw,980px)' }}>
        <svg width="100%" height="100%" viewBox="0 0 980 980">
          <circle cx="490" cy="490" r="460" fill="none"
            stroke="rgba(79,70,229,0.09)" strokeWidth="1" strokeDasharray="5 24"/>
          <circle r="4.5" fill="rgba(99,102,241,0.65)"
            style={{ filter: 'drop-shadow(0 0 5px rgba(99,102,241,0.7))' }}>
            <animateMotion dur="88s" repeatCount="indefinite">
              <mpath href="#advR1"/>
            </animateMotion>
          </circle>
          <path id="advR1" d="M490,30 a460,460 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>
      <div className="oCCW absolute" style={{ width: 'min(64vw,660px)', height: 'min(64vw,660px)' }}>
        <svg width="100%" height="100%" viewBox="0 0 660 660">
          <circle cx="330" cy="330" r="308" fill="none"
            stroke="rgba(124,58,237,0.08)" strokeWidth="0.9" strokeDasharray="3 18"/>
          <circle r="3.5" fill="rgba(139,92,246,0.65)"
            style={{ filter: 'drop-shadow(0 0 5px rgba(139,92,246,0.7))' }}>
            <animateMotion dur="130s" repeatCount="indefinite">
              <mpath href="#advR2"/>
            </animateMotion>
          </circle>
          <path id="advR2" d="M330,22 a308,308 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>
    </div>

    {/* Constellation: top-right — blue/violet nodes, no gold */}
    <svg className="absolute top-0 right-0 w-[42vw] h-[42vw] max-w-[500px] max-h-[500px]"
      viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      {[
        [72,44,'#6366f1'],[188,82,'#818cf8'],[318,40,'#a5b4fc'],
        [438,125,'#6366f1'],[144,192,'#4f46e5'],[285,172,'#7c3aed'],
        [418,238,'#818cf8'],[62,305,'#6366f1'],[215,308,'#a5b4fc'],
        [395,368,'#7c3aed'],
      ].map(([x,y,c],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill={c} opacity="0.11"
            style={{ animation: `nodeAdv ${4+(i%4)}s ease-in-out infinite`, animationDelay: `${i*0.48}s` }}/>
          <circle cx={x} cy={y} r="2.6" fill={c} opacity="0.65"
            style={{ filter: `drop-shadow(0 0 4px ${c})` }}/>
        </g>
      ))}
      {[
        [72,44,188,82],[188,82,318,40],[318,40,438,125],
        [188,82,144,192],[318,40,285,172],[438,125,418,238],
        [144,192,285,172],[285,172,418,238],[62,305,144,192],
        [144,192,215,308],[285,172,215,308],[418,238,395,368],[215,308,395,368],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(99,102,241,0.12)" strokeWidth="0.8"/>
      ))}
    </svg>

    {/* Constellation: bottom-left */}
    <svg className="absolute bottom-0 left-0 w-[36vw] h-[36vw] max-w-[420px] max-h-[420px]"
      viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'scaleX(-1) scaleY(-1)' }}>
      {[
        [58,36,'#818cf8'],[155,68,'#6366f1'],[272,35,'#a5b4fc'],
        [378,108,'#4f46e5'],[112,158,'#7c3aed'],[248,144,'#818cf8'],
        [362,204,'#6366f1'],[46,260,'#a5b4fc'],[196,265,'#7c3aed'],
      ].map(([x,y,c],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" fill={c} opacity="0.10"
            style={{ animation: `nodeAdv ${5+(i%3)}s ease-in-out infinite`, animationDelay: `${i*0.62}s` }}/>
          <circle cx={x} cy={y} r="2.3" fill={c} opacity="0.60"
            style={{ filter: `drop-shadow(0 0 3px ${c})` }}/>
        </g>
      ))}
      {[
        [58,36,155,68],[155,68,272,35],[272,35,378,108],
        [155,68,112,158],[272,35,248,144],[378,108,362,204],
        [112,158,248,144],[248,144,362,204],[46,260,112,158],
        [112,158,196,265],[248,144,196,265],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(124,58,237,0.11)" strokeWidth="0.8"/>
      ))}
    </svg>

    {/* Edge vignette */}
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 48%, rgba(244,245,255,0.40) 78%, rgba(240,243,255,0.70) 100%)'
    }} />
  </div>
);

// --- FRAMER MOTION VARIANTS ---
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const fadeLeft = { 
  hidden: { opacity: 0, x: -40 }, 
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } 
};
const floatingVisual = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
};

/* ─────────────────────────────────────────────
   STRATEGY SECTION
───────────────────────────────────────────── */
const StrategySection = () => {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden w-full">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* LEFT COLUMN – CONTENT */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: '-100px' }} 
            variants={stagger}
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-700 uppercase font-mono">
                Strategic Foundation
              </p>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
              Why Architecture <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Comes First
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-slate-600 text-base md:text-lg mb-10 leading-relaxed max-w-xl font-medium">
              In the race for digital dominance, speed without direction is just expensive chaos. We provide the 
              <span className="font-bold text-slate-900"> robust architecture and roadmap</span>—turning fragmented IT systems into a 
              <span className="text-blue-600 font-bold"> unified, scalable enterprise engine</span>.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { t: "Ecosystem Audit", d: "Deep assessment of your legacy infrastructure and technical debt.", icon: <Database size={20} /> },
                { t: "Seamless Integration", d: "API-led connectivity breaking down enterprise data silos.", icon: <Link2 size={20} /> },
                { t: "Risk & Compliance", d: "Zero-trust security and strict governance guardrails.", icon: <ShieldCheck size={20} /> },
                { t: "Agile Scalability", d: "Deploying tech talent and cloud-native apps built for growth.", icon: <TrendingUp size={20} /> },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  className="group p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                >
                  <h4 className="text-slate-900 font-bold mb-2 flex items-center gap-2">
                    <span className="text-blue-600">{item.icon}</span>
                    {item.t}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {item.d}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN – CLEAN CORPORATE VISUAL */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 relative flex items-center justify-center min-h-[300px] md:min-h-[400px]"
          >
            <motion.div 
              variants={floatingVisual}
              animate="animate"
              className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
            >
              {/* Central Core */}
              <div className="absolute w-32 h-32 bg-blue-100 rounded-full blur-2xl animate-pulse" />
              <div className="relative z-10 w-20 h-20 bg-blue-600 rounded-[2rem] rotate-45 flex items-center justify-center shadow-xl shadow-blue-600/30">
                <Globe className="text-white -rotate-45" size={32} />
              </div>

              {/* Orbiting Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-slate-200 rounded-full"
                  style={{ padding: i * 24 }}
                >
                  <div 
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm
                    ${i === 0 ? 'bg-cyan-400' : i === 1 ? 'bg-blue-500' : 'bg-indigo-400'}`} 
                  />
                </motion.div>
              ))}

              {/* Glowing Tag Cloud (Floating) */}
              <div className="absolute inset-0 pointer-events-none">
                {[
                  { label: "Modernize", top: "5%", left: "10%" },
                  { label: "Secure", bottom: "10%", right: "5%" },
                  { label: "Automate", top: "15%", right: "10%" },
                  { label: "Scale", bottom: "15%", left: "5%" }
                ].map((tag, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, delay: i, repeat: Infinity }}
                    className="absolute px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-blue-700 uppercase tracking-widest shadow-lg shadow-slate-200/50"
                    style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
                  >
                    <Sparkles size={10} className="inline mr-1.5 text-cyan-500" />
                    {tag.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const DigitalTransformation = () => {
  // Ensure page loads at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900">
      
      <AmbientBackground />
      <Navbar />

      <main className="flex-grow relative z-10 pt-32 pb-0">
        
        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <section className="relative flex items-center justify-center pt-10 pb-20 md:pt-16 md:pb-24 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-center flex flex-col items-center"
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-700 uppercase font-mono">
                  Enterprise Transformation Hub
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-8">
                Architecting <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Digital Excellence.
                </span>
              </motion.h1>

              {/* Sub */}
              <motion.p variants={fadeUp}
                className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                We orchestrate your entire technology landscape. From modernizing legacy applications and securing infrastructure to deploying elite talent and autonomous AI workflows.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                <Link 
                  to="/contact"
                  state={{
                    selectedServices: [],
                    prefilledMessage: "Hi Team,\n\nWe are looking for strategic technology advisory to guide our enterprise's digital transformation. We would like to discuss an initial assessment of our ecosystem and map out a high-level architecture roadmap.\n\nPlease let me know the best time to connect with your consulting team."
                  }}
                  className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  Start Your Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/services"
                  className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest text-slate-700 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all flex items-center justify-center">
                  Explore Capabilities
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Separator */}
        <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4" />

        {/* ══════════════════════════════════════
            2. STRATEGY SECTION
        ══════════════════════════════════════ */}
        <StrategySection />
          
        {/* Separator */}
        <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4" />

        {/* ══════════════════════════════════════
            3. THE BLUEPRINT FRAMEWORK
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16 md:mb-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={stagger}>
                <motion.p variants={fadeLeft} className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-4 font-mono">
                  Methodology
                </motion.p>
                <motion.h2 variants={fadeLeft} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  The Transformation <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Blueprint</span>
                </motion.h2>
              </motion.div>
              <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                className="text-slate-600 text-base md:text-lg leading-relaxed font-medium lg:max-w-md lg:justify-self-end">
                Four precision-engineered phases that take you from technical ambiguity to enterprise-wide operational excellence.
              </motion.p>
            </div>

            {/* Steps grid — Z pattern */}
            <div className="space-y-8 md:space-y-12">
              {[
                { n:"01", t:"Discovery & Assessment",  d:"Evaluating existing tech debt, security gaps, and digital readiness across your organization. We audit infrastructure, data pipelines, and workflows.",   icon:<Settings size={24} />,     align:"left" },
                { n:"02", t:"Strategic Architecture",  d:"Designing robust cloud infrastructure, API connectivity layers, and secure governance frameworks tailored to your specific enterprise scale.",       icon:<Layers size={24} />,     align:"right" },
                { n:"03", t:"Agile Execution",         d:"Deploying vetted tech talent and specialized squads to build, modernize, and unify your systems with a zero-disruption rollout approach.",               icon:<Zap size={24} />,      align:"left" },
                { n:"04", t:"Governance & Optimize",   d:"Continuous 24/7 SOC monitoring, IT managed services, and proactive maintenance to ensure your ecosystem stays secure, fast, and compliant.",          icon:<ShieldCheck size={24} />, align:"right" },
              ].map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, x: step.align==='left' ? -40 : 40 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true, margin:'-50px' }}
                  transition={{ duration:0.7, ease:"easeOut" }}
                  className={`flex ${step.align==='right' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="w-full max-w-3xl p-8 md:p-10 rounded-[2rem] relative overflow-hidden group bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-500">
                    
                    {/* Large BG number */}
                    <span className="absolute -top-4 right-4 md:right-8 text-[8rem] md:text-[10rem] font-extrabold leading-none pointer-events-none select-none text-slate-50 transition-colors duration-500 group-hover:text-blue-50">
                      {step.n}
                    </span>
                    
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                    <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                      <div className="flex-shrink-0 p-4 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-transform duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                        {step.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase mb-2 font-mono">Phase {step.n}</p>
                        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3">{step.t}</h3>
                        <p className="text-base text-slate-600 leading-relaxed font-medium">{step.d}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4" />

        {/* ══════════════════════════════════════
            4. ENTERPRISE IMPACT (center grid)
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            
            <div className="text-center mb-16">
              <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-4 font-mono">
                Core Capabilities
              </motion.p>
              <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Enterprise-Wide Impact
              </motion.h2>
            </div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-50px' }} variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon:<Server size={28}/>,           t:"IT Managed Services",  d:"Proactive infrastructure management and 99.99% uptime guarantees." },
                { icon:<ShieldCheck size={28}/>,      t:"Cyber Security",       d:"24/7 SOC monitoring, VAPT, and robust zero-trust cloud architectures." },
                { icon:<TabletSmartphone size={28}/>, t:"App Modernization",    d:"Transforming legacy monoliths into agile, cloud-native platforms." },
                { icon:<Brain size={28}/>,            t:"AI & Analytics",       d:"Agentic workflows and predictive models for data-driven decisions." },
                { icon:<Link2 size={28}/>,            t:"API Integrations",     d:"Seamless synchronization across ERPs, CRMs, and custom middleware." },
                { icon:<Users size={28}/>,            t:"Tech Talent Provision",d:"Deploying elite IT professionals globally within 24-72 hours." },
              ].map((node, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="group p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-110">
                    {node.icon}
                  </div>
                  <h4 className="text-slate-900 font-bold text-lg tracking-tight mb-3">{node.t}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium mt-auto">{node.d}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. FINAL CTA
        ══════════════════════════════════════ */}
        <section className="relative pb-24 mt-10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-[#0a1128] rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
              
              {/* Background glows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.4)_0%,transparent_70%)] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-6 font-mono">
                  Ready to Begin
                </motion.p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                  The Future Is <br className="md:hidden" /> Wait-less.
                </h2>
                <p className="text-slate-400 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                  Don't let your competition define your technological roadmap. Partner with 1TecHub to architect a secure, scalable future that belongs to you alone.
                </p>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/contact"
                    state={{
                      selectedServices: [],
                      prefilledMessage: "Hi Team,\n\nI would like to book a strategy call to discuss a comprehensive technological roadmap for our business. We are looking to scale our operations and want to explore your advisory services.\n\nLooking forward to speaking with an expert."
                    }}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-sm md:text-base uppercase tracking-widest text-[#0a1128] bg-white hover:bg-blue-50 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] group"
                  >
                    Book a Strategy Call
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default DigitalTransformation;