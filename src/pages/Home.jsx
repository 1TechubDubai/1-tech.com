import React, { useState, useEffect, useRef} from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import MessageForm from "../components/MessageForm";
import { Users, Brain, ShieldCheck, TabletSmartphone, Link2, TrendingUp, ArrowRight, ChevronRight, BookOpen, Clock, Loader2, Eye, Flag, Handshake, Globe, Phone} from 'lucide-react';

const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#eef3fb] pointer-events-none">
    <style>{`
      @keyframes drift1 {
        0%   { transform: translate(0px, 0px) scale(1); }
        30%  { transform: translate(50px, -70px) scale(1.12); }
        60%  { transform: translate(-40px, -20px) scale(0.92); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      @keyframes drift2 {
        0%   { transform: translate(0px, 0px) scale(1); }
        35%  { transform: translate(-60px, 40px) scale(1.15); }
        70%  { transform: translate(45px, -55px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      @keyframes drift3 {
        0%   { transform: translate(0px, 0px) scale(1); }
        40%  { transform: translate(30px, 60px) scale(1.08); }
        75%  { transform: translate(-50px, -30px) scale(0.94); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      @keyframes drift4 {
        0%   { transform: translate(0px, 0px) scale(1); }
        45%  { transform: translate(-35px, -50px) scale(1.1); }
        80%  { transform: translate(55px, 30px) scale(0.93); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      @keyframes orbitSpin    { to { transform: rotate(360deg); } }
      @keyframes orbitSpinRev { to { transform: rotate(-360deg); } }
      @keyframes nodePulse {
        0%, 100% { opacity: 0.4; r: 2.5; }
        50%      { opacity: 1;   r: 4.5; }
      }
      @keyframes nodeGlowPulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50%      { opacity: 0.9; transform: scale(1.8); }
      }
      @keyframes gridBreathe {
        0%, 100% { opacity: 0.06; }
        50%      { opacity: 0.13; }
      }
      @keyframes scanBeam {
        0%   { transform: translateX(-120%); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { transform: translateX(120vw); opacity: 0; }
      }
      @keyframes scanBeamV {
        0%   { transform: translateY(-120%); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { transform: translateY(120vh); opacity: 0; }
      }

      .amb-d1 { animation: drift1 20s ease-in-out infinite; }
      .amb-d2 { animation: drift2 26s ease-in-out infinite; animation-delay: -7s; }
      .amb-d3 { animation: drift3 18s ease-in-out infinite; animation-delay: -3s; }
      .amb-d4 { animation: drift4 23s ease-in-out infinite; animation-delay: -11s; }
      .amb-d5 { animation: drift1 30s ease-in-out infinite; animation-delay: -15s; }
      .amb-d6 { animation: drift3 16s ease-in-out infinite; animation-delay: -5s; }
      .orb1   { animation: orbitSpin    80s linear infinite; }
      .orb2   { animation: orbitSpinRev 120s linear infinite; }
      .orb3   { animation: orbitSpin    160s linear infinite; animation-delay: -30s; }
      .orb4   { animation: orbitSpinRev 200s linear infinite; animation-delay: -50s; }
      .grid-b { animation: gridBreathe 8s ease-in-out infinite; }
    `}</style>

    <div className="absolute inset-0" style={{
      background: `
        linear-gradient(135deg,
          #dbeafe 0%,
          #eff6ff 20%,
          #f0f9ff 40%,
          #faf5ff 65%,
          #ede9fe 80%,
          #e0f2fe 100%
        )`
    }} />

    <div className="amb-d1 absolute -top-[20%] -left-[15%]"
      style={{
        width: 'clamp(400px, 65vw, 900px)', height: 'clamp(400px, 65vw, 900px)',
        background: 'radial-gradient(ellipse at 45% 45%, rgba(96,165,250,0.55) 0%, rgba(59,130,246,0.3) 35%, rgba(147,197,253,0.12) 65%, transparent 80%)',
        filter: 'blur(40px)', borderRadius: '50%',
      }} />

    <div className="amb-d2 absolute -top-[10%] -right-[15%]"
      style={{
        width: 'clamp(350px, 55vw, 800px)', height: 'clamp(350px, 55vw, 800px)',
        background: 'radial-gradient(ellipse at 55% 40%, rgba(34,211,238,0.5) 0%, rgba(6,182,212,0.28) 35%, rgba(103,232,249,0.1) 65%, transparent 80%)',
        filter: 'blur(45px)', borderRadius: '50%',
      }} />

    <div className="amb-d3 absolute top-[30%] left-[25%]"
      style={{
        width: 'clamp(300px, 50vw, 700px)', height: 'clamp(300px, 50vw, 700px)',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.45) 0%, rgba(139,92,246,0.22) 40%, rgba(196,181,253,0.08) 65%, transparent 80%)',
        filter: 'blur(50px)', borderRadius: '50%',
      }} />

    <div className="amb-d4 absolute -bottom-[15%] -left-[10%]"
      style={{
        width: 'clamp(380px, 60vw, 850px)', height: 'clamp(380px, 60vw, 850px)',
        background: 'radial-gradient(ellipse at 40% 55%, rgba(99,102,241,0.48) 0%, rgba(79,70,229,0.22) 40%, rgba(165,180,252,0.1) 65%, transparent 80%)',
        filter: 'blur(42px)', borderRadius: '50%',
      }} />

    <div className="amb-d5 absolute -bottom-[10%] -right-[10%]"
      style={{
        width: 'clamp(320px, 48vw, 700px)', height: 'clamp(320px, 48vw, 700px)',
        background: 'radial-gradient(ellipse at 55% 55%, rgba(56,189,248,0.42) 0%, rgba(14,165,233,0.2) 40%, rgba(186,230,253,0.08) 65%, transparent 80%)',
        filter: 'blur(48px)', borderRadius: '50%',
      }} />

    <div className="amb-d6 absolute top-[45%] -right-[5%]"
      style={{
        width: 'clamp(250px, 38vw, 550px)', height: 'clamp(250px, 38vw, 550px)',
        background: 'radial-gradient(ellipse, rgba(192,132,252,0.38) 0%, rgba(168,85,247,0.18) 45%, transparent 75%)',
        filter: 'blur(44px)', borderRadius: '50%',
      }} />

    <div className="grid-b absolute inset-0" style={{
      backgroundImage: 'radial-gradient(rgba(30,58,138,0.5) 1.5px, transparent 1.5px)',
      backgroundSize: '32px 32px',
    }} />

    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.045 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="cross" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0L0 56" stroke="#3730a3" strokeWidth="0.8" fill="none"/>
          <path d="M0 0L56 56" stroke="#1e3a8a" strokeWidth="0.5" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cross)" />
    </svg>

    <div className="absolute inset-0 flex items-center justify-center">
      <div className="orb1 absolute" style={{ width: 'min(110vw,1100px)', height: 'min(110vw,1100px)' }}>
        <svg width="100%" height="100%" viewBox="0 0 1100 1100">
          <circle cx="550" cy="550" r="520" fill="none" stroke="rgba(99,102,241,0.18)" strokeWidth="1.2" strokeDasharray="6 20"/>
          <circle cx="1068" cy="550" r="5" fill="rgba(99,102,241,0.7)" style={{ filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.8))' }}>
            <animateMotion dur="80s" repeatCount="indefinite"><mpath href="#op1"/></animateMotion>
          </circle>
          <path id="op1" d="M550,30 a520,520 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>

      <div className="orb2 absolute" style={{ width: 'min(78vw,780px)', height: 'min(78vw,780px)' }}>
        <svg width="100%" height="100%" viewBox="0 0 780 780">
          <circle cx="390" cy="390" r="360" fill="none" stroke="rgba(34,211,238,0.16)" strokeWidth="1" strokeDasharray="3 16"/>
          <circle cx="750" cy="390" r="4" fill="rgba(34,211,238,0.75)" style={{ filter: 'drop-shadow(0 0 5px rgba(34,211,238,0.8))' }}>
            <animateMotion dur="120s" repeatCount="indefinite"><mpath href="#op2"/></animateMotion>
          </circle>
          <path id="op2" d="M390,30 a360,360 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>

      <div className="orb3 absolute" style={{ width: 'min(52vw,520px)', height: 'min(52vw,520px)' }}>
        <svg width="100%" height="100%" viewBox="0 0 520 520">
          <circle cx="260" cy="260" r="240" fill="none" stroke="rgba(167,139,250,0.14)" strokeWidth="0.9" strokeDasharray="4 24"/>
          <circle cx="500" cy="260" r="3.5" fill="rgba(167,139,250,0.8)" style={{ filter: 'drop-shadow(0 0 4px rgba(167,139,250,0.9))' }}>
            <animateMotion dur="160s" repeatCount="indefinite"><mpath href="#op3"/></animateMotion>
          </circle>
          <path id="op3" d="M260,20 a240,240 0 1,1 -0.1,0" fill="none"/>
        </svg>
      </div>

      <div className="orb4 absolute" style={{ width: 'min(30vw,300px)', height: 'min(30vw,300px)' }}>
        <svg width="100%" height="100%" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(56,189,248,0.12)" strokeWidth="0.8" strokeDasharray="2 18"/>
        </svg>
      </div>
    </div>

    <svg className="absolute top-0 right-0 w-[52vw] h-[52vw] max-w-[600px] max-h-[600px]" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      {[
        [80,50,'#818cf8'],[200,90,'#38bdf8'],[340,45,'#a78bfa'],
        [480,130,'#818cf8'],[150,200,'#38bdf8'],[300,180,'#a78bfa'],
        [450,250,'#818cf8'],[60,320,'#38bdf8'],[220,320,'#a78bfa'],
        [400,370,'#818cf8'],[550,180,'#38bdf8'],
      ].map(([x,y,c],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" fill={c} opacity="0.12" style={{ animation: `nodeGlowPulse ${4+(i%4)}s ease-in-out infinite`, animationDelay: `${i*0.45}s` }}/>
          <circle cx={x} cy={y} r="2.8" fill={c} opacity="0.75" style={{ animation: `nodePulse ${4+(i%4)}s ease-in-out infinite`, animationDelay: `${i*0.45}s`, filter: `drop-shadow(0 0 4px ${c})` }}/>
        </g>
      ))}
      {[
        [80,50,200,90],[200,90,340,45],[340,45,480,130],[480,130,550,180],
        [200,90,150,200],[340,45,300,180],[480,130,450,250],
        [150,200,300,180],[300,180,450,250],[60,320,150,200],
        [150,200,220,320],[300,180,220,320],[450,250,400,370],[220,320,400,370],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(99,102,241,0.18)" strokeWidth="0.9"/>
      ))}
    </svg>

    <svg className="absolute bottom-0 left-0 w-[44vw] h-[44vw] max-w-[500px] max-h-[500px]" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1) scaleY(-1)' }}>
      {[
        [60,40,'#34d399'],[170,75,'#38bdf8'],[300,40,'#a78bfa'],
        [420,110,'#34d399'],[120,170,'#38bdf8'],[270,155,'#a78bfa'],
        [400,220,'#34d399'],[50,280,'#38bdf8'],[210,290,'#a78bfa'],
      ].map(([x,y,c],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill={c} opacity="0.12" style={{ animation: `nodeGlowPulse ${5+(i%3)}s ease-in-out infinite`, animationDelay: `${i*0.6}s` }}/>
          <circle cx={x} cy={y} r="2.5" fill={c} opacity="0.7" style={{ animation: `nodePulse ${5+(i%3)}s ease-in-out infinite`, animationDelay: `${i*0.6}s`, filter: `drop-shadow(0 0 4px ${c})` }}/>
        </g>
      ))}
      {[
        [60,40,170,75],[170,75,300,40],[300,40,420,110],
        [170,75,120,170],[300,40,270,155],[420,110,400,220],
        [120,170,270,155],[270,155,400,220],[50,280,120,170],
        [120,170,210,290],[270,155,210,290],[400,220,210,290],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(56,189,248,0.16)" strokeWidth="0.9"/>
      ))}
    </svg>

    {[
      { top: '18%', dur: '9s',  delay: '0s',   color: 'rgba(99,102,241,0.35)',  h: '1px' },
      { top: '42%', dur: '12s', delay: '3s',   color: 'rgba(34,211,238,0.3)',   h: '1px' },
      { top: '67%', dur: '8s',  delay: '6s',   color: 'rgba(167,139,250,0.32)', h: '1px' },
      { top: '85%', dur: '14s', delay: '1.5s', color: 'rgba(99,102,241,0.22)',  h: '0.8px' },
    ].map((b,i) => (
      <div key={i} className="absolute left-0 right-0" style={{ top: b.top, height: b.h, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '30%', height: '100%',
          background: `linear-gradient(90deg, transparent 0%, ${b.color} 40%, ${b.color} 60%, transparent 100%)`,
          animation: `scanBeam ${b.dur} ease-in-out infinite`, animationDelay: b.delay,
        }} />
      </div>
    ))}

    {[
      { left: '22%', dur: '14s', delay: '2s',  color: 'rgba(99,102,241,0.22)',  w: '1px' },
      { left: '60%', dur: '18s', delay: '7s',  color: 'rgba(34,211,238,0.18)',  w: '0.8px' },
      { left: '80%', dur: '11s', delay: '4s',  color: 'rgba(167,139,250,0.2)',  w: '1px' },
    ].map((b,i) => (
      <div key={i} className="absolute top-0 bottom-0" style={{ left: b.left, width: b.w, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '25%',
          background: `linear-gradient(180deg, transparent 0%, ${b.color} 40%, ${b.color} 60%, transparent 100%)`,
          animation: `scanBeamV ${b.dur} ease-in-out infinite`, animationDelay: b.delay,
        }} />
      </div>
    ))}

    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 45%, rgba(238,243,251,0.4) 75%, rgba(238,243,251,0.75) 100%)'
    }} />
  </div>
);

