import { describe, it, expect } from "vitest"
import { getStatusStyles } from "@/lib/utils"

describe("getStatusStyles", () => {
  it("returns sky styles for Published", () => {
    const result = getStatusStyles("Published")
    expect(result).toContain("retro-sky")
  })

  it("returns sky styles for Publié (French)", () => {
    const result = getStatusStyles("Publié")
    expect(result).toContain("retro-sky")
  })

  it("returns primary styles for In Progress", () => {
    const result = getStatusStyles("In Progress")
    expect(result).toContain("primary")
  })

  it("returns primary styles for En cours (French)", () => {
    const result = getStatusStyles("En cours")
    expect(result).toContain("primary")
  })

  it("returns muted styles for unknown status", () => {
    const result = getStatusStyles("Draft")
    expect(result).toContain("foreground")
    expect(result).not.toContain("retro-sky")
    expect(result).not.toContain("primary")
  })

  it("returns muted styles for empty string", () => {
    const result = getStatusStyles("")
    expect(result).toContain("foreground")
  })
})
