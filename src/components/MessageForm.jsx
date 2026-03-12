import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Loader2, Send, X, CheckCircle2, AlertCircle, CheckSquare2, Square } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { useLocation } from 'react-router-dom';

// --- INTERNAL TOAST COMPONENT (Light Theme) ---
const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div className={`
      fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]
      flex items-start gap-3 p-4 pr-10 rounded-xl border backdrop-blur-md shadow-2xl
      transform transition-all duration-500 animate-slide-in-up
      ${isSuccess 
        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.2)]' 
        : 'bg-red-50 border-red-200 text-red-900 shadow-[0_10px_40px_-10px_rgba(239,68,68,0.2)]'}
    `}>
      {isSuccess ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />}
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold">{isSuccess ? 'Message Sent!' : 'Error'}</h4>
        <p className="text-xs opacity-90 leading-relaxed text-slate-600">{message}</p>
      </div>
      <button onClick={onClose} className="absolute top-2 right-2 p-1 hover:bg-black/5 rounded-full transition-colors text-slate-500">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// --- MAIN FORM COMPONENT ---
const MessageForm = ({ showTitle = true, className = "" }) => {
  const formRef = useRef(); 
  const dropdownRef = useRef(null);
  const location = useLocation();
  const countryDropdownRef = useRef(null);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const COUNTRY_CODES = [
    { code: "+1", country: "US/CA" }, { code: "+44", country: "UK" }, { code: "+971", country: "UAE" },
    { code: "+91", country: "IN" }, { code: "+61", country: "AU" }, { code: "+49", country: "DE" },
    { code: "+33", country: "FR" }, { code: "+81", country: "JP" }, { code: "+86", country: "CN" },
    { code: "+966", country: "SA" }, { code: "+65", country: "SG" }, { code: "+39", country: "IT" },
    { code: "+34", country: "ES" }, { code: "+55", country: "BR" }, { code: "+52", country: "MX" },
    { code: "+27", country: "ZA" }, { code: "+974", country: "QA" }, { code: "+973", country: "BH" },
    { code: "+968", country: "OM" }, { code: "+965", country: "KW" }, { code: "+20", country: "EG" }
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+1', 
    phone: '',
    company: '',
    service: [],
    message: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState('idle'); 
  const [toast, setToast] = useState(null); 

  // New Updated Services List
  const allServices = [
    { id: 'it-managed', title: 'Enterprise IT Managed Services', sub: 'End-to-end management of IT operations' },
    { id: 'talent', title: 'Strategic Technology Talent Solutions', sub: 'Access elite technology architects' },
    { id: 'ai-analytics', title: 'Intelligent AI, Agentic AI & Analytics', sub: 'Deploy autonomous agents & models' },
    { id: 'cyber-security', title: 'Cyber Security Services & Solutions', sub: 'Zero-Trust architecture & SOC' },
    { id: 'web-app', title: 'Next-Gen Web & App Modernization', sub: 'Rebuild legacy applications' },
    { id: 'api-integ', title: 'API, Integrations & Customizations', sub: 'Seamless API-led connectivity' },
    { id: 'gtm', title: 'Enterprise GTM & Market Expansion', sub: 'Strategic consulting & digital platforms' },
  ];

  // Prefill handling from routing
  useEffect(() => {
    if (location.state) {
      setFormData(prev => {
        let incomingServices = prev.service;

        // 1. Check if a single string was passed (From Services or Process pages)
        if (location.state.selectedService) {
          incomingServices = [location.state.selectedService];
        } 
        // 2. Check if an array was passed (From the AI Chatbot)
        else if (location.state.selectedServices && Array.isArray(location.state.selectedServices)) {
          incomingServices = location.state.selectedServices;
        }

        return {
          ...prev,
          service: incomingServices,
          message: location.state.prefilledMessage || prev.message
        };
      });
    }
  }, [location.state]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) setIsCountryOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceTitle) => {
    setFormData(prev => {
      const currentServices = prev.service;
      const isSelected = currentServices.includes(serviceTitle);
      const updatedServices = isSelected
        ? currentServices.filter(s => s !== serviceTitle) 
        : [...currentServices, serviceTitle];            
      return { ...prev, service: updatedServices };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message) {
      setToast({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setStatus('loading');

    try {
      const messagesRef = collection(db, "messages");
      await addDoc(messagesRef, {
        name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone ? `${formData.countryCode} ${formData.phone}` : "", 
        company: formData.company,
        service_interest: formData.service,
        message: formData.message,
        timestamp: serverTimestamp(),
        status: "unread" 
      });

      setStatus('success');
      setToast({ type: 'success', message: 'Message sent successfully! Our team will contact you soon.' });
      setFormData({ fullName: '', email: '', phone: '', company: '', service: [], message: '' });
    } catch (error) {
      console.error('Firebase Submission Error:', error);
      setStatus('error');
      setToast({ type: 'error', message: 'Failed to send message. Please check your connection and try again.' });
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className={`w-full font-sans relative ${className}`}>
      
      {/* Toast Notification Container */}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      {/* Card Container (Light Theme) */}
      <div className="relative w-full bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm overflow-visible">
        
        {/* Header */}
        {showTitle && (
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-50 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-widest text-blue-700 uppercase">Contact Us</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Ready to lead the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">AI revolution?</span>
            </h1>
            <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">
              Let's discuss how we can transform your business with intelligent automation.
            </p>
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wider">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl 
                           focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all placeholder:text-slate-400 font-medium text-sm shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wider">Email *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl 
                           focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all placeholder:text-slate-400 font-medium text-sm shadow-sm"
              />
            </div>
          </div>

          {/* Row 2: Phone Number */}
          <div className="space-y-2 w-full">
            <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wider">Phone Number</label>
            <div className="flex gap-3 relative w-full">
              
              {/* Country Code Selector */}
              <div className="relative w-[100px] sm:w-[130px] shrink-0" ref={countryDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsCountryOpen(!isCountryOpen);
                    setCountrySearch(""); 
                  }}
                  disabled={status === 'loading'}
                  className="w-full h-full bg-slate-50 border border-slate-200 text-slate-900 pl-4 pr-3 py-3.5 rounded-xl 
                             focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10
                             disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm
                             flex items-center justify-between shadow-sm"
                >
                  <span className="truncate">{formData.countryCode}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-300 ${isCountryOpen ? 'rotate-180 text-blue-500' : ''}`} />
                </button>

                {/* Country Dropdown */}
                <div 
                  className={`absolute left-0 top-[calc(100%+8px)] z-50 w-[240px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden transition-all duration-200 origin-top
                    ${isCountryOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}`}
                >
                  <div className="p-2 border-b border-slate-100">
                    <input
                      type="text"
                      placeholder="Search code or country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-3 py-2 rounded-lg text-xs font-medium
                                focus:outline-none focus:bg-white focus:border-blue-400 transition-all placeholder:text-slate-400"
                      autoFocus={isCountryOpen} 
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto custom-scrollbar p-1">
                    {COUNTRY_CODES.filter(c => c.country.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.includes(countrySearch)).length > 0 ? (
                      COUNTRY_CODES.filter(c => c.country.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.includes(countrySearch)).map((c) => (
                        <button
                          key={c.code + c.country}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, countryCode: c.code }));
                            setIsCountryOpen(false);
                            setCountrySearch(""); 
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-slate-50 rounded-lg transition-colors group/item"
                        >
                          <span className="font-bold text-slate-700 group-hover/item:text-blue-600 transition-colors">{c.code}</span>
                          <span className="text-xs font-medium text-slate-400 truncate ml-2">{c.country}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-4 text-center text-xs text-slate-500 font-medium">No results found</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Phone Input */}
              <input
                type="tel"
                name="phone"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="flex-1 min-w-0 bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl 
                           focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all placeholder:text-slate-400 font-medium text-sm shadow-sm"
              />
            </div>
          </div>

          {/* Row 3: Company */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wider">Company</label>
            <input
              type="text"
              name="company"
              placeholder="Your Company Name"
              value={formData.company}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl 
                         focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all placeholder:text-slate-400 font-medium text-sm shadow-sm"
            />
          </div>

          {/* Row 4: Services Select */}
          <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wider">Services Needed</label>
            
            {/* Selected Services Tags */}
            {formData.service.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.service.map((service, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                    <span>{service}</span>
                    <button
                      type="button"
                      onClick={() => handleServiceSelect(service)}
                      className="hover:text-blue-900 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <button
              type="button"
              disabled={status === 'loading'}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full bg-slate-50 border text-left px-4 py-3.5 rounded-xl flex items-center justify-between 
                        focus:outline-none focus:bg-white transition-all shadow-sm font-medium
                        ${isDropdownOpen ? 'border-blue-400 bg-white ring-4 ring-blue-500/10' : 'border-slate-200'}`}
            >
              <span className={`text-sm truncate pr-4 ${formData.service.length > 0 ? "text-slate-900" : "text-slate-400"}`}>
                {formData.service.length > 0 
                  ? `${formData.service.length} service${formData.service.length !== 1 ? 's' : ''} selected` 
                  : "Select services..."}
              </span>
              <div className="flex items-center gap-2">
                {formData.service.length > 0 && (
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    {formData.service.length}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-blue-500' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu Mapping allServices */}
            <div 
              className={`
                absolute left-0 right-0 top-[calc(100%+8px)] z-50 
                bg-white border border-slate-200 rounded-xl shadow-xl
                overflow-hidden transition-all duration-200 origin-top
                ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
              `}
            >
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {allServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceSelect(service.title)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 flex items-center justify-between group"
                  >
                    <div className="flex-1 pr-3">
                      <span className="text-sm text-slate-900 font-bold group-hover:text-blue-600 transition-colors block">
                        {service.title}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 mt-0.5 block line-clamp-1">
                        {service.sub}
                      </span>
                    </div>
                    <div className="ml-2 shrink-0">
                      {formData.service.includes(service.title) ? (
                        <CheckSquare2 className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300 group-hover:text-blue-300 transition-colors" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 5: Message */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wider">Message *</label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell us about your needs..."
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl 
                         focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all placeholder:text-slate-400 resize-none font-medium text-sm shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="
                w-full 
                bg-gradient-to-r from-blue-600 to-cyan-500 
                hover:from-blue-500 hover:to-cyan-400 
                text-white font-bold py-4 rounded-xl 
                shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] 
                hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] 
                hover:-translate-y-0.5
                disabled:opacity-70 disabled:cursor-not-allowed 
                disabled:hover:translate-y-0 disabled:hover:shadow-none
                transition-all duration-300 
                flex items-center justify-center gap-2 group 
                text-sm sm:text-base relative overflow-hidden
              "
            >
              <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
              <Send 
                className={`
                  w-5 h-5 transition-all duration-500 ease-in-out
                  ${status === 'loading' ? 'translate-x-8 -translate-y-8 opacity-0' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}
                `} 
              />
              {status === 'loading' && (
                <Loader2 className="absolute right-6 w-5 h-5 animate-spin opacity-80" />
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        /* Scrollbar styles adapted for light theme */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc; /* slate-50 */
          border-radius: 0 0 12px 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; /* slate-300 */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; /* slate-400 */
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MessageForm;