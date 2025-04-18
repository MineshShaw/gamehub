# 🕹️ Game Hub

Game Hub is a real-time multiplayer gaming platform built with **Next.js**, **Tailwind CSS**, and **Socket.IO**. The goal is to provide an expandable hub for classic board games with real-time multiplayer support.

✅ Currently Available Game: **Tic Tac Toe**



## ⚙️ Tech Stack

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Socket.IO server (`/server/server.js`)
- **Styling:** Tailwind CSS (`/styles/globals.css`)



## 🧱 Project Structure

```
gamehub/
    ├─ server/
    │   └─ server/js                          # socket.io server
    │
    ├─ src/
    │   ├─ components/
    │   │   ├─ ui                             # shadcn ui elements
    │   │   │
    │   │   ├─ Login.js                       # Login Component
    │   │   ├─ LoginButton.js                 # Login Using Google Button
    │   │   ├─ Navbar.js                      # Navbar
    │   │   ├─ ProtectedRoute.js              # Redirects unauthenticated users to the login page
    │   │   ├─ SignUp.js                      # Signup component
    │   │   └─ UserAvatar.js                  # User Avatar Component
    │   │
    │   ├─ context/
    │   │   └─ AuthContext.js                 # Provides authentication state and functions
    │   │
    │   ├─ game-logic/
    │   │   └─ tictactoe.js                   # Stores game logic
    │   │
    │   ├─ lib/
    │   │   └─ supabaseClient.js              # Initializes and exports a configured Supabase client
    │   │
    │   ├─ pages/
    │   │   ├─ api/
    │   │   │   ├─ login.js                   # Authenticates a user by verifying email and password
    │   │   │   └─ signup.js                  # Registers a new user
    │   │   │
    │   │   ├─ auth/
    │   │   │   ├─ callback.js                # Redirects users to /dashboard after signin
    │   │   │   └─ index.js                   # Holds login and sign up components
    │   │   │
    │   │   ├─ game/
    │   │   │   └─ tictactoe.js               # Renders the Tic Tac Toe game interface
    │   │   │
    │   │   ├─ lobby/
    │   │   │   └─ tictactoe.js               # Renders the Tic Tac Toe lobby and redirects when a game is ready
    │   │   │
    │   ├─ _app.js                            # Page Layout
    │   ├─ dashboard.js                       # Displays a game selection dashboard
    │   ├─ index.js                           # Landing Page
    │   └─ styles/
    │       └─ global.css                     # Contains global styles
    │
    ├─ .env.local
    ├─ .gitignore
    ├─ components.json
    ├─ eslint.config.mjs
    ├─ jsconfig.json
    ├─ nextjs.config.mjs
    ├─ package-lock.json
    ├─ package.json
    ├─ postcss.config.js
    ├─ README.md
    └─ tailwind.config.js
```

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/game-hub.git
cd game-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. UI Components Setup (shadcn/ui)

If you're cloning this repo for the first time, run the following to install the ShadCN components:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add avatar dropdown-menu
```

### 4. Start the Socket.IO Server
> The server is required for real-time gameplay. It's **not hosted**, so you'll need to start it manually.

```bash
node server/server.js
```

### 5. Start the Next.js Frontend
```bash
npm run dev
```

Visit: `http://localhost:3001`



## 🎮 Available Game

- ✅ **Tic Tac Toe**
  - Multiplayer via Socket.IO
  - Simple and clean UI
  - Room-based setup via lobby



## 🌟 Planned Features

- Add more games (Chess, Checkers, Connect Four).
- Improve UI with animations and game feedback.
- Enhance game logic with better validation and edge case handling.
- Add matchmaking, rooms, and user tracking.
- Host the backend server for public access.



## ⚠️ Notes

- The Socket.IO server (`/server/server.js`) must be running locally for multiplayer features to work.
- This project is a **work in progress**, and contributions/feedback are welcome!