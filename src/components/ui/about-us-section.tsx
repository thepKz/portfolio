"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Code, Browser, BookOpen, Stack, ArrowUpRight } from "@phosphor-icons/react"
import { motion, useInView, useSpring, useTransform, type Variants } from "framer-motion"

import type { PortfolioJson } from "@/types/portfolio"
import { cn } from "@/lib/utils"
import { FallingPattern } from "@/components/ui/falling-pattern"

type AboutUsSectionProps = {
  identity: PortfolioJson["identity"]
  about: PortfolioJson["about"]
  contactEmail: string
}

const ease = [0.16, 1, 0.3, 1] as const

export function AboutUsSection({
  identity,
  about,
  contactEmail,
}: AboutUsSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const statsRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease },
    },
  }

  const focusRows: {
    n: string
    icon: React.ReactNode
    title: string
    description: string
  }[] = [
    {
      n: "01",
      icon: <Code className="h-4 w-4" weight="bold" aria-hidden />,
      title: "Engineering",
      description: "TypeScript, React, Node — readable UI and shippable backends.",
    },
    {
      n: "02",
      icon: <Browser className="h-4 w-4" weight="bold" aria-hidden />,
      title: "Surfaces",
      description: "Typography and motion stay quiet so the product reads first.",
    },
    {
      n: "03",
      icon: <BookOpen className="h-4 w-4" weight="bold" aria-hidden />,
      title: "Study web",
      description: "Minthep pairs IT practice with Japanese: drills, reading, repetition.",
    },
    {
      n: "04",
      icon: <Stack className="h-4 w-4" weight="bold" aria-hidden />,
      title: "Stack",
      description: "Git, Docker, Figma, deploy pipelines — reliable glue.",
    },
  ]

  const portraitSrc = `https://picsum.photos/seed/${encodeURIComponent(identity.fullName)}/720/900`

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden border-t border-border bg-[hsl(40_20%_97%_/_0.88)] px-4 py-28 text-foreground md:px-10 md:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.26] [mask-image:radial-gradient(ellipse_80%_65%_at_30%_35%,black,transparent_75%)]"
        aria-hidden
      >
        <FallingPattern
          className="h-full min-h-[520px]"
          color="hsl(var(--foreground) / 0.045)"
          backgroundColor="hsl(40 20% 97% / 0.2)"
          blurIntensity="0.85em"
          duration={185}
          density={1.15}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-[1200px]"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Editorial masthead */}
        <motion.header variants={itemVariants} className="grid gap-10 lg:grid-cols-12 lg:gap-6 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              {about.sectionNumber} / {about.sectionTitle}
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.35rem,6.5vw,3.85rem)] font-medium leading-[1.05] tracking-[-0.038em] text-foreground">
              {identity.fullName}
            </h2>
            <p className="mt-5 max-w-md font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted-foreground">
              {about.education.program}
              <span className="text-border"> · </span>
              {about.education.institution}
              <span className="text-border"> · </span>
              <span className="tabular-nums">{about.education.years}</span>
            </p>
          </div>
          <div className="flex flex-col gap-6 border-border lg:col-span-4 lg:border-l lg:pl-10">
            <a
              href={`mailto:${contactEmail}`}
              className="group inline-flex w-max max-w-full items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-foreground underline decoration-border underline-offset-[5px] transition-colors hover:decoration-foreground"
            >
              <span className="truncate">{contactEmail}</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                weight="bold"
                aria-hidden
              />
            </a>
            <div
              className="inline-flex w-max items-center gap-2 border border-[#EAEAEA] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em]"
              style={{ backgroundColor: "#EDF3EC", color: "#346538" }}
            >
              <span className="h-1 w-1 bg-[#346538]" aria-hidden />
              {about.availability.label}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {identity.location}
            </p>
          </div>
        </motion.header>

        <div className="my-16 h-px w-full bg-border md:my-20" aria-hidden />

        {/* Prose + margin column */}
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <motion.div
            variants={itemVariants}
            className="space-y-5 lg:col-span-7 lg:col-start-1"
          >
            {about.paragraphs.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-[15px] leading-[1.72] text-muted-foreground md:text-base md:leading-[1.75]"
              >
                {p}
              </p>
            ))}
          </motion.div>
          <motion.aside
            variants={itemVariants}
            className="lg:col-span-4 lg:col-start-9 lg:border-l lg:border-border lg:pl-10"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
              Role
            </p>
            <p className="mt-3 font-serif text-xl leading-snug tracking-[-0.02em] text-foreground">
              {identity.role}
            </p>
            <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
              Site
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Minthep — one surface for shipping code and logging Japanese study.
            </p>
          </motion.aside>
        </div>

        <div className="my-20 h-px w-full bg-border md:my-24" aria-hidden />

        {/* Asymmetric: image + focus register */}
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
          <motion.figure
            variants={itemVariants}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="border border-[#EAEAEA] bg-[#F9F9F8] p-2">
              <motion.div
                className="overflow-hidden border border-[#EAEAEA] bg-background"
                initial={{ opacity: 0.9, scale: 1.02 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.img
                  src={portraitSrc}
                  alt=""
                  className="aspect-[3/4] w-full object-cover saturate-[0.88] contrast-[0.97]"
                  initial={{ scale: 1.07 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </div>
          </motion.figure>

          <motion.div variants={itemVariants} className="lg:col-span-7">
            <p className="mb-8 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
              Focus register
            </p>
            <ul className="divide-y divide-border border-t border-border">
              {focusRows.map((row) => (
                <li key={row.n}>
                  <div className="group flex gap-5 py-7 md:gap-8 md:py-8">
                    <span className="w-8 shrink-0 pt-0.5 font-mono text-[10px] tabular-nums tracking-[0.14em] text-muted-foreground md:w-10">
                      {row.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-muted-foreground transition-colors duration-300 group-hover:text-[hsl(var(--accent))]">
                          {row.icon}
                        </span>
                        <h3 className="font-serif text-xl tracking-[-0.02em] text-foreground md:text-[1.35rem]">
                          {row.title}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                        {row.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Typographic metrics strip */}
        <motion.div
          ref={statsRef}
          className={cn(
            "mt-20 border-t border-b border-border md:mt-28",
            "transition-shadow duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
          )}
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="flex flex-col md:flex-row">
            {about.stats.map((s, index) => (
              <StatCell
                key={s.key}
                active={isStatsInView}
                label={s.label}
                value={s.value}
                suffix={s.suffix}
                delay={index * 0.05}
                className={cn(
                  "flex-1 px-5 py-9 md:px-8 md:py-10",
                  index > 0 && "border-t border-border md:border-t-0 md:border-l",
                )}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function StatCell({
  active,
  label,
  value,
  suffix,
  delay,
  className,
}: {
  active: boolean
  label: string
  value: number
  suffix: string
  delay: number
  className?: string
}) {
  const [done, setDone] = useState(false)
  const spring = useSpring(0, { stiffness: 64, damping: 22, mass: 0.42 })
  const display = useTransform(spring, (v) => Math.floor(v))

  useEffect(() => {
    if (active && !done) {
      spring.set(value)
      setDone(true)
    }
  }, [active, value, spring, done])

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay, ease },
        },
      }}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
      <p className="mt-3 flex items-baseline gap-0.5 font-serif text-[clamp(1.85rem,4vw,2.65rem)] tabular-nums tracking-[-0.03em] text-foreground">
        <motion.span>{display}</motion.span>
        <span className="text-lg text-[hsl(var(--accent))] md:text-xl">{suffix}</span>
      </p>
    </motion.div>
  )
}
