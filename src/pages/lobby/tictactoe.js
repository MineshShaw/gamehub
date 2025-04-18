import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

let socket;

export default function TicTacToeLobby() {
  const [name, setName] = useState("");
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    socket = io("http://localhost:3000");

    socket.on("match_found", (data) => {
      console.log("Match found:", data);
      router.push({
        pathname: "/game/tictactoe",
        query: {
          roomId: data.roomId,
          opponent: data.opponent,
          mark: data.mark,
          name,
        },
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [name]);

  const handleSearch = () => {
    if (!name) return;
    setSearching(true);
    socket.emit("search_game", { gameType: "tictactoe", name });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Tic Tac Toe Lobby</h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="px-4 py-2 rounded text-black mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {searching ? "Searching for a player..." : "Search for Game"}
      </button>
    </div>
  );
}
