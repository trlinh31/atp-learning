import { Brain, Briefcase as BriefcaseIcon, MessageSquare, Target } from "lucide-react";
import type { Member } from "../services/authService";
import type { Video, VideoCategory, VideoTag } from "../services/videoService";
import type { Event, Resource } from "../services/resourceService";

export interface InternJob {
  id: number;
  title: string;
  company: string;
  location: string;
  city: string;
  contractType: "Temporary" | "Permanent" | "Part-time";
  jobType: "Internship" | "Full-time" | "Part-time" | "Casual";
  isPaid: boolean;
  isAtpPartner: boolean;
  function: string;
  industry: string;
  description: string;
  requirements: string[];
  whatYoullDo: string[];
  benefits: string[];
  postedDate: string;
}

export const mockJobTypes: string[] = ["Internship", "Full-time", "Part-time", "Casual"];

export const mockLocations = [
  { value: "sydney", label: "Sydney", cities: ["Sydney CBD", "Baulkham Hills", "Chatswood", "North Ryde", "Macquarie Park", "Parramatta", "Pyrmont", "Surry Hills"] },
  { value: "melbourne", label: "Melbourne", cities: ["Melbourne CBD", "Eastern suburbs", "Inner Suburbs", "Northern Suburbs", "South Eastern Suburbs", "Western Suburbs"] },
  { value: "brisbane", label: "Brisbane", cities: ["Brisbane CBD", "Eastern suburbs", "Northern Suburbs", "Southern Suburbs", "Western Suburbs"] },
  { value: "perth", label: "Perth", cities: ["Perth CBD", "Eastern suburbs", "Northern Suburbs", "Southern Suburbs", "Western Suburbs"] },
  { value: "canberra", label: "Canberra", cities: ["Canberra"] },
];

export const mockFunctions = [
  "Executive / Management",
  "Human Resources (HR)",
  "Finance & Accounting",
  "Marketing",
  "Sales",
  "Operations",
  "IT (Information Technology)",
  "Legal",
  "Customer Support / Service",
  "Research & Development (R&D)",
  "Data Analytics",
  "Software Engineering",
  "Others",
];

export const mockIndustries = [
  "Technology & Telecoms",
  "Financial Services",
  "Healthcare / Pharmaceutical",
  "Education",
  "Retail",
  "Manufacturing",
  "Professional Services",
  "Media & Agency",
  "Government / Not for Profit",
  "Construction",
  "Energy and Utilities",
  "Leisure, Travel & Tourism",
  "Others",
];

