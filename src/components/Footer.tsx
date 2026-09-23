import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-900 text-ivory pt-16 pb-8 border-t-4 border-gold-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-forest-700/60">
          
          {/* Brand & Introduction */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded bg-gold-600 flex items-center justify-center text-forest-900 font-bold font-editorial text-xl shadow">
                JPW
              </div>
              <div>
                <h3 className="text-xl font-bold font-editorial tracking-tight text-white">
                  JAIPUR PROPERTY WALA
                </h3>
                <p className="text-[10px] tracking-widest uppercase text-gold-400 font-medium">
                  Colonizers & Developers
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              We are Jaipur's premier real estate consultancy specializing in genuine JDA & RERA approved residential and commercial plots. Built on transparency, zero brokerage, and 20+ years of local market leadership.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 bg-forest-800/80 px-3 py-1.5 rounded border border-gold-500/30 text-xs text-gold-400">
                <ShieldCheck className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>Verified Legal Titles & Spot Registry</span>
              </div>
            </div>

            {/* Social Icons with Clean SVGs */}
            <div className="flex items-center space-x-3 pt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gold-600 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gold-600 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gold-600 transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gold-600 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold uppercase tracking-wider text-gold-400 mb-4 pb-2 border-b border-forest-700 inline-block font-sans">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-gold-400 flex items-center space-x-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 flex items-center space-x-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>About Our Company</span>
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-gold-400 flex items-center space-x-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>JDA Approved Properties</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold-400 flex items-center space-x-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>Photo & Video Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-gold-400 flex items-center space-x-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>Careers & Openings</span>
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-gold-400 flex items-center space-x-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>Jaipur Real Estate Blogs</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 flex items-center space-x-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>Contact & Site Visit</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Prime Hotspots */}
          <div>
            <h4 className="text-base font-semibold uppercase tracking-wider text-gold-400 mb-4 pb-2 border-b border-forest-700 inline-block font-sans">
              Jaipur Growth Corridors
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                <span>Mahal Road & Jagatpura</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                <span>Mahindra SEZ & Ajmer Expressway</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                <span>Tonk Road & Vatika Mod</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                <span>Bombay Hospital Scheme</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                <span>Sirsi Road & Vaishali Extension</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                <span>Ring Road Connecting Sector</span>
              </li>
            </ul>
          </div>

          {/* Official Registered Office Address */}
          <div>
            <h4 className="text-base font-semibold uppercase tracking-wider text-gold-400 mb-4 pb-2 border-b border-forest-700 inline-block font-sans">
              Head Office
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Livasha Flat No.301, Mahal Yojna, Mahal Road Scheme, Jagatpura, Jaipur - 302017, Rajasthan.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href="tel:09828226566" className="font-semibold text-white hover:text-gold-400 transition-colors">
                  09828226566
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href="mailto:info@jaipurpropertywala.in" className="hover:text-gold-400 transition-colors">
                  info@jaipurpropertywala.in
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3.5 rounded-lg bg-forest-800/90 border border-forest-700 text-xs text-gray-300">
              <span className="font-semibold text-gold-400 block mb-1">Bank Loan Assistance:</span>
              Pre-approved loans up to 80% with SBI, HDFC, ICICI, PNB & Axis Bank.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-gold-400 font-semibold">JAIPUR PROPERTY WALA</span>. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
            <Link to="/admin/login" className="hover:text-gold-400 transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
