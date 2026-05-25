import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore'; 

import Navbar from '../components/Navbar';
import FilterPanel from '../components/FilterPanel';
import PropertyCard from '../components/PropertyCard';
import PropertyModal from '../components/PropertyModal';
import AddPropertyModal from '../components/AddPropertyModal';
import StatsSection from '../components/StatsSection';
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
      await deleteDoc(doc(db, "properties", id));
      alert("🗑️ Property deleted successfully!");
      fetchFilteredData(); 
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete property.");
    }
  };

  const fetchFilteredData = async () => {
    try {
      console.log("Fetching data for type:", globalListingType);
      const propertiesRef = collection(db, "properties");
      
      // Query 1: Filtered query
     const querySnapshot = await getDocs(propertiesRef);
      
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Debugging: Agar data khali hai, toh check karein ki kya database mein kuch aur hai
      if (data.length === 0) {
        console.warn("No data found for filter. Fetching EVERYTHING to debug...");
        const allDocs = await getDocs(propertiesRef);
        console.log("Fetched Properties (Debug):", allDocs.docs.map(d => ({id: d.id, ...d.data()})));
      }

      setProperties(data);
      console.log("Data fetched successfully:", data);
      
    } catch (err) {
      console.error("Firebase fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFilteredData(); 
  }, [globalListingType]);

  return (
    <div className="min-h-screen bg-[#0B132B]">
      <Navbar 
        onListPropertyClick={() => setIsAddModalOpen(true)} 
        onCategorySelect={(type) => setGlobalListingType(type)} 
      />
      
      <div className="relative h-[320px] bg-cover bg-center flex items-center justify-center border-b border-gray-900" 
           style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), #0B132B), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200')` }}>
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-white">
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
          <p className="text-gray-500 text-sm">No properties found. Check Console (F12) for Debug info.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {properties.map((item) => (
              <PropertyCard 
                key={item.id} 
                item={item} 
                onCardClick={(prop) => setSelectedProperty(prop)} 
                onDeleteClick={handleDeleteProperty} 
              />
            ))}
          </div>
        )}
      </div>

      <WhyChooseUs />
      <CTASection />
      <Footer />

      {selectedProperty && (
        <PropertyModal item={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}

      {isAddModalOpen && (
        <AddPropertyModal onClose={() => setIsAddModalOpen(false)} onRefresh={fetchFilteredData} />
      )}
    </div>
  );
};

export default Home;
