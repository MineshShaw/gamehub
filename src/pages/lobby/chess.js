// pages/lobby/chess.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ChessLobby() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState('');
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // WebSocket connection and game state handling
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:4000');
    setSocket(newSocket);
  
    newSocket.onopen = () => {
      console.log('WebSocket Connected');
    };
  
    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
  
      if (message.type === 'game-created') {
        setGames((prevGames) => [...prevGames, message.game]);
      }
  
      if (message.type === 'games-list') {
        setGames(message.games);  // Initial game list when the client first connects
      }
  
      // Other message types (game-joined, move-made, etc.)
    };
  
    return () => {
      newSocket.close();
    };
  }, []);
  

  const createGame = () => {
    if (!newGame.trim()) return;

    const game = {
      id: Date.now(),
      name: newGame,
      status: 'waiting',
    };

    socket.send(
      JSON.stringify({
        type: 'game-created',
        game,
      })
    );

    setNewGame('');
  };

  const joinGame = (gameId) => {
    socket.send(
      JSON.stringify({
        type: 'game-joined',
        gameId,
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Chess Lobby</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Create Game Section */}
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Create a New Game</h2>
        <input
          type="text"
          value={newGame}
          onChange={(e) => setNewGame(e.target.value)}
          placeholder="Game Name"
          className="p-2 border rounded-md"
        />
        <button
          onClick={createGame}
          className="px-6 py-2 bg-blue-500 text-white rounded-md ml-2"
        >
          Create Game
        </button>
      </div>

      {/* Available Games Section */}
      <div className="w-full max-w-md">
        <h2 className="text-2xl mb-4">Available Games</h2>
        {games.length === 0 ? (
          <p className="text-center">No games available. Create one!</p>
        ) : (
          <ul className="space-y-4">
            {games.map((game) => (
              <li
                key={game.id}
                className="flex justify-between items-center bg-white shadow-md p-4 rounded-md"
              >
                <span>{game.name}</span>
                {game.status === 'waiting' ? (
                  <button
                    onClick={() => joinGame(game.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Join
                  </button>
                ) : (
                  <span className="text-gray-500">In Progress</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
