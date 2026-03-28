"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import {
  BracketsCurly,
  Translate,
  TreeStructure,
  CloudArrowUp,
  Database,
  Kanban,
  Stack,
} from "@phosphor-icons/react"

import type { PortfolioJson } from "@/types/portfolio"

const ease = [0.16, 1, 0.3, 1] as const

const DEFAULT_HEADLINE =
  "Two disciplines, one rhythm: code and Japanese both reward patience."

const DEFAULT_ASIDE =
  "Minthep doubles as a study surface — IT depth, language texture, nothing loud."

const DEFAULT_JP: NonNullable<PortfolioJson["skills"]["japanese"]> = {
  eyebrow: "Japanese study track",
  title: "Vocabulary drills, reading sessions, and kanji repetition — logged alongside shipping code.",
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

const tagPastels = [
  { bg: "#E1F3FE", fg: "#1F6C9F" },
  { bg: "#EDF3EC", fg: "#346538" },
  { bg: "#FBF3DB", fg: "#956400" },
  { bg: "#FDEBEC", fg: "#9F2F2D" },
] as const

function pastelForIndex(i: number) {
  return tagPastels[i % tagPastels.length]
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
      className="relative z-10 scroll-mt-28 border-t border-border bg-[hsl(40_20%_97%_/_0.88)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[44rem] px-5 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-16 md:mb-20"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em]">
            <span className="font-semibold tabular-nums text-[hsl(var(--accent))]">{skills.sectionNumber}</span>
            <span className="text-muted-foreground"> — {skills.sectionTitle}</span>
          </p>
          <h2 className="mt-4 font-serif text-[clamp(1.55rem,2.9vw,2.2rem)] font-semibold leading-[1.16] tracking-[-0.03em] text-foreground">
            {headline}
          </h2>
          <p className="mt-5 max-w-[52ch] font-mono text-[11px] leading-[1.65] text-muted-foreground">
            {aside}
          </p>
        </motion.header>

        <div className="border-t border-[#EAEAEA]">
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
                className="border-b border-[#EAEAEA] py-10 md:py-12"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[hsl(var(--accent))]">{icon}</span>
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground">
                    {cluster.label}
                  </span>
                </div>

                {pres === "tags" ? (
                  <ul className="mb-6 flex flex-wrap gap-2">
                    {cluster.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 6 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: baseDelay + 0.04 + i * 0.035,
                          ease,
                        }}
                      >
                        <span
                          className="inline-block rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.04em]"
                          style={{
                            backgroundColor: pastelForIndex(i).bg,
                            color: pastelForIndex(i).fg,
                          }}
                        >
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                ) : null}

                {pres === "list" ? (
                  <ul className="mb-6 divide-y divide-[#EAEAEA] border-t border-b border-[#EAEAEA]">
                    {cluster.items.map((item, i) => (
                      <motion.li
                        key={item}
                        className="py-3.5 font-serif text-[1.05rem] tracking-tight text-foreground md:text-lg"
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
                  <ul className="mb-6 flex flex-wrap gap-2">
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
                        <kbd className="inline-block rounded-[6px] border border-[#EAEAEA] bg-[#F9F9F8] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground">
                          {item}
                        </kbd>
                      </motion.li>
                    ))}
                  </ul>
                ) : null}
              </motion.section>
            )
          })}

          <motion.footer
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 + clusters.length * 0.04 + 0.06, ease }}
            className="pt-10 md:pt-12"
          >
            <div className="flex items-start gap-3">
              <Translate className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" weight="bold" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
                  {jp.eyebrow}
                </p>
                <p className="mt-3 font-serif text-lg font-medium leading-snug tracking-[-0.02em] text-foreground md:text-xl">
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
