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
    sx.set(e.clientX - rect.left + 20)
    sy.set(e.clientY - rect.top - 120)
  }

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={onMove}
      className="relative z-10 scroll-mt-28 border-b-2 border-[#0a0a0a] bg-[#F4F4F0] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <motion.div
          className="border-2 border-[#0a0a0a] bg-[#eae8e3] px-6 py-6 md:px-10 md:py-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease }}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#E61919]">
            <span className="font-semibold tabular-nums">[{sectionNumber}]</span>
            <span className="text-[#3d3d3d]"> {sectionTitle.toUpperCase()}</span>
          </p>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#3d3d3d]">
            /// DEPLOYMENT LOG · SELECT ENTRY TO OPEN
          </p>
        </motion.div>

        <div className="relative mt-0 border-2 border-t-0 border-[#0a0a0a]">
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[180px] w-[min(280px,28vw)] overflow-hidden border-2 border-[#0a0a0a] bg-[#0a0a0a] md:block"
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
                  className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale"
                  initial={false}
                  animate={{
                    opacity: hovered === index ? 1 : 0,
                    scale: hovered === index ? 1 : 1.04,
                  }}
                  transition={{ duration: 0.45, ease }}
                />
              ))}
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 border-t-2 border-[#E61919] bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
          </motion.div>

          <div>
            {items.map((project, index) => (
              <a
                key={project.index}
                href={project.links.live ?? project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-b-2 border-[#0a0a0a] last:border-b-0"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={cnPanel(hovered === index)}>
                  <div className="grid gap-6 px-6 py-8 md:grid-cols-12 md:items-start md:gap-8 md:px-10 md:py-10">
                    <div className="md:col-span-8">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                        <span className="font-mono text-[10px] font-bold tabular-nums tracking-[0.14em] text-[#E61919]">
                          {project.index}
                        </span>
                        <h3 className="font-display text-xl uppercase leading-none tracking-[-0.02em] md:text-2xl">
                          <span className="relative inline-block">
                            {project.name}
                            <span
                              className="absolute bottom-0 left-0 h-[3px] bg-[#E61919] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                              style={{ width: hovered === index ? "100%" : "0%" }}
                            />
                          </span>
                        </h3>
                        <ArrowUpRight
                          className={`h-4 w-4 shrink-0 transition-[transform,opacity,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            hovered === index
                              ? "translate-x-0 translate-y-0 text-[#E61919] opacity-100"
                              : "-translate-x-2 translate-y-2 text-[#8a8a8a] opacity-0"
                          }`}
                          weight="bold"
                          aria-hidden
                        />
                      </div>
                      <p
                        className={`mt-4 max-w-2xl text-sm leading-relaxed transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-[15px] ${
                          hovered === index ? "text-[#111]" : "text-[#3d3d3d]"
                        }`}
                      >
                        {project.shortDescription}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 border-t-2 border-[#0a0a0a] pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-[#3d3d3d] md:col-span-4 md:border-t-0 md:pt-0 md:text-right">
                      {project.githubStars > 0 ? (
                        <span className="tabular-nums text-[#0a0a0a] md:ml-auto md:block">
                          {project.githubStars} STARS
                        </span>
                      ) : null}
                      <span
                        className={
                          hovered === index ? "font-semibold text-[#E61919]" : ""
                        }
                      >
                        {project.links.live ? "LIVE URL" : "REPOSITORY"}
                      </span>
                      <ul className="flex flex-wrap gap-2 md:justify-end">
                        {project.tech.slice(0, 6).map((t) => (
                          <li key={t}>
                            <span className="inline-block border border-[#0a0a0a] px-2 py-1 text-[8px] tracking-[0.12em]">
                              {t}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function cnPanel(active: boolean) {
  return [
    "relative transition-[background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    active ? "bg-[#eae8e3]" : "bg-[#F4F4F0]",
  ].join(" ")
}
