const queue = [];
const gameBoards = {};

/**
 * Matchmakes two players in the queue for a game of Tic Tac Toe
 * @param {Socket} socket The socket of the player to matchmake
 * @param {SocketIO.Server} io The Socket.IO server
 */
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

/**
 * Sets up a socket to listen for join_room and make_move events
 * and respond accordingly. The join_room event makes the socket
 * join a room with the given id. The make_move event makes a move
 * at the given index in the given room and checks for a winner.
 * If there is a winner, it broadcasts the winner to the room
 * and resets the game board.
 * @param {SocketIO.Server} io The Socket.IO server
 * @param {Socket} socket The socket to set up
 */
function setup(io, socket) {
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on('make_move', ({ roomId, index, mark }) => {
    const winner = checkWinner(roomId, index, mark);
    io.to(roomId).emit('move_made', { index, mark });
    
    if (winner) {
      setTimeout(() => {
        io.to(roomId).emit('game_over', { winner, index, mark });
      }, 100); 
      resetGame(roomId);
    }
  });
  socket.on('get_board_state', (roomId) => {
    socket.emit('board_state', getBoard(roomId));
  });
}

/**
 * Checks if there is a winner in the given Tic Tac Toe game.
 * @param {string} roomId The room ID of the game
 * @param {number} index The index of the most recent move
 * @param {string} mark The mark of the player who made the move
 * @returns {string|null} The mark of the winner if there is one,
 *   'draw' if the board is full, or null if the game is not over
 */
function checkWinner(roomId, index, mark) {
  if (!gameBoards[roomId]) {
    gameBoards[roomId] = Array(9).fill(null);
  }
  gameBoards[roomId][index] = mark;

  const board = gameBoards[roomId];

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6],             
  ];

  for (let combo of winningCombinations) {
    if (combo.every(i => board[i] === mark)) {
      return mark;
    }
  }
  if (board.every(cell => cell !== null)) {
    return 'draw';
  }

  return null;
}

/**
 * Gets the game board for the given room ID. If the board does not
 * exist, it creates a new one and returns it.
 * @param {string} roomId The room ID of the game
 * @returns {Array.<null|string>} The game board as a 9-element array
 */
function getBoard(roomId) {
  if (!gameBoards[roomId]) {
    gameBoards[roomId] = Array(9).fill(null);
  }
  return gameBoards[roomId];
}

/**
 * Resets the game board for the given room ID to its initial state.
 * @param {string} roomId The room ID of the game
 */
function resetGame(roomId) {
  // Reset the game board (for next match)
  gameBoards[roomId] = Array(9).fill(null);
}

/**
 * Removes the given socket from the queue.
 * @param {Socket} socket The socket to remove from the queue
 */
function removeFromQueue(socket) {
  const index = queue.indexOf(socket);
  if (index !== -1) queue.splice(index, 1);
}

module.exports = {
  matchmake,
  setup,
  removeFromQueue,
};