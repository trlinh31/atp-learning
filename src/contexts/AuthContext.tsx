import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Member, getCurrentMember, logout as logoutService } from '../services/authService';
import { isAuthenticated, removeToken } from '../lib/api';

interface AuthContextType {
  member: Member | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (member: Member) => void;
  logout: () => Promise<void>;
  refreshMember: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentMember = async () => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      const response = await getCurrentMember();
      setMember(response.member);
    } catch (error: any) {
      console.error('Failed to fetch current member:', error);
      
      // Only remove token if it's an authentication error (401 or token-related)
      // Don't remove token for network errors or server errors (500, etc.)
      const isAuthError = 
        error?.status === 401 || 
        error?.message?.includes('401') || 
        error?.message?.includes('Unauthenticated') || 
        error?.message?.includes('Token');
      
      if (isAuthError) {
        console.log('Authentication error, removing token');
        removeToken();
        setMember(null);
      } else {
        // For other errors (network, 500, etc.), keep the token
        console.warn('Non-auth error fetching member, keeping token:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentMember();
  }, []);

  const login = (newMember: Member) => {
    setMember(newMember);
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setMember(null);
      removeToken();
    }
  };

  const refreshMember = async () => {
    await fetchCurrentMember();
  };

  const value: AuthContextType = {
    member,
    loading,
    isAuthenticated: !!member,
    login,
    logout,
    refreshMember,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

