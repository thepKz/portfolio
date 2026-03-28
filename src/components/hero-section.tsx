"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ShaderAnimation } from "@/components/ui/shader-lines"
import type { PortfolioJson } from "@/types/portfolio"

const ease = [0.16, 1, 0.3, 1] as const

type HeroSectionProps = {
  hero: PortfolioJson["hero"]
  identity: PortfolioJson["identity"]
}

export function HeroSection({ hero, identity }: HeroSectionProps) {
  const reduce = useReducedMotion()
  const [first, second] = hero.nameLines
  const yOff = reduce ? 0 : 48
  const ySm = reduce ? 0 : 12

  return (
    <section
      id="hero"
      className="relative z-10 min-h-[100dvh] overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0">
        <ShaderAnimation />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/25 via-[hsl(40,20%,97%)]/20 to-[hsl(40,20%,97%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-between px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
        <motion.div
          className="flex flex-col items-end gap-2 text-right md:max-w-md md:self-end"
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.75, delay: reduce ? 0 : 0.15, ease }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/90 drop-shadow-sm">
            {identity.role}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/75 drop-shadow-sm">
            {identity.location}
          </p>
        </motion.div>

        <div className="mt-auto space-y-10 md:flex md:items-end md:justify-between md:space-y-0">
          <div className="max-w-[18ch] space-y-2">
            <h1 className="font-serif font-semibold leading-[0.88] tracking-[-0.045em] text-white drop-shadow-[0_2px_40px_rgba(0,0,0,0.35)]">
              <motion.span
                className="block text-[clamp(3.2rem,12vw,7.5rem)]"
                initial={{ opacity: 0, y: yOff }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0.2 : 0.95, delay: reduce ? 0 : 0.08, ease }}
              >
                {first}
              </motion.span>
              <motion.span
                className="block text-[clamp(3.2rem,12vw,7.5rem)]"
                initial={{ opacity: 0, y: yOff }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0.2 : 0.95, delay: reduce ? 0 : 0.2, ease }}
              >
                {second}
              </motion.span>
            </h1>
            <motion.p
              className="max-w-[36ch]"
              initial={{ opacity: 0, y: ySm }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : 0.42, ease }}
            >
              <span className="inline-block rounded-[4px] bg-black/55 px-2.5 py-2 font-mono text-[12px] font-medium leading-relaxed tracking-[0.08em] text-white ring-1 ring-white/15 [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
                {hero.subtitle}
              </span>
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col items-start gap-4 md:items-end md:text-right"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.8, delay: reduce ? 0 : 0.5, ease }}
          >
            <p className="max-w-xs font-serif text-lg leading-snug tracking-tight text-[hsl(var(--foreground))] text-balance md:text-right">
              {hero.manifestoWords.map((w, i) => (
                <span key={`${w}-${i}`}>
                  {i > 0 ? " " : ""}
                  {w === hero.manifestoHighlight ? (
                    <motion.span
                      className="font-semibold text-[hsl(var(--accent))]"
                      initial={{ opacity: reduce ? 1 : 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: reduce ? 0 : 0.5,
                        delay: reduce ? 0 : 0.85 + i * 0.04,
                        ease,
                      }}
                    >
                      {w}
                    </motion.span>
                  ) : (
                    w
                  )}
                </span>
              ))}
            </p>
            <motion.a
              href="#about"
              className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent))]"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <span className="h-px w-10 bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14" />
              {hero.scrollHint}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
