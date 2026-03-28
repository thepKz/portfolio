"use client"

import { useEffect, useMemo, useState } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

/** Deterministic vertical path: wobbly line top → bottom (editorial scribble). */
function buildScribblePath(height: number, segments: number): string {
  if (height <= 0) return "M 50 0 L 50 0"
  const mid = 50
  const dy = height / segments
  let d = `M ${mid} 0`
  let x = mid
  for (let i = 1; i <= segments; i++) {
    const y = i * dy
    const noise =
      Math.sin(i * 1.73) * 14 +
      Math.cos(i * 0.61) * 10 +
      Math.sin(i * 2.91 + 0.4) * 6
    const nx = Math.min(90, Math.max(10, mid + noise))
    const c1x = x + Math.sin(i * 0.92) * 19
    const c1y = y - dy * 0.62
    const c2x = nx + Math.cos(i * 1.18) * 15
    const c2y = y - dy * 0.22
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${nx.toFixed(2)} ${y.toFixed(2)}`
    x = nx
  }
  return d
}

export function PageScribble() {
  const reduce = useReducedMotion()
  const [docH, setDocH] = useState(0)

  useEffect(() => {
    const read = () => {
      const el = document.documentElement
      setDocH(Math.max(el.scrollHeight, el.clientHeight))
    }
    read()
    const ro = new ResizeObserver(read)
    ro.observe(document.documentElement)
    window.addEventListener("resize", read)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", read)
    }
  }, [])

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 38,
    damping: 28,
    mass: 0.35,
  })
  const pathLen = useTransform(progress, [0, 1], [0, 1])

  const segments = useMemo(
    () => Math.min(120, Math.max(28, Math.ceil(docH / 48))),
    [docH],
  )
  const d = useMemo(() => buildScribblePath(docH || 800, segments), [docH, segments])

  if (reduce || docH < 400) return null

  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-0 w-[min(4.5rem,11vw)] overflow-visible md:w-[min(5.5rem,9vw)]"
      style={{ height: docH }}
      aria-hidden
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 100 ${docH || 800}`}
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <motion.path
          d={d}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeOpacity={0.38}
          strokeWidth={0.85}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLen }}
        />
      </svg>
    </div>
  )
}
