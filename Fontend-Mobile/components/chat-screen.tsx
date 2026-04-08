"use client"

import Image from "next/image"
import { useState } from "react"
import { Search, MoreHorizontal, Check, CheckCheck, Camera, Phone, Video } from "lucide-react"

interface Conversation {
  id: number
  user: {
    name: string
    username: string
    avatar: string
    isOnline: boolean
  }
  lastMessage: {
    text: string
    time: string
    isOwn: boolean
    isRead: boolean
  }
  unreadCount: number
  isPinned?: boolean
}

const conversations: Conversation[] = [
  {
    id: 1,
    user: { name: "Luna Martinez", username: "lunamtz", avatar: "/avatars/luna.jpg", isOnline: true },
    lastMessage: { text: "That sounds amazing! Let me know when you are free", time: "2m", isOwn: false, isRead: true },
    unreadCount: 2,
    isPinned: true,
  },
  {
    id: 2,
    user: { name: "Sơn Tùng MTP", username: "marcusc", avatar: "/avatars/marcus.jpg", isOnline: true },
    lastMessage: { text: "Sure, I will send you the files", time: "15m", isOwn: true, isRead: true },
    unreadCount: 0,
  },
  {
    id: 3,
    user: { name: "Mark Zuckerberg", username: "ariaj", avatar: "/avatars/aria.jpg", isOnline: false },
    lastMessage: { text: "Thank you for the update!", time: "1h", isOwn: false, isRead: true },
    unreadCount: 0,
  },
  {
    id: 4,
    user: { name: "Steve Jobs", username: "novak", avatar: "/avatars/nova.png", isOnline: true },
    lastMessage: { text: "Can we meet tomorrow?", time: "3h", isOwn: false, isRead: false },
    unreadCount: 1,
  },
  {
    id: 5,
    user: { name: "Jasper Wright", username: "jasperw", avatar: "/avatars/jasper.jpg", isOnline: false },
    lastMessage: { text: "Haha that is so funny!", time: "1d", isOwn: true, isRead: true },
    unreadCount: 0,
  },
  {
    id: 6,
    user: { name: "Felix Rivera", username: "felixr", avatar: "/avatars/felix.jpg", isOnline: false },
    lastMessage: { text: "See you at the event!", time: "2d", isOwn: false, isRead: true },
    unreadCount: 0,
  },
]

const activeNowUsers = [
  { id: 1, name: "Luna", avatar: "/avatars/luna.jpg" },
  { id: 2, name: "Sơn Tùng MTP", avatar: "/avatars/marcus.jpg" },
  { id: 3, name: "Nova", avatar: "/avatars/nova.png" },
  { id: 4, name: "Aria", avatar: "/avatars/aria.jpg" },
]

interface ChatScreenProps {
  onOpenChat?: (conversationId: number) => void
}

