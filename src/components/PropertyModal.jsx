import React from 'react';
import { X, MapPin, Home, Maximize2, User, Phone, Mail } from 'lucide-react';

const PropertyModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#121A2E] border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 text-gray-400 hover:text-white p-2 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Property Image */}
        <div className="h-64 w-full bg-gray-900 relative">
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            For {item.listing_type || 'Sale'}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-black text-white tracking-wide">{item.title}</h2>
              <p className="text-gray-400 flex items-center gap-1 text-sm mt-1">
                <MapPin size={14} className="text-blue-500" /> {item.address}, {item.city}, {item.state}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Price</p>
              <p className="text-2xl font-black text-blue-400">${Number(item.price).toLocaleString()}</p>
            </div>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-4 my-6 p-4 bg-[#1A233A] rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 text-gray-300">
              <Home size={18} className="text-blue-400" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Type</p>
                <p className="text-sm font-bold">{item.property_type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Maximize2 size={18} className="text-blue-400" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Area</p>
                <p className="text-sm font-bold">{item.square_ft} Sq Ft</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Home size={18} className="text-blue-400" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Beds</p>
                <p className="text-sm font-bold">{item.bhk_size} BHK</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {item.description || "This premium luxury asset offers state-of-the-art architecture, world-class design structures, and top-tier security layouts for an elite lifestyle."}
            </p>
          </div>

          {/* Agent Section (Hardcoded fallback for Amit Sharma since we haven't populated join yet) */}
          <div className="pt-6 border-t border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-900 rounded-full flex items-center justify-center border border-blue-500">
                <User size={24} className="text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Amit Sharma</h4>
                <p className="text-xs text-gray-500">Premium Listing Agent</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="tel:+919876543210" className="bg-[#1A233A] p-2 rounded-lg text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700">
                <Phone size={16} />
              </a>
              <a href="mailto:amit@nexusrealty.com" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-bold text-xs flex items-center gap-1">
                <Mail size={14} /> Contact Agent
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyModal;