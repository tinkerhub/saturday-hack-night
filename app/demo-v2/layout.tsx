import type { Metadata } from "next";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Visual Direction Prototype — Saturday Hack Night",
  robots: { index: false, follow: false },
};

export default function DemoV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${caveat.variable} min-h-screen`} style={{ backgroundColor: "#000000" }}>
      {children}
    </div>
  );
}


