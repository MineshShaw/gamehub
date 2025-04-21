import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";

const games = [
  { name: "Chess", path: "./lobby/chess", image: "/images/chess.jpg" },
  { name: "Checkers", path: "./lobby/checkers", image: "/images/checkers.jpg" },
  {
    name: "Tic Tac Toe",
    path: "./lobby/tictactoe",
    image: "/images/tictactoe.jpg",
  },
  {
    name: "Connect Four",
    path: "./lobby/connect-four",
    image: "/images/connect4.jpg",
  },
];

/**
 * The main dashboard page for the app.
 *
 * This page displays a list of games to play, each with an image and a name.
 * When a game is clicked, the user is redirected to the game's lobby page.
 *
 * @returns {JSX.Element} The dashboard page.
 */
export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-10 text-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          🎮 Choose a game to play:
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game) => (
            <Link key={game.name} href={game.path}>
            <div
              className="w-64 h-40 md:w-72 md:h-44 border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer p-4 flex items-end justify-center bg-cover bg-center text-white relative overflow-hidden"
              style={{ backgroundImage: `url(${game.image})` }}
            >
              <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
              <h2 className="text-lg font-semibold z-10">{game.name}</h2>
            </div>
          </Link>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
