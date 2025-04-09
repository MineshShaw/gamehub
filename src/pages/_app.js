import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
