import { ReactNode } from 'react';
import { Redirect } from 'wouter';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from './ui/spinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireStatus?: 'created' | 'pending' | 'joined' | 'blocked' | 'rejected';
}

export function ProtectedRoute({ children, requireStatus }: ProtectedRouteProps) {
  const { member, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated || !member) {
    return <Redirect to="/login" />;
  }

  // Handle member status redirects
  if (member.status === 'created' && requireStatus !== 'created') {
    return <Redirect to="/register" />;
  }

  if (member.status === 'pending' && requireStatus !== 'pending') {
    return <Redirect to="/pending" />;
  }

  if (member.status === 'blocked' && requireStatus !== 'blocked') {
    return <Redirect to="/blocked" />;
  }

  if (requireStatus && member.status !== requireStatus) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}

