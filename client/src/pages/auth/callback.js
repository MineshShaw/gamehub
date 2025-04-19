import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabaseClient'

/**
 * Redirects users to /dashboard after signin.
 *
 * This page is a callback route for the authentication flow. It is not
 * intended to be visited directly.
 *
 * @return {JSX.Element} A paragraph letting the user know that they are being
 *     logged in.
 */
export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth change:', event, session)
      if (event === 'SIGNED_IN' && session) {
        router.push('/dashboard')
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  return <p>Logging you in...</p>
}
