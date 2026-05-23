// ==========================
// PropertyCard.jsx
// ==========================

import { Trash2 } from "lucide-react";

const PropertyCard = ({ item, onCardClick, onDeleteClick }) => {
  return (
    <div
      className="bg-[#16213E] rounded-2xl overflow-hidden shadow-lg border border-gray-700 cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:border-blue-500 hover:shadow-blue-500/20 flex flex-col h-full"
      onClick={() => onCardClick(item)}
    >

      {/* Property Image */}
      <div className="w-full h-48 overflow-hidden relative">

        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-full object-cover"
        />

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(item.id);
          }}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all"
        >
          <Trash2 size={16} />
        </button>

      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">

        <h3 className="text-white font-bold text-lg truncate">
          {item.title || "No Title"}
        </h3>

        <p className="text-blue-400 text-sm mb-2 truncate">
          {item.address || "No Address"}
        </p>

        <p className="text-gray-300 text-sm mb-4 font-semibold">
          ₹ {item.price || "Price N/A"}
        </p>

        {/* Bottom */}
        <div className="flex items-center justify-between border-t border-gray-700 pt-3 mt-auto">

          <span className="text-xs text-gray-400">
            {item.city || "City N/A"}
          </span>

          <span className="text-blue-300 text-xs font-bold bg-blue-900/30 px-2 py-1 rounded-lg">
            {item.property_type || "Apartment"}
          </span>

        </div>
      </div>
    </div>
  );
};

export default PropertyCard;