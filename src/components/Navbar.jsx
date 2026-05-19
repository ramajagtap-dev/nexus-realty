import React, { useState } from "react";
import { Home, Bell, User, Menu, X } from "lucide-react";

const Navbar = ({ onListPropertyClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-4 flex justify-between items-center bg-[#050A1A]/80 backdrop-blur-xl border-b border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
        <Home className="text-blue-500" size={22} />
        <span className="text-white font-black tracking-widest text-lg">NEXUS REALTY</span>
      </div>

      {/* Hamburger Icon (Sirf Mobile ke liye) */}
      <div className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-gray-400 text-sm font-semibold">
        <span onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })} className="hover:text-white cursor-pointer">Buy</span>
        <span onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })} className="hover:text-white cursor-pointer">Rent</span>
        <span onClick={onListPropertyClick} className="text-blue-400 font-bold">List Property</span>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#050A1A]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top duration-300">
          <span className="text-gray-300 border-b border-white/5 pb-2" onClick={() => setIsOpen(false)}>Buy</span>
          <span className="text-gray-300 border-b border-white/5 pb-2" onClick={() => setIsOpen(false)}>Rent</span>
          <span className="text-blue-400 font-bold" onClick={() => { onListPropertyClick(); setIsOpen(false); }}>List Property</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;