import React, { useEffect, useState } from 'react';
import { Camera, Video, X, ChevronLeft, ChevronRight, Play, MapPin, Layers } from 'lucide-react';
import { galleryService, locationService } from '../services/api';
import { GalleryItem, LocationItem } from '../types';

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [dynamicLocations, setDynamicLocations] = useState<LocationItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  useEffect(() => {
    locationService.getAll()
      .then((res: any) => {
        if (res.data?.data) {
          setDynamicLocations(res.data.data);
        }
      })
      .catch((err: any) => console.error('Error loading locations in GalleryPage', err));
  }, []);

  const locations = [
    { label: 'All Cities & Locations', value: 'All', icon: '📍' },
    ...(dynamicLocations.length > 0
      ? dynamicLocations.map(l => ({
          label: `${l.name} Schemes`,
          value: l.name,
          icon: l.icon || '🏙️'
        }))
      : [
          { label: 'Jaipur Schemes', value: 'Jaipur', icon: '🏰' },
          { label: 'Ajmer Corridor', value: 'Ajmer', icon: '🕌' },
          { label: 'Kishangarh Expressway', value: 'Kishangarh', icon: '🏛️' },
          { label: 'Mumbai Hub', value: 'Mumbai', icon: '🌊' }
        ])
  ];

  const categories = [
    'All',
    'Project Photos',
    'Construction Progress',
    'Completed Projects',
    'Property Site Visits',
    'Events',
    'Videos'
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const params: { category?: string; location?: string } = {};
        if (activeCategory !== 'All') params.category = activeCategory;
        if (selectedLocation !== 'All') params.location = selectedLocation;
        const res = await galleryService.getAll(params);
        setItems(res.data.data || []);
      } catch (error) {
        console.error('Error fetching gallery items', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [activeCategory, selectedLocation]);

  const activeItem = selectedItemIndex !== null ? items[selectedItemIndex] : null;

  return (
    <div className="bg-[#F8F9F8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full inline-block">
            Ground Reality & Progress Visuals
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-forest-950 leading-tight">
            Jaipur Property Wala Media Gallery
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-normal">
            Witness the development progress, township entrance arches, bitumen road works, and buyer site visits across {dynamicLocations.length > 0 ? dynamicLocations.map(l => l.name).join(', ') : 'Jaipur, Ajmer, Kishangarh, and Mumbai'}.
          </p>
        </div>

        {/* Location Dropdown & City Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-forest-950 text-gold-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-forest-950">Filter By City / Location</div>
              <div className="text-xs text-charcoal-600">Select which project location's media you want to inspect</div>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-wrap items-center gap-3">
            {/* Interactive Location Dropdown */}
            <div className="relative w-full sm:w-64">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full appearance-none bg-forest-50/80 border-2 border-forest-900/30 hover:border-forest-900 rounded-xl px-4 py-2.5 text-sm font-bold text-forest-950 focus:ring-2 focus:ring-forest-900 focus:outline-none cursor-pointer pr-10"
              >
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.icon} {loc.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-forest-950">
                ▼
              </div>
            </div>

            {/* Quick City Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(dynamicLocations.length > 0 ? dynamicLocations.map(l => l.name) : ['Jaipur', 'Ajmer', 'Kishangarh', 'Mumbai']).map((cityName) => (
                <button
                  key={cityName}
                  onClick={() => setSelectedLocation(selectedLocation === cityName ? 'All' : cityName)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedLocation === cityName
                      ? 'bg-forest-950 text-gold-300 shadow-sm border border-gold-500/50'
                      : 'bg-stone-100 hover:bg-stone-200 text-forest-900'
                  }`}
                >
                  {cityName}
                </button>
              ))}
              {selectedLocation !== 'All' && (
                <button
                  onClick={() => setSelectedLocation('All')}
                  className="text-xs text-red-600 hover:text-red-700 font-bold px-2 py-1 underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-forest-950 text-gold-300 shadow-md border border-gold-500/50'
                  : 'bg-white text-forest-950 hover:bg-stone-100 border border-stone-300 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="aspect-square bg-stone-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-300 p-8 space-y-3 max-w-md mx-auto shadow-luxury">
            <Layers className="w-10 h-10 text-charcoal-400 mx-auto" />
            <h3 className="text-xl font-bold font-editorial text-forest-950">No Media in this Category</h3>
            <p className="text-xs sm:text-sm text-charcoal-700">Please choose another category or check back soon as our field surveyors upload regular on-site construction updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item, idx) => {
              const mediaSrc = item.mediaUrl.startsWith('http') ? item.mediaUrl : item.mediaUrl;
              const isVideo = item.mediaType === 'video';

              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedItemIndex(idx)}
                  className="group relative rounded-2xl overflow-hidden shadow-luxury bg-white border border-stone-300 hover:border-gold-500/60 cursor-pointer aspect-[4/3] transition-all"
                >
                  {isVideo ? (
                    <div className="relative w-full h-full bg-black">
                      <video
                        src={mediaSrc}
                        className="w-full h-full object-cover opacity-85"
                        muted
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-gold-600/95 text-forest-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={mediaSrc}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-300 block">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold font-editorial line-clamp-1 text-white">
                      {item.title}
                    </h4>
                    {item.location && (
                      <div className="flex items-center space-x-1 text-xs text-gray-200 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-gold-400" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / Video Player Modal */}
      {selectedItemIndex !== null && activeItem && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedItemIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-gold-400 p-2 z-10"
            aria-label="Close media player"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={() => setSelectedItemIndex((prev) => (prev! === 0 ? items.length - 1 : prev! - 1))}
            className="absolute left-6 text-white hover:text-gold-400 p-3 rounded-full bg-white/10 z-10"
            aria-label="Previous media"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            {activeItem.mediaType === 'video' ? (
              <video
                src={activeItem.mediaUrl.startsWith('http') ? activeItem.mediaUrl : activeItem.mediaUrl}
                controls
                autoPlay
                className="max-h-[70vh] rounded-2xl shadow-2xl"
              />
            ) : (
              <img
                src={activeItem.mediaUrl.startsWith('http') ? activeItem.mediaUrl : activeItem.mediaUrl}
                alt={activeItem.title}
                className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            )}

            <div className="mt-4 text-center text-white space-y-1">
              <span className="text-xs uppercase tracking-widest text-gold-300 font-bold block">
                {activeItem.category} • {activeItem.location || 'Jaipur'}
              </span>
              <h3 className="text-xl font-bold font-editorial text-white">{activeItem.title}</h3>
              {activeItem.caption && (
                <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto">{activeItem.caption}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => setSelectedItemIndex((prev) => (prev! === items.length - 1 ? 0 : prev! + 1))}
            className="absolute right-6 text-white hover:text-gold-400 p-3 rounded-full bg-white/10 z-10"
            aria-label="Next media"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
};
