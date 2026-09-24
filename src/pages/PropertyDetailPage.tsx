import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  ShieldCheck,
  Landmark,
  Maximize,
  Phone,
  MessageCircle,
  Share2,
  CheckCircle2,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Calculator,
  Compass,
  Video,
  ExternalLink,
  Sparkles,
  Navigation,
  Clock,
  Building
} from 'lucide-react';
import { propertyService, enquiryService, formatImageUrl } from '../services/api';
import { Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';

export const PropertyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [related, setRelated] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [selectedNearbyCategory, setSelectedNearbyCategory] = useState('All');

  // Loan calculator state
  const [loanAmount, setLoanAmount] = useState<number>(2000000);
  const [loanTenure, setLoanTenure] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(8.5);

  // Enquiry form inside property page
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadError, setLeadError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await propertyService.getBySlug(slug);
        setProperty(res.data.data);
        setRelated(res.data.related || []);
        if (res.data.data?.price) {
          setLoanAmount(Math.round(res.data.data.price * 0.8)); // 80% loan default
        }
      } catch (error) {
        console.error('Error fetching property details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [slug]);

  // Calculate Monthly EMI: [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEMI = () => {
    const monthlyRate = interestRate / (12 * 100);
    const months = loanTenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return isNaN(emi) ? 0 : Math.round(emi);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    setSubmitting(true);
    setLeadError('');

    try {
      await enquiryService.create({
        name: leadName,
        phone: leadPhone,
        email: leadEmail,
        interestedProperty: property.title,
        preferredLocation: property.location.area,
        budget: property.priceDisplay,
        message: leadMessage || `I want to visit ${property.title}. Please provide full pricing and layout plan.`,
        source: `Property Detail: ${property.slug}`
      });
      setLeadSuccess(true);
    } catch (err: any) {
      setLeadError(err.response?.data?.message || 'Failed to submit enquiry. Call +91 92512 17568 directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-6">
        <div className="h-10 bg-stone-200 rounded w-1/3" />
        <div className="h-[480px] bg-stone-200 rounded-2xl" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-3xl font-bold font-editorial text-forest-900">Property Not Found</h2>
        <p className="text-sm text-charcoal-700">The requested property listing does not exist or may have been updated.</p>
        <Link to="/properties" className="inline-block px-6 py-2.5 bg-forest-900 text-gold-400 font-bold rounded-lg text-sm">
          Browse All Properties
        </Link>
      </div>
    );
  }

  const defaultImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  const images = (property.images && property.images.length > 0 ? property.images : [defaultImg]).map(img => formatImageUrl(img));

  const defaultArchImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
  ];

  const fallbackHighlights = [
    {
      title: 'Grand Entrance & 24x7 Security Checkpost',
      subtitle: 'First-Class Gated Security & Stone Arch',
      description: 'The entrance gate stands as an architectural beacon with round-the-clock armed guards, RFID boom barriers, and HD CCTV surveillance ensuring maximum privacy and exclusivity for your family.',
      image: defaultArchImages[0]
    },
    {
      title: 'Wide Bitumen Demarcated Master Roads',
      subtitle: '40 Ft & 60 Ft Paved Internal Avenues',
      description: 'Engineered heavy-duty bitumen roads designed for smooth traffic circulation, featuring modern storm-water drainage trenches, paved walking boulevards, and LED street lighting poles every 15 meters.',
      image: defaultArchImages[1]
    },
    {
      title: 'Underground Electrification & High-Yield Water Reservoir',
      subtitle: 'Disaster-Proof Concealed Infrastructure',
      description: 'Zero unsightly hanging cables. High-tension concealed electrical cabling with dual-phase transformers, dedicated overhead storage tanks, and high-pressure sweet water pipelines connected to each plot boundary.',
      image: defaultArchImages[2]
    },
    {
      title: 'Lush Landscaped Theme Park & Community Gazebo',
      subtitle: 'Clean Air, Green Living & Active Wellbeing',
      description: 'Spread over extensive manicured acreage featuring exotic flower beds, acupressure jogging trails, kids adventure play zone, shaded elderly gazebos, and open meditation decks surrounded by mature trees.',
      image: defaultArchImages[3]
    },
    {
      title: 'Immediate Physical Demarcation & Spot Registry',
      subtitle: '100% Clear Title with Concrete Boundary Markers',
      description: 'Every plot is surveyed with satellite DGPS technology and marked with permanent numbered concrete pillars. Complete 90-A sanction file ready for immediate government registry and SBI/HDFC bank loans.',
      image: defaultArchImages[4]
    },
    {
      title: 'Commercial SCO High Street & Daily Conveniences',
      subtitle: 'Self-Sustaining Township Ecosystem',
      description: 'Frontage dedicated to high-street daily retail stores, dairy outlets, medical dispensary, EV charging points, and dedicated visitor parking spaces, eliminating the need to travel far for essentials.',
      image: defaultArchImages[5]
    }
  ];

  const computedHighlights = fallbackHighlights.map((fallback, idx) => {
    const custom = property.imageHighlights && property.imageHighlights[idx];
    return {
      title: custom?.title || fallback.title,
      subtitle: fallback.subtitle,
      description: custom?.description || fallback.description,
      image: custom?.image || images[idx] || fallback.image
    };
  });

  const fallbackNearby = [
    { name: 'National Highway / Ring Road Bypass', distance: '2 Mins', category: 'Highway', icon: '🛣️', note: 'Direct signal-free 6-lane access' },
    { name: 'International Airport Terminal', distance: '15 Mins', category: 'Transit', icon: '✈️', note: 'Quick transit via expressway' },
    { name: 'Multispeciality Hospital & Medical College', distance: '8 Mins', category: 'Healthcare', icon: '🏥', note: 'Emergency care & pharmacy' },
    { name: 'Leading International School & University', distance: '5 Mins', category: 'Education', icon: '🏫', note: 'World-class academic corridor' },
    { name: 'Metro Station & Central Junction', distance: '12 Mins', category: 'Transit', icon: '🚆', note: 'High frequency commuter lines' },
    { name: 'Special Economic Zone & Business Park', distance: '10 Mins', category: 'Business', icon: '🏢', note: 'Over 50,000 corporate workforce' }
  ];

  const computedNearby = (property.nearbyLocations && property.nearbyLocations.length > 0)
    ? property.nearbyLocations
    : fallbackNearby;

  const nearbyCategories = ['All', 'Highway', 'Transit', 'Healthcare', 'Education', 'Business'];
  const filteredNearby = selectedNearbyCategory === 'All'
    ? computedNearby
    : computedNearby.filter(item => (item.category || '').toLowerCase() === selectedNearbyCategory.toLowerCase());

  return (
    <div className="bg-[#F8F9F8] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Breadcrumbs & Share */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-charcoal-700 font-medium">
          <div className="flex items-center space-x-2">
            <Link to="/" className="hover:text-forest-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-forest-900 transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-forest-950 font-bold truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 text-charcoal-600 font-medium">
              <Eye className="w-3.5 h-3.5 text-gold-600" />
              <span>{property.views || 1} Views</span>
            </span>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: property.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="flex items-center space-x-1.5 bg-white px-3.5 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-forest-950 font-bold transition-colors shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-gold-600" />
              <span>Share Project</span>
            </button>
          </div>
        </div>

        {/* Header Title & Pricing Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-300">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {property.jdaApproved && (
                <span className="bg-forest-950 text-gold-300 font-bold text-xs px-3 py-1 rounded-md shadow flex items-center space-x-1 border border-gold-500/40">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>100% JDA APPROVED</span>
                </span>
              )}
              {property.reraApproved && property.reraNumber && (
                <span className="bg-white text-forest-950 font-bold text-xs px-3 py-1 rounded-md border border-stone-300 shadow-2xs">
                  RERA: {property.reraNumber}
                </span>
              )}
              <span className="bg-gold-500 text-forest-950 font-extrabold text-xs px-3 py-1 rounded-md shadow">
                {property.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-forest-950">
              {property.title}
            </h1>

            <div className="flex items-center space-x-2 text-sm text-forest-900 font-bold">
              <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0" />
              <span>{property.location.address || `${property.location.area}, Jaipur, Rajasthan`}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-300 shadow-luxury text-left lg:text-right min-w-[240px]">
            <span className="text-xs uppercase tracking-wider text-charcoal-600 block font-semibold">
              {property.showPrice !== false ? 'Starting Price' : 'Pricing Status'}
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold font-editorial text-gold-700">
              {property.showPrice !== false ? property.priceDisplay : 'Price on Request'}
            </div>
            <div className="text-xs text-charcoal-700 mt-1 font-semibold">
              {property.showPrice !== false && property.pricePerSqYd
                ? `Plot Rate: ₹${property.pricePerSqYd.toLocaleString('en-IN')} / ${property.sizeUnit}`
                : '100% Transparent Direct Developer Pricing'}
            </div>
            <button
              onClick={() => {
                document.getElementById('enquiry-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-3 w-full py-2.5 px-4 rounded-xl bg-forest-950 hover:bg-forest-900 text-gold-300 font-extrabold text-xs shadow border border-gold-500/40 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Book Free Site Visit Cab</span>
              <span>↓</span>
            </button>
          </div>
        </div>

        {/* Media Gallery / Main Showcase */}
        <div className="space-y-4">
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative h-[380px] sm:h-[500px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group bg-stone-900 border border-stone-300"
          >
            <img
              src={images[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
              <span className="bg-forest-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-bold border border-white/20">
                Photo {activeImageIndex + 1} of {images.length} • Click to Enlarge
              </span>
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-forest-950/80 hover:bg-forest-950 text-white flex items-center justify-center transition-colors border border-white/30"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-forest-950/80 hover:bg-forest-950 text-white flex items-center justify-center transition-colors border border-white/30"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImageIndex === idx ? 'border-gold-600 scale-105 shadow-md' : 'border-stone-300 opacity-80 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Details & Architecture Showcase */}
        <div className="space-y-10">

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-stone-300 shadow-luxury">
            <div className="p-3 bg-[#F8FAF8] rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-charcoal-600 uppercase block">Category</span>
              <span className="text-base font-extrabold text-forest-950 font-editorial">{property.category}</span>
            </div>
            <div className="p-3 bg-[#F8FAF8] rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-charcoal-600 uppercase block">Scheme Scale</span>
              <span className="text-base font-extrabold text-forest-950 font-editorial">{property.tagline || 'Township'}</span>
            </div>
            <div className="p-3 bg-[#F8FAF8] rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-charcoal-600 uppercase block">Bank Loan</span>
              <span className="text-base font-extrabold text-forest-950 font-editorial">Up to 80%</span>
            </div>
            <div className="p-3 bg-[#F8FAF8] rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-charcoal-600 uppercase block">Registry</span>
              <span className="text-base font-extrabold text-forest-950 font-editorial">Instant Patta</span>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold font-editorial text-forest-950 border-b border-stone-200 pb-3">
              Project Overview & Legal Profile
            </h3>
            <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-normal">
              {property.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-forest-800 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-forest-950">100% Clear Title & 90-A Sanctioned</h5>
                  <p className="text-xs text-charcoal-600">Free from all legal disputes and agricultural caveats.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-forest-800 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-forest-950">Spot Bank Registry</h5>
                  <p className="text-xs text-charcoal-600">Direct registration with pre-approved loans from SBI & HDFC.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 6-Point Project Highlights & Visual Architecture Showcase (Alternating Zigzag) */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-stone-200">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-gold-700 bg-gold-100 border border-gold-300 px-3 py-0.5 rounded-full inline-block mb-1">
                  On-Site Reality & Master Planning
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-forest-950">
                  Project Infrastructure & 6 Key Highlights
                </h3>
              </div>
              <p className="text-xs text-charcoal-600 max-w-sm sm:text-right">
                High-resolution photo milestones and architectural features curated for this prestigious township.
              </p>
            </div>

            <div className="space-y-6">
              {computedHighlights.map((hl, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl overflow-hidden border border-stone-300/80 shadow-luxury hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className={`grid grid-cols-1 md:grid-cols-12 items-stretch ${isEven ? '' : 'md:flex-row-reverse'}`}>
                      {/* Image Column */}
                      <div className={`md:col-span-6 relative overflow-hidden bg-stone-900 min-h-[260px] sm:min-h-[300px] ${isEven ? 'order-1' : 'order-1 md:order-2'}`}>
                        <img
                          src={formatImageUrl(hl.image)}
                          alt={hl.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-forest-950/90 text-gold-300 text-xs font-extrabold px-3 py-1 rounded-lg border border-gold-500/40 shadow backdrop-blur-md">
                            Feature 0{idx + 1}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="text-xs text-gold-200 font-medium tracking-wide">
                            {hl.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Description Column */}
                      <div className={`md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-gradient-to-br from-white to-[#F9FAF9] ${isEven ? 'order-2' : 'order-2 md:order-1'}`}>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-xs font-extrabold text-gold-700 uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                            <span>Architectural Standard</span>
                          </div>
                          <h4 className="text-xl sm:text-2xl font-bold font-editorial text-forest-950 leading-snug">
                            {hl.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-normal">
                            {hl.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2 text-forest-900 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-forest-800" />
                            <span>100% Development Verified</span>
                          </div>
                          <button
                            onClick={() => {
                              const formEl = document.getElementById('enquiry-column');
                              formEl?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-gold-800 hover:text-gold-950 font-extrabold flex items-center space-x-1"
                          >
                            <span>Enquire Plan</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Plot Sizes Available */}
          {property.plotSizes && property.plotSizes.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
              <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
                <Maximize className="w-5 h-5 text-gold-600" />
                <h3 className="text-xl font-bold font-editorial text-forest-950">
                  Available Plot Dimensions ({property.sizeUnit})
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {property.plotSizes.map((size, idx) => (
                  <div key={idx} className="p-3 bg-[#F8FAF8] rounded-xl border border-stone-300 text-center space-y-1">
                    <span className="text-lg font-bold font-editorial text-forest-950">{size}</span>
                    <span className="text-[11px] text-charcoal-600 block uppercase font-semibold">{property.sizeUnit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Township Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
              <h3 className="text-xl font-bold font-editorial text-forest-950 border-b border-stone-200 pb-3">
                Township Features & Modern Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-charcoal-800 bg-[#F8FAF8] p-3 rounded-xl border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bank Loan Calculator (High Contrast!) */}


          {/* Google Map Section */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-300 shadow-luxury space-y-4">
            <h3 className="text-xl font-bold font-editorial text-forest-950 border-b border-stone-200 pb-3">
              Location & Strategic Connectivity
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700">
              Situated in prime {property.location.area}, Jaipur. Excellent road network connecting to Jaipur Ring Road, International Airport, and major education & IT hubs.
            </p>
            <div className="aspect-[16/7] rounded-xl overflow-hidden border border-stone-300">
              <iframe
                title="Project Location Map"
                src={
                  property.location?.mapEmbedUrl && property.location.mapEmbedUrl.trim() !== ''
                    ? (property.location.mapEmbedUrl.includes('src="')
                      ? property.location.mapEmbedUrl.match(/src="([^"]+)"/)?.[1] || property.location.mapEmbedUrl
                      : property.location.mapEmbedUrl)
                    : `https://maps.google.com/maps?q=${encodeURIComponent((property.location?.address || property.location?.area || property.title) + ', ' + (property.location?.city || 'Jaipur') + ', Rajasthan')}&t=&z=14&ie=UTF8&iwloc=&output=embed`
                }
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Project Virtual Tour & 360 Site Walkthrough (Inspired by Riyasat reference) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0c1c15] via-[#10271d] to-[#07130e] text-white p-6 sm:p-8 rounded-3xl border-2 border-gold-500/50 shadow-2xl space-y-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 text-[11px] font-extrabold uppercase tracking-widest text-gold-400 bg-gold-950/80 border border-gold-500/40 px-3 py-1 rounded-full">
                  <Compass className="w-3.5 h-3.5 text-gold-400 animate-spin duration-3000" />
                  <span>Project Virtual Tour • 360° Perspective</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white">
                  Site Walkthrough & Drone Visuals
                </h3>
                <p className="text-xs text-stone-300 max-w-lg">
                  Experience the ground reality, master avenue alignments, boundary fencing, and lush green open spaces directly on your screen.
                </p>
              </div>

              <button
                onClick={() => setIsTourModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 via-gold-600 to-amber-600 text-forest-950 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold-500/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 shrink-0 border border-gold-300"
              >
                <Video className="w-4 h-4" />
                <span>Launch 360° Tour</span>
              </button>
            </div>

            {/* Interactive Virtual Tour Display Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 aspect-[16/9] sm:aspect-[21/9] bg-stone-900 group">
              {property.virtualTourUrl && (property.virtualTourUrl.includes('youtube.com') || property.virtualTourUrl.includes('embed')) ? (
                <iframe
                  title="Project Virtual Tour"
                  src={property.virtualTourUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={images[1] || images[0] || defaultArchImages[1]}
                    alt="Project 360 Virtual Tour"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div
                      onClick={() => setIsTourModalOpen(true)}
                      className="w-16 h-16 rounded-full bg-gold-500/90 text-forest-950 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform border-2 border-white"
                    >
                      <Compass className="w-8 h-8 animate-pulse text-forest-950" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold font-editorial text-white drop-shadow-md">
                      Explore 360° Master Township Panorama
                    </h4>
                    <p className="text-xs text-stone-200 max-w-md drop-shadow">
                      Simulated drone perspective of {property.title} showing 100% boundary demarcations and internal road infrastructure.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Strategic Connectivity & Nearby Landmarks Matrix (Directly below Map & Tour) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-300 shadow-luxury space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-forest-950 bg-forest-50 border border-forest-200 px-3 py-1 rounded-full mb-1">
                  <Navigation className="w-3.5 h-3.5 text-gold-600" />
                  <span>Site Location & Connectivity Advantages</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-forest-950">
                  Nearby Landmarks & Travel Times
                </h3>
              </div>
              <span className="text-xs text-charcoal-600 font-medium">
                Minutes calculated at standard road speeds
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {nearbyCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedNearbyCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${selectedNearbyCategory === cat
                    ? 'bg-forest-950 text-gold-300 shadow border border-gold-500/50'
                    : 'bg-stone-100 hover:bg-stone-200 text-charcoal-700 border border-stone-200'
                    }`}
                >
                  {cat === 'All' ? 'All Connectivity' : cat}
                </button>
              ))}
            </div>

            {/* Grid of Nearby Connectivity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredNearby.map((loc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F8FAF8] border border-stone-200 hover:border-gold-500 hover:bg-white transition-all space-y-2 group shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{loc.icon || '📍'}</span>
                    <span className="text-xs font-extrabold bg-gold-100 text-gold-900 border border-gold-300 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gold-700" />
                      <span>{loc.distance}</span>
                    </span>
                  </div>

                  <div>
                    <h5 className="text-sm font-bold text-forest-950 group-hover:text-gold-800 transition-colors">
                      {loc.name}
                    </h5>
                    <p className="text-[11px] text-charcoal-600 mt-0.5 font-medium">
                      {(loc as any).note || 'Key strategic landmark along growth corridor'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Related Properties (Similar Opportunities) */}
        {related.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-stone-300">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-800 block mb-1">
                  Similar Opportunities
                </span>
                <h3 className="text-2xl font-bold font-editorial text-forest-950">
                  Other Verified Schemes in {property.location.area}
                </h3>
              </div>
              <Link to="/properties" className="text-xs font-bold text-forest-900 hover:text-gold-700">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((relProp) => (
                <PropertyCard key={relProp._id} property={relProp} />
              ))}
            </div>
          </div>
        )}

        {/* Full-Width Luxury Enquiry & VIP Site Visit Booking Desk (Placed at Very Bottom below Similar Opportunities) */}
        <div
          id="enquiry-section"
          className="relative overflow-hidden bg-gradient-to-br from-[#081811] via-[#0d271c] to-[#040e0a] text-white rounded-3xl border-2 border-gold-500/50 shadow-2xl p-6 sm:p-10 lg:p-12 space-y-8"
        >
          {/* Target alias for existing links */}
          <div id="enquiry-column" className="sr-only" />

          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gold-500/20">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-[11px] font-extrabold uppercase tracking-widest text-gold-400 bg-gold-950/80 border border-gold-500/40 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Official Developer Desk • Direct Enquiry & Booking</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold font-editorial text-white">
                Book a Free VIP Site Visit & Request Official Price Dossier
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Experience <strong>{property.title}</strong> in person with complete peace of mind. We provide complimentary AC cab pickup & drop facility for you and your family across Jaipur, Ajmer, Kishangarh & surrounding corridors — featuring 0% brokerage, 100% verified legal title documentation, and spot bank registry support.
              </p>
            </div>

            {/* Direct Instant Contact Pills */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:+919251217568"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-forest-950 px-6 py-3.5 rounded-xl font-extrabold text-xs tracking-wider shadow-lg transition-all border border-gold-300"
              >
                <Phone className="w-4 h-4" />
                <span>Call: +91 92512 17568</span>
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=919251217568&text=Hello%20Jaipur%20Property%20Wala,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-3.5 rounded-xl font-bold text-xs tracking-wider shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

          {/* Instant Lead Form */}
          {leadSuccess ? (
            <div className="p-8 bg-[#0a1f16] border-2 border-gold-500/50 rounded-2xl text-center space-y-3 max-w-xl mx-auto">
              <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto" />
              <h4 className="text-xl font-bold text-gold-300 font-editorial">
                Enquiry Logged Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Thank you, <strong className="text-white">{leadName}</strong>. Our Senior Jaipur Property Wala Advisor will call your phone/WhatsApp within 15 minutes to share plot inventory & schedule your complimentary VIP AC cab site visit.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-6">
              {leadError && (
                <div className="text-xs text-red-300 bg-red-950/80 border border-red-500/50 p-3 rounded-xl">
                  {leadError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full p-3 bg-[#06120d] border border-gold-500/30 focus:border-gold-500 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+91 92512 17568"
                    className="w-full p-3 bg-[#06120d] border border-gold-500/30 focus:border-gold-500 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full p-3 bg-[#06120d] border border-gold-500/30 focus:border-gold-500 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-300 mb-1.5">
                  Message / Preferred Plot Size or Question
                </label>
                <textarea
                  rows={3}
                  value={leadMessage}
                  onChange={(e) => setLeadMessage(e.target.value)}
                  placeholder="I am interested in exploring plot availability and want to schedule a free site visit cab this weekend..."
                  className="w-full p-3 bg-[#06120d] border border-gold-500/30 focus:border-gold-500 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[11px] text-stone-400 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>100% Confidential. Zero spam. Handled directly by Jaipur Property Wala senior desk.</span>
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-600 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-forest-950 font-extrabold text-xs uppercase tracking-wider shadow-xl hover:shadow-gold-500/30 transition-all border border-gold-300 shrink-0"
                >
                  {submitting ? 'Submitting Enquiry...' : 'Request Free Site Visit Cab & Dossier →'}
                </button>
              </div>
            </form>
          )}

          {/* 3 Reassurance Value Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gold-500/20 text-xs">

            <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-gold-950/40 border border-gold-500/20">
              <span className="text-2xl">📜</span>
              <div>
                <div className="font-bold text-gold-300">100% Clear Title Sanction</div>
                <div className="text-[11px] text-stone-400">90-A legal approvals & instant spot registry</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-gold-950/40 border border-gold-500/20">
              <span className="text-2xl">🏦</span>
              <div>
                <div className="font-bold text-gold-300">Up to 80% Bank Loan Approved</div>
                <div className="text-[11px] text-stone-400">SBI, HDFC, ICICI instant sanction desk</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gold-400 p-2 z-10"
            aria-label="Close image lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="absolute left-6 text-white hover:text-gold-400 p-3 rounded-full bg-white/10 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={images[activeImageIndex]}
            alt={property.title}
            className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />

          <button
            onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="absolute right-6 text-white hover:text-gold-400 p-3 rounded-full bg-white/10 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
      {/* Virtual Tour 360 Modal */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-[#0d1e16] rounded-3xl border border-gold-500/50 shadow-2xl overflow-hidden p-6 space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-gold-500/20">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-gold-400 animate-spin duration-3000" />
                <h4 className="text-lg font-bold font-editorial text-gold-300">
                  {property.title} — 360° Site Tour
                </h4>
              </div>
              <button
                onClick={() => setIsTourModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-900 border border-gold-500/30">
              {property.virtualTourUrl && (property.virtualTourUrl.includes('youtube.com') || property.virtualTourUrl.includes('embed')) ? (
                <iframe
                  title="Virtual Tour Video"
                  src={property.virtualTourUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <span className="text-3xl">🏛️</span>
                    <h5 className="text-xl font-bold font-editorial text-white">
                      Live Drone Inspection on Free Site Visit
                    </h5>
                    <p className="text-xs text-stone-300 max-w-md">
                      Book a free AC cab site visit with our senior Jaipur Property Wala advisor to inspect every demarcated corner in person.
                    </p>
                    <a
                      href="tel:+919251217568"
                      className="px-6 py-2.5 rounded-xl bg-gold-500 text-forest-950 font-extrabold text-xs shadow hover:bg-gold-400"
                    >
                      Call +91 92512 17568 for Live Visit
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
