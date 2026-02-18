import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 border-b border-gray-200 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-black font-mono text-xl tracking-tighter">
          <Terminal className="w-6 h-6" />
          <span className="font-bold">
            {text}
            <span className="animate-pulse">_</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-xs font-mono text-gray-500">
          <a href="#" className="hover:text-black transition-colors">~/home</a>
          <a href="#" className="hover:text-black transition-colors">./perks</a>
          <a href="#" className="hover:text-black transition-colors">./submit</a>
          <a href="#" className="hover:text-black transition-colors">./about</a>
          <button className="bg-gray-100 hover:bg-black hover:text-white text-black border border-gray-200 px-4 py-1 rounded-none transition-all">
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
        <div className="md:hidden bg-white border-b border-gray-200 p-4 absolute w-full top-full left-0 flex flex-col gap-4 font-mono text-gray-500 text-xs">
          <a href="#" className="hover:text-black transition-colors block">~/home</a>
          <a href="#" className="hover:text-black transition-colors block">./perks</a>
          <a href="#" className="hover:text-black transition-colors block">./submit</a>
          <a href="#" className="hover:text-black transition-colors block">./about</a>
          <button className="w-full text-left bg-gray-100 hover:bg-black hover:text-white text-black border border-gray-200 px-4 py-2 rounded-none transition-all">
            Login
          </button>
        </div>
      )}
    </header>
  );
};
