"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { ArrowUpRight } from "@phosphor-icons/react"
import type { PortfolioJson } from "@/types/portfolio"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  navigation: PortfolioJson["navigation"]
  contact: PortfolioJson["contact"]
  identity: PortfolioJson["identity"]
}

export function SiteHeader({ navigation, contact, identity }: SiteHeaderProps) {
  const [concealed, setConcealed] = useState(false)
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
    <motion.header
      initial={false}
      animate={{
        y: concealed ? -120 : 0,
        opacity: concealed ? 0 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 34,
        mass: 0.7,
      }}
      className={cn(
        "fixed left-0 right-0 top-0 z-40 border-b border-border/80",
        "bg-[hsl(40,20%,97%,0.88)] backdrop-blur-md",
      )}
      style={{ pointerEvents: concealed ? "none" : "auto" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <a
          href={navigation.logoHref}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-[hsl(var(--accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent))]"
        >
          {identity.displayName.replace(" ", "\u00a0")}
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navigation.anchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-[hsl(var(--accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent))]"
            >
              {a.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${contact.email}`}
          className="group inline-flex items-center gap-2 rounded-md bg-[hsl(var(--accent))] px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--accent-foreground))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--foreground))]"
        >
          {contact.navCtaLabel}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            weight="regular"
            aria-hidden
          />
        </a>
      </div>
    </motion.header>
  )
}
