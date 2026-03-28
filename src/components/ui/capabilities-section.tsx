"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import {
  BracketsCurly,
  Translate,
  TreeStructure,
  CloudArrowUp,
} from "@phosphor-icons/react"

import type { PortfolioJson } from "@/types/portfolio"

const ease = [0.16, 1, 0.3, 1] as const

const DEFAULT_HEADLINE =
  "Two disciplines, one rhythm: code and Japanese both reward patience."

const DEFAULT_ASIDE =
  "Minthep doubles as a study surface — IT depth, language texture, nothing loud."

const DEFAULT_CLUSTER_COPY: Record<string, string> = {
  languages:
    "Typed interfaces, predictable components, readable CSS — the foundation for every interface experiment.",
  frameworks:
    "Client work in React, services with Node, styling with Tailwind, spatial ideas with Three.js.",
  tools:
    "From repo to deploy: containers, databases, editor, and the APIs that glue services together.",
}

const DEFAULT_JP: NonNullable<PortfolioJson["skills"]["japanese"]> = {
  eyebrow: "Japanese study track",
  title: "Vocabulary drills, reading sessions, and kanji repetition — logged alongside shipping code.",
  body: "",
  note: "Not a badge. A habit. The same focus applied to grammar patterns and pull requests.",
}

type CapabilitiesSectionProps = {
  skills: PortfolioJson["skills"]
}

const accentTiles: Record<string, ReactNode> = {
  languages: <BracketsCurly className="h-5 w-5" weight="bold" aria-hidden />,
  frameworks: <TreeStructure className="h-5 w-5" weight="bold" aria-hidden />,
  tools: <CloudArrowUp className="h-5 w-5" weight="bold" aria-hidden />,
  japanese: <Translate className="h-5 w-5" weight="bold" aria-hidden />,
}

function clusterBlurb(
  id: string,
  description: string | undefined,
): string {
  if (description?.trim()) return description
  return DEFAULT_CLUSTER_COPY[id] ?? ""
}

export function CapabilitiesSection({ skills }: CapabilitiesSectionProps) {
  const rootRef = useRef<HTMLElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.15 })

  const clusters = skills.clusters
  const featured = clusters[0]
  const secondary = clusters[1]
  const tools = clusters[2]

  const headline = skills.headline?.trim() || DEFAULT_HEADLINE
  const aside = skills.aside?.trim() || DEFAULT_ASIDE
  const jp = skills.japanese ?? DEFAULT_JP
  const showJpBody = jp.body.trim() && jp.body.trim() !== jp.title.trim()

  return (
    <section
      id="skills"
      ref={rootRef}
      className="relative z-10 scroll-mt-28 border-t border-border bg-[hsl(40_20%_97%_/_0.88)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {skills.sectionNumber} — {skills.sectionTitle}
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.65rem,3.2vw,2.45rem)] font-medium leading-[1.12] tracking-[-0.03em] text-foreground">
              {headline}
            </h2>
          </div>
          <p className="max-w-[280px] font-mono text-[11px] leading-relaxed text-muted-foreground md:text-right">
            {aside}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-12 md:grid-rows-[auto_auto]">
          <motion.article
            className="relative bg-background p-8 md:col-span-7 md:row-span-2 md:p-12"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease }}
          >
            <div className="relative flex flex-col gap-8">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 border border-border bg-muted/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  {accentTiles.languages}
                  {featured?.label ?? "Languages"}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground">01</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {(featured?.items ?? []).map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.12 + i * 0.04, ease }}
                  >
                    <span className="inline-block border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground transition-colors duration-300 hover:border-foreground">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                {clusterBlurb(featured?.id ?? "languages", featured?.description)}
              </p>
            </div>
          </motion.article>

          <motion.article
            className="bg-background p-8 md:col-span-5 md:p-10"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {accentTiles.frameworks}
                {secondary?.label ?? "Frameworks"}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">02</span>
            </div>
            <ul className="mt-6 space-y-3">
              {(secondary?.items ?? []).map((item, i) => (
                <motion.li
                  key={item}
                  className="group flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.18 + i * 0.05, ease }}
                >
                  <span className="min-w-0 font-serif text-lg tracking-tight text-foreground transition-colors group-hover:text-[hsl(var(--accent))]">
                    {item}
                  </span>
                  <span className="h-px w-8 shrink-0 bg-border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-12 group-hover:bg-[hsl(var(--accent))]" />
                </motion.li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {clusterBlurb(secondary?.id ?? "frameworks", secondary?.description)}
            </p>
          </motion.article>

          <motion.article
            className="bg-muted/25 p-8 md:col-span-5 md:p-10"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {accentTiles.tools}
                {tools?.label ?? "Tools"}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">03</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(tools?.items ?? []).map((item, i) => (
                <motion.span
                  key={item}
                  className="border border-border bg-background px-2.5 py-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-300 hover:border-foreground hover:text-foreground"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.22 + i * 0.03, ease }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {clusterBlurb(tools?.id ?? "tools", tools?.description)}
            </p>
          </motion.article>

          <motion.aside
            className="flex flex-col justify-between border-t border-border bg-[hsl(40,18%,96%)] p-8 md:col-span-12 md:flex-row md:items-start md:gap-14 md:border-t-0 md:p-10"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.24, ease }}
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 text-[hsl(var(--accent))]">{accentTiles.japanese}</div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                  {jp.eyebrow}
                </p>
                <p className="mt-2 max-w-lg font-serif text-xl leading-snug tracking-[-0.02em] text-foreground md:text-[1.35rem]">
                  {jp.title}
                </p>
                {showJpBody ? (
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{jp.body}</p>
                ) : null}
              </div>
            </div>
            <p className="mt-8 max-w-xs font-mono text-[11px] leading-relaxed text-muted-foreground md:mt-1 md:text-right">
              {jp.note}
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
