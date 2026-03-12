import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarCheck, Trash2, ArrowDown, Mic, MicOff, Volume2, VolumeX, Bot, User, Send, X, ArrowRight } from 'lucide-react'; 

// Core enterprise services matching your exact data structure
const CORE_SERVICES = [
  "Enterprise IT Managed Services", 
  "Strategic Technology Talent Solutions", 
  "Intelligent AI, Agentic AI & Analytics", 
  "Enterprise Cyber Security Managed Services", 
  "Next-Gen Web & App Modernization", 
  "API, Integrations & Customizations", 
  "Enterprise GTM & Market Expansion"
];

// Updated prompt enforcing the new 7 services and 3-step methodology
const getSystemPrompt = () => `You are the official, professional AI assistant for 1TecHub. Your job is to help visitors understand our enterprise technology solutions.

COMPANY CONTEXT & TONE:
- We provide industrial-scale, secure, and highly strategic IT, AI, Cybersecurity, and Software solutions.
- Keep responses clear, professional, concise, and business-focused. 
- You do NOT provide coding help, personal advice, or answer general knowledge questions.
- In larger responses, use bullet points and paragraph divisions for readability.
- Always ask a polite follow-up question to guide the user towards a solution.

OUR 7 CORE CAPABILITIES:
1. Enterprise IT Managed Services: Proactive monitoring, SAP/Oracle management, infrastructure governance, 24x7 support.
2. Strategic Technology Talent Solutions: Vetted, certified, project-ready IT professionals (Contract, Executive Search, Offshore teams).
3. Intelligent AI, Agentic AI & Analytics: Autonomous agents, RAG, custom LLMs, predictive analytics, computer vision.
4. Enterprise Cyber Security Managed Services: 24/7 SOC, MDR, VAPT, Zero-Trust cloud security, GRC compliance.
5. Next-Gen Web & App Modernization: Legacy system re-engineering, cloud-native infrastructure, UI/UX redesign.
6. API, Integrations & Customizations: Modern REST/GraphQL APIs, ERP/CRM integrations, custom middleware, RPA automation.
7. Enterprise GTM & Market Expansion: Market entry strategy, end-to-end sales execution, channel development in MEA regions.

OUR METHODOLOGY (HOW WE WORK):
If a user asks how we approach projects, our roadmap, or how to start, explain our 3-step framework:
- Phase 01: Assess & Architect (Discovery & Strategic Planning). We analyze their tech landscape, identify gaps, and deliver a secure, scalable blueprint.
- Phase 02: Execute & Integrate (Agile Development & Modernization). We deploy agile squads to build, modernize, and integrate systems with zero disruption.
- Phase 03: Govern & Optimize (Continuous Operations & Security). Post-deployment, our managed services and 24/7 SOC take over for continuous optimization and 99.99% uptime.

CRITICAL INSTRUCTION - JSON OUTPUT ONLY:
You must ALWAYS respond with a valid JSON object. Do NOT wrap it in markdown blockticks.

Your JSON must match this structure exactly:
{
  "text": "Your conversational response to the user here.",
  "shouldRedirectToContact": true or false,
  "shouldShowCalendar": true or false,
  "selectedServices": ["Service Name 1", "Service Name 2"],
  "prefilledMessage": "string",
  "suggestedFollowUps": ["Follow up question 1?", "Follow up question 2?", "Follow up question 3?"]
}

RULES FOR ACTIONS & REDIRECTION:
- If the user explicitly asks to schedule a call, book a meeting, talk to someone, or get on a call, set "shouldShowCalendar" to true.
- If the user asks for pricing, wants to start a project, asks for a quote, or needs custom development, set "shouldRedirectToContact" to true. 
- If "shouldRedirectToContact" is true, CAREFULLY REVIEW THE ENTIRE CONVERSATION. Identify EVERY service the user has shown interest in.
- Populate "selectedServices" ONLY using exact names from this list: [${CORE_SERVICES.join(', ')}].
- If "shouldRedirectToContact" is true, write a brief "prefilledMessage" written from the USER'S perspective summarizing their needs (e.g., "Hi, I am looking to modernize our legacy web apps and need details on your IT Managed Services...").
- If "shouldRedirectToContact" is false, leave selectedServices as [] and prefilledMessage as "".
- ALWAYS generate exactly 3 short, highly relevant follow-up questions for the "suggestedFollowUps" array.`;

