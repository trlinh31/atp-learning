import { get, put, post, uploadFile } from '../lib/api';
import type { Member } from './authService';

export interface MemberListResponse {
  data: Member[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface MemberFilters {
  search?: string;
  country?: string;
  role?: string;
  page?: number;
}

/**
 * Get list of approved members
 */
export async function getMembers(filters?: MemberFilters): Promise<MemberListResponse> {
  const params = new URLSearchParams();
  if (filters?.search) params.append('search', filters.search);
  if (filters?.country) params.append('country', filters.country);
  if (filters?.role) params.append('role', filters.role);
  if (filters?.page) params.append('page', filters.page.toString());

  const queryString = params.toString();
  return get(`/api/community/members${queryString ? `?${queryString}` : ''}`);
}

/**
 * Get member profile by ID
 */
export async function getMemberById(id: number): Promise<{ member: Member }> {
  return get(`/api/community/members/${id}`);
}

/**
 * Get current member profile
 */
export async function getCurrentProfile(): Promise<{ member: Member }> {
  return get('/api/community/profile');
}

/**
 * Update current member profile
 */
export async function updateProfile(data: Partial<Member>): Promise<{ message: string; member: Member }> {
  return put('/api/community/profile', data);
}

/**
 * Upload avatar
 */
export async function uploadAvatar(file: File): Promise<{ success: boolean; url: string; message: string }> {
  const formData = new FormData();
  formData.append('avatar', file);
  return uploadFile('/api/community/profile/avatar', formData);
}

/**
 * Complete member registration
 */
export async function completeRegistration(data: Partial<Member>): Promise<{ message: string; member: Member }> {
  return post('/api/community/register', data);
}

/**
 * Submit consultation booking
 */
export async function submitConsultationBooking(data: {
  name: string;
  phone: string;
  video_id?: number;
}): Promise<{ success: boolean; message: string }> {
  return post('/api/community/consultation-booking', data);
}

