"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Wraps the app with LazyMotion + domAnimation.
 * All `m.*` components (re-exported as `motion` from lib/motion.ts)
 * will use these lazily-loaded features, reducing initial JS payload.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}


