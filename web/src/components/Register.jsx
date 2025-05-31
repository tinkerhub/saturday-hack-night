import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

const TABS = [
  {
    label: "REGISTER",
    subheading: (
      <>
        <span className="font-extrabold uppercase text-[#eaff6b]">REGISTER.</span>
        <span className="font-extrabold uppercase text-white ml-2">CREATE THE REPO AND FORM YOUR TEAM</span>
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
        desc: "Confirm that all team members, including the lead, have received the onboarding email"
      }
    ],
    summary: (
      <>
        If everyone has received their onboarding email, you are officially registered. <span className="text-[#eaff6b]">Yay!</span>
      </>
    )
  },
  {
    label: "EXPLORE",
    subheading: (
      <>
        <span className="font-extrabold uppercase text-[#eaff6b]">EXPLORE.</span>
        <span className="font-extrabold uppercase text-white ml-2">JOIN THE LETXPLORE SESSION</span>
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
        <span className="font-extrabold uppercase text-[#eaff6b]">BUILD.</span>
        <span className="font-extrabold uppercase text-white ml-2">HAVE FUN!!</span>
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
      <span className="text-[#eaff6b] font-bold text-lg">Happy Coding !</span>
    )
  }
];

const Register = () => {
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
          left: regRect.right - contRect.left + 8, // 8px for padding
          width: expRect.left - regRect.right - 16 // 16px for spacing
        },
        expToBuild: {
          left: expRect.right - contRect.left + 8,
          width: buildRect.left - expRect.right - 16
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
    <section className="w-full py-16 px-2 md:px-0 bg-[#232228]">
      <div className="max-w-4xl mx-auto border border-dashed border-[#a78bfa]/40 rounded-xl p-6 md:p-10 relative">
        {/* Tabs Header */}
        <div
          ref={containerRef}
          className="flex items-center justify-between mb-8 relative select-none px-2"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
        >
          {/* Yellow lines only between headings, perfectly positioned */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0 pointer-events-none z-0">
            <div
              className="absolute h-0.5 bg-[#eaff6b] opacity-60"
              style={{
                left: `${linePos.regToExp.left}px`,
                width: `${linePos.regToExp.width}px`,
                display: linePos.regToExp.width > 0 ? 'block' : 'none'
              }}
            />
            <div
              className="absolute h-0.5 bg-[#eaff6b] opacity-60"
              style={{
                left: `${linePos.expToBuild.left}px`,
                width: `${linePos.expToBuild.width}px`,
                display: linePos.expToBuild.width > 0 ? 'block' : 'none'
              }}
            />
          </div>
          <span
            ref={regRef}
            className={`z-10 text-3xl md:text-4xl font-extrabold uppercase tracking-wide px-2 ${
              activeTab === 0 ? "text-white" : "text-gray-400"
            }`}
            style={{ letterSpacing: '0.04em' }}
          >
            REGISTER
          </span>
          <span
            ref={expRef}
            className={`z-10 text-3xl md:text-4xl font-extrabold uppercase tracking-wide px-2 ${
              activeTab === 1 ? "text-white" : "text-gray-400"
            }`}
            style={{ letterSpacing: '0.04em' }}
          >
            EXPLORE
          </span>
          <span
            ref={buildRef}
            className={`z-10 text-3xl md:text-4xl font-extrabold uppercase tracking-wide px-2 ${
              activeTab === 2 ? "text-white" : "text-gray-400"
            }`}
            style={{ letterSpacing: '0.04em' }}
          >
            BUILD
          </span>
        </div>
        {/* Glassmorphic Card */}
        <div className="relative z-10 w-full rounded-2xl shadow-xl border border-white/30 bg-white/10 backdrop-blur-md p-8 md:p-12 flex flex-col gap-4">
          {/* Subheading */}
          <div className="mb-8 text-center text-xl md:text-2xl">
            {tab.subheading}
          </div>
          {/* Steps */}
          <div className="relative flex items-start justify-between mb-8 w-full">
            {/* Single dotted line through number circles */}
            <div className="absolute left-0 right-0 top-6 md:top-7 z-0 flex items-center">
              <div className="w-full border-t-2 border-dotted border-[#eaff6b] opacity-80" />
            </div>
            {tab.steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center z-10 w-1/3 px-2">
                <div className="w-12 h-12 rounded-full bg-[#232228] border-4 border-[#eaff6b] flex items-center justify-center text-2xl font-extrabold text-[#232228] mb-2 relative">
                  <span className="absolute inset-0 flex items-center justify-center text-[#eaff6b]">{step.number}</span>
                </div>
                <div className="text-center w-full">
                  <div className="text-white font-extrabold text-base md:text-lg mb-1 tracking-wide uppercase">
                    {step.title}
                  </div>
                  <div className="text-white text-sm md:text-base font-medium opacity-80 mt-1">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Summary */}
          {tab.summary && (
            <div className="mt-4 text-center text-white text-base md:text-lg font-bold">
              {tab.summary}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Register; 