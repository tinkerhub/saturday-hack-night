/**
 * Thin square grid on off-white paper or black surfaces — the editorial poster backdrop
 * used behind pages and sections.
 */
interface GridBackdropProps {
  variant?: "light" | "dark";
  className?: string;
  isFixed?: boolean;
}

export default function GridBackdrop({
  variant = "light",
  className = "",
  isFixed = true,
}: GridBackdropProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`${isFixed ? "fixed" : "absolute"} inset-0 pointer-events-none ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px)"
            : "linear-gradient(rgba(17, 17, 17, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 17, 17, 0.06) 1px, transparent 1px)",
          backgroundSize: isDark ? "24px 24px" : "32px 32px",
        }}
      />
    </div>
  );
}



