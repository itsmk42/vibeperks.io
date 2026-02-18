import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 border-b border-gray-200 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-black font-mono text-xl tracking-tighter group hover:opacity-80 transition-opacity">
          <Logo className="w-8 h-8" />
          <span className="font-bold hidden sm:inline">
            {text}
            <span className="animate-pulse">_</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">~/home</Link>
          <Link href="/vibetools" className="hover:text-black transition-colors">./vibetools</Link>
          <Link href="#" className="hover:text-black transition-colors opacity-50 cursor-not-allowed">./submit</Link>
          <Link href="#" className="hover:text-black transition-colors opacity-50 cursor-not-allowed">./about</Link>
          <button className="bg-gray-100 hover:bg-black hover:text-white text-black border border-gray-200 px-4 py-1.5 rounded-none transition-all font-bold">
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
          <Link href="/" className="hover:text-black transition-colors block">~/home</Link>
          <Link href="/vibetools" className="hover:text-black transition-colors block">./vibetools</Link>
          <Link href="#" className="hover:text-black transition-colors block opacity-50 cursor-not-allowed">./submit</Link>
          <Link href="#" className="hover:text-black transition-colors block opacity-50 cursor-not-allowed">./about</Link>
          <button className="w-full text-left bg-gray-100 hover:bg-black hover:text-white text-black border border-gray-200 px-4 py-2 rounded-none transition-all font-bold">
            Login
          </button>
        </div>
      )}
    </header>
  );
};
