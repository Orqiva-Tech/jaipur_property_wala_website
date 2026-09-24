import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Target, Eye, CheckCircle2, Phone, MapPin, Landmark, Users, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F8F9F8] min-h-screen py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>About Jaipur Property Wala</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-forest-950 leading-tight">
            Two Decades of Integrity in <span className="text-gold-700">Jaipur Real Estate</span>
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-normal">
            Founded on the bedrock of legal transparency and customer-first advisory, Jaipur Property Wala (Jaipur JDA Plots Colonizers & Developers) has facilitated the dream of plotted land and villa ownership for over 4,500 families across Rajasthan.
          </p>
        </div>

        {/* Narrative & Visual Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Jaipur Development"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Contained Experience Badge (No negative overflow overlap!) */}
              <div className="absolute bottom-5 right-5 bg-forest-950 text-white p-5 rounded-2xl shadow-2xl border-2 border-gold-500/60 max-w-[220px]">
                <span className="text-3xl font-bold font-editorial text-gold-400 block">4,500+</span>
                <span className="text-xs text-gray-200 font-medium leading-tight">
                  Families happily settled in verified JDA townships
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-forest-950 leading-tight">
              Our Journey & Heritage
            </h2>
            <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-normal">
              When we started our journey over 20 years ago in Jaipur, purchasing plotted land was fraught with unorganized brokers, confusing agricultural revenue paperwork, and disputed boundaries.
            </p>
            <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-normal">
              We took a firm vow: <strong className="text-forest-950 font-bold">Only deal in 100% verified, JDA sanctioned schemes with clear 90-A conversions, boundary demarcations, and spot bank registry approvals.</strong>
            </p>
            <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-normal">
              Today, Jaipur Property Wala stands as one of Jaipur’s most respected colonizers and property advisories, representing mega projects in Jagatpura, Mahindra SEZ, Tonk Road, and Ajmer Expressway.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-stone-300 shadow-2xs">
                <span className="text-xl font-bold font-editorial text-forest-950 block">100% Legal</span>
                <span className="text-xs text-charcoal-600 font-medium">Zero non-approved plots</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-300 shadow-2xs">
                <span className="text-xl font-bold font-editorial text-forest-950 block">0% Brokerage</span>
                <span className="text-xs text-charcoal-600 font-medium">Direct developer pricing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, and Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
              <Target className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="text-xl font-bold font-editorial text-forest-950">Our Mission</h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              To simplify real estate investment in Jaipur by offering 100% legally vetted plotted inventory with complete title clarity, guaranteed bank approvals, and end-to-end registry support.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
              <Eye className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="text-xl font-bold font-editorial text-forest-950">Our Vision</h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              To be Rajasthan's most trusted plotted development brand, empowering every family to build their generational wealth safely on master-planned, high-growth corridors.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
              <Award className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="text-xl font-bold font-editorial text-forest-950">Our Values</h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              Uncompromising integrity, direct developer transparency, client-first advisory, zero brokerage, and steadfast commitment to JDA and RERA regulatory governance.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-gold-600 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white">
              Ready to Explore Verified JDA Schemes?
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 max-w-xl">
              Talk directly with our senior advisors or schedule a complimentary site visit cab to Jagatpura, SEZ, or Tonk Road.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/properties"
              className="px-6 py-3.5 bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold rounded-xl text-sm shadow transition-all flex items-center space-x-2"
            >
              <span>Explore Plots</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919251217568"
              className="px-6 py-3.5 bg-forest-900 hover:bg-forest-800 text-white font-bold rounded-xl text-sm border border-gold-500/40 transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>+91 92512 17568</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
