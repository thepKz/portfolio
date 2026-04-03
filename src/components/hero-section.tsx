"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
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
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 600], [0, -80])
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section
      id="hero"
      className="relative z-10 min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)",
          }}
          animate={reduce ? {} : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
          }}
          animate={reduce ? {} : { x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-[30%] right-[20%] w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          }}
          animate={reduce ? {} : { scale: [1, 1.2, 0.9, 1], opacity: [0.5, 1, 0.6, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Grid mesh overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 80px)`,
        }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 py-32 md:py-0"
        style={{ y: yParallax, opacity: opacityFade }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-center min-h-[100dvh]">
          {/* LEFT — Main content */}
          <div className="flex flex-col justify-center gap-10 md:col-span-8 md:pr-16">
            {/* Badge */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="glass flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-500/20">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" aria-hidden />
                <span className="text-sm font-medium text-violet-300 tracking-wide font-mono">
                  [ {identity.role} ]
                </span>
              </div>
              <div className="glass flex items-center gap-2 px-3 py-2 rounded-full">
                <span className="text-xs text-white/40 font-mono tracking-widest">
                  {identity.location.toUpperCase()}
                </span>
              </div>
            </motion.div>

            {/* Hero headline */}
            <div>
              <motion.p
                className="text-sm font-mono text-orange-400/70 tracking-[0.3em] uppercase mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease }}
              >
                /// REV 3.0 · GLASS DOSSIER
              </motion.p>
              <h1 className="font-display uppercase leading-[0.85] tracking-[-0.04em]">
                <motion.span
                  className="block text-[clamp(4rem,13vw,9rem)] text-gradient"
                  initial={{ opacity: 0, y: reduce ? 0 : 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.1, ease }}
                >
                  {first}
                </motion.span>
                {secondLine ? (
                  <motion.span
                    className="block text-[clamp(4rem,13vw,9rem)] text-white"
                    initial={{ opacity: 0, y: reduce ? 0 : 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.18, ease }}
                  >
                    {secondLine}
                  </motion.span>
                ) : null}
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              className="max-w-[50ch] text-lg font-medium leading-relaxed text-white/60"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease }}
            >
              {hero.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease }}
            >
              <a
                href="#about"
                className="group relative inline-flex items-center gap-3 px-7 py-4 text-base font-semibold text-white rounded-xl overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
                style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.7) 0%, rgba(99,60,210,0.8) 100%)", backdropFilter: "blur(12px)", border: "1px solid rgba(139,92,246,0.4)", boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}
              >
                <span className="relative z-10">{hero.scrollHint ?? "Explore"}</span>
                <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.06] transition-opacity" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-7 py-4 text-base font-semibold text-white/80 rounded-xl glass border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
              >
                Contact
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Glass info panel */}
          <motion.div
            className="md:col-span-4 flex flex-col gap-5"
            initial={{ opacity: 0, x: reduce ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            {/* Manifesto card */}
            <div
              className="glass scanline relative p-7 rounded-2xl"
              style={{ border: "1px solid rgba(139,92,246,0.15)", boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
              <p className="text-xs font-mono text-violet-400/60 tracking-[0.25em] uppercase mb-4">
                &lt; MANIFESTO /&gt;
              </p>
              <p className="text-lg font-semibold leading-snug text-white/85">
                {hero.manifestoWords.map((w, i) => (
                  <span key={`${w}-${i}`}>
                    {i > 0 ? " " : ""}
                    {w === hero.manifestoHighlight ? (
                      <span className="text-gradient font-bold">{w}</span>
                    ) : w}
                  </span>
                ))}
              </p>
            </div>

            {/* Coordinate card */}
            <div
              className="glass p-5 rounded-2xl"
              style={{ border: "1px solid rgba(6,182,212,0.12)" }}
            >
              <p className="text-xs font-mono text-cyan-400/50 tracking-[0.2em] uppercase mb-3">OPERATING NOTES</p>
              <div className="space-y-2">
                <p className="text-base font-mono text-white/60 tabular-nums">10.8231°N · 106.6297°E</p>
                <p className="text-sm font-mono text-white/40 uppercase tracking-wide">FIELD · FULL-STACK</p>
              </div>
            </div>

            {/* Stripe bar */}
            <div
              className="h-3 w-full rounded-full overflow-hidden"
              style={{ background: "linear-gradient(90deg, #8b5cf6, #f97316, #06b6d4, #8b5cf6)", backgroundSize: "200% 100%", animation: "gradientShift 4s linear infinite" }}
              aria-hidden
            />
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  )
}
