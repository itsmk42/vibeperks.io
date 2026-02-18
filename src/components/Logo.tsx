import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Vibeperks Logo"
    >
      {/* Background Box */}
      <rect x="2" y="2" width="36" height="36" rx="4" fill="black" />
      
      {/* Terminal Prompt >_ */}
      <path 
        d="M10 12L18 20L10 28" 
        stroke="white" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <rect x="22" y="24" width="8" height="4" fill="white" className="animate-pulse" />
    </svg>
  );
};