const Hero = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-18px) rotateX(2deg); }
        }
        @keyframes coreRotate {
          from { transform: rotateY(0deg) rotateX(15deg); }
          to   { transform: rotateY(360deg) rotateX(15deg); }
        }
        @keyframes ring1Spin {
          from { transform: rotateX(70deg) rotateZ(0deg); }
          to   { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes ring2Spin {
          from { transform: rotateX(55deg) rotateY(30deg) rotateZ(0deg); }
          to   { transform: rotateX(55deg) rotateY(30deg) rotateZ(-360deg); }
        }
        @keyframes ring3Spin {
          from { transform: rotateX(80deg) rotateY(60deg) rotateZ(0deg); }
          to   { transform: rotateX(80deg) rotateY(60deg) rotateZ(360deg); }
        }
        @keyframes corePulse {
          0%, 100% { box-shadow: 0 0 40px rgba(59,130,246,0.6), 0 0 80px rgba(59,130,246,0.3), 0 0 120px rgba(6,182,212,0.2), inset 0 0 40px rgba(255,255,255,0.15); }
          50%       { box-shadow: 0 0 60px rgba(59,130,246,0.9), 0 0 120px rgba(59,130,246,0.5), 0 0 180px rgba(6,182,212,0.35), inset 0 0 60px rgba(255,255,255,0.25); }
        }
        @keyframes scanLine {
          0%   { top: 0%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes dotPing {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(2.5); opacity: 0; }
        }
        @keyframes arcDraw {
          from { stroke-dashoffset: 500; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes outerGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.08); }
        }

        .hero-scene {
          perspective: 900px;
          perspective-origin: 50% 50%;
        }
        .hero-float { animation: heroFloat 7s ease-in-out infinite; }
        .ring-1 { animation: ring1Spin 10s linear infinite; }
        .ring-2 { animation: ring2Spin 14s linear infinite; }
        .ring-3 { animation: ring3Spin 19s linear infinite reverse; }
        .core-pulse { animation: corePulse 3s ease-in-out infinite; }
        .scan-line { animation: scanLine 4s ease-in-out infinite; }
        .outer-glow { animation: outerGlow 3s ease-in-out infinite; }
      `}</style>

      {/* Added overflow-hidden to prevent 3D nodes from stretching page width */}
      <section className="relative w-full pt-32 pb-20 md:pt-36 md:pb-28 min-h-[90vh] flex items-center bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">

            {/* ── Left Column ── */}
            <div className="flex flex-col space-y-6 md:pr-8 text-center md:text-left order-2 md:order-1">
<a 
                href="https://1techub.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-2 py-1.5 pr-5 rounded-full bg-white/60 backdrop-blur-md border border-blue-200/60 w-max mx-auto md:mx-0 shadow-sm hover:bg-white hover:border-cyan-300 hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 text-white shadow-inner">
                  <svg className="w-3.5 h-3.5 relative z-10" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide">
                  Explore our dedicated <span className="text-blue-600">AI Division</span>
                </span>
                <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors group-hover:translate-x-1" />
              </a>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight break-words mt-4">
                Empowering your business with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  next-gen solutions.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto md:mx-0 font-medium">
                We design, build, and scale innovative technology solutions that drive real results. Transform your digital presence with our expert engineering and advisory services.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 justify-center md:justify-start">
                <Link to="/services"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5">
                  Explore Services <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/contact"
                  state={{
                    selectedServices: [],
                    prefilledMessage: "Hi Team,\n\nI would like to schedule a consultation to discuss how 1TecHub can help with our enterprise technology needs and digital transformation initiatives.\n\nPlease let me know the best time to connect."
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-900 font-bold flex items-center justify-center hover:border-blue-400 hover:text-blue-600 hover:bg-white transition-all shadow-sm"
                >
                  Let's Talk
                  <Phone size={18} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* ── Right Column: 3D Tech Orb ── */}
            <div className="flex justify-center items-center relative order-1 md:order-2 w-full">
              <div
                className="hero-float relative mx-auto aspect-square flex items-center justify-center my-6 md:my-0"
                style={{ width: 'min(85vw, 460px)' }}
              >
                {/* Ambient glow beneath */}
                <div className="outer-glow absolute inset-[10%] rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(59,130,246,0.25) 0%, rgba(6,182,212,0.12) 50%, transparent 75%)',
                    filter: 'blur(30px)'
                  }} />

                {/* Hex grid background panel */}
                <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hexgrid" x="0" y="0" width="52" height="60" patternUnits="userSpaceOnUse">
                      <polygon points="26,2 50,16 50,44 26,58 2,44 2,16"
                        fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="0.8"/>
                    </pattern>
                    <radialGradient id="hexmask" cx="50%" cy="50%" r="50%">
                      <stop offset="30%" stopColor="white" stopOpacity="1"/>
                      <stop offset="100%" stopColor="white" stopOpacity="0"/>
                    </radialGradient>
                    <mask id="hexfade">
                      <rect width="520" height="520" fill="url(#hexmask)"/>
                    </mask>
                  </defs>
                  <rect width="520" height="520" fill="url(#hexgrid)" mask="url(#hexfade)"/>
                </svg>

                {/* Concentric decorative arcs */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520">
                  {[200, 230, 255].map((r, i) => (
                    <circle key={i} cx="260" cy="260" r={r}
                      fill="none"
                      stroke={i === 1 ? "rgba(6,182,212,0.2)" : "rgba(99,102,241,0.13)"}
                      strokeWidth="0.8"
                      strokeDasharray={i === 0 ? "4 12" : i === 1 ? "2 8" : "6 20"}/>
                  ))}
                  <circle cx="260" cy="260" r="242"
                    fill="none" stroke="rgba(59,130,246,0.35)" strokeWidth="1.5"
                    strokeDasharray="80 500"
                    style={{ animation: 'arcDraw 3s linear infinite', transformOrigin: '260px 260px' }}/>
                </svg>

                <div className="hero-scene absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="relative flex items-center justify-center"
                    style={{ width: '62%', height: '62%' }}
                  >
                    {/* Ring 1 */}
                    <div className="ring-1 absolute inset-0 flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
                      <div style={{
                        width: '100%', height: '100%',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(59,130,246,0.45)',
                        boxShadow: '0 0 12px rgba(59,130,246,0.25), inset 0 0 12px rgba(59,130,246,0.1)',
                        position: 'relative',
                      }}>
                        <div style={{
                          position: 'absolute', top: -5, left: 'calc(50% - 5px)',
                          width: 10, height: 10, borderRadius: '50%',
                          background: '#3b82f6',
                          boxShadow: '0 0 10px rgba(59,130,246,1), 0 0 20px rgba(59,130,246,0.6)',
                        }}/>
                      </div>
                    </div>

                    {/* Ring 2 */}
                    <div className="ring-2 absolute flex items-center justify-center" style={{ width: '87%', height: '87%' }}>
                      <div style={{
                        width: '100%', height: '100%',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(6,182,212,0.5)',
                        boxShadow: '0 0 14px rgba(6,182,212,0.2), inset 0 0 14px rgba(6,182,212,0.08)',
                        position: 'relative',
                      }}>
                        <div style={{
                          position: 'absolute', bottom: -5, left: 'calc(50% - 5px)',
                          width: 10, height: 10, borderRadius: '50%',
                          background: '#06b6d4',
                          boxShadow: '0 0 10px rgba(6,182,212,1), 0 0 20px rgba(6,182,212,0.6)',
                        }}/>
                      </div>
                    </div>

                    {/* Ring 3 */}
                    <div className="ring-3 absolute flex items-center justify-center" style={{ width: '72%', height: '72%' }}>
                      <div style={{
                        width: '100%', height: '100%',
                        borderRadius: '50%',
                        border: '1px solid rgba(139,92,246,0.4)',
                        boxShadow: '0 0 10px rgba(139,92,246,0.18)',
                        position: 'relative',
                      }}>
                        <div style={{
                          position: 'absolute', top: '15%', right: -4,
                          width: 8, height: 8, borderRadius: '50%',
                          background: '#8b5cf6',
                          boxShadow: '0 0 8px rgba(139,92,246,1), 0 0 16px rgba(139,92,246,0.6)',
                        }}/>
                      </div>
                    </div>

                    {/* Core Sphere */}
                    <div className="core-pulse absolute flex items-center justify-center"
                      style={{
                        width: '44%', height: '44%',
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.9) 0%, rgba(147,197,253,0.8) 25%, rgba(59,130,246,0.9) 55%, rgba(29,78,216,1) 80%, rgba(15,23,42,0.95) 100%)',
                      }}>
                      <div className="scan-line absolute left-0 right-0 h-[2px] rounded-full pointer-events-none"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)' }} />
                      <svg width="60%" height="60%" viewBox="0 0 100 100" style={{ position: 'absolute', opacity: 0.25 }}>
                        <line x1="50" y1="10" x2="50" y2="40" stroke="white" strokeWidth="1"/>
                        <line x1="50" y1="60" x2="50" y2="90" stroke="white" strokeWidth="1"/>
                        <line x1="10" y1="50" x2="40" y2="50" stroke="white" strokeWidth="1"/>
                        <line x1="60" y1="50" x2="90" y2="50" stroke="white" strokeWidth="1"/>
                        <circle cx="50" cy="50" r="12" fill="none" stroke="white" strokeWidth="1"/>
                        <circle cx="50" cy="50" r="6" fill="rgba(255,255,255,0.8)"/>
                        <circle cx="50" cy="10" r="3" fill="white"/>
                        <circle cx="50" cy="90" r="3" fill="white"/>
                        <circle cx="10" cy="50" r="3" fill="white"/>
                        <circle cx="90" cy="50" r="3" fill="white"/>
                      </svg>
                    </div>

                    {/* ── Floating data nodes around sphere ── 
                        FIX: Reduced orbit radius (x,y multiplication factor) from 46 to 38 
                        to prevent elements bleeding out of screen edges on mobile.
                    */}
                    {[
                      { angle: 0,   label: 'AGENTIC AI', color: '#3b82f6', delay: '0s'   },
                      { angle: 60,  label: 'CYBER SEC',  color: '#06b6d4', delay: '0.4s' },
                      { angle: 120, label: 'TALENT',     color: '#8b5cf6', delay: '0.8s' },
                      { angle: 180, label: 'IT OPS',     color: '#3b82f6', delay: '1.2s' },
                      { angle: 240, label: 'APP MOD',    color: '#06b6d4', delay: '1.6s' },
                      { angle: 300, label: 'API SYNC',   color: '#8b5cf6', delay: '2.0s' },
                    ].map(({ angle, label, color, delay }) => {
                      const rad = (angle * Math.PI) / 180;
                      const x = Math.cos(rad) * 38; // <-- Adjusted to keep labels inside viewport
                      const y = Math.sin(rad) * 38; 
                      return (
                        <div key={label} style={{
                          position: 'absolute',
                          left: `calc(50% + ${x}%)`,
                          top: `calc(50% + ${y}%)`,
                          transform: 'translate(-50%, -50%)',
                          animation: `floatBadge 5s ease-in-out infinite`,
                          animationDelay: delay,
                          zIndex: 10,
                        }}>
                          <svg style={{ position: 'absolute', top: '50%', left: '50%', overflow: 'visible', pointerEvents: 'none' }} width="1" height="1">
                            <line
                              x1="0" y1="0"
                              x2={`${-x * 0.7}%`} y2={`${-y * 0.7}%`}
                              stroke={color} strokeWidth="0.8" opacity="0.35" strokeDasharray="3 4"/>
                          </svg>
                          <div style={{
                            padding: '4px 8px',
                            borderRadius: 7,
                            background: 'rgba(255,255,255,0.92)',
                            backdropFilter: 'blur(12px)',
                            border: `1px solid ${color}44`,
                            boxShadow: `0 0 12px ${color}33, 0 2px 10px rgba(0,0,0,0.07)`,
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: '0.1em',
                            color: color,
                            whiteSpace: 'nowrap',
                            position: 'relative',
                          }}>
                            <span style={{
                              display: 'inline-block', width: 5, height: 5,
                              borderRadius: '50%', background: color, marginRight: 4,
                              verticalAlign: 'middle', boxShadow: `0 0 5px ${color}`,
                              animation: 'dotPing 2s ease-in-out infinite', animationDelay: delay,
                            }}/>
                            {label}
                          </div>
                        </div>
                      );
                    })}

                    {/* Scatter particles */}
                    {[
                      { x: -38, y: -28, s: 4, c: 'rgba(59,130,246,0.6)',  d: '0s'   },
                      { x:  36, y: -36, s: 3, c: 'rgba(6,182,212,0.7)',   d: '0.8s' },
                      { x:  42, y:  26, s: 5, c: 'rgba(139,92,246,0.5)',  d: '1.4s' },
                      { x: -36, y:  34, s: 3, c: 'rgba(59,130,246,0.55)', d: '2.0s' },
                      { x:  18, y:  44, s: 4, c: 'rgba(6,182,212,0.6)',   d: '0.5s' },
                      { x: -18, y: -44, s: 3, c: 'rgba(139,92,246,0.6)',  d: '1.8s' },
                    ].map(({ x, y, s, c, d }, i) => (
                      <div key={i} style={{
                        position: 'absolute', left: `calc(50% + ${x}%)`, top: `calc(50% + ${y}%)`,
                        width: s, height: s, borderRadius: '50%', background: c, boxShadow: `0 0 ${s * 2}px ${c}`,
                        animation: `floatBadge ${4 + i * 0.7}s ease-in-out infinite`, animationDelay: d,
                      }}/>
                    ))}
                  </div>
                </div>

                {/* Floating stat card (bottom-left) */}
                <div className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-4 bg-white/90 backdrop-blur-xl p-3 sm:p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
                  style={{ animation: 'floatBadge 6s ease-in-out infinite', animationDelay: '1s' }}>
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-inner border border-cyan-100">
                    <Globe size={20} />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-extrabold text-slate-900 leading-none">Global</div>
                    <div className="text-[10px] sm:text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Ecosystem</div>
                  </div>
                </div>

                {/* Top-right metric badge */}
                <div className="absolute -top-4 right-0 sm:-top-6 sm:-right-4 bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 z-20"
                  style={{ animation: 'floatBadge 5s ease-in-out infinite', animationDelay: '2.5s' }}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner border border-blue-100">
                    <Brain size={18} />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-none">Agentic AI</div>
                    <div className="text-[10px] sm:text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Workflows</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

const servicesData = [
  { id: 'gtm-market-expansion', icon: TrendingUp, title: 'Enterprise Go To Market (GTM) & Market Expansion', description: 'Strategic consulting and digital platforms to accelerate product launches and international growth.' },
  { id: 'it-managed-services', icon: Users, title: 'Enterprise IT Managed Services', description: 'End-to-end management of IT operations, ensuring 99.99% uptime and proactive maintenance.' },
  { id: 'strategic-talent-solutions', icon: Users, title: 'Strategic Technology Talent Solutions', description: 'Access elite, certified technology architects and engineers to scale your global operations instantly.' },
  { id: 'ai-analytics', icon: Brain, title: 'Intelligent AI, Agentic AI & Analytics', description: 'Deploy autonomous agents and predictive models to automate complex enterprise workflows.' },
  { id: 'cyber-security', icon: ShieldCheck, title: 'Cyber Security Services & Solutions', description: 'Zero-Trust architecture and proactive SOC monitoring to secure your digital perimeter globally.' },
  { id: 'web-app-modernization', icon: TabletSmartphone, title: 'Next-Gen Web & App Modernization', description: 'Refactor and rebuild legacy applications into high-performance, scalable cloud-native platforms.' },
  { id: 'api-integrations', icon: Link2, title: 'API, Integrations & Customizations', description: 'Eliminate data silos with seamless API-led connectivity across your entire enterprise ecosystem.' },
];

const ServiceCard = ({ id, icon: Icon, title, description }) => (
  <div 
    className="
      group bg-white/70 backdrop-blur-lg border border-white rounded-2xl p-8 shadow-sm 
      transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 hover:border-blue-200/80
      flex flex-col
      w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]
    "
  >
    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-slate-100 bg-white shadow-sm transition-colors duration-300 group-hover:bg-blue-50 group-hover:border-blue-100">
      <Icon size={24} className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />
    </div>
    <h3 className="text-lg font-extrabold text-slate-900 mb-3 leading-tight tracking-tight">{title}</h3>
    <p className="text-sm text-slate-600 mb-6 flex-grow leading-relaxed font-medium">{description}</p>
    
    <Link 
      to={`/services/${id}`} 
      className="text-sm font-bold text-blue-600 flex items-center gap-1.5 transition-all mt-auto group-hover:text-blue-800"
    >
      Learn More <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </Link>
  </div>
);

const commitments = [
  {
    id: 'vision',
    icon: Eye,
    title: "Our Vision",
    content: "To lead the global digital transformation by setting the standard for innovation and reliability.",
    // Back: deep navy → royal blue
    backGradient: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 40%, #1d4ed8 100%)",
    backGlow: "rgba(29,78,216,0.35)",
    accentLine: "#3b82f6",
    // Front: soft sky-blue tinted glass
    frontGradient: "linear-gradient(145deg, rgba(219,234,254,0.82) 0%, rgba(191,219,254,0.55) 50%, rgba(255,255,255,0.75) 100%)",
    frontBorder: "rgba(59,130,246,0.22)",
    iconBg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    iconColor: "#1d4ed8",
    iconShadow: "rgba(29,78,216,0.25)",
    numColor: "#1e40af",
    numberLabel: "01",
  },
  {
    id: 'mission',
    icon: Flag,
    title: "Our Mission",
    content: "Empowering businesses with resilient, scalable, and intelligent technology solutions.",
    // Back: slate-indigo → blue-violet
    backGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 38%, #4338ca 100%)",
    backGlow: "rgba(67,56,202,0.35)",
    accentLine: "#6366f1",
    // Front: soft indigo-lavender tinted glass
    frontGradient: "linear-gradient(145deg, rgba(224,231,255,0.85) 0%, rgba(199,210,254,0.55) 50%, rgba(255,255,255,0.78) 100%)",
    frontBorder: "rgba(99,102,241,0.22)",
    iconBg: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
    iconColor: "#4338ca",
    iconShadow: "rgba(67,56,202,0.25)",
    numColor: "#3730a3",
    numberLabel: "02",
  },
  {
    id: 'promise',
    icon: Handshake,
    title: "Our Promise",
    content: "We promise an unwavering partnership, complete transparency, and absolute accountability.",
    // Back: dark sapphire → periwinkle
    backGradient: "linear-gradient(135deg, #172554 0%, #1e40af 42%, #2563eb 100%)",
    backGlow: "rgba(37,99,235,0.35)",
    accentLine: "#60a5fa",
    // Front: cornflower-blue tinted glass
    frontGradient: "linear-gradient(145deg, rgba(214,231,255,0.84) 0%, rgba(186,218,255,0.54) 50%, rgba(255,255,255,0.76) 100%)",
    frontBorder: "rgba(37,99,235,0.22)",
    iconBg: "linear-gradient(135deg, #dbeafe 0%, #bae6fd 100%)",
    iconColor: "#2563eb",
    iconShadow: "rgba(37,99,235,0.25)",
    numColor: "#1d4ed8",
    numberLabel: "03",
  }
];

const CommitmentSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-transparent z-10 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .commit-card { perspective: 1200px; }

        .commit-inner {
          transition: transform 0.75s cubic-bezier(0.34, 1.04, 0.64, 1);
          transform-style: preserve-3d;
          position: relative; width: 100%; height: 100%;
        }
        .commit-card:hover .commit-inner { transform: rotateY(180deg); }

        .commit-front, .commit-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: absolute; inset: 0;
          border-radius: 20px;
        }
        .commit-back { transform: rotateY(180deg); }

        /* Front shimmer sweep on hover */
        .commit-front::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 20px;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
          background-size: 200% 100%;
          background-position: 200% 0;
          transition: background-position 0.6s ease;
          pointer-events: none;
        }
        .commit-card:hover .commit-front::after { background-position: -100% 0; }

        /* Number label */
        .num-label {
          font-family: 'DM Serif Display', serif;
          font-size: 72px;
          line-height: 1;
          letter-spacing: -2px;
          opacity: 0.06;
          color: #1e3a8a;
          position: absolute;
          top: -8px; right: 16px;
          pointer-events: none;
          user-select: none;
        }

        /* Ruled accent line */
        .accent-rule {
          width: 36px; height: 2px;
          border-radius: 2px;
          margin: 14px auto 0;
          transition: width 0.4s ease;
        }
        .commit-card:hover .accent-rule { width: 56px; }

        /* Back card inner glow */
        .back-inner-glow {
          position: absolute; inset: 0;
          border-radius: 20px;
          background: radial-gradient(ellipse 75% 60% at 30% 20%, rgba(255,255,255,0.10) 0%, transparent 65%);
          pointer-events: none;
        }
        /* Back corner orbs */
        .back-orb-tl {
          position: absolute; top: -40px; right: -30px;
          width: 140px; height: 140px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          filter: blur(24px);
          pointer-events: none;
        }
        .back-orb-br {
          position: absolute; bottom: -35px; left: -25px;
          width: 110px; height: 110px;
          border-radius: 50%;
          background: rgba(0,0,0,0.12);
          filter: blur(20px);
          pointer-events: none;
        }

        /* Quote mark styling */
        .back-quote {
          font-family: 'DM Serif Display', serif;
          font-size: 88px;
          line-height: 0.6;
          color: rgba(255,255,255,0.13);
          position: absolute;
          top: 22px; left: 22px;
          pointer-events: none;
          user-select: none;
        }

        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #0f172a;
          letter-spacing: -0.02em;
        }
        .section-sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          color: #64748b;
          letter-spacing: 0.01em;
        }
        .card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.5rem;
          color: #0f172a;
          letter-spacing: -0.01em;
        }
        .card-body {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
        }
        .back-text {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 1.05rem;
          line-height: 1.7;
          letter-spacing: 0.015em;
          color: rgba(255,255,255,0.92);
        }
        .hint-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #94a3b8;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            The 1TecHub Commitment
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {commitments.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="commit-card h-[340px] w-full cursor-pointer">
                <div className="commit-inner">

                  {/* ── FRONT ── */}
                  <div
                    className="commit-front flex flex-col items-center justify-center text-center px-8 pt-8 pb-6"
                    style={{
                      background: item.frontGradient,
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: `1px solid ${item.frontBorder}`,
                      boxShadow: `0 4px 28px -4px ${item.iconShadow}, 0 1px 4px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,0.85)`,
                    }}
                  >
                    {/* Large ghost number */}
                    <span className="num-label" style={{ color: item.numColor }}>{item.numberLabel}</span>

                    {/* Icon container */}
                    <div
                      className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-5 flex-shrink-0"
                      style={{
                        background: item.iconBg,
                        border: `1px solid ${item.frontBorder}`,
                        boxShadow: `0 4px 16px -2px ${item.iconShadow}`,
                      }}
                    >
                      <Icon size={30} style={{ color: item.iconColor }} strokeWidth={1.5} />
                    </div>

                    <h3 className="card-title">{item.title}</h3>

                    {/* Accent rule */}
                    <div className="accent-rule" style={{ background: item.accentLine }} />

                    {/* Hint */}
                    <span className="hint-text absolute bottom-5" style={{ color: item.iconColor, opacity: 0.45 }}>
                      Hover to reveal
                    </span>
                  </div>

                  {/* ── BACK ── */}
                  <div
                    className="commit-back flex flex-col items-center justify-center text-center px-8"
                    style={{
                      background: item.backGradient,
                      boxShadow: `0 20px 48px -8px ${item.backGlow}, 0 4px 16px -4px rgba(0,0,0,0.2)`,
                      border: "1px solid rgba(255,255,255,0.10)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Decorative layers */}
                    <div className="back-orb-tl" />
                    <div className="back-orb-br" />
                    <div className="back-inner-glow" />
                    <span className="back-quote">"</span>

                    {/* Icon */}
                    <Icon
                      size={28}
                      strokeWidth={1}
                      style={{ color: "rgba(255,255,255,0.55)", marginBottom: "20px", flexShrink: 0 }}
                    />

                    {/* Content */}
                    <p className="back-text relative z-10">
                      {item.content}
                    </p>

                    {/* Bottom ruled line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-[20px]"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${item.accentLine}99 40%, ${item.accentLine}99 60%, transparent 100%)`,
                      }}
                    />
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EnterpriseSolutionsSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-white/30 backdrop-blur-sm border-t border-white/40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Comprehensive Enterprise Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Explore our full suite of technology services designed to optimize infrastructure and accelerate digital growth.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

      </div>
    </section>
  );
};

