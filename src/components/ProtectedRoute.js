import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

/**
 * A higher-order component that protects routes by ensuring user authentication.
 * Redirects unauthenticated users to the login page.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {React.ReactNode|null} - Returns the child components if the user is authenticated, otherwise returns null while redirecting.
 */

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/auth'); 
    }
  }, [isLoggedIn, loading]);

  if (loading || !isLoggedIn) return null; 

  return children;
}
