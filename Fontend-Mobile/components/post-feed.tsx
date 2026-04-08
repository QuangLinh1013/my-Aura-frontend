"use client"

import { PostCard } from "./post-card"

const posts = [
  {
    id: 1,
    author: {
      name: "Luna Martinez",
      username: "lunamtz",
      avatar: "/avatars/luna.jpg",
    },
    content: "Just discovered the most amazing sunset spot in the city. Sometimes you need to slow down and appreciate the little moments that make life beautiful.",
    image: "/posts/sunset-city.jpg",
    likes: 247,
    comments: 18,
    shares: 5,
    timeAgo: "2h",
    isLiked: true,
  },
  {
    id: 2,
    author: {
      name: "Sơn Tùng MTP",
      username: "sontungmtp",
      avatar: "/avatars/marcus.jpg",
    },
    content: "Working on something exciting today! The creative process is truly a journey of discovery. Stay tuned for the reveal!",
    likes: 89,
    comments: 12,
    shares: 3,
    timeAgo: "4h",
  },
  {
    id: 3,
    author: {
      name: "Aria Johnson",
      username: "ariaj",
      avatar: "/avatars/aria.jpg",
    },
    content: "Weekend vibes and good coffee. Trying that new brunch place downtown - the avocado toast is incredible!",
    image: "/posts/coffee-brunch.jpg",
    likes: 156,
    comments: 24,
    shares: 8,
    timeAgo: "6h",
    isBookmarked: true,
  },
  {
    id: 4,
    author: {
      name: "Felix Rivera",
      username: "felixr",
      avatar: "/avatars/felix.jpg",
    },
    content: "Just finished reading an incredible book about design thinking. The way it connects creativity with problem-solving is mind-blowing. Highly recommend!",
    likes: 73,
    comments: 9,
    shares: 12,
    timeAgo: "8h",
  },
]

export function PostFeed() {
  return (
    <div className="flex-1 overflow-y-auto pb-28 scrollbar-hide">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          author={post.author}
          content={post.content}
          image={post.image}
          likes={post.likes}
          comments={post.comments}
          shares={post.shares}
          timeAgo={post.timeAgo}
          isLiked={post.isLiked}
          isBookmarked={post.isBookmarked}
        />
      ))}
    </div>
  )
}
