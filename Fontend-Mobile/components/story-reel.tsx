"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const stories = [
  { id: 1, name: "Your Story", image: "/avatars/felix.jpg", isOwn: true, hasNew: false },
  { id: 2, name: "Luna", image: "/avatars/luna.jpg", isOwn: false, hasNew: true },
  { id: 3, name: "Sơn Tùng MTP", image: "/avatars/marcus.jpg", isOwn: false, hasNew: true },
  { id: 4, name: "Mark Zuckerberg", image: "/avatars/aria.jpg", isOwn: false, hasNew: true },
  { id: 5, name: "Felix", image: "/avatars/felix.jpg", isOwn: false, hasNew: false },
  { id: 6, name: "Nova", image: "/avatars/nova.png", isOwn: false, hasNew: true },
  { id: 7, name: "Jasper", image: "/avatars/jasper.jpg", isOwn: false, hasNew: false },
]

export function StoryReel() {
  const [activeStory, setActiveStory] = useState<number | null>(null)

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4 px-4">
      <div className="flex gap-4">
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => setActiveStory(story.id)}
            className="flex flex-col items-center gap-2 min-w-[72px] group"
          >
            <div
              className={`relative p-[3px] rounded-full transition-transform duration-200 group-hover:scale-105 ${
                story.hasNew
                  ? "bg-gradient-to-br from-gradient-peach via-primary to-gradient-mint"
                  : story.isOwn
                  ? "bg-transparent"
                  : "bg-muted"
              }`}
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-glass backdrop-blur-md border-2 border-glass-border">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                {story.isOwn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-glass/60 backdrop-blur-sm">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <Plus className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>
              {activeStory === story.id && (
                <div className="absolute -inset-1 rounded-full border-2 border-primary animate-pulse" />
              )}
            </div>
            <span className="text-xs font-medium text-foreground/80 truncate max-w-[64px]">
              {story.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
