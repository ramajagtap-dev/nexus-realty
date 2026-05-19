import React from 'react';
import { Search } from 'lucide-react';

const FilterPanel = ({ 
  onSearch, listingType, setListingType,
  city, setCity, propertyType, setPropertyType, bhkSize, setBhkSize 
}) => {

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      city: city,
      property_type: propertyType,
      bhk_size: bhkSize
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-10">
      <div className="bg-[#141C32]/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-800">
        <form onSubmit={handleSearchSubmit}>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setListingType('Buy')}
              className={`px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                listingType === 'Buy'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                  : 'bg-[#1E293B] text-gray-400 border border-gray-700 hover:text-white'
              }`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => setListingType('Rent')}
              className={`px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                listingType === 'Rent'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
                  : 'bg-[#1E293B] text-gray-400 border border-gray-700 hover:text-white'
              }`}
            >
              Rent
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Search Location</label>
              <input
                type="text"
                placeholder="e.g., Manhattan, NY"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Luxury Apartment">Luxury Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Configuration</label>
              <select
                value={bhkSize}
                onChange={(e) => setBhkSize(e.target.value)}
                className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Search size={14} /> Search & Index
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterPanel;