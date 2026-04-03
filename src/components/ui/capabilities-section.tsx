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

const DEFAULT_ASIDE = "Minthep · FPT University Software Engineering · GitHub: thepKz"

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
  languages:         <BracketsCurly className="h-5 w-5" weight="bold" aria-hidden />,
  frameworks:        <TreeStructure className="h-5 w-5" weight="bold" aria-hidden />,
  databases:         <Database      className="h-5 w-5" weight="bold" aria-hidden />,
  devops:            <CloudArrowUp  className="h-5 w-5" weight="bold" aria-hidden />,
  projectManagement: <Kanban        className="h-5 w-5" weight="bold" aria-hidden />,
  tools:             <CloudArrowUp  className="h-5 w-5" weight="bold" aria-hidden />,
}

// Accent color per cluster index — cycles through neon palette
const clusterAccent = [
  { color: "rgba(139,92,246,1)",  glow: "rgba(139,92,246,0.25)",  bg: "rgba(139,92,246,0.07)",  border: "rgba(139,92,246,0.15)" },
  { color: "rgba(249,115,22,1)",  glow: "rgba(249,115,22,0.22)",  bg: "rgba(249,115,22,0.06)",  border: "rgba(249,115,22,0.14)" },
  { color: "rgba(6,182,212,1)",   glow: "rgba(6,182,212,0.22)",   bg: "rgba(6,182,212,0.06)",   border: "rgba(6,182,212,0.14)" },
  { color: "rgba(251,191,36,1)",  glow: "rgba(251,191,36,0.2)",   bg: "rgba(251,191,36,0.05)",  border: "rgba(251,191,36,0.13)" },
  { color: "rgba(52,211,153,1)",  glow: "rgba(52,211,153,0.2)",   bg: "rgba(52,211,153,0.05)",  border: "rgba(52,211,153,0.13)" },
  { color: "rgba(248,113,113,1)", glow: "rgba(248,113,113,0.2)",  bg: "rgba(248,113,113,0.05)", border: "rgba(248,113,113,0.13)" },
]

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

  const clusters  = skills.clusters
  const headline  = skills.headline?.trim() || DEFAULT_HEADLINE
  const aside     = skills.aside?.trim()    || DEFAULT_ASIDE
  const jp        = skills.japanese ?? DEFAULT_JP

  return (
    <section
      id="skills"
      ref={rootRef}
      className="relative z-10 scroll-mt-28 py-24 md:py-32 px-6 md:px-10"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="rounded-2xl overflow-hidden mb-8"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
          }}
        >
          <div className="grid md:grid-cols-12">
            <div
              className="p-8 md:col-span-8 md:p-12"
              style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p className="text-sm font-mono uppercase tracking-[0.3em] text-cyan-400/60 mb-5">
                <span className="text-cyan-400 font-bold">[{skills.sectionNumber}]</span>
                <span> {skills.sectionTitle.toUpperCase()}</span>
              </p>
              <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] uppercase leading-[1.05] tracking-[-0.03em] text-white">
                {headline}
              </h2>
            </div>
            <div className="p-8 md:col-span-4 md:p-10 md:pt-12 flex items-start">
              <p className="text-base font-mono uppercase leading-relaxed tracking-[0.08em] text-white/30">
                {aside}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Clusters */}
        <div className="space-y-3">
          {clusters.map((cluster, clusterIndex) => {
            const pres    = presentationFor(cluster)
            const icon    = rowIcon[cluster.id] ?? <Stack className="h-5 w-5" weight="bold" aria-hidden />
            const accent  = clusterAccent[clusterIndex % clusterAccent.length]
            const baseDelay = 0.05 + clusterIndex * 0.06

            return (
              <motion.div
                key={cluster.id}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: baseDelay, ease }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${accent.border}`,
                }}
              >
                <div className="grid md:grid-cols-12">
                  {/* Label column */}
                  <div
                    className="flex items-center gap-3 px-6 py-5 md:col-span-3 md:px-8 md:py-8"
                    style={{
                      background: accent.bg,
                      borderRight: `1px solid ${accent.border}`,
                    }}
                  >
                    <span style={{ color: accent.color, filter: `drop-shadow(0 0 8px ${accent.glow})` }}>
                      {icon}
                    </span>
                    <span
                      className="text-sm font-mono font-bold uppercase tracking-[0.15em]"
                      style={{ color: accent.color }}
                    >
                      {cluster.label}
                    </span>
                  </div>

                  {/* Items column */}
                  <div className="px-6 py-7 md:col-span-9 md:px-10 md:py-9">
                    {pres === "tags" && (
                      <ul className="flex flex-wrap gap-2">
                        {cluster.items.map((item, i) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.35, delay: baseDelay + 0.04 + i * 0.025, ease }}
                          >
                            <span
                              className="inline-block px-3.5 py-2 text-sm font-mono font-semibold uppercase tracking-[0.1em] rounded-lg transition-all duration-200 cursor-default"
                              style={{
                                background: accent.bg,
                                border: `1px solid ${accent.border}`,
                                color: accent.color,
                              }}
                            >
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {pres === "list" && (
                      <ul className="space-y-0" style={{ borderTop: `1px solid ${accent.border}`, borderBottom: `1px solid ${accent.border}` }}>
                        {cluster.items.map((item, i) => (
                          <motion.li
                            key={item}
                            className="py-4 text-base font-mono font-medium uppercase tracking-[0.06em]"
                            style={{
                              color: "rgba(255,255,255,0.7)",
                              borderBottom: i < cluster.items.length - 1 ? `1px solid ${accent.border}` : undefined,
                            }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: baseDelay + 0.06 + i * 0.04, ease }}
                          >
                            <span style={{ color: accent.color, marginRight: "0.75rem" }}>→</span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {pres === "kbd" && (
                      <ul className="flex flex-wrap gap-2">
                        {cluster.items.map((item, i) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, y: 6 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.35, delay: baseDelay + 0.05 + i * 0.025, ease }}
                          >
                            <kbd
                              className="inline-block px-3 py-2 text-sm font-mono font-semibold uppercase tracking-[0.1em] rounded-lg"
                              style={{
                                background: "rgba(255,255,255,0.04)",
                                border: `1px solid ${accent.border}`,
                                color: "rgba(255,255,255,0.65)",
                                boxShadow: `0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
                              }}
                            >
                              {item}
                            </kbd>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Languages footer */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 + clusters.length * 0.06 + 0.06, ease }}
            className="rounded-xl p-7 md:p-10"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(249,115,22,0.08) 100%)",
              border: "1px solid rgba(139,92,246,0.2)",
              boxShadow: "0 0 40px rgba(139,92,246,0.1)",
            }}
          >
            <div className="flex items-start gap-4">
              <Translate
                className="mt-0.5 h-6 w-6 shrink-0"
                weight="bold"
                aria-hidden
                style={{ color: "rgba(139,92,246,0.9)", filter: "drop-shadow(0 0 8px rgba(139,92,246,0.5))" }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-mono font-semibold uppercase tracking-[0.25em] text-violet-400/60 mb-4">
                  [ {jp.eyebrow.toUpperCase()} ]
                </p>
                <p className="text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">
                  {jp.title}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
