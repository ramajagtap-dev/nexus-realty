// src/components/StatsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Properties', value: '500+' },
  { label: 'Agents', value: '120+' },
  { label: 'Satisfaction', value: '98%' },
  { label: 'Cities', value: '25+' },
];

const StatsSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 -mt-16 mb-12 relative z-20">
      <div className="bg-[#141C32]/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.05 }} // 🔥 Floating & Glow Effect
            transition={{ type: "spring", stiffness: 300 }}
            className="text-center group cursor-default"
          >
            {/* Glow effect on hover */}
            <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all">
              {stat.value}
            </h3>
            <p className="text-gray-300 text-[10px] uppercase tracking-[0.2em] mt-2 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;