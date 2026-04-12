import { describe, it, expect } from "vitest"
import translations from "@/lib/translations.json"

/** Recursively collect all dot-notation key paths from an object. */
function collectKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const full = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      return collectKeys(value as Record<string, unknown>, full)
    }
    return [full]
  })
}

const enKeys = collectKeys(translations.en as Record<string, unknown>)
const frKeys = collectKeys(translations.fr as Record<string, unknown>)

describe("translations completeness", () => {
  it("every EN key exists in FR", () => {
    const missing = enKeys.filter((k) => !frKeys.includes(k))
    expect(missing, `Keys in EN but missing in FR: ${missing.join(", ")}`).toHaveLength(0)
  })

  it("every FR key exists in EN", () => {
    const extra = frKeys.filter((k) => !enKeys.includes(k))
    expect(extra, `Keys in FR but missing in EN: ${extra.join(", ")}`).toHaveLength(0)
  })

  it("no translation value is an empty string", () => {
    const emptyEN = enKeys.filter((k) => {
      const parts = k.split(".")
      let val: unknown = translations.en
      for (const p of parts) val = (val as Record<string, unknown>)[p]
      return val === ""
    })
    expect(emptyEN, `Empty EN values: ${emptyEN.join(", ")}`).toHaveLength(0)
  })
})
