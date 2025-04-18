const queue = [];
const gameBoards = {};

function matchmake(socket, io) {
  queue.push(socket);
  console.log(`${socket.playerName} is searching for Tic Tac Toe...`);
  console.log(queue);
  if (queue.length >= 2) {
    const player1 = queue.shift();
    const player2 = queue.shift();

    const roomId = `ttt-${player1.id}-${player2.id}`;
    player1.join(roomId);
    player2.join(roomId);

    player1.emit('match_found', {
      roomId,
      opponent: player2.playerName,
      mark: 'X',
    });

    player2.emit('match_found', {
      roomId,
      opponent: player1.playerName,
      mark: 'O',
    });

    console.log(`Tic Tac Toe Match: ${player1.playerName} vs ${player2.playerName}`);
  }
}

function setup(io, socket) {
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on('make_move', ({ roomId, index, mark }) => {
    // Update board and check win condition
    const winner = checkWinner(roomId, index, mark);
    
    // First, broadcast the move to everyone including the winner announcement
    io.to(roomId).emit('move_made', { index, mark });
    
    if (winner) {
      // Then send the game over event after a slight delay to ensure the move is processed
      setTimeout(() => {
        io.to(roomId).emit('game_over', { winner, index, mark });
      }, 100); 
      resetGame(roomId);  // Reset game for new round
    }
  });

  // Add the get_board_state handler inside setup
  socket.on('get_board_state', (roomId) => {
    socket.emit('board_state', getBoard(roomId));
  });
}

function checkWinner(roomId, index, mark) {
  if (!gameBoards[roomId]) {
    gameBoards[roomId] = Array(9).fill(null);
  }
  gameBoards[roomId][index] = mark;

  const board = gameBoards[roomId];

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6],              // Diagonals
  ];

  // Check if any combination is a winning combination
  for (let combo of winningCombinations) {
    if (combo.every(i => board[i] === mark)) {
      return mark; // Return winner's mark
    }
  }

  // Check if board is full (draw)
  if (board.every(cell => cell !== null)) {
    return 'draw';
  }

  return null;
}

function getBoard(roomId) {
  if (!gameBoards[roomId]) {
    gameBoards[roomId] = Array(9).fill(null);
  }
  return gameBoards[roomId];
}

function resetGame(roomId) {
  // Reset the game board (for next match)
  gameBoards[roomId] = Array(9).fill(null);
}

function removeFromQueue(socket) {
  const index = queue.indexOf(socket);
  if (index !== -1) queue.splice(index, 1);
}

module.exports = {
  matchmake,
  setup,
  removeFromQueue,
};