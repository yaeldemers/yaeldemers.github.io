"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUpRight, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { siteConfig } from "@/lib/site-config"
import { decodeEmail } from "@/lib/utils"

export default function ContactSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setEmail(decodeEmail(siteConfig.emailParts))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 px-6 md:px-12 lg:px-24 lg:pr-72"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto lg:mx-0">
        <header
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-retro-slate dark:text-retro-sky text-sm font-mono tracking-widest" aria-hidden="true">
              {t.contact.section}
            </span>
            <div className="h-px w-12 bg-retro-slate/30 dark:bg-retro-sky/30" aria-hidden="true" />
          </div>
          <h2 id="contact-heading" className="font-sans text-foreground text-3xl md:text-4xl font-bold">
            {t.contact.title}
          </h2>
          <p className="text-foreground/40 font-mono text-sm mt-2">{t.contact.comment}</p>
        </header>

        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <article className="group relative rounded-2xl border border-border overflow-hidden hover:border-retro-sky/50 transition-all duration-500">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-border group-hover:bg-retro-sky transition-colors duration-300"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-retro-sky/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />

            <div className="relative p-8 pl-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-mono bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                    <span>{t.contact.available}</span>
                  </span>
                  <span className="font-mono text-sm text-foreground/40">{t.contact.openTo}</span>
                </div>
                <button
                  onClick={() => {
                    if (email) window.location.href = `mailto:${email}`
                  }}
                  disabled={!email}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border
                    hover:border-retro-sky hover:bg-retro-sky/10 hover:text-retro-sky text-foreground/60
                    text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-default"
                  aria-label={t.contact.sendEmail}
                >
                  <span>{t.contact.sendEmail}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>

              <button
                onClick={() => {
                  if (email) window.location.href = `mailto:${email}`
                }}
                disabled={!email}
                className="inline-block font-sans text-2xl md:text-3xl font-semibold mb-4 text-foreground hover:text-retro-sky transition-colors duration-300 disabled:opacity-0"
              >
                {email}
              </button>

              <p className="text-foreground/60 text-base mb-6 leading-relaxed max-w-3xl">{t.contact.description}</p>

              <ul className="flex flex-wrap gap-2" aria-label="Contact details">
                <li>
                  <span className="flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border text-foreground/50 group-hover:border-retro-sky/30 group-hover:text-retro-sky/80 transition-all duration-300">
                    <MapPin size={14} aria-hidden="true" />
                    {t.contact.location}
                  </span>
                </li>
                <li>
                  <span className="flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border text-foreground/50 group-hover:border-retro-sky/30 group-hover:text-retro-sky/80 transition-all duration-300">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                    {t.contact.remote}
                  </span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
