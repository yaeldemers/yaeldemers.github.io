"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Github, Linkedin } from "@/components/brand-icons"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/language-context"
import { useActiveSection } from "@/lib/hooks/use-active-section"
import { siteConfig } from "@/lib/site-config"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

type NavItem = { id: string; label: string }

interface NavigationProps {
  /** Override the default homepage nav items with page-specific sections. */
  sections?: NavItem[]
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

/**
 * Desktop shows a "roller" nav on the right, mobile shows a bottom nav.
 * The animation is intentionally subtle; if you want to go simpler, you can
 * replace the roller with a basic vertical list.
 */
export default function Navigation({ sections }: NavigationProps = {}) {
  const { language, setLanguage, t } = useLanguage()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  useEffect(() => {
    setMounted(true)
  }, [])

  function scrollToTop() {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  const defaultNavItems = useMemo<NavItem[]>(
    () => [
      { id: "about", label: t.nav.about },
      { id: "projects", label: t.nav.projects },
      { id: "research", label: t.nav.research },
      { id: "consulting", label: t.nav.consulting },
      { id: "contact", label: t.nav.contact },
    ],
    [t]
  )

  const navItems = sections ?? defaultNavItems

  const sectionIds = useMemo(() => navItems.map((n) => n.id) as string[], [navItems])
  const activeSection = useActiveSection(sectionIds)

  const activeIndex = useMemo(() => {
    const idx = navItems.findIndex((item) => item.id === activeSection)
    return idx === -1 ? 0 : idx
  }, [activeSection, navItems])

  const [isVisible, setIsVisible] = useState(!isHomePage)
  const [isHoveringTheme, setIsHoveringTheme] = useState(false)
  const [isAnimatingTheme, setIsAnimatingTheme] = useState(false)

  // Smoothly animate the roller index toward the active index.
  const animatedIndexRef = useRef(0)
  const [, rerender] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const tick = () => {
      const diff = activeIndex - animatedIndexRef.current
      if (Math.abs(diff) > 0.001) {
        animatedIndexRef.current += diff * 0.08
        rerender((n) => n + 1)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [activeIndex])

  useEffect(() => {
    if (!isHomePage) return // sub-pages always show the nav
    const onScroll = () => {
      // Hide nav until user scrolls past most of the hero.
      const heroHeight = window.innerHeight * 0.8
      setIsVisible(window.scrollY > heroHeight)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHomePage])

  const isDark = mounted && resolvedTheme === "dark"
  const toggleTheme = () => {
    setIsAnimatingTheme(true)
    // Small delay makes the overlay feel intentional instead of flickery.
    window.setTimeout(() => setTheme(isDark ? "light" : "dark"), 120)
    window.setTimeout(() => setIsAnimatingTheme(false), 420)
  }

  // Roller rendering.
  const itemHeight = 40
  const containerHeight = itemHeight * 5
  const animatedIndex = animatedIndexRef.current
  const fractionalOffset = animatedIndex - Math.floor(animatedIndex)

  const displayItems = useMemo(() => {
    const items: Array<NavItem & { key: string; offset: number }> = []
    const baseIndex = Math.floor(animatedIndex)
    const len = navItems.length

    const loop = (i: number) => ((i % len) + len) % len
    for (let i = -2; i <= 2; i++) {
      const idx = loop(baseIndex + i)
      items.push({ ...navItems[idx], offset: i, key: `${navItems[idx].id}-${baseIndex}-${i}` })
    }
    return items
    // We want the list to update as the roller moves.
  }, [animatedIndex, navItems])

  const mobileDisplayItems = useMemo(() => {
    const currentIndex = Math.round(animatedIndex)
    const len = navItems.length
    const loop = (i: number) => ((i % len) + len) % len

    const prevIdx = loop(currentIndex - 1)
    const currIdx = loop(currentIndex)
    const nextIdx = loop(currentIndex + 1)

    return [
      { ...navItems[prevIdx], position: "prev", key: `mobile-prev-${prevIdx}` },
      { ...navItems[currIdx], position: "current", key: `mobile-curr-${currIdx}` },
      { ...navItems[nextIdx], position: "next", key: `mobile-next-${nextIdx}` },
    ] as const
  }, [animatedIndex, navItems])

  return (
    <>
      {/* Theme toggle overlay (purely cosmetic) */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none bg-foreground transition-opacity duration-300 ${
          isAnimatingTheme ? "opacity-10" : "opacity-0"
        }`}
      />

      {/* Desktop roller */}
      <nav
        aria-label="Primary"
        className={`hidden lg:flex fixed right-12 top-1/2 -translate-y-1/2 z-50 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"
        }`}
      >
        <div className="relative flex items-center gap-6">
          <div
            className="relative overflow-hidden"
            style={{
              height: containerHeight,
              width: 128,
              maskImage: "linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)",
            }}
          >
            <div
              className="absolute inset-0 flex flex-col items-end justify-center"
              style={{ transform: `translateY(${-fractionalOffset * itemHeight}px)` }}
            >
              {displayItems.map((item) => {
                const distance = item.offset - fractionalOffset
                const isActive = Math.abs(distance) < 0.5
                const opacity = isActive ? 1 : Math.abs(distance) < 1.5 ? 0.5 : 0.2

                return (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center justify-end w-full"
                    style={{
                      height: itemHeight,
                      opacity,
                      transform: `scale(${isActive ? 1 : 0.9})`,
                      transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
                    }}
                  >
                    <span
                      className={`font-mono tracking-wide text-sm transition-colors text-right ${
                        isActive ? "text-retro-sky font-medium" : "text-foreground/60"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1" aria-hidden="true">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-retro-slate/30 dark:to-retro-sky/30 rounded-full" />
            <div className="w-2 h-2 bg-retro-slate dark:bg-retro-sky rounded-full" />
            <div className="w-px h-8 bg-gradient-to-t from-transparent to-retro-slate/30 dark:to-retro-sky/30 rounded-full" />
          </div>
        </div>

        <div className="absolute -bottom-20 right-0 flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className="text-foreground/40 hover:text-retro-sky transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-retro-sky/10 font-mono text-xs"
            aria-label={language === "en" ? "Switch language to French" : "Switch language to English"}
          >
            {language === "en" ? "FR" : "EN"}
          </button>

          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 hover:text-retro-sky transition-colors p-2 rounded-full hover:bg-retro-sky/10"
            aria-label="GitHub"
          >
            <Github size={16} aria-hidden="true" />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 hover:text-retro-sky transition-colors p-2 rounded-full hover:bg-retro-sky/10"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} aria-hidden="true" />
          </a>

          <button
            onClick={toggleTheme}
            onMouseEnter={() => setIsHoveringTheme(true)}
            onMouseLeave={() => setIsHoveringTheme(false)}
            className="text-foreground/40 hover:text-retro-sky transition-all p-2 rounded-full hover:bg-retro-sky/10"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun
                size={16}
                className={`transition-transform duration-500 ${isHoveringTheme ? "rotate-180 scale-110" : ""}`}
              />
            ) : (
              <Moon
                size={16}
                className={`transition-transform duration-500 ${isHoveringTheme ? "-rotate-90 scale-110" : ""}`}
              />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile header */}
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-12 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-3 font-mono text-sm tracking-wider"
            aria-label="Scroll to top"
          >
            {/* Desktop-only icon (hidden on mobile) */}
            <span
              className="
                relative hidden lg:block w-12 h-8
                transition-transform duration-300
                group-hover:translate-y-[-2.5px]
              "
            >
              {mounted && (
                <Image
                  src={
                    resolvedTheme === "dark"
                      ? "/images/swordfish-ii-outline-thick-white.png"
                      : "/images/swordfish-ii-outline-thick.png"
                  }
                  alt=""
                  fill
                  priority={false}
                />
              )}
            </span>

            <span className="text-retro-slate dark:text-retro-sky transition-colors">
              {siteConfig.name.toUpperCase()}
            </span>
          </button>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              className="text-foreground/60 hover:text-retro-sky transition-colors w-8 h-8 flex items-center justify-center rounded-full font-mono text-xs"
              aria-label={language === "en" ? "Switch language to French" : "Switch language to English"}
            >
              {language === "en" ? "FR" : "EN"}
            </button>

            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-retro-sky transition-colors p-2 rounded-full"
              aria-label="GitHub"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-retro-sky transition-colors p-2 rounded-full"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>

            <button
              onClick={toggleTheme}
              onMouseEnter={() => setIsHoveringTheme(true)}
              onMouseLeave={() => setIsHoveringTheme(false)}
              className="text-foreground/60 hover:text-retro-sky transition-colors p-2 rounded-full"
              aria-label={!mounted ? "Toggle theme" : isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {!mounted ? (
                <span className="sr-only">{t.nav.toggleTheme}</span>
              ) : isDark ? (
                <Sun
                  size={18}
                  className={`transition-transform duration-500 ${isHoveringTheme ? "rotate-180 scale-110" : ""}`}
                />
              ) : (
                <Moon
                  size={18}
                  className={`transition-transform duration-500 ${isHoveringTheme ? "-rotate-90 scale-110" : ""}`}
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav
        aria-label="Primary"
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <div className="relative flex items-center justify-center py-4 px-6">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-retro-slate/30 dark:bg-retro-sky/30" />

          <div className="grid grid-cols-3 items-center w-full max-w-xs">
            {mobileDisplayItems.map((item) => {
              const isActive = item.position === "current"
              return (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className="flex flex-col items-center gap-1 transition-all duration-300"
                  style={{ opacity: isActive ? 1 : 0.4, transform: `scale(${isActive ? 1.05 : 0.9})` }}
                >
                  <span
                    className={`text-sm font-mono transition-colors duration-300 ${
                      isActive ? "text-retro-slate dark:text-retro-sky" : "text-foreground/60"
                    }`}
                  >
                    {item.label}
                  </span>
                  <div
                    className="w-1 h-1 rounded-full bg-retro-slate dark:bg-retro-sky transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0 }}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
