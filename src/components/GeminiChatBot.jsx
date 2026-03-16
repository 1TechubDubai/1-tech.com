import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CalendarCheck, Trash2, ArrowDown, Mic, MicOff, Volume2, VolumeX, 
  Bot, User, Send, X, ArrowRight, ChevronLeft, LayoutGrid, Loader2,
  Building2, Smartphone, Truck, Database, BrainCircuit, Server, 
  Cloud, HeartPulse, Network, ShieldCheck, Key, Globe, PieChart, 
  LineChart, Recycle, ChevronDown, Search
} from 'lucide-react'; 

// Core enterprise services matching your exact data structure
const CORE_SERVICES = [
  "Enterprise GTM & Market Expansion",
  "Enterprise IT Managed Services", 
  "Strategic Technology Talent Solutions", 
  "Intelligent AI, Agentic AI & Analytics", 
  "Enterprise Cyber Security Managed Services", 
  "Next-Gen Web & App Modernization", 
  "API, Integrations & Customizations"
];

// List of supported languages for speech and bot responses
const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'ar-SA', name: 'Arabic' },
  { code: 'zh-CN', name: 'Mandarin' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'pt-BR', name: 'Portuguese' },
  { code: 'ru-RU', name: 'Russian' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'nl-NL', name: 'Dutch' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'tr-TR', name: 'Turkish' }
].sort((a, b) => a.name.localeCompare(b.name));

