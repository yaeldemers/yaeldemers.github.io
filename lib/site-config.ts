export const siteConfig = {
  name: "Yael Demers",
  title: "Yael Demers | Software Developer & Researcher",
  url: "https://yaeldemers.com",
  // Email encoded as char codes to prevent bot harvesting from static HTML.
  // To swap address: replace the array with the new email's char codes.
  // Current: yaeldemers@gmail.com
  // Future:  hello@yaeldemers.com → [104,101,108,108,111,64,121,97,101,108,100,101,109,101,114,115,46,99,111,109]
  emailParts: [121,97,101,108,100,101,109,101,114,115,64,103,109,97,105,108,46,99,111,109],
  socials: {
    github: "https://github.com/yaeldemers",
    linkedin: "https://linkedin.com/in/yaeldemers",
  },
} as const
