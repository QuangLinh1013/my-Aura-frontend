"use client"

import { useState, useRef } from "react"
import { 
  ArrowLeft, 
  ChevronDown, 
  Camera, 
  Image as ImageIcon, 
  Video, 
  Smile, 
  MapPin, 
  Users, 
  Hash,
  X
} from "lucide-react"

interface CreatePostScreenProps {
  onClose?: () => void
  onPost?: (data: { content: string; image: string | null }) => void
}

export function CreatePostScreen({ onClose, onPost }: CreatePostScreenProps) {
  const [content, setContent] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [visibility, setVisibility] = useState("Public")
  const [isPosting, setIsPosting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePost = async () => {
    if (!content.trim() && !selectedImage) return
    
    setIsPosting(true)
    // Simulate posting delay
    await new Promise(resolve => setTimeout(resolve, 800))
    onPost?.({ content, image: selectedImage })
    setIsPosting(false)
  }

  const canPost = content.trim().length > 0 || selectedImage

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-border/50">
        <button 
          onClick={onClose}
          className="p-2 -ml-2 rounded-xl hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        
        <h1 className="font-semibold text-lg text-foreground">Create Post</h1>
        
        <button
          onClick={handlePost}
          disabled={!canPost || isPosting}
          className={`px-5 py-2 rounded-2xl font-semibold text-sm transition-all duration-300 ${
            canPost && !isPosting
              ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-105 active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {isPosting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Posting</span>
            </div>
          ) : (
            "Post"
          )}
        </button>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Profile & Visibility */}
        <div className="flex items-center gap-3 p-4">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-md">
            <img
              src="/avatars/felix.jpg"
              alt="Felix Rivera"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Felix Rivera</h3>
            <button className="flex items-center gap-1.5 mt-0.5 px-3 py-1 rounded-full bg-glass/80 backdrop-blur-sm border border-glass-border text-xs text-muted-foreground hover:bg-muted/50 transition-colors">
              <span>{visibility}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Media Placeholder / Selected Image */}
        <div className="px-4 mb-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          
          {selectedImage ? (
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-glass-shadow/30">
              <img
                src={selectedImage}
                alt="Selected media"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-foreground/60 backdrop-blur-sm text-background hover:bg-foreground/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[4/3] rounded-3xl border-2 border-dashed border-border/70 bg-glass/50 backdrop-blur-sm flex flex-col items-center justify-center gap-4 hover:bg-glass/70 hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-muted-foreground font-medium">Tap to add photos or videos</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Share your moment with the world</p>
              </div>
            </button>
          )}
        </div>

        {/* Text Input */}
        <div className="px-4 mb-4">
          <div className="bg-glass/60 backdrop-blur-sm rounded-2xl border border-glass-border p-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a caption or describe your day..."
              className="w-full min-h-[120px] bg-transparent text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none text-sm leading-relaxed"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
              <span className="text-xs text-muted-foreground">{content.length} / 2000</span>
              <button className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                <Smile className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Tagging Options */}
        <div className="px-4 space-y-3 mb-6">
          <TagOption 
            icon={Users} 
            label="Tag Friends" 
            hint="Add people to your post"
          />
          <TagOption 
            icon={MapPin} 
            label="Add Location" 
            hint="Share where you are"
          />
          <TagOption 
            icon={Hash} 
            label="Add Topic" 
            hint="Connect with communities"
          />
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-glass/90 backdrop-blur-xl border-t border-glass-border">
        <div className="flex items-center justify-around py-3 px-6">
          <MediaButton 
            icon={ImageIcon} 
            label="Gallery" 
            onClick={() => fileInputRef.current?.click()}
          />
          <MediaButton 
            icon={Camera} 
            label="Photo"
          />
          <MediaButton 
            icon={Video} 
            label="Video"
          />
          <MediaButton 
            icon={Smile} 
            label="Mood"
          />
        </div>
        {/* Safe area for bottom notch */}
        <div className="h-6" />
      </div>
    </div>
  )
}

function TagOption({ 
  icon: Icon, 
  label, 
  hint 
}: { 
  icon: React.ElementType
  label: string
  hint: string
}) {
  return (
    <button className="w-full flex items-center gap-4 p-4 bg-glass/60 backdrop-blur-sm rounded-2xl border border-glass-border hover:bg-glass/80 hover:border-primary/30 transition-all duration-300 group">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center group-hover:from-primary/25 group-hover:to-secondary/25 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 text-left">
        <p className="font-medium text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <ChevronDown className="w-5 h-5 text-muted-foreground -rotate-90" />
    </button>
  )
}

function MediaButton({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType
  label: string
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 group"
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 group-hover:scale-105 transition-all duration-300">
        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
    </button>
  )
}
