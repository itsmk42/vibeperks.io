'use client';

import { useState, useEffect } from 'react';
import { TerminalHeader } from '@/components/TerminalHeader';
import { PerkCard } from '@/components/PerkCard';
import { Perk } from '@/lib/types';
import { Search, Filter, Cpu, Wifi } from 'lucide-react';

export default function Home() {
  const [perks, setPerks] = useState<Perk[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [statusLog, setStatusLog] = useState<string[]>([]);

  const [lastUpdate, setLastUpdate] = useState('Checking...');

  // Fetch perks
  useEffect(() => {
    async function fetchPerks() {
      try {
        const res = await fetch('/api/perks');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPerks(data);
        
        if (data.length > 0) {
            // Find most recent timestamp
            const times = data.map((p: Perk) => p.scraped_timestamp).filter(Boolean).sort().reverse();
            if (times.length > 0) {
                const diff = new Date().getTime() - new Date(times[0]).getTime();
                const hours = Math.floor(diff / (1000 * 60 * 60));
                if (hours < 1) setLastUpdate('< 1h');
                else setLastUpdate(`${hours}h`);
            } else {
                setLastUpdate('Unknown');
            }
        }
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchPerks();
  }, []);

  // Simulated live feed effect
  useEffect(() => {
    const logs = [
      'Connecting to server...',
      'Authenticating user...',
      'Fetching perk data...',
      'Scanning for new offers...',
      '200 OK - Data received.',
      'Rendering interface...',
    ];
    
    let delay = 0;
    logs.forEach((log, index) => {
      delay += Math.random() * 500 + 200;
      setTimeout(() => {
        setStatusLog(prev => [...prev.slice(-4), `> ${log}`]);
      }, delay);
    });
  }, []);

  const filteredPerks = perks.filter(perk => {
    const matchesSearch = 
      perk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perk.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perk.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'All' || perk.type.includes(selectedFilter) || perk.tags.includes(selectedFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white pb-20">
      <TerminalHeader />
      
      <main className="container mx-auto px-4 pt-24">
        {/* Hero / Status Section */}
        <section className="mb-12 border-b border-gray-200 pb-8">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-black">
                <span className="text-gray-500">sudo</span> get-perks
              </h1>
              <p className="text-gray-600 text-base mb-6 max-w-xl">
                The centralized marketplace for solo developers to discover free credits, tools, and benefits.
                <br />
                <span className="text-[10px] text-gray-400 mt-2 block">v1.0.0-alpha // build_20240520</span>
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 border border-black transition-all shadow-md hover:shadow-lg text-sm">
                  ./start_claiming.sh
                </button>
                <button className="bg-transparent hover:bg-gray-100 text-black font-bold py-3 px-6 border border-gray-300 transition-all text-sm">
                  man vibeperks
                </button>
              </div>
            </div>

            {/* Live Terminal Log */}
            <div className="bg-white border border-gray-300 p-4 h-48 overflow-hidden relative shadow-sm rounded-sm">
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <div className="text-[10px] text-gray-500 mb-2 border-b border-gray-100 pb-1">
                user@vibeperks:~/logs $ tail -f system.log
              </div>
              <div className="space-y-1 font-mono text-xs">
                {statusLog.map((log, i) => (
                  <div key={i} className="text-gray-700 opacity-80 hover:opacity-100 transition-opacity">
                    {log}
                  </div>
                ))}
                <div className="animate-pulse text-black">_</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="mb-8 sticky top-[53px] z-40 bg-white/90 backdrop-blur-sm py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="grep 'cloud credits'..."
                className="w-full bg-white border border-gray-300 text-black text-xs rounded-none focus:ring-1 focus:ring-black focus:border-black block pl-10 p-2.5 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {['All', 'Cloud', 'Tools', 'API', 'Education'].map((filter) => (
                <button 
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 text-[10px] border transition-all whitespace-nowrap ${
                    selectedFilter === filter 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 hover:border-black hover:bg-gray-50 text-gray-500 hover:text-black'
                  }`}
                >
                  {filter}
                </button>
              ))}
              <button className="px-3 py-1 text-[10px] border border-gray-300 hover:border-black text-black flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter
              </button>
            </div>
          </div>
        </section>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPerks.length > 0 ? (
            filteredPerks.map(perk => (
              <PerkCard key={perk.id} perk={perk} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-gray-300 text-gray-500">
              <p className="text-xl mb-2">Error: 404 Perk Not Found</p>
              <p className="text-sm">Try adjusting your search query or check back later.</p>
            </div>
          )}
        </div>

        {/* Stats / Footerish thing */}
        <div className="mt-20 border-t border-gray-200 pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 border border-gray-200 bg-gray-50">
            <div className="text-2xl font-bold text-black mb-1">{perks.length}</div>
            <div className="text-[10px] text-gray-500 uppercase">Active Perks</div>
          </div>
          <div className="p-4 border border-gray-200 bg-gray-50">
            <div className="text-2xl font-bold text-black mb-1">$1.2M+</div>
            <div className="text-[10px] text-gray-500 uppercase">Total Value</div>
          </div>
          <div className="p-4 border border-gray-200 bg-gray-50">
            <div className="text-2xl font-bold text-black mb-1">{new Set(perks.map(p => p.company)).size}</div>
            <div className="text-[10px] text-gray-500 uppercase">Companies</div>
          </div>
          <div className="p-4 border border-gray-200 bg-gray-50">
            <div className="text-2xl font-bold text-black mb-1">{lastUpdate}</div>
            <div className="text-[10px] text-gray-500 uppercase">Last Update</div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200 text-center">
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
