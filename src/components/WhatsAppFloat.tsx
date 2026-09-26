import React, { useEffect, useState } from 'react';
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

  const rawPhone = settings?.phone || settings?.alternatePhone || '9251217568';
  const cleanPhone = rawPhone.replace(/[^0-9+]/g, '');
  const rawWa = settings?.whatsapp || '919251217568';
  const cleanWa = rawWa.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-3">
      {/* Calling button on top */}
      <a
        href={`tel:${cleanPhone}`}
        className="w-12 h-12 rounded-full bg-forest-950 text-gold-400 hover:text-white hover:bg-forest-900 shadow-2xl hover:scale-110 transition-all duration-200 border-2 border-gold-500/80 flex items-center justify-center group"
        aria-label="Call Now"
        title="Call Now"
      >
        <i className="fa-solid fa-phone text-base group-hover:rotate-12 transition-transform duration-200" />
      </a>

      {/* WhatsApp button below calling */}
      <a
        href={`https://api.whatsapp.com/send?phone=${cleanWa}&text=Hello%20Jaipur%20Property%20Wala,%20I%20am%20interested%20in%20JDA%20Approved%20plots%20in%20Jaipur.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-2xl hover:scale-110 transition-all duration-200 border-2 border-white flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-2xl group-hover:scale-110 transition-transform duration-200" />
      </a>
    </div>
  );
};

