import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * The landing page of the application.
 *
 * If the user is not logged in, renders a visually appealing page with a login button and a
 * sign-up button.
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
    <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-extrabold mb-6">Welcome to GameHub!</h1>
        <p className="text-lg mb-8">
          Your ultimate destination for gaming enthusiasts. Connect, compete, and conquer!
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/auth')}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/auth')}
            className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow-md hover:bg-purple-800 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}