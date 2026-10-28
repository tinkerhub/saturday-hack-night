/**
 * Re-export Framer Motion's lightweight `m` component as `motion`.
 * All components should import from here instead of 'framer-motion' directly.
 * Combined with MotionProvider (LazyMotion + domAnimation), this reduces
 * the Framer Motion bundle by ~75% — critical for low-bandwidth mobile users.
 */
export {
  m as motion,
  AnimatePresence,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
