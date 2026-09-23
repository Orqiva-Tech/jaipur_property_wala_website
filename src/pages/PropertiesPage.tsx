import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, MapPin, ShieldCheck, RefreshCw, Building2 } from 'lucide-react';
import { propertyService, locationService } from '../services/api';
import { Property, LocationItem } from '../types';
import { PropertyCard } from '../components/PropertyCard';

interface PropertiesPageProps {
  onOpenEnquiry: (property?: Property) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ onOpenEnquiry }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filter states initialized from URL query params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [city, setCity] = useState(searchParams.get('city') || 'All');
  const [location, setLocation] = useState(searchParams.get('location') || 'All');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [type, setType] = useState(searchParams.get('type') || 'All');
  const [status, setStatus] = useState(searchParams.get('status') || 'All');
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');
  const [jdaOnly, setJdaOnly] = useState(searchParams.get('jdaApproved') === 'true');

  const citySubLocations: Record<string, string[]> = {
    'Jaipur': ['All Jaipur', 'Jagatpura', 'Mahindra SEZ', 'Tonk Road', 'Ajmer Road', 'Sirsi Road'],
    'Ajmer': ['All Ajmer', 'Pushkar Bypass Road', 'Panchsheel Nagar'],
    'Kishangarh': ['All Kishangarh', 'NH-8 Marble Hub', 'Silora RIICO Zone'],
    'Mumbai': ['All Mumbai', 'Palghar-Boisar Coastal Belt', 'Panvel Growth Corridor']
  };

  // Sync state if URL query params change (e.g. from navbar click)
  useEffect(() => {
    const urlCity = searchParams.get('city') || 'All';
    const urlLoc = searchParams.get('location') || 'All';
    const urlSearch = searchParams.get('search') || '';
    setCity(urlCity);
    setLocation(urlLoc);
    setSearch(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    locationService.getAll()
      .then((res: any) => {
        if (res.data?.data) {
          setLocations(res.data.data);
        }
      })
      .catch((err: any) => console.error('Error fetching locations in PropertiesPage', err));
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params: Record<string, any> = {
          sort
        };
        if (search) params.search = search;
        if (city && city !== 'All') params.city = city;
        if (location && location !== 'All' && !location.startsWith('All ')) params.location = location;
        if (category !== 'All') params.category = category;
        if (type !== 'All') params.type = type;
        if (status !== 'All') params.status = status;
        if (jdaOnly) params.jdaApproved = 'true';

        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;

        const res = await propertyService.getAll(params);
        setProperties(res.data.data || []);
        setTotal(res.data.total || 0);
      } catch (error) {
        console.error('Error fetching properties', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [search, city, location, category, type, status, sort, jdaOnly, searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (search) newParams.set('search', search);
    else newParams.delete('search');
    setSearchParams(newParams);
  };

  const handleCityChange = (newCity: string) => {
    const targetCity = newCity === 'All Cities' ? 'All' : newCity;
    setCity(targetCity);
    setLocation('All');

    const newParams = new URLSearchParams(searchParams);
    if (targetCity !== 'All') {
      newParams.set('city', targetCity);
    } else {
      newParams.delete('city');
    }
    newParams.delete('location');
    setSearchParams(newParams);
  };

  const handleLocationChange = (newLoc: string) => {
    const targetLoc = newLoc.startsWith('All ') ? 'All' : newLoc;
    setLocation(targetLoc);

    const newParams = new URLSearchParams(searchParams);
    if (targetLoc !== 'All') {
      newParams.set('location', targetLoc);
    } else {
      newParams.delete('location');
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearch('');
    setCity('All');
    setLocation('All');
    setCategory('All');
    setType('All');
    setStatus('All');
    setSort('featured');
    setJdaOnly(false);
    setSearchParams({});
  };

  return (
    <div className="bg-[#F8F9F8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 border border-gold-300 px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>Multi-City Portfolio • {locations.length > 0 ? locations.map(l => l.name).join(' • ') : 'Jaipur • Ajmer • Kishangarh • Mumbai'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-editorial text-forest-900 leading-tight">
            Verified Residential & Commercial Plots
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-normal">
            Explore 100% legal, clear-title plotted townships across prime growth hubs in Jaipur (Jagatpura, SEZ, Tonk Rd), Ajmer (Pushkar Bypass), Kishangarh (Marble Hub), and Mumbai MMR with spot registry and 80% bank loans.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl shadow-luxury border border-stone-200 p-6 space-y-5">
          
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by project name, colony, landmark, or plot size..."
                className="w-full pl-11 pr-4 py-2.5 bg-[#F8FAF8] border border-stone-300 rounded-xl text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-forest-950 hover:bg-forest-900 text-gold-300 font-bold px-7 py-2.5 rounded-xl text-sm tracking-wide shadow border border-gold-500/40"
            >
              Search
            </button>
          </form>

          {/* Primary Filter: City Tabs */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-950 whitespace-nowrap mr-2 flex items-center space-x-1">
                <Building2 className="w-3.5 h-3.5 text-gold-600" />
                <span>Select City:</span>
              </span>
              {['All Cities', ...(locations.length > 0 ? locations.map(l => l.name) : ['Jaipur', 'Ajmer', 'Kishangarh', 'Mumbai'])].map((c) => {
                const isSelected = (c === 'All Cities' && (city === 'All' || !city)) || city === c;
                return (
                  <button
                    key={c}
                    onClick={() => handleCityChange(c)}
                    className={`text-xs px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                      isSelected
                        ? 'bg-forest-950 text-gold-300 border border-gold-500/50 shadow-md'
                        : 'bg-stone-100 text-charcoal-800 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    <span>{c}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-Location Pills (Shows when a specific city is selected) */}
            {city !== 'All' && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 pl-2 border-l-2 border-gold-500 scrollbar-none animate-in fade-in">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-600 whitespace-nowrap mr-1 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gold-600" />
                  <span>{city} Sectors:</span>
                </span>
                {(citySubLocations[city] || [`All ${city}`, 'Prime Township', 'Growth Corridor']).map((loc) => {
                  const isLocSelected = (loc.startsWith('All') && (location === 'All' || !location)) || location === loc;
                  return (
                    <button
                      key={loc}
                      onClick={() => handleLocationChange(loc.startsWith('All') ? 'All' : loc)}
                      className={`text-xs px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                        isLocSelected
                          ? 'bg-gold-500 text-forest-950 font-bold shadow-sm'
                          : 'bg-white text-charcoal-700 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {loc}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Secondary Dropdown Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5 pt-4 border-t border-stone-200 items-center">
            {/* Category */}
            <div>
              <label className="block text-[11px] font-bold text-forest-950 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F8FAF8] border border-stone-300 rounded-lg text-xs p-2 text-forest-950 font-medium focus:ring-1 focus:ring-forest-900"
              >
                <option value="All">All Categories</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-[11px] font-bold text-forest-950 mb-1">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#F8FAF8] border border-stone-300 rounded-lg text-xs p-2 text-forest-950 font-medium focus:ring-1 focus:ring-forest-900"
              >
                <option value="All">All Types</option>
                <option value="Plot">Plot (Gaj / Sq.Yd)</option>
                <option value="Villa">Villa Plot</option>
                <option value="Commercial Plot">Commercial Plot</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[11px] font-bold text-forest-950 mb-1">Project Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#F8FAF8] border border-stone-300 rounded-lg text-xs p-2 text-forest-950 font-medium focus:ring-1 focus:ring-forest-900"
              >
                <option value="All">All Statuses</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-[11px] font-bold text-forest-950 mb-1">Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-[#F8FAF8] border border-stone-300 rounded-lg text-xs p-2 text-forest-950 font-medium focus:ring-1 focus:ring-forest-900"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* JDA / Govt Checkbox */}
            <div className="flex items-center space-x-2 pt-3">
              <input
                type="checkbox"
                id="jdaCheck"
                checked={jdaOnly}
                onChange={(e) => setJdaOnly(e.target.checked)}
                className="rounded text-forest-900 focus:ring-forest-900 h-4 w-4 border-stone-400"
              />
              <label htmlFor="jdaCheck" className="text-xs font-bold text-forest-950 cursor-pointer">
                Govt Approved Only
              </label>
            </div>

            {/* Reset */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full text-xs font-bold text-charcoal-700 hover:text-forest-950 flex items-center justify-center space-x-1 py-2 rounded-lg border border-stone-300 hover:bg-stone-100 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-forest-950">
            Showing <span className="text-gold-700 font-extrabold">{properties.length}</span> of {total} Verified Properties {city !== 'All' ? `in ${city}` : 'across all locations'}
          </p>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-stone-200 shadow-luxury" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-4 max-w-lg mx-auto shadow-luxury">
            <h3 className="text-2xl font-bold font-editorial text-forest-900">
              No matching properties found {city !== 'All' ? `in ${city}` : ''}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              We currently don't have a listing matching all of your exact filters. Contact our property desk for offline inventory, forthcoming schemes in {city !== 'All' ? city : 'Jaipur, Ajmer, Kishangarh & Mumbai'}, or customized requirements.
            </p>
            <div className="pt-2 flex justify-center space-x-3">
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-charcoal-800 border border-stone-300"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => onOpenEnquiry()}
                className="px-5 py-2.5 rounded-xl bg-forest-950 hover:bg-forest-900 text-gold-300 text-xs font-bold shadow border border-gold-500/40"
              >
                Submit Custom Requirement
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onEnquire={(p) => onOpenEnquiry(p)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