export function ChatScreen({ onOpenChat }: ChatScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"primary" | "general">("primary")

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const pinnedConversations = filteredConversations.filter((c) => c.isPinned)
  const otherConversations = filteredConversations.filter((c) => !c.isPinned)

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="px-4 py-3 border-b border-glass-border/50 bg-glass/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-foreground">Messages</h1>
          <button className="w-9 h-9 rounded-xl bg-glass/60 border border-glass-border flex items-center justify-center hover:bg-muted/50 transition-colors">
            <MoreHorizontal className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-glass/60 border border-glass-border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          {(["primary", "general"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-glass/50 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {tab === "primary" ? "Primary" : "General"}
              {tab === "primary" && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-primary-foreground/20 rounded-full text-[10px]">
                  {conversations.filter((c) => c.unreadCount > 0).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Now */}
      <div className="px-4 py-3 border-b border-glass-border/30">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Active Now</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {activeNowUsers.map((user) => (
            <button
              key={user.id}
              className="flex flex-col items-center gap-1 flex-shrink-0 group"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary group-hover:border-primary transition-colors">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
              </div>
              <span className="text-xs text-foreground/80 font-medium">{user.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        {/* Pinned Section */}
        {pinnedConversations.length > 0 && (
          <>
            <div className="px-4 py-2">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pinned</h2>
            </div>
            <div className="space-y-1 px-2">
              {pinnedConversations.map((conv) => (
                <ConversationItem 
                  key={conv.id} 
                  conversation={conv} 
                  onClick={() => onOpenChat?.(conv.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* All Messages */}
        <div className="px-4 py-2 mt-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">All Messages</h2>
        </div>
        <div className="space-y-1 px-2">
          {otherConversations.map((conv) => (
            <ConversationItem 
              key={conv.id} 
              conversation={conv}
              onClick={() => onOpenChat?.(conv.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ConversationItem({ conversation, onClick }: { conversation: Conversation; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 mx-2 rounded-2xl transition-all hover:bg-glass/50 active:scale-[0.98] ${
        conversation.unreadCount > 0 ? "bg-primary/5" : ""
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-glass-border">
          <Image
            src={conversation.user.avatar}
            alt={conversation.user.name}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>
        {conversation.user.isOnline && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`font-semibold text-sm ${conversation.unreadCount > 0 ? "text-foreground" : "text-foreground/90"}`}>
            {conversation.user.name}
          </span>
          <span className={`text-xs ${conversation.unreadCount > 0 ? "text-primary font-medium" : "text-muted-foreground"}`}>
            {conversation.lastMessage.time}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {conversation.lastMessage.isOwn && (
            conversation.lastMessage.isRead 
              ? <CheckCheck className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
              : <Check className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          )}
          <p className={`text-sm truncate ${conversation.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            {conversation.lastMessage.text}
          </p>
        </div>
      </div>

      {/* Unread Badge */}
      {conversation.unreadCount > 0 && (
        <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/30">
          <span className="text-[10px] font-bold text-primary-foreground">{conversation.unreadCount}</span>
        </div>
      )}
    </button>
  )
}

// Chat Detail Screen
interface Message {
  id: number
  text: string
  time: string
  isOwn: boolean
  isRead?: boolean
}

interface ChatDetailScreenProps {
  conversationId: number
  onBack: () => void
}

export function ChatDetailScreen({ conversationId, onBack }: ChatDetailScreenProps) {
  const [newMessage, setNewMessage] = useState("")
  const conversation = conversations.find((c) => c.id === conversationId)

  const messages: Message[] = [
    { id: 1, text: "Hey! How are you doing?", time: "10:30 AM", isOwn: false },
    { id: 2, text: "I am doing great, thanks for asking! How about you?", time: "10:32 AM", isOwn: true, isRead: true },
    { id: 3, text: "Pretty good! I saw your latest post, it was amazing!", time: "10:33 AM", isOwn: false },
    { id: 4, text: "Thank you so much! I spent a lot of time working on it", time: "10:35 AM", isOwn: true, isRead: true },
    { id: 5, text: "It really shows! The colors and composition are perfect", time: "10:36 AM", isOwn: false },
    { id: 6, text: "That sounds amazing! Let me know when you are free", time: "10:38 AM", isOwn: false },
  ]

  if (!conversation) return null

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="px-4 py-3 border-b border-glass-border/50 bg-glass/30 backdrop-blur-sm flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-glass/60 border border-glass-border flex items-center justify-center hover:bg-muted/50 transition-colors"
        >
          <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-glass-border">
              <Image
                src={conversation.user.avatar}
                alt={conversation.user.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            {conversation.user.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-foreground text-sm">{conversation.user.name}</h2>
            <p className="text-xs text-muted-foreground">
              {conversation.user.isOnline ? "Active now" : "Last seen 2h ago"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl bg-glass/60 border border-glass-border flex items-center justify-center hover:bg-muted/50 transition-colors">
            <Phone className="w-4 h-4 text-foreground" />
          </button>
          <button className="w-9 h-9 rounded-xl bg-glass/60 border border-glass-border flex items-center justify-center hover:bg-muted/50 transition-colors">
            <Video className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                message.isOwn
                  ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-br-md"
                  : "bg-glass/70 border border-glass-border text-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <div className={`flex items-center justify-end gap-1 mt-1 ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                <span className="text-[10px]">{message.time}</span>
                {message.isOwn && (
                  message.isRead 
                    ? <CheckCheck className="w-3 h-3" />
                    : <Check className="w-3 h-3" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-glass-border/50 bg-glass/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl bg-glass/60 border border-glass-border flex items-center justify-center hover:bg-muted/50 transition-colors flex-shrink-0">
            <Camera className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full px-4 py-2.5 bg-glass/60 border border-glass-border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          <button
            disabled={!newMessage.trim()}
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
              newMessage.trim()
                ? "bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/30 hover:scale-105 active:scale-95"
                : "bg-glass/60 border border-glass-border"
            }`}
          >
            <svg 
              className={`w-5 h-5 ${newMessage.trim() ? "text-primary-foreground" : "text-muted-foreground"}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
