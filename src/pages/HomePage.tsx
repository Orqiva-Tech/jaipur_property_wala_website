import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Compass,
  ArrowRight,
  Phone,
  Landmark,
  Trees,
  Car,
  MessageCircle,
  Building,
  KeyRound,
  FileCheck
} from 'lucide-react';
import { propertyService, blogService, galleryService } from '../services/api';
import { Property, Blog, GalleryItem } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { HeroSearch } from '../components/HeroSearch';

interface HomePageProps {
  onOpenEnquiry: (property?: Property) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [galleryPreview, setGalleryPreview] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [propsRes, blogsRes, galleryRes] = await Promise.all([
          propertyService.getFeatured(),
          blogService.getAll({ limit: 3 }),
          galleryService.getAll()
        ]);
        setFeaturedProperties(propsRes.data.data || []);
        setRecentBlogs(blogsRes.data.data?.slice(0, 3) || []);
        setGalleryPreview(galleryRes.data.data?.slice(0, 4) || []);
      } catch (error) {
        console.error('Error loading homepage data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24 bg-[#F8F9F8]">
      
      {/* SECTION A: Cinematic Hero with High-Contrast Overlay */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex flex-col justify-center text-white overflow-hidden">
        {/* Background Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85')`
          }}
        />
        {/* Deep, rich dark overlay so text is 100% visible and sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/95 via-forest-950/90 to-forest-950/95" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-gold-950/80 border border-gold-500/60 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-gold-300">
              100% JDA & RERA Approved Residential & Commercial Plots
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-editorial tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight lg:leading-tight mb-5">
            Discover Verified <span className="text-gold-400">JDA Approved Plots</span> in Jaipur
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-gray-200 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            Buy residential and commercial plots starting from ₹15 Lakhs with spot registry and 80% pre-approved bank loans. Prime schemes in Jagatpura, Mahindra SEZ, Tonk Road & Ajmer Expressway.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold text-sm tracking-wide shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Explore Verified Plots</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onOpenEnquiry()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-forest-900/90 hover:bg-forest-800 text-white font-semibold text-sm tracking-wide border border-gold-500/40 backdrop-blur-md transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Book Free Site Visit Cab</span>
            </button>
          </div>

          {/* Key Facts / Metric Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/15 text-center">
            <div className="p-3.5 bg-forest-900/70 rounded-xl border border-white/15">
              <span className="block text-2xl sm:text-3xl font-bold font-editorial text-gold-400">20+</span>
              <span className="text-xs text-gray-200 font-semibold uppercase tracking-wider">Years Experience</span>
            </div>
            <div className="p-3.5 bg-forest-900/70 rounded-xl border border-white/15">
              <span className="block text-2xl sm:text-3xl font-bold font-editorial text-gold-400">3,200+</span>
              <span className="text-xs text-gray-200 font-semibold uppercase tracking-wider">Plots Delivered</span>
            </div>
            <div className="p-3.5 bg-forest-900/70 rounded-xl border border-white/15">
              <span className="block text-2xl sm:text-3xl font-bold font-editorial text-gold-400">80%</span>
              <span className="text-xs text-gray-200 font-semibold uppercase tracking-wider">Bank Loan Max</span>
            </div>
            <div className="p-3.5 bg-forest-900/70 rounded-xl border border-white/15">
              <span className="block text-2xl sm:text-3xl font-bold font-editorial text-gold-400">0%</span>
              <span className="text-xs text-gray-200 font-semibold uppercase tracking-wider">Brokerage Fee</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION B: Property Search Filter (Clean, independent container - zero overlap) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <HeroSearch />
      </section>

      {/* SECTION C: Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-300">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-800 mb-1.5">
              <Compass className="w-4 h-4 text-gold-600" />
              <span>Verified Townships</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-forest-950">
              Featured JDA Approved Projects
            </h2>
          </div>
          <Link
            to="/properties"
            className="mt-4 md:mt-0 text-sm font-bold text-forest-900 hover:text-gold-700 flex items-center space-x-1.5 transition-colors"
          >
            <span>View All Available Plots</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-stone-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onEnquire={(p) => onOpenEnquiry(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* SECTION D: About Jaipur Property Wala */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Stack */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
                  alt="Jaipur Property Wala"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">
                    Authentic Jaipur Roots
                  </span>
                  <p className="text-base font-editorial font-bold italic leading-snug">
                    “Estate brings together all the essentials of modern living with features that ensure comfort, safety, and lasting value.”
                  </p>
                </div>

                {/* Experience Callout Badge (Contained safely inside image wrapper) */}
                <div className="absolute bottom-4 right-4 bg-forest-950 text-white p-4 sm:p-5 rounded-2xl shadow-2xl border-2 border-gold-500/60 max-w-[200px]">
                  <span className="text-2xl sm:text-3xl font-bold font-editorial text-gold-400 block">20+ Years</span>
                  <span className="text-[11px] text-gray-200 font-medium leading-tight block">
                    Pioneering Safe JDA Land Ownership in Jaipur
                  </span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full">
                <Award className="w-4 h-4 text-gold-600" />
                <span>About Our Company</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-forest-950 leading-tight">
                Why Choose Jaipur Property Wala?
              </h2>

              <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-normal">
                Jaipur Property Wala (Jaipur JDA Plots Colonizers & Developers) has established an unmatched benchmark of credibility across Rajasthan. We protect your hard-earned investment by offering only clear-title, JDA-approved schemes with direct spot registry and zero hidden charges.
              </p>

              <div className="space-y-3.5 pt-1">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-forest-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-forest-950">Guaranteed Capital Appreciation:</h4>
                    <p className="text-xs text-charcoal-700">Planned JDA sectors in Jagatpura, SEZ, and Tonk Road have consistently generated high capital gains.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-forest-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-forest-950">Total Construction Flexibility:</h4>
                    <p className="text-xs text-charcoal-700">Construct your custom dream villa immediately, lease commercial spaces, or hold the clear-title plot for your family.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-forest-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-forest-950">100% Security & 80% Bank Loan:</h4>
                    <p className="text-xs text-charcoal-700">All properties feature complete 90-A revenue conversion with instant loans supported by SBI, HDFC, and ICICI.</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-xl bg-forest-950 text-gold-300 hover:bg-forest-900 font-bold text-xs tracking-wide transition-all shadow border border-gold-500/40"
                >
                  Learn Our History
                </Link>
                <a
                  href="tel:09828226566"
                  className="px-6 py-3 rounded-xl border-2 border-forest-950 text-forest-950 hover:bg-forest-950 hover:text-white text-xs font-bold tracking-wide transition-all flex items-center space-x-2"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-600" />
                  <span>Call 09828226566</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION E: Key Township Amenities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full inline-block">
            Township Infrastructure
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-forest-950">
            Every Essential for Modern Living
          </h2>
          <p className="text-sm text-charcoal-700 leading-relaxed">
            All colonies developed and represented by Jaipur Property Wala adhere strictly to JDA master-planning guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-300 shadow-luxury space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="text-base font-bold text-forest-950 font-editorial">Gated Security & CCTV</h4>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Grand boom-barrier entrance with round-the-clock security personnel and HD CCTV cameras covering every crossroad.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-300 shadow-luxury space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
              <Car className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="text-base font-bold text-forest-950 font-editorial">40 to 60 Ft Wide Roads</h4>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Heavy-duty bitumen carpet roads, dedicated pedestrian walking corridors, and illuminated solar LED streetlights.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-300 shadow-luxury space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
              <Trees className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="text-base font-bold text-forest-950 font-editorial">Landscaped Theme Parks</h4>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Manicured lawns, open-air fitness gymnasiums, dedicated children's playground equipment, and meditation gazebos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-300 shadow-luxury space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-center">
              <Landmark className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="text-base font-bold text-forest-950 font-editorial">80% Bank Loan Approved</h4>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Pre-approved loan facilities from SBI, HDFC, ICICI, PNB, and Bank of Baroda with immediate registry assistance.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION F: Featured Schemes Showcase */}
      <section className="bg-forest-950 text-white py-16 sm:py-20 border-y-2 border-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
              Signature Plotted Developments
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-white">
              Ongoing & Ready-to-Build Townships
            </h2>
            <p className="text-xs sm:text-sm text-gray-200">
              Explore prime projects with ready possession, underground utilities, and direct highway connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-forest-900 rounded-2xl overflow-hidden border border-forest-800 p-6 space-y-4 hover:border-gold-500/50 transition-all">
              <div className="h-48 rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="VRB World City"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-gold-600 text-forest-950 text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                  Mahindra SEZ
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-editorial text-white">VRB World City</h3>
                <p className="text-xs text-gold-300 font-semibold">Ajmer Expressway Corridor</p>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed">
                Planned mega township with commercial complexes, meditation centers, and sizes from 111 to 200+ Sq. Yards.
              </p>
              <Link
                to="/properties/vrb-world-city-mahendra-sez-jaipur"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-gold-400 hover:text-white"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Project 2 */}
            <div className="bg-forest-900 rounded-2xl overflow-hidden border border-forest-800 p-6 space-y-4 hover:border-gold-500/50 transition-all">
              <div className="h-48 rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                  alt="Bombay Hospital Scheme"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-gold-600 text-forest-950 text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                  Jagatpura
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-editorial text-white">Bombay Hospital Plots</h3>
                <p className="text-xs text-gold-300 font-semibold">Near Mahal Road & Ring Road</p>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed">
                Ready-to-move residential plots surrounded by coaching institutions, hospitals, and 15 mins to Airport.
              </p>
              <Link
                to="/properties/jaipur-bombay-hospital-plots-jagatpura"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-gold-400 hover:text-white"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Project 3 */}
            <div className="bg-forest-900 rounded-2xl overflow-hidden border border-forest-800 p-6 space-y-4 hover:border-gold-500/50 transition-all">
              <div className="h-48 rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
                  alt="Riyasat Eco Park"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-gold-600 text-forest-950 text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                  Tonk Road Vatika
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-editorial text-white">Riyasat Eco Park</h3>
                <p className="text-xs text-gold-300 font-semibold">Main Highway Corridor</p>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed">
                Serene nature living with herbal plantations, gated compound, sweet water supply, and high-yield appreciation.
              </p>
              <Link
                to="/properties/riyasat-eco-park-tonk-road-vatika"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-gold-400 hover:text-white"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: Real Ground Gallery Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-300">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-800 block mb-1">
              Real Ground Reality
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-forest-950">
              Site Progress & Project Highlights
            </h2>
          </div>
          <Link
            to="/gallery"
            className="mt-4 md:mt-0 text-sm font-bold text-forest-900 hover:text-gold-700 flex items-center space-x-1 transition-colors"
          >
            <span>Explore Complete Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryPreview.map((item) => (
            <div key={item._id} className="group relative aspect-square rounded-2xl overflow-hidden shadow-luxury bg-stone-100 border border-stone-300">
              <img
                src={item.mediaUrl.startsWith('http') ? item.mediaUrl : item.mediaUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-[10px] uppercase tracking-wider text-gold-300 font-bold block">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold truncate text-white">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION H: Verified Homebuyer Reviews */}
      <section className="bg-white py-16 sm:py-20 border-t border-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full inline-block">
              Verified Client Experiences
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-forest-950">
              Trusted by 4,500+ Jaipur Homebuyers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8F9F8] p-7 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
              <div className="flex text-gold-600 space-x-1 text-sm font-bold">
                ★★★★★
              </div>
              <p className="text-xs sm:text-sm text-charcoal-800 italic leading-relaxed">
                “Buying our 200 Sq. Yard plot at VRB World City was completely transparent. Jaipur Property Wala helped verify every JDA document and secured an SBI loan within 10 days.”
              </p>
              <div className="pt-2 border-t border-stone-300">
                <h5 className="text-sm font-bold text-forest-950 font-editorial">Vikramaditya Rathore</h5>
                <p className="text-[11px] text-charcoal-600 font-semibold">Plot Owner, VRB World City</p>
              </div>
            </div>

            <div className="bg-[#F8F9F8] p-7 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
              <div className="flex text-gold-600 space-x-1 text-sm font-bold">
                ★★★★★
              </div>
              <p className="text-xs sm:text-sm text-charcoal-800 italic leading-relaxed">
                “Zero brokerage and genuine pricing. No hidden costs. They arranged a site inspection cab and handed over the original registry and JDA patta seamlessly.”
              </p>
              <div className="pt-2 border-t border-stone-300">
                <h5 className="text-sm font-bold text-forest-950 font-editorial">Sunita & Manoj Sharma</h5>
                <p className="text-[11px] text-charcoal-600 font-semibold">Homeowners, Jagatpura Scheme</p>
              </div>
            </div>

            <div className="bg-[#F8F9F8] p-7 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
              <div className="flex text-gold-600 space-x-1 text-sm font-bold">
                ★★★★★
              </div>
              <p className="text-xs sm:text-sm text-charcoal-800 italic leading-relaxed">
                “Best place to invest in Tonk Road plots. The township roads, boundary wall, and green park are fully developed as promised. Highly trustworthy consultants!”
              </p>
              <div className="pt-2 border-t border-stone-300">
                <h5 className="text-sm font-bold text-forest-950 font-editorial">Dr. Anil Agarwal</h5>
                <p className="text-[11px] text-charcoal-600 font-semibold">Investor, Riyasat Eco Park</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION I: Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-forest-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden border-2 border-gold-600 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-950/80 border border-gold-500/60 px-3.5 py-1.5 rounded-full inline-block">
              Complimentary Consultation
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-white">
              Ready to Secure Your JDA Approved Land in Jaipur?
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
              Book a free private site visit with our senior land consultant. We provide complete layout blueprints, bank loan quotes, and verified revenue registry checks.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenEnquiry()}
                className="px-8 py-3.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold text-sm shadow transition-all flex items-center justify-center space-x-2"
              >
                <span>Request Free Callback</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:09828226566"
                className="px-8 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white border border-gold-500/50 text-sm font-bold flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call Now: 09828226566</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
