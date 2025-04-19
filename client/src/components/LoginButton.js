'use client'
import { useAuth } from "../context/AuthContext"

/**
 * A button that signs in the user with Google, using the `useAuth()` hook.
 *
 * @returns A button element with a Google logo and the text "Sign in with Google".
 */
export default function LoginButton() {
  const { loginWithGoogle } = useAuth()

  return (
    <button onClick={loginWithGoogle} className="bg-blue-600 text-white px-4 py-2 rounded flex gap-4 justify-center items-center hover:bg-blue-700 transition duration-200 ease-in-out">
      <img className="w-6 h-6 rounded-full" src="https://icon2.cleanpng.com/20240216/yhs/transparent-google-logo-google-logo-with-colorful-letters-on-black-1710875297222.webp"></img>
      Sign in with Google
    </button>
  )
}
