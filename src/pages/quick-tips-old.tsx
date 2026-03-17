import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  ChevronUp,
  ChevronDown,
  Send,
  Loader2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import { useQuery } from "@tanstack/react-query";
import { getVideoById, getVideos, type Video } from "@/services/videoService";
import { toast } from "sonner";

// Mock Assets (matching Student Portal)
import short1 from "@assets/generated_images/quick_career_tip_vertical.png";
import short2 from "@assets/generated_images/networking_tip_vertical.png";
import studentPortrait from "@assets/generated_images/friendly_female_student_portrait.png";

// Helper function to extract ID from slug-id format (e.g., "demo-slug-5" -> 5)
const extractIdFromSlug = (slugId: string | undefined): number | null => {
  if (!slugId) return null;
  const parts = slugId.split('-');
  const lastPart = parts[parts.length - 1];
  const id = parseInt(lastPart);
  return isNaN(id) ? null : id;
};

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Helper function to create video URL with slug and id
const createQuickTipUrl = (video: Video): string => {
  const slug = generateSlug(video.title);
  return `/quick-tips/${slug}-${video.id}`;
};

export default function QuickTips() {
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute("/quick-tips/:slugId");
  const currentId = extractIdFromSlug(params?.slugId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState("");

  // Fetch current video details
  const { data: videoData, isLoading: isLoadingVideo, error: videoError } = useQuery({
    queryKey: ['video', currentId],
    queryFn: () => currentId ? getVideoById(currentId) : Promise.reject('No video ID'),
    enabled: !!currentId,
  });

  // Fetch all short videos for playlist
  const { data: videosData, isLoading: isLoadingVideos } = useQuery({
    queryKey: ['videos-shorts'],
    queryFn: () => getVideos(),
  });

  const currentVideo = videoData?.video;
  const isPurchased = videoData?.is_purchased || false;
  
  // Get all short videos
  const allShortVideos = videosData?.videos?.filter((v: Video) => v.is_short) || [];
  
  // Get playlist videos (from same category or all shorts if no category)
  const playlistVideos = currentVideo?.category_id
    ? allShortVideos.filter((v: Video) => v.category_id === currentVideo.category_id)
    : allShortVideos;

  // Sync URL id with index in playlist
  useEffect(() => {
    if (currentId && playlistVideos.length > 0) {
      const index = playlistVideos.findIndex((v: Video) => v.id === currentId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [currentId, playlistVideos]);

  // Redirect to first video if no ID provided
  useEffect(() => {
    if (!currentId && playlistVideos.length > 0) {
      setLocation(createQuickTipUrl(playlistVideos[0]));
    }
  }, [currentId, playlistVideos, setLocation]);

  // Show loading state
  if (isLoadingVideo || isLoadingVideos) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show error state
  if (videoError || !currentVideo) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center flex-col gap-4">
        <p className="text-xl">Video not found</p>
        <Button onClick={() => setLocation('/student-portal')} variant="outline" className="text-white border-white">
          Back to Portal
        </Button>
      </div>
    );
  }

  // Check if user hasn't purchased the video
  if (!isPurchased) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center flex-col gap-4 p-8">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Video Not Purchased</h2>
          <p className="text-white/70 mb-6">
            You need to purchase this video to watch it. Please go back to the portal and purchase it first.
          </p>
          <Button onClick={() => setLocation('/student-portal')} className="bg-primary text-white">
            Back to Portal
          </Button>
        </div>
      </div>
    );
  }

  const currentTip = playlistVideos[currentIndex];

  const handleNext = () => {
    if (currentIndex < playlistVideos.length - 1) {
      const nextVideo = playlistVideos[currentIndex + 1];
      setLocation(createQuickTipUrl(nextVideo));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevVideo = playlistVideos[currentIndex - 1];
      setLocation(createQuickTipUrl(prevVideo));
    }
  };

  // Return early if no current tip
  if (!currentTip) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex font-sans">
      {/* Left Side - Back Navigation & Branding (Desktop) */}
      <div className="hidden lg:flex flex-col justify-between p-8 w-64 shrink-0 z-10">
        <div className="cursor-pointer" onClick={() => setLocation("/student-portal")}>
          <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Portal</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Quick Tips</h1>
          <p className="text-white/60 mt-2 text-sm">Bite-sized career advice to keep you ahead.</p>
        </div>
        
        <div className="space-y-4">
           <div className="p-4 rounded-xl bg-white/5 border border-white/10">
             <h3 className="font-bold text-sm mb-2">Your Progress</h3>
             <div className="flex gap-1 h-1 mb-2">
               {playlistVideos.map((_, idx) => (
                 <div 
                   key={idx} 
                   className={clsx(
                     "flex-1 rounded-full transition-colors", 
                     idx <= currentIndex ? "bg-primary" : "bg-white/20"
                   )} 
                 />
               ))}
             </div>
             <p className="text-xs text-white/50">{currentIndex + 1} of {playlistVideos.length} tips watched</p>
           </div>
        </div>
      </div>

      {/* Main Content Area - Centered Player */}
      <div className="flex-1 relative flex items-center justify-center bg-[#0a0a0a]">
        {/* Mobile Back Button */}
        <button 
          onClick={() => setLocation("/student-portal")}
          className="lg:hidden absolute top-4 left-4 z-50 p-2 rounded-full bg-black/20 backdrop-blur-md text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Navigation Buttons (Desktop) */}
        <div className="hidden lg:flex flex-col gap-4 absolute right-12 top-1/2 -translate-y-1/2 z-20">
           <Button 
             variant="ghost" 
             size="icon" 
             onClick={handlePrev}
             disabled={currentIndex === 0}
             className="rounded-full text-white hover:bg-white/10 disabled:opacity-30"
           >
             <ChevronUp className="w-8 h-8" />
           </Button>
           <Button 
             variant="ghost" 
             size="icon" 
             onClick={handleNext}
             disabled={currentIndex === playlistVideos.length - 1}
             className="rounded-full text-white hover:bg-white/10 disabled:opacity-30"
           >
             <ChevronDown className="w-8 h-8" />
           </Button>
        </div>

        {/* Video Container (Phone Aspect Ratio) */}
        <div className="relative w-full h-full md:h-[85vh] md:w-[calc(85vh*9/16)] md:rounded-[2rem] overflow-hidden bg-gray-900 shadow-2xl border border-white/5">
          {/* Video/Image Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {currentTip.youtube_video_id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${currentTip.youtube_video_id}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                  title={currentTip.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img 
                  src={currentTip.thumbnail_url || short1} 
                  alt={currentTip.title} 
                  className="w-full h-full object-cover opacity-90"
                />
              )}
              {/* Simulated Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />
              
              {/* Play/Pause Overlay (Center) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsPlaying(true)}>
                    <Play className="w-8 h-8 fill-white text-white ml-1" />
                  </div>
                </div>
              )}
              
              {/* Click to toggle play */}
              {/* <div 
                className="absolute inset-0 z-10" 
                onClick={() => setIsPlaying(!isPlaying)}
              /> */}
            </motion.div>
          </AnimatePresence>

          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20 bg-gradient-to-b from-black/60 to-transparent">
             <div className="flex items-center gap-3">
               <Avatar className="w-10 h-10 border-2 border-white/20">
                 <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentTip.mentor || 'ATP'}`} />
                 <AvatarFallback>{currentTip.mentor ? currentTip.mentor.substring(0, 2).toUpperCase() : 'ATP'}</AvatarFallback>
               </Avatar>
               <div>
                 <div className="font-bold text-sm text-white shadow-black drop-shadow-md">{currentTip.mentor || 'ATP Mentor'}</div>
                 <div className="text-xs text-white/80 shadow-black drop-shadow-md">{currentTip.category?.name || 'Career Coach'}</div>
               </div>
               {/* <Button variant="secondary" size="sm" className="h-7 text-xs bg-primary text-white hover:bg-primary/90 border-0 ml-2">
                 Follow
               </Button> */}
             </div>
             
             {/* <div className="flex gap-4">
               <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-primary transition-colors">
                 {isMuted ? <VolumeX className="w-6 h-6 drop-shadow-md" /> : <Volume2 className="w-6 h-6 drop-shadow-md" />}
               </button>
               <button className="text-white hover:text-primary transition-colors">
                 <MoreHorizontal className="w-6 h-6 drop-shadow-md" />
               </button>
             </div> */}
          </div>

          {/* Right Action Bar (Floating) */}
          {/* <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-30 items-center">
             <div className="flex flex-col items-center gap-1">
               <button 
                 onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
                 className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90 group"
               >
                 <Heart className={clsx("w-7 h-7 drop-shadow-md transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-white group-hover:text-red-500")} />
               </button>
               <span className="text-xs font-bold text-white drop-shadow-md">Like</span>
             </div>

             <div className="flex flex-col items-center gap-1">
               <button 
                 className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90"
               >
                 <MessageCircle className="w-7 h-7 text-white drop-shadow-md" />
               </button>
               <span className="text-xs font-bold text-white drop-shadow-md">Comment</span>
             </div>

             <div className="flex flex-col items-center gap-1">
               <button 
                 onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
                 className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90"
               >
                 <Bookmark className={clsx("w-7 h-7 drop-shadow-md transition-colors", isSaved ? "fill-amber-400 text-amber-400" : "text-white")} />
               </button>
               <span className="text-xs font-bold text-white drop-shadow-md">Save</span>
             </div>

             <div className="flex flex-col items-center gap-1">
               <button 
                 className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90"
               >
                 <Share2 className="w-7 h-7 text-white drop-shadow-md" />
               </button>
               <span className="text-xs font-bold text-white drop-shadow-md">Share</span>
             </div>
          </div> */}

          {/* Bottom Details */}
          {/* <div className="absolute bottom-0 left-0 right-0 p-6 pt-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
             <div className="pr-16">
               <h2 className="text-xl font-bold text-white mb-2 drop-shadow-md">{currentTip.title}</h2>
               <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-2 drop-shadow-md">
                 {currentTip.description || 'Watch this quick tip to enhance your career skills.'}
               </p>
               
               <div className="flex items-center gap-3 mt-4">
                 <Avatar className="w-8 h-8 border border-white/20">
                   <AvatarImage src={studentPortrait} />
                   <AvatarFallback>ME</AvatarFallback>
                 </Avatar>
                 <div className="flex-1 relative">
                   <Input 
                     placeholder="Add a comment..." 
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                     className="bg-white/10 border-white/10 text-white placeholder:text-white/50 h-10 pr-10 rounded-full focus:bg-white/20 focus:border-white/30 transition-all"
                   />
                   {comment && (
                     <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80">
                       <Send className="w-4 h-4" />
                     </button>
                   )}
                 </div>
               </div>
             </div>
             
             <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
               <div className="h-full bg-primary w-1/3 relative">
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-md transform scale-0 group-hover:scale-100" />
               </div>
             </div>
          </div> */}
        </div>

        {/* Right Side - Coming Up (Desktop) */}
        <div className="hidden xl:block w-80 h-[85vh] ml-8 rounded-[2rem] bg-white/5 border border-white/10 p-6 overflow-y-auto">
           <h3 className="font-serif font-bold text-xl mb-6">Up Next</h3>
           <div className="space-y-4">
             {playlistVideos.map((tip: Video, idx: number) => (
               <div 
                 key={tip.id}
                 onClick={() => setLocation(createQuickTipUrl(tip))}
                 className={clsx(
                   "flex gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/10 group",
                   currentId === tip.id ? "bg-white/10 ring-1 ring-primary/50" : ""
                 )}
               >
                 <div className="w-20 aspect-[9/16] rounded-lg overflow-hidden relative shrink-0">
                   <img src={tip.thumbnail_url || short1} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                   {currentId === tip.id && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                     </div>
                   )}
                 </div>
                 <div className="flex-1 min-w-0 py-1">
                   <h4 className={clsx("font-bold text-sm mb-1 truncate", currentId === tip.id ? "text-primary" : "text-white")}>
                     {tip.title}
                   </h4>
                   <div className="flex items-center gap-2 mb-2">
                     <Avatar className="w-4 h-4">
                       <AvatarFallback className="text-[8px]">{tip.mentor ? tip.mentor.substring(0, 2).toUpperCase() : 'ATP'}</AvatarFallback>
                     </Avatar>
                     <span className="text-xs text-white/50 truncate">{tip.mentor || 'ATP Mentor'}</span>
                   </div>
                   <div className="flex items-center gap-3 text-xs text-white/40">
                     <span className="flex items-center gap-1">
                       <Clock className="w-3 h-3" /> {tip.duration ? `${tip.duration}s` : '45s'}
                     </span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
