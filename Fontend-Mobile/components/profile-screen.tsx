"use client"

import Image from "next/image"
import { Settings, Grid3X3, Bookmark, Heart, MapPin, Link2, Calendar, MoreHorizontal, UserPlus } from "lucide-react"
import { useState } from "react"

const userStats = [
  { label: "Posts", value: "142" },
  { label: "Followers", value: "12.4K" },
  { label: "Following", value: "892" },
]

const userPosts = [ 
  { id: 1, image: "/posts/sunset-city.jpg", likes: 247 },
  { id: 2, image: "/posts/coffee-brunch.jpg", likes: 156 },
  { id: 3, image: "/avatars/luna.jpg", likes: 89 },
  { id: 4, image: "/avatars/aria.jpg", likes: 312 },
  { id: 5, image: "/avatars/nova.png", likes: 178 },
  { id: 6, image: "/posts/sunset-city.jpg", likes: 423 },
]

interface ProfileScreenProps {
  onBack?: () => void
}

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts")

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border/50 bg-glass/30 backdrop-blur-sm">
        <h1 className="text-lg font-bold text-foreground">felix.rivera</h1>
        <button className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
          <Settings className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        {/* Profile Header */}
        <div className="p-4">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-br from-primary to-secondary">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                  <Image
                    src="/avatars/felix.jpg"
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 flex items-center justify-around pt-2">
              {userStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Name & Bio */}
          <div className="mt-4">
            <h2 className="font-semibold text-foreground">Felix Rivera</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Designer & Creative Thinker
            </p>
            <p className="text-sm text-foreground/80 mt-2 leading-relaxed">
              Crafting beautiful experiences through design. Coffee enthusiast. Always learning, always creating.
            </p>
            
            {/* Info Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                San Francisco, CA
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Link2 className="w-3 h-3" />
                <span className="text-primary">felixrivera.design</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                Joined March 2023
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              Edit Profile
            </button>
            <button className="flex-1 py-2.5 bg-glass/60 backdrop-blur-sm border border-glass-border text-foreground font-semibold rounded-xl hover:bg-muted/50 transition-colors">
              Share Profile
            </button>
            <button className="p-2.5 bg-glass/60 backdrop-blur-sm border border-glass-border rounded-xl hover:bg-muted/50 transition-colors">
              <UserPlus className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Story Highlights */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Highlights</h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {["Travel", "Design", "Food", "Life"].map((highlight, i) => (
                <div key={highlight} className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-glass/60 backdrop-blur-sm border border-glass-border flex items-center justify-center">
                    <span className="text-2xl">{["✈️", "🎨", "🍕", "✨"][i]}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{highlight}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-glass/40 backdrop-blur-sm border border-dashed border-glass-border flex items-center justify-center">
                  <span className="text-xl text-muted-foreground">+</span>
                </div>
                <span className="text-xs text-muted-foreground">New</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 flex border-y border-glass-border/50 bg-glass/50 backdrop-blur-md z-10">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === "posts"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === "saved"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-0.5 p-0.5">
          {userPosts.map((post) => (
            <div key={post.id} className="relative aspect-square group cursor-pointer">
              <Image
                src={post.image}
                alt="Post"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-1 text-white font-semibold">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
