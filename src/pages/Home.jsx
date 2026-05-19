import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterPanel from '../components/FilterPanel';
import PropertyCard from '../components/PropertyCard';
import PropertyModal from '../components/PropertyModal';
import AddPropertyModal from '../components/AddPropertyModal';
import StatsSection from '../components/StatsSection';
// 👈 Naye components imports
import WhyChooseUs from '../components/WhyChooseUs';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [globalListingType, setGlobalListingType] = useState('Buy'); 

  const [currentCity, setCurrentCity] = useState('');
  const [currentPropType, setCurrentPropType] = useState('Luxury Apartment');
  const [currentBhk, setCurrentBhk] = useState('2 BHK');

  const handleDeleteProperty = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE',
      });
      const json = await response.json();
      
      if (json.success) {
        alert("🗑️ Property successfully deleted!");
        fetchFilteredData(); 
      } else {
        alert("❌ Delete failed: " + json.message);
      }
    } catch (err) {
      console.error("🔥 Delete request error:", err);
      alert("Network Error!");
    }
  };

  const fetchFilteredData = async (filterPayload = null) => {
    try {
      let finalPayload = { listing_type: globalListingType };
      if (filterPayload) {
        finalPayload = { ...finalPayload, ...filterPayload };
      }

      const queryParams = new URLSearchParams(finalPayload).toString();
      const url = `http://localhost:5000/api/properties/search?${queryParams}`;

      const response = await fetch(url);
      const json = await response.json();
      
      if (json.success && json.data) {
        setProperties(json.data);
      }
    } catch (err) {
      console.error("API tracking failed:", err);
    }
  };

  useEffect(() => {
    setCurrentCity('');
    setCurrentPropType('Luxury Apartment');
    setCurrentBhk('2 BHK');
    fetchFilteredData(); 
  }, [globalListingType]);

  return (
    <>
      <div className="min-h-screen bg-[#0B132B]">
        <Navbar 
          onListPropertyClick={() => setIsAddModalOpen(true)} 
          onCategorySelect={(type) => setGlobalListingType(type)} 
        />
        
        {/* 🎬 Hero Section */}
        <div 
          className="relative h-[320px] bg-cover bg-center flex items-center justify-center border-b border-gray-900" 
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), #0B132B), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200')` 
          }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-wide drop-shadow-md text-white">
            Integrated Search Panel
          </h1>
        </div>

        <FilterPanel 
          onSearch={fetchFilteredData} 
          listingType={globalListingType} 
          setListingType={setGlobalListingType}
          city={currentCity} setCity={setCurrentCity}
          propertyType={currentPropType} setPropertyType={setCurrentPropType}
          bhkSize={currentBhk} setBhkSize={setCurrentBhk}
        />

        <StatsSection />

        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6">
            Featured {globalListingType} Listings
          </h2>
          
          {properties.length === 0 ? (
            <p className="text-gray-500 text-sm">No properties matching current database indices...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {properties.map((item) => (
                <PropertyCard 
                  key={item.property_id} 
                  item={item} 
                  onCardClick={(prop) => setSelectedProperty(prop)} 
                  onDeleteClick={handleDeleteProperty} 
                />
              ))}
            </div>
          )}
        </div>

        {/* 👇 Naye Sections Integration */}
        <WhyChooseUs />
        <CTASection />
        <Footer />
      </div>

      {selectedProperty && (
        <PropertyModal item={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}

      {isAddModalOpen && (
        <AddPropertyModal onClose={() => setIsAddModalOpen(false)} onRefresh={() => fetchFilteredData()} />
      )}
    </>
  );
};

export default Home;