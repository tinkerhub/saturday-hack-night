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
      <div className="w-full pb-10 md:w-1/2 space-y-6">
      <div>
        <h1 className='pl-8 text-[#FFFFE3] font-clash font-medium text-lg justify-center mx-auto sm:text-xl md:text-2xl mb-10 m-20 lg:text-3xl'>
        Learn to Learn:  Changing How You See Hackathons
        </h1>
      </div>
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`group cursor-pointer py-4 items-center font-clash justify-between border-b border-gray-700 transition-colors duration-300 ${
              activeIndex === index ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => handleItemClick(index)}
          >
            <h3 className="relative font-clash text-xl font-medium text-white mb-0 pl-8 transition-transform duration-300 group-hover:translate-x-2">
              <span className="absolute  left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </span>
              {feature.title}
            </h3>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-gray-500 font-clash pt-2 pl-8">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right section: Phone display */}
      <div className="hidden kw-full md:w-1/2 md:flex justify-center items-center p-4">
        
          
       
      </div>
    </div>
  );
};



export default FeatureAccordion;