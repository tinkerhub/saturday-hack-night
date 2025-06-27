"use client";

import React from 'react';
import engagespotImg from '../assets/images/partners/engagespot.png';
import fofImg from '../assets/images/partners/fof.png';

const Partners = () => {
  const partnerImages = [
    engagespotImg,
    fofImg
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto translate-y-6 sm:translate-y-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-clash font-medium text-[#FFFFE3] text-center mb-6 sm:mb-8 md:mb-12">Our Partners</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {partnerImages.map((image, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="relative aspect-square w-full max-w-[150px] sm:max-w-[180px] md:max-w-[200px] mx-auto overflow-hidden rounded-lg sm:rounded-xl border border-[#0A0A0F]/10 shadow-lg shadow-[#0A0A0F]/20 hover:shadow-[#0A0A0F]/30">
                <img 
                  src={image}
                  alt={`Partner ${index + 1}`}
                  className="w-20 h-16 translate-y-10 translate-x-8 sm:w-23 sm:h-20 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
