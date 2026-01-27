"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, BookOpen, Beaker, Github } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const paperIcons = [Beaker, BookOpen]

export default function ResearchProjects() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getStatusStyles = (status: string) => {
    const isInProgress = status === "In Progress" || status === "En cours"
    const isPublished = status === "Published" || status === "Publié"

    if (isPublished) {
      return "text-retro-sky bg-retro-sky/10 border-retro-sky/20"
    }
    if (isInProgress) {
      return "text-primary bg-primary/10 border-primary/20"
    }
    return "text-foreground/50 bg-foreground/5 border-foreground/10"
  }

  const paperTags = [
    ["Cosmology", "Machine Learning", "Interpretable Systems"],
    ["Quantum Computing", "Cryptography", "Adversarial Systems"],
  ]

  const paperLinks = [
    {
      github: "https://github.com/yaeldemers/RFI-Inpainting",
      paper: null, // or a URL if you later have one
    },
    {
      github: null,
      paper: null,
    },
  ]

  return (
    <section
      id="research"
      ref={sectionRef}
      className="py-32 px-6 md:px-12 lg:px-24 lg:pr-72"
      aria-labelledby="research-heading"
    >
      <div className="max-w-5xl mx-auto lg:mx-0">
        <header
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-retro-slate dark:text-retro-sky text-sm font-mono tracking-widest" aria-hidden="true">
              {t.research.section}
            </span>
            <div className="h-px w-12 bg-retro-slate/30 dark:bg-retro-sky/30" aria-hidden="true" />
          </div>
          <h2 id="research-heading" className="font-sans text-foreground text-3xl md:text-4xl font-bold">
            {t.research.title}
          </h2>
          <p className="text-foreground/40 font-mono text-sm mt-2">{t.research.comment}</p>
        </header>

        <div className="space-y-6" role="list" aria-label="Research papers">
          {t.research.papers.map((paper, index) => {
            const Icon = paperIcons[index] || BookOpen
            const isHovered = hoveredIndex === index
            return (
              <article
                key={paper.title}
                className={`group relative rounded-2xl border border-border overflow-hidden
                  transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  } hover:border-retro-sky/50`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                role="listitem"
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 ${
                    isHovered ? "bg-retro-sky" : "bg-border"
                  }`}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-retro-sky/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />

                <div className="relative p-8 pl-10">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isHovered ? "bg-retro-sky/20 text-retro-sky" : "bg-foreground/5 text-foreground/40"
                        }`}
                        aria-hidden="true"
                      >
                        <Icon size={20} />
                      </div>
                      <span
                        className={`text-xs px-3 py-1.5 rounded-full font-mono border ${getStatusStyles(paper.status)}`}
                      >
                        {paper.status}
                      </span>
                      <time className="font-mono text-sm text-foreground/40" dateTime={paper.year}>
                        {paper.year}
                      </time>
                    </div>
                      <div className="flex gap-3">
                        {paperLinks[index]?.github && (
                          <a
                            href={paperLinks[index].github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border
                              hover:border-retro-sky hover:bg-retro-sky/10 hover:text-retro-sky text-foreground/60
                              text-sm transition-all duration-300"
                            aria-label={`View source code for ${paper.title}`}
                          >
                            <Github size={16} aria-hidden="true" />
                            <span>Code</span>
                          </a>
                        )}

                        <a
                          href="#contact"
                          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border 
                            hover:border-retro-sky hover:bg-retro-sky/10 hover:text-retro-sky text-foreground/60 
                            text-sm transition-all duration-300"
                          aria-label={`Contact about: ${paper.title}`}
                        >
                          <span>{t.research.readPaper}</span>
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      </div>
                  </div>

                  <h3
                    className={`font-sans text-xl md:text-2xl font-semibold mb-4 transition-colors duration-300 ${
                      isHovered ? "text-retro-sky" : "text-foreground"
                    }`}
                  >
                    {paper.title}
                  </h3>

                  <p className="text-foreground/60 text-base mb-6 leading-relaxed max-w-3xl">{paper.abstract}</p>

                  <ul className="flex flex-wrap gap-2" aria-label="Research topics">
                    {paperTags[index]?.map((tag) => (
                      <li
                        key={tag}
                        className={`text-sm px-4 py-2 rounded-full border border-border transition-all duration-300 ${
                          isHovered ? "border-retro-sky/30 text-retro-sky/80" : "text-foreground/50"
                        }`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
