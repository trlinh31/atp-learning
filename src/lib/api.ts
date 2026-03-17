import { config } from './config';

const TOKEN_KEY = 'atp_auth_token';
const REFRESH_TOKEN_KEY = 'atp_refresh_token';

/**
 * Get stored JWT token
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Set JWT token
 */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Remove JWT token
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * API request wrapper with JWT authentication
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const url = `${config.apiBaseUrl}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && token) {
      const refreshed = await refreshToken();
      if (refreshed) {
        // Retry the original request with new token
        const newToken = getToken();
        if (newToken) {
          headers['Authorization'] = `Bearer ${newToken}`;
          const retryResponse = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
          });
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`);
          }
          
          return await retryResponse.json();
        }
      }
      
      // If refresh failed, clear token and throw error
      removeToken();
      throw new Error('Authentication failed');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.message || `HTTP error! status: ${response.status}`;
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error: any) {
    console.error('API request error:', error);
    // Preserve the status code in the error
    if (!error.status && error.message) {
      error.status = error.message.includes('401') ? 401 : 500;
    }
    throw error;
  }
}

/**
 * Refresh JWT token
 */
async function refreshToken(): Promise<boolean> {
  try {
    const token = getToken();
    if (!token) return false;

    const response = await fetch(`${config.apiBaseUrl}/api/community/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
}

/**
 * GET request
 */
export async function get<T = any>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * POST request
 */
export async function post<T = any>(endpoint: string, data?: any): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request
 */
export async function put<T = any>(endpoint: string, data?: any): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request
 */
export async function del<T = any>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}

/**
 * Upload file (multipart/form-data)
 */
export async function uploadFile<T = any>(
  endpoint: string,
  formData: FormData
): Promise<T> {
  const token = getToken();
  const url = `${config.apiBaseUrl}${endpoint}`;

  const headers: HeadersInit = {
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