export let mockInternJobs: InternJob[] = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "TechFlow Solutions",
    location: "Melbourne",
    city: "Melbourne CBD",
    contractType: "Temporary",
    jobType: "Internship",
    isPaid: false,
    isAtpPartner: true,
    function: "Software Engineering",
    industry: "Technology & Telecoms",
    description:
      "Join our engineering team to develop scalable web applications using modern technologies. We are looking for passionate students who want to gain hands-on experience in a fast-paced tech environment.",
    requirements: [
      "Final-year or penultimate-year student majoring in Computer Science",
      "Strong foundation in Python and SQL",
      "Experience with Power BI or Tableau is a plus",
      "Passionate about Data Analytics, AI, Machine Learning",
      "Excellent communication, teamwork, and willingness to learn",
    ],
    whatYoullDo: [
      "Explore, analyze, and visualize data to support global payment operations",
      "Develop data-driven solutions that empower business decisions",
      "Collaborate with engineers and analysts to build efficient data pipelines and tools",
    ],
    benefits: [
      "1:1 Mentorship from experienced professionals in Data & Engineering",
      "Work on real-world projects to strengthen your CV and portfolio",
      "Professional training in analytical thinking and technical problem-solving",
      "Expand your professional network with industry experts and employers",
    ],
    postedDate: "2026-01-10",
  },
  {
    id: 2,
    title: "Business Development Intern",
    company: "Growth Partners AU",
    location: "Sydney",
    city: "Sydney CBD",
    contractType: "Temporary",
    jobType: "Internship",
    isPaid: false,
    isAtpPartner: true,
    function: "Sales",
    industry: "Professional Services",
    description:
      "Support the team in identifying and building partnerships with international clients. This role offers excellent exposure to business strategy and client relationship management.",
    requirements: [
      "Strong English communication skills (equivalent to IELTS 6.0+)",
      "Confident, proactive, and passionate about networking",
      "Customer-centric mindset with strong problem-solving abilities",
    ],
    whatYoullDo: [
      "Research and identify potential business partners and clients",
      "Assist in preparing presentations and proposals",
      "Support client meetings and follow-up communications",
      "Contribute to strategic planning discussions",
    ],
    benefits: [
      "Direct mentorship from senior business development managers",
      "Exposure to high-profile clients and international markets",
      "Develop negotiation and presentation skills",
      "Networking opportunities with industry leaders",
    ],
    postedDate: "2026-01-12",
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "Analytics Hub",
    location: "Melbourne",
    city: "Eastern suburbs",
    contractType: "Temporary",
    jobType: "Internship",
    isPaid: true,
    isAtpPartner: true,
    function: "Data Analytics",
    industry: "Technology & Telecoms",
    description:
      "Collect, aggregate, and analyze data from multiple sources to monitor KPIs in retail and e-commerce. You will work with cutting-edge analytics tools and gain practical experience in data-driven decision making.",
    requirements: [
      "Proficiency in Excel and data visualization tools",
      "Knowledge of SQL and Python preferred",
      "Strong analytical and communication skills",
    ],
    whatYoullDo: [
      "Build and maintain dashboards for real-time KPI monitoring",
      "Perform data quality checks and data cleaning",
      "Generate weekly and monthly performance reports",
      "Collaborate with stakeholders to understand data needs",
    ],
    benefits: [
      "Competitive stipend for the duration of the internship",
      "Access to premium data analytics tools and training",
      "Certificate of completion and recommendation letter",
      "Potential for full-time conversion based on performance",
    ],
    postedDate: "2026-01-08",
  },
  {
    id: 4,
    title: "Marketing Intern",
    company: "Creative Minds Agency",
    location: "Sydney",
    city: "Surry Hills",
    contractType: "Permanent",
    jobType: "Part-time",
    isPaid: true,
    isAtpPartner: true,
    function: "Marketing",
    industry: "Media & Agency",
    description:
      "Kickstart your career in influencer marketing and content strategy with a leading agency. Perfect for creative individuals who want to learn the ins and outs of digital marketing.",
    requirements: [
      "Currently studying Marketing, Communications, or related field",
      "Creative mindset and attention to detail",
      "Familiarity with social media platforms",
    ],
    whatYoullDo: [
      "Schedule and publish posts across social media channels",
      "Write captions, marketing emails, and short-form content",
      "Assist in influencer outreach and campaign coordination",
      "Monitor social media trends and competitor activities",
    ],
    benefits: [
      "Flexible part-time hours to fit around your studies",
      "Work with top influencers and brands",
      "Build a portfolio of real marketing campaigns",
      "Learn from industry experts in digital marketing",
    ],
    postedDate: "2026-01-14",
  },
  {
    id: 5,
    title: "Business Analyst Intern",
    company: "Fintech Innovations",
    location: "Melbourne",
    city: "Inner Suburbs",
    contractType: "Temporary",
    jobType: "Internship",
    isPaid: false,
    isAtpPartner: true,
    function: "IT (Information Technology)",
    industry: "Financial Services",
    description:
      "Join a tech project focused on optimizing customer loyalty solutions. You will work closely with product managers and developers to translate business needs into technical requirements.",
    requirements: [
      "Currently studying Business, IT, or related field",
      "Strong analytical and problem-solving skills",
      "Excellent written and verbal communication",
    ],
    whatYoullDo: [
      "Support creation of pitch decks and presentations",
      "Perform data analysis and contribute to business strategy",
      "Gather requirements and document processes",
      "Participate in stakeholder meetings and workshops",
    ],
    benefits: [
      "Exposure to fintech innovation and startup culture",
      "Mentorship from experienced business analysts",
      "Hands-on experience with agile methodologies",
      "Networking opportunities in the finance tech sector",
    ],
    postedDate: "2026-01-11",
  },
  {
    id: 6,
    title: "HR/Business Intern",
    company: "People First Consulting",
    location: "Brisbane",
    city: "Brisbane CBD",
    contractType: "Temporary",
    jobType: "Internship",
    isPaid: false,
    isAtpPartner: true,
    function: "Human Resources (HR)",
    industry: "Professional Services",
    description:
      "Support marketing, communications, and business development initiatives. Great opportunity to learn about HR operations and employer branding.",
    requirements: [
      "Interest in Human Resources and people management",
      "Strong writing and communication skills",
      "Proficiency in Microsoft Office and social media",
    ],
    whatYoullDo: [
      "Write blog posts and manage website/LinkedIn content",
      "Assist with marketing campaigns and outreach activities",
      "Learn about culture-fit hiring processes",
      "Support recruitment and onboarding activities",
    ],
    benefits: [
      "Learn HR best practices from industry professionals",
      "Gain experience in employer branding and recruitment",
      "Flexible working arrangements",
      "Professional development workshops included",
    ],
    postedDate: "2026-01-09",
  },
  {
    id: 7,
    title: "Data Scientist Intern",
    company: "AI Ventures",
    location: "Melbourne",
    city: "Melbourne CBD",
    contractType: "Temporary",
    jobType: "Internship",
    isPaid: true,
    isAtpPartner: true,
    function: "Data Analytics",
    industry: "Technology & Telecoms",
    description:
      "Develop film classification logic and revenue prediction models using machine learning. Work with cutting-edge AI technologies in a dynamic startup environment.",
    requirements: [
      "Strong Python and machine learning skills",
      "Experience with data visualization",
      "Ability to collaborate with cross-functional teams",
    ],
    whatYoullDo: [
      "Build and train machine learning models for content classification",
      "Analyze large datasets to identify patterns and insights",
      "Create visualizations to communicate findings to stakeholders",
      "Contribute to model optimization and performance tuning",
    ],
    benefits: [
      "Work on production ML systems used by thousands of users",
      "Access to GPU computing resources and cloud infrastructure",
      "Weekly learning sessions with senior data scientists",
      "Competitive paid internship with performance bonus",
    ],
    postedDate: "2026-01-13",
  },
  {
    id: 8,
    title: "Finance Intern",
    company: "Capital Partners",
    location: "Sydney",
    city: "North Ryde",
    contractType: "Temporary",
    jobType: "Internship",
    isPaid: false,
    isAtpPartner: false,
    function: "Finance & Accounting",
    industry: "Financial Services",
    description:
      "Assist with financial analysis, reporting, and investment research. Gain exposure to capital markets and investment strategies.",
    requirements: [
      "Currently studying Finance, Accounting, or related field",
      "Strong Excel skills",
      "Attention to detail and analytical mindset",
    ],
    whatYoullDo: [
      "Conduct market research and competitive analysis",
      "Assist in preparing financial models and reports",
      "Support the team with ad-hoc analysis and presentations",
      "Learn about investment evaluation and due diligence",
    ],
    benefits: [
      "Exposure to capital markets and investment banking",
      "Mentorship from CFA-certified professionals",
      "Opportunity to attend client meetings",
      "Strong reference letter upon successful completion",
    ],
    postedDate: "2026-01-07",
  },
  {
    id: 9,
    title: "UX Design Intern",
    company: "Digital Design Studio",
    location: "Perth",
    city: "Perth CBD",
    contractType: "Temporary",
    jobType: "Casual",
    isPaid: true,
    isAtpPartner: true,
    function: "IT (Information Technology)",
    industry: "Technology & Telecoms",
    description:
      "Create user-centered designs for web and mobile applications. Perfect for design students who want hands-on experience with real client projects.",
    requirements: [
      "Proficiency in Figma or Adobe XD",
      "Understanding of UX principles",
      "Portfolio of design work preferred",
    ],
    whatYoullDo: [
      "Create wireframes and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Iterate on designs based on user feedback",
    ],
    benefits: [
      "Flexible casual hours - work when it suits you",
      "Build a professional portfolio with real projects",
      "Learn from award-winning designers",
      "Potential for ongoing freelance work",
    ],
    postedDate: "2026-01-15",
  },
  {
    id: 10,
    title: "Operations Intern",
    company: "Logistics Express",
    location: "Brisbane",
    city: "Southern Suburbs",
    contractType: "Temporary",
    jobType: "Full-time",
    isPaid: false,
    isAtpPartner: false,
    function: "Operations",
    industry: "Manufacturing",
    description:
      "Support daily operations and process improvement initiatives. Learn about supply chain management and logistics operations.",
    requirements: [
      "Strong organizational skills",
      "Ability to work in a fast-paced environment",
      "Interest in supply chain and logistics",
    ],
    whatYoullDo: [
      "Monitor and track shipments and deliveries",
      "Assist in inventory management and stock control",
      "Support process documentation and improvement initiatives",
      "Coordinate with suppliers and warehouse teams",
    ],
    benefits: [
      "Gain practical logistics and operations experience",
      "Opportunity to see end-to-end supply chain operations",
      "Transportation allowance provided",
      "Certificate of completion upon finishing the program",
    ],
    postedDate: "2026-01-06",
  },
  {
    id: 11,
    title: "Legal Intern",
    company: "Justice & Associates",
    location: "Canberra",
    city: "Canberra",
    contractType: "Temporary",
    jobType: "Internship",
    isPaid: false,
    isAtpPartner: true,
    function: "Legal",
    industry: "Professional Services",
    description:
      "Assist with legal research and documentation for corporate clients. Excellent opportunity for law students to gain practical legal experience.",
    requirements: [
      "Currently studying Law",
      "Strong research and writing skills",
      "Attention to detail",
    ],
    whatYoullDo: [
      "Conduct legal research using databases and case law",
      "Draft legal documents and correspondence",
      "Assist lawyers in preparing for court proceedings",
      "Maintain and organize case files",
    ],
    benefits: [
      "Work directly with experienced solicitors and barristers",
      "Exposure to corporate and commercial law",
      "Practical Legal Training (PLT) hours may be credited",
      "Strong recommendation letter for future roles",
    ],
    postedDate: "2026-01-05",
  },
  {
    id: 12,
    title: "Customer Success Intern",
    company: "SaaS Solutions",
    location: "Sydney",
    city: "Parramatta",
    contractType: "Permanent",
    jobType: "Full-time",
    isPaid: true,
    isAtpPartner: true,
    function: "Customer Support / Service",
    industry: "Technology & Telecoms",
    description:
      "Help customers succeed with our platform through onboarding and support. Join a fast-growing SaaS company and learn customer success best practices.",
    requirements: [
      "Excellent communication skills",
      "Problem-solving mindset",
      "Interest in technology and SaaS",
    ],
    whatYoullDo: [
      "Onboard new customers and conduct product training sessions",
      "Respond to customer inquiries via chat and email",
      "Create help articles and tutorial videos",
      "Track customer health metrics and identify at-risk accounts",
    ],
    benefits: [
      "Competitive salary with quarterly bonuses",
      "Remote-friendly with flexible hours",
      "Free access to premium SaaS tools for learning",
      "Fast-track path to full-time Customer Success Manager role",
    ],
    postedDate: "2026-01-14",
  },
];

