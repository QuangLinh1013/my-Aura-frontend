"use client"

import { Bell, MessageCircle } from "lucide-react"

interface AppHeaderProps {
  onNotificationsClick?: () => void
  onMessagesClick?: () => void
  notificationCount?: number
  messageCount?: number
}

export function AppHeader({ 
  onNotificationsClick, 
  onMessagesClick,
  notificationCount = 3,
  messageCount = 5,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-glass/70 backdrop-blur-2xl border-b border-glass-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-gradient-peach to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent">
            Aura
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onNotificationsClick}
            className="relative p-2.5 rounded-xl bg-glass/60 backdrop-blur-sm border border-glass-border hover:bg-muted/60 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Bell className="w-5 h-5 text-foreground/80" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-primary to-gradient-peach rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-md">
                {notificationCount}
              </span>
            )}
          </button>
          <button 
            onClick={onMessagesClick}
            className="relative p-2.5 rounded-xl bg-glass/60 backdrop-blur-sm border border-glass-border hover:bg-muted/60 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 text-foreground/80" />
            {messageCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-[10px] font-bold text-secondary-foreground shadow-md">
                {messageCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