const GeminiChatBot = ({ apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  
  // --- VOICE FEATURES ---
  const [isListening, setIsListening] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const recognitionRef = useRef(null);
  
  // Refs
  const messagesEndRef = useRef(null);
  const lastMessageRef = useRef(null); 
  const chatContainerRef = useRef(null); 
  
  const navigate = useNavigate();
  const location = useLocation();

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

  // Stop any ongoing speech when component unmounts or chat closes
  useEffect(() => {
    if (!isOpen) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isOpen, isListening]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setInput(''); 
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSpeak = (text, index) => {
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }
    
    window.speechSynthesis.cancel(); 
    
    const cleanText = text.replace(/[*_~`#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);
    
    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
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

  // --- ROUTE TRACKING TOOLTIP LOGIC ---
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
    window.speechSynthesis.cancel();
    setSpeakingIndex(null);
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
    window.speechSynthesis.cancel();
    setSpeakingIndex(null);

    const userMessage = { role: 'user', text: messageText.trim() };
    
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
      const formattedContents = apiHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const currentSystemPrompt = getSystemPrompt();

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: formattedContents,
        config: {
          systemInstruction: currentSystemPrompt,
          responseMimeType: "application/json", 
        }
      });

      const rawText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const responseData = JSON.parse(rawText);

      const botMessage = { 
        role: 'model', 
        text: responseData.text,
        contactRouting: responseData.shouldRedirectToContact ? {
          services: responseData.selectedServices || [],
          message: responseData.prefilledMessage || ""
        } : null,
        calendarRouting: responseData.shouldShowCalendar ? true : false,
        suggestedFollowUps: responseData.suggestedFollowUps || [] 
      };

      setMessages((prev) => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage = { role: 'model', text: 'Sorry, I encountered an error connecting to my servers. Please try again.' };
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
      {/* Tooltip Popup (Light Theme) */}
      <div className={`fixed bottom-[96px] right-7 z-[9999] bg-white border border-slate-200 shadow-xl text-slate-700 text-[12px] font-bold tracking-wide py-2.5 px-4 rounded-xl transition-all duration-700 ease-in-out font-sans ${showTooltip && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        Need assistance? Chat with us! 👋
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-slate-200 transform rotate-45"></div>
      </div>

      {/* Launcher Button (Blue Corporate Gradient) */}
      <button onClick={toggleChat} title="Chat with us" className={`fixed bottom-7 right-7 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white cursor-pointer flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 transition-all z-[9999] ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      {/* Chat Window (Light Glassmorphism) */}
      <div className={`fixed bottom-[100px] right-7 w-[380px] max-w-[calc(100vw-40px)] h-[580px] max-h-[calc(100vh-130px)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9998] transition-all duration-300 font-sans ${isOpen ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto' : 'translate-y-4 scale-95 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm border border-blue-200">
            <Bot size={20} />
          </div>
          <div className="flex-1">
            <div className="font-extrabold text-[15px] text-slate-900 tracking-tight font-['Syne',sans-serif]">1TecHub Assistant</div>
            <div className="text-[11px] font-bold text-blue-600 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span> Online
            </div>
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
              key={index} 
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
                  
                  {/* TTS Button */}
                  {msg.role === 'model' && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => handleSpeak(msg.text, index)}
                        className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded transition-colors ${
                          speakingIndex === index 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'
                        }`}
                      >
                        {speakingIndex === index ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        {speakingIndex === index ? 'Stop' : 'Listen'}
                      </button>
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

                {/* Calendar Routing */}
                {msg.calendarRouting && (
                  <div className="mt-3 w-full max-w-[260px]">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                      <p className="text-[12px] text-slate-600 text-center font-bold">Ready to dive deeper?</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open("https://calendly.com/harish-krishnan1976", "_blank");
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

        {/* --- PERSISTENT QUICK ACTIONS BAR --- */}
        <div className="bg-white border-t border-slate-200 px-4 pt-3 pb-3 flex flex-wrap gap-2 justify-center items-start shrink-0 w-full overflow-y-auto hide-scrollbar max-h-[140px]">
          <button onClick={() => triggerSend('How does your 3-step project methodology work?')} className="bg-slate-50 border border-slate-200 rounded-full text-slate-600 font-bold text-[11px] px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shrink-0">Our Methodology</button>
          <button onClick={() => triggerSend('Tell me about your Enterprise IT Managed Services.')} className="bg-slate-50 border border-slate-200 rounded-full text-slate-600 font-bold text-[11px] px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shrink-0">IT Managed Services</button>
          <button onClick={() => triggerSend('How do you handle Enterprise Cyber Security?')} className="bg-slate-50 border border-slate-200 rounded-full text-slate-600 font-bold text-[11px] px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shrink-0">Cyber Security</button>
          <button onClick={() => triggerSend('What are your AI and Analytics capabilities?')} className="bg-slate-50 border border-slate-200 rounded-full text-slate-600 font-bold text-[11px] px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shrink-0">AI & Analytics</button>
          <button onClick={() => triggerSend('I would like to schedule a meeting with your team.')} className="bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-bold text-[11px] px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors shrink-0">Book a Meeting</button>
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
      `}</style>
    </>
  );
};

export default GeminiChatBot;