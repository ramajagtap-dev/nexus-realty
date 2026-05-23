import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPropertyModal = ({ onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    square_ft: '',
    city: '',
    address: '',
    image_url: '',
    property_type: 'Luxury Apartment',
    listing_type: 'Buy'
  });

  const handleManualSubmit = async () => {
    try {
      // Validation
      if (
        !formData.title ||
        !formData.price ||
        !formData.city ||
        !formData.address ||
        !formData.image_url
      ) {
        toast.error('Please fill all required fields');
        return;
      }

      setLoading(true);

      // Firestore data
      const dataToSave = {
        title: formData.title,
        price: Number(formData.price),
        square_ft: formData.square_ft,
        city: formData.city,
        address: formData.address,
        image_url: formData.image_url,
        property_type: formData.property_type,
        listing_type: formData.listing_type,
        created_at: new Date()
      };

      console.log('Saving to Firestore:', dataToSave);

      await addDoc(collection(db, 'properties'), dataToSave);

      toast.success('✅ Property added successfully!');

      setTimeout(() => {
        onRefresh();
        onClose();
      }, 1500);

    } catch (err) {
      console.error('FIREBASE ERROR:', err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#121A2E] p-6 rounded-2xl w-full max-w-md border border-gray-800 shadow-2xl max-h-[90vh] overflow-y-auto"
        >

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white text-2xl font-bold">
              Add New Property
            </h2>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* Property Title */}
          <input
            type="text"
            placeholder="Property Title"
            value={formData.title}
            className="w-full p-3 mb-3 rounded-lg bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value
              })
            }
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            className="w-full p-3 mb-3 rounded-lg bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value
              })
            }
          />

          {/* Square Feet */}
          <input
            type="text"
            placeholder="Square Feet"
            value={formData.square_ft}
            className="w-full p-3 mb-3 rounded-lg bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                square_ft: e.target.value
              })
            }
          />

          {/* City */}
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            className="w-full p-3 mb-3 rounded-lg bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value
              })
            }
          />

          {/* Property Type */}
          <select
            value={formData.property_type}
            className="w-full p-3 mb-3 rounded-lg bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                property_type: e.target.value
              })
            }
          >
            <option value="Luxury Apartment">
              Luxury Apartment
            </option>

            <option value="Villa">
              Villa
            </option>

            <option value="Penthouse">
              Penthouse
            </option>

            <option value="Commercial">
              Commercial
            </option>

            <option value="Studio Apartment">
              Studio Apartment
            </option>
          </select>

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            className="w-full p-3 mb-3 rounded-lg bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value
              })
            }
          />

          {/* Image URL */}
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image_url}
            className="w-full p-3 mb-3 rounded-lg bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                image_url: e.target.value
              })
            }
          />

          {/* Image Preview */}
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="Preview"
              className="w-full h-28 object-cover rounded-xl mb-4 border border-gray-700"
            />
          )}

          {/* Listing Type */}
          <select
            value={formData.listing_type}
            className="w-full p-3 mb-5 rounded-lg bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                listing_type: e.target.value
              })
            }
          >
            <option value="Buy">
              Buy
            </option>

            <option value="Rent">
              Rent
            </option>
          </select>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleManualSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50"
          >
            {loading ? 'Saving Property...' : 'Save Property'}
          </button>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full mt-3 text-gray-400 hover:text-white transition-all"
          >
            Cancel
          </button>

        </motion.div>
      </div>
    </>
  );
};

export default AddPropertyModal;