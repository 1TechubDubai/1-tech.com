import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, X, CalendarCheck, ArrowRight } from "lucide-react";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for shrinking/blurring the navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset menu state when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-slate-200/60 shadow-sm py-2' 
            : 'bg-white/50 backdrop-blur-md border-transparent py-4'
        }`}
      >
        <nav className="flex items-center justify-between px-6 mx-auto w-full max-w-[1400px]">
          
          {/* Logo */}
          <Link to="/" className="flex items-center z-[110] relative group">
            <img 
              src={logo} 
              alt="1TecHub" 
              className={`w-auto transition-all duration-500 ${isScrolled ? 'h-10' : 'h-12 lg:h-14'} group-hover:scale-105`} 
            />
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden lg:flex items-center gap-10 ml-auto mr-12">
            <NavLink to="/" label="Home" location={location} />
            <NavLink to="/services" label="Services" location={location} />
            <NavLink to='/advisory' label="Advisory" location={location} />
            <NavLink to="/about" label="About Us" location={location} />
            <NavLink to="/blogs" label="Transmissions" location={location} />
            <NavLink to="/contact" label="Contact" location={location} />
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 z-[110]">
            <a
              href="https://calendly.com/harish-krishnan1976"
              className="
                hidden md:flex items-center justify-center gap-2
                px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest
                bg-blue-600 text-white shadow-lg shadow-blue-600/20
                transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 group
              "
              target="_blank" 
              rel="noopener noreferrer"
            >
              <CalendarCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Book Meeting
            </a>

            {/* Hamburger Button */}
            <button 
              className={`lg:hidden p-2 rounded-full transition-colors focus:outline-none ${mobileMenuOpen ? 'bg-slate-100 text-slate-900' : 'bg-white/80 text-slate-700 hover:bg-white shadow-sm border border-slate-200'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* --- MOBILE FULL SCREEN OVERLAY --- */}
      <div 
        className={`fixed inset-0 z-[90] bg-[#f8fafc]/95 backdrop-blur-2xl lg:hidden flex flex-col pt-32 pb-8 px-6 h-[100dvh] transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <div className="flex flex-col flex-grow gap-6 mt-4">
          <MobileNavLink to="/" label="Home" location={location} delay="100" />
          <MobileNavLink to="/services" label="Services" location={location} delay="150" />
          <MobileNavLink to='/advisory' label="Advisory" location={location} delay="175" />
          <MobileNavLink to="/about" label="About Us" location={location} delay="200" />
          <MobileNavLink to="/blogs" label="Transmissions" location={location} delay="250" />
          <MobileNavLink to="/contact" label="Contact Us" location={location} delay="300" />
        </div>

        {/* Bottom Mobile CTA */}
        <div className="w-full pt-8 mt-auto flex-shrink-0 border-t border-slate-200/60">
          <button 
            onClick={(e) => {
              e.preventDefault();
              window.open("https://calendly.com/harish-krishnan1976", "_blank", "noopener,noreferrer");
            }}
            className="w-full py-4 rounded-2xl bg-blue-600 text-white text-sm font-bold uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <CalendarCheck className="w-5 h-5 group-active:scale-110 transition-transform" />
            <span>Book Meeting</span>
          </button>
        </div>
      </div>
    </>
  );
};

// --- DESKTOP NAV LINK ---
const NavLink = ({ to, label, location }) => {
  // Logic to keep "/services" active even if URL is "/services/it-managed-services"
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`relative text-xs font-bold tracking-widest uppercase py-2 transition-colors group ${
        isActive
          ? "text-blue-600" 
          : "text-slate-600 hover:text-slate-900" 
      }`}
    >
      {label}
      {/* Animated Underline */}
      <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ease-out rounded-full ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`}></span>
    </Link>
  );
};

// --- MOBILE NAV LINK ---
const MobileNavLink = ({ to, label, location, delay }) => {
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`group flex items-center justify-between text-3xl font-extrabold tracking-tight pb-6 border-b border-slate-200/60 transition-colors ${
        isActive ? 'text-blue-600' : 'text-slate-800 active:text-blue-600'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span>{label}</span>
      <ArrowRight 
        className={`transition-transform duration-300 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 group-active:translate-x-0 group-active:opacity-100'}`} 
      />
    </Link>
  );
}

export default Navbar;