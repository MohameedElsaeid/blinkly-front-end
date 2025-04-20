
import React from 'react';

export const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50 to-white"></div>
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-blinkly-mint/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 -left-10 w-80 h-80 bg-blinkly-blue/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
    </>
  );
};
