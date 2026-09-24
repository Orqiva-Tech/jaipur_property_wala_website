import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Compass,
  MapPin,
  Building2,
  Sparkles
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
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const baseCityDetails: Record<string, { tag: string; areas: string[] }> = {
    'Jaipur': {
      tag: 'Pink City Flagship Schemes',
      areas: ['Jagatpura', 'Mahindra SEZ', 'Tonk Road Vatika', 'Ajmer Road', 'Sirsi Road']
    },
    'Ajmer': {
      tag: 'Heritage & Spiritual Hub',
      areas: ['Pushkar Bypass Road', 'Panchsheel Nagar']
    },
    'Kishangarh': {
      tag: 'Asia’s Marble & Airport Corridor',
      areas: ['NH-8 Marble Hub', 'Silora RIICO Zone']
    },
    'Mumbai': {
      tag: 'MMR Coastal & Highway Axis',
      areas: ['Palghar-Boisar Coastal Belt', 'Panvel Growth Corridor']
    }
  };

  const cityLocations = dynamicLocations.length > 0
    ? dynamicLocations.map(loc => ({
        city: loc.name,
        tag: loc.tagline || baseCityDetails[loc.name]?.tag || `${loc.name} High Growth Sector`,
        areas: baseCityDetails[loc.name]?.areas || ['Prime Plotted Township', 'Expressway Sector']
      }))
    : [
        {
          city: 'Jaipur',
          tag: 'Pink City Flagship Schemes',
          areas: ['Jagatpura', 'Mahindra SEZ', 'Tonk Road Vatika', 'Ajmer Road', 'Sirsi Road']
        },
        {
          city: 'Ajmer',
          tag: 'Heritage & Spiritual Hub',
          areas: ['Pushkar Bypass Road', 'Panchsheel Nagar']
        },
        {
          city: 'Kishangarh',
          tag: 'Asia’s Marble & Airport Corridor',
          areas: ['NH-8 Marble Hub', 'Silora RIICO Zone']
        },
        {
          city: 'Mumbai',
          tag: 'MMR Coastal & Highway Axis',
          areas: ['Palghar-Boisar Coastal Belt', 'Panvel Growth Corridor']
        }
      ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isPropertiesActive = location.pathname.startsWith('/properties');

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
      {/* Top Heritage Notification & Contact Bar */}
      <div className="bg-forest-950 text-ivory text-xs py-2 px-4 border-b border-forest-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <a
              href="tel:09828226566"
              className="flex items-center space-x-1.5 text-gold-400 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span className="font-bold tracking-wide">09828226566</span>
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

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-gold-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span className="text-[11px] uppercase tracking-wider">
                {dynamicLocations.length > 0
                  ? dynamicLocations.map(l => l.name).join(' • ')
                  : 'Jaipur • Ajmer • Kishangarh • Mumbai'}
              </span>
            </div>
            <Link
              to="/admin/login"
              className="text-gray-300 hover:text-gold-300 text-[11px] font-semibold transition-colors ml-2 hidden lg:inline"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/logo.png"
              alt="Jaipur Property Wala Logo"
              className="w-12 h-12 rounded-full border-2 border-gold-400 object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold font-editorial tracking-tight text-forest-950 group-hover:text-forest-800 transition-colors">
                JAIPUR PROPERTY WALA
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold-700 font-bold">
                JDA Approved Plots • Colonizers & Developers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                location.pathname === '/'
                  ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                  : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/about')
                  ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                  : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
              }`}
            >
              About Us
            </Link>

            {/* Properties Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setIsPropertyDropdownOpen(true)}
              onMouseLeave={() => setIsPropertyDropdownOpen(false)}
            >
              <button
                onClick={() => setIsPropertyDropdownOpen(!isPropertyDropdownOpen)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                  isPropertiesActive
                    ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                    : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
                }`}
              >
                <span>Properties</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isPropertyDropdownOpen ? 'rotate-180 text-gold-600' : 'text-stone-400'}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {isPropertyDropdownOpen && (
                <div className="absolute top-full -left-20 w-[640px] bg-white rounded-2xl shadow-2xl border-2 border-gold-600/60 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-5 h-5 text-gold-600" />
                      <span className="text-sm font-bold uppercase tracking-wider text-forest-950">
                        Explore Verified Inventory by City
                      </span>
                    </div>
                    <Link
                      to="/properties"
                      onClick={() => setIsPropertyDropdownOpen(false)}
                      className="text-xs font-bold text-gold-700 hover:text-gold-900 flex items-center space-x-1"
                    >
                      <span>View All Projects</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {cityLocations.map((item) => (
                      <div
                        key={item.city}
                        className="p-3.5 rounded-xl bg-[#F8FAF8] border border-stone-200 hover:border-gold-500 hover:bg-white transition-all space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            to={`/properties?city=${encodeURIComponent(item.city)}`}
                            onClick={() => setIsPropertyDropdownOpen(false)}
                            className="text-base font-bold font-editorial text-forest-950 group-hover:text-gold-700 flex items-center space-x-1.5"
                          >
                            <MapPin className="w-4 h-4 text-gold-600" />
                            <span>{item.city}</span>
                          </Link>
                          <span className="text-[10px] bg-gold-100 text-gold-800 font-bold px-2 py-0.5 rounded">
                            Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-charcoal-500 font-medium">
                          {item.tag}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.areas.map((area) => (
                            <Link
                              key={area}
                              to={`/properties?city=${encodeURIComponent(item.city)}&location=${encodeURIComponent(area)}`}
                              onClick={() => setIsPropertyDropdownOpen(false)}
                              className="text-[11px] bg-white text-forest-950 px-2.5 py-1 rounded-md border border-stone-300 hover:border-forest-900 font-semibold transition-colors"
                            >
                              {area}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200 flex justify-between items-center text-xs text-charcoal-600">
                    <span className="font-medium">
                      🛡️ 100% Clear titles • 80% Bank loan available in all locations
                    </span>
                    <button
                      onClick={() => {
                        setIsPropertyDropdownOpen(false);
                        if (onOpenEnquiry) onOpenEnquiry();
                      }}
                      className="font-bold text-forest-900 hover:text-gold-700 underline"
                    >
                      Request Custom Site Visit
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/gallery')
                  ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                  : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/careers"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/careers')
                  ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                  : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
              }`}
            >
              Careers
            </Link>

            <Link
              to="/blogs"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/blogs')
                  ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                  : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
              }`}
            >
              Blogs
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/contact')
                  ? 'text-forest-950 bg-forest-50 font-bold border-b-2 border-forest-900'
                  : 'text-charcoal-700 hover:text-forest-950 hover:bg-stone-50'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenEnquiry}
              className="bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold px-5 py-2.5 rounded-xl text-sm tracking-wide shadow-md transition-all duration-200 flex items-center space-x-1.5"
            >
              <span>Property Enquiry</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-forest-950 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-28 z-40 bg-white/98 backdrop-blur-xl border-t border-stone-200 overflow-y-auto pb-12 animate-in fade-in slide-in-from-top duration-300">
          <div className="px-5 pt-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                location.pathname === '/' ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                isActive('/about') ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
              }`}
            >
              About Us
            </Link>

            {/* Mobile Properties Accordion */}
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setIsMobilePropAccordionOpen(!isMobilePropAccordionOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-bold text-forest-950 bg-stone-50"
              >
                <span>Properties by Location</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isMobilePropAccordionOpen ? 'rotate-180 text-gold-600' : ''}`} />
              </button>

              {isMobilePropAccordionOpen && (
                <div className="p-3 bg-white space-y-3">
                  <Link
                    to="/properties"
                    className="block text-xs font-bold text-gold-700 uppercase tracking-wider pb-1 border-b border-stone-100"
                  >
                    View All Properties →
                  </Link>

                  {cityLocations.map((item) => (
                    <div key={item.city} className="space-y-1">
                      <Link
                        to={`/properties?city=${encodeURIComponent(item.city)}`}
                        className="text-sm font-bold text-forest-950 block hover:text-gold-700"
                      >
                        📍 {item.city}
                      </Link>
                      <div className="flex flex-wrap gap-1 pl-4">
                        {item.areas.map((area) => (
                          <Link
                            key={area}
                            to={`/properties?city=${encodeURIComponent(item.city)}&location=${encodeURIComponent(area)}`}
                            className="text-xs bg-stone-100 px-2 py-0.5 rounded text-charcoal-700 font-medium"
                          >
                            {area}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                isActive('/gallery') ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/careers"
              className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                isActive('/careers') ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
              }`}
            >
              Careers
            </Link>

            <Link
              to="/blogs"
              className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                isActive('/blogs') ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
              }`}
            >
              Blogs
            </Link>

            <Link
              to="/contact"
              className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                isActive('/contact') ? 'bg-forest-950 text-gold-300 font-bold' : 'text-charcoal-800 hover:bg-stone-100'
              }`}
            >
              Contact Us
            </Link>

            <div className="pt-6 border-t border-stone-200 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full bg-gold-600 text-forest-950 py-3 rounded-xl font-bold text-center shadow"
              >
                Property Enquiry
              </button>

              <div className="p-4 bg-forest-50 rounded-xl space-y-2 text-sm text-forest-950">
                <div className="font-bold text-xs tracking-wider uppercase text-gold-800">Official Contact</div>
                <a href="tel:09828226566" className="flex items-center space-x-2 font-bold text-forest-900">
                  <Phone className="w-4 h-4 text-gold-600" />
                  <span>09828226566</span>
                </a>
                <a href="mailto:info@jaipurpropertywala.in" className="flex items-center space-x-2 text-charcoal-700 text-xs">
                  <Mail className="w-4 h-4 text-gold-600" />
                  <span>info@jaipurpropertywala.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
