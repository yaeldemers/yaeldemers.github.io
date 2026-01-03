import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import type { ReactNode } from "react"
import Providers from "@/app/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" })

export const metadata: Metadata = {
  title: "Yael Demers | Software Developer & Researcher",
  description:
    "Portfolio of Yael Demers - Software Developer and Research Enthusiast specializing in full-stack development, machine learning, and building exceptional digital experiences.",
  keywords: [
    "software developer",
    "researcher",
    "full-stack",
    "machine learning",
    "web development",
    "portfolio",
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
    siteName: "Yael Demers Portfolio",
    title: "Yael Demers | Software Developer & Researcher",
    description:
      "Portfolio of Yael Demers - Software Developer and Research Enthusiast specializing in full-stack development and machine learning.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yael Demers - Software Developer & Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yael Demers | Software Developer & Researcher",
    description: "Portfolio of Yael Demers - Software Developer and Research Enthusiast.",
    images: ["/og-image.jpg"],
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
                "Software Developer and Research Enthusiast specializing in full-stack development and machine learning.",
              sameAs: ["https://github.com/yaeldemers", "https://linkedin.com/in/yaeldemers"],
              knowsAbout: ["Software Development", "Machine Learning", "Full-Stack Development", "Research"],
              address: {
                "@type": "PostalAddress",
                addressCountry: "CA",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Providers>
          <main id="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
