import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { EnquiryModal } from './components/EnquiryModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { CareersPage } from './pages/CareersPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyTerms } from './pages/PrivacyTerms';
import { Property } from './types';

const PublicLayout: React.FC<{ children: React.ReactNode; onOpenEnquiry: (p?: Property) => void }> = ({
  children,
  onOpenEnquiry
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Header onOpenEnquiry={() => onOpenEnquiry()} />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export const App: React.FC = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [targetProperty, setTargetProperty] = useState<Property | null>(null);

  const openEnquiry = (property?: Property) => {
    setTargetProperty(property || null);
    setIsEnquiryOpen(true);
  };

  return (
    <Router>
      <Routes>
        {/* Admin Redirect to Dedicated Standalone Admin Portal */}
        <Route
          path="/admin/*"
          element={
            <div className="min-h-screen bg-[#07130e] flex items-center justify-center p-4 text-center">
              <div className="max-w-md p-8 bg-[#0c1c15] rounded-3xl border border-gold-500/40 text-stone-200 space-y-4 shadow-2xl">
                <h2 className="text-xl font-bold font-editorial text-gold-300">
                  Jaipur Property Wala Executive ERP
                </h2>
                <p className="text-xs text-stone-300">
                  The Admin Control Panel is hosted on its dedicated secure management portal.
                </p>
                <a
                  href={import.meta.env.VITE_ADMIN_PORTAL_URL || 'https://adminproperti.dobhi.in'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-forest-950 font-bold text-xs uppercase tracking-wider shadow hover:scale-105 transition-transform"
                >
                  Go to Dedicated Admin Portal →
                </a>
              </div>
            </div>
          }
        />

        {/* Public Platform Routes */}
        <Route
          path="/*"
          element={
            <PublicLayout onOpenEnquiry={openEnquiry}>
              <Routes>
                <Route path="/" element={<HomePage onOpenEnquiry={openEnquiry} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/properties" element={<PropertiesPage onOpenEnquiry={openEnquiry} />} />
                <Route path="/properties/:slug" element={<PropertyDetailPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyTerms />} />
                <Route path="/terms" element={<PrivacyTerms />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PublicLayout>
          }
        />
      </Routes>

      {/* Global Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        selectedProperty={targetProperty}
      />
    </Router>
  );
};

export default App;
