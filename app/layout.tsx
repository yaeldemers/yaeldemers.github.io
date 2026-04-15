import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import type { ReactNode } from "react"
import Providers from "@/app/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://yaeldemers.com"),
  title: "Yael Demers | Software Developer & Researcher",
  description:
    "Software developer and researcher working at the intersection of secure system design, applied machine learning, and regulatory compliance. Based in Montréal.",
  keywords: [
    "software developer",
    "researcher",
    "full-stack development",
    "secure systems",
    "applied machine learning",
    "regulatory compliance",
    "healthtech",
    "Yael Demers",
  ],
  authors: [{ name: "Yael Demers" }],
  creator: "Yael Demers",
  publisher: "Yael Demers",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_CA",
    url: "https://yaeldemers.com",
    siteName: "Yael Demers",
    title: "Yael Demers | Software Developer & Researcher",
    description:
      "Software developer and researcher working at the intersection of secure system design, applied machine learning, and regulatory compliance.",
  },
  twitter: {
    card: "summary",
    title: "Yael Demers | Software Developer & Researcher",
    description: "Software developer and researcher. Secure systems, applied ML, compliance. Based in Montréal.",
  },
  alternates: {
    canonical: "https://yaeldemers.com",
    languages: {
      "en-US": "https://yaeldemers.com",
      "fr-CA": "https://yaeldemers.com?lang=fr",
    },
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFDF6" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0804" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Yael Demers",
              url: "https://yaeldemers.com",
              jobTitle: "Software Developer & Researcher",
              description:
                "Software developer and researcher working at the intersection of secure system design, applied machine learning, and regulatory compliance.",
              sameAs: ["https://github.com/yaeldemers", "https://linkedin.com/in/yaeldemers"],
              knowsAbout: [
                "Secure System Design",
                "Applied Machine Learning",
                "Regulatory Compliance",
                "Research",
                "Full-Stack Development",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "CA",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {/* eslint-disable i18next/no-literal-string -- server component; skip link is a structural accessibility element intentionally in English */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        {/* eslint-enable i18next/no-literal-string */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
