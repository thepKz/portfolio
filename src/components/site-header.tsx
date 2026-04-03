"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { ArrowUpRight, List, X } from "@phosphor-icons/react"
import type { PortfolioJson } from "@/types/portfolio"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  navigation: PortfolioJson["navigation"]
  contact: PortfolioJson["contact"]
  identity: PortfolioJson["identity"]
}

const spring = { type: "spring" as const, stiffness: 380, damping: 34, mass: 0.7 }

export function SiteHeader({ navigation, contact, identity }: SiteHeaderProps) {
  const [concealed, setConcealed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const prevScroll = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = prevScroll.current
    prevScroll.current = latest
    if (latest < 48) {
      setConcealed(false)
      return
    }
    if (latest > prev && latest > 96) setConcealed(true)
    else if (latest < prev) setConcealed(false)
  })

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: concealed ? -120 : 0,
          opacity: concealed ? 0 : 1,
        }}
        transition={spring}
        className={cn(
          "fixed left-1/2 top-5 z-40 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2",
          "border-2 border-[#0a0a0a] bg-[#F4F4F0]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md",
        )}
        style={{ pointerEvents: concealed ? "none" : "auto" }}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-5">
          <a
            href={navigation.logoHref}
            className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition-colors hover:text-[#E61919] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E61919]"
          >
            {identity.displayName.replace(" ", "\u00a0")}
          </a>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {navigation.anchors.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#3d3d3d] transition-colors hover:text-[#E61919] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E61919]"
              >
                {a.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${contact.email}`}
              className="group hidden items-center gap-2 border-2 border-[#0a0a0a] bg-[#0a0a0a] px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F4F4F0] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E61919] sm:inline-flex"
            >
              {contact.navCtaLabel}
              <span className="flex h-6 w-6 items-center justify-center border border-[#F4F4F0]/25 bg-[#F4F4F0]/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight className="h-3.5 w-3.5" weight="bold" aria-hidden />
              </span>
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border-2 border-[#0a0a0a] text-[#0a0a0a] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#eae8e3] active:scale-[0.97] md:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-nav-overlay"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              {menuOpen ? <X className="h-5 w-5" weight="bold" /> : <List className="h-5 w-5" weight="bold" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="site-nav-overlay"
            className="fixed inset-0 z-30 bg-[#0a0a0a]/92 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <nav
              className="flex min-h-[100dvh] flex-col justify-center gap-6 px-8 pt-24"
              aria-label="Mobile primary"
            >
              {navigation.anchors.map((a, i) => (
                <motion.a
                  key={a.href}
                  href={a.href}
                  className="font-display text-3xl uppercase tracking-[-0.02em] text-[#F4F4F0]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.06 + i * 0.05,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {a.label}
                </motion.a>
              ))}
              <motion.a
                href={`mailto:${contact.email}`}
                className="mt-6 inline-flex w-max items-center gap-2 border-2 border-[#E61919] px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F4F4F0]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 }}
                onClick={() => setMenuOpen(false)}
              >
                {contact.navCtaLabel}
                <ArrowUpRight className="h-4 w-4 text-[#E61919]" weight="bold" aria-hidden />
              </motion.a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
