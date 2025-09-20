import React, { useState } from 'react';

// Placeholder images for the phone display
// These should be replaced with actual images relevant to each feature

const features = [
  {
    id: 'generateUi',
    title: 'Beginner Friendly, Builder Friendly',
    description: 'No gatekeeping: anyone curious can jump in. You learn by hacking, even if you are a total beginner.',
  },
  {
    id: 'autoLayout',
    title: 'Trending Tech Deep Dives',
    description: 'Each HackNight focuses on one new stack / tool. Always fresh, always something you’ll want to try in real projects later.',
  },
  {
    id: 'scaleEdits',
    title: 'Biweekly Ritual',
    description: 'Happens every 1st & 3rd Saturday night. Consistency builds the cult-like “ritual” vibe.',
  },
  {
    id: 'makePrototypes',
    title: 'Hands-on Mini Projects',
    description: 'Focus on small, fun, quirky builds. Attendees walk away with quirky, memorable projects they can show off.',
  },
  {
    id: 'embedPrototypes',
    title: 'Build without being stuck at learning',
    description: 'No theory dumps, just exploration. Each HackNight leaves behind projects, notes, repos, and guides.',
  },
];

const FeatureAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Start with the first item open

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 p-4 md:p-8 bg-purple-900/10 w-full">
      {/* Left section: Accordion items */}
      <div className="w-full md:w-1/2 space-y-4">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`group cursor-pointer py-4 border-b border-gray-700 transition-colors duration-300 ${
              activeIndex === index ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => handleItemClick(index)}
          >
            <h3 className="relative text-xl font-medium text-white mb-0 pl-8 transition-transform duration-300 group-hover:translate-x-2">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </span>
              {feature.title}
            </h3>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-gray-500 font-semibold pt-2 pl-8">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right section: Phone display */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        <div className="relative w-64 h-96 bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Phone frame - simple representation */}
          <div className="absolute inset-0 border-4 border-gray-700 rounded-xl"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gray-700 rounded-b-lg"></div> {/* Notch */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full"></div> {/* Home indicator */}

          {/* Image display */}
          {/* Animated display based on active feature */}
          {activeIndex === 0 && ( // Generate simple UI with AI
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-24 h-24 rounded-full bg-blue-500 animate-pulse-grow"></div>
              <div className="absolute w-16 h-16 rounded-full bg-blue-300 animate-pulse-grow animation-delay-200"></div>
            </div>
          )}
          {activeIndex === 1 && ( // Design consistently with Auto Layout
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-20 h-20 bg-green-500 transform rotate-45 animate-spin-slow"></div>
              <div className="absolute w-12 h-12 bg-green-300 transform -rotate-45 animate-spin-fast"></div>
            </div>
          )}
          {activeIndex === 2 && ( // Scale your edits instantly
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-8 h-8 rounded-full bg-yellow-400 animate-bounce-y animation-delay-0"></div>
              <div className="absolute w-8 h-8 rounded-full bg-yellow-400 animate-bounce-y animation-delay-200" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute w-8 h-8 rounded-full bg-yellow-400 animate-bounce-y animation-delay-400" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
          {activeIndex === 3 && ( // Make prototypes with AI
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-24 h-24 rounded-full bg-pink-500 animate-ping"></div>
              <div className="absolute w-16 h-16 rounded-full bg-pink-300 animate-ping animation-delay-500" style={{ animationDelay: '0.5s' }}></div>
            </div>
          )}
          {activeIndex === 4 && ( // Embed prototypes in your presentations
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-20 h-20 bg-purple-500 animate-fade-in-out"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default FeatureAccordion;