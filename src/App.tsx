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

const data = portfolioData as PortfolioJson
const ease = [0.16, 1, 0.3, 1] as const

function Contact() {
  const { contact } = data
  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-28 py-24 md:py-36"
    >
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(139,92,246,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Section label */}
        <motion.p
          className="mb-6 text-sm font-mono uppercase tracking-[0.3em] text-violet-400/60"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-violet-400 font-bold">{contact.sectionNumber}</span>
          <span> / {contact.sectionTitle}</span>
        </motion.p>

        <motion.h2
          className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.04em] text-white"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, delay: 0.06, ease }}
        >
          {contact.headline}
        </motion.h2>

        <motion.div
          className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.12, ease }}
        >
          <div className="flex flex-col gap-6">
            {/* Email CTA */}
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex w-max max-w-full items-center gap-3 px-6 py-4 text-base font-semibold text-white rounded-2xl transition-all duration-300 hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(99,60,210,0.75) 100%)",
                border: "1px solid rgba(139,92,246,0.35)",
                boxShadow: "0 0 40px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              <span className="truncate">{contact.email}</span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <ArrowUpRight className="h-4 w-4" weight="bold" aria-hidden />
              </span>
            </a>
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-white/30">
              {data.identity.location}
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-wrap gap-3">
            {contact.social.map((s, i) => {
              const iconClass = "h-5 w-5"
              const icon =
                s.platform === "GitHub" ? <GithubLogo className={iconClass} weight="bold" />
                : s.platform === "Facebook" ? <FacebookLogo className={iconClass} weight="bold" />
                : s.platform === "YouTube" ? <YoutubeLogo className={iconClass} weight="bold" />
                : null
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
                    "flex h-12 w-12 items-center justify-center rounded-xl glass border border-white/[0.08]",
                    "text-white/50 transition-all duration-300 hover:text-violet-400 hover:border-violet-500/30",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400 active:scale-[0.97]",
                  )}
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}
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
      className="relative z-10 py-10"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(8,10,15,0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="text-sm font-mono text-white/25 tracking-widest uppercase">{footer.copyright}</p>
        <div className="flex gap-8 text-sm font-mono text-white/25 uppercase tracking-widest">
          <a href="#privacy" className="hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400">
            Privacy
          </a>
          <a href="#terms" className="hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400">
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
        className="fixed left-4 top-4 z-[100] -translate-y-[120%] px-4 py-2 text-sm font-semibold text-white rounded-lg glass opacity-0 transition duration-200 focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-violet-400"
      >
        Skip to content
      </a>
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
