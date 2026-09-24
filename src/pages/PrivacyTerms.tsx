import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyTerms: React.FC = () => {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-luxury space-y-6">
          <div className="flex items-center space-x-2 text-forest-800">
            <ShieldCheck className="w-6 h-6 text-gold-600" />
            <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-forest-900">
              Privacy Policy & Terms of Service
            </h1>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
            <h3 className="text-base font-bold text-forest-900 font-editorial">1. Commitment to Customer Privacy</h3>
            <p>
              Jaipur Property Wala (Jaipur JDA Plots Colonizers & Developers) is committed to safeguarding customer personal and contact data. Any information submitted via our property inquiry forms, callback requests, or career job application forms is strictly utilized for direct real estate advisory and internal recruitment purposes.
            </p>

            <h3 className="text-base font-bold text-forest-900 font-editorial">2. Legal Disclaimers & JDA Status</h3>
            <p>
              All property descriptions, plot sizes, road dimensions, and regulatory approvals displayed on this platform are compiled from officially sanctioned Jaipur Development Authority (JDA) and RERA layout filings. Prospective buyers are encouraged to review original revenue jamabandi and patta records during on-site inspections arranged with our certified executive.
            </p>

            <h3 className="text-base font-bold text-forest-900 font-editorial">3. Zero Brokerage Guarantee</h3>
            <p>
              We operate on a zero brokerage model for direct developer township schemes. No unauthorized commission or fee is charged from individual homebuyers for booking residential plots in our featured schemes.
            </p>

            <h3 className="text-base font-bold text-forest-900 font-editorial">4. Official Registered Office</h3>
            <p>
              Livasha Flat No.301, Mahal Yojna, Mahal Road Scheme, Jagatpura, Jaipur - 302017, Rajasthan. Contact: +91 92512 17568 | info@jaipurpropertywala.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
