"use client"

import Image from "next/image"
import { Search, TrendingUp, X, Hash } from "lucide-react"
import { useState } from "react"

const trendingTopics = [
  { tag: "DesignTrends", posts: "24.5K" },
  { tag: "CreativeDaily", posts: "18.2K" },
  { tag: "SunsetVibes", posts: "12.8K" },
  { tag: "CoffeeLovers", posts: "9.4K" },
]

const suggestedUsers = [
  { id: 1, name: "Luna Martinez", username: "lunamtz", avatar: "/avatars/luna.jpg", followers: "12.4K", isFollowing: false },
  { id: 2, name: "Sơn Tùng MTP", username: "sontungmtp", avatar: "/avatars/marcus.jpg", followers: "8.7K", isFollowing: true },
  { id: 3, name: "Aria Johnson", username: "ariaj", avatar: "/avatars/aria.jpg", followers: "23.1K", isFollowing: false },
  { id: 4, name: "Nova Kim", username: "novak", avatar: "/avatars/nova.png", followers: "15.9K", isFollowing: false },
]

const exploreImages = [
  { id: 1, image: "/posts/sunset-city.jpg", span: "col-span-2 row-span-2" },
  { id: 2, image: "/avatars/luna.jpg", span: "" },
  { id: 3, image: "/avatars/marcus.jpg", span: "" },
  { id: 4, image: "/posts/coffee-brunch.jpg", span: "" },
  { id: 5, image: "/avatars/aria.jpg", span: "" },
  { id: 6, image: "/avatars/nova.png", span: "col-span-2 row-span-2" },
  { id: 7, image: "/avatars/jasper.jpg", span: "" },
  { id: 8, image: "/avatars/felix.jpg", span: "" },
]

interface SearchScreenProps {
  onBack?: () => void
}

export function SearchScreen({ onBack }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"explore" | "people" | "tags">("explore")

  const isSearching = searchQuery.length > 0

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Search Header */}
      <div className="px-4 py-3 border-b border-glass-border/50 bg-glass/30 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search people, tags, places..."
            className="w-full pl-10 pr-10 py-3 bg-glass/60 backdrop-blur-sm border border-glass-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          {(["explore", "people", "tags"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-glass/50 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        {activeTab === "explore" && (
          <>
            {/* Trending Section */}
            {!isSearching && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Trending Now</h2>
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                  {trendingTopics.map((topic) => (
                    <div
                      key={topic.tag}
                      className="flex-shrink-0 px-4 py-3 bg-glass/60 backdrop-blur-sm border border-glass-border rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <p className="font-semibold text-foreground text-sm">#{topic.tag}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{topic.posts} posts</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Explore Grid */}
            <div className="px-1">
              <h2 className="font-semibold text-foreground px-3 mb-3">
                {isSearching ? `Results for "${searchQuery}"` : "Explore"}
              </h2>
              <div className="grid grid-cols-3 gap-0.5">
                {exploreImages.map((item) => (
                  <div
                    key={item.id}
                    className={`relative aspect-square cursor-pointer group ${item.span}`}
                  >
                    <Image
                      src={item.image}
                      alt="Explore"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "people" && (
          <div className="p-4 space-y-3">
            <h2 className="font-semibold text-foreground mb-1">Suggested for You</h2>
            {suggestedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 bg-glass/50 backdrop-blur-sm border border-glass-border rounded-2xl hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-glass-border">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.followers} followers</p>
                </div>
                <button
                  className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                    user.isFollowing
                      ? "bg-glass/60 border border-glass-border text-foreground"
                      : "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md shadow-primary/20"
                  }`}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tags" && (
          <div className="p-4 space-y-3">
            <h2 className="font-semibold text-foreground mb-1">Popular Tags</h2>
            {[...trendingTopics, ...trendingTopics].map((topic, index) => (
              <div
                key={`${topic.tag}-${index}`}
                className="flex items-center gap-3 p-3 bg-glass/50 backdrop-blur-sm border border-glass-border rounded-2xl hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Hash className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">#{topic.tag}</p>
                  <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
