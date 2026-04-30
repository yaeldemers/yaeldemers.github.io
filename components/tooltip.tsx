interface TooltipProps {
  text: string
  children: React.ReactNode
}

export function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className="relative group/tooltip">
      {children}
      <span
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          px-2 py-1 text-xs bg-background border border-border rounded-md text-foreground/60
          whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200"
      >
        {text}
      </span>
    </div>
  )
}
