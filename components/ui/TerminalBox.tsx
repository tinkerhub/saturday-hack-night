"use client";

import { useEffect, useState } from "react";
import { motion } from "@/lib/motion";

interface TerminalBoxProps {
  prompt?: string;
  command: string;
  successMessage?: string;
}

export default function TerminalBox({
  prompt = "discord@shn:~$",
  command,
  successMessage = "Connection established. Welcome to the builders' space.",
}: TerminalBoxProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < command.length) {
          setDisplayed(command.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setDone(true);
          setTimeout(() => setShowSuccess(true), 400);
        }
      }, 60);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(timer);
  }, [command]);

  return (
    <div className="glass-card rounded-xl overflow-hidden font-mono text-sm w-full max-w-xl mx-auto">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#fff6bf] border-b border-white/8">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-4 text-xs text-[#9a90b8]">terminal — shn</span>
      </div>

      {/* Terminal body */}
      <div className="p-6 space-y-3">
        {/* Command line */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#d4f5e0]">{prompt}</span>
          <span className="text-white">{displayed}</span>
          {!done && (
            <span className="inline-block w-2 h-4 bg-[#d4f5e0] animate-pulse" />
          )}
        </div>

        {/* Success response */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[#d4f5e0] text-xs"
          >
            ✓ {successMessage}
          </motion.div>
        )}
      </div>
    </div>
  );
}