// --- PORTFOLIO DATA ---
const portfolioData = [
  {
    id: 1,
    client: "No.1 Fast-Moving Consumer Goods (FMCG) Company",
    shortName: "Moroccan FMCG Leader", 
    location: "Morocco",
    type: "Full Digital Transformation",
    status: "Completely Outsourced to 1TecHub",
    overview: "1TecHub is the exclusive digital transformation partner for Morocco's leading FMCG enterprise, managing every technology initiative across applications, mobility, Artificial Intelligence (AI), analytics, cloud, and IT operations.",
    icon: Building2,
    programs: [
      { title: "Application Modernization", desc: "Dalaa Baby App modernization, SBD Admin platform, retail engagement apps, and field-force enablement tools providing data-driven mobile capabilities for sales, inventory, and marketing.", icon: Smartphone },
      { title: "Fleet & Logistics Automation", desc: "Intelligent routing and dispatch, AI-powered fleet monitoring, and driver workflow automation creating a real-time logistics control tower.", icon: Truck },
      { title: "Data Warehouse & Data Lake", desc: "Unified corporate data platform featuring standardized data models and a multi-source ingestion framework as the foundation for enterprise analytics and AI.", icon: Database },
      { title: "AI Insights & Agentic Automation", desc: "Retail sales intelligence, inventory and demand forecasting, agentic bots for reporting, and AI-driven decision automation.", icon: BrainCircuit },
      { title: "Enterprise Resource Planning (ERP) Support", desc: "Ticketing and L1-L3 support, incident, change, and release governance, alongside a continuous enhancement and stabilization roadmap.", icon: Server },
      { title: "Full IT & Infrastructure Support", desc: "Cloud hosting and infrastructure modernization, server and network administration, disaster recovery readiness, and Azure cloud roadmap execution.", icon: Cloud }
    ],
    outcome: "A fully digital, data-driven enterprise ecosystem built, run, and governed entirely by 1TecHub—enabling rapid market expansion and operational excellence across Morocco."
  },
  {
    id: 2,
    client: "Leading Healthcare Distribution Group",
    shortName: "MEA Healthcare Distributor", 
    location: "Middle East & Africa (MEA)",
    type: "Complete IT Managed Services",
    status: "Outsourced to 1TecHub",
    overview: "This multi-country healthcare distributor relies on 1TecHub as its central IT engine, outsourcing operations across ERP, cybersecurity, integrations, automation, and cloud environments.",
    icon: HeartPulse,
    programs: [
        { title: "SAP S4 Hana Managed Services", desc: "Multi-year contract delivered through a certified Systems Integrator (SI). Features centralized global support, onsite/offshore hybrid models, and 24/7 functional and technical operations.", icon: Database },
        { title: "Multi-Year Cloud Managed Services", desc: "Comprehensive management across Amazon Web Services (AWS), Azure, and Oracle Cloud Infrastructure (OCI), handling rollouts, enhancements, and integrations.", icon: Cloud },
        { title: "Enterprise API Modernization", desc: "Modernization of Application Programming Interface (API) gateways, implementing cross-business system integrations and secure interoperability frameworks.", icon: Network },
        { title: "Cybersecurity Managed Services", desc: "24/7 Security Operations Center (SOC) operations, threat detection, incident response, vulnerability lifecycle management, and regulatory compliance oversight.", icon: ShieldCheck },
        { title: "IAM & PAM Managed Services", desc: "End-to-end Identity and Access Management (IAM) and Privileged Access Management (PAM), encompassing identity governance, user lifecycle automation, and auditing.", icon: Key },
        { title: "Offshore Resource Managed Services", desc: "Dedicated offshore engineering and support teams delivered from India, providing cost-efficient and scalable enterprise capabilities across application management, cloud operations, cybersecurity, and development. Structured engagement models ensure seamless integration with client teams through hybrid onsite–offshore delivery and 24/7 operational coverage.", icon: Globe }
    ],
    outcome: "A modern, secure, and fully governed IT ecosystem enabling streamlined, compliant healthcare distribution across the entire MEA region."
  },
  {
    id: 3,
    client: "Global Healthcare Group",
    shortName: "Global Healthcare (GCC)", 
    location: "GCC Region",
    type: "Enterprise Finance Transformation",
    status: "Oracle Suite Implementation",
    overview: "A multinational healthcare organization partnered with 1TecHub to completely modernize their financial consolidation, compliance, and multi-entity reporting structures.",
    icon: Building2,
    programs: [
      { title: "Oracle FCCS Implementation", desc: "Deployment of Oracle Financial Consolidation and Close Cloud Service (FCCS) to automate financial consolidation, handling currency, entity, and intercompany eliminations.", icon: PieChart },
      { title: "Enterprise Financial Analytics", desc: "Establishment of unified group reporting frameworks to provide deep, actionable insights into financial health across the enterprise.", icon: LineChart },
      { title: "Deep ERP-Finance Integrations", desc: "Two additional ongoing Oracle programs dedicated to global financial visibility and deep digital finance modernization.", icon: Network }
    ],
    outcome: "A real-time, standardized, and fully compliant multi-entity financial reporting ecosystem seamlessly spanning multiple global companies."
  },
  {
    id: 4,
    client: "Global Waste Management Company",
    shortName: "Oman Waste Management", 
    location: "Oman",
    type: "Complete Digital Transformation",
    status: "Outsourced to 1TecHub",
    overview: "Oman's largest waste management operator entrusted 1TecHub with the complete, end-to-end digitalization of its ERP, fleet operations, and overarching cloud landscape.",
    icon: Recycle,
    programs: [
      { title: "SAP Business One Implementation", desc: "Full module deployment covering Finance, Procurement, Inventory, Contracting, and Billing. Delivered through a certified SI with 1TecHub governing quality and timelines.", icon: Database },
      { title: "AI-Powered Fleet Operations", desc: "Implementation of route optimization, truck tracking via geo-intelligence, landfill automation, and smart-bin intelligence for collection scheduling.", icon: Truck },
      { title: "Cloud & Network Modernization", desc: "Comprehensive infrastructure assessment and architecture, executing a secure cloud migration roadmap to create a modernized network backbone.", icon: Cloud },
      { title: "Microsoft 365 Tenant Migration", desc: "Complex tenant-to-tenant consolidation including identity, mailbox, and data migration executed with a zero-downtime cutover strategy.", icon: Server }
    ],
    outcome: "A fully digital, AI-enabled waste management platform featuring central governance, real-time fleet visibility, and seamless ERP operations."
  }
];

