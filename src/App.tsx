"use client"

import { motion } from "framer-motion"
import portfolioData from "./data/portfolio.json"
import type { PortfolioJson } from "./types/portfolio"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Facebook, Youtube } from "lucide-react"
import { ArrowUpRight } from "@phosphor-icons/react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AboutUsSection } from "@/components/ui/about-us-section"
import { CapabilitiesSection } from "@/components/ui/capabilities-section"
import { ProjectShowcase } from "@/components/ui/project-showcase"
import { ParadiseAmbient } from "@/components/ui/paradise-ambient"
import { PageScribble } from "@/components/ui/page-scribble"

const data = portfolioData as PortfolioJson

const ease = [0.16, 1, 0.3, 1] as const

function Grain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] opacity-[0.04] mix-blend-multiply"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

function Contact() {
  const { contact } = data
  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-28 border-t border-border bg-[hsl(40_10%_94%_/_0.72)] py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.p
          className="mb-8 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease }}
        >
          {contact.sectionNumber} — {contact.sectionTitle}
        </motion.p>
        <motion.h2
          className="max-w-3xl font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-tight text-foreground text-balance"
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
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex w-max items-center gap-3 border-b border-foreground pb-1 font-mono text-sm text-foreground transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent))]"
          >
            {contact.email}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              weight="regular"
              aria-hidden
            />
          </a>
          <div className="flex flex-wrap gap-3">
            {contact.social.map((s, i) => {
              const iconClass = "h-4 w-4"
              const icon =
                s.platform === "GitHub" ? (
                  <Github className={iconClass} strokeWidth={1.5} />
                ) : s.platform === "LinkedIn" ? (
                  <Linkedin className={iconClass} strokeWidth={1.5} />
                ) : s.platform === "Facebook" ? (
                  <Facebook className={iconClass} strokeWidth={1.5} />
                ) : s.platform === "YouTube" ? (
                  <Youtube className={iconClass} strokeWidth={1.5} />
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
                    "flex h-11 w-11 items-center justify-center border border-border bg-[hsl(40_20%_97%_/_0.85)] text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent))] active:scale-[0.97]",
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
      className="relative z-10 border-t border-border bg-[hsl(40_20%_97%_/_0.9)] py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-mono text-[11px] text-muted-foreground">{footer.copyright}</p>
        <div className="flex gap-8 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <a
            href="#privacy"
            className="hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent))]"
          >
            Privacy
          </a>
          <a
            href="#terms"
            className="hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent))]"
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
        className="fixed left-4 top-4 z-[100] -translate-y-[120%] rounded-sm bg-foreground px-4 py-2 font-mono text-[11px] text-background opacity-0 shadow-sm transition duration-200 focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-[hsl(var(--accent))]"
      >
        Skip to content
      </a>
      <ParadiseAmbient />
      <Grain />
      <SiteHeader navigation={data.navigation} contact={data.contact} identity={data.identity} />
      <main className="relative z-10">
        <PageScribble />
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
