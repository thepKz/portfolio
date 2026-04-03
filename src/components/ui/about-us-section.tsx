"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  BookOpen,
  Browser,
  Code,
  Stack,
} from "@phosphor-icons/react"
import { motion, useInView, useSpring, useTransform, type Variants } from "framer-motion"

import type { PortfolioJson } from "@/types/portfolio"
import { cn } from "@/lib/utils"

type AboutUsSectionProps = {
  identity: PortfolioJson["identity"]
  about: PortfolioJson["about"]
  contactEmail: string
}

const ease = [0.16, 1, 0.3, 1] as const

export function AboutUsSection({ identity, about, contactEmail }: AboutUsSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const statsRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
  }
  const itemVariants: Variants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease } },
  }

  const focusRows: { n: string; icon: React.ReactNode; title: string; description: string }[] = [
    { n: "01", icon: <Code className="h-5 w-5" weight="bold" aria-hidden />, title: "Engineering", description: "Full-stack delivery: React and Next.js, Node and Express, Spring Boot, Flutter when the product needs mobile." },
    { n: "02", icon: <Browser className="h-5 w-5" weight="bold" aria-hidden />, title: "Surfaces", description: "Interfaces stay readable under load: Tailwind and Ant Design where they fit, APIs documented with OpenAPI." },
    { n: "03", icon: <BookOpen className="h-5 w-5" weight="bold" aria-hidden />, title: "Writing", description: "StudyBlog — long-form notes on software engineering and Japanese study; 75,000+ views since 2023." },
    { n: "04", icon: <Stack className="h-5 w-5" weight="bold" aria-hidden />, title: "Delivery", description: "Docker, GitHub Actions, Vercel and Netlify — ship often, trace issues quickly." },
  ]

  const portraitSrc = `https://picsum.photos/seed/${encodeURIComponent(identity.fullName)}/720/900`

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full scroll-mt-28 py-24 px-6 md:px-10 md:py-32"
    >
      {/* Section ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 60%)" }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-[1400px]"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header card */}
        <motion.div
          variants={itemVariants}
          className="grid gap-px rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}
        >
          <div className="grid md:grid-cols-12">
            {/* Left: Identity */}
            <div
              className="p-8 md:col-span-8 md:p-12"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-sm font-mono uppercase tracking-[0.3em] text-violet-400/60 mb-6">
                <span className="text-violet-400 font-bold">[{about.sectionNumber}]</span>
                <span> {about.sectionTitle.toUpperCase()}</span>
              </p>
              <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-[0.88] tracking-[-0.04em] text-white">
                {identity.displayName}
              </h2>
              <p className="mt-6 text-base font-mono uppercase leading-relaxed tracking-[0.1em] text-white/40">
                {about.education.program}
                <span className="text-white/20"> · </span>
                {about.education.institution}
                <span className="text-white/20"> · </span>
                <span className="tabular-nums">{about.education.years}</span>
              </p>
              {about.priorEducation && (
                <p className="mt-3 text-sm font-mono uppercase tracking-[0.08em] text-white/25">
                  {about.priorEducation.program} · {about.priorEducation.institution} · {about.priorEducation.years}
                </p>
              )}
            </div>

            {/* Right: Contact info */}
            <div
              className="flex flex-col justify-between gap-8 p-8 md:col-span-4 md:p-10"
              style={{ background: "rgba(139,92,246,0.05)", borderLeft: "1px solid rgba(139,92,246,0.1)" }}
            >
              <a
                href={`mailto:${contactEmail}`}
                className="group inline-flex w-max max-w-full items-center gap-2 text-base font-semibold text-violet-300 transition-all hover:text-violet-200"
              >
                <span className="truncate border-b border-violet-500/30 pb-0.5 group-hover:border-violet-400">{contactEmail}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" weight="bold" aria-hidden />
              </a>
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/30 mb-3">Status</p>
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}
                >
                  <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" aria-hidden />
                  <span className="text-violet-300">{about.availability.label}</span>
                </div>
              </div>
              <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/25">{identity.location}</p>
            </div>
          </div>
        </motion.div>

        {/* About body */}
        <div className="mt-8 grid gap-px md:grid-cols-12 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <motion.div
            variants={itemVariants}
            className="space-y-5 p-8 md:col-span-7 md:p-12"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="text-[17px] leading-[1.8] text-white/65 max-w-[65ch]">{p}</p>
            ))}
          </motion.div>
          <motion.aside
            variants={itemVariants}
            className="p-8 md:col-span-5 md:p-10"
            style={{ background: "rgba(139,92,246,0.04)", borderLeft: "1px solid rgba(139,92,246,0.08)" }}
          >
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-violet-400/60 mb-4">&lt; ROLE / &gt;</p>
            <p className="font-display text-2xl uppercase leading-tight tracking-[-0.02em] text-white md:text-3xl">
              {identity.role}
            </p>
            <div className="mt-10">
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-violet-400/60 mb-4">&lt; SITE / &gt;</p>
              <p className="text-base leading-relaxed text-white/50">
                Minthep.com — portfolio and public study notes; English, Japanese, and Korean in daily use.
              </p>
            </div>
          </motion.aside>
        </div>

        {/* Certs */}
        {about.certifications && about.certifications.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-8 p-8 md:p-10 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-violet-400/60 mb-6">[ CERTIFICATIONS ]</p>
            <ul className="divide-y" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {about.certifications.map((line) => (
                <li key={line} className="py-5 text-base leading-relaxed text-white/60" style={{ borderColor: "rgba(255,255,255,0.05)" }}>{line}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Portrait + Focus */}
        <div className="mt-8 grid md:grid-cols-12 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <motion.figure variants={itemVariants} className="md:col-span-5">
            <div className="p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <img
                  src={portraitSrc}
                  alt=""
                  className="aspect-[3/4] w-full object-cover"
                  style={{ filter: "grayscale(0.3) brightness(0.9) contrast(1.05)" }}
                />
              </div>
            </div>
            <p
              className="px-5 py-3 text-xs font-mono uppercase tracking-[0.22em] text-white/20"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              FIG. 01 · SUBJECT REF
            </p>
          </motion.figure>

          <motion.div variants={itemVariants} className="md:col-span-7" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            <div
              className="px-8 py-5 md:px-10"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(139,92,246,0.05)" }}
            >
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.3em] text-violet-400/60">
                /// FOCUS REGISTER
              </p>
            </div>
            <ul>
              {focusRows.map((row) => (
                <li key={row.n} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="group flex gap-6 px-8 py-8 md:gap-8 md:px-10 md:py-9 hover:bg-white/[0.02] transition-colors">
                    <span className="w-10 shrink-0 pt-1 text-sm font-bold font-mono tabular-nums text-violet-400/60">{row.n}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-white/30 transition-colors group-hover:text-violet-400">{row.icon}</span>
                        <h3 className="font-display text-xl uppercase tracking-[-0.02em] text-white md:text-2xl">{row.title}</h3>
                      </div>
                      <p className="text-base leading-relaxed text-white/50 max-w-[52ch]">{row.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="mt-8 rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-4">
            {about.stats.map((s, index) => (
              <StatCell
                key={s.key}
                active={isStatsInView}
                label={s.label}
                value={s.value}
                suffix={s.suffix}
                delay={index * 0.05}
                className={cn(
                  "px-8 py-10 md:px-8 md:py-12",
                  index > 0 && "border-t md:border-t-0 md:border-l",
                )}
                style={{ borderColor: "rgba(255,255,255,0.05)", background: index % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(139,92,246,0.03)" }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function StatCell({
  active, label, value, suffix, delay, className, style,
}: {
  active: boolean; label: string; value: number; suffix: string; delay: number; className?: string; style?: React.CSSProperties
}) {
  const [done, setDone] = useState(false)
  const spring = useSpring(0, { stiffness: 64, damping: 22, mass: 0.42 })
  const display = useTransform(spring, (v) => Math.floor(v))

  useEffect(() => {
    if (active && !done) { spring.set(value); setDone(true) }
  }, [active, value, spring, done])

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease } },
      }}
    >
      <p className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-violet-400/60 mb-4">{label}</p>
      <p className="flex items-baseline gap-1 font-mono text-[clamp(2rem,4vw,3rem)] font-bold tabular-nums tracking-[-0.03em] text-white">
        <motion.span>{display}</motion.span>
        <span className="text-xl text-violet-400">{suffix}</span>
      </p>
    </motion.div>
  )
}
