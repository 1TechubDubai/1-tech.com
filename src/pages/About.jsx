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

// --- UPGRADED PREMIUM AMBIENT BACKGROUND ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes d1 {
        0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
        25%  { transform: translate(45px,-60px) scale(1.1) rotate(2deg); }
        50%  { transform: translate(-30px,-30px) scale(0.93) rotate(-1deg); }
        75%  { transform: translate(20px,45px) scale(1.06) rotate(1deg); }
      }
      @keyframes d2 {
        0%,100% { transform: translate(0,0) scale(1); }
        30%  { transform: translate(-55px,40px) scale(1.12); }
        65%  { transform: translate(40px,-50px) scale(0.91); }
      }
      @keyframes d3 {
        0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
        40%  { transform: translate(30px,55px) scale(1.08) rotate(3deg); }
        70%  { transform: translate(-45px,-25px) scale(0.95) rotate(-2deg); }
      }
      @keyframes d4 {
        0%,100% { transform: translate(0,0) scale(1); }
        35%  { transform: translate(-30px,-50px) scale(1.09); }
        70%  { transform: translate(50px,30px) scale(0.93); }
      }
      @keyframes d5 {
        0%,100% { transform: translate(0,0) scale(1); }
        45%  { transform: translate(35px,-40px) scale(1.07); }
        80%  { transform: translate(-25px,35px) scale(0.96); }
      }
      @keyframes d6 {
        0%,100% { transform: translate(0,0) scale(1); }
        38%  { transform: translate(-40px,28px) scale(1.11); }
        72%  { transform: translate(28px,-42px) scale(0.94); }
      }
      @keyframes gridBr {
        0%,100% { opacity: 0.06; }
        50%      { opacity: 0.13; }
      }
      @keyframes orbitSpin    { to { transform: rotate(360deg); } }
      @keyframes orbitSpinRev { to { transform: rotate(-360deg); } }
      @keyframes nodePulse {
        0%,100% { opacity:0.25; transform:scale(1); }
        50%      { opacity:0.9; transform:scale(2); }
      }
      @keyframes shimH {
        0%   { transform:translateX(-110%); opacity:0; }
        10%  { opacity:1; }
        90%  { opacity:1; }
        100% { transform:translateX(110vw); opacity:0; }
      }
      @keyframes shimV {
        0%   { transform:translateY(-110%); opacity:0; }
        10%  { opacity:1; }
        90%  { opacity:1; }
        100% { transform:translateY(110vh); opacity:0; }
      }
      @keyframes rise {
        0%   { transform:translateY(105vh) scale(1); opacity:0; }
        8%   { opacity:1; }
        92%  { opacity:1; }
        100% { transform:translateY(-8vh) scale(1.1); opacity:0; }
      }
      @keyframes arcSpin { to { stroke-dashoffset:-500; } }
      @keyframes glowPulse {
        0%,100% { opacity:0.45; transform:scale(1); }
        50%      { opacity:0.85; transform:scale(1.1); }
      }

      .d1{animation:d1 20s ease-in-out infinite;}
      .d2{animation:d2 27s ease-in-out infinite;animation-delay:-9s;}
      .d3{animation:d3 18s ease-in-out infinite;animation-delay:-4s;}
      .d4{animation:d4 24s ease-in-out infinite;animation-delay:-13s;}
      .d5{animation:d5 31s ease-in-out infinite;animation-delay:-18s;}
      .d6{animation:d6 22s ease-in-out infinite;animation-delay:-7s;}
      .gbr{animation:gridBr 8s ease-in-out infinite;}
      .orb1{animation:orbitSpin 70s linear infinite;}
      .orb2{animation:orbitSpinRev 110s linear infinite;}
      .orb3{animation:orbitSpin 150s linear infinite;animation-delay:-25s;}
      .gp{animation:glowPulse 4s ease-in-out infinite;}
    `}</style>

    {/* ── Rich base canvas ── */}
    <div className="absolute inset-0" style={{
      background: `linear-gradient(135deg,
        #e8f4fd 0%,
        #eef2ff 15%,
        #fdf2ff 30%,
        #fff0f6 45%,
        #e8fbff 60%,
        #edfff8 75%,
        #fff8e8 88%,
        #eef0ff 100%
      )`
    }} />

    {/* ── 6 large vivid orbs ── */}
    {/* Royal blue — top-left */}
    <div className="d1 absolute -top-[18%] -left-[12%]" style={{
      width:'clamp(400px,62vw,860px)', height:'clamp(400px,62vw,860px)',
      background:'radial-gradient(ellipse at 45% 42%, rgba(59,130,246,0.42) 0%, rgba(37,99,235,0.2) 35%, rgba(147,197,253,0.08) 62%, transparent 78%)',
      filter:'blur(36px)', borderRadius:'50%',
    }}/>

    {/* Violet — top-right */}
    <div className="d2 absolute -top-[14%] -right-[14%]" style={{
      width:'clamp(360px,56vw,780px)', height:'clamp(360px,56vw,780px)',
      background:'radial-gradient(ellipse at 55% 38%, rgba(139,92,246,0.42) 0%, rgba(109,40,217,0.2) 36%, rgba(196,181,253,0.08) 62%, transparent 80%)',
      filter:'blur(40px)', borderRadius:'50%',
    }}/>

    {/* Cyan — mid-right */}
    <div className="d3 absolute top-[35%] -right-[8%]" style={{
      width:'clamp(300px,46vw,650px)', height:'clamp(300px,46vw,650px)',
      background:'radial-gradient(ellipse at 55% 50%, rgba(6,182,212,0.4) 0%, rgba(8,145,178,0.2) 38%, rgba(103,232,249,0.07) 62%, transparent 80%)',
      filter:'blur(44px)', borderRadius:'50%',
    }}/>

    {/* Rose-pink — center */}
    <div className="d4 absolute top-[28%] left-[20%]" style={{
      width:'clamp(280px,42vw,600px)', height:'clamp(280px,42vw,600px)',
      background:'radial-gradient(ellipse at 50% 50%, rgba(244,63,94,0.3) 0%, rgba(225,29,72,0.14) 40%, rgba(253,164,175,0.06) 65%, transparent 80%)',
      filter:'blur(52px)', borderRadius:'50%',
    }}/>

    {/* Emerald — bottom-left */}
    <div className="d5 absolute -bottom-[16%] -left-[10%]" style={{
      width:'clamp(380px,58vw,800px)', height:'clamp(380px,58vw,800px)',
      background:'radial-gradient(ellipse at 42% 55%, rgba(16,185,129,0.38) 0%, rgba(5,150,105,0.18) 38%, rgba(110,231,183,0.07) 62%, transparent 80%)',
      filter:'blur(40px)', borderRadius:'50%',
    }}/>

    {/* Amber — bottom-right */}
    <div className="d6 absolute -bottom-[12%] -right-[10%]" style={{
      width:'clamp(340px,52vw,720px)', height:'clamp(340px,52vw,720px)',
      background:'radial-gradient(ellipse at 55% 55%, rgba(251,146,60,0.35) 0%, rgba(234,88,12,0.16) 38%, rgba(253,186,116,0.07) 62%, transparent 80%)',
      filter:'blur(42px)', borderRadius:'50%',
    }}/>

    {/* ── Dot grid ── */}
    <div className="gbr absolute inset-0" style={{
      backgroundImage:'radial-gradient(rgba(30,27,75,0.45) 1.3px, transparent 1.3px)',
      backgroundSize:'32px 32px',
    }}/>

    {/* ── Diagonal crosshatch ── */}
    <svg className="absolute inset-0 w-full h-full" style={{opacity:0.035}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dxh" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0L0 56" stroke="#4f46e5" strokeWidth="0.7" fill="none"/>
          <path d="M0 0L56 56" stroke="#0891b2" strokeWidth="0.4" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dxh)"/>
    </svg>

    {/* ── Orbit ring system (centered) ── */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="orb1 absolute" style={{width:'min(105vw,1060px)',height:'min(105vw,1060px)'}}>
        <svg width="100%" height="100%" viewBox="0 0 1060 1060">
          <circle cx="530" cy="530" r="500" fill="none"
            stroke="rgba(99,102,241,0.14)" strokeWidth="1.2" strokeDasharray="5 22"/>
          <circle cx="1028" cy="530" r="5" fill="rgba(99,102,241,0.8)"
            style={{filter:'drop-shadow(0 0 6px rgba(99,102,241,0.9))'}}>
            <animateMotion dur="70s" repeatCount="indefinite">
              <mpath href="#op1"/>
            </animateMotion>
          </circle>
          <path id="op1" d="M530,30 a500,500 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>
      <div className="orb2 absolute" style={{width:'min(72vw,740px)',height:'min(72vw,740px)'}}>
        <svg width="100%" height="100%" viewBox="0 0 740 740">
          <circle cx="370" cy="370" r="340" fill="none"
            stroke="rgba(6,182,212,0.14)" strokeWidth="1" strokeDasharray="3 16"/>
          <circle cx="710" cy="370" r="4.5" fill="rgba(6,182,212,0.85)"
            style={{filter:'drop-shadow(0 0 5px rgba(6,182,212,0.9))'}}>
            <animateMotion dur="110s" repeatCount="indefinite">
              <mpath href="#op2"/>
            </animateMotion>
          </circle>
          <path id="op2" d="M370,30 a340,340 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>
      <div className="orb3 absolute" style={{width:'min(46vw,480px)',height:'min(46vw,480px)'}}>
        <svg width="100%" height="100%" viewBox="0 0 480 480">
          <circle cx="240" cy="240" r="218" fill="none"
            stroke="rgba(16,185,129,0.13)" strokeWidth="0.9" strokeDasharray="4 26"/>
          <circle cx="458" cy="240" r="4" fill="rgba(16,185,129,0.85)"
            style={{filter:'drop-shadow(0 0 5px rgba(16,185,129,0.9))'}}>
            <animateMotion dur="150s" repeatCount="indefinite">
              <mpath href="#op3"/>
            </animateMotion>
          </circle>
          <path id="op3" d="M240,22 a218,218 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>
    </div>

    {/* ── Colorful shimmer beams — horizontal ── */}
    {[
      {top:'15%', dur:'9s',  delay:'0s',   c:'rgba(59,130,246,0.35)'},
      {top:'38%', dur:'13s', delay:'3s',   c:'rgba(139,92,246,0.32)'},
      {top:'62%', dur:'10s', delay:'6.5s', c:'rgba(6,182,212,0.3)'},
      {top:'82%', dur:'15s', delay:'1.5s', c:'rgba(16,185,129,0.28)'},
    ].map((b,i)=>(
      <div key={i} className="absolute left-0 right-0" style={{top:b.top,height:'1px',overflow:'hidden'}}>
        <div style={{
          position:'absolute',top:0,left:0,width:'26%',height:'100%',
          background:`linear-gradient(90deg,transparent,${b.c} 40%,${b.c} 60%,transparent)`,
          animation:`shimH ${b.dur} ease-in-out infinite`,
          animationDelay:b.delay,
        }}/>
      </div>
    ))}

    {/* ── Colorful shimmer beams — vertical ── */}
    {[
      {left:'18%', dur:'16s', delay:'2s',  c:'rgba(244,63,94,0.22)'},
      {left:'52%', dur:'20s', delay:'8s',  c:'rgba(251,146,60,0.2)'},
      {left:'80%', dur:'14s', delay:'5s',  c:'rgba(139,92,246,0.22)'},
    ].map((b,i)=>(
      <div key={i} className="absolute top-0 bottom-0" style={{left:b.left,width:'1px',overflow:'hidden'}}>
        <div style={{
          position:'absolute',top:0,left:0,width:'100%',height:'22%',
          background:`linear-gradient(180deg,transparent,${b.c} 40%,${b.c} 60%,transparent)`,
          animation:`shimV ${b.dur} ease-in-out infinite`,
          animationDelay:b.delay,
        }}/>
      </div>
    ))}

    {/* ── Rising particles — 6 colors ── */}
    {[
      {c:'#3b82f6',s:3},{c:'#8b5cf6',s:2.5},{c:'#06b6d4',s:3.5},
      {c:'#10b981',s:2},{c:'#f43f5e',s:3},{c:'#fb923c',s:2.5},
      {c:'#3b82f6',s:2},{c:'#8b5cf6',s:3},{c:'#06b6d4',s:2.5},
      {c:'#10b981',s:3.5},{c:'#f43f5e',s:2},{c:'#fb923c',s:3},
      {c:'#3b82f6',s:2.5},{c:'#8b5cf6',s:3},{c:'#06b6d4',s:2},
      {c:'#10b981',s:3},{c:'#f43f5e',s:2.5},{c:'#fb923c',s:3.5},
    ].map(({c,s},i)=>(
      <div key={i} style={{
        position:'absolute',
        left:`${(i/18)*100 + (i%3)*2.2}%`,
        bottom:0,
        width:s,height:s,
        borderRadius:'50%',
        background:c,
        boxShadow:`0 0 ${s*3}px ${c}, 0 0 ${s*6}px ${c}66`,
        animation:`rise ${14+(i%7)*3}s linear infinite`,
        animationDelay:`-${(i*2.3)%22}s`,
        opacity:0,
      }}/>
    ))}

    {/* ── Node constellation: top-right ── */}
    <svg className="absolute top-0 right-0 w-[44vw] h-[44vw] max-w-[520px] max-h-[520px]"
      viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg">
      {[
        [75,48,'#3b82f6'],[190,85,'#8b5cf6'],[330,42,'#06b6d4'],
        [460,130,'#3b82f6'],[148,198,'#10b981'],[295,178,'#f43f5e'],
        [430,255,'#8b5cf6'],[65,308,'#fb923c'],[222,315,'#06b6d4'],
        [400,370,'#3b82f6'],[510,195,'#10b981'],
      ].map(([x,y,c],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill={c} opacity="0.12"
            style={{animation:`nodePulse ${4+(i%4)}s ease-in-out infinite`,animationDelay:`${i*0.45}s`}}/>
          <circle cx={x} cy={y} r="2.8" fill={c} opacity="0.8"
            style={{filter:`drop-shadow(0 0 5px ${c})`}}/>
        </g>
      ))}
      {[[75,48,190,85],[190,85,330,42],[330,42,460,130],[460,130,510,195],
        [190,85,148,198],[330,42,295,178],[460,130,430,255],
        [148,198,295,178],[295,178,430,255],[65,308,148,198],
        [148,198,222,315],[295,178,222,315],[430,255,400,370],[222,315,400,370],
      ].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(99,102,241,0.16)" strokeWidth="0.9"/>
      ))}
    </svg>

    {/* ── Node constellation: bottom-left ── */}
    <svg className="absolute bottom-0 left-0 w-[38vw] h-[38vw] max-w-[450px] max-h-[450px]"
      viewBox="0 0 450 450" xmlns="http://www.w3.org/2000/svg"
      style={{transform:'scaleX(-1) scaleY(-1)'}}>
      {[
        [60,40,'#10b981'],[165,75,'#3b82f6'],[295,38,'#fb923c'],
        [405,115,'#8b5cf6'],[122,172,'#06b6d4'],[268,155,'#f43f5e'],
        [390,220,'#10b981'],[50,278,'#3b82f6'],[214,285,'#8b5cf6'],
      ].map(([x,y,c],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill={c} opacity="0.12"
            style={{animation:`nodePulse ${5+(i%3)}s ease-in-out infinite`,animationDelay:`${i*0.6}s`}}/>
          <circle cx={x} cy={y} r="2.5" fill={c} opacity="0.75"
            style={{filter:`drop-shadow(0 0 4px ${c})`}}/>
        </g>
      ))}
      {[[60,40,165,75],[165,75,295,38],[295,38,405,115],
        [165,75,122,172],[295,38,268,155],[405,115,390,220],
        [122,172,268,155],[268,155,390,220],[50,278,122,172],
        [122,172,214,285],[268,155,214,285],
      ].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(16,185,129,0.15)" strokeWidth="0.9"/>
      ))}
    </svg>

    {/* ── Soft edge vignette ── */}
    <div className="absolute inset-0" style={{
      background:'radial-gradient(ellipse 92% 92% at 50% 50%, transparent 42%, rgba(244,248,255,0.38) 74%, rgba(238,242,255,0.7) 100%)'
    }}/>
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
    <div className="min-h-screen flex flex-col relative bg-transparent font-sans selection:bg-blue-100 selection:text-blue-900">
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
              <div className="relative w-full aspect-square max-w-lg mx-auto lg:ml-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200 bg-white/50 backdrop-blur-sm">
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
            
            <div className="bg-white/80 backdrop-blur-md border border-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Go-to-Market Engine</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                We help tech companies expand globally, serving as their GTM partner in the MEA region while opening pathways into international markets through our vast network.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global IT & AI Solutions</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                1TecHub serves as the strategic front-end partner for leading technology vendors and enterprises across the globe, orchestrating advanced infrastructure and autonomous intelligence.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Governance-First</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                We bring enterprise-grade processes, delivery governance, and program oversight to every engagement—ensuring clients benefit from predictable execution and high accountability.
              </p>
            </div>

          </div>
        </section>

        {/* --- WHAT MAKES US UNIQUE --- */}
        <section className="bg-white/60 backdrop-blur-md border-y border-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">What Makes Us Unique</h2>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto font-medium">
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
                      <div className="absolute -top-12 -left-6 text-[8rem] lg:text-[10rem] font-extrabold text-slate-200/50 -z-10 leading-none select-none group-hover:text-blue-100 transition-colors duration-500">
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
            <p className="text-slate-600 font-medium mt-4">Hover or tap to explore our globally delivered capabilities.</p>
          </div>

          {/* MOBILE & TABLET VIEW: Grid of Clean Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {specializations.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div key={idx} className="bg-white/80 backdrop-blur-md border border-white rounded-[1.5rem] p-6 shadow-sm hover:border-blue-300 transition-colors flex flex-col">
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
                        : 'bg-white/40 backdrop-blur-sm border-transparent text-slate-500 hover:text-slate-700 hover:bg-white/70'
                    }`}
                  >
                    {spec.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Display Box */}
            <div className="w-7/12">
              <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] p-12 lg:p-16 shadow-2xl shadow-blue-900/5 transition-all duration-500 relative overflow-hidden min-h-[480px] flex flex-col justify-center group">
                
                {/* Decorative Background Blurs */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px] group-hover:bg-blue-200/50 transition-colors duration-700 pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-100/50 rounded-full blur-[80px] transition-colors duration-700 pointer-events-none"></div>

                <div className="relative z-10">
                  {(() => {
                    const activeData = specializations[activeSpec];
                    const ActiveIcon = activeData.icon;
                    return (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeSpec}>
                        <div className="w-20 h-20 bg-white border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
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
            <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] p-8 md:p-12 text-center shadow-2xl shadow-blue-900/10">
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