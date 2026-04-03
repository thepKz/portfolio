"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import {
  BracketsCurly,
  CloudArrowUp,
  Database,
  Kanban,
  Stack,
  Translate,
  TreeStructure,
} from "@phosphor-icons/react"

import type { PortfolioJson } from "@/types/portfolio"

const ease = [0.16, 1, 0.3, 1] as const

const DEFAULT_HEADLINE =
  "Languages, frameworks, data stores, and delivery — grouped the way they show up in repos and coursework."

const DEFAULT_ASIDE =
  "Minthep · FPT University Software Engineering · GitHub: thepKz"

const DEFAULT_JP: NonNullable<PortfolioJson["skills"]["japanese"]> = {
  eyebrow: "Human languages",
  title: "English (B2) · Japanese (N4) · Korean (TOPIK II)",
  body: "",
  note: "",
}

type CapabilitiesSectionProps = {
  skills: PortfolioJson["skills"]
}

const rowIcon: Record<string, ReactNode> = {
  languages: <BracketsCurly className="h-4 w-4" weight="bold" aria-hidden />,
  frameworks: <TreeStructure className="h-4 w-4" weight="bold" aria-hidden />,
  databases: <Database className="h-4 w-4" weight="bold" aria-hidden />,
  devops: <CloudArrowUp className="h-4 w-4" weight="bold" aria-hidden />,
  projectManagement: <Kanban className="h-4 w-4" weight="bold" aria-hidden />,
  tools: <CloudArrowUp className="h-4 w-4" weight="bold" aria-hidden />,
}

function presentationFor(
  cluster: PortfolioJson["skills"]["clusters"][number],
): "tags" | "list" | "kbd" {
  if (cluster.presentation) return cluster.presentation
  if (cluster.id === "languages") return "tags"
  if (cluster.id === "frameworks") return "list"
  return "kbd"
}

export function CapabilitiesSection({ skills }: CapabilitiesSectionProps) {
  const rootRef = useRef<HTMLElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.12 })

  const clusters = skills.clusters
  const headline = skills.headline?.trim() || DEFAULT_HEADLINE
  const aside = skills.aside?.trim() || DEFAULT_ASIDE
  const jp = skills.japanese ?? DEFAULT_JP

  return (
    <section
      id="skills"
      ref={rootRef}
      className="relative z-10 scroll-mt-28 border-b-2 border-[#0a0a0a] bg-[#F4F4F0] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="border-2 border-[#0a0a0a] bg-[#eae8e3] p-6 md:grid md:grid-cols-12 md:gap-0 md:p-0"
        >
          <div className="md:col-span-8 md:border-r-2 md:border-[#0a0a0a] md:p-10 lg:p-12">
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#E61919]">
              <span className="font-semibold tabular-nums">[{skills.sectionNumber}]</span>
              <span className="text-[#3d3d3d]"> {skills.sectionTitle.toUpperCase()}</span>
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.35rem,2.8vw,2rem)] uppercase leading-[1.08] tracking-[-0.025em]">
              {headline}
            </h2>
          </div>
          <div className="mt-6 border-t-2 border-[#0a0a0a] pt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-[#3d3d3d] md:col-span-4 md:mt-0 md:border-t-0 md:p-10 md:pt-10">
            {aside}
          </div>
        </motion.header>

        <div className="mt-12 space-y-0 border-2 border-[#0a0a0a]">
          {clusters.map((cluster, clusterIndex) => {
            const pres = presentationFor(cluster)
            const icon =
              rowIcon[cluster.id] ?? <Stack className="h-4 w-4" weight="bold" aria-hidden />
            const baseDelay = 0.05 + clusterIndex * 0.04

            return (
              <motion.section
                key={cluster.id}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: baseDelay, ease }}
                className="border-b-2 border-[#0a0a0a] last:border-b-0"
              >
                <div className="grid gap-0 md:grid-cols-12">
                  <div className="flex items-center gap-3 border-b-2 border-[#0a0a0a] bg-[#eae8e3] px-6 py-5 md:col-span-4 md:border-b-0 md:border-r-2 md:px-8">
                    <span className="text-[#E61919]">{icon}</span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]">
                      {cluster.label}
                    </span>
                  </div>
                  <div className="px-6 py-8 md:col-span-8 md:px-10 md:py-10">
                    {pres === "tags" ? (
                      <ul className="flex flex-wrap gap-2">
                        {cluster.items.map((item, i) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, y: 6 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                              duration: 0.4,
                              delay: baseDelay + 0.04 + i * 0.03,
                              ease,
                            }}
                          >
                            <span className="inline-block border-2 border-[#0a0a0a] bg-[#F4F4F0] px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    ) : null}

                    {pres === "list" ? (
                      <ul className="divide-y-2 divide-[#0a0a0a] border-y-2 border-[#0a0a0a]">
                        {cluster.items.map((item, i) => (
                          <motion.li
                            key={item}
                            className="py-3.5 font-mono text-sm font-medium uppercase tracking-[0.06em] text-[#0a0a0a] md:text-[15px]"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{
                              duration: 0.4,
                              delay: baseDelay + 0.06 + i * 0.04,
                              ease,
                            }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    ) : null}

                    {pres === "kbd" ? (
                      <ul className="flex flex-wrap gap-2">
                        {cluster.items.map((item, i) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, y: 4 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                              duration: 0.35,
                              delay: baseDelay + 0.05 + i * 0.025,
                              ease,
                            }}
                          >
                            <kbd className="inline-block border-2 border-[#0a0a0a] bg-[#eae8e3] px-2.5 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em]">
                              {item}
                            </kbd>
                          </motion.li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </motion.section>
            )
          })}

          <motion.footer
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 + clusters.length * 0.04 + 0.06, ease }}
            className="border-t-2 border-[#0a0a0a] bg-[#0a0a0a] px-6 py-8 text-[#F4F4F0] md:px-10 md:py-10"
          >
            <div className="flex items-start gap-3">
              <Translate className="mt-0.5 h-4 w-4 shrink-0 text-[#E61919]" weight="bold" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[#E61919]">
                  [ {jp.eyebrow.toUpperCase()} ]
                </p>
                <p className="mt-4 font-sans text-base font-semibold leading-snug tracking-tight md:text-lg">
                  {jp.title}
                </p>
              </div>
            </div>
          </motion.footer>
        </div>
      </div>
    </section>
  )
}
