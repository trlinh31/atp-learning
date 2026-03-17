import { get } from '../lib/api';

export interface Event {
  id: number;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  // Add more fields as needed when events are implemented
}

export interface Resource {
  id: number;
  title: string;
  description?: string;
  url?: string;
  // Add more fields as needed when resources are implemented
}

/**
 * Get events list
 */
export async function getEvents(): Promise<{ events: Event[]; message?: string }> {
  return get('/api/community/events');
}

/**
 * Get ATP resources list
 */
export async function getResources(): Promise<{ resources: Resource[]; message?: string }> {
  return get('/api/community/resources');
}

