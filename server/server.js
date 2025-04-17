const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });

let games = [];

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send current games to the new client
  ws.send(JSON.stringify({
    type: 'games-list',
    games,
  }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'game-created') {
      // Create a new game
      const newGame = {
        id: data.game.id,
        name: data.game.name,
        status: 'waiting',
      };

      // Save the game to the games list
      games.push(newGame);

      // Broadcast the game creation to all clients
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({
          type: 'game-created',
          game: newGame,
        }));
      });
    }

    if (data.type === 'game-joined') {
      // Find the game by ID
      const game = games.find((game) => game.id === data.gameId);

      if (game && game.status === 'waiting') {
        // Change the status to 'in-progress' when someone joins
        game.status = 'in-progress';

        // Notify both players (game creator and the new player)
        wss.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: 'game-joined',
            gameId: data.gameId,
            status: 'in-progress',
          }));
        });
      }
    }

    if (data.type === 'move-made') {
      const game = games.find((game) => game.id === data.gameId);
      if (game) {
        // Update the board state (this is where you can add more complex move handling)
        game.board = data.board;
        game.turn = data.turn;

        // Broadcast the move to both players
        wss.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: 'move-made',
            gameId: data.gameId,
            board: data.board,
            turn: data.turn,
          }));
        });
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
