import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
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

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          🎮 Choose a game to play:
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game) => (
            <Link key={game.name} href={game.path}>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer p-4 flex flex-col items-center">
                <div className="relative w-full h-36 mb-4">
                  <Image
                    src={game.image}
                    alt={game.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-700">
                  {game.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
