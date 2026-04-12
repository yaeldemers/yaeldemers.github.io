import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Reconstructs an email address from char codes at runtime. Keeps the plain
 *  address out of static HTML so simple harvesting bots cannot find it. */
export function decodeEmail(parts: readonly number[]): string {
  return parts.map((c) => String.fromCharCode(c)).join("")
}

/** Returns Tailwind classes for a research paper status badge. */
export function getStatusStyles(status: string): string {
  const isInProgress = status === "In Progress" || status === "En cours"
  const isPublished = status === "Published" || status === "Publié"

  if (isPublished) return "text-retro-sky bg-retro-sky/10 border-retro-sky/20"
  if (isInProgress) return "text-primary bg-primary/10 border-primary/20"
  return "text-foreground/50 bg-foreground/5 border-foreground/10"
}
