"use client";

import { cn } from "classnames";

export default function DisplayCards({ cards = [] }) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-r before:from-blue-500/20 before:to-transparent before:left-0 before:top-0 before:transition-opacity before:duration-700 hover:before:opacity-0",
      icon: (
        <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20M12 2l7 7-7 7-7-7 7-7z" />
        </svg>
      ),
      title: "Featured",
      description: "Discover amazing content",
      date: "Just now"
    },
    {
      className: "[grid-area:stack] translate-x-24 translate-y-12 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-r before:from-blue-500/20 before:to-transparent before:left-0 before:top-0 before:transition-opacity before:duration-700 hover:before:opacity-0",
      icon: (
        <svg className="w-6 h-6 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20M12 2l7 7-7 7-7-7 7-7z" />
        </svg>
      ),
      title: "New",
      description: "Latest updates",
      date: "Today"
    },
    {
      className: "[grid-area:stack] translate-x-36 translate-y-16 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-r before:from-blue-500/20 before:to-transparent before:left-0 before:top-0 before:transition-opacity before:duration-700 hover:before:opacity-0",
      icon: (
        <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20M12 2l7 7-7 7-7-7 7-7z" />
        </svg>
      ),
      title: "Popular",
      description: "Most liked",
      date: "This week"
    }
  ];

  const displayCards = cards.length > 0 ? cards : defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <div
          key={index}
          className={`relative flex h-64 w-[32rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-blue-500/20 bg-white/10 backdrop-blur-sm px-6 py-4 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[28rem] after:bg-gradient-to-l after:from-white/5 after:to-transparent after:content-[''] hover:border-blue-500/50 hover:bg-white/20 [&>*]:flex [&>*]:items-center [&>*]:gap-2 ${cardProps.className || ''}`}
        >
          <div>
            <span className="relative inline-block rounded-full bg-blue-800 p-1">
              {cardProps.icon}
            </span>
            <p className="text-lg font-medium text-blue-300">{cardProps.title}</p>
          </div>
          <p className="whitespace-nowrap text-lg text-white/80">{cardProps.description}</p>
          <p className="text-sm text-white/60">{cardProps.date}</p>
        </div>
      ))}
    </div>
  );
}
