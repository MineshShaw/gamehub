import { useState } from "react";
import { BugOff, Menu, X } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";
import { useAuth } from "@/context/AuthContext";

/**
 * The navbar component.
 *
 * This component renders a responsive navbar with links to the most important
 * pages of the application. It also displays a user avatar and a logout button
 * if the user is logged in.
 *
 * @returns {React.ReactElement} The navbar component.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Games", href: "/games" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-cyan-400">
          GameHub
        </Link>

        <div className="hidden md:flex space-x-6 justify-center items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <UserAvatar onLogout={logout} name={user?.identities[0].identity_data.name || "User"} imageUrl={user?.identities[0].identity_data.avatar_url || ""}/>
          ) : (
            <Link href="/auth" className="text-cyan-400">
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-white hover:text-cyan-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <div className="flex flex-col space-y-2">
              <Link href="/profile">Profile</Link>
              <button className="text-left" onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link href="/auth" className="text-cyan-400">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
