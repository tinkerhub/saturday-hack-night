import type { Metadata } from "next";
import localFont from "next/font/local";

const caveat = localFont({
  src: "../fonts/Caveat-Variable-latin.woff2",
  variable: "--font-caveat",
  display: "swap",
  weight: "500 700",
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


