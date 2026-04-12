"use client"

import { useState, useRef, useEffect } from "react"
import { Github, Linkedin, ArrowUp } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "next-themes"
import { siteConfig } from "@/lib/site-config"

const bebopQuotes = [
  "See you, space cowboy.",
  "You're Gonna Carry That Weight.",
  "Hunger is the best spice they say.",
  "Ein, you're a cow woof woof.",
  "And you will shed tears of scarlet.",
  "Whatever happens, happens.",
  "I'm going to take a smoke break.",
  "Bell peppers and beef.",
  "Don't leave food in the fridge.",
  "(4 minute 30 second harmonica solo with occasional guitar strums in the background)",
  "You sing off key.",
  "You think I look like I got money?",
  "Be like water.",
  "I love a woman that can kick my ass.",
  "Bang.",
  "Nice tune, real easy.", // Added this quote to the list
]

export default function Footer() {
  const { t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(bebopQuotes[0])
  const remainingQuotesRef = useRef<string[]>([...bebopQuotes].slice(1))

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleShipClick = () => {
    if (remainingQuotesRef.current.length === 0) {
      // Reset the list, excluding current quote
      remainingQuotesRef.current = bebopQuotes.filter((q) => q !== currentQuote)
    }

    const randomIndex = Math.floor(Math.random() * remainingQuotesRef.current.length)
    const nextQuote = remainingQuotesRef.current[randomIndex]
    remainingQuotesRef.current.splice(randomIndex, 1)
    setCurrentQuote(nextQuote)
  }

  return (
    <footer
      className="py-16 px-6 md:px-12 lg:px-24 lg:pr-72 border-t border-border relative overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-5xl mx-auto lg:mx-0 relative">
        <nav
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12"
          aria-label="Footer navigation"
        >
          <div>
            <p className="text-retro-slate dark:text-retro-sky text-sm font-mono mb-4 tracking-widest flex items-center gap-2">
              <span className="w-8 h-px bg-retro-slate/30 dark:bg-retro-sky/30" aria-hidden="true" />
              {t.footer.connect}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-border 
                  hover:border-retro-sky hover:bg-retro-sky/5 text-foreground/60 hover:text-retro-sky transition-all duration-300"
                aria-label="Visit GitHub profile"
              >
                <Github size={18} aria-hidden="true" />
                <span className="text-sm">{t.footer.github}</span>
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-border 
                  hover:border-retro-sky hover:bg-retro-sky/5 text-foreground/60 hover:text-retro-sky transition-all duration-300"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin size={18} aria-hidden="true" />
                <span className="text-sm">{t.footer.linkedin}</span>
              </a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-5 py-3 rounded-full border border-border 
              hover:border-primary hover:bg-primary/5 text-foreground/40 hover:text-primary transition-all duration-300"
            aria-label="Scroll back to top of page"
          >
            <span className="text-sm font-mono">{t.footer.backToTop}</span>
            <ArrowUp
              size={18}
              className="group-hover:-translate-y-1 transition-transform duration-300"
              aria-hidden="true"
            />
          </button>
        </nav>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <button
            onClick={handleShipClick}
            className="relative w-12 h-8 hover:scale-110 transition-transform duration-300 cursor-pointer"
            aria-label="Click for a random Cowboy Bebop quote"
          >
            {mounted && (
              <Image
                src={
                  resolvedTheme === "dark"
                    ? "/images/swordfish-ii-outline-thick-white.png"
                    : "/images/swordfish-ii-outline-thick.png"
                }
                alt="Swordfish II spaceship from Cowboy Bebop"
                fill
                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            )}
          </button>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="mb-8 text-center" aria-live="polite">
          <p className="text-retro-slate/60 dark:text-retro-sky/60 font-mono text-sm italic tracking-wider transition-all duration-500">
            &ldquo;{currentQuote}&rdquo;
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/30 text-sm">{t.footer.credit}</p>
          <span className="text-foreground/20 text-xs font-mono">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
