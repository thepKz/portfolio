"use client"

import { motion } from "framer-motion"
import portfolioData from "./data/portfolio.json"
import type { PortfolioJson } from "./types/portfolio"
import { cn } from "@/lib/utils"
import { ArrowUpRight, FacebookLogo, GithubLogo, YoutubeLogo } from "@phosphor-icons/react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AboutUsSection } from "@/components/ui/about-us-section"
import { CapabilitiesSection } from "@/components/ui/capabilities-section"
import { ProjectShowcase } from "@/components/ui/project-showcase"
import { ParadiseAmbient } from "@/components/ui/paradise-ambient"

const data = portfolioData as PortfolioJson

const ease = [0.16, 1, 0.3, 1] as const

function Contact() {
  const { contact } = data
  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-28 border-t-2 border-[#0a0a0a] bg-[#F4F4F0] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <motion.p
          className="mb-8 font-mono text-[10px] uppercase tracking-[0.28em]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="font-semibold tabular-nums text-[hsl(var(--accent))]">{contact.sectionNumber}</span>
          <span className="text-[#3d3d3d]"> / {contact.sectionTitle}</span>
        </motion.p>
        <motion.h2
          className="max-w-3xl font-display text-[clamp(1.75rem,4vw,2.75rem)] uppercase leading-[1.05] tracking-[-0.03em] text-[#0a0a0a] text-balance"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, delay: 0.06, ease }}
        >
          {contact.headline}
        </motion.h2>
        <motion.div
          className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.12, ease }}
        >
          <div className="flex flex-col gap-6">
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex w-max max-w-full items-center gap-3 border-2 border-[#0a0a0a] bg-[#0a0a0a] px-5 py-3 font-mono text-xs font-semibold text-[#F4F4F0] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E61919]"
            >
              <span className="truncate">{contact.email}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#F4F4F0]/20 bg-[#F4F4F0]/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight className="h-4 w-4" weight="bold" aria-hidden />
              </span>
            </a>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#3d3d3d]">
              {data.identity.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {contact.social.map((s, i) => {
              const iconClass = "h-4 w-4"
              const icon =
                s.platform === "GitHub" ? (
                  <GithubLogo className={iconClass} weight="bold" />
                ) : s.platform === "Facebook" ? (
                  <FacebookLogo className={iconClass} weight="bold" />
                ) : s.platform === "YouTube" ? (
                  <YoutubeLogo className={iconClass} weight="bold" />
                ) : null
              return (
                <motion.a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.08 + i * 0.05, ease }}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center border-2 border-[#0a0a0a] bg-[#eae8e3] text-[#0a0a0a] transition-[transform,opacity,border-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#E61919] hover:text-[#E61919] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E61919] active:scale-[0.97]",
                  )}
                >
                  {icon}
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  const { footer } = data
  return (
    <motion.footer
      className="relative z-10 border-t-2 border-[#0a0a0a] bg-[#eae8e3] py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#3d3d3d]">{footer.copyright}</p>
        <div className="flex gap-8 font-mono text-[9px] uppercase tracking-[0.18em] text-[#3d3d3d]">
          <a
            href="#privacy"
            className="hover:text-[#E61919] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E61919]"
          >
            Privacy
          </a>
          <a
            href="#terms"
            className="hover:text-[#E61919] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E61919]"
          >
            Terms
          </a>
        </div>
      </div>
    </motion.footer>
  )
}

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="fixed left-4 top-4 z-[100] -translate-y-[120%] border-2 border-[#0a0a0a] bg-[#F4F4F0] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a] opacity-0 transition duration-200 focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-[#E61919]"
      >
        Skip to content
      </a>
      <ParadiseAmbient />
      <SiteHeader navigation={data.navigation} contact={data.contact} identity={data.identity} />
      <main className="relative z-10">
        <HeroSection hero={data.hero} identity={data.identity} />
        <AboutUsSection
          identity={data.identity}
          about={data.about}
          contactEmail={data.contact.email}
        />
        <CapabilitiesSection skills={data.skills} />
        <ProjectShowcase
          projects={data.projects}
          sectionNumber={data.projects.sectionNumber}
          sectionTitle={data.projects.sectionTitle}
        />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
