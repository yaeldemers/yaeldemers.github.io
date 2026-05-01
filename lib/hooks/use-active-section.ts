"use client"

import { useEffect, useRef, useState } from "react"

type SectionBounds = { id: string; offsetTop: number; offsetHeight: number }

/**
 * Pure helper: returns the id of the first section whose bounds contain `scrollY + offsetPx`,
 * or null if none match.
 */
export function findActiveSection(elements: SectionBounds[], scrollY: number, offsetPx: number): string | null {
  const y = scrollY + offsetPx
  for (const el of elements) {
    const top = el.offsetTop
    const bottom = top + el.offsetHeight
    if (y >= top && y < bottom) return el.id
  }
  return null
}

/**
 * Tracks which section is currently active based on scroll position.
 *
 * This avoids per-frame work and keeps the logic self-contained.
 */
export function useActiveSection(sectionIds: readonly string[], offsetPx = 160) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "")
  const activeRef = useRef(activeSection)
  activeRef.current = activeSection

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const onScroll = () => {
      const matched = findActiveSection(elements, window.scrollY, offsetPx)
      if (matched !== null && matched !== activeRef.current) setActiveSection(matched)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- serialized key intentionally replaces the array reference
  }, [sectionIds.join("|"), offsetPx])

  return activeSection
}
