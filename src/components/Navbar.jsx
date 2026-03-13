import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, X, CalendarCheck } from "lucide-react";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
     <div className="fixed top-0 left-0 right-0 z-[60] bg-[rgba(248,250,252,0.75)] border-b border-gray-200 shadow-sm w-full">
        <nav className="flex items-center justify-between px-6 py-4 mx-auto w-full max-w-7xl">
          
          {/* Logo */}
          <Link to="/" className="flex items-center z-50">
            <img src={logo} alt="1TecHub" className="h-14 w-auto" />
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center gap-8 ml-auto mr-12">
            <NavLink to="/" label="HOME" location={location} />
            <NavLink to="/services" label="SERVICES" location={location} />
            <NavLink to="/about" label="ABOUT US" location={location} />
            <NavLink to="/contact" label="CONTACT US" location={location} />
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50">
            <a
              href="https://calendly.com/harish-krishnan1976"
              className="
                hidden md:flex items-center justify-center
                px-6 py-2 rounded-full text-sm font-medium
                border border-[#2563eb] text-[#2563eb] bg-transparent
                transition-all duration-300
                hover:bg-blue-50
              "
              target="_blank" 
              rel="noopener noreferrer"
            >
                <CalendarCheck className="w-4 h-4 mr-2" />
              Book Meeting
            </a>

            {/* Hamburger Button */}
            <button 
              className="md:hidden text-slate-800 p-1 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </div>

      {/* --- MOBILE FULL SCREEN OVERLAY --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col pt-24 pb-6 px-6 h-[100dvh] animate-in fade-in duration-200">
          <div className="flex flex-col flex-grow gap-2">
            <Link 
              to="/" 
              className={`text-xl font-bold block py-4 border-b border-gray-100 transition-colors ${location.pathname === '/' ? 'text-[#2563eb]' : 'text-[#0f172a]'}`}
            >
              HOME
            </Link>
            <Link 
              to="/services" 
              className={`text-xl font-bold block py-4 border-b border-gray-100 transition-colors ${location.pathname === '/services' ? 'text-[#2563eb]' : 'text-[#0f172a]'}`}
            >
              SERVICES
            </Link>
            <Link 
              to="/about" 
              className={`text-xl font-bold block py-4 border-b border-gray-100 transition-colors ${location.pathname === '/about' ? 'text-[#2563eb]' : 'text-[#0f172a]'}`}
            >
              ABOUT US
            </Link>
            <Link 
              to="/contact" 
              className={`text-xl font-bold block py-4 border-b border-gray-100 transition-colors ${location.pathname === '/contact' ? 'text-[#2563eb]' : 'text-[#0f172a]'}`}
            >
              CONTACT US
            </Link>
          </div>

          {/* Bottom CTA */}
          <div className="w-full pt-6 mt-auto flex-shrink-0">
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.open("https://calendly.com/harish-krishnan1976", "_blank", "noopener,noreferrer");
              }}
              className="w-full py-4 rounded-full border border-[#2563eb] text-center font-bold text-[#2563eb] active:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Meeting</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const NavLink = ({ to, label, location }) => {
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`text-sm font-bold tracking-wide transition-colors ${
        isActive
          ? "text-[#2563eb]" // Blue when active
          : "text-[#0f172a] hover:text-[#2563eb]" // Dark slate default, blue on hover
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;