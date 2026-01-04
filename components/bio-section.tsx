"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

export default function BioSection() {
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
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-32 px-6 md:px-12 lg:px-24 lg:pr-72 flex items-center"
      aria-labelledby="about-heading"
    >
      <div className="max-w-5xl mx-auto lg:mx-0 w-full">
        <header
          className={`transition-all duration-1000 mb-8 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-retro-slate dark:text-retro-sky font-mono text-sm mb-6 tracking-widest" aria-hidden="true">
            {t.about.comment}
          </p>
          <h1
            id="about-heading"
            className="font-sans text-foreground text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            {t.about.name}
          </h1>
          <p className="font-sans text-foreground/50 text-2xl md:text-3xl font-medium leading-tight">{t.about.role}</p>
        </header>

        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="flex-1">
            <div
              className={`max-w-xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-foreground/70 text-lg leading-relaxed mb-6">{t.about.bio1}</p>
              <p className="text-foreground/70 text-lg leading-relaxed">{t.about.bio2}</p>
            </div>

            <dl
              className={`mt-16 grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div>
                <dt className="text-foreground/40 text-sm font-mono mb-1">{t.about.education}</dt>
                <dd className="text-foreground">{t.about.educationValue}</dd>
              </div>
              <div>
                <dt className="text-foreground/40 text-sm font-mono mb-1">{t.about.focus}</dt>
                <dd className="text-foreground">{t.about.focusValue}</dd>
              </div>
              <div>
                <dt className="text-foreground/40 text-sm font-mono mb-1">{t.about.status}</dt>
                <dd className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                  <span className="text-foreground">{t.about.statusValue}</span>
                </dd>
              </div>
            </dl>
          </div>

          <figure
            className={`shrink-0 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-full border border-retro-slate/20 dark:border-retro-sky/20"
                aria-hidden="true"
              />
              <div className="relative w-48 h-48 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-border shadow-lg">
                <Image
                  src="/images/yael-demers-enda-technologies.jpg"
                  alt="Professional portrait of Yael Demers"
                  className="object-cover"
                  sizes="(min-width: 1024px) 192px, 160px"
                  quality={95}
                  priority
                  fill
                />
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
