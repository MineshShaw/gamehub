// It imports necessary modules and sets up an Express.js app.
// It creates an HTTP server and attaches the Express.js app to it.
// It sets up a Socket.IO server to handle real-time communication with clients.
// It serves static files from the 'public' directory and sets the root route to serve 'index.html'.
// When a client connects, it logs a message and sets up event listeners for:
// 'search_game': matches the client with another player for a game of the specified type (currently only Tic Tac Toe).
// 'disconnect': logs a message and removes the client from the game queue.
// It starts the server and listens on port 3000.
const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const ticTacToe = require('../client/src/game-logic/tictactoe');
// const chess = require('../src/game-logic/chess'); // later
// const checkers = require('../src/game-logic/checkers'); // later
// const connectFour = require('../src/game-logic/connectFour'); // later
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('search_game', ({ gameType, name }) => {
    socket.playerName = name;

    switch (gameType) {
      case 'tictactoe':
        ticTacToe.matchmake(socket, io);
        break;
      // case 'chess': chess.matchmake(socket, io); break;
      // case 'checkers': checkers.matchmake(socket, io); break;
      // case 'connectFour': connectFour.matchmake(socket, io); break;
      default:
        socket.emit('error_message', 'Unknown game type');
    }
  });

  ticTacToe.setup(io, socket);
  // chess.setup(io, socket); // later
  // checkers.setup(io, socket); // later
  // connectFour.setup(io, socket); // later
  socket.on('disconnect', () => {
    console.log('user disconnected');
    ticTacToe.removeFromQueue(socket);
    // chess.removeFromQueue(socket); // later
    // checkers.removeFromQueue(socket); // later
    // connectFour.removeFromQueue(socket); // later
  });
});

server.listen(3000, () => {
  console.log('Server listening on *:3000');
});
