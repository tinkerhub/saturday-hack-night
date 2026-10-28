import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Caveat } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import GridBackdrop from "@/components/ui/GridBackdrop";
import "./globals.css";

// Satoshi is not on Google Fonts, so it can't go through next/font/google.
// It's loaded via Fontshare's hosted stylesheet below (weights 500 + 700,
// matching normal text / heading use) and wired into --font-sans /
// --font-display in globals.css. To fully self-host instead, drop the
// Satoshi .woff2 files into /public/fonts and swap this for next/font/local.
const SATOSHI_STYLESHEET_URL =
  "https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false, // only used for code/data elements, defer it
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["500", "600", "700"],
  preload: false, // only used for small handwritten annotations
});

export const metadata: Metadata = {
  title: "Saturday Hack Night — TinkerHub",
  description:
    "Stop watching. Start building. Join TinkerHub's weekly maker sprint every Saturday at 6 PM. Free, open to all, no experience needed.",
  keywords: ["hackathon", "TinkerHub", "maker", "hardware", "software", "Kerala", "students"],
  openGraph: {
    title: "Saturday Hack Night — TinkerHub",
    description: "Build something real. Every Saturday. 6 PM. Free.",
    type: "website",
    url: "https://shnwebsitedemo.vercel.app",
    siteName: "Saturday Hack Night",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saturday Hack Night — TinkerHub",
    description: "Build something real. Every Saturday. 6 PM. Free.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // allow user zoom — accessibility requirement
  themeColor: "#f5f4ee",
  colorScheme: "only light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href={SATOSHI_STYLESHEET_URL} />
      </head>
      <body>
        {/* Skip to main content — first focusable element on page */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <GridBackdrop />
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}


