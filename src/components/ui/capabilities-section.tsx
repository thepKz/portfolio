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

const rowIcon: Record<string, ReactNode> = {
  languages: <BracketsCurly className="h-4 w-4" weight="bold" aria-hidden />,
  frameworks: <TreeStructure className="h-4 w-4" weight="bold" aria-hidden />,
  tools: <CloudArrowUp className="h-4 w-4" weight="bold" aria-hidden />,
}

function clusterBlurb(id: string, description: string | undefined): string {
  if (description?.trim()) return description
  return DEFAULT_CLUSTER_COPY[id] ?? ""
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
      <div className="mx-auto max-w-[44rem] px-5 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-16 md:mb-20"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            {skills.sectionNumber} — {skills.sectionTitle}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(1.5rem,2.8vw,2.1rem)] font-medium leading-[1.18] tracking-[-0.03em] text-foreground">
            {headline}
          </h2>
          <p className="mt-5 max-w-[52ch] font-mono text-[11px] leading-[1.65] text-muted-foreground">
            {aside}
          </p>
        </motion.header>

        <div className="border-t border-[#EAEAEA]">
          {/* Languages */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05, ease }}
            className="border-b border-[#EAEAEA] py-10 md:py-12"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[hsl(var(--accent))]">{rowIcon.languages}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                {featured?.label ?? "Languages"}
              </span>
            </div>
            <ul className="mb-6 flex flex-wrap gap-2">
              {(featured?.items ?? []).map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.035, ease }}
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
            <p className="max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground">
              {clusterBlurb(featured?.id ?? "languages", featured?.description)}
            </p>
          </motion.section>

          {/* Frameworks */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="border-b border-[#EAEAEA] py-10 md:py-12"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[hsl(var(--accent))]">{rowIcon.frameworks}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                {secondary?.label ?? "Frameworks"}
              </span>
            </div>
            <ul className="mb-6 divide-y divide-[#EAEAEA] border-t border-b border-[#EAEAEA]">
              {(secondary?.items ?? []).map((item, i) => (
                <motion.li
                  key={item}
                  className="py-3.5 font-serif text-[1.05rem] tracking-tight text-foreground md:text-lg"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.12 + i * 0.04, ease }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
            <p className="max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground">
              {clusterBlurb(secondary?.id ?? "frameworks", secondary?.description)}
            </p>
          </motion.section>

          {/* Tools */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14, ease }}
            className="border-b border-[#EAEAEA] py-10 md:py-12"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[hsl(var(--accent))]">{rowIcon.tools}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                {tools?.label ?? "Tools"}
              </span>
            </div>
            <ul className="mb-6 flex flex-wrap gap-2">
              {(tools?.items ?? []).map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 4 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.14 + i * 0.025, ease }}
                >
                  <kbd className="inline-block rounded-[6px] border border-[#EAEAEA] bg-[#F9F9F8] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground">
                    {item}
                  </kbd>
                </motion.li>
              ))}
            </ul>
            <p className="max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground">
              {clusterBlurb(tools?.id ?? "tools", tools?.description)}
            </p>
          </motion.section>

          {/* Japanese */}
          <motion.footer
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18, ease }}
            className="pt-10 md:pt-12"
          >
            <div className="flex items-start gap-3">
              <Translate className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" weight="bold" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                  {jp.eyebrow}
                </p>
                <p className="mt-3 font-serif text-lg leading-snug tracking-[-0.02em] text-foreground md:text-xl">
                  {jp.title}
                </p>
                {showJpBody ? (
                  <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground">
                    {jp.body}
                  </p>
                ) : null}
                <p className="mt-6 max-w-[52ch] border-l border-[#EAEAEA] pl-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {jp.note}
                </p>
              </div>
            </div>
          </motion.footer>
        </div>
      </div>
    </section>
  )
}
