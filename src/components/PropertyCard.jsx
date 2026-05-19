import React from "react";
import { CheckCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion"; // 👈 Import kiya

const PropertyCard = ({ item, onCardClick, onDeleteClick }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(`Are you sure you want to delete "${item.title}"?`);
    if (confirmDelete) onDeleteClick(item.id || item._id);
  };

  return (
    // 🔥 Framer Motion wrapper: Entry animation & Hover Zoom
    <motion.div 
      whileHover={{ scale: 1.03 }} // Hover pe thoda zoom
      initial={{ opacity: 0, y: 20 }} // Start condition
      animate={{ opacity: 1, y: 0 }} // Final condition
      transition={{ duration: 0.4 }} // Smooth timing
      onClick={() => onCardClick(item)} 
      className="bg-[#1A233A] rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-blue-500 cursor-pointer group relative"
    >
      <div className="relative h-48 w-full bg-gray-900">
        <img src={item.image_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500"} 
             alt={item.title} className="w-full h-full object-cover" />
        
        <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold">
          {item.property_type || "Penthouse"}
        </span>

        <button
          type="button"
          onClick={handleDelete}
          className="absolute top-3 right-3 bg-red-600/20 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white p-2 rounded-lg backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-white font-bold text-base truncate">{item.title}</h3>
        <p className="text-gray-400 text-xs mt-1">{item.address}, {item.city}</p>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Pricing</p>
            <p className="text-white font-extrabold text-lg">${Number(item.price).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] text-green-400 font-medium">
              <CheckCircle size={12} /> Agent Verified
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;