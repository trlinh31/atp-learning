import { get, post, setToken, removeToken } from '../lib/api';
import { FEATURES } from '@/config/features';
import { config } from '../lib/config';

export interface Member {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar?: string;
  phone?: string;
  country?: string;
  city?: string;
  state?: string;
  role?: string;
  company?: string;
  year_of_experience?: number;
  introduction?: string;
  linkedin_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  github_url?: string;
  personal_site_url?: string;
  whatsapp_url?: string;
  zalo_url?: string;
  interests?: any;
  educations?: any[];
  experiences?: any[];
  status: 'created' | 'pending' | 'joined' | 'blocked' | 'rejected';
  total_credit?: number;
  why_you_join?: string;
  referred_where?: string;
  referred_by?: string;
}

export interface AuthResponse {
  token: string;
  token_type: string;
  expires_in: number;
  member: Member;
}

/**
 * Initiate Google OAuth - Direct URL
 */
export function getGoogleAuthUrl(): string {
  const clientId = config.googleClientId;
  const redirectUri = `${config.appUrl}/auth/google/callback`;
  const scope = 'openid email profile';
  
  return `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}&` +
    `access_type=offline&` +
    `prompt=consent`;
}

/**
 * Initiate LinkedIn OAuth - Direct URL
 */
export function getLinkedInAuthUrl(): string {
  const clientId = config.linkedinClientId;
  const redirectUri = `${config.appUrl}/auth/linkedin/callback`;
  const scope = 'openid profile email';
  
  return `https://www.linkedin.com/oauth/v2/authorization?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}`;
}

/**
 * Handle Google OAuth callback
 */
export async function handleGoogleCallback(code: string): Promise<AuthResponse> {
  const response = await post<AuthResponse>('/api/community/auth/google/callback', { code });
  if (response.token) {
    setToken(response.token);
  }
  return response;
}

/**
 * Handle LinkedIn OAuth callback
 */
export async function handleLinkedInCallback(code: string): Promise<AuthResponse> {
  const response = await post<AuthResponse>('/api/community/auth/linkedin/callback', { code });
  if (response.token) {
    setToken(response.token);
  }
  return response;
}

/**
 * Get current authenticated member
 */
export async function getCurrentMember(): Promise<{ member: Member }> {
  return get('/api/community/auth/me');
}

/**
 * Refresh JWT token
 */
export async function refreshToken(): Promise<AuthResponse> {
  const response = await post<AuthResponse>('/api/community/auth/refresh');
  if (response.token) {
    setToken(response.token);
  }
  return response;
}

/**
 * Logout
 */
export async function logout(): Promise<void> {
  try {
    await post('/api/community/auth/logout');
  } finally {
    removeToken();
  }
}

/**
 * Open OAuth popup window
 */
export function openOAuthPopup(url: string, provider: string): Promise<string> {
  if (FEATURES.USE_MOCK_DATA) {
    return Promise.resolve(`${provider}_mock_code`);
  }
  return new Promise((resolve, reject) => {
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      url,
      `${provider}_oauth`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      reject(new Error('Failed to open popup window'));
      return;
    }

    // Poll for OAuth callback
    const pollTimer = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(pollTimer);
          reject(new Error('OAuth popup was closed'));
          return;
        }

        // Check if popup URL contains the callback
        const popupUrl = popup.location.href;
        if (popupUrl.includes('code=')) {
          const url = new URL(popupUrl);
          const code = url.searchParams.get('code');
          
          clearInterval(pollTimer);
          popup.close();
          
          if (code) {
            resolve(code);
          } else {
            reject(new Error('No authorization code received'));
          }
        }
      } catch (e) {
        // Cross-origin error - popup is still on OAuth provider's domain
        // This is expected, continue polling
      }
    }, 500);

    // Timeout after 5 minutes
    setTimeout(() => {
      clearInterval(pollTimer);
      if (!popup.closed) {
        popup.close();
      }
      reject(new Error('OAuth timeout'));
    }, 5 * 60 * 1000);
  });
}

