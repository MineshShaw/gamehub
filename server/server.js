const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const ticTacToe = require('../src/game-logic/tictactoe');
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

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
