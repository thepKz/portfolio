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
      transition: { staggerChildren: 0.07, delayChildren: 0.04 },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 12, opacity: 0 },
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
      description:
        "Full-stack delivery: React and Next.js, Node and Express, Spring Boot, Flutter when the product needs mobile.",
    },
    {
      n: "02",
      icon: <Browser className="h-4 w-4" weight="bold" aria-hidden />,
      title: "Surfaces",
      description:
        "Interfaces stay readable under load: Tailwind and Ant Design where they fit, APIs documented with OpenAPI.",
    },
    {
      n: "03",
      icon: <BookOpen className="h-4 w-4" weight="bold" aria-hidden />,
      title: "Writing",
      description:
        "StudyBlog — long-form notes on software engineering and Japanese study; 75,000+ views since 2023.",
    },
    {
      n: "04",
      icon: <Stack className="h-4 w-4" weight="bold" aria-hidden />,
      title: "Delivery",
      description: "Docker, GitHub Actions, Vercel and Netlify — ship often, trace issues quickly.",
    },
  ]

  const portraitSrc = `https://picsum.photos/seed/${encodeURIComponent(identity.fullName)}/720/900`

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full scroll-mt-28 border-b-2 border-[#0a0a0a] bg-[#F4F4F0] px-4 py-24 text-[#0a0a0a] md:px-10 md:py-32"
    >
      <motion.div
        className="relative z-10 mx-auto max-w-[1400px]"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.header
          variants={itemVariants}
          className="grid gap-0 border-2 border-[#0a0a0a] md:grid-cols-12"
        >
          <div className="border-b-2 border-[#0a0a0a] p-6 md:col-span-8 md:border-b-0 md:border-r-2 md:p-10 lg:p-12">
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#E61919]">
              <span className="font-semibold tabular-nums">[{about.sectionNumber}]</span>
              <span className="text-[#3d3d3d]"> {about.sectionTitle.toUpperCase()}</span>
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5.5vw,3.5rem)] uppercase leading-[0.92] tracking-[-0.035em]">
              {identity.displayName}
            </h2>
            <p className="mt-5 max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#3d3d3d]">
              {about.education.program}
              <span className="text-[#c4c4c0]"> · </span>
              {about.education.institution}
              <span className="text-[#c4c4c0]"> · </span>
              <span className="tabular-nums">{about.education.years}</span>
            </p>
            {about.priorEducation ? (
              <p className="mt-3 max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-[#5a5a5a]">
                {about.priorEducation.program}
                <span className="text-[#c4c4c0]"> · </span>
                {about.priorEducation.institution}
                <span className="text-[#c4c4c0]"> · </span>
                <span className="tabular-nums">{about.priorEducation.years}</span>
              </p>
            ) : null}
          </div>
          <div className="flex flex-col justify-between gap-8 bg-[#eae8e3] p-6 md:col-span-4 md:p-10">
            <a
              href={`mailto:${contactEmail}`}
              className="group inline-flex w-max max-w-full items-center gap-2 border-b-2 border-[#0a0a0a] pb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0a0a0a] transition-colors hover:border-[#E61919] hover:text-[#E61919]"
            >
              <span className="truncate">{contactEmail}</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                weight="bold"
                aria-hidden
              />
            </a>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#3d3d3d]">Status</p>
              <div className="mt-2 inline-flex items-center gap-2 border-2 border-[#0a0a0a] bg-[#F4F4F0] px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em]">
                <span className="h-2 w-2 bg-[#E61919]" aria-hidden />
                {about.availability.label}
              </div>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#3d3d3d]">{identity.location}</p>
          </div>
        </motion.header>

        <div className="mt-16 grid gap-0 border-2 border-[#0a0a0a] md:grid-cols-12">
          <motion.div
            variants={itemVariants}
            className="space-y-5 border-b-2 border-[#0a0a0a] p-6 md:col-span-7 md:border-b-0 md:border-r-2 md:p-10 lg:p-12"
          >
            {about.paragraphs.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="max-w-[65ch] text-base leading-relaxed text-[#2a2a2a] md:text-[15px] md:leading-[1.72]"
              >
                {p}
              </p>
            ))}
          </motion.div>
          <motion.aside variants={itemVariants} className="bg-[#eae8e3] p-6 md:col-span-5 md:p-10">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[#E61919]">
              &lt; ROLE / &gt;
            </p>
            <p className="mt-4 font-display text-xl uppercase leading-tight tracking-[-0.02em] md:text-2xl">
              {identity.role}
            </p>
            <p className="mt-10 font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[#E61919]">
              &lt; SITE / &gt;
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#2a2a2a] md:text-[15px]">
              Minthep.com — portfolio and public study notes; English, Japanese, and Korean in daily use.
            </p>
          </motion.aside>
        </div>

        {about.certifications && about.certifications.length > 0 ? (
          <motion.div variants={itemVariants} className="mt-16 border-2 border-[#0a0a0a] p-6 md:p-10">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[#E61919]">
              [ CERTIFICATIONS ]
            </p>
            <ul className="mt-6 divide-y-2 divide-[#0a0a0a] border-t-2 border-b-2 border-[#0a0a0a]">
              {about.certifications.map((line) => (
                <li key={line} className="py-4 text-[15px] leading-relaxed text-[#2a2a2a] md:py-5">
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        <div className="mt-16 grid gap-0 border-2 border-[#0a0a0a] md:grid-cols-12">
          <motion.figure variants={itemVariants} className="border-b-2 border-[#0a0a0a] md:col-span-5 md:border-b-0 md:border-r-2">
            <div className="border-[12px] border-[#eae8e3] bg-[#0a0a0a] p-px">
              <div className="border-2 border-[#0a0a0a] bg-[#F4F4F0]">
                <img
                  src={portraitSrc}
                  alt=""
                  className="aspect-[3/4] w-full object-cover grayscale contrast-[1.02]"
                />
              </div>
            </div>
            <p className="border-t-2 border-[#0a0a0a] bg-[#eae8e3] px-4 py-2 font-mono text-[8px] uppercase tracking-[0.22em] text-[#3d3d3d]">
              FIG. 01 · SUBJECT REF · NOT FOR DISTRIBUTION
            </p>
          </motion.figure>

          <motion.div variants={itemVariants} className="md:col-span-7">
            <div className="border-b-2 border-[#0a0a0a] bg-[#eae8e3] px-6 py-4 md:px-10">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[#E61919]">
                /// FOCUS REGISTER
              </p>
            </div>
            <ul>
              {focusRows.map((row) => (
                <li key={row.n} className="border-b-2 border-[#0a0a0a] last:border-b-0">
                  <div className="group flex gap-5 px-6 py-8 md:gap-8 md:px-10 md:py-9">
                    <span className="w-10 shrink-0 pt-0.5 font-mono text-[10px] font-bold tabular-nums tracking-[0.14em] text-[#E61919]">
                      {row.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[#5a5a5a] transition-colors duration-300 group-hover:text-[#E61919]">
                          {row.icon}
                        </span>
                        <h3 className="font-display text-lg uppercase tracking-[-0.02em] md:text-xl">
                          {row.title}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[#3d3d3d] md:text-[15px]">
                        {row.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          ref={statsRef}
          className="mt-16 border-2 border-[#0a0a0a]"
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
                  "px-6 py-8 md:px-8 md:py-10",
                  index > 0 && "border-t-2 border-[#0a0a0a] md:border-t-0 md:border-l-2",
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
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#E61919]">{label}</p>
      <p className="mt-3 flex items-baseline gap-0.5 font-mono text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tabular-nums tracking-[-0.02em]">
        <motion.span>{display}</motion.span>
        <span className="text-base text-[#E61919] md:text-lg">{suffix}</span>
      </p>
    </motion.div>
  )
}
