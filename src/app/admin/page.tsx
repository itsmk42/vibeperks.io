'use client';

import { useState, useEffect } from 'react';
import { Perk } from '@/lib/types';
import { TerminalHeader } from '@/components/TerminalHeader';
import { Plus, Trash, Save, Lock } from 'lucide-react';

export default function AdminPage() {
  const [perks, setPerks] = useState<Perk[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    description: '',
    type: 'Tools',
    value: '',
    eligibility: '',
    expires: '',
    link: '',
    tags: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/perks')
        .then(res => res.json())
        .then(data => setPerks(data));
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') { // Simple password for demo
      setIsAuthenticated(true);
    } else {
      alert('Access Denied');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPerk = {
      ...formData,
      tags: formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t),
      logo: 'Unknown', // Placeholder
    };

    const res = await fetch('/api/perks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPerk),
    });

    if (res.ok) {
      const savedPerk = await res.json();
      setPerks([savedPerk, ...perks]);
      setFormData({
        company: '',
        title: '',
        description: '',
        type: 'Tools',
        value: '',
        eligibility: '',
        expires: '',
        link: '',
        tags: '',
      });
      alert('Perk added successfully!');
    } else {
      alert('Failed to add perk');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <form onSubmit={handleLogin} className="border border-green-500 p-8 bg-green-900/10">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-green-500 font-bold flex items-center gap-2">
              <Lock className="w-6 h-6" /> Admin Access
            </h1>
            <input
              type="password"
              placeholder="Enter password"
              className="bg-black border border-green-800 text-green-500 p-2 focus:outline-none focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-green-600 text-black font-bold p-2 hover:bg-green-500">
              Login
            </button>
            <p className="text-xs text-gray-500">Hint: admin</p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono pb-20">
      <TerminalHeader />
      
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8 border-b border-gray-200 pb-2">Admin Dashboard</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add New Perk Form */}
          <div className="border border-gray-200 p-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add New Perk
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1 text-gray-500">Company</label>
                  <input name="company" value={formData.company} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 text-sm text-black" required />
                </div>
                <div>
                  <label className="block text-xs mb-1 text-gray-500">Title</label>
                  <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 text-sm text-black" required />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1 text-gray-500">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 text-sm text-black h-24" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1 text-gray-500">Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 text-sm text-black">
                    <option value="Cloud Credits">Cloud Credits</option>
                    <option value="Tools">Tools</option>
                    <option value="API">API</option>
                    <option value="Education">Education</option>
                    <option value="Hardware">Hardware</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1 text-gray-500">Value</label>
                  <input name="value" value={formData.value} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 text-sm text-black" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1 text-gray-500">Eligibility</label>
                  <input name="eligibility" value={formData.eligibility} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 text-sm text-black" />
                </div>
                <div>
                  <label className="block text-xs mb-1 text-gray-500">Expires</label>
                  <input name="expires" value={formData.expires} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 text-sm text-black" />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1 text-gray-500">Link</label>
                <input name="link" value={formData.link} onChange={handleChange} className="w-full bg-white border border-gray-300 p-2 text-sm text-black" required />
              </div>

              <div>
                <label className="block text-xs mb-1 text-gray-500">Tags (comma separated)</label>
                <input 
                  name="tags" 
                  value={formData.tags} 
                  onChange={handleChange} 
                  className="w-full bg-white border border-gray-300 p-2 text-sm text-black focus:outline-none focus:border-black" 
                  placeholder="cloud, ai, free" 
                />
              </div>

              <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save Perk
              </button>
            </form>
          </div>

          {/* Existing Perks List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Existing Perks ({perks.length})</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {perks.map(perk => (
                <div key={perk.id} className="border border-gray-200 p-3 bg-white hover:border-black transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-black">{perk.title}</div>
                      <div className="text-xs text-gray-500">{perk.company} • {perk.value}</div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs border border-gray-200 px-1 text-gray-500">{perk.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
