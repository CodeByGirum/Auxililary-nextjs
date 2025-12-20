import React from 'react';

export const AuxLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="4" height="4" />
    <rect x="8" y="2" width="4" height="4" />
    <rect x="2" y="8" width="4" height="4" />
    <rect x="8" y="8" width="4" height="4" />
    <rect x="14" y="2" width="4" height="4" />
    <rect x="14" y="8" width="4" height="4" />
    <rect x="2" y="14" width="4" height="4" />
    <rect x="8" y="14" width="4" height="4" />
    <rect x="14" y="14" width="4" height="4" />
  </svg>
);