// Highly optimized prompt for maximum accuracy and strict boundary control
// We pass the currently selected language here so the AI knows to speak it.
const getSystemPrompt = (languageName) => `You are the official AI advisory assistant for 1TecHub. 

CRITICAL INSTRUCTION: You MUST communicate and respond to the user entirely in the following language: ${languageName}.

YOUR PERSONA & INSTRUCTIONS:
- Tone: Professional, highly confident, concise, and business-focused.
- Boundaries: ONLY discuss the services and methodology explicitly listed below. Do NOT invent or assume services. If a user asks about something unrelated, politely inform them that 1TecHub specializes in enterprise digital transformation and offer to connect them with our experts.
- Formatting: Use concise bullet points for readability. Always end responses with a polite, guiding follow-up question.

OUR 7 CORE CAPABILITIES:
1) Enterprise IT Managed Services: SAP/Oracle mgmt, infra governance, Cyber Security Operations, 24x7 support.
2) Strategic Technology Talent Solutions: Contract/CXO hiring, offshore teams deployed in 24-72 hrs, lifecycle mgmt.
3) Intelligent AI, Agentic AI & Analytics: Autonomous AI agents, Enterprise RAG systems, predictive analytics, computer vision.
4) Enterprise Cyber Security Managed Services: 24/7 SOC & MDR, VAPT, Zero-trust cloud, Identity/endpoint protection, GRC.
5) Next-Gen Web & App Modernization: Legacy system re-engineering, UI/UX redesign, cloud-native architecture, mobile apps.
6) API, Integrations & Customizations: REST/GraphQL, ERP/CRM middleware, data integration & automation.
7) Enterprise GTM & Market Expansion: Market entry strategy, sales execution, channel partner development, regional branding (GCC/Africa).

OUR PORTFOLIO & CASE STUDIES:
If a user asks for examples of our work, past clients, or proof of capability, use the following real-world case studies to demonstrate our expertise:
${portfolioData.map(p => `
- Client: ${p.client} (${p.location})
  Project Type: ${p.type}
  Overview: ${p.overview}
  Key Deliverables: ${p.programs.map(prog => prog.title).join(', ')}
  Outcome: ${p.outcome}`).join('\n')}

STRATEGIC ADVISORY & METHODOLOGY (The 4-Phase Blueprint):
We act as a digital transformation hub. Speed without direction is chaos, so architecture comes first. 
01 Discovery & Assessment: Ecosystem audit, tech debt evaluation, security gaps.
02 Strategic Architecture: Designing secure cloud infra, API connectivity, and governance frameworks.
03 Agile Execution: Deploying elite agile squads to build/modernize with zero disruption.
04 Govern & Optimize: Continuous 24/7 SOC monitoring, IT management, and ROI tracking.

ROUTING RULES:
- shouldShowCalendar: true ONLY if the user explicitly asks for a meeting, call, or calendar link.
- shouldRedirectToContact: true ONLY if the user asks for pricing, quotes, or to start a project.
- selectedServices: Map to the EXACT names from the 7 capabilities if the user implies interest.
- prefilledMessage: Provide a short 1st-person summary if redirecting to contact.
- suggestedFollowUps: Generate EXACTLY 3 short questions strictly related to the 7 capabilities, the methodology, or asking if they want to hear a case study. All suggestedFollowUps MUST also be in ${languageName}.`;

