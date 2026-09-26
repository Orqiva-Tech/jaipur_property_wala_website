import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { settingsService } from '../services/api';
import { WebsiteSettings } from '../types';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);

  useEffect(() => {
    settingsService.getSettings()
      .then((res: any) => {
        if (res.data?.data) {
          setSettings(res.data.data);
        }
      })
      .catch((err) => console.warn('Footer settings load error:', err));
  }, []);

  const phone = settings?.phone || settings?.alternatePhone || '9251217568';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const email = settings?.email || 'info@jaipurpropertywala.in';
  const address = settings?.address || 'Livasha Flat No.301, Mahal Yojna, Mahal Road Scheme, Jagatpura, Jaipur - 302017, Rajasthan';
  const logo = settings?.logoUrl || '/logo.png';
  const companyName = settings?.companyName || 'JAIPUR PROPERTY WALA';
  const fb = settings?.socialLinks?.facebook || 'https://facebook.com';
  const insta = settings?.socialLinks?.instagram || 'https://instagram.com';
  const yt = settings?.socialLinks?.youtube || 'https://youtube.com';
  const li = settings?.socialLinks?.linkedin || 'https://linkedin.com';

  return (
    <footer className="bg-forest-900 text-ivory pt-16 pb-8 border-t-4 border-gold-600">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-forest-700/60">

          {/* Brand & Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt={`${companyName} Logo`}
                className="w-12 h-12 rounded-full border-2 border-gold-400 object-cover shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold font-editorial tracking-tight text-white">
                  {companyName}
                </h3>
                <p className="text-[10px] tracking-widest uppercase text-gold-400 font-medium">
                  Colonizers & Developers
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {settings?.tagline || 'Orqiva Tech is an award-winning global IT & digital marketing company delivering enterprise software, mobile apps, and AI solutions.'}
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <a
                href={`mailto:${email}`}
                className="flex items-center space-x-2 text-gold-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{email}</span>
              </a>
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center space-x-2 text-gold-400 hover:text-white transition-colors font-semibold"
              >
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{phone}</span>
              </a>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 bg-forest-800/80 px-3 py-1.5 rounded border border-gold-500/30 text-xs text-gold-400">
                <ShieldCheck className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>Verified Legal Titles & Spot Registry</span>
              </div>
            </div>

            {/* Social Icons - Font Awesome */}
            <div className="flex items-center space-x-3 pt-3">
              {fb && (
                <a
                  href={fb}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gold-600 transition-all duration-200 hover:scale-105"
                  aria-label="Facebook"
                >
                  <i className="fa-brands fa-facebook-f text-sm" />
                </a>
              )}
              {insta && (
                <a
                  href={insta}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gold-600 transition-all duration-200 hover:scale-105"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram text-sm" />
                </a>
              )}
              {yt && (
                <a
                  href={yt}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gold-600 transition-all duration-200 hover:scale-105"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube text-sm" />
                </a>
              )}
              {li && (
                <a
                  href={li}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gold-600 transition-all duration-200 hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in text-sm" />
                </a>
              )}
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
                  {address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href={`tel:${cleanPhone}`} className="font-semibold text-white hover:text-gold-400 transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-gold-400 transition-colors">
                  {email}
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3.5 rounded-lg bg-forest-800/90 border border-forest-700 text-xs text-gray-300">
              <span className="font-semibold text-gold-400 block mb-1">Office Hours:</span>
              {settings?.officeTimings || 'Monday - Sunday: 9:00 AM - 10:00 PM'}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-gold-400 font-semibold">{companyName}</span>. All Rights Reserved.
          </div>
          <div className="text-xs text-gray-300">
            Digital Partner:{' '}
            <a href="mailto:hr@orqivatech.com" className="text-gold-400 hover:underline font-semibold">
              Orqiva Tech
            </a>{' '}
            (<a href={`tel:${cleanPhone}`} className="hover:text-gold-300">{phone}</a>)
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
