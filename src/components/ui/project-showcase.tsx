"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, AnimatePresence, useSpring } from "framer-motion"
import { ArrowUpRight } from "@phosphor-icons/react"

import type { PortfolioJson } from "@/types/portfolio"

const ease = [0.16, 1, 0.3, 1] as const

type ProjectShowcaseProps = {
  projects: PortfolioJson["projects"]
  sectionNumber: string
  sectionTitle: string
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

// Each project row gets a neon hue on hover
const projectAccents = [
  { color: "rgba(139,92,246,1)",  glow: "rgba(139,92,246,0.35)",  bar: "#8b5cf6", border: "rgba(139,92,246,0.25)" },
  { color: "rgba(249,115,22,1)",  glow: "rgba(249,115,22,0.32)",  bar: "#f97316", border: "rgba(249,115,22,0.22)" },
  { color: "rgba(6,182,212,1)",   glow: "rgba(6,182,212,0.3)",    bar: "#06b6d4", border: "rgba(6,182,212,0.2)" },
  { color: "rgba(251,191,36,1)",  glow: "rgba(251,191,36,0.28)",  bar: "#fbbf24", border: "rgba(251,191,36,0.18)" },
  { color: "rgba(52,211,153,1)",  glow: "rgba(52,211,153,0.28)",  bar: "#34d399", border: "rgba(52,211,153,0.18)" },
]

export function ProjectShowcase({ projects, sectionNumber, sectionTitle }: ProjectShowcaseProps) {
  const items = projects.items
  const [hovered, setHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const sx = useSpring(0, { stiffness: 210, damping: 26, mass: 0.35 })
  const sy = useSpring(0, { stiffness: 210, damping: 26, mass: 0.35 })

  const onMove: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    sx.set(e.clientX - rect.left + 20)
    sy.set(e.clientY - rect.top - 120)
  }

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={onMove}
      className="relative z-10 scroll-mt-28 py-24 md:py-32 px-6 md:px-10"
    >
      {/* Section ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header */}
        <motion.div
          className="rounded-2xl px-8 py-7 md:px-10 md:py-8 mb-4"
          style={{
            background: "rgba(249,115,22,0.06)",
            border: "1px solid rgba(249,115,22,0.15)",
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease }}
        >
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-orange-400/60 mb-2">
            <span className="text-orange-400 font-bold">[{sectionNumber}]</span>
            <span> {sectionTitle.toUpperCase()}</span>
          </p>
          <p className="text-sm font-mono uppercase tracking-[0.18em] text-white/25">
            /// DEPLOYMENT LOG · SELECT ENTRY TO OPEN
          </p>
        </motion.div>

        {/* Project list */}
        <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Floating preview image */}
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
            style={{
              x: sx,
              y: sy,
              opacity: hovered !== null ? 1 : 0,
              width: "min(280px, 28vw)",
              height: "180px",
              borderRadius: "12px",
              overflow: "hidden",
              border: hovered !== null ? `1px solid ${projectAccents[hovered % projectAccents.length].border}` : "none",
              boxShadow: hovered !== null ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${projectAccents[hovered % projectAccents.length].glow}` : "none",
            }}
          >
            <AnimatePresence mode="sync">
              {items.map((project, index) => (
                <motion.img
                  key={project.name}
                  src={`https://picsum.photos/seed/${slugify(project.name)}/640/420`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: "brightness(0.75) saturate(1.2)" }}
                  initial={false}
                  animate={{ opacity: hovered === index ? 1 : 0, scale: hovered === index ? 1 : 1.04 }}
                  transition={{ duration: 0.45, ease }}
                />
              ))}
            </AnimatePresence>
            {hovered !== null && (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)`,
                  borderTop: `2px solid ${projectAccents[hovered % projectAccents.length].bar}`,
                }}
              />
            )}
          </motion.div>

          {/* Rows */}
          {items.map((project, index) => {
            const accent = projectAccents[index % projectAccents.length]
            const isHovered = hovered === index

            return (
              <a
                key={project.index}
                href={project.links.live ?? project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                style={{
                  borderBottom: index < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined,
                  background: isHovered ? accent.bg ?? "rgba(255,255,255,0.03)" : "transparent",
                  transition: "background 0.3s cubic-bezier(0.16,1,0.3,1)",
                  // @ts-ignore
                  "--accent-bg": accent.glow,
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Neon left border on hover */}
                <div
                  className="absolute left-0 top-0 h-full w-[3px] transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${accent.bar}, transparent)`,
                    opacity: isHovered ? 1 : 0,
                    boxShadow: isHovered ? `0 0 12px ${accent.glow}` : "none",
                  }}
                />

                <div className="grid gap-6 px-8 py-9 md:grid-cols-12 md:items-start md:gap-8 md:px-10 md:py-11 relative">
                  <div className="md:col-span-8">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-4">
                      <span
                        className="text-sm font-mono font-bold tabular-nums tracking-[0.14em] transition-colors duration-300"
                        style={{ color: isHovered ? accent.color : "rgba(255,255,255,0.25)" }}
                      >
                        {project.index}
                      </span>
                      <h3 className="font-display text-2xl uppercase leading-none tracking-[-0.025em] text-white md:text-3xl">
                        <span className="relative inline-block">
                          {project.name}
                          {/* Underline reveal */}
                          <span
                            className="absolute -bottom-1 left-0 h-[2px] rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{
                              width: isHovered ? "100%" : "0%",
                              background: accent.bar,
                              boxShadow: isHovered ? `0 0 10px ${accent.glow}` : "none",
                            }}
                          />
                        </span>
                      </h3>
                      <ArrowUpRight
                        className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                          isHovered ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-2 translate-y-2 opacity-0"
                        }`}
                        style={{ color: accent.color }}
                        weight="bold"
                        aria-hidden
                      />
                    </div>
                    <p
                      className="text-base leading-relaxed max-w-2xl transition-colors duration-300"
                      style={{ color: isHovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.4)" }}
                    >
                      {project.shortDescription}
                    </p>
                  </div>

                  <div
                    className="flex flex-col gap-3 pt-4 md:col-span-4 md:pt-0 md:items-end"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {project.githubStars > 0 && (
                      <span
                        className="text-sm font-mono font-bold tabular-nums tracking-[0.1em] transition-colors duration-300"
                        style={{ color: isHovered ? accent.color : "rgba(255,255,255,0.35)" }}
                      >
                        ⭐ {project.githubStars} STARS
                      </span>
                    )}
                    <span
                      className="text-sm font-mono uppercase tracking-[0.15em] transition-colors duration-300"
                      style={{ color: isHovered ? accent.color : "rgba(255,255,255,0.25)" }}
                    >
                      {project.links.live ? "LIVE URL" : "REPOSITORY"}
                    </span>
                    <ul className="flex flex-wrap gap-1.5 md:justify-end">
                      {project.tech.slice(0, 6).map((t) => (
                        <li key={t}>
                          <span
                            className="inline-block px-2.5 py-1 text-xs font-mono uppercase tracking-[0.1em] rounded-md transition-all duration-300"
                            style={{
                              background: isHovered ? `${accent.bg ?? "rgba(255,255,255,0.04)"}` : "rgba(255,255,255,0.03)",
                              border: `1px solid ${isHovered ? accent.border : "rgba(255,255,255,0.07)"}`,
                              color: isHovered ? accent.color : "rgba(255,255,255,0.35)",
                            }}
                          >
                            {t}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
