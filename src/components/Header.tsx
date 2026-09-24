import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  MapPin,
  Building2
} from 'lucide-react';

import { locationService } from '../services/api';
import { LocationItem } from '../types';

interface HeaderProps {
  onOpenEnquiry?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPropertyDropdownOpen, setIsPropertyDropdownOpen] = useState(false);
  const [isMobilePropAccordionOpen, setIsMobilePropAccordionOpen] = useState(false);
  const [dynamicLocations, setDynamicLocations] = useState<LocationItem[]>([]);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    locationService.getAll()
      .then((res: any) => {
        if (res.data?.data) {
          setDynamicLocations(res.data.data);
        }
      })
      .catch((err: any) => console.error('Error fetching locations in header', err));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPropertyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPropertyDropdownOpen(false);
  }, [location.pathname, location.search]);

  const cityLocations = dynamicLocations.length > 0
    ? dynamicLocations.map(loc => ({ city: loc.name }))
    : [
        { city: 'Jaipur' },
        { city: 'Ajmer' },
        { city: 'Kishangarh' },
        { city: 'Mumbai' }
      ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isPropertiesActive = location.pathname.startsWith('/properties');

  return (
    <>
      {/* Top Heritage Notification & Contact Bar (Normal flow - SCROLLS naturally with page, NOT fixed) */}
      <div className="bg-forest-950 text-ivory text-xs py-1.5 px-3 sm:px-6 lg:px-8 border-b border-forest-900 w-full">
        <div className="w-full flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a
              href="tel:9828226566"
              className="flex items-center space-x-1.5 text-gold-400 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span className="font-bold tracking-wide">9828226566</span>
            </a>
            <a
              href="mailto:info@jaipurpropertywala.in"
              className="hidden sm:flex items-center space-x-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-gold-500" />
              <span>info@jaipurpropertywala.in</span>
            </a>
            <div className="hidden md:flex items-center space-x-1.5 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-gold-500" />
              <span>Mon - Sun: 9:00 AM - 8:00 PM</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-1.5 text-gold-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span className="text-[11px] uppercase tracking-wider">
                {dynamicLocations.length > 0
                  ? dynamicLocations.map(l => l.name).join(' • ')
                  : 'Jaipur • Ajmer • Kishangarh • Mumbai'}
              </span>
            </div>
            <a
              href="https://adminproperti.dobhi.in"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-gold-300 text-[11px] font-semibold transition-colors ml-2 hidden lg:inline"
            >
              Admin Portal
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar (Edges touch full width left & right) */}
      <header ref={headerRef} className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-xs">
        <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Brand Identity (Aligned left) */}
            <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0">
              <img
                src="/logo.png"
                alt="Jaipur Property Wala Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-gold-400 object-cover shadow-xs group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold font-editorial tracking-tight text-forest-950 group-hover:text-forest-800 transition-colors leading-tight">
                  JAIPUR PROPERTY WALA
                </span>
                <span className="text-[9px] tracking-wider uppercase text-gold-700 font-bold leading-tight">
                  JDA Approved Plots • Colonizers & Developers
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                  location.pathname === '/'
                    ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                    : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/about')
                    ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                    : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
                }`}
              >
                About Us
              </Link>

              {/* Compact Properties Dropdown (Clean list of location names only) */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsPropertyDropdownOpen(true)}
                onMouseLeave={() => setIsPropertyDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsPropertyDropdownOpen(!isPropertyDropdownOpen)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center space-x-1 ${
                    isPropertiesActive
                      ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                      : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
                  }`}
                >
                  <span>Properties</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isPropertyDropdownOpen ? 'rotate-180 text-gold-600' : 'text-stone-400'}`} />
                </button>

                {/* Compact Dropdown Menu */}
                {isPropertyDropdownOpen && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-stone-200 p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      to="/properties"
                      onClick={() => setIsPropertyDropdownOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold text-gold-700 hover:bg-gold-50 transition-colors border-b border-stone-100 mb-1"
                    >
                      <Building2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>All Properties</span>
                    </Link>

                    <div className="space-y-0.5">
                      {cityLocations.map((item) => (
                        <Link
                          key={item.city}
                          to={`/properties?city=${encodeURIComponent(item.city)}`}
                          onClick={() => setIsPropertyDropdownOpen(false)}
                          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-charcoal-700 hover:text-forest-950 hover:bg-forest-50 transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                          <span>{item.city}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/gallery"
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/gallery')
                    ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                    : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
                }`}
              >
                Gallery
              </Link>

              <Link
                to="/careers"
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/careers')
                    ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                    : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
                }`}
              >
                Careers
              </Link>

              <Link
                to="/blogs"
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/blogs')
                    ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                    : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
                }`}
              >
                Blogs
              </Link>

              <Link
                to="/contact"
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/contact')
                    ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                    : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* CTA & Actions (Aligned right) */}
            <div className="hidden sm:flex items-center space-x-3 shrink-0">
              <button
                onClick={onOpenEnquiry}
                className="bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm tracking-wide shadow-xs transition-all duration-150 flex items-center space-x-1.5"
              >
                <span>Property Enquiry</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-lg text-forest-950 hover:bg-stone-100 focus:outline-none"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white border-t border-stone-200 overflow-y-auto overscroll-contain shadow-2xl"
            style={{
              top: `${headerHeight}px`,
              height: `calc(100dvh - ${headerHeight}px)`
            }}
          >
            <div className="px-5 pt-4 pb-32 space-y-2">
              <Link
                to="/"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  location.pathname === '/' ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/about') ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
                }`}
              >
                About Us
              </Link>

              {/* Mobile Properties Accordion (Clean location list) */}
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setIsMobilePropAccordionOpen(!isMobilePropAccordionOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold text-forest-950 bg-stone-50"
                >
                  <span>Properties by Location</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobilePropAccordionOpen ? 'rotate-180 text-gold-600' : ''}`} />
                </button>

                {isMobilePropAccordionOpen && (
                  <div className="p-2 bg-white space-y-1">
                    <Link
                      to="/properties"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold text-gold-700 hover:bg-gold-50 border-b border-stone-100 mb-1"
                    >
                      <Building2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>All Properties</span>
                    </Link>

                    {cityLocations.map((item) => (
                      <Link
                        key={item.city}
                        to={`/properties?city=${encodeURIComponent(item.city)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-charcoal-800 hover:bg-stone-100"
                      >
                        <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                        <span>{item.city}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/gallery"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/gallery') ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
                }`}
              >
                Gallery
              </Link>

              <Link
                to="/careers"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/careers') ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
                }`}
              >
                Careers
              </Link>

              <Link
                to="/blogs"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/blogs') ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
                }`}
              >
                Blogs
              </Link>

              <Link
                to="/contact"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/contact') ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
                }`}
              >
                Contact Us
              </Link>

              <div className="pt-4 border-t border-stone-200 space-y-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenEnquiry) onOpenEnquiry();
                  }}
                  className="w-full bg-gold-600 text-forest-950 py-2.5 rounded-xl font-bold text-center shadow-xs text-sm"
                >
                  Property Enquiry
                </button>

                <div className="p-3 bg-forest-50 rounded-xl space-y-2 text-xs text-forest-950">
                  <div className="font-bold text-[11px] tracking-wider uppercase text-gold-800">Official Contact</div>
                  <a href="tel:9828226566" className="flex items-center space-x-2 font-bold text-forest-900">
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    <span>9828226566</span>
                  </a>
                  <a href="mailto:info@jaipurpropertywala.in" className="flex items-center space-x-2 text-charcoal-700">
                    <Mail className="w-3.5 h-3.5 text-gold-600" />
                    <span>info@jaipurpropertywala.in</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
