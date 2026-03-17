import { useLocation } from "wouter";
import { useState } from "react";
import { clsx } from "clsx";
import { Home, ChevronRight, User } from "lucide-react";
import { motion } from "framer-motion";

// Mock Assets
import short1 from "@assets/generated_images/quick_career_tip_vertical.png";
import atpLogo from "@assets/image_1764912058849.png";

// Mock data for quick tips
const mockQuickTips = [
  {
    id: 1,
    title: "How to Ace Your First Interview",
    description: "Learn the essential tips to make a great first impression in your first job interview. We'll cover body language, common questions, and how to showcase your strengths effectively. This comprehensive guide will prepare you for success in any interview situation.",
    category: "Career Preparation",
    thumbnail_url: short1,
    youtube_video_id: "dQw4w9WgXcQ",
    duration: "2:45",
    tags: ["Interview", "Career Prep", "First Job", "Communication"]
  },
  {
    id: 2,
    title: "Building a Growth Mindset for Success",
    description: "Discover how to develop a growth mindset that will help you overcome challenges and achieve your career goals. Learn practical strategies to embrace learning and resilience in your professional journey.",
    category: "Mindset and Culture",
    thumbnail_url: short1,
    youtube_video_id: "dQw4w9WgXcQ",
    duration: "3:12",
    tags: ["Mindset", "Personal Growth", "Resilience", "Success"]
  },
  {
    id: 3,
    title: "Crafting the Perfect Resume",
    description: "Master the art of resume writing with our expert tips. Learn how to highlight your achievements, use action verbs, and format your resume to stand out from the competition. Get insider secrets from hiring managers.",
    category: "Career Development",
    thumbnail_url: short1,
    youtube_video_id: "dQw4w9WgXcQ",
    duration: "4:20",
    tags: ["Resume", "Career Development", "Job Search", "Professional"]
  },
  {
    id: 4,
    title: "Networking Like a Pro",
    description: "Unlock the secrets to effective networking. Learn how to build meaningful professional relationships, leverage LinkedIn, and create opportunities for career advancement through strategic connections.",
    category: "Career Preparation",
    thumbnail_url: short1,
    youtube_video_id: "dQw4w9WgXcQ",
    duration: "3:45",
    tags: ["Networking", "LinkedIn", "Relationships", "Career Growth"]
  }
];

type Category = "All" | "Career Development" | "Career Preparation" | "Mindset and Culture";

export default function QuickTips() {
  const [location, setLocation] = useLocation();
  const [activeTipId, setActiveTipId] = useState(1);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const activeTip = mockQuickTips.find(tip => tip.id === activeTipId) || mockQuickTips[0];

  // Filter tips based on active category
  const filteredTips = activeCategory === "All"
    ? mockQuickTips
    : mockQuickTips.filter(tip => tip.category === activeCategory);

  const categories: Category[] = ["All", "Career Development", "Career Preparation", "Mindset and Culture"];

  const handleTipClick = (tipId: number) => {
    setActiveTipId(tipId);
    setShowFullDescription(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white/90 px-8 text-sm font-medium text-gray-600 backdrop-blur border-b border-gray-200 shadow-sm">
        {/* Left: Logo and Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <img src={atpLogo} alt="ATP Global" className="h-10 w-auto" />
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              Quick tips
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <button
              onClick={() => setLocation("/")}
              className="text-sm font-semibold text-primary hover:text-primary/70 transition-colors"
            >
              Home
            </button>
            <button className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              Categories
            </button>
          </div>
        </div>

        {/* Right: Profile */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-primary hover:text-primary">
          <User className="w-5 h-5" />
        </button>
      </nav>

      {/* Main Content: Two Column Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Column: Video Player (70%) */}
        <div className="flex-[7] flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-5xl">
            <div className="aspect-video rounded-lg border border-gray-200 bg-gray-100 shadow-2xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${activeTip.youtube_video_id}?autoplay=0`}
                title={activeTip.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar (30%) */}
        <div className="flex-[3] border-l border-gray-100 bg-white/80 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              <span>{activeTip.category}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 truncate">{activeTip.title}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {activeTip.title}
            </h1>

            {/* Description */}
            <div className="space-y-2">
              <p className={clsx(
                "text-gray-600 text-sm leading-relaxed",
                !showFullDescription && "line-clamp-3"
              )}>
                {activeTip.description}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-primary text-sm font-semibold hover:underline"
              >
                {showFullDescription ? "Show less" : "More"}
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {activeTip.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-primary font-bold">{activeTip.duration}</span>
              <span>•</span>
              <span>Duration</span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={clsx(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                      activeCategory === category
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-primary/60"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tip Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                All Tips
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {filteredTips.map((tip) => (
                  <motion.button
                    key={tip.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTipClick(tip.id)}
                    className={clsx(
                      "aspect-square rounded-lg font-bold text-sm transition-all border",
                      activeTipId === tip.id
                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/40"
                        : "border-gray-200 bg-white text-gray-600 hover:border-primary"
                    )}
                  >
                    {tip.id}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Empty state for filtered tips */}
            {filteredTips.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No tips found in this category
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
