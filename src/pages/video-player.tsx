import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Bell,
  ThumbsUp,
  ThumbsDown,
  Share2,
  MoreHorizontal,
  Play,
  Clock,
  Loader2,
  Coins
} from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVideoById, type Video } from "@/services/videoService";
import Sidebar from "@/components/Sidebar";
import PurchaseVideoDialog from "@/components/PurchaseVideoDialog";

// Mock Assets
import masterclass1 from "@assets/generated_images/interview_masterclass_thumbnail.png";
import masterclass2 from "@assets/generated_images/resume_workshop_thumbnail.png";
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
const createVideoUrl = (video: Video): string => {
  const slug = generateSlug(video.title);
  return `/video/${slug}-${video.id}`;
};

export default function VideoPlayer() {
  const [match, params] = useRoute("/video/:slugId");
  const [location, setLocation] = useLocation();
  const videoId = extractIdFromSlug(params?.slugId);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  // Fetch current video details from API
  const { data: videoData, isLoading, error } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => videoId ? getVideoById(videoId) : Promise.reject('No video ID'),
    enabled: !!videoId,
  });

  const currentVideo = videoData?.video;
  const isPurchased = videoData?.is_purchased || false;
  const playlistVideos = videoData?.playlist_videos || [];

  // Auto-show purchase dialog if video is not purchased
  // Must be called before any early returns (Rules of Hooks)
  useEffect(() => {
    if (currentVideo && !isPurchased) {
      setShowPurchaseDialog(true);
    }
  }, [currentVideo, isPurchased]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show error state
  if (error || !currentVideo) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar activePage="videos" />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <p className="text-xl text-gray-600">Video not found</p>
          <Button onClick={() => setLocation('/student-portal')} className="bg-primary text-white">
            Back to Portal
          </Button>
        </div>
      </div>
    );
  }

  // Get recommended videos (other videos from playlist, excluding current)
  const recommendedVideos = playlistVideos.filter((v: Video) => v.id !== currentVideo.id).slice(0, 3);

  // Mock shorts for now (can be filtered from playlist or separate API call)
  const shorts = [
    { id: 101, title: "The Perfect Handshake", views: "50k", image: short1 },
    { id: 102, title: "Elevator Pitch 101", views: "32k", image: short2 },
    { id: 103, title: "Dress for Success", views: "18k", image: short1 },
    { id: 104, title: "Zoom Etiquette", views: "22k", image: short2 }
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex">
      {/* Sidebar */}
      <Sidebar activePage="videos" />

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 sticky top-0 z-10 px-4 lg:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-2xl mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search"
                className="pl-10 bg-secondary/30 border-transparent focus:bg-white transition-all rounded-full h-10"
              />
            </div>
            <Button size="icon" variant="ghost" className="rounded-full bg-secondary/30">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 pl-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <img src={studentPortrait} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1800px] mx-auto p-4 lg:p-6 grid lg:grid-cols-[1fr_350px] xl:grid-cols-[1fr_400px] gap-6">

            {/* Left Column: Video Player & Info */}
            <div className="min-w-0">
              {/* Video Player */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg relative group">
                {isPurchased ? (
                  // Show actual video if purchased
                  currentVideo.youtube_video_id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${currentVideo.youtube_video_id}?autoplay=0`}
                      title={currentVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img src={currentVideo.thumbnail_url || masterclass1} alt={currentVideo.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white fill-current ml-1" />
                        </div>
                      </div>
                      {/* Fake Controls */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end px-4 pb-3 gap-4">
                        <Play className="w-5 h-5 text-white fill-current" />
                        <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-primary"></div>
                        </div>
                        <span className="text-white text-xs">14:20 / {currentVideo.duration ? `${Math.floor(currentVideo.duration / 60)}:${(currentVideo.duration % 60).toString().padStart(2, '0')}` : '45:00'}</span>
                      </div>
                    </>
                  )
                ) : (
                  // Show blurred preview if not purchased
                  <>
                    <img src={currentVideo.thumbnail_url || masterclass1} alt={currentVideo.title} className="w-full h-full object-cover blur-md" />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                          <Coins className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Purchase to Watch</h3>
                        <p className="text-white/80 max-w-sm">
                          Unlock this masterclass for {currentVideo.price_credit} credits
                        </p>
                        <Button
                          onClick={() => setShowPurchaseDialog(true)}
                          className="bg-white text-primary hover:bg-gray-100 font-bold"
                        >
                          <Coins className="w-4 h-4 mr-2" />
                          Purchase Now
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Video Info */}
              <div className="mt-4">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2">{currentVideo.title}</h1>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-primary font-bold overflow-hidden">
                      {/* Placeholder avatar */}
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {currentVideo.mentor ? currentVideo.mentor[0] : 'M'}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{currentVideo.mentor || 'ATP Mentor'}</div>
                      <div className="text-xs text-gray-500">{currentVideo.category?.name || 'Career Coach'}</div>
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                        <div className="flex items-center bg-gray-100 rounded-full h-9">
                            <Button variant="ghost" className="rounded-l-full h-full px-4 hover:bg-gray-200 border-r border-gray-300 gap-2 text-gray-700">
                                <ThumbsUp className="w-4 h-4" /> 2.4k
                            </Button>
                            <Button variant="ghost" className="rounded-r-full h-full px-4 hover:bg-gray-200 text-gray-700">
                                <ThumbsDown className="w-4 h-4" />
                            </Button>
                        </div>
                        <Button variant="ghost" className="bg-gray-100 rounded-full h-9 px-4 gap-2 hover:bg-gray-200 text-gray-700">
                            <Share2 className="w-4 h-4" /> Share
                        </Button>
                    </div> */}
                </div>

                {/* Description Box */}
                <div className="mt-4 bg-secondary/30 rounded-xl p-4 text-sm hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="font-bold text-gray-900 mb-2">
                    {currentVideo.category?.name || 'Career Development'} • {new Date(currentVideo.created_at).toLocaleDateString()}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {currentVideo.description || 'Watch this masterclass to enhance your career development skills.'}
                    {/* <span className="font-bold text-gray-900 block mt-1">...more</span> */}
                  </p>
                  {currentVideo.tags && currentVideo.tags.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {currentVideo.tags.map((tag) => (
                        <span key={tag.id} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Comments Section Placeholder */}
                {/* <div className="mt-6 hidden md:block">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">32 Comments</h3>
                    <div className="flex gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
                             <img src={studentPortrait} alt="User" className="w-full h-full object-cover" />
                        </div>
                        <Input placeholder="Add a comment..." className="border-0 border-b border-gray-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-900 bg-transparent" />
                    </div>
                </div> */}
              </div>
            </div>

            {/* Right Column: Recommended & Shorts */}
            <div className="space-y-6">

              {/* Filter Chips */}
              {/* <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    <Button size="sm" className="rounded-lg bg-black text-white hover:bg-gray-800 text-xs h-8">All</Button>
                    <Button size="sm" variant="secondary" className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs h-8">From Sarah Jenkins</Button>
                    <Button size="sm" variant="secondary" className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs h-8">Related</Button>
                </div> */}

              {/* Up Next List (Mixed with Shorts) */}
              <div className="flex flex-col gap-4">
                {recommendedVideos.slice(0, 1).map((video: Video) => (
                  <div
                    key={video.id}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => setLocation(createVideoUrl(video))}
                  >
                    <div className="relative w-40 aspect-video rounded-xl overflow-hidden shrink-0">
                      <img src={video.thumbnail_url || masterclass1} alt={video.title} className="w-full h-full object-cover group-hover:opacity-90" />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded font-medium">
                        {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-primary leading-tight">{video.title}</h4>
                      <div className="text-xs text-gray-500">{video.mentor || 'ATP Mentor'}</div>
                      <div className="text-xs text-gray-500">{video.category?.name || 'Career Development'}</div>
                    </div>
                  </div>
                ))}

                {/* Shorts Shelf */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-current" />
                    </div>
                    <span className="font-bold text-gray-900 text-sm">Shorts</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {shorts.slice(0, 2).map((short) => (
                      <div key={short.id} className="aspect-[9/16] rounded-xl overflow-hidden relative group cursor-pointer">
                        <img src={short.image} alt={short.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <h4 className="text-white text-xs font-bold line-clamp-2 mb-1 shadow-black drop-shadow-md">{short.title}</h4>
                          <span className="text-white/80 text-[10px] shadow-black drop-shadow-md">{short.views} views</span>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="text-white w-4 h-4 drop-shadow-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {recommendedVideos.slice(1).map((video: Video) => (
                  <div
                    key={video.id}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => setLocation(createVideoUrl(video))}
                  >
                    <div className="relative w-40 aspect-video rounded-xl overflow-hidden shrink-0">
                      <img src={video.thumbnail_url || masterclass1} alt={video.title} className="w-full h-full object-cover group-hover:opacity-90" />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded font-medium">
                        {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-primary leading-tight">{video.title}</h4>
                      <div className="text-xs text-gray-500">{video.mentor || 'ATP Mentor'}</div>
                      <div className="text-xs text-gray-500">{video.category?.name || 'Career Development'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Purchase Dialog */}
      <PurchaseVideoDialog
        open={showPurchaseDialog}
        onOpenChange={setShowPurchaseDialog}
        video={currentVideo}
        type="full"
        onSuccess={() => {
          // Video will automatically unlock after successful purchase
          // because the query will be invalidated and refetched
        }}
      />
    </div>
  );
}
