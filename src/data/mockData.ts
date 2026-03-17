import { Video, VideoCategory } from '@/services/videoService';

// Mock Categories (The "Problems" users choose)
export const mockCategories: VideoCategory[] = [
    { id: 1, name: "Career Direction", slug: "career-direction", is_active: true },
    { id: 2, name: "Job Search Strategy", slug: "job-search", is_active: true },
    { id: 3, name: "Interview Skills", slug: "interview-skills", is_active: true },
    { id: 4, name: "Workplace Success", slug: "workplace-success", is_active: true },
];

import short1 from "@assets/generated_images/quick_career_tip_vertical.png";

// Mock Videos
export const mockVideos: Video[] = [
    // Short Videos (Quick Tips)
    {
        id: 101,
        title: "How to find your career passion?",
        description: "Struggling to know what you want to do? Here is a quick exercise to help you.",
        video_url: "https://example.com/video1",
        thumbnail_url: short1,
        category: mockCategories[0], // Career Direction
        category_id: 1,
        price_credit: 5,
        is_active: true,
        is_short: true,
        duration: 180,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 102,
        title: "Resume keywords that get you noticed",
        description: "Beat the ATS with these essential keywords for your industry.",
        video_url: "https://example.com/video2",
        thumbnail_url: short1,
        category: mockCategories[1], // Job Search
        category_id: 2,
        price_credit: 5,
        is_active: true,
        is_short: true,
        duration: 120,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 103,
        title: "Body language tricks for interviews",
        description: "Look confident even when you are nervous.",
        video_url: "https://example.com/video3",
        thumbnail_url: short1,
        category: mockCategories[2], // Interview Skills
        category_id: 3,
        price_credit: 5,
        is_active: true,
        is_short: true,
        duration: 200,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 104,
        title: "Handling difficult coworkers",
        description: "Professional ways to deal with conflict at work.",
        video_url: "https://example.com/video4",
        thumbnail_url: short1,
        category: mockCategories[3], // Workplace Success
        category_id: 4,
        price_credit: 5,
        is_active: true,
        is_short: true,
        duration: 300,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 105,
        title: "What if I chose the wrong degree?",
        description: "It is not the end of the world. Here is how to pivot.",
        video_url: "https://example.com/video5",
        thumbnail_url: short1,
        category: mockCategories[0], // Career Direction
        category_id: 1,
        price_credit: 5,
        is_active: true,
        is_short: true,
        duration: 150,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },

    // Full Videos (Masterclasses)
    {
        id: 201,
        title: "Complete Career Roadmap Masterclass",
        description: "A 4-week guide to planning your entire career trajectory.",
        video_url: "https://example.com/masterclass1",
        thumbnail_url: short1,
        category: mockCategories[0], // Career Direction
        category_id: 1,
        price_credit: 25,
        is_active: true,
        is_short: false,
        duration: 3600,
        mentor: "Sarah Jenkins",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 202,
        title: "Mastering the Tech Interview",
        description: "Deep dive into technical and behavioral interview prep.",
        video_url: "https://example.com/masterclass2",
        thumbnail_url: short1,
        category: mockCategories[2], // Interview Skills
        category_id: 3,
        price_credit: 30,
        is_active: true,
        is_short: false,
        duration: 5400,
        mentor: "David Chen",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];
