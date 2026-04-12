import { describe, it, expect } from "vitest"
import { siteConfig } from "@/lib/site-config"
import { decodeEmail } from "@/lib/utils"

describe("siteConfig", () => {
  it("url is a valid https URL", () => {
    expect(siteConfig.url).toMatch(/^https:\/\//)
  })

  it("emailParts decodes to a valid email address", () => {
    const email = decodeEmail(siteConfig.emailParts)
    expect(email).toContain("@")
    expect(email).toContain(".")
    expect(email.split("@")).toHaveLength(2)
  })

  it("github social link is a valid https URL", () => {
    expect(siteConfig.socials.github).toMatch(/^https:\/\/github\.com\//)
  })

  it("linkedin social link is a valid https URL", () => {
    expect(siteConfig.socials.linkedin).toMatch(/^https:\/\/linkedin\.com\//)
  })

  it("name is non-empty", () => {
    expect(siteConfig.name.trim().length).toBeGreaterThan(0)
  })
})
