import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("returns a single class unchanged", () => {
    expect(cn("text-red-500")).toBe("text-red-500")
  })

  it("joins multiple classes", () => {
    const result = cn("px-4", "py-2")
    expect(result).toContain("px-4")
    expect(result).toContain("py-2")
  })

  it("resolves conflicting Tailwind utilities — last wins", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
    expect(cn("p-4", "p-6")).toBe("p-6")
  })

  it("drops falsy conditional classes", () => {
    expect(cn("base", false && "excluded")).toBe("base")
    expect(cn("base", undefined, "extra")).toBe("base extra")
  })

  it("includes truthy conditional classes", () => {
    expect(cn("base", true && "included")).toBe("base included")
  })

  it("handles clsx object syntax", () => {
    expect(cn({ "text-red-500": true, "text-blue-500": false })).toBe("text-red-500")
  })

  it("returns empty string when given no arguments", () => {
    expect(cn()).toBe("")
  })
})
