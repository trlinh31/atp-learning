// Environment configuration
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  appUrl: import.meta.env.VITE_APP_URL || 'http://localhost:5000',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  linkedinClientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID || '',
} as const;

