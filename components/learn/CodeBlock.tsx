"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({
  code,
  language = "python",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-4 rounded-xl border-2 border-black bg-[#111111] text-[#f5f4ee] overflow-hidden shadow-hard-sm">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-2 text-white/70">
          <Terminal size={14} className="text-[#91e47a]" />
          <span className="font-semibold text-white/90">
            {filename || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label={copied ? "Code copied" : "Copy code"}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-medium transition-colors cursor-pointer border border-white/15"
        >
          {copied ? (
            <>
              <Check size={13} className="text-[#91e47a]" />
              <span className="text-[#91e47a]">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed selection:bg-[#f28ad8] selection:text-black">
        <pre className="text-white/90">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
