import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/auth/login'); // Redirect if not logged in
    }
  }, [isLoggedIn, loading]);

  if (loading || !isLoggedIn) return null; // Optional: show loader here

  return children;
}
