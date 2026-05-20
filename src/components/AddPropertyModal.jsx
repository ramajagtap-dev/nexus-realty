import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddPropertyModal = ({ onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '', price: '', square_ft: '', city: '', address: '', 
    image_url: '', property_type: 'Luxury Apartment', listing_type: 'Buy'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "properties"), formData);
      alert("✅ Property added successfully!");
      onRefresh(); 
      onClose();   
    } catch (err) {
      console.error("Error adding property: ", err);
      alert("Failed to add property.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-[#121A2E] p-6 rounded-xl w-full max-w-md border border-gray-800">
        <h2 className="text-white text-xl font-bold mb-4">Add New Property</h2>
        
        <input type="text" placeholder="Title" className="w-full p-2 mb-2 rounded bg-gray-800 text-white" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
        <input type="text" placeholder="Price" className="w-full p-2 mb-2 rounded bg-gray-800 text-white" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        <input type="text" placeholder="Square Ft" className="w-full p-2 mb-2 rounded bg-gray-800 text-white" onChange={(e) => setFormData({...formData, square_ft: e.target.value})} />
        <input type="text" placeholder="City" className="w-full p-2 mb-2 rounded bg-gray-800 text-white" onChange={(e) => setFormData({...formData, city: e.target.value})} />
        
        {/* Yeh raha Property Type ka dropdown */}
        <select className="w-full p-2 mb-2 rounded bg-gray-800 text-white" onChange={(e) => setFormData({...formData, property_type: e.target.value})}>
          <option value="Luxury Apartment">Luxury Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Independent House">Independent House</option>
          <option value="Studio">Studio</option>
        </select>

        <input type="text" placeholder="Address" className="w-full p-2 mb-2 rounded bg-gray-800 text-white" onChange={(e) => setFormData({...formData, address: e.target.value})} />
        <input type="text" placeholder="Image URL" className="w-full p-2 mb-2 rounded bg-gray-800 text-white" onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
        
        <select className="w-full p-2 mb-4 rounded bg-gray-800 text-white" onChange={(e) => setFormData({...formData, listing_type: e.target.value})}>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">Save Property</button>
        <button type="button" onClick={onClose} className="w-full mt-2 text-gray-400">Cancel</button>
      </form>
    </div>
  );
};

export default AddPropertyModal;