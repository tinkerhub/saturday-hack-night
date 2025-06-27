import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

const TABS = [
  {
    label: "REGISTER",
    subheading: (
      <>
        <span className="font-clash font-bold uppercase text-blue-500">REGISTER.</span>
        <span className="font-clash font-medium uppercase text-white ml-2">CREATE THE REPO AND FORM YOUR TEAM</span>
      </>
    ),
    steps: [
      {
        number: 1,
        title: "CREATE A REPO",
        desc: "Using the given template"
      },
      {
        number: 2,
        title: "FORM A TEAM",
        desc: "Of 2-4 members including Team Lead"
      },
      {
        number: 3,
        title: "REGISTER YOUR TEAM",
        desc: "Confirm that all team members, have received the onboarding email"
      }
    ],
    summary: (
      <>
        If everyone has received their onboarding email, you are officially registered. <span className="text-blue-500">Yay!</span>
      </>
    )
  },
  {
    label: "EXPLORE",
    subheading: (
      <>
        <span className="font-clash font-bold uppercase text-blue-500">EXPLORE.</span>
        <span className="font-clash font-medium uppercase text-white ml-2">JOIN THE LETXPLORE SESSION</span>
      </>
    ),
    steps: [
      {
        number: 1,
        title: "DIVE INTO THE FRAMEWORK/API",
        desc: "Using the docs provided in the More Info section"
      },
      {
        number: 2,
        title: "JOIN THE LETXPLORE SESSION",
        desc: "Held the day before HackNight (Friday) at 8:00 PM."
      },
      {
        number: 3,
        title: "INVITATION FOR THE SESSION",
        desc: "Will be sent via Email"
      }
    ],
    summary: "Recoded LetXplore session will be available in the notion doc"
  },
  {
    label: "BUILD",
    subheading: (
      <>
        <span className="font-clash font-bold uppercase text-blue-500">BUILD.</span>
        <span className="font-clash font-medium uppercase text-white ml-2">HAVE FUN!!</span>
      </>
    ),
    steps: [
      {
        number: 1,
        title: "COLLABORATE AND BUILD",
        desc: "From 6.00PM–11.00pm"
      },
      {
        number: 2,
        title: "WRAP UP WITH A DETAILED README",
        desc: "README in the repository you created."
      },
      {
        number: 3,
        title: "JOIN THE IDEA PITCHING SESSION AT",
        desc: "8:00PM via Google Meet. The invitation will be sent via email."
      }
    ],
    summary: (
      <span className="text-blue-500 font-bold text-lg">Happy Coding !</span>
    )
  }
];

