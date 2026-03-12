import React from 'react';
import logo from "../assets/logo.svg";
import { Linkedin, Mail, Phone } from 'lucide-react';
import { BrandWhatsapp } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#fafbfc] pt-1 border-t border-slate-200 relative font-sans mt-12">
      {/* Subtle Blue Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 justify-between">
          
          {/* Left Section: Brand & About */}
          <div className="space-y-6 max-w-sm">
            {/* Logo area */}
            <div className="flex items-center gap-2">
              <img src={logo} alt="1TecHub Logo" className="w-40 h-auto" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-slate-900 font-extrabold tracking-tight text-left text-lg">
                Intelligent AI. Exponential Growth.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed text-left">
                1TecHub leads the AI revolution, merging autonomous intelligence with innovation to help enterprises automate, scale, and excel.
              </p>
            </div>
          </div>

          {/* Right Section: Connect & Contact */}
          <div className="flex flex-col md:items-end space-y-6">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
              Connect With Us
            </h4>
            
            {/* Social Icons */}
            <div className="flex gap-4 text-slate-500">
              <a 
                href="https://www.linkedin.com/company/1techub/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-white border border-slate-200 rounded-full hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <Linkedin size={20} />
              </a>
              
              <a 
                href="https://wa.me/971585369749" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-white border border-slate-200 rounded-full hover:border-green-300 hover:bg-green-50 hover:text-green-600 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <BrandWhatsapp size={20} />
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col md:items-end space-y-3 pt-2">
              <a href="tel:+971568001040" className="group flex items-center gap-2.5 text-slate-600 hover:text-blue-600 transition-colors text-sm md:text-base font-semibold">
                <Phone size={18} className="text-blue-500 transition-colors" />
                +971 56 800 1040
              </a>
              <a href="mailto:contactus@1techub.com" className="group flex items-center gap-2.5 text-slate-600 hover:text-blue-600 transition-colors text-sm md:text-base font-semibold">
                <Mail size={18} className="text-blue-500 transition-colors" />
                contactus@1techub.com
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-slate-200 my-8"></div>

        {/* Bottom Section: Copyright & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© 2025 1TecHub Company. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link to="/terms-of-service" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;