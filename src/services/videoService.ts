import { get, post } from '../lib/api';
import { FEATURES } from '@/config/features';
import { mockVideos, mockCategories } from '@/data/mockData';

export interface Video {
  id: number;
  title: string;
  description?: string;
  video_url: string;
  youtube_video_id?: string;
  thumbnail_url?: string;
  category_id?: number;
  mentor?: string;
  duration?: number;
  price_credit: number;
  is_active: boolean;
  is_short: boolean;
  category?: VideoCategory;
  tags?: VideoTag[];
  created_at: string;
  updated_at: string;
}

export interface VideoCategory {
  id: number;
  name: string;
  slug?: string;
  parent_id?: number;
  is_active: boolean;
  parent?: VideoCategory;
}

export interface VideoTag {
  id: number;
  name: string;
  slug?: string;
  is_active?: boolean;
}

export interface VideosResponse {
  videos: Video[];
}

export interface VideoDetailResponse {
  video: Video;
  is_purchased: boolean;
  playlist_videos: Video[];
}

export interface PurchaseStatusResponse {
  purchased: boolean;
  member_credit: number;
  video_price: number;
  is_guest: boolean;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  new_balance?: number;
}

export interface VideoCategoriesResponse {
  categories: {
    category: VideoCategory;
    level: number;
    display_name: string;
  }[];
  tree: VideoCategory[];
}

/**
 * Get list of videos
 */
export async function getVideos(filters?: {
  search?: string;
  category_id?: number;
  sort?: 'newest' | 'oldest' | 'title';
}): Promise<VideosResponse> {
  if (FEATURES.USE_MOCK_DATA) {
    let filteredVideos = [...mockVideos];

    if (filters?.category_id) {
      filteredVideos = filteredVideos.filter(v => v.category_id === filters.category_id);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredVideos = filteredVideos.filter(v =>
        v.title.toLowerCase().includes(searchLower) ||
        v.description?.toLowerCase().includes(searchLower)
      );
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return { videos: filteredVideos };
  }

  const params = new URLSearchParams();
  if (filters?.search) params.append('search', filters.search);
  if (filters?.category_id) params.append('category_id', filters.category_id.toString());
  if (filters?.sort) params.append('sort', filters.sort);

  const queryString = params.toString();
  return get(`/api/community/videos${queryString ? `?${queryString}` : ''}`);
}

/**
 * Get video detail
 */
export async function getVideoById(id: number): Promise<VideoDetailResponse> {
  if (FEATURES.USE_MOCK_DATA) {
    const video = mockVideos.find(v => v.id === id);
    if (!video) throw new Error('Video not found');

    return {
      video,
      is_purchased: false, // Default to not purchased for mock
      playlist_videos: mockVideos.filter(v => v.id !== id).slice(0, 3)
    };
  }
  return get(`/api/community/videos/${id}`);
}

/**
 * Check if member has purchased a video
 */
export async function checkPurchaseStatus(id: number): Promise<PurchaseStatusResponse> {
  if (FEATURES.USE_MOCK_DATA) {
    return {
      purchased: true, // Always return true for easier testing in dev
      member_credit: 100,
      video_price: 5,
      is_guest: false
    };
  }
  return get(`/api/community/videos/${id}/purchase-status`);
}

/**
 * Purchase a video
 */
export async function purchaseVideo(id: number): Promise<PurchaseResponse> {
  if (FEATURES.USE_MOCK_DATA) {
    return {
      success: true,
      message: 'Video purchased successfully (Mock)',
      new_balance: 95
    };
  }
  return post(`/api/community/videos/${id}/purchase`);
}

/**
 * Get video categories tree
 */
export async function getVideoCategories(): Promise<VideoCategoriesResponse> {
  if (FEATURES.USE_MOCK_DATA) {
    return {
      categories: mockCategories.map(c => ({
        category: c,
        level: 1,
        display_name: c.name
      })),
      tree: mockCategories
    };
  }
  return get('/api/community/video-categories');
}

