export type PortfolioJson = {
  meta: { title: string; description: string; htmlLang: string }
  identity: {
    displayName: string
    fullName: string
    role: string
    location: string
  }
  hero: {
    nameLines: string[]
    subtitle: string
    scrollHint: string
    manifestoWords: string[]
    manifestoHighlight: string
  }
  about: {
    sectionNumber: string
    sectionTitle: string
    paragraphs: string[]
    education: { institution: string; program: string; years: string }
    availability: { label: string; status: string }
    stats: { key: string; label: string; value: number; suffix: string }[]
  }
  skills: {
    sectionNumber: string
    sectionTitle: string
    /** Section headline (serif). */
    headline?: string
    /** Short mono note (top right). */
    aside?: string
    clusters: {
      id: string
      label: string
      items: string[]
      /** Cluster blurb under tags/list. */
      description?: string
    }[]
    /** Bottom strip — Japanese / language study (aligned with CV narrative). */
    japanese?: {
      eyebrow: string
      title: string
      body: string
      note: string
    }
  }
  projects: {
    sectionNumber: string
    sectionTitle: string
    items: {
      index: string
      name: string
      shortDescription: string
      longDescription: string
      tech: string[]
      githubStars: number
      links: { github: string }
    }[]
  }
  contact: {
    sectionNumber: string
    sectionTitle: string
    headline: string
    email: string
    ctaLabel: string
    navCtaLabel: string
    social: { platform: string; url: string; ariaLabel: string }[]
  }
  navigation: {
    anchors: { label: string; href: string }[]
    logoHref: string
  }
  footer: { copyright: string }
}
