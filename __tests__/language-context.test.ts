import { describe, it, expect } from "vitest"
import { isValidLanguage } from "@/lib/language-context"

describe("isValidLanguage", () => {
  it("accepts 'en'", () => {
    expect(isValidLanguage("en")).toBe(true)
  })

  it("accepts 'fr'", () => {
    expect(isValidLanguage("fr")).toBe(true)
  })

  it("rejects unknown language codes", () => {
    expect(isValidLanguage("es")).toBe(false)
    expect(isValidLanguage("de")).toBe(false)
  })

  it("rejects null and undefined", () => {
    expect(isValidLanguage(null)).toBe(false)
    expect(isValidLanguage(undefined)).toBe(false)
  })

  it("rejects empty string", () => {
    expect(isValidLanguage("")).toBe(false)
  })

  it("rejects non-string types", () => {
    expect(isValidLanguage(1)).toBe(false)
    expect(isValidLanguage(true)).toBe(false)
    expect(isValidLanguage({})).toBe(false)
  })
})
