"use client"

import Image from "next/image"
import { Heart, MessageCircle, UserPlus, AtSign, Repeat2, Star } from "lucide-react"
import { useState } from "react"

type NotificationType = "like" | "comment" | "follow" | "mention" | "repost" | "highlight"

interface Notification {
  id: number
  type: NotificationType
  user: {
    name: string
    username: string
    avatar: string
  }
  content?: string
  postImage?: string
  time: string
  isRead: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "like",
    user: { name: "Luna Martinez", username: "lunamtz", avatar: "/avatars/luna.jpg" },
    content: "liked your photo",
    postImage: "/posts/sunset-city.jpg",
    time: "2m",
    isRead: false,
  },
  {
    id: 2,
    type: "follow",
    user: { name: "Marcus Chen", username: "marcusc", avatar: "/avatars/marcus.jpg" },
    content: "started following you",
    time: "15m",
    isRead: false,
  },
  {
    id: 3,
    type: "comment",
    user: { name: "Aria Johnson", username: "ariaj", avatar: "/avatars/aria.jpg" },
    content: 'commented: "This is absolutely stunning! Where was this taken?"',
    postImage: "/posts/sunset-city.jpg",
    time: "1h",
    isRead: false,
  },
  {
    id: 4,
    type: "mention",
    user: { name: "Nova Kim", username: "novak", avatar: "/avatars/nova.jpg" },
    content: "mentioned you in a comment",
    time: "2h",
    isRead: true,
  },
  {
    id: 5,
    type: "like",
    user: { name: "Jasper Wright", username: "jasperw", avatar: "/avatars/jasper.jpg" },
    content: "and 12 others liked your post",
    postImage: "/posts/coffee-brunch.jpg",
    time: "3h",
    isRead: true,
  },
  {
    id: 6,
    type: "repost",
    user: { name: "Luna Martinez", username: "lunamtz", avatar: "/avatars/luna.jpg" },
    content: "shared your post",
    postImage: "/posts/sunset-city.jpg",
    time: "5h",
    isRead: true,
  },
  {
    id: 7,
    type: "highlight",
    user: { name: "Aura", username: "aura", avatar: "/avatars/felix.jpg" },
    content: "Your post is trending in #DesignTrends",
    time: "1d",
    isRead: true,
  },
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "like":
      return <Heart className="w-4 h-4 text-primary fill-primary" />
    case "comment":
      return <MessageCircle className="w-4 h-4 text-secondary" />
    case "follow":
      return <UserPlus className="w-4 h-4 text-accent" />
    case "mention":
      return <AtSign className="w-4 h-4 text-primary" />
    case "repost":
      return <Repeat2 className="w-4 h-4 text-secondary" />
    case "highlight":
      return <Star className="w-4 h-4 text-primary fill-primary" />
  }
}

interface NotificationsScreenProps {
  onBack?: () => void
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [activeTab, setActiveTab] = useState<"all" | "mentions">("all")
  const [followedUsers, setFollowedUsers] = useState<number[]>([])

  const filteredNotifications = activeTab === "mentions"
    ? notifications.filter((n) => n.type === "mention" || n.type === "comment")
    : notifications

  const toggleFollow = (userId: number) => {
    setFollowedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  }

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="px-4 py-3 border-b border-glass-border/50 bg-glass/30 backdrop-blur-sm">
        <h1 className="text-lg font-bold text-foreground mb-3">Activity</h1>
        
        {/* Tabs */}
        <div className="flex gap-2">
          {(["all", "mentions"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-glass/50 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {tab === "all" ? "All" : "Mentions"}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        {/* Today Section */}
        <div className="px-4 py-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Today</h2>
        </div>

        <div className="space-y-1 px-2">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-3 p-3 mx-2 rounded-2xl transition-colors cursor-pointer ${
                !notification.isRead
                  ? "bg-primary/5 border border-primary/10"
                  : "hover:bg-glass/50"
              }`}
            >
              {/* Avatar with Icon Badge */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-glass-border">
                  <Image
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border border-glass-border flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">
                  <span className="font-semibold">{notification.user.name}</span>{" "}
                  <span className="text-foreground/80">{notification.content}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time} ago</p>
              </div>

              {/* Action / Preview */}
              {notification.type === "follow" ? (
                <button
                  onClick={() => toggleFollow(notification.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
                    followedUsers.includes(notification.id)
                      ? "bg-glass/60 border border-glass-border text-foreground"
                      : "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md shadow-primary/20"
                  }`}
                >
                  {followedUsers.includes(notification.id) ? "Following" : "Follow"}
                </button>
              ) : notification.postImage ? (
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-glass-border">
                  <Image
                    src={notification.postImage}
                    alt="Post preview"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Earlier Section */}
        <div className="px-4 py-3 mt-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Earlier This Week</h2>
        </div>

        <div className="space-y-1 px-2">
          {notifications.slice(4).map((notification, index) => (
            <div
              key={`earlier-${notification.id}-${index}`}
              className="flex items-start gap-3 p-3 mx-2 rounded-2xl hover:bg-glass/50 transition-colors cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-glass-border">
                  <Image
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border border-glass-border flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">
                  <span className="font-semibold">{notification.user.name}</span>{" "}
                  <span className="text-foreground/80">{notification.content}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time} ago</p>
              </div>

              {notification.postImage && (
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-glass-border">
                  <Image
                    src={notification.postImage}
                    alt="Post preview"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
