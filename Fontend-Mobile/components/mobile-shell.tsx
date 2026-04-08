"use client"

import type { ReactNode } from "react"

interface MobileShellProps {
  children: ReactNode
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gradient-peach/10 to-gradient-mint/10 flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
      </div>
      
      {/* Mobile device frame */}
      <div className="relative w-full max-w-[430px] h-[932px] bg-glass/40 backdrop-blur-md rounded-[3rem] border border-glass-border shadow-2xl shadow-glass-shadow/50 overflow-hidden">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-foreground/90 rounded-full z-50" />
        
        {/* Screen content */}
        <div className="relative h-full pt-12 overflow-hidden">
          {children}
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full" />
      </div>
    </div>
  )
}
