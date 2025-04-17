// pages/game/chess.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const initialBoard = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
];

export default function ChessGame() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState('white');
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id: gameId } = router.query;

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:4000');
    setSocket(newSocket);
  
    newSocket.onopen = () => {
      console.log('WebSocket Connected');
      newSocket.send(JSON.stringify({ type: 'join-game', gameId }));
    };
  
    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
  
      if (message.type === 'move-made') {
        setBoard(message.board);
        setTurn(message.turn);
      }
  
      if (message.type === 'game-joined') {
        // Redirect the player to the game page or update game state
      }
  
      // Other message types (e.g., error, game-created)
    };
  
    return () => {
      newSocket.close();
    };
  }, [gameId]);
  


  const handleCellClick = (rowIndex, colIndex) => {
    if (selectedPiece) {
      const [fromRow, fromCol] = selectedPiece;
      if (isValidMove(fromRow, fromCol, rowIndex, colIndex)) {
        makeMove(fromRow, fromCol, rowIndex, colIndex);
      }
      setSelectedPiece(null);
    } else {
      setSelectedPiece([rowIndex, colIndex]);
    }
  };

  const makeMove = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = [...board];
    const piece = newBoard[fromRow][fromCol];
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = null;

    socket.send(
      JSON.stringify({
        type: 'move-made',
        gameId,
        board: newBoard,
        turn: turn === 'white' ? 'black' : 'white',
      })
    );

    setBoard(newBoard);
    setTurn(turn === 'white' ? 'black' : 'white');
  };

  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    const piece = board[fromRow][fromCol];
    // Basic validation (extend with actual rules later)
    return true; // Placeholder
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Chess Game</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-6">Turn: {turn}</div>

      <div className="grid grid-cols-8 gap-1">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-12 h-12 border flex items-center justify-center cursor-pointer 
                ${selectedPiece && selectedPiece[0] === rowIndex && selectedPiece[1] === colIndex 
                  ? 'bg-blue-300' 
                  : 'bg-white'}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {piece}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
