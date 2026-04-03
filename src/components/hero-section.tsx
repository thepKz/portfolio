"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { PortfolioJson } from "@/types/portfolio"

const ease = [0.16, 1, 0.3, 1] as const

type HeroSectionProps = {
  hero: PortfolioJson["hero"]
  identity: PortfolioJson["identity"]
}

export function HeroSection({ hero, identity }: HeroSectionProps) {
  const reduce = useReducedMotion()
  const first = hero.nameLines[0] ?? ""
  const secondLine = hero.nameLines[1]
  const yOff = reduce ? 0 : 20

  return (
    <section
      id="hero"
      className="relative z-10 min-h-[100dvh] border-b-2 border-[#0a0a0a] bg-[#F4F4F0] text-[#0a0a0a]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, #0a0a0a 0, #0a0a0a 1px, transparent 1px, transparent 72px), repeating-linear-gradient(0deg, #0a0a0a 0, #0a0a0a 1px, transparent 1px, transparent 72px)`,
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 md:grid-cols-12">
        <div className="flex flex-col justify-between border-[#0a0a0a] px-4 py-24 md:col-span-7 md:border-r-2 md:px-10 md:py-28 lg:px-14">
          <motion.div
            className="space-y-1 border-l-4 border-[#E61919] pl-4"
            initial={{ opacity: 0, y: reduce ? 0 : yOff }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.65, ease }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0a0a0a]">
              [ {identity.role} ]
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3d3d3d]">
              UNIT / {identity.location.replace(/,/g, " · ").toUpperCase()}
            </p>
          </motion.div>

          <div className="mt-16 md:mt-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#E61919]">/// REV 2.6 · DOSSIER</p>
            <h1 className="mt-4 font-display uppercase leading-[0.88] tracking-[-0.04em] text-[#0a0a0a]">
              <motion.span
                className="block text-[clamp(3rem,11vw,7.25rem)]"
                initial={{ opacity: 0, y: reduce ? 0 : yOff }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0.2 : 0.75, delay: reduce ? 0 : 0.06, ease }}
              >
                {first}
              </motion.span>
              {secondLine ? (
                <motion.span
                  className="block text-[clamp(3rem,11vw,7.25rem)]"
                  initial={{ opacity: 0, y: reduce ? 0 : yOff }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0.2 : 0.75, delay: reduce ? 0 : 0.14, ease }}
                >
                  {secondLine}
                </motion.span>
              ) : null}
            </h1>
            <motion.p
              className="mt-6 max-w-[42ch] font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.12em] text-[#2a2a2a]"
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.2 : 0.6, delay: reduce ? 0 : 0.22, ease }}
            >
              {hero.subtitle}
            </motion.p>
          </div>

          <motion.a
            href="#about"
            className="group mt-16 inline-flex w-max items-center gap-3 border-2 border-[#0a0a0a] bg-[#0a0a0a] px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F4F4F0] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E61919] md:mt-0"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.55, delay: reduce ? 0 : 0.32, ease }}
          >
            <span className="h-px w-8 bg-[#F4F4F0]/80 transition-[width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-12" />
            {hero.scrollHint}
          </motion.a>
        </div>

        <div className="flex flex-col justify-between border-t-2 border-[#0a0a0a] bg-[#eae8e3] px-4 py-10 md:col-span-5 md:border-t-0 md:px-8 md:py-28 lg:px-10">
          <motion.div
            className="hidden font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-[#3d3d3d] md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.2 : 0.5, delay: reduce ? 0 : 0.2, ease }}
          >
            <p className="border-b border-[#0a0a0a] pb-2 text-[#0a0a0a]">&lt; OPERATING NOTES / &gt;</p>
            <p className="mt-4 tabular-nums">COORD 10.8231°N · 106.6297°E</p>
            <p className="mt-2">FIELD · FULL-STACK DELIVERY</p>
          </motion.div>

          <motion.p
            className="max-w-md font-sans text-base font-medium leading-snug tracking-tight text-[#111] text-balance md:text-right md:text-lg"
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : 0.28, ease }}
          >
            {hero.manifestoWords.map((w, i) => (
              <span key={`${w}-${i}`}>
                {i > 0 ? " " : ""}
                {w === hero.manifestoHighlight ? (
                  <span className="border-b-2 border-[#E61919] font-semibold text-[#0a0a0a]">{w}</span>
                ) : (
                  w
                )}
              </span>
            ))}
          </motion.p>

          <div className="mt-10 hidden h-3 w-full md:block" aria-hidden>
            <div className="h-full w-full bg-[repeating-linear-gradient(90deg,#E61919_0,#E61919_12px,#0a0a0a_12px,#0a0a0a_14px)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
