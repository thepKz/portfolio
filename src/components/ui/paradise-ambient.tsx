"use client"

import { motion, useReducedMotion } from "framer-motion"

/**
 * Fixed, GPU-safe ambient field — warm champagne / blush mist (fashion editorial).
 * Respects prefers-reduced-motion.
 */
export function ParadiseAmbient() {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[hsl(40,22%,97%)]"
        aria-hidden
      />
    )
  }

  const blob = (
    className: string,
    animate: { x: number[]; y: number[]; scale: number[] },
    duration: number,
    delay = 0,
  ) => (
    <motion.div
      className={`pointer-events-none absolute rounded-full mix-blend-multiply blur-[100px] md:blur-[120px] ${className}`}
      initial={{ x: 0, y: 0, scale: 1, opacity: 0.55 }}
      animate={{
        x: animate.x,
        y: animate.y,
        scale: animate.scale,
        opacity: [0.42, 0.52, 0.44, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
        ease: [0.45, 0, 0.55, 1],
      }}
      style={{ willChange: "transform, opacity" }}
    />
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden bg-[hsl(40,22%,97%)]" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(35,42%,94%),transparent_55%)] opacity-90" />
      {blob(
        "left-[-20%] top-[-10%] h-[min(85vw,720px)] w-[min(85vw,720px)] bg-[hsl(28,38%,90%)]",
        { x: [0, 42, -28, 0], y: [0, 36, -22, 0], scale: [1, 1.08, 0.96, 1] },
        42,
        0,
      )}
      {blob(
        "right-[-25%] top-[15%] h-[min(90vw,680px)] w-[min(90vw,680px)] bg-[hsl(18,32%,88%)]",
        { x: [0, -38, 24, 0], y: [0, -32, 28, 0], scale: [1, 0.94, 1.06, 1] },
        48,
        2,
      )}
      {blob(
        "bottom-[-20%] left-[10%] h-[min(95vw,760px)] w-[min(95vw,760px)] bg-[hsl(38,28%,92%)]",
        { x: [0, -30, 40, 0], y: [0, -40, 18, 0], scale: [1, 1.05, 0.98, 1] },
        52,
        1,
      )}
      {blob(
        "bottom-[5%] right-[5%] h-[min(70vw,520px)] w-[min(70vw,520px)] bg-[hsl(200,18%,91%)]",
        { x: [0, 28, -34, 0], y: [0, 22, -26, 0], scale: [1, 0.97, 1.04, 1] },
        38,
        3,
      )}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[220vmax] w-[220vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(32, 30%, 90%) 52deg, transparent 104deg, hsl(200, 14%, 91%) 200deg, transparent 280deg)`,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 140, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}
