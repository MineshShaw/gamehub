import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

/**
 * Renders the Tic Tac Toe game interface, managing the game state and
 * handling user interactions. Connects to a Socket.IO server to facilitate
 * real-time multiplayer gameplay.
 * 
 * The component manages the game board state, the current player's turn,
 * game status, and the winner. It listens for server events to update the
 * board, detect game over conditions, and manage player turns.
 * 
 * The game supports restarting, allowing players to start a new game after
 * a win or draw. The component also manages socket connections, joining the
 * appropriate game room and requesting the current board state.
 */

export default function TicTacToeGame() {
  const router = useRouter();
  const { roomId, opponent, mark, name } = router.query;

  const [board, setBoard] = useState(Array(9).fill(null));
  const [myTurn, setMyTurn] = useState(mark === "X");
  const [gameStatus, setGameStatus] = useState("Waiting for opponent...");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!roomId) return;
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
    });
    socket.emit("join_room", roomId);
    socket.on("board_state", (boardState) => {
      setBoard(boardState);
    });

    socket.emit("get_board_state", roomId);
    socket.on("move_made", ({ index, mark: incomingMark }) => {
      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[index] = incomingMark;
        return newBoard;
      });
      setMyTurn(true);
    });
    socket.on("game_over", ({ winner, index, mark: incomingMark }) => {
        setBoard((prev) => {
            const newBoard = [...prev];
            newBoard[index] = incomingMark;
            return newBoard;
          });
        setWinner(winner);
        if (winner === "draw") {
          setGameStatus("It's a draw!");
        } else {
          const winnerName = winner === mark ? name : opponent;
          setGameStatus(`${winnerName} wins!`);
        }
    });
    
    return () => socket.disconnect();
  }, [roomId]);

  const handleMove = (index) => {
    if (!myTurn || board[index] || winner || !roomId) return;

    const newBoard = [...board];
    newBoard[index] = mark;
    setBoard(newBoard);
    setMyTurn(false);

    socket.emit("make_move", {
      roomId,
      index,
      mark,
    });
  };

  const renderCell = (index) => (
    <button
      key={index}
      className="w-20 h-20 text-3xl border-2 border-white flex items-center justify-center"
      onClick={() => handleMove(index)}
    >
      {board[index]}
    </button>
  );

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setMyTurn(mark === "X");
    setGameStatus("Waiting for opponent...");

    socket.emit("search_game", { gameType: "tictactoe", name });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">Tic Tac Toe</h1>
      <p className="mb-2">
        You are <strong>{mark}</strong>. Opponent: <strong>{opponent}</strong>
      </p>
      <p className="mb-6">{myTurn ? "Your turn" : "Opponent's turn"}</p>

      <div className="grid grid-cols-3 gap-2">
        {board.map((_, i) => renderCell(i))}
      </div>

      {winner && (
        <div className="mt-6">
          <p className="text-xl">{gameStatus}</p>
          <button
            onClick={restartGame}
            className="mt-4 bg-blue-500 p-2 rounded"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}
