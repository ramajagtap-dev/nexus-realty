// src/components/CTASection.jsx
import React from 'react';

const CTASection = () => (
  <section className="relative my-16 mx-4 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] shadow-2xl">
    
    {/* Decorative Background Glow (The Luxury Touch) */}
    <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
    <div className="absolute bottom-[-50%] left-[-10%] w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>

    <div className="relative z-10 px-6 py-16 md:py-20 text-center">
      <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
        Ready to find your dream property?
      </h2>
      <p className="text-blue-100/80 mb-10 max-w-lg mx-auto text-lg font-medium">
        Join thousands of happy homeowners today. Experience luxury, transparency, and ease.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-white text-blue-700 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
          Get Started Now
        </button>
        <button className="bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
          Explore Listings
        </button>
      </div>
    </div>
  </section>
);

export default CTASection;