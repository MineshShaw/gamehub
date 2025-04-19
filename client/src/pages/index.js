import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * The landing page of the application.
 *
 * If the user is not logged in, renders a simple page with a login button and a
 * sign up button.
 *
 * If the user is logged in, redirects to the dashboard.
 *
 * @returns {JSX.Element} The landing page component.
 */
export default function LandingPage() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, loading]);

  if (loading) return null; 
  if (isLoggedIn) return null; 

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to GameHub!</h1>
      <button onClick={() => router.push('/auth')} className="btn">Login</button>
      <button onClick={() => router.push('/auth')} className="btn ml-2">Sign Up</button>
    </div>
  );
}
