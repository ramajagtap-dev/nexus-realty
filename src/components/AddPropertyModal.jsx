import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddPropertyModal = ({ onClose, onRefresh }) => {
  // Initial empty state define kiya taaki baar-baar reset karne me aasaani ho
  const initialFormState = {
    title: '',
    description: '',
    property_type: 'Luxury Apartment',
    listing_type: 'Buy',
    price: '',
    bhk_size: '2 BHK',
    square_ft: '',
    address: '',
    city: '',
    state: '',
    image_url: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("🚀 Frontend Sending Payload:", formData);

      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const json = await response.json();
      console.log("📥 Backend Received Response:", json);

      if (json.success) {
        alert("🎉 Property Successfully Added!");
        
        // 🔥 FEATURE 1 FIX: Form fields ko ekdum chaka-chak khali kar do agli baar ke liye
        setFormData(initialFormState); 
        
        onRefresh();
        onClose();
      } else {
        const errorMsg = json.message || json.error || (typeof json === 'object' ? JSON.stringify(json) : "Unknown Validation Error");
        alert("❌ Backend Rejected: " + errorMsg);
      }
    } catch (err) {
      console.error("🔥 Network/Server Fetch Error:", err);
      alert("System Crash: Request backend server logs.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#141C32] border border-gray-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden relative text-white max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#0B132B]">
          <h3 className="font-bold text-xs tracking-wider text-blue-400 uppercase">List New Premium Property</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Property Title */}
          <div>
            <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">Property Title *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g., Ultra Modern Eco-Villa" className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white" />
          </div>

          {/* Row 1: Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">Listing Type</label>
              <select name="listing_type" value={formData.listing_type} onChange={handleChange} className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white">
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">Property Type</label>
              <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white">
                <option value="Luxury Apartment">Luxury Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price & BHK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">Price (USD) *</label>
              <input type="number" name="price" required value={formData.price} onChange={handleChange} placeholder="e.g., 2500000" className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white" />
            </div>
            <div>
              <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">BHK Size</label>
              <select name="bhk_size" value={formData.bhk_size} onChange={handleChange} className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white">
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>
            </div>
          </div>

          {/* Row 3: Street Address */}
          <div>
            <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">Street Address *</label>
            <input type="text" name="address" required value={formData.address} onChange={handleChange} placeholder="e.g., 742 Evergreen Terrace" className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white" />
          </div>

          {/* Row 4: City & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">City *</label>
              <input type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="e.g., Manhattan" className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white" />
            </div>
            <div>
              <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">State *</label>
              <input type="text" name="state" required value={formData.state} onChange={handleChange} placeholder="e.g., NY" className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white" />
            </div>
          </div>

          {/* Row 5: Sq Ft */}
          <div>
            <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">Square Feet *</label>
            <input type="number" name="square_ft" required value={formData.square_ft} onChange={handleChange} placeholder="e.g., 1800" className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white" />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">Image URL</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://images.unsplash.com/..." className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">Description</label>
            <textarea name="description" rows="3" value={formData.description} onChange={handleChange} placeholder="Enter premium asset specifications..." className="w-full bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none text-white"></textarea>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-colors shadow-lg shadow-blue-600/20">
              Publish Asset to Network
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;