const GeminiChatBot = ({ apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  
  // State to toggle the "Services Menu" in the quick actions bar
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  
  // --- LANGUAGE STATES ---
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES.find(l => l.code === 'en-US'));
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const langDropdownRef = useRef(null);

  // --- VOICE FEATURES ---
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState(null); 
  const recognitionRef = useRef(null);
  
  // Refs
  const messagesEndRef = useRef(null);
  const lastMessageRef = useRef(null); 
  const chatContainerRef = useRef(null); 
  const currentAudioRef = useRef(null); 
  const audioContextRef = useRef(null); 
  
  const navigate = useNavigate();
  const location = useLocation();

  // Handle clicking outside the language dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- AUDIO HELPER ---
  const stopAudio = () => {
    if (currentAudioRef.current) {
      try {
        if (typeof currentAudioRef.current.stop === 'function') {
          currentAudioRef.current.stop(); 
          currentAudioRef.current.disconnect(); 
        } else if (typeof currentAudioRef.current.pause === 'function') {
          currentAudioRef.current.pause(); 
        }
      } catch(e) {
        console.error("Error stopping audio", e);
      }
      currentAudioRef.current = null;
    }
  };

  // --- INITIALIZE SPEECH RECOGNITION ---
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInput(currentTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
      setSpeakingId(null);
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
      setShowServicesMenu(false); 
      setIsLangDropdownOpen(false);
    }
  }, [isOpen, isListening]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setInput(''); 
      if (recognitionRef.current) {
        // Set the recognition language dynamically before starting
        recognitionRef.current.lang = selectedLanguage.code;
        recognitionRef.current?.start();
        setIsListening(true);
      }
    }
  };

  // --- BACKGROUND AUDIO PRE-FETCHER ---
  const fetchAudioInBackground = async (messageId, text) => {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const cleanText = text.replace(/[*_~`#]/g, '');

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: `Please read the following text aloud exactly as written: ${cleanText}`,
        config: {
          responseModalities: ["AUDIO"],
          // We omit the hardcoded voice config here so the AI can naturally output the right accent for the language
        }
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      const audioPart = parts.find(part => part.inlineData && part.inlineData.mimeType.startsWith('audio/'));

      if (!audioPart) throw new Error('No audio returned');

      const base64Data = audioPart.inlineData.data;
      const binaryString = window.atob(base64Data);
      
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0; 
      }

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioBuffer = audioContextRef.current.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);

      // Successfully fetched and decoded! Update the specific message in state.
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, audioBuffer: audioBuffer, audioLoading: false } : msg
      ));

    } catch (error) {
      console.error("Background TTS Error:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, audioLoading: false, audioError: true } : msg
      ));
    }
  };

  // --- INSTANT AUDIO PLAYER ---
  const handleSpeak = (msg) => {
    if (speakingId === msg.id) {
      stopAudio();
      setSpeakingId(null);
      return;
    }
    
    stopAudio();
    setSpeakingId(msg.id); 

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = msg.audioBuffer; 
    source.connect(audioContextRef.current.destination);
    currentAudioRef.current = source;

    source.onended = () => {
      setSpeakingId(null);
      currentAudioRef.current = null;
    };

    source.start(); 
  };

  // --- SCROLL LOGIC ---
  useEffect(() => {
    if (isLoading || (messages.length > 0 && messages[messages.length - 1].role === 'user')) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } 
    else if (messages.length > 0 && messages[messages.length - 1].role === 'model') {
      const container = chatContainerRef.current;
      const messageElement = lastMessageRef.current;
      
      if (container && messageElement) {
        container.scrollTo({
          top: messageElement.offsetTop - 10, 
          behavior: 'smooth'
        });
      }
    }
  }, [messages, isLoading]);

  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000); 
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (showTooltip) setShowTooltip(false);
  };

  const clearHistory = () => {
    setMessages([]);
    stopAudio();
    setSpeakingId(null);
    setShowServicesMenu(false);
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    setShowScrollBottom(!isNearBottom);
  };

  const formatMarkdown = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanLine = line.trim().substring(2);
        return (
          <li key={index} className="ml-4 list-disc mb-1">
            <span dangerouslySetInnerHTML={{ __html: cleanLine.replace(boldRegex, '<strong>$1</strong>') }} />
          </li>
        );
      }
      return (
        <p key={index} className="mb-2 last:mb-0 min-h-[1em]">
          <span dangerouslySetInnerHTML={{ __html: line.replace(boldRegex, '<strong>$1</strong>') }} />
        </p>
      );
    });
  };

  const triggerSend = async (messageText) => {
    if (!messageText.trim() || isLoading) return;
    
    if (isListening) toggleListen();
    
    stopAudio();
    setSpeakingId(null);
    setShowServicesMenu(false); 
    setIsLangDropdownOpen(false); // Close language dropdown if open

    const userMessageId = Date.now().toString();
    const userMessage = { id: userMessageId, role: 'user', text: messageText.trim() };
    
    let newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      let apiHistory = [...newHistory];
      if (apiHistory.length > 0 && apiHistory[0].role === 'model') {
        apiHistory = apiHistory.slice(1);
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      const formattedContents = apiHistory.slice(0, -1).map(msg => {
        if (msg.role === 'model') {
          const reconstructedJSON = {
            text: msg.text || "",
            shouldRedirectToContact: !!msg.contactRouting,
            shouldShowCalendar: msg.calendarRouting || false,
            selectedServices: msg.contactRouting?.services || [],
            prefilledMessage: msg.contactRouting?.message || "",
            suggestedFollowUps: msg.suggestedFollowUps || []
          };
          return { role: 'model', parts: [{ text: JSON.stringify(reconstructedJSON) }] };
        } else {
          return { role: 'user', parts: [{ text: msg.text || "" }] };
        }
      });

      const currentMessage = { role: 'user', parts: [{ text: userMessage.text }] };
      const finalContents = [...formattedContents, currentMessage];
      
      // Pass the selected language dynamically into the system prompt
      const currentSystemPrompt = getSystemPrompt(selectedLanguage.name);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: finalContents, 
        config: {
          systemInstruction: currentSystemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              text: { type: "STRING" },
              shouldRedirectToContact: { type: "BOOLEAN" },
              shouldShowCalendar: { type: "BOOLEAN" },
              selectedServices: { type: "ARRAY", items: { type: "STRING" } },
              prefilledMessage: { type: "STRING" },
              suggestedFollowUps: { type: "ARRAY", items: { type: "STRING" } }
            },
            required: ["text", "shouldRedirectToContact", "shouldShowCalendar", "selectedServices", "prefilledMessage", "suggestedFollowUps"]
          }
        }
      });

      const rawText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const responseData = JSON.parse(rawText);
      const botMessageId = (Date.now() + 1).toString();

      const botMessage = { 
        id: botMessageId,
        role: 'model', 
        text: responseData.text,
        audioBuffer: null,      
        audioLoading: true,     
        audioError: false,
        contactRouting: responseData.shouldRedirectToContact ? {
          services: responseData.selectedServices || [],
          message: responseData.prefilledMessage || ""
        } : null,
        calendarRouting: responseData.shouldShowCalendar ? true : false,
        suggestedFollowUps: responseData.suggestedFollowUps || [] 
      };

      setMessages((prev) => [...prev, botMessage]);
      
      fetchAudioInBackground(botMessageId, responseData.text);

    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage = { id: Date.now().toString(), role: 'model', text: 'Sorry, I encountered an error connecting to my servers. Please try again.', audioLoading: false };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    triggerSend(input);
  };

  return (
    <>
      {/* Tooltip Popup */}
      <div className={`fixed bottom-[96px] right-7 z-[9999] bg-white border border-slate-200 shadow-xl text-slate-700 text-[12px] font-bold tracking-wide py-2.5 px-4 rounded-xl transition-all duration-700 ease-in-out font-sans ${showTooltip && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        Need assistance? Chat with us! 👋
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-slate-200 transform rotate-45"></div>
      </div>

      {/* Launcher Button */}
      <button onClick={toggleChat} title="Chat with us" className={`fixed bottom-7 right-7 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white cursor-pointer flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 transition-all z-[9999] ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-[100px] right-7 w-[380px] max-w-[calc(100vw-40px)] h-[580px] max-h-[calc(100vh-130px)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9998] transition-all duration-300 font-sans ${isOpen ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto' : 'translate-y-4 scale-95 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm border border-blue-200">
            <Bot size={20} />
          </div>
          <div className="flex-1">
            <div className="font-extrabold text-[15px] text-slate-900 tracking-tight">1TecHub Assistant</div>
            <div className="text-[11px] font-bold text-blue-600 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span> Online
            </div>
          </div>
          
          {/* LANGUAGE SELECTOR DROPDOWN */}
          <div className="relative" ref={langDropdownRef}>
            <button 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} 
              className="text-[11px] font-bold text-slate-600 flex items-center gap-1 bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 px-2 py-1.5 rounded-lg transition-colors mr-1 shadow-sm"
              title="Select Language"
            >
              {selectedLanguage.name} <ChevronDown size={12} className={`transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`}/>
            </button>

            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-50 flex flex-col overflow-hidden">
                <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                  <Search size={14} className="text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search language..." 
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    className="text-[11px] font-medium bg-transparent focus:outline-none w-full text-slate-700 placeholder-slate-400"
                    autoFocus
                  />
                </div>
                <div className="max-h-48 overflow-y-auto custom-scrollbar p-1">
                  {SUPPORTED_LANGUAGES.filter(l => l.name.toLowerCase().includes(langSearch.toLowerCase())).map(lang => (
                    <button 
                      key={lang.code}
                      onClick={() => { 
                        setSelectedLanguage(lang); 
                        setIsLangDropdownOpen(false); 
                        setLangSearch('');
                        // AUTO MESSAGE REMOVED AS REQUESTED 
                      }}
                      className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-lg transition-colors ${selectedLanguage.code === lang.code ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                  {SUPPORTED_LANGUAGES.filter(l => l.name.toLowerCase().includes(langSearch.toLowerCase())).length === 0 && (
                    <div className="px-3 py-2 text-[11px] text-slate-400 text-center">No results found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Clear History Button */}
          {messages.length > 0 && (
            <button 
              onClick={clearHistory} 
              title="Clear Chat" 
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors flex items-center justify-center mr-1"
            >
              <Trash2 size={18} />
            </button>
          )}

          {/* Close Button */}
          <button onClick={toggleChat} className="text-slate-400 hover:text-slate-700 hover:bg-slate-200 p-1.5 rounded-lg transition-colors flex items-center justify-center">
            <X size={20} />
          </button>
        </div>

        {/* Scroll To Bottom Button */}
        {showScrollBottom && (
          <div className="absolute bottom-[170px] left-0 right-0 flex justify-center z-40 pointer-events-none transition-all duration-300">
            <button
              onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="pointer-events-auto bg-white border border-slate-200 text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 animate-in fade-in zoom-in-95"
            >
              <ArrowDown size={18} />
            </button>
          </div>
        )}

        {/* Messages Area */}
        <div 
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="relative flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4 bg-[#f8fafc]" 
        >
          
          {/* Initial Greeting */}
          {messages.length === 0 && (
            <div className="flex gap-3 max-w-[90%] self-start animate-[fadeUp_0.25s_ease]">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-blue-100 text-blue-600 border border-blue-200 shadow-sm mt-1">
                <Bot size={16} />
              </div>
              <div>
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm p-4 text-[14px] text-slate-600 leading-relaxed font-medium">
                  <strong className="text-slate-900 font-bold block mb-1">Welcome to 1TecHub! 👋</strong>
                  I'm your dedicated AI assistant. I can guide you through our enterprise services or explain our execution methodology. How can I help you today?
                </div>
              </div>
            </div>
          )}

          {/* Chat History */}
          {messages.map((msg, index) => (
            <div 
              key={msg.id || index} 
              ref={index === messages.length - 1 ? lastMessageRef : null} 
              className={`flex gap-3 max-w-[88%] animate-[fadeUp_0.25s_ease] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
            >
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-1 shadow-sm border ${
                msg.role === 'user' 
                  ? 'bg-slate-100 text-slate-500 border-slate-200' 
                  : 'bg-blue-100 text-blue-600 border-blue-200'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed break-words shadow-sm font-medium ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 border border-blue-600 rounded-tr-sm text-white'
                    : 'bg-white border border-slate-200 rounded-tl-sm text-slate-700'
                }`}>
                  <div>{formatMarkdown(msg.text)}</div>
                  
                  {/* TTS Button with Loading States */}
                  {msg.role === 'model' && msg.id && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex justify-end">
                      {msg.audioLoading ? (
                        <div className="flex items-center gap-1.5 text-[11px] font-bold px-2 py-1 text-slate-400">
                          <Loader2 size={12} className="animate-spin text-blue-400" /> Preparing Audio...
                        </div>
                      ) : msg.audioError ? (
                        <div className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 text-red-400">
                          Audio Unavailable
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSpeak(msg)}
                          className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded transition-colors ${
                            speakingId === msg.id 
                              ? 'text-blue-600 bg-blue-50' 
                              : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'
                          }`}
                        >
                          {speakingId === msg.id ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          {speakingId === msg.id ? 'Stop' : 'Listen'}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Follow-up Suggestions */}
                {msg.role === 'model' && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && index === messages.length - 1 && !isLoading && (
                  <div className="mt-3 flex flex-col gap-2 w-full pl-2">
                    <div className="flex flex-wrap gap-2">
                      {msg.suggestedFollowUps.map((suggestion, idx) => (
                        <button 
                          key={idx}
                          onClick={() => triggerSend(suggestion)}
                          className="text-left text-[12px] font-bold leading-tight px-3 py-2 rounded-xl border border-blue-200 text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- MODIFIED: Meeting / Calendar Routing Button --- */}
                {msg.calendarRouting && (
                  <div className="mt-3 w-full max-w-[260px]">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                      <p className="text-[12px] text-slate-600 text-center font-bold">Ready to dive deeper?</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleChat();
                          navigate("/contact", { 
                            state: { 
                              prefilledMessage: "Hi team,\n\nI would like to schedule a strategic meeting with your experts to discuss a digital transformation roadmap for our enterprise.\n\nPlease let me know the best times to connect."
                            }
                          });
                        }}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 text-white rounded-xl text-[13px] font-bold hover:bg-blue-700 transition-all w-full shadow-md hover:shadow-blue-500/20"
                      >
                        <span>Book a Meeting</span>
                        <CalendarCheck size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Contact Routing */}
                {msg.contactRouting && (
                  <div className="mt-3 w-full max-w-[260px]">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                      <p className="text-[12px] text-slate-600 text-center font-bold">Start your digital transformation.</p>
                      <button 
                        onClick={() => {
                          toggleChat()
                          navigate("/contact", { 
                          state: { 
                            prefilledMessage: msg.contactRouting.message,
                            selectedServices: msg.contactRouting.services
                          }
                        })}}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl text-[13px] font-bold hover:bg-blue-50 transition-all w-full shadow-sm"
                      >
                        Contact Our Experts
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-[88%] self-start animate-[fadeUp_0.25s_ease]">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-blue-100 text-blue-600 border border-blue-200 mt-1">
                <Bot size={16} />
              </div>
              <div className="px-5 py-4 bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* --- PERSISTENT QUICK ACTIONS BAR WITH DYNAMIC SERVICES MENU --- */}
        <div className="relative shrink-0 w-full bg-white border-t border-slate-200">
          <div className="px-4 pt-3 pb-6 flex flex-wrap gap-2 justify-center items-start w-full overflow-y-auto hide-scrollbar max-h-[140px] relative z-10">
            {showServicesMenu ? (
              <>
                <div className="w-full flex justify-between items-center mb-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Select a Service</span>
                  <button onClick={() => setShowServicesMenu(false)} className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-[11px] font-bold">
                    <ChevronLeft size={12} /> Back
                  </button>
                </div>
                {CORE_SERVICES.map(service => (
                  <button 
                    key={service}
                    onClick={() => triggerSend(`Tell me more about ${service}.`)} 
                    className="bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-bold text-[11px] px-3 py-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors w-full text-left"
                  >
                    {service}
                  </button>
                ))}
              </>
            ) : (
              <>
                <button onClick={() => triggerSend('I need strategic technology advisory. How do we start?')} className="bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-bold text-[11px] px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors shrink-0">Strategic Advisory</button>
                <button onClick={() => setShowServicesMenu(true)} className="bg-slate-50 border border-slate-200 rounded-full text-slate-600 font-bold text-[11px] px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shrink-0 flex items-center gap-1">
                  <LayoutGrid size={12} /> Explore Services
                </button>
                <button onClick={() => triggerSend('Can you explain your 4-Phase Transformation Blueprint?')} className="bg-slate-50 border border-slate-200 rounded-full text-slate-600 font-bold text-[11px] px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shrink-0">Our Methodology</button>
                <button onClick={() => triggerSend('I would like to schedule a meeting with your team.')} className="bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-bold text-[11px] px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors shrink-0">Book a Meeting</button>
              </>
            )}
          </div>

          {/* --- SCROLL INDICATOR FADE EFFECT --- */}
          {showServicesMenu && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none flex items-end justify-center pb-1 z-20 rounded-b-2xl">
              <ArrowDown size={14} className="text-slate-400 animate-bounce" />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-slate-50 border-t border-slate-200 flex flex-col shrink-0">
          <form onSubmit={handleFormSubmit} className="p-3 flex gap-2 items-center">
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask about our services..."}
                disabled={isLoading}
                className={`w-full bg-white border border-slate-300 rounded-xl text-slate-900 font-medium text-[14px] pl-4 pr-10 py-3 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-slate-400 disabled:opacity-50 ${isListening ? 'border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.2)]' : 'shadow-sm'}`}
              />
              
              <button
                type="button"
                onClick={toggleListen}
                className={`absolute right-2 p-1.5 rounded-lg transition-colors ${
                  isListening 
                    ? 'text-red-500 bg-red-50 animate-pulse' 
                    : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
                title={isListening ? "Stop listening" : "Voice input"}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-[46px] h-[46px] rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 transition-all hover:bg-blue-700 shadow-md hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
              title="Send"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
          <div className="text-center text-[10px] font-bold text-slate-400 pb-2">
            Powered by <span className="text-blue-600">1TecHub AI</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Hide scrollbar for the quick actions bar */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </>
  );
};

export default GeminiChatBot;
