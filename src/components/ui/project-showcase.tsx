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
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function ProjectShowcase({
  projects,
  sectionNumber,
  sectionTitle,
}: ProjectShowcaseProps) {
  const items = projects.items
  const [hovered, setHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const sx = useSpring(0, { stiffness: 210, damping: 26, mass: 0.35 })
  const sy = useSpring(0, { stiffness: 210, damping: 26, mass: 0.35 })

  const onMove: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    sx.set(e.clientX - rect.left + 24)
    sy.set(e.clientY - rect.top - 140)
  }

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={onMove}
      className="relative z-10 scroll-mt-28 border-t border-border bg-[hsl(40_20%_97%_/_0.88)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.p
          className="mb-12 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease }}
        >
          {sectionNumber} — {sectionTitle}
        </motion.p>

        <div className="relative">
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[200px] w-[min(320px,32vw)] overflow-hidden border border-border bg-muted/30 md:block"
            style={{
              x: sx,
              y: sy,
              opacity: hovered !== null ? 1 : 0,
            }}
          >
            <AnimatePresence mode="sync">
              {items.map((project, index) => (
                <motion.img
                  key={project.name}
                  src={`https://picsum.photos/seed/${slugify(project.name)}/640/420`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={{
                    opacity: hovered === index ? 1 : 0,
                    scale: hovered === index ? 1 : 1.06,
                  }}
                  transition={{ duration: 0.45, ease }}
                />
              ))}
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(var(--foreground))]/30 to-transparent" />
          </motion.div>

          <div className="space-y-0">
            {items.map((project, index) => (
              <a
                key={project.index}
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative border-t border-border py-7 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-muted/25">
                  <motion.div
                    className="pointer-events-none absolute inset-0 -mx-3 bg-muted/40"
                    initial={false}
                    animate={{
                      opacity: hovered === index ? 1 : 0,
                      scale: hovered === index ? 1 : 0.98,
                    }}
                    transition={{ duration: 0.35, ease }}
                  />
                  <div className="relative flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-10">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                          {project.index}
                        </span>
                        <h3 className="font-serif text-2xl tracking-tight text-foreground md:text-[1.65rem]">
                          <span className="relative">
                            {project.name}
                            <span
                              className="absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                              style={{ width: hovered === index ? "100%" : "0%" }}
                            />
                          </span>
                        </h3>
                        <ArrowUpRight
                          className={`h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            hovered === index
                              ? "translate-x-0 translate-y-0 opacity-100"
                              : "-translate-x-2 translate-y-2 opacity-0"
                          }`}
                          weight="regular"
                          aria-hidden
                        />
                      </div>
                      <p
                        className={`mt-2 max-w-2xl text-sm leading-relaxed transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          hovered === index ? "text-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {project.shortDescription}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-6 md:flex-col md:items-end">
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                        {project.githubStars}★
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                        Repository
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </div>
    </section>
  )
}
