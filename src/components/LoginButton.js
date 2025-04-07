'use client'
import { supabase } from '@/lib/supabaseClient'

export default function LoginButton() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) console.error('Login error:', error.message)
  }

  return (
    <button onClick={loginWithGoogle} className="bg-blue-600 text-white px-4 py-2 rounded">
      Sign in with Google
    </button>
  )
}
