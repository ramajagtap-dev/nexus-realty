import React from 'react';
import * as Lucide from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050A1A] pt-20 pb-10 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Section */}
        <div className="md:col-span-2">
          <h2 className="text-white font-black text-2xl mb-4 tracking-wider">NEXUS REALTY</h2>
          <p className="text-gray-500 max-w-sm">
            Building the future of luxury real estate. Providing transparent, 
            secure, and expert-led property solutions across the country.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="text-gray-400 space-y-3">
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Properties</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Agents</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Services</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">About Us</li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-bold mb-6">Connect</h4>
          <div className="flex gap-4 text-gray-400">
            <div className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
              <Lucide.Facebook size={20} />
            </div>
            <div className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
              <Lucide.Instagram size={20} />
            </div>
            <div className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
              <Lucide.Linkedin size={20} />
            </div>
            <div className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
              <Lucide.Twitter size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto text-center border-t border-white/5 pt-8 text-gray-600 text-sm">
        © 2026 Nexus Realty. All rights reserved. Designed with precision.
      </div>
    </footer>
  );
};

export default Footer;