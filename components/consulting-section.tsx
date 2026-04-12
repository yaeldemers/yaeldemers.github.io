"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, Scale, Brain, FileText } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const focusIcons = [Shield, Scale, Brain, FileText]

export default function ConsultingSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="consulting"
      ref={sectionRef}
      className="py-32 px-6 md:px-12 lg:px-24 lg:pr-72"
      aria-labelledby="consulting-heading"
    >
      <div className="max-w-5xl mx-auto lg:mx-0">
        <header
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-retro-slate dark:text-retro-sky text-sm font-mono tracking-widest" aria-hidden="true">
              {t.consulting.section}
            </span>
            <div className="h-px w-12 bg-retro-slate/30 dark:bg-retro-sky/30" aria-hidden="true" />
          </div>
          <h2 id="consulting-heading" className="font-sans text-foreground text-3xl md:text-4xl font-bold">
            {t.consulting.title}
          </h2>
          <p className="text-retro-slate dark:text-retro-sky font-sans text-xl md:text-2xl font-medium mt-2">
            {t.consulting.subtitle}
          </p>
        </header>

        <div
          className={`space-y-8 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-foreground/70 text-lg leading-relaxed max-w-3xl">{t.consulting.intro}</p>

          <p className="text-foreground/70 text-lg leading-relaxed max-w-3xl">{t.consulting.focus}</p>

          <div
            className={`mt-12 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-foreground/60 text-sm font-mono mb-6 tracking-wide">{t.consulting.areasLabel}</h3>

            <ul className="grid md:grid-cols-2 gap-4" role="list">
              {t.consulting.areas.map((area, index) => {
                const Icon = focusIcons[index] || Shield
                return (
                  <li
                    key={index}
                    className="group flex items-start gap-4 p-4 rounded-xl border border-border 
                      hover:border-retro-sky/50 transition-all duration-300 hover:bg-retro-sky/5"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center 
                        bg-foreground/5 text-foreground/40 group-hover:bg-retro-sky/20 
                        group-hover:text-retro-sky transition-all duration-300 shrink-0"
                      aria-hidden="true"
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-foreground/70 group-hover:text-foreground transition-colors duration-300 pt-2">
                      {area}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <p
            className={`text-foreground/50 text-sm italic mt-8 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {t.consulting.disclaimer}
          </p>
        </div>
      </div>
    </section>
  )
}
