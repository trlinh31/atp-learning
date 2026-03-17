import { useEffect, useMemo, useState } from "react";
import { Star, MapPin, Clock } from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const locationFilters = ["Sydney", "Melbourne", "Brisbane", "All"] as const;
type LocationFilter = (typeof locationFilters)[number];

type Partner = {
  id: string;
  name: string;
  logoUrl: string;
  coverUrl: string;
  rating: number;
  reviewCount: number;
  recommendPercent: number;
  locations: string[];
  tagline: string;
  bestAbout: string;
  generalInfo: {
    type: string;
    industry: string;
    size: string;
    workingDays: string;
    overtimePolicy: string;
  };
  overviewText: string;
  jobs: Array<{
    title: string;
    postedAgo: string;
    location: string;
    tags: string[];
    isHot?: boolean;
  }>;
};

const partners: Partner[] = [
  {
    id: "aurora-labs",
    name: "Aurora Labs",
    logoUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
    coverUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviewCount: 189,
    recommendPercent: 93,
    locations: ["Sydney", "Melbourne"],
    tagline: "Data science & automation firm helping scale intelligent operations.",
    bestAbout: "people-first culture",
    generalInfo: {
      type: "Consultancy",
      industry: "Data Intelligence",
      size: "250+",
      workingDays: "Mon - Fri",
      overtimePolicy: "Flexible, rarely required",
    },
    overviewText:
      "Aurora Labs builds intelligent automation solutions for regulated industries. The team blends analytics, product thinking, and mentoring to give early-career talent a launchpad into technical leadership.Aurora Labs builds intelligent automation solutions for regulated industries. The team blends analytics, product thinking, and mentoring to give early-career talent a launchpad into technical leadershipAurora Labs builds intelligent automation solutions for regulated industries. The team blends analytics, product thinking, and mentoring to give early-career talent a launchpad into technical leadershipAurora Labs builds intelligent automation solutions for regulated industries. The team blends analytics, product thinking, and mentoring to give early-career talent a launchpad into technical leadershipAurora Labs builds intelligent automation solutions for regulated industries. The team blends analytics, product thinking, and mentoring to give early-career talent a launchpad into technical leadershipAurora Labs builds intelligent automation solutions for regulated industries. The team blends analytics, product thinking, and mentoring to give early-career talent a launchpad into technical leadership",
    jobs: [
      {
        title: "Growth Data Analyst",
        postedAgo: "3 days",
        location: "Sydney HQ",
        tags: ["Full-time", "Hybrid", "Data"],
        isHot: true,
      },
      {
        title: "Machine Learning Engineer",
        postedAgo: "1 week",
        location: "Melbourne Studio",
        tags: ["Full-time", "On-site", "ML"],
      },
      {
        title: "Platform Operations Associate",
        postedAgo: "2 weeks",
        location: "Sydney HQ",
        tags: ["Contract", "Ops", "Automation"],
      },
    ],
  },
  {
    id: "crown-industries",
    name: "Crown Industries",
    logoUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=200&q=80",
    coverUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    rating: 4.4,
    reviewCount: 212,
    recommendPercent: 89,
    locations: ["Brisbane", "Sydney"],
    tagline: "Enterprise infrastructure partner powering APAC innovation.",
    bestAbout: "career guidance",
    generalInfo: {
      type: "Technology",
      industry: "Infrastructure",
      size: "420+",
      workingDays: "Mon - Fri",
      overtimePolicy: "Occasional, with comp leave",
    },
    overviewText:
      "Crown Industries keeps critical systems online for energy and transport clients. Their internship program pairs mentors with interns on live projects, blending engineering rigour with thoughtful onboarding.",
    jobs: [
      {
        title: "Site Reliability Intern",
        postedAgo: "2 days",
        location: "Brisbane",
        tags: ["Internship", "On-site", "Infrastructure"],
        isHot: true,
      },
      {
        title: "Systems Automation Analyst",
        postedAgo: "5 days",
        location: "Sydney",
        tags: ["Full-time", "Hybrid", "Automation"],
      },
    ],
  },
  {
    id: "atlas-health",
    name: "Atlas Health",
    logoUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    coverUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewCount: 305,
    recommendPercent: 96,
    locations: ["Melbourne"],
    tagline: "Healthtech studio designing empathetic care journeys.",
    bestAbout: "mentoring",
    generalInfo: {
      type: "Product Studio",
      industry: "Healthtech",
      size: "180",
      workingDays: "Flexible weekdays",
      overtimePolicy: "Rare, compensated",
    },
    overviewText:
      "Atlas Health invests in digital health innovations with teams across research, design, and clinical operations. Graduates get deep exposure to user research, regulatory frameworks, and rapid prototyping.",
    jobs: [
      {
        title: "Clinical Data Designer",
        postedAgo: "4 days",
        location: "Melbourne",
        tags: ["Contract", "Design", "Healthcare"],
      },
      {
        title: "Product Research Intern",
        postedAgo: "1 week",
        location: "Melbourne",
        tags: ["Internship", "Hybrid", "Research"],
        isHot: true,
      },
      {
        title: "Care Enablement Engineer",
        postedAgo: "3 weeks",
        location: "Melbourne",
        tags: ["Full-time", "Remote", "Software"],
      },
    ],
  },
  {
    id: "wired-collective",
    name: "Wired Collective",
    logoUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=200&q=80",
    coverUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    rating: 4.2,
    reviewCount: 154,
    recommendPercent: 87,
    locations: ["Sydney", "Brisbane"],
    tagline: "Creative tech agency building bold retail experiences.",
    bestAbout: "collaboration",
    generalInfo: {
      type: "Agency",
      industry: "Creative Tech",
      size: "120",
      workingDays: "Mon - Fri",
      overtimePolicy: "Managed with flex days",
    },
    overviewText:
      "Wired Collective crafts immersive retail and hospitality experiences using immersive tech and spatial computing. The team coaches interns to own client-focused sprints while nurturing multidisciplinary skills.",
    jobs: [
      {
        title: "Immersive UI Developer",
        postedAgo: "5 days",
        location: "Sydney",
        tags: ["Full-time", "Hybrid", "Creative"],
      },
      {
        title: "Experience Strategist Intern",
        postedAgo: "1 week",
        location: "Brisbane",
        tags: ["Internship", "Remote", "Strategy"],
      },
      {
        title: "Creative Technologist",
        postedAgo: "2 weeks",
        location: "Sydney",
        tags: ["Contract", "Innovation", "Design"],
      },
    ],
  },
];

