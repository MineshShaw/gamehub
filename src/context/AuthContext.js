import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext();

/**
 * Provides the authentication state and functions to manage it to the
 * application.
 * 
 * The state is:
 * - `token`: The authentication token, stored in local storage.
 * - `user`: The user object, set when the user is logged in.
 * - `loading`: A boolean indicating if the component is in a loading state.
 * - `isLoggedIn`: A boolean indicating if the user is logged in.
 * 
 * The functions are:
 * - `loginWithEmailPassword(jwtToken)`: Logs the user in with a JWT token.
 * - `loginWithGoogle()`: Logs the user in with Google.
 * - `logout()`: Logs the user out.
 * 
 * @param {{children: ReactNode}} props The component props.
 * @returns {JSX.Element} The context provider component.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);         
  const [user, setUser] = useState(null);           
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const loginWithEmailPassword = async (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setToken(null);

    await supabase.auth.signOut();
    setUser(null);
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) console.error('Login error:', error.message)
  }

  const isLoggedIn = !!token || !!user;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoggedIn,
        loading,
        loginWithEmailPassword,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
  