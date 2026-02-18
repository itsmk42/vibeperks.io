'use client';

import { TerminalHeader } from '@/components/TerminalHeader';
import { ExternalLink, Check, AlertTriangle, Zap, Tag } from 'lucide-react';
import toolsData from '@/lib/ai-tools.json';

export default function VibeTools() {
  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white pb-20">
      <TerminalHeader />
      
      <main className="container mx-auto px-4 pt-24">
        {/* Hero Section */}
        <section className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-black">
            <span className="text-gray-500">ls</span> -la ./ai-tools
          </h1>
          <p className="text-gray-600 text-base mb-6 max-w-xl">
            A curated list of free-tier AI coding assistants. 
            <br />
            Compare limits, features, and capabilities to find your perfect pair programmer.
          </p>
        </section>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsData.map((tool, index) => (
            <div key={index} className="group relative border border-gray-200 bg-white hover:border-black transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md">
              
              {/* Card Header */}
              <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between group-hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-black">{tool.name}</span>
                </div>
                <div className="text-[10px] bg-black text-white px-2 py-0.5 rounded-sm uppercase tracking-wide">
                  {tool.price_model}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-grow flex flex-col gap-4">
                <p className="text-sm text-gray-600 leading-relaxed min-h-[40px]">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-black uppercase tracking-wider border-b border-gray-100 pb-1 mb-2">
                    <Zap className="w-3 h-3" /> Included Free
                  </div>
                  <ul className="space-y-1.5">
                    {tool.free_tier_features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                <div className="mt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-black uppercase tracking-wider border-b border-gray-100 pb-1 mb-2">
                    <AlertTriangle className="w-3 h-3" /> Limitations
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    {tool.limitations}
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                  {tool.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 border border-gray-100 rounded-sm">
                      <Tag className="w-2 h-2" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer / Action */}
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <a 
                  href={tool.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white hover:bg-black hover:text-white text-black border border-gray-300 py-2 px-4 text-xs font-bold transition-all duration-200 uppercase tracking-wider"
                >
                  <span>Get Tool</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-black hover:underline mb-4 inline-block">
            cd .. {/* Go back home */}
          </a>
          <p className="text-sm font-bold text-black mb-2">
            created by a vibe coder to vibe coders
          </p>
          <p className="text-xs text-gray-500 italic">
            "when everybody is super, nobody will be"
          </p>
        </footer>
      </main>
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-5" 
           style={{ 
             backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }}>
      </div>
    </div>
  );
}
