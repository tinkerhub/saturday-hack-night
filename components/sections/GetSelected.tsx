"use client";

import { Github, Users, Code2, Trophy } from "lucide-react";
import ProcessCards from "@/components/ui/ProcessCards";

const steps = [
  {
    icon: Github,
    step: "01",
    title: "Register & Attend",
    description: "Show up on Saturday at 6 PM IST — online, no travel needed. Free and open to all builders.",
    bg: "bg-[#f5d6ed]",
  },
  {
    icon: Users,
    step: "02",
    title: "Build Solo or in Pair",
    description: "Max 2 per team. Any language, framework, hardware, or API. Stack suggestions are starting points.",
    bg: "bg-[#d0ecf8]",
  },
  {
    icon: Code2,
    step: "03",
    title: "Ship & Push Code",
    description: "Build something real, push code to GitHub before midnight, and submit your project proof.",
    bg: "bg-[#d4f5e0]",
  },
  {
    icon: Trophy,
    step: "04",
    title: "Get Invited to Finale",
    description: "Top teams from the 5 online build sprints get direct invitations to the 24-hour in-person hackathon at TinkerSpace Kochi.",
    bg: "bg-[#fff6bf]",
  },
];

export default function GetSelected() {
  return (
    <section id="get-selected" className="relative">
      <ProcessCards
        steps={steps}
        badge="Your Path to the Finale"
        heading={
          <>
            Build. Ship.{" "}
            <span className="text-black">Get Invited.</span>
          </>
        }
        subtext={
          <>
            <span className="block font-display font-bold text-black text-xl sm:text-2xl mb-1">
              Earn Your Spot
            </span>
            Complete projects in any of the last 5 online HackNights, and you&apos;ll qualify for an exclusive invite.
          </>
        }
      />
    </section>
  );
}




