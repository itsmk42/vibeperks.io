import React, { useState } from 'react';
import { Perk } from '@/lib/types';
import { ExternalLink, Clock, Tag, DollarSign, CheckCircle, ImageOff } from 'lucide-react';

interface PerkCardProps {
  perk: Perk;
}

export const PerkCard: React.FC<PerkCardProps> = ({ perk }) => {
  const [imgError, setImgError] = useState(false);
  
  // Extract domain for logo
  const getDomain = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '');
    } catch {
      return '';
    }
  };
  
  const domain = getDomain(perk.link);
  const logoUrl = `https://logo.clearbit.com/${domain}?size=64`;

  return (
    <div className="group relative border border-gray-200 bg-white hover:border-black transition-colors duration-300 flex flex-col h-full overflow-hidden shadow-sm hover:shadow-md">
      {/* Card Header - Terminal Style */}
      <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between group-hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            {!imgError && domain ? (
              <img 
                src={logoUrl} 
                alt={`${perk.company} logo`}
                className="w-full h-full object-contain p-1"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-[10px] font-bold text-gray-400">{perk.company.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
          <span className="text-xs text-gray-700 font-bold truncate max-w-[120px]">{perk.company}</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400/80"></div>
          <div className="w-2 h-2 rounded-full bg-green-400/80"></div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-grow flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-black group-hover:text-gray-800 mb-1">
            {perk.title}
          </h3>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
            <span className="bg-gray-100 text-gray-700 px-1 py-0.5 rounded border border-gray-200">
              {perk.type}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-600 font-mono leading-relaxed line-clamp-3">
          {'>'} {perk.description}
        </p>

        <div className="mt-auto space-y-2 text-[10px] font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <DollarSign className="w-3 h-3 text-black" />
            <span className="text-gray-400">Value:</span>
            <span className="text-black font-bold">{perk.value}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-black" />
            <span className="text-gray-400">Eligibility:</span>
            <span>{perk.eligibility}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-black" />
            <span className="text-gray-400">Expires:</span>
            <span>{perk.expires}</span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
            {perk.tags.map(tag => (
                <span key={tag} className="text-[10px] text-gray-500">#{tag}</span>
            ))}
        </div>
      </div>

      {/* Footer / Action */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <a 
          href={perk.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white hover:bg-black hover:text-white text-black border border-gray-300 py-2 px-4 text-xs font-bold transition-all duration-200 uppercase tracking-wider"
        >
          <span>Apply_Now()</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
