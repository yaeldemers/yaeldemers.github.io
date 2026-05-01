import { describe, it, expect } from "vitest"
import { findActiveSection } from "@/lib/hooks/use-active-section"

const section = (id: string, offsetTop: number, offsetHeight: number) => ({ id, offsetTop, offsetHeight })

describe("findActiveSection", () => {
  const sections = [
    section("hero", 0, 600),
    section("about", 600, 500),
    section("projects", 1100, 800),
    section("contact", 1900, 400),
  ]

  it("returns the section whose bounds contain the adjusted scroll position", () => {
    expect(findActiveSection(sections, 0, 0)).toBe("hero")
    expect(findActiveSection(sections, 600, 0)).toBe("about")
    expect(findActiveSection(sections, 1100, 0)).toBe("projects")
    expect(findActiveSection(sections, 1900, 0)).toBe("contact")
  })

  it("applies the offsetPx to the scroll position before matching", () => {
    // scrollY=440 + offset=160 = 600 → "about"
    expect(findActiveSection(sections, 440, 160)).toBe("about")
    // scrollY=940 + offset=160 = 1100 → "projects"
    expect(findActiveSection(sections, 940, 160)).toBe("projects")
  })

  it("returns null when scroll is above all sections", () => {
    // y=-10 is before the first section's top (0)
    expect(findActiveSection(sections, -10, 0)).toBeNull()
  })

  it("returns null when scroll is past the last section's bottom", () => {
    // last section bottom = 1900 + 400 = 2300; y=2300 is no longer < 2300
    expect(findActiveSection(sections, 2300, 0)).toBeNull()
  })

  it("matches the first section whose bounds contain y (no overlap assumed)", () => {
    // y is exactly at the boundary between hero and about (600)
    // hero: 0 ≤ 600 < 600 → false (600 is not < 600)
    // about: 600 ≤ 600 < 1100 → true
    expect(findActiveSection(sections, 600, 0)).toBe("about")
  })

  it("returns null for an empty element list", () => {
    expect(findActiveSection([], 500, 160)).toBeNull()
  })

  it("works with a single section", () => {
    const single = [section("only", 0, 1000)]
    expect(findActiveSection(single, 500, 0)).toBe("only")
    expect(findActiveSection(single, 1000, 0)).toBeNull()
  })

  it("offset of zero behaves the same as no offset", () => {
    expect(findActiveSection(sections, 300, 0)).toBe("hero")
    expect(findActiveSection(sections, 700, 0)).toBe("about")
  })
})
