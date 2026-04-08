"use client"

import { useState } from "react"
import { MobileShell } from "@/components/mobile-shell"
import { AppHeader } from "@/components/app-header"
import { StoryReel } from "@/components/story-reel"
import { PostFeed } from "@/components/post-feed"
import { BottomNavigation, type TabId } from "@/components/bottom-navigation"
import { CreatePostScreen } from "@/components/create-post-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { SearchScreen } from "@/components/search-screen"
import { ChatScreen, ChatDetailScreen } from "@/components/chat-screen"
import { NotificationsScreen } from "@/components/notifications-screen"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("home")
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [activeChatId, setActiveChatId] = useState<number | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="flex flex-col h-full">
            <AppHeader 
              onNotificationsClick={() => setShowNotifications(true)}
              onMessagesClick={() => {
                setActiveTab("messages")
                setActiveChatId(null)
              }}
            />
            <div className="flex-shrink-0 border-b border-glass-border/50 bg-glass/30 backdrop-blur-sm">
              <StoryReel />
            </div>
            <PostFeed />
          </div>
        )
      case "search":
        return <SearchScreen />
      case "messages":
        if (activeChatId !== null) {
          return (
            <ChatDetailScreen 
              conversationId={activeChatId} 
              onBack={() => setActiveChatId(null)} 
            />
          )
        }
        return <ChatScreen onOpenChat={(id) => setActiveChatId(id)} />
      case "profile":
        return <ProfileScreen />
      default:
        return null
    }
  }

  return (
    <MobileShell>
      {/* Notifications Screen Overlay */}
      {showNotifications && (
        <div className="absolute inset-0 z-50 bg-background">
          <NotificationsScreen onBack={() => setShowNotifications(false)} />
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={(tab) => {
              setShowNotifications(false)
              setActiveTab(tab)
            }}
            onCreateClick={() => {
              setShowNotifications(false)
              setShowCreatePost(true)
            }} 
          />
        </div>
      )}

      {/* Create Post Screen Overlay */}
      {showCreatePost && (
        <CreatePostScreen 
          onClose={() => setShowCreatePost(false)}
          onPost={(data) => {
            console.log("New post:", data)
            setShowCreatePost(false)
          }}
        />
      )}

      {/* Main App Content */}
      {!showCreatePost && !showNotifications && (
        <>
          {renderContent()}
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onCreateClick={() => setShowCreatePost(true)} 
          />
        </>
      )}
    </MobileShell>
  )
}
