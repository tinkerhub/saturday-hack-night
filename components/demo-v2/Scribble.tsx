import { demoColors } from "./tokens";

export default function Scribble({
  text,
  className = "",
  color = "pink",
  rotate = -6,
}: {
  text: string;
  className?: string;
  color?: "pink" | "green";
  rotate?: number;
}) {
  return (
    <span
      className={`font-[var(--font-caveat)] text-xl md:text-2xl select-none ${className}`}
      style={{
        color: color === "pink" ? demoColors.pink : demoColors.green,
        transform: `rotate(${rotate}deg)`,
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );
}


