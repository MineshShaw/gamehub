import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import LoginButton from '@/components/LoginButton';

/**
 * Login component that provides a form for user authentication.
 * Utilizes email and password input fields to log in users.
 * Redirects authenticated users to the dashboard.
 * Displays error messages if login fails.
 * Also includes a button for Google login.
 */

export default function Login() {
  const router = useRouter();
  const { loginWithEmailPassword, isLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('User is logged in, redirecting to dashboard...');
      router.push('/dashboard');
    }
  }, [isLoggedIn]);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      loginWithEmailPassword(data.token);
    } else {
      setError(data.error || 'Login failed');
    }
  };

  

  return (
    <div className="max-w-md mx-auto mt-2 p-6 border rounded-xl shadow gap-5 flex flex-col">
      <LoginButton />
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200 ease-in-out"
        >
          Log In
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>

    </div>
  );
}
