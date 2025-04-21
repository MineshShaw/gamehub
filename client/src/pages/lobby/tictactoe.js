import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

let socket;

/**
 * A Next.js page component that renders a simple lobby for a Tic Tac Toe game.
 *
 * It renders a form with an input for the user to enter their name and a button
 * to search for a game. When the button is clicked, it emits a "search_game"
 * event to the server with the user's name, and waits for the server to emit a
 * "match_found" event back. When the "match_found" event is received, it
 * redirects the user to the Tic Tac Toe game page with the match details as
 * query parameters.
 */
export default function TicTacToeLobby() {
  const [name, setName] = useState("");
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
    });

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe Lobby</h1>

      {/* Input and Search Button */}
      <div className="w-full max-w-md flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter your name"
          className="px-4 py-2 rounded text-black mb-4 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          {searching ? "Searching for a player..." : "Search for Game"}
        </button>
      </div>

      <div className="my-8 w-full max-w-2xl border-t border-gray-700"></div>

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">🎮 How to Play</h2>
        {<ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Enter your name and click &quot;Search for Game&quot;.</li>
          <li>You&apos;ll be matched with another player in real-time.</li>
          <li>The game starts automatically when a match is found.</li>
          <li>Take turns placing your X or O on the grid.</li>
          <li>The first player to get 3 in a row wins!</li>
        </ul>}
      </div>

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">📜 Game Rules</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>Each player takes turns placing their mark (X or O).</li>
          <li>The grid is 3x3. No overlapping moves allowed.</li>
          <li>If all spots are filled with no winner, it’s a draw.</li>
          <li>No time limits per move.</li>
          <li>Be respectful — no rage quitting! 😄</li>
        </ul>
      </div>
    </div>
  );
}
