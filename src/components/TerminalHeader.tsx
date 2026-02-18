import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { PartnerLogos } from '@/components/PartnerLogos';
import Link from 'next/link';

export const TerminalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [text, setText] = useState('');
  const fullText = 'vibeperks.io';

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 border-b border-gray-200 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center h-16">
        {/* Left Side: Logo & Partners */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 text-black font-mono text-xl tracking-tighter group hover:opacity-80 transition-opacity min-w-[180px]">
            <Terminal className="w-6 h-6" />
            <span className="font-bold">
              {text}
              <span className="animate-pulse">_</span>
            </span>
          </Link>
          
          <div className="hidden lg:block border-l border-gray-200 pl-8 h-8 flex items-center">
            <PartnerLogos show={true} />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">~/home</Link>
          <Link href="/vibetools" className="hover:text-black transition-colors">./vibetools</Link>
          <Link href="#" className="hover:text-black transition-colors opacity-50 cursor-not-allowed">./submit</Link>
          <Link href="#" className="hover:text-black transition-colors opacity-50 cursor-not-allowed">./about</Link>
          <button className="bg-black text-white hover:bg-gray-800 border border-black px-5 py-2 text-xs font-bold transition-all uppercase tracking-wide">
            Login
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4 absolute w-full top-full left-0 flex flex-col gap-4 font-mono text-gray-500 text-xs shadow-lg">
          <Link href="/" className="hover:text-black transition-colors block py-2 border-b border-gray-50">~/home</Link>
          <Link href="/vibetools" className="hover:text-black transition-colors block py-2 border-b border-gray-50">./vibetools</Link>
          <div className="py-4 flex justify-center border-b border-gray-50 bg-gray-50 rounded-sm mb-2">
            <PartnerLogos show={true} />
          </div>
          <button className="w-full text-center bg-black text-white hover:bg-gray-800 border border-black px-4 py-3 rounded-none transition-all font-bold uppercase tracking-wide mt-2">
            Login
          </button>
        </div>
      )}
    </header>
  );
};
