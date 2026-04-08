"use client"

import { Home, Search, PlusSquare, MessageCircle, User } from "lucide-react"

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "search", icon: Search, label: "Search" },
  { id: "create", icon: PlusSquare, label: "Create" },
  { id: "messages", icon: MessageCircle, label: "Messages", badge: 3 },
  { id: "profile", icon: User, label: "Profile" },
]

export type TabId = "home" | "search" | "create" | "messages" | "profile"

interface BottomNavigationProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  onCreateClick?: () => void
}

export function BottomNavigation({ activeTab, onTabChange, onCreateClick }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-4 mb-4 bg-glass/90 backdrop-blur-2xl rounded-3xl border border-glass-border shadow-xl shadow-glass-shadow/40">
        <div className="flex items-center justify-around py-3 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            const isCreate = item.id === "create"

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isCreate && onCreateClick) {
                    onCreateClick()
                  } else {
                    onTabChange(item.id as TabId)
                  }
                }}
                className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                  isCreate ? "scale-100" : ""
                }`}
              >
                {isCreate ? (
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-transform duration-200">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                ) : (
                  <>
                    <div
                      className={`p-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary/15"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 transition-all duration-300 ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-primary to-gradient-peach rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-md">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {isActive && (
                      <div className="w-1 h-1 bg-primary rounded-full mt-1 animate-pulse" />
                    )}
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
