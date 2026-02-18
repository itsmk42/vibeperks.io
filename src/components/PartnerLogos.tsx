import React, { useEffect, useState } from 'react';

// Simplified SVG logos for partners to ensure no external image dependencies and fast loading
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
  </svg>
);

const AWSLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M18.822 13.918c-1.157 1.554-2.859 2.457-4.877 2.476-1.988.019-3.238-.973-3.238-.973l-1.021 1.63s1.613 1.258 4.295 1.229c2.821-.028 5.137-1.385 6.475-3.376.104.59.352 1.562.352 1.562l1.923-.429s-1.124-3.665-1.542-5.073c-.076-.238-.162-.438-.267-.628l-.343-1.095h-2.028l2.266 7.676zM15.424 7.558l-2.009 5.865-1.542-4.142h-2.114l2.714 7.037 3.095-8.76zM7.332 7.558L5.342 12.633 4.218 9.548c.552-.381 1.21-.61 1.914-.61 1.21 0 2.257.657 2.81 1.628l1.638-.933C9.694 8.081 8.009 7.062 6.132 7.062c-1.286 0-2.457.486-3.342 1.276L1.838 7.558H0l3.99 10.95 3.342-8.508h.001z" />
    <path d="M3.733 18.59c3.085 2.257 8.017 2.228 11.836.876 0 0 .524.714.8.962-4.323 1.771-10.436 1.685-14.188-1.028.001-.001 1.552-.81 1.552-.81z" />
  </svg>
);

const TraeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    {/* Placeholder simplified geometric logo for Trae */}
    <path d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z" />
    <rect x="11" y="14" width="2" height="4" />
  </svg>
);

export const PartnerLogos = ({ show }: { show: boolean }) => {
  return (
    <div 
      className={`flex items-center gap-6 md:gap-8 transition-opacity duration-1000 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden md:inline-block">Powered by</span>
      
      <div className="flex items-center gap-6 text-gray-400">
        <div className="h-5 w-5 hover:text-black transition-colors duration-300" title="Google Cloud">
          <GoogleLogo />
        </div>
        <div className="h-5 w-8 hover:text-black transition-colors duration-300" title="AWS">
          <AWSLogo />
        </div>
        <div className="h-5 w-5 hover:text-black transition-colors duration-300" title="Trae AI">
          <TraeLogo />
        </div>
      </div>
    </div>
  );
};
