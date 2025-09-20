import React, { useState, useEffect, useRef } from 'react';

export default function ConnectedScrollPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef(null);
  const triggerRefs = useRef([]);

  const items = [
    {
      title: "Participate & Build",
      content: "Join our biweekly online HackNights, explore trending tech each week, and complete fun, hands-on projects.",
      step: "01"
    },
    {
      title: "Earn Your Spot", 
      content: "Complete projects in any of the last 5 online HackNights, and you'll qualify for an exclusive invite.",
      step: "02"
    },
    {
      title: "Hack at TinkerSpace",
      content: "An overnight, invite-only hackathon at TinkerSpace — where Saturday HackNight shows its full potential.",
      step: "03"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index'));
          
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const currentTriggerRefs = triggerRefs.current;

    currentTriggerRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentTriggerRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="w-screen -translate-x-52 text-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div ref={observerRef} className="relative">
          
          {/* Fixed center line with moving dot */}
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            {/* Vertical line */}
            <div className="w-px h-96 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            
            {/* Moving dot based on active index */}
            <div 
              className="absolute w-4 h-4 bg-white rounded-full shadow-lg transform -translate-x-1/2 transition-all duration-1000 ease-out"
              style={{
                top: `${20 + (activeIndex * 40)}%`,
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
              }}
            />
            
            
          </div>

          {/* Text content */}
          <div className="space-y-0 relative z-20">
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => triggerRefs.current[index] = el}
                data-index={index}
                className="relative h-screen flex items-center justify-center"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">
                  
                  {/* Step number - left side */}
                  <div className="text-center lg:text-right">
                    <div className={`
                      inline-block text-8xl lg:text-9xl font-bold transition-all duration-700
                      ${activeIndex === index 
                        ? 'text-white opacity-100 transform scale-110' 
                        : 'text-white/10 opacity-50'
                      }
                    `}>
                      {item.step}
                    </div>
                  </div>

                  {/* Content - right side */}
                  <div className={`
                    transition-all duration-700 text-center lg:text-left
                    ${activeIndex === index 
                      ? 'text-white font-clash opacity-100 transform translate-x-0' 
                      : 'text-white/20 opacity-50 transform translate-x-4'
                    }
                  `}>
                    <h2 className="font-medium text-3xl lg:text-4xl xl:text-5xl mb-6 leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
                      {item.content}
                    </p>
                    
                    
                  </div>
                </div>

               
              </div>
            ))}
          </div>

         
        </div>
      </div>
    </div>
  );
}