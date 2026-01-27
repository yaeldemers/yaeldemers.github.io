"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const projectTech = {
  featured: ["Artificial Intelligence (AI)", "Healthcare Productivity", "Automation", "SaaS"],
  other: [
    ["", "", "", ""],
    ["", "", "", ""],
  ],
}

export default function TechnicalProjects() {
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
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 px-6 md:px-12 lg:px-24 lg:pr-72"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-5xl mx-auto lg:mx-0">
        <header
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-retro-slate dark:text-retro-sky text-sm font-mono tracking-widest" aria-hidden="true">
              {t.projects.section}
            </span>
            <div className="h-px w-12 bg-retro-slate/30 dark:bg-retro-sky/30" aria-hidden="true" />
          </div>
          <h2 id="projects-heading" className="font-sans text-foreground text-3xl md:text-4xl font-bold">
            {t.projects.title}
          </h2>
          <p className="text-foreground/40 font-mono text-sm mt-2">{t.projects.comment}</p>
        </header>

        {/* Featured Project */}
        <article
          className={`group relative rounded-2xl border border-border overflow-hidden mb-12
            transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } hover:border-retro-sky/50`}
          style={{ transitionDelay: "200ms" }}
          aria-labelledby="featured-project-title"
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1 bg-retro-sky group-hover:bg-primary transition-colors duration-300"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-retro-sky/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden="true"
          />

          <div className="relative p-8 pl-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1.5 rounded-full font-mono bg-retro-sky/10 text-retro-sky border border-retro-sky/20">
                  {t.projects.featured.status}
                </span>
                <time className="font-mono text-sm text-foreground/40" dateTime="2024">
                  {t.projects.featured.year}
                </time>
              </div>
              <div className="flex gap-3">
                {/*
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border 
                    hover:border-retro-sky hover:bg-retro-sky/10 hover:text-retro-sky text-foreground/60 
                    text-sm transition-all duration-300"
                  aria-label={`View source code for ${t.projects.featured.title}`}
                >
                  <Github size={16} aria-hidden="true" />
                  <span>{t.projects.code}</span>
                </a>
                */}
                <a
                  href="https://www.endatechnologies.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border 
                    hover:border-retro-sky hover:bg-retro-sky/10 hover:text-retro-sky text-foreground/60 
                    text-sm transition-all duration-300 group/link"
                  aria-label={`View live demo of ${t.projects.featured.title}`}
                >
                  <span>{t.projects.demo}</span>
                  <ArrowRight
                    size={16}
                    className="group-hover/link:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <h3
              id="featured-project-title"
              className="font-sans text-2xl md:text-3xl font-semibold mb-4 text-foreground group-hover:text-retro-sky transition-colors duration-300"
            >
              {t.projects.featured.title}
            </h3>

            <p className="text-foreground/60 text-base mb-6 leading-relaxed max-w-3xl">
              {t.projects.featured.description}
            </p>

            <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
              {projectTech.featured.map((tech) => (
                <li
                  key={tech}
                  className="text-sm px-4 py-2 rounded-full border border-border text-foreground/50 
                    group-hover:border-retro-sky/30 group-hover:text-retro-sky/80 transition-all duration-300"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Other projects */}
        {/*
        <div className="space-y-4" role="list" aria-label="Other projects">
          <p className="text-foreground/40 text-sm font-mono mb-4">{t.projects.otherProjects}</p>
          {t.projects.other.map((project, index) => (
            <article
              key={project.title}
              className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-5 
                rounded-xl border border-border/50 hover:border-retro-sky/30 hover:bg-retro-sky/5
                transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              role="listitem"
            >
              <div className="flex items-center gap-4">
                <time className="font-mono text-xs text-foreground/30" dateTime={project.year}>
                  {project.year}
                </time>
                <h3 className="font-sans text-foreground group-hover:text-retro-sky transition-colors">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <ul className="flex gap-2" aria-label={`Technologies for ${project.title}`}>
                  {projectTech.other[index]?.slice(0, 3).map((tech) => (
                    <li key={tech} className="text-xs text-foreground/40">
                      {tech}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="text-foreground/40 hover:text-retro-sky transition-colors"
                  aria-label={`View source code for ${project.title}`}
                >
                  <Github size={16} aria-hidden="true" />
                </a>
                <a
                  href="#"
                  className="text-foreground/40 hover:text-retro-sky transition-colors"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>  
        */}
      </div>
    </section>
  )
}