const getGeneralInfoEntries = (info: Partner["generalInfo"]) => [
  { label: "Company type", value: info.type },
  { label: "Industry", value: info.industry },
  { label: "Team size", value: info.size },
  { label: "Working days", value: info.workingDays },
  { label: "Overtime policy", value: info.overtimePolicy },
];

type PartnerCardProps = {
  partner: Partner;
  isActive: boolean;
  onSelect: (id: string) => void;
};

function PartnerCard({ partner, isActive, onSelect }: PartnerCardProps) {
  return (
    <Card
      className={`relative cursor-pointer overflow-hidden border-2 bg-white rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isActive
          ? "border-primary shadow-lg"
          : "border-transparent shadow hover:shadow-md hover:border-gray-200"
        }`}
      onClick={() => onSelect(partner.id)}
      onKeyDown={(event) => event.key === "Enter" && onSelect(partner.id)}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
    >
      <div className="relative">
        <div className="h-40 w-full overflow-hidden rounded-[1.25rem] bg-muted">
          <img
            src={partner.coverUrl}
            alt={`${partner.name} cover`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute -bottom-8 left-6 flex h-16 w-16 items-center justify-center rounded-[1.2rem] border border-border bg-card shadow-lg">
          <img
            src={partner.logoUrl}
            alt={`${partner.name} logo`}
            className="h-12 w-12 object-contain"
            loading="lazy"
          />
        </div>
      </div>
      <div className="pt-10 px-5 pb-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold leading-snug text-foreground">{partner.name}</h3>
          <div className="flex items-center gap-0.5 text-xs font-semibold uppercase text-gray-600">
            <Star className="h-4 w-4 text-primary" />
            <span>{partner.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 truncate">{partner.tagline}</p>
        <div className="flex flex-wrap items-center justify-between text-xs font-semibold uppercase text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {partner.locations[0]}
          </span>
          <span>{partner.jobs.length} jobs</span>
        </div>
      </div>
      <div className="px-5 pb-5">
        <p className="text-right text-[11px] uppercase text-gray-600">Best about {partner.bestAbout}</p>
      </div>
    </Card>
  );
}

type PartnerDetailProps = {
  partner: Partner | null;
  onBackToList: () => void;
};

function PartnerDetail({ partner, onBackToList }: PartnerDetailProps) {
  if (!partner) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-sm text-gray-600">
        Select a company to view more details.
      </div>
    );
  }

  const infoEntries = getGeneralInfoEntries(partner.generalInfo);

  return (
    <div className="bg-white rounded-2xl shadow-lg h-full overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
          <div>
            <p className="text-xs uppercase text-gray-600">Partner</p>
            <h2 className="text-2xl font-serif text-primary">{partner.name}</h2>
            <p className="text-sm text-gray-600">{partner.locations.join(" • ")}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="px-3 py-1 rounded-full bg-secondary text-primary text-xs font-medium whitespace-nowrap">
              {partner.recommendPercent}% recommend
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4 text-primary" />
              <span>{partner.rating.toFixed(1)} rating</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{partner.locations[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{partner.generalInfo.workingDays}</span>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-8 pt-6 pb-8 space-y-6">
        <div>
          <p className="text-xs uppercase text-gray-600">General information</p>
          <div className="mt-3 grid grid-cols-1 gap-4 text-sm text-gray-600 sm:grid-cols-2">
            {infoEntries.map((entry) => (
              <div key={entry.label} className="space-y-1">
                <p className="text-[10px] uppercase text-gray-600">{entry.label}</p>
                <p className="text-base font-semibold text-foreground">{entry.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Overview</h3>
          <p className="text-sm leading-relaxed text-gray-600">{partner.overviewText}</p>
        </div>
      </div>
    </div>
  );
}

export default function PartnersOpportunities() {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(partners[0]?.id ?? null);
  const [activeLocation, setActiveLocation] = useState<LocationFilter>("All");

  const filteredPartners = useMemo(() => {
    if (activeLocation === "All") {
      return partners;
    }
    return partners.filter((partner) => partner.locations.includes(activeLocation));
  }, [activeLocation]);

  useEffect(() => {
    if (!filteredPartners.length) {
      setSelectedPartnerId(null);
      return;
    }
    if (!filteredPartners.some((partner) => partner.id === selectedPartnerId)) {
      setSelectedPartnerId(filteredPartners[0].id);
    }
  }, [filteredPartners, selectedPartnerId]);

  const activePartner = partners.find((partner) => partner.id === selectedPartnerId) ?? filteredPartners[0] ?? null;

  const handleBackToList = () => {
    const grid = document.getElementById("partners-grid");
    grid?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/50 via-white to-primary/5 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-4xl lg:text-5xl font-serif text-primary">
              Explore Our <span className="text-accent">Partner Network</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Explore opportunities with our network of trusted partner companies across Australia, committed to developing the next generation of talent.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-border bg-muted/50 p-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs font-semibold uppercase text-gray-600">
              Sort by location
            </p>

            <div className="flex flex-wrap gap-2">
              {locationFilters.map((location) => {
                const isActive = activeLocation === location;

                return (
                  <button
                    type="button"
                    key={location}
                    className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase transition ${isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-gray-600 hover:border-primary"
                      }`}
                    onClick={() => setActiveLocation(location)}
                  >
                    {location}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30 min-h-[780px]">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-6">
              <div id="partners-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPartners.map((partner) => (
                  <PartnerCard
                    key={partner.id}
                    partner={partner}
                    isActive={activePartner?.id === partner.id}
                    onSelect={setSelectedPartnerId}
                  />
                ))}
              </div>
              {!filteredPartners.length && (
                <p className="text-center text-sm text-gray-600">
                  No partners available for {activeLocation} yet.
                </p>
              )}
            </div>
            <div className="lg:col-span-[0.8fr]">
              <div className="h-auto lg:h-[calc(100vh-12rem)] overflow-hidden rounded-2xl border border-border bg-card">
                <PartnerDetail partner={activePartner} onBackToList={handleBackToList} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
