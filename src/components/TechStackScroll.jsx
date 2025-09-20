import React from 'react';
import p5jsLogo from '../assets/images/icon/psjs.png';
import openaiLogo from '../assets/images/icon/OpenAI_Logo 2.png';
import seleniumLogo from '../assets/images/icon/sele.png';
import godotLogo from '../assets/images/icon/godot.png';
import figmaLogo from '../assets/images/icon/Figma.png';
import opencvLogo from '../assets/images/icon/openCV.png';
import fletLogo from '../assets/images/icon/Flet.png';
import frappeLogo from '../assets/images/icon/Frappe.png';
import chromaLogo from '../assets/images/icon/chroma.png';
import pineconeLogo from '../assets/images/icon/Pinecorn.png';
import electronLogo from '../assets/images/icon/electron.png';
import pygameLogo from '../assets/images/icon/pygame.png';
import webglLogo from '../assets/images/icon/WebGL_Logo 1.png';
import websocketLogo from '../assets/images/icon/Websocker (1) 1.png';
import appwriteLogo from '../assets/images/icon/appwrite.png';
import firebaseLogo from '../assets/images/icon/Firebase_Logo 1.png';
import novelLogo from '../assets/images/icon/Novel.png';
import engagespotLogo from '../assets/images/icon/engagespotlogo 2.png';
import supabaseLogo from '../assets/images/icon/supabase-logo.png'



const techStacks = [
  { name: 'p5.js', logo: p5jsLogo },
  { name: 'OpenAI', logo: openaiLogo },
  { name: 'Selenium', logo: seleniumLogo },
  { name: 'Godot', logo: godotLogo },
  { name: 'Figma API', logo: figmaLogo },
  { name: 'OpenCV', logo: opencvLogo },
  { name: 'Flet', logo: fletLogo },
  { name: 'Frappe', logo: frappeLogo },
  { name: 'Chroma', logo: chromaLogo },
  { name: 'Pinecone', logo: pineconeLogo },
  { name: 'Electron', logo: electronLogo },
  { name: 'Pygame', logo: pygameLogo },
  { name: 'WebGL', logo: webglLogo },
  { name: 'WebSocket', logo: websocketLogo },
  { name: 'Appwrite', logo: appwriteLogo },
  { name: 'Firebase', logo: firebaseLogo },
  { name: 'Novel', logo: novelLogo },
  { name: 'Engagespot', logo: engagespotLogo },
  { name: 'Supabase', logo: supabaseLogo },
];

const TechStackScroll = () => {
  return (
    <div className="relative w-full overflow-hidden py-16">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-black/50 to-transparent"></div>
      <div className="flex animate-scroll-left whitespace-nowrap">
        {Array(2).fill(techStacks).flat().map((stack, index) => (
          <div key={index} className="inline-block mx-6 flex items-center justify-center flex-shrink-0">
            <img src={stack.logo} alt={`${stack.name} Logo`} className="h-24 w-24 object-contain" />
          </div>
        ))}
      </div>
      <style jsx="true">{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TechStackScroll;