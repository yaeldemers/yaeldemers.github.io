import { describe, it, expect } from "vitest"
import { decodeEmail } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

describe("decodeEmail", () => {
  it("reconstructs yaeldemers@gmail.com from char codes", () => {
    const parts = [121, 97, 101, 108, 100, 101, 109, 101, 114, 115, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109]
    expect(decodeEmail(parts)).toBe("yaeldemers@gmail.com")
  })

  it("reconstructs hello@yaeldemers.com from char codes", () => {
    const parts = [104, 101, 108, 108, 111, 64, 121, 97, 101, 108, 100, 101, 109, 101, 114, 115, 46, 99, 111, 109]
    expect(decodeEmail(parts)).toBe("hello@yaeldemers.com")
  })

  it("returns empty string for empty array", () => {
    expect(decodeEmail([])).toBe("")
  })

  it("result contains @ sign", () => {
    expect(decodeEmail(siteConfig.emailParts)).toContain("@")
  })
})
