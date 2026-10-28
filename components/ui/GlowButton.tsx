import { cn } from "@/lib/utils";

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "green" | "cyan" | "outline";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
}

export default function GlowButton({
  href,
  children,
  variant = "green",
  size = "md",
  external = false,
  className,
}: GlowButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    green:
      "bg-[#d4f5e0] text-black font-bold hover:glow-green hover:shadow-[0_0_20px_rgba(57,255,140,0.5),0_0_60px_rgba(57,255,140,0.2)] transition-all duration-300",
    cyan: "bg-[#f5d6ed] text-black font-bold hover:shadow-[0_0_20px_rgba(255,62,200,0.5)] transition-all duration-300",
    outline:
      "border border-[#d4f5e0] text-[#d4f5e0] font-semibold hover:bg-[#d4f5e0] hover:text-black transition-all duration-300",
  };

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-sans cursor-pointer",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </a>
  );
}



