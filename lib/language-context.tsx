"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import translations from "./translations.json"

type Language = "en" | "fr"
type Translations = typeof translations.en

export function isValidLanguage(val: unknown): val is Language {
  return val === "en" || val === "fr"
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language")
    if (isValidLanguage(saved)) {
      setLanguage(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = translations[language] as Translations

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
