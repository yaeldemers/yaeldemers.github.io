"use client"

import { useState, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function HeroSection() {
  const { t } = useLanguage()
  const [collapsed, setCollapsed] = useState(false)
  const [letterStates, setLetterStates] = useState<number[]>([])
  const [exclamationFallen, setExclamationFallen] = useState(false)

  const text = "Hello, World!"
  const exclamationIndex = text.length - 1

  const handleTextClick = useCallback(() => {
    if (collapsed) {
      setCollapsed(false)
      setLetterStates([])
      setExclamationFallen(false)
      return
    }

    setCollapsed(true)
    setExclamationFallen(false)

    text.split("").forEach((_, i) => {
      setTimeout(() => {
        setLetterStates((prev) => [...prev, i])
      }, i * 40)
    })

    const totalLeanTime = text.length * 40 + 700
    setTimeout(() => {
      setExclamationFallen(true)
    }, totalLeanTime)
  }, [collapsed])

  return (
    <section
      className="relative h-screen w-full flex flex-col items-center justify-center px-6"
      aria-label="Hero section"
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative text-center max-w-3xl">
        <p className="text-retro-slate dark:text-retro-sky font-mono text-sm mb-8 tracking-[0.3em] uppercase">
          {t.hero.portfolio}
        </p>

        <h1
          className="font-sans text-foreground text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight cursor-pointer select-none"
          onClick={handleTextClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleTextClick()
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={collapsed ? t.hero.clickToReset : "Click for animation: Hello, world!"}
          title="Click me!"
        >
          {text.split("").map((letter, i) => {
            const isCollapsed = letterStates.includes(i)
            const isExclamation = i === exclamationIndex
            const leanAngle = 15 + i * 0.5

            let rotation = 0
            if (isCollapsed) {
              if (isExclamation && exclamationFallen) {
                rotation = 90
              } else {
                rotation = leanAngle
              }
            }

            return (
              <span
                key={i}
                className="inline-block transition-all"
                style={{
                  transformOrigin: isExclamation ? "bottom center" : "bottom left",
                  transitionDuration: isExclamation && exclamationFallen ? "400ms" : isCollapsed ? "600ms" : "400ms",
                  transitionTimingFunction:
                    isExclamation && exclamationFallen
                      ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                      : isCollapsed
                        ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                        : "ease-out",
                  transform: `rotate(${rotation}deg)`,
                  opacity: 1,
                }}
                aria-hidden="true"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            )
          })}
          <span className="sr-only">Hello, world!</span>
        </h1>

        <div className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
          <div className="h-px w-12 bg-retro-slate/30 dark:bg-retro-sky/30" />
          <p className="text-foreground/60 font-mono text-sm tracking-widest">{t.hero.subtitle}</p>
          <div className="h-px w-12 bg-retro-slate/30 dark:bg-retro-sky/30" />
        </div>

        <p className="text-foreground/50 text-lg max-w-md mx-auto">{t.hero.role}</p>

        <p
          className={`text-foreground/20 text-xs mt-4 font-mono transition-opacity duration-500 relative z-20 ${
            collapsed ? "opacity-100 cursor-pointer hover:text-foreground/40" : "opacity-0 pointer-events-none"
          }`}
          aria-live="polite"
          onClick={collapsed ? handleTextClick : undefined}
        >
          {t.hero.clickToReset}
        </p>
      </div>

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-foreground/40 hover:text-retro-slate dark:hover:text-retro-sky 
          transition-colors flex flex-col items-center gap-2 group z-10"
        aria-label="Scroll down to About section"
      >
        <span className="text-xs font-mono uppercase tracking-widest">{t.hero.scroll}</span>
        <ChevronDown size={18} className="animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