const Register = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tab = TABS[activeTab];

  // Refs for tab headings
  const regRef = useRef(null);
  const expRef = useRef(null);
  const buildRef = useRef(null);
  const containerRef = useRef(null);
  const [linePos, setLinePos] = useState({
    regToExp: { left: 0, width: 0 },
    expToBuild: { left: 0, width: 0 }
  });

  // Auto-slide logic
  const timerRef = useRef();
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        setActiveTab((prev) => (prev + 1) % TABS.length);
      }, 5000);
    }
    return () => clearTimeout(timerRef.current);
  }, [activeTab, isPaused]);

  // Refs for lines
  useLayoutEffect(() => {
    if (regRef.current && expRef.current && buildRef.current && containerRef.current) {
      const regRect = regRef.current.getBoundingClientRect();
      const expRect = expRef.current.getBoundingClientRect();
      const buildRect = buildRef.current.getBoundingClientRect();
      const contRect = containerRef.current.getBoundingClientRect();
      setLinePos({
        regToExp: {
          top: regRect.bottom - contRect.top + 8, // 8px for padding
          height: expRect.top - regRect.bottom - 16 // 16px for spacing
        },
        expToBuild: {
          top: expRect.bottom - contRect.top + 8,
          height: buildRect.top - expRect.bottom - 16
        }
      });
    }
  }, [activeTab]);

  // Responsive: recalc on resize
  useEffect(() => {
    const handleResize = () => {
      if (regRef.current && expRef.current && buildRef.current && containerRef.current) {
        const regRect = regRef.current.getBoundingClientRect();
        const expRect = expRef.current.getBoundingClientRect();
        const buildRect = buildRef.current.getBoundingClientRect();
        const contRect = containerRef.current.getBoundingClientRect();
        setLinePos({
          regToExp: {
            left: regRect.right - contRect.left + 8,
            width: expRect.left - regRect.right - 16
          },
          expToBuild: {
            left: expRect.right - contRect.left + 8,
            width: buildRect.left - expRect.right - 16
          }
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pause handlers
  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <section className="w-full mb-16 md:px-0" id={id}>
         <h1 className="text-2xl sm:text-4xl md:text-6xl font-clash font-medium sm:translate-x-64 mb-4 px-4">Register now for <span className="text-transparent block bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Online HackNights</span></h1>
      <div className="max-w-6xl mx-auto rounded-xl p-4 sm:p-6 md:p-10 flex flex-col relative">
        
        {/* Mobile Tabs Header - Horizontal */}
        <div className="md:hidden mb-6">
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 relative">
            <span
              className={`text-lg sm:text-xl font-clash font-bold uppercase tracking-wide px-1 sm:px-2 cursor-pointer transition-colors ${
                activeTab === 0 ? "text-[#FFFFE3]" : "text-gray-400"
              }`}
              style={{ letterSpacing: '0.04em' }}
              onClick={() => setActiveTab(0)}
            >
              REGISTER
            </span>
            
            {/* Horizontal line between REGISTER and EXPLORE */}
            <div className="w-6 sm:w-8 h-1 bg-blue-500 opacity-80"></div>
            
            <span
              className={`text-lg sm:text-xl font-clash font-bold uppercase tracking-wide px-1 sm:px-2 cursor-pointer transition-colors ${
                activeTab === 1 ? "text-[#FFFFE3]" : "text-gray-400"
              }`}
              style={{ letterSpacing: '0.04em' }}
              onClick={() => setActiveTab(1)}
            >
              EXPLORE
            </span>
            
            {/* Horizontal line between EXPLORE and BUILD */}
            <div className="w-6 sm:w-8 h-1 bg-blue-500 opacity-80"></div>
            
            <span
              className={`text-lg sm:text-xl font-clash font-bold uppercase tracking-wide px-1 sm:px-2 cursor-pointer transition-colors ${
                activeTab === 2 ? "text-[#FFFFE3]" : "text-gray-400"
              }`}
              style={{ letterSpacing: '0.04em' }}
              onClick={() => setActiveTab(2)}
            >
              BUILD
            </span>
          </div>
        </div>

        {/* Desktop Layout: Tabs and Card side by side */}
        <div className="hidden md:flex md:flex-row md:items-center md:justify-center gap-12 relative w-full">
          {/* Tabs Header - Vertical */}
          <div
            ref={containerRef}
            className="flex flex-col relative select-none px-2 py-8 items-center flex-shrink-0"
            style={{ height: 'fit-content' }}
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
            onTouchStart={handlePause}
            onTouchEnd={handleResume}
          >
              {/* Vertical lines */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0 pointer-events-none z-0">
              <div
                className="absolute w-0.5 bg-blue-500 opacity-60"
                style={{
                  top: `${linePos.regToExp.top}px`,
                  height: `${linePos.regToExp.height}px`,
                  display: 'block'
                }}
              />
              <div
                className="absolute w-0.5 bg-blue-500 opacity-60"
                style={{
                  top: `${linePos.expToBuild.top}px`,
                  height: `${linePos.expToBuild.height}px`,
                  display: 'block'
                }}
              />
            </div>
            <div className="flex flex-col h-full items-center justify-between">
              <span
                ref={regRef}
                className={`z-10 text-3xl lg:text-4xl font-clash font-bold uppercase tracking-wide px-2  ${
                  activeTab === 0 ? "text-[#FFFFE3]" : "text-gray-400"
                }`}
                style={{ letterSpacing: '0.04em' }}
              >
                REGISTER
              </span>
              <span
                ref={expRef}
                className={`z-10 text-3xl lg:text-4xl font-clash font-bold uppercase tracking-wide px-2 mt-24 ${
                  activeTab === 1 ? "text-[#FFFFE3]" : "text-gray-400"
                }`}
                style={{ letterSpacing: '0.04em' }}
              >
                EXPLORE
              </span>
              <span
                ref={buildRef}
                className={`z-10 text-3xl lg:text-4xl font-clash font-bold uppercase tracking-wide px-2 mt-24 ${
                  activeTab === 2 ? "text-[#FFFFE3]" : "text-gray-400"
                }`}
                style={{ letterSpacing: '0.04em' }}
              >
                BUILD
              </span>
            </div>
          </div>

          {/* Glassmorphic Card (desktop column) */}
          <div className="relative z-10 w-full md:max-w-4xl max-w-xl rounded-2xl shadow-xl border border-white/30 bg-white/10 backdrop-blur-md p-8 lg:p-12 flex flex-col gap-4">
            {/* Subheading */}
            <div className="mb-4 sm:mb-6 md:mb-8 font-clash font-light text-center text-base sm:text-lg md:text-xl lg:text-2xl">
              {tab.subheading}
            </div>
            {/* Steps */}
            <div className="relative flex flex-col gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8 w-full">
              {tab.steps.map((step) => (
                <div key={step.number} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#232228] border border-blue-500 flex items-center justify-center text-lg sm:text-xl md:text-2xl text-[#232228] relative flex-shrink-0">
                    <span className="absolute inset-0 flex items-center font-clash font-thin justify-center text-blue-50">{step.number}</span>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-[#FFFFE3] font-clash font-medium text-sm sm:text-base md:text-lg tracking-wide uppercase">
                      {step.title}
                    </div>
                    <div className="text-[#FFFFE3] font-clash font-medium text-xs sm:text-sm md:text-base opacity-80">
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Summary */}
            {tab.summary && (
              <div className="mt-2 sm:mt-4 text-center font-clash font-medium text-[#FFFFE3] text-sm sm:text-base md:text-lg">
                {tab.summary}
              </div>
            )}
          </div>
        </div>

        {/* Glassmorphic Card (mobile view, always visible) */}
        <div className="md:hidden relative z-10 w-full max-w-[95vw] sm:max-w-full rounded-2xl shadow-xl border border-white/30 bg-white/10 backdrop-blur-md p-6 sm:p-6 flex flex-col gap-4 mt-4">
          {/* Subheading */}
          <div className="mb-4 font-clash font-light text-center text-base sm:text-lg">
            {tab.subheading}
          </div>
          {/* Steps */}
          <div className="relative flex flex-col gap-4 mb-4 w-full">
            {tab.steps.map((step) => (
              <div key={step.number} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#232228] border border-blue-500 flex items-center justify-center text-lg text-[#232228] relative flex-shrink-0">
                  <span className="absolute inset-0 flex items-center font-clash font-thin justify-center text-blue-50">{step.number}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-[#FFFFE3] font-clash font-medium text-sm tracking-wide uppercase">
                    {step.title}
                  </div>
                  <div className="text-[#FFFFE3] font-clash font-medium text-xs opacity-80">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Summary */}
          {tab.summary && (
            <div className="mt-2 text-center font-clash font-medium text-[#FFFFE3] text-sm">
              {tab.summary}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Register; 