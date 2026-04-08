"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"

interface PostCardProps {
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  timeAgo: string
  isLiked?: boolean
  isBookmarked?: boolean
}

export function PostCard({
  author,
  content,
  image,
  likes,
  comments,
  shares,
  timeAgo,
  isLiked = false,
  isBookmarked = false,
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likes)
  const [bookmarked, setBookmarked] = useState(isBookmarked)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <article className="bg-glass/80 backdrop-blur-xl rounded-3xl border border-glass-border shadow-lg shadow-glass-shadow mx-4 mb-4 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-glass-shadow/50">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-primary/30">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">{author.name}</h3>
            <p className="text-xs text-muted-foreground">@{author.username} · {timeAgo}</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-muted/50 transition-colors">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-foreground/90 text-sm leading-relaxed">{content}</p>
      </div>

      {/* Image */}
      {image && (
        <div className="relative aspect-[4/3] mx-4 mb-4 rounded-2xl overflow-hidden">
          <img
            src={image}
            alt="Post content"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 group"
          >
            <div className={`p-2 rounded-full transition-all duration-300 ${
              liked 
                ? "bg-primary/20 text-primary" 
                : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
            }`}>
              <Heart 
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  liked ? "fill-primary" : ""
                }`} 
              />
            </div>
            <span className={`text-sm font-medium ${liked ? "text-primary" : "text-muted-foreground"}`}>
              {likeCount}
            </span>
          </button>

          <button className="flex items-center gap-2 group">
            <div className="p-2 rounded-full hover:bg-secondary/30 text-muted-foreground hover:text-secondary transition-all duration-300">
              <MessageCircle className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-secondary transition-colors">
              {comments}
            </span>
          </button>

          <button className="flex items-center gap-2 group">
            <div className="p-2 rounded-full hover:bg-accent/30 text-muted-foreground hover:text-accent transition-all duration-300">
              <Share2 className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
              {shares}
            </span>
          </button>
        </div>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-2 rounded-full transition-all duration-300 ${
            bookmarked 
              ? "bg-primary/20 text-primary" 
              : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
          }`}
        >
          <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-primary" : ""}`} />
        </button>
      </div>
    </article>
  )
}
