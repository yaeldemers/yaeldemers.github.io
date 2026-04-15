"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const SECTION_KEYS = ["overview", "use", "ip", "disclaimers", "contact"] as const
type TermsSectionKey = (typeof SECTION_KEYS)[number]

export default function TermsPage() {
  const { t } = useLanguage()

  const sections = [
    { id: "overview", label: t.terms.nav.overview },
    { id: "use", label: t.terms.nav.use },
    { id: "ip", label: t.terms.nav.ip },
    { id: "disclaimers", label: t.terms.nav.disclaimers },
    { id: "contact", label: t.terms.nav.contact },
  ]

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navigation sections={sections} />

      <div className="relative">
        {/* Back to home */}
        <div className="pt-24 pb-0 px-6 md:px-12 lg:px-24 lg:pr-72">
          <div className="max-w-5xl mx-auto lg:mx-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground/40 hover:text-retro-sky transition-colors font-mono text-sm"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              {t.terms.backToHome}
            </Link>
          </div>
        </div>

        {/* Page header */}
        <div className="py-16 px-6 md:px-12 lg:px-24 lg:pr-72 border-b border-border/50">
          <div className="max-w-5xl mx-auto lg:mx-0">
            <h1 className="font-sans text-foreground text-3xl md:text-4xl font-bold mb-2">{t.terms.title}</h1>
            <p className="text-foreground/40 font-mono text-sm">{t.terms.updated}</p>
          </div>
        </div>

        {/* Sections */}
        {SECTION_KEYS.map((key: TermsSectionKey) => (
          <section
            key={key}
            id={key}
            className="py-16 px-6 md:px-12 lg:px-24 lg:pr-72 border-b border-border/30 last:border-0"
            aria-labelledby={`terms-${key}-heading`}
          >
            <div className="max-w-2xl mx-auto lg:mx-0">
              <p
                className="text-retro-slate dark:text-retro-sky font-mono text-sm mb-3 tracking-widest"
                aria-hidden="true"
              >
                {t.terms[key].comment}
              </p>
              <h2
                id={`terms-${key}-heading`}
                className="font-sans text-foreground text-xl md:text-2xl font-semibold mb-6"
              >
                {t.terms[key].heading}
              </h2>
              <p className="text-foreground/70 text-base leading-relaxed">{t.terms[key].body}</p>
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </main>
  )
}