let jobIdCounter = 100;

export function addNewJob(jobData: {
  title: string;
  company: string;
  location: string;
  industry: string;
  jobType: "Internship" | "Part-time" | "Casual";
  isPaid: boolean;
  description: string;
}): InternJob {
  const locationData = mockLocations.find((loc) => loc.label.toLowerCase() === jobData.location.toLowerCase());
  const city = locationData?.cities[0] || jobData.location;

  const newJob: InternJob = {
    id: jobIdCounter++,
    title: jobData.title,
    company: jobData.company,
    location: jobData.location,
    city,
    contractType: jobData.jobType === "Internship" ? "Temporary" : "Part-time",
    jobType: jobData.jobType,
    isPaid: jobData.isPaid,
    isAtpPartner: false,
    function: "Others",
    industry: jobData.industry,
    description: jobData.description,
    requirements: [
      "Strong communication and interpersonal skills",
      "Ability to work independently and in a team",
      "Willingness to learn and adapt to new challenges",
      "Relevant educational background or experience",
    ],
    whatYoullDo: [
      "Contribute to daily operations and team projects",
      "Learn industry best practices and professional skills",
      "Collaborate with team members on key initiatives",
      "Gain hands-on experience in a professional environment",
    ],
    benefits: [
      "Flexible working arrangements",
      "Mentorship from experienced professionals",
      "Opportunity to build your professional network",
      "Valuable work experience for your resume",
    ],
    postedDate: new Date().toISOString().split("T")[0],
  };

  mockInternJobs.unshift(newJob);
  return newJob;
}