const steps = [
  {
    id: "step-1",
    label: "Assess & Architect",
    num: "01",
    title: "Discovery & Strategic Planning",
    description:
      "We begin by deeply analyzing your current technology landscape and business goals. Our enterprise architects assess your infrastructure, identify security gaps, and map out integration points. We deliver a comprehensive, vendor-agnostic blueprint designed for scalability, security, and long-term digital resilience.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    accent: "#3b82f6", 
    prefilledMessage: "Hi Team,\n\nWe are interested in the 'Assess & Architect' phase of your methodology. We would like to assess our current technology landscape and discuss a strategic roadmap for our enterprise.\n\nPlease let me know the next steps."
  },
  {
    id: "step-2",
    label: "Execute & Integrate",
    num: "02",
    title: "Agile Development & Modernization",
    description:
      "Moving from blueprint to reality, we deploy specialized tech talent and agile squads to build, modernize, and unify your systems. This phase covers migrating legacy applications, developing secure APIs, and integrating intelligent AI models with a zero-disruption approach that ensures your business never stops running.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    accent: "#8b5cf6", 
    prefilledMessage: "Hi Team,\n\nWe are looking for execution and integration support. We need to modernize our existing systems, integrate APIs, and deploy new solutions without disrupting our current operations.\n\nLet's discuss how your agile teams can assist us."
  },
  {
    id: "step-3",
    label: "Govern & Optimize",
    num: "03",
    title: "Continuous Operations & Security",
    description:
      "Post-deployment, we shift focus to proactive management and continuous improvement. Our managed services teams and 24/7 Security Operations Center (SOC) take over daily governance. We enforce zero-trust security policies, ensure 99.99% uptime, and continuously optimize cloud costs to keep your enterprise ahead of the curve.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    accent: "#06b6d4", 
    prefilledMessage: "Hi Team,\n\nWe need robust managed services and security governance for our operations. We are interested in your 24/7 support, proactive monitoring, and continuous optimization frameworks.\n\nPlease reach out to discuss further."
  },
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(index); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleLearnMore = (step) => {
    // Removed the specific service mapping, relying only on the pre-filled message
    navigate('/contact', {
      state: {
        selectedServices: [], 
        prefilledMessage: step.prefilledMessage
      }
    });
  };

  const accent = steps[activeStep].accent;

  return (
    <>
      <style>{`
        .ps {
          background:
            radial-gradient(ellipse 80% 50% at 10% 20%, rgba(59,130,246,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 90% 80%, rgba(139,92,246,0.06) 0%, transparent 55%),
            #f8fafc;
        }
        .step-card { transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease; }
        .step-card.active { opacity: 1; transform: scale(1); box-shadow: 0 24px 64px -12px rgba(0,0,0,0.12); }
        .step-card.inactive { opacity: 0.3; transform: scale(0.97); }
        .sdot { transition: top 0.5s cubic-bezier(0.34,1.56,0.64,1), background 0.4s, box-shadow 0.4s; }
        .al { transition: width 0.6s cubic-bezier(0.34,1.56,0.64,1), background 0.5s; }
        .card-img img { transition: transform 2s ease; }
        .card-img:hover img { transform: scale(1.04); }
      `}</style>

      <section className="ps relative w-full py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">

          <div className="mb-16 md:mb-24 max-w-xl relative z-10">
            <span className="df inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-4 px-3 py-1 rounded-full border transition-colors duration-500"
              style={{ color: accent, borderColor: `${accent}30`, background: `${accent}0d` }}>
              Our Methodology
            </span>
            <h2 className="df text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-5 transition-colors duration-500 break-words">
              How We Transform<br />
              <span style={{ color: accent }}>Your Operations</span>
            </h2>
            <div className="al h-[3px] rounded-full mb-6" style={{ width: 64, background: accent }} />
            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
              A proven, scalable framework designed to seamlessly guide your enterprise from strategic planning to autonomous execution.
            </p>
          </div>

          <div className="flex lg:hidden gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar w-full">
            {steps.map((step, i) => (
              <button key={step.id}
                className="flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300"
                style={activeStep === i
                  ? { background: accent, color: "#fff", borderColor: accent }
                  : { background: "#fff", color: "#64748b", borderColor: "#e2e8f0" }}
                onClick={() => stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}>
                {step.num} — {step.label}
              </button>
            ))}
          </div>

          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16 lg:items-start relative z-10">

            <aside
              className="hidden lg:block"
              style={{ position: "sticky", top: "7rem", alignSelf: "start" }}
            >
              <div className="df absolute -top-8 -left-4 text-[9rem] font-extrabold leading-none select-none pointer-events-none"
                style={{ color: `${accent}12`, transition: "color 0.5s" }}>
                {steps[activeStep].num}
              </div>

              <div className="relative">
                <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-8">Process Phase</p>

                <div className="relative pl-7 border-l-2 border-slate-200 space-y-9">
                  <div className="sdot absolute left-[-5px] w-[10px] h-[10px] rounded-full z-10"
                    style={{
                      background: accent,
                      boxShadow: `0 0 0 4px ${accent}22, 0 0 14px ${accent}66`,
                      top: `calc(${activeStep} * (100% / 2.65) + 4px)`,
                    }} />

                  {steps.map((step, i) => (
                    <button key={step.id}
                      className="block text-left w-full group"
                      onClick={() => stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}>
                      <span className="df text-[10px] font-bold tracking-widest uppercase block mb-1"
                        style={{ color: activeStep === i ? accent : "#94a3b8", transition: "color 0.4s" }}>
                        Phase {step.num}
                      </span>
                      <span className="df text-lg lg:text-xl font-bold block group-hover:text-slate-700"
                        style={{
                          color: activeStep === i ? "#0f172a" : "#94a3b8",
                          transform: activeStep === i ? "translateX(8px)" : "translateX(0)",
                          transition: "color 0.4s, transform 0.4s"
                        }}>
                        {step.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-12 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                      background: `linear-gradient(90deg, ${accent}, ${accent}88)`
                    }} />
                </div>
              </div>
            </aside>

            <div className="flex flex-col gap-20 lg:gap-28 pb-24">
              {steps.map((step, index) => (
                <div key={step.id}
                  ref={(el) => (stepRefs.current[index] = el)}
                  data-index={index}
                  className="scroll-mt-32">

                  <div className={`step-card relative bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm ${activeStep === index ? "active" : "inactive"}`}>

                    <div className="absolute top-0 left-0 right-0 h-[4px] z-10 transition-all duration-500"
                      style={{ background: activeStep === index ? `linear-gradient(90deg, ${step.accent}, ${step.accent}44)` : "transparent" }} />

                    <div className="card-img relative w-full h-56 sm:h-72 lg:h-[420px] overflow-hidden bg-slate-100">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

                      <div className="absolute top-6 left-6 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/80"
                        style={{ boxShadow: activeStep === index ? `0 4px 20px ${step.accent}44` : "0 2px 8px rgba(0,0,0,0.1)" }}>
                        <span className="df font-extrabold text-xl" style={{ color: step.accent }}>{step.num}</span>
                      </div>

                      <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase backdrop-blur-md border shadow-lg"
                        style={{ background: `${step.accent}99`, borderColor: `${step.accent}44`, color: "#fff" }}>
                        {step.label}
                      </div>
                    </div>

                    <div className="p-6 sm:p-10 lg:p-12">
                      <h3 className="df text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
                        {step.title}
                      </h3>
                      <div className="al h-[2px] rounded-full mb-6"
                        style={{ width: activeStep === index ? 48 : 20, background: step.accent }} />
                      <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium max-w-3xl mb-10">
                        {step.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-100">
                        <button 
                          onClick={() => handleLearnMore(step)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white hover:shadow-lg hover:opacity-90 active:scale-95 transition-all w-full sm:w-auto"
                          style={{ background: step.accent, boxShadow: `0 4px 14px ${step.accent}66` }}>
                          Discuss this phase
                          <ArrowRight size={18} />
                        </button>

                        <span className="text-slate-400 text-xs sm:text-sm font-bold tracking-wider uppercase text-center sm:text-right">
                          {index < steps.length - 1 ? `Next: ${steps[index + 1].label}` : "Continuous Loop"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

const AIDivisionCTA = () => {
  const aiWebsiteUrl = "https://1techub.ai";

  return (
    <>
      <style>{`
        .ai-cta-section {
          font-family: 'Rajdhani', sans-serif;
        }

        @keyframes nodeFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          33% { transform: translate(8px, -12px) scale(1.1); opacity: 1; }
          66% { transform: translate(-6px, 6px) scale(0.9); opacity: 0.4; }
        }
        @keyframes linePulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.22; }
        }
        @keyframes scanX {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes scanY {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(600%); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(0,230,255,0.3), 0 0 60px rgba(0,230,255,0.1); }
          50% { box-shadow: 0 0 50px rgba(0,230,255,0.5), 0 0 100px rgba(0,230,255,0.2), 0 0 150px rgba(139,92,246,0.15); }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(0,230,255,0.4), 0 0 40px rgba(0,230,255,0.2); }
          50% { text-shadow: 0 0 40px rgba(0,230,255,0.7), 0 0 80px rgba(0,230,255,0.3), 0 0 120px rgba(139,92,246,0.2); }
        }
        @keyframes ctaHoverShimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes badgePing {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes floatWord {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .ai-portal-card {
          position: relative;
          background: 
            radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,230,255,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 100%, rgba(139,92,246,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 50% at 10% 50%, rgba(0,150,255,0.07) 0%, transparent 50%),
            #030b18;
          border: 1px solid rgba(0,230,255,0.15);
          overflow: hidden;
        }

        .node { animation: nodeFloat var(--dur, 8s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .line-h { animation: linePulse var(--dur, 4s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .line-v { animation: linePulse var(--dur, 5s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .scan-line-h { animation: scanX 8s linear infinite; animation-delay: var(--delay, 0s); }
        .scan-line-v { animation: scanY 12s linear infinite; animation-delay: var(--delay, 0s); }

        .ai-headline {
          font-family: 'Syne', sans-serif;
          animation: textGlow 4s ease-in-out infinite;
        }

        .ai-cta-btn {
          position: relative;
          background: linear-gradient(135deg, #00e6ff, #0099ff, #7c3aed, #00e6ff);
          background-size: 300% 100%;
          animation: ctaHoverShimmer 4s linear infinite;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation-play-state: paused;
        }
        .ai-cta-btn:hover {
          animation-play-state: running;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 40px rgba(0,230,255,0.5), 0 20px 40px rgba(0,0,0,0.4);
        }
        .ai-cta-btn:active { transform: scale(0.97); }
        .glow-ring { animation: glowPulse 3s ease-in-out infinite; }

        .badge-ping::after {
          content: ''; position: absolute; inset: 0; border-radius: 9999px; background: rgba(0,230,255,0.4);
          animation: badgePing 2s cubic-bezier(0,0,0.2,1) infinite;
        }

        .float-word { animation: floatWord 4s ease-in-out infinite; }
        .float-word:nth-child(2) { animation-delay: 0.5s; }
        .float-word:nth-child(3) { animation-delay: 1s; }

        .corner-bracket::before, .corner-bracket::after {
          content: ''; position: absolute; width: 16px; height: 16px; border-color: rgba(0,230,255,0.5); border-style: solid;
        }
        .corner-tl::before { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .corner-tr::after { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .corner-bl::before { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .corner-br::after { bottom: 0; right: 0; border-width: 0 2px 2px 0; }
      `}</style>

      <section className="ai-cta-section relative py-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="ai-portal-card rounded-[2.5rem] sm:rounded-[3rem] py-16 sm:py-24 px-6 sm:px-12 md:px-20">

            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              {[15, 30, 45, 60, 75, 90].map((y, i) => (
                <line key={`h${i}`} className="line-h" x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="rgba(0,230,255,0.12)" strokeWidth="1" style={{ '--dur': `${4 + i}s`, '--delay': `${i * 0.5}s` }} />
              ))}
              {[10, 25, 40, 55, 70, 85].map((x, i) => (
                <line key={`v${i}`} className="line-v" x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="rgba(0,230,255,0.08)" strokeWidth="1" style={{ '--dur': `${5 + i}s`, '--delay': `${i * 0.7}s` }} />
              ))}
              <line x1="10%" y1="15%" x2="25%" y2="30%" stroke="rgba(0,230,255,0.15)" strokeWidth="1" className="line-h" style={{ '--dur': '6s' }} />
              <line x1="25%" y1="30%" x2="55%" y2="15%" stroke="rgba(0,230,255,0.12)" strokeWidth="1" className="line-h" style={{ '--dur': '7s', '--delay': '1s' }} />
              <line x1="85%" y1="45%" x2="70%" y2="75%" stroke="rgba(139,92,246,0.2)" strokeWidth="1" className="line-h" style={{ '--dur': '5s', '--delay': '0.5s' }} />
              <line x1="10%" y1="75%" x2="40%" y2="60%" stroke="rgba(0,230,255,0.1)" strokeWidth="1" className="line-h" style={{ '--dur': '8s', '--delay': '2s' }} />
              {[
                { cx: "10%", cy: "15%", r: 3, dur: "7s", delay: "0s" },
                { cx: "25%", cy: "30%", r: 4, dur: "9s", delay: "1s" },
                { cx: "55%", cy: "15%", r: 2.5, dur: "6s", delay: "2s" },
                { cx: "85%", cy: "25%", r: 3.5, dur: "8s", delay: "0.5s" },
                { cx: "70%", cy: "75%", r: 3, dur: "10s", delay: "1.5s" },
                { cx: "40%", cy: "60%", r: 2, dur: "7s", delay: "3s" },
                { cx: "10%", cy: "75%", r: 4, dur: "9s", delay: "0.8s" },
                { cx: "90%", cy: "60%", r: 2.5, dur: "6s", delay: "2.2s" },
              ].map((n, i) => (
                <circle key={i} className="node" cx={n.cx} cy={n.cy} r={n.r} fill="rgba(0,230,255,0.7)" style={{ '--dur': n.dur, '--delay': n.delay }} filter="url(#nodeGlow)" />
              ))}
              <defs>
                <filter id="nodeGlow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
            </svg>

            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="scan-line-h absolute top-[20%] left-0 w-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,230,255,0.6), transparent)', '--delay': '0s' }} />
              <div className="scan-line-h absolute top-[65%] left-0 w-1/5 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)', '--delay': '4s' }} />
              <div className="scan-line-v absolute left-[30%] top-0 w-[1px] h-1/4" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,230,255,0.4), transparent)', '--delay': '2s' }} />
            </div>

            <div className="absolute top-8 left-8 w-8 h-8 corner-bracket corner-tl" />
            <div className="absolute top-8 right-8 w-8 h-8 corner-bracket corner-tr" />
            <div className="absolute bottom-8 left-8 w-8 h-8 corner-bracket corner-bl" />
            <div className="absolute bottom-8 right-8 w-8 h-8 corner-bracket corner-br" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="relative flex items-center gap-2.5 mb-8">
                <span className="badge-ping relative flex h-2.5 w-2.5">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
                </span>
                <span className="font-semibold text-[10px] sm:text-xs tracking-[0.3em] uppercase text-cyan-400/90" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  1TecHub · AI Division · Live
                </span>
                <span className="hidden sm:block w-12 h-[1px] bg-gradient-to-r from-cyan-400/60 to-transparent" />
              </div>

              <h2 className="ai-headline text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tight mb-2 break-words">
                TECHNOLOGY
              </h2>
              <h2 className="ai-headline text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1] tracking-tight mb-8 break-words" style={{ color: '#00e6ff' }}>
                SIMPLIFIED.
              </h2>

              <p className="text-slate-400 text-sm sm:text-base md:text-xl font-medium leading-relaxed max-w-2xl mb-8 sm:mb-12" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Our dedicated AI division orchestrates intelligence for the autonomous age — agentic workflows, predictive models, and autonomous enterprise systems.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
                {["Agentic AI", "Predictive Analytics", "Autonomous Workflows", "LLM Integration"].map((tag, i) => (
                  <span key={tag} className="float-word px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold tracking-wider uppercase border"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: i % 2 === 0 ? 'rgba(0,230,255,0.85)' : 'rgba(139,92,246,0.9)',
                      borderColor: i % 2 === 0 ? 'rgba(0,230,255,0.2)' : 'rgba(139,92,246,0.25)',
                      background: i % 2 === 0 ? 'rgba(0,230,255,0.05)' : 'rgba(139,92,246,0.06)',
                      animationDelay: `${i * 0.4}s`
                    }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="items-center gap-4">
                <a href={aiWebsiteUrl} target="_blank" rel="noopener noreferrer"
                  className="ai-cta-btn glow-ring group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-base font-bold text-[#030b18] tracking-wide flex items-center gap-3 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" fill="currentColor" />
                  </svg>
                  Explore AI Division
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <span className="text-slate-600 text-[10px] sm:text-xs tracking-widest uppercase font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  1techub.ai ↗
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const TransmissionTeaser = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const q = query(collection(db, "blog_posts"), where("status", "==", "active"));
        const snap = await getDocs(q);
        
        if (!snap.empty) {
          const sortedDocs = snap.docs.sort((a, b) => {
            const timeA = a.data().createdAt?.toMillis() || 0;
            const timeB = b.data().createdAt?.toMillis() || 0;
            return timeB - timeA;
          });

          const topDocs = sortedDocs.slice(0, 2).map(doc => {
            const data = doc.data();
            let dateStr = "PENDING";
            if (data.createdAt) {
              const d = data.createdAt.toDate();
              dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
            }
            return {
              id: doc.id,
              ...data,
              dateStr,
              featuredImage: data.featuredImage || "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop"
            };
          });

          setLatestPosts(topDocs);
        }
      } catch (error) {
        console.error("Error fetching latest transmissions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <section id="transmissions-teaser" className="relative w-full py-16 md:py-24 px-4 sm:px-6 bg-white/40 backdrop-blur-md border-t border-white/60 font-sans overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center md:items-start">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-700 uppercase font-mono">
            Latest Insights
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 sm:mb-16 w-full text-center md:text-left">
          <div className="space-y-4 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] flex flex-wrap justify-center md:justify-start">
              Editorial &nbsp;
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Transmissions
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
              Access our library of editorial blogs and technical articles. Deep dives into AI, autonomous systems, and the frameworks governing the future of enterprise.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="w-full h-64 md:h-96 border border-slate-200 rounded-3xl bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center text-blue-600 gap-4 shadow-sm">
            <Loader2 size={40} className="animate-spin text-blue-600" />
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Loading Data...</p>
          </div>
        ) : latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
            {latestPosts.map((post) => (
              <Link key={post.id} to={`/blogs/${post.id}`} className="block group h-full" state={{ fromHome: true }}>
                <div className="relative flex flex-col h-full border border-white rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-lg hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-300">
                  
                  <div className="h-56 sm:h-72 relative overflow-hidden bg-slate-100 shrink-0">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-slate-700 uppercase font-mono bg-white/90 px-3 py-1.5 rounded-lg backdrop-blur-md border border-slate-200 shadow-sm">
                      <Clock size={12} className="text-blue-600" />
                      {post.dateStr}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 flex flex-col flex-grow relative z-10 justify-between">
                    <div>
                      <div className="px-3 py-1 border border-blue-200 rounded text-[9px] font-bold text-blue-700 tracking-[0.2em] uppercase mb-4 sm:mb-5 w-max font-mono bg-blue-50">
                        Article
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-[1.25] tracking-tight mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 text-slate-900 text-left">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 font-medium text-xs sm:text-sm md:text-base mb-6 sm:mb-8 leading-relaxed line-clamp-3 text-left">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase w-max group-hover:text-blue-800 transition-colors mt-auto">
                      Read Transmission <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/30 shadow-[0_0_15px_rgba(96,165,250,0.5)] transform -translate-y-full group-hover:animate-[scan_3s_ease-in-out_infinite] hidden lg:block z-20 pointer-events-none"></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full py-20 border border-dashed border-slate-300 rounded-3xl bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center text-slate-500 gap-4">
            <BookOpen size={40} className="text-slate-400" />
            <p className="font-mono text-xs uppercase tracking-widest">No transmissions available.</p>
          </div>
        )}
        
        <div className="w-full flex justify-center md:justify-start">
          <Link 
            to="/blogs"
            className="mt-10 sm:mt-12 group flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-blue-700 transition-all w-full sm:w-auto shrink-0"
          >
            Access All Records
            <ChevronRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 15s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes scan {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(800px); opacity: 0; }
          }
        `}
      </style>

      {/* Main Page Wrapper. No overflow-x-hidden here to preserve sticky sidebars inside components. */}
      <div className="min-h-screen flex flex-col relative bg-[#f8fafc] w-full">
        
        <AmbientBackground />
        <Navbar />
        
        <main className="flex-grow relative z-10 flex flex-col w-full">
          <Hero />
          <CommitmentSection />
          <EnterpriseSolutionsSection />
          <ProcessSection />
          <AIDivisionCTA />
          <TransmissionTeaser />
          <section className="relative w-full py-5 bg-transparent overflow-hidden border-t border-slate-800/50">
              <div className="w-full md:w-3/4 lg:w-1/2 py-12 md:py-24 px-4 md:px-6 flex flex-col justify-center items-center mx-auto relative z-10">
                <MessageForm />
              </div>
          </section>
        </main>

        <Footer className="relative z-10" />
      </div>
    </>
  );
};

export default Home;