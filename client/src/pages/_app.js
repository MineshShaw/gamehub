import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';
import '@/styles/globals.css';

/**
 * The root App component.
 *
 * This component wraps every page with the AuthProvider context and the Navbar
 * component.
 *
 * @param {Object} Component - The current page component.
 * @param {Object} pageProps - The props passed to the current page component.
 * @returns {React.ReactElement} The App component.
 */
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