export const mockMembers: Member[] = [
  {
    id: 1,
    email: "demo@atpcommunity.com",
    first_name: "Demo",
    last_name: "User",
    full_name: "Demo User",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
    phone: "+61 400 000 001",
    country: "Australia",
    city: "Sydney",
    state: "NSW",
    role: "Student",
    company: "University of Sydney",
    year_of_experience: 1,
    introduction:
      "Passionate about technology and career development. Currently studying Computer Science and looking for internship opportunities in Australia.",
    linkedin_url: "https://linkedin.com/in/demo-user",
    status: "joined",
    total_credit: 100,
    why_you_join: "To connect with other professionals and find career opportunities",
    referred_where: "Social Media",
  },
  {
    id: 2,
    email: "sarah@example.com",
    first_name: "Sarah",
    last_name: "Chen",
    full_name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    phone: "+61 400 000 002",
    country: "Australia",
    city: "Melbourne",
    state: "VIC",
    role: "Software Engineer",
    company: "Tech Startup",
    year_of_experience: 3,
    introduction: "Full-stack developer with a passion for building scalable web applications.",
    linkedin_url: "https://linkedin.com/in/sarah-chen",
    status: "joined",
    total_credit: 50,
  },
  {
    id: 3,
    email: "mike@example.com",
    first_name: "Mike",
    last_name: "Johnson",
    full_name: "Mike Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    phone: "+61 400 000 003",
    country: "Australia",
    city: "Brisbane",
    state: "QLD",
    role: "Data Analyst",
    company: "Analytics Corp",
    year_of_experience: 2,
    introduction: "Data enthusiast helping businesses make data-driven decisions.",
    linkedin_url: "https://linkedin.com/in/mike-johnson",
    status: "joined",
    total_credit: 75,
  },
  {
    id: 4,
    email: "anna@example.com",
    first_name: "Anna",
    last_name: "Nguyen",
    full_name: "Anna Nguyen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anna",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    role: "Graduate Student",
    company: "RMIT Vietnam",
    year_of_experience: 0,
    introduction: "Currently pursuing Masters in Business Administration. Looking for opportunities in Australia.",
    status: "joined",
    total_credit: 25,
  },
  {
    id: 5,
    email: "james@example.com",
    first_name: "James",
    last_name: "Kim",
    full_name: "James Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    country: "Australia",
    city: "Perth",
    state: "WA",
    role: "UX Designer",
    company: "Design Studio",
    year_of_experience: 4,
    introduction: "Creating user-centered designs that solve real problems.",
    linkedin_url: "https://linkedin.com/in/james-kim",
    status: "joined",
    total_credit: 60,
  },
  {
    id: 6,
    email: "lisa@example.com",
    first_name: "Lisa",
    last_name: "Wang",
    full_name: "Lisa Wang",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    country: "Australia",
    city: "Adelaide",
    state: "SA",
    role: "Marketing Manager",
    company: "Growth Agency",
    year_of_experience: 5,
    introduction: "Helping startups grow through strategic marketing initiatives.",
    status: "joined",
    total_credit: 80,
  },
];

