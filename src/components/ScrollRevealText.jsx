import React, { useState, useEffect, useRef } from 'react';

export default function StickyScrollPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const triggerRefs = useRef([]);

  const items = [
    {
      title: "Loudness correction",
      content: "Ensure that your audio maintains consistent relative loudness across one or many recordings.",
    },
    {
      title: "Speech isolation",
      content: "Isolate and boost voices, using neural networks trained to distinguish speech from external noise.",
    },
    {
      title: "Noise reduction",
      content:
        "Eliminate all air conditioners, lawn mowers, noisy neighbors, and other background noises from your recording.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index'));
          
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    // Observer for main container visibility
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentTriggerRefs = triggerRefs.current;
    const currentObserverRef = observerRef.current;

    // Observe trigger elements
    currentTriggerRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Observe main container
    if (currentObserverRef) {
      visibilityObserver.observe(currentObserverRef);
    }

    return () => {
      currentTriggerRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      if (currentObserverRef) {
        visibilityObserver.unobserve(currentObserverRef);
      }
    };
  }, []);

  const getGradientClasses = (index) => {
    const gradients = [
      "from-purple-100 to-indigo-300",
      "from-cyan-300 to-sky-400", 
      "from-amber-300 to-orange-400"
    ];
    return gradients[index] || gradients[0];
  };

  return (
    <div className="w-screen text-white mt-32 mb-32">
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={observerRef} className="relative max-w-4xl mx-auto">
          {/* Text content */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => triggerRefs.current[index] = el}
                data-index={index}
                className="relative scroll-mt-[50vh] min-h-[50vh] flex items-center"
              >
                <div
                  className={`
                    relative p-8 transition-all duration-500 cursor-pointer text-center
                    ${activeIndex === index 
                      ? "text-white transform scale-105" 
                      : "text-white/20 hover:text-white/40"
                    }
                  `}
                  onClick={() => {
                    triggerRefs.current[index]?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center' 
                    });
                  }}
                >
                  <div className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
                    {item.title}
                  </div>
                  <div className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    {item.content}
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