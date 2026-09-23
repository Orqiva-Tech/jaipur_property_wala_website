import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee, SlidersHorizontal } from 'lucide-react';
import { locationService } from '../services/api';
import { LocationItem } from '../types';

export const HeroSearch: React.FC = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('All');
  const [type, setType] = useState('All');
  const [budget, setBudget] = useState('All');
  const [status, setStatus] = useState('All');
  const [dynamicLocations, setDynamicLocations] = useState<LocationItem[]>([]);

  useEffect(() => {
    locationService.getAll()
      .then((res: any) => {
        if (res.data?.data) {
          setDynamicLocations(res.data.data);
        }
      })
      .catch((err: any) => console.error('Error fetching locations in hero search', err));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city !== 'All') {
      const isKnownCity = ['Jaipur', 'Ajmer', 'Kishangarh', 'Mumbai'].includes(city) ||
        dynamicLocations.some(l => l.name.toLowerCase() === city.toLowerCase());
      if (isKnownCity) {
        params.append('city', city);
      } else {
        params.append('location', city);
      }
    }
    if (type !== 'All') params.append('type', type);
    if (status !== 'All') params.append('status', status);

    if (budget === 'under25') {
      params.append('maxPrice', '2500000');
    } else if (budget === '25to50') {
      params.append('minPrice', '2500000');
      params.append('maxPrice', '5000000');
    } else if (budget === '50to100') {
      params.append('minPrice', '5000000');
      params.append('maxPrice', '10000000');
    } else if (budget === 'above100') {
      params.append('minPrice', '10000000');
    }

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-5 sm:p-7 border-2 border-gold-600/60">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-gold-600 animate-pulse" />
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-forest-950 font-sans">
            Direct JDA & RERA Approved Property Search
          </span>
        </div>
        <span className="text-xs font-bold text-forest-900 bg-forest-50 border border-forest-200 px-3 py-1 rounded-md">
          0% Brokerage • 100% Free Advisory
        </span>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-end">
        {/* Location / City */}
        <div>
          <label className="block text-xs font-bold text-forest-950 mb-1.5 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-gold-600" />
            <span>Select City / Hub</span>
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-[#F8FAF8] border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:border-forest-900 focus:outline-none"
          >
            <option value="All">All Cities & Locations</option>
            <optgroup label="🏙️ Available Cities">
              {dynamicLocations.length > 0 ? (
                dynamicLocations.map((loc) => (
                  <option key={loc._id} value={loc.name}>
                    {loc.name} {loc.tagline ? `(${loc.tagline})` : ''}
                  </option>
                ))
              ) : (
                <>
                  <option value="Jaipur">Jaipur (Pink City HQ)</option>
                  <option value="Ajmer">Ajmer (Smart City Corridor)</option>
                  <option value="Kishangarh">Kishangarh (Marble City)</option>
                  <option value="Mumbai">Mumbai (Financial Hub & Coastal)</option>
                </>
              )}
            </optgroup>
            <optgroup label="📍 Specific Zones">
              <option value="Jagatpura">Jaipur: Jagatpura / Mahal Rd</option>
              <option value="Mahindra SEZ">Jaipur: Mahindra SEZ / Ajmer Rd</option>
              <option value="Tonk Road">Jaipur: Tonk Road / Ring Rd</option>
              <option value="Pushkar Bypass">Ajmer: Pushkar Bypass / Panchsheel</option>
              <option value="Marble City">Kishangarh: Marble Expressway</option>
              <option value="Navi Mumbai">Mumbai: Navi Mumbai / Coastal</option>
            </optgroup>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-bold text-forest-950 mb-1.5 flex items-center space-x-1">
            <Home className="w-3.5 h-3.5 text-gold-600" />
            <span>Property Type</span>
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-[#F8FAF8] border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:border-forest-900 focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Plot">Residential Plot (Gaj / Sq.Yd)</option>
            <option value="Villa">Luxury Villa Plot</option>
            <option value="Commercial Plot">Commercial Plot / Shop</option>
            <option value="Apartment">Apartment</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xs font-bold text-forest-950 mb-1.5 flex items-center space-x-1">
            <IndianRupee className="w-3.5 h-3.5 text-gold-600" />
            <span>Budget Range</span>
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-[#F8FAF8] border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:border-forest-900 focus:outline-none"
          >
            <option value="All">Any Budget</option>
            <option value="under25">Under ₹25 Lakhs</option>
            <option value="25to50">₹25L - ₹50 Lakhs</option>
            <option value="50to100">₹50L - ₹1 Crore</option>
            <option value="above100">Above ₹1 Crore</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-bold text-forest-950 mb-1.5 flex items-center space-x-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold-600" />
            <span>Project Status</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#F8FAF8] border border-stone-300 rounded-lg px-3 py-2.5 text-sm text-forest-950 font-medium focus:ring-2 focus:ring-forest-900 focus:border-forest-900 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Ready to Move">Ready to Move / Registry</option>
            <option value="Ongoing">Under Development</option>
            <option value="Upcoming">Upcoming Schemes</option>
          </select>
        </div>

        {/* Search CTA */}
        <div>
          <button
            type="submit"
            className="w-full bg-forest-950 hover:bg-forest-900 text-gold-300 hover:text-white py-2.5 px-4 rounded-lg font-bold text-sm tracking-wide shadow-md transition-all duration-200 flex items-center justify-center space-x-2 border border-gold-500/50 h-[42px]"
          >
            <Search className="w-4 h-4 text-gold-400" />
            <span>Find Plots</span>
          </button>
        </div>
      </form>
    </div>
  );
};
