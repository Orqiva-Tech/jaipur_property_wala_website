import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Landmark, Maximize, ArrowRight, PhoneCall } from 'lucide-react';
import { Property } from '../types';
import { formatImageUrl } from '../services/api';

interface PropertyCardProps {
  property: Property;
  onEnquire?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEnquire }) => {
  const defaultImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
  const rawImg = property.images && property.images.length > 0 ? property.images[0] : defaultImg;
  const imgUrl = formatImageUrl(rawImg);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-luxury hover:shadow-luxury-hover hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between">
      {/* Media Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={imgUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-black/25 to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {property.jdaApproved && (
            <span className="bg-forest-950/95 backdrop-blur-md text-gold-300 text-[11px] font-bold px-2.5 py-1 rounded-md shadow flex items-center space-x-1 border border-gold-500/40">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>JDA APPROVED</span>
            </span>
          )}
          {property.bankLoanAvailable && (
            <span className="bg-white/95 backdrop-blur-md text-forest-950 text-[11px] font-bold px-2 py-1 rounded-md shadow flex items-center space-x-1 border border-stone-200">
              <Landmark className="w-3.5 h-3.5 text-forest-800" />
              <span>80% LOAN</span>
            </span>
          )}
        </div>

        {/* Status Tag */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-gold-500 text-forest-950 font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
            {property.status}
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white z-10">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-200 block font-medium">
              {property.showPrice !== false ? 'Starting From' : 'Pricing'}
            </span>
            <span className="text-xl sm:text-2xl font-extrabold font-editorial text-gold-300 drop-shadow-sm">
              {property.showPrice !== false ? property.priceDisplay : 'Price on Request'}
            </span>
          </div>
          <span className="text-xs bg-forest-900/90 px-2.5 py-1 rounded-md text-gray-100 font-semibold border border-white/20">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center space-x-1.5 text-xs text-forest-900 font-bold mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
            <span className="truncate">{property.location.area}, {property.location.city || 'Jaipur'}</span>
          </div>

          <Link to={`/properties/${property.slug}`}>
            <h3 className="text-lg font-bold text-forest-950 group-hover:text-gold-700 transition-colors line-clamp-1 mb-2 font-editorial">
              {property.title}
            </h3>
          </Link>

          <p className="text-xs text-charcoal-700 line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          {/* Plot Sizes Available */}
          {property.plotSizes && property.plotSizes.length > 0 && (
            <div className="bg-[#F4F6F4] p-2.5 rounded-xl border border-stone-200 mt-3">
              <div className="flex items-center space-x-1.5 text-[11px] text-forest-950 font-bold mb-1">
                <Maximize className="w-3 h-3 text-gold-600" />
                <span>Plot Sizes Available ({property.sizeUnit}):</span>
              </div>
              <div className="flex flex-wrap gap-1 text-[11px] text-charcoal-800 font-semibold">
                {property.plotSizes.slice(0, 4).map((size, idx) => (
                  <span key={idx} className="bg-white px-2 py-0.5 rounded border border-stone-300 shadow-2xs">
                    {size}
                  </span>
                ))}
                {property.plotSizes.length > 4 && (
                  <span className="text-forest-900 font-bold self-center px-1">
                    +{property.plotSizes.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-2">
          <Link
            to={`/properties/${property.slug}`}
            className="w-full text-center py-2.5 px-3 rounded-lg border-2 border-forest-900 text-forest-950 hover:bg-forest-900 hover:text-white text-xs font-bold tracking-wide transition-all flex items-center justify-center space-x-1.5"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => onEnquire && onEnquire(property)}
            className="w-full py-2.5 px-3 rounded-lg bg-gold-600 hover:bg-gold-500 text-forest-950 text-xs font-extrabold tracking-wide shadow transition-all flex items-center justify-center space-x-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
