import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { settingsService } from '../services/api';
import { WebsiteSettings } from '../types';

export const WhatsAppFloat: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);

  useEffect(() => {
    settingsService.getSettings()
      .then((res: any) => {
        if (res.data?.data) {
          setSettings(res.data.data);
        }
      })
      .catch((err) => console.warn('WhatsAppFloat settings load error:', err));
  }, []);

  const rawPhone = settings?.phone || settings?.alternatePhone || '09828226566';
  const cleanPhone = rawPhone.replace(/[^0-9+]/g, '');
  const rawWa = settings?.whatsapp || '919828226566';
  const cleanWa = rawWa.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-2.5">
      {/* Direct Call Trigger */}
      <a
        href={`tel:${cleanPhone}`}
        className="flex items-center space-x-2 bg-forest-950 text-gold-300 hover:text-white px-3.5 py-2.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-gold-500/60"
        aria-label="Call Now"
      >
        <Phone className="w-4 h-4 text-gold-400" />
        <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
          {rawPhone}
        </span>
      </a>

      {/* WhatsApp Trigger */}
      <a
        href={`https://api.whatsapp.com/send?phone=${cleanWa}&text=Hello%20Jaipur%20Property%20Wala,%20I%20am%20interested%20in%20JDA%20Approved%20plots%20in%20Jaipur.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#20BD5A] text-white p-3 sm:px-4 sm:py-2.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white/80"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="hidden sm:inline-block text-xs font-extrabold tracking-wide">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
};
