import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { handleLinkedInCallback } from "@/services/authService";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function LinkedInAuthCallback() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent duplicate calls in React 18 Strict Mode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processCallback = async () => {
      try {
        // Get code from URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');

        if (error) {
          toast.error('OAuth authentication failed');
          setLocation('/login');
          return;
        }

        if (!code) {
          toast.error('No authorization code received');
          setLocation('/login');
          return;
        }

        // Exchange code for token
        const response = await handleLinkedInCallback(code);
        login(response.member);

        // Redirect based on member status
        if (response.member.status === 'created') {
          setLocation('/register');
        } else if (response.member.status === 'pending') {
          setLocation('/pending');
        } else if (response.member.status === 'joined') {
          setLocation('/student-portal');
        } else if (response.member.status === 'blocked') {
          setLocation('/blocked');
        } else {
          setLocation('/');
        }
      } catch (error: any) {
        console.error('LinkedIn callback error:', error);
        toast.error(error.message || 'Authentication failed');
        setLocation('/login');
      }
    };

    processCallback();
  }, []); // Empty dependency array - only run once

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner className="mx-auto mb-4" />
        <p className="text-muted-foreground">Completing LinkedIn authentication...</p>
      </div>
    </div>
  );
}

