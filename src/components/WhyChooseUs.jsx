// src/components/WhyChooseUs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Users } from 'lucide-react';

const features = [
  { icon: Shield, title: 'Secure Deals', desc: '100% verified properties and secure transaction.' },
  { icon: Zap, title: 'Instant Search', desc: 'Find your dream home in seconds.' },
  { icon: Target, title: 'Best Price', desc: 'Guaranteed best market price for you.' },
  { icon: Users, title: 'Expert Agents', desc: 'Professional guidance at every step.' },
];

const WhyChooseUs = () => (
  <section className="max-w-6xl mx-auto px-4 py-20">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center tracking-tight">Why Choose Nexus?</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {features.map((f, i) => (
        <motion.div 
          key={i} 
          whileHover={{ y: -10 }}
          className="group relative bg-[#111827] p-8 rounded-3xl border border-white/5 hover:border-blue-500/50 
                     shadow-lg transition-all duration-500 text-center overflow-hidden"
        >
          {/* Subtle Glow Effect on Hover */}
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500/10 mb-6 group-hover:bg-blue-500/20 transition-colors">
              <f.icon className="text-blue-500" size={32} />
            </div>
            <h3 className="text-white font-bold text-xl mb-3">{f.title}</h3>
            <p className="text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;