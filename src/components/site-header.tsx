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
    if (latest < 48) { setConcealed(false); return }
    if (latest > prev && latest > 96) setConcealed(true)
    else if (latest < prev) setConcealed(false)
  })

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: concealed ? -120 : 0, opacity: concealed ? 0 : 1 }}
        transition={spring}
        className={cn(
          "fixed left-1/2 top-5 z-40 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2",
          "rounded-2xl",
        )}
        style={{
          background: "rgba(8,10,15,0.7)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(139,92,246,0.08)",
          pointerEvents: concealed ? "none" : "auto",
        }}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3.5">
          {/* Logo */}
          <a
            href={navigation.logoHref}
            className="shrink-0 text-sm font-bold tracking-[0.15em] uppercase font-mono transition-all duration-300 hover:text-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            <span className="text-gradient">{identity.displayName.split(" ")[0]}</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}> {identity.displayName.split(" ").slice(1).join(" ")}</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navigation.anchors.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {a.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* CTA button */}
            <a
              href={`mailto:${contact.email}`}
              className="group hidden items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400 sm:inline-flex"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(99,60,210,0.7) 100%)",
                border: "1px solid rgba(139,92,246,0.3)",
                boxShadow: "0 0 20px rgba(139,92,246,0.2)",
              }}
            >
              {contact.navCtaLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" weight="bold" aria-hidden />
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:bg-white/[0.08] active:scale-[0.97] md:hidden"
              style={{ color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
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

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-nav-overlay"
            className="fixed inset-0 z-30 md:hidden"
            style={{
              background: "rgba(8,10,15,0.96)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Mobile gradient orb */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)" }}
            />

            <nav
              className="flex min-h-[100dvh] flex-col justify-center gap-3 px-8 pt-24"
              aria-label="Mobile primary"
            >
              {navigation.anchors.map((a, i) => (
                <motion.a
                  key={a.href}
                  href={a.href}
                  className="font-display text-4xl font-black uppercase tracking-[-0.02em] text-white/90 hover:text-gradient transition-all"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.06 + i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-violet-500/40 text-2xl font-mono mr-3">0{i + 1}</span>
                  {a.label}
                </motion.a>
              ))}
              <motion.a
                href={`mailto:${contact.email}`}
                className="mt-8 inline-flex w-max items-center gap-3 px-6 py-4 text-base font-semibold text-white rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(249,115,22,0.5) 100%)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  boxShadow: "0 0 30px rgba(139,92,246,0.25)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 }}
                onClick={() => setMenuOpen(false)}
              >
                {contact.navCtaLabel}
                <ArrowUpRight className="h-4 w-4" weight="bold" aria-hidden />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