export const mockVideoCategories: VideoCategory[] = [
  { id: 1, name: "Career Development", slug: "career-development", is_active: true },
  { id: 2, name: "Interview Skills", slug: "interview-skills", is_active: true },
  { id: 3, name: "Resume Building", slug: "resume-building", is_active: true },
  { id: 4, name: "Networking", slug: "networking", is_active: true },
  { id: 5, name: "Quick Tips", slug: "quick-tips", is_active: true },
];

export const mockVideoTags: VideoTag[] = [
  { id: 1, name: "Beginner", slug: "beginner", is_active: true },
  { id: 2, name: "Advanced", slug: "advanced", is_active: true },
  { id: 3, name: "Australia", slug: "australia", is_active: true },
  { id: 4, name: "Remote Work", slug: "remote-work", is_active: true },
];

export const mockVideos: Video[] = [
  {
    id: 1,
    title: "Mastering the Australian Internship Interview",
    description: "Learn the secrets to ace your internship interviews in the Australian market.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    duration: 2700,
    price_credit: 5,
    is_short: false,
    mentor: "Viet Dang",
    category: { id: 1, name: "Career Preparation", slug: "career-prep", is_active: true },
    is_active: true,
    tags: [],
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Building a Standout Resume for Tech Roles",
    description: "How to structure your resume to catch the eye of top tech recruiters.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    duration: 1800,
    price_credit: 3,
    is_short: false,
    mentor: "Sarah Johnson",
    category: { id: 2, name: "Career Preparation", slug: "career-prep", is_active: true },
    is_active: true,
    tags: [],
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
  },
  {
    id: 3,
    title: "Networking 101: Connecting with Industry Professionals",
    description: "Practical tips for building a professional network from scratch.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    duration: 2100,
    price_credit: 4,
    is_short: false,
    mentor: "Michael Chen",
    category: { id: 1, name: "Career Preparation", slug: "career-prep", is_active: true },
    is_active: true,
    tags: [],
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z",
  },
  {
    id: 4,
    title: "Growth Mindset: Overcoming Workplace Challenges",
    description: "Develop the resilience needed to thrive in high-pressure environments.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80",
    duration: 1500,
    price_credit: 2,
    is_short: false,
    mentor: "Emma Wilson",
    category: { id: 3, name: "Mindset & Culture", slug: "mindset-culture", is_active: true },
    is_active: true,
    tags: [],
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z",
  },
  {
    id: 5,
    title: "The Power of Professional Etiquette",
    description: "Master the unwritten rules of the Australian workplace.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    duration: 1200,
    price_credit: 2,
    is_short: false,
    mentor: "David Smith",
    category: { id: 4, name: "Workplace Skills", slug: "workplace-skills", is_active: true },
    is_active: true,
    tags: [],
    created_at: "2024-01-22T10:00:00Z",
    updated_at: "2024-01-22T10:00:00Z",
  },
  {
    id: 6,
    title: "Cultural Intelligence in Global Teams",
    description: "Navigate cross-cultural communication with confidence.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    duration: 2400,
    price_credit: 5,
    is_short: false,
    mentor: "Aisha Patel",
    category: { id: 3, name: "Mindset & Culture", slug: "mindset-culture", is_active: true },
    is_active: true,
    tags: [],
    created_at: "2024-01-08T10:00:00Z",
    updated_at: "2024-01-08T10:00:00Z",
  },
  {
    id: 7,
    title: "Effective Team Collaboration Tools",
    description: "A guide to the most popular tools used in modern workplaces.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    duration: 900,
    price_credit: 2,
    is_short: false,
    mentor: "James Lee",
    category: { id: 4, name: "Workplace Skills", slug: "workplace-skills", is_active: true },
    is_active: true,
    tags: [],
    created_at: "2024-01-25T10:00:00Z",
    updated_at: "2024-01-25T10:00:00Z",
  },
  {
    id: 8,
    title: "Designing Your Career Pivot",
    description: "A framework for identifying your strengths and making a successful transition.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1454165833767-0275080058d3?w=800&q=80",
    duration: 360,
    price_credit: 7,
    is_short: false,
    mentor: "Bill Burnett",
    category: { id: 5, name: "Career Development", slug: "career-dev", is_active: true },
    is_active: true,
    tags: [],
    created_at: "2024-01-28T10:00:00Z",
    updated_at: "2024-01-28T10:00:00Z",
  },
  {
    id: 9,
    title: "Transferable Skills Mapping",
    description: "Learn how to bridge the gap between your current role and your next career move.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    duration: 270,
    price_credit: 5,
    is_short: false,
    mentor: "Jenny Blake",
    category: { id: 5, name: "Career Development", slug: "career-dev", is_active: true },
    is_active: true,
    tags: [],
    created_at: "2024-01-30T10:00:00Z",
    updated_at: "2024-01-30T10:00:00Z",
  },
  {
    id: 10,
    title: "Finding Your 'Why'",
    description: "Simon Sinek explores how finding your purpose can transform your career trajectory.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_video_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    duration: 225,
    price_credit: 6,
    is_short: false,
    mentor: "Simon Sinek",
    category: { id: 5, name: "Career Development", slug: "career-dev", is_active: true },
    is_active: true,
    tags: [],
    created_at: "2024-02-01T10:00:00Z",
    updated_at: "2024-02-01T10:00:00Z",
  },
];

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Career Networking Night - Sydney",
    description: "Join us for an evening of networking with industry professionals and fellow community members.",
    date: "2026-02-15T18:00:00Z",
    location: "Sydney CBD, NSW",
  },
  {
    id: 2,
    title: "Resume Review Workshop",
    description: "Get personalized feedback on your resume from experienced HR professionals.",
    date: "2026-02-20T14:00:00Z",
    location: "Online - Zoom",
  },
  {
    id: 3,
    title: "Tech Industry Insights Panel",
    description: "Hear from tech leaders about current trends and opportunities in the Australian tech sector.",
    date: "2026-03-01T17:00:00Z",
    location: "Melbourne, VIC",
  },
  {
    id: 4,
    title: "Internship Fair 2026",
    description: "Connect with top companies offering internship opportunities for students and recent graduates.",
    date: "2026-03-15T10:00:00Z",
    location: "Brisbane Convention Centre, QLD",
  },
];

export const mockResources: Resource[] = [
  { id: 1, title: "Australian Resume Template", description: "Professional resume template formatted for the Australian job market.", url: "#" },
  { id: 2, title: "Cover Letter Guide", description: "Step-by-step guide to writing compelling cover letters.", url: "#" },
  { id: 3, title: "Interview Question Bank", description: "Common interview questions with sample answers and tips.", url: "#" },
  { id: 4, title: "LinkedIn Optimization Checklist", description: "Checklist to ensure your LinkedIn profile is recruiter-ready.", url: "#" },
  { id: 5, title: "Salary Guide 2026", description: "Comprehensive salary guide for various industries in Australia.", url: "#" },
];

export const mockPurchasedVideoIds = new Set<number>([4, 5]);

let currentMockUser: Member | null = null;

export function getMockCurrentUser(): Member | null {
  return currentMockUser;
}

export function setMockCurrentUser(user: Member | null): void {
  currentMockUser = user;
}

export function addMockPurchase(videoId: number): void {
  mockPurchasedVideoIds.add(videoId);
}

export function hasPurchasedVideo(videoId: number): boolean {
  return mockPurchasedVideoIds.has(videoId);
}

export interface ProblemTopic {
  id: string;
  title: string;
  description: string;
  points: string[];
  icon: any;
  color: string;
}

export const mockProblemTopics: ProblemTopic[] = [
  {
    id: "career-development",
    title: "Career Development",
    description: "Plan your future and grow your professional presence.",
    points: ["Career Pathways & Growth", "Leadership & Impact Mindset", "Mentorship & Success Stories"],
    icon: Target,
    color: "bg-red-100 text-red-700",
  },
  {
    id: "career-preparation",
    title: "Career Preparation",
    description: "Get ready to land your dream role.",
    points: ["Interview Tips & Feedback", "Job Search & Networking", "Resume, Portfolio & Personal Branding"],
    icon: BriefcaseIcon,
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: "mindset-culture",
    title: "Mindset & Culture",
    description: "Adapt and thrive in the Australian workplace.",
    points: ["Cultural Adaptation", "Employability Mindset", "Growth & Reflection"],
    icon: Brain,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "workplace-skills",
    title: "Workplace Skills",
    description: "Master the essential skills for daily professional life.",
    points: ["Adaptability & Continuous Learning", "Professional Etiquette & Feedback", "Teamwork & Communication"],
    icon: MessageSquare,
    color: "bg-indigo-100 text-indigo-700",
  },
];

export function getJobById(id: number): InternJob | undefined {
  return mockInternJobs.find((job) => job.id === id);
}
