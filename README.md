#  PANIC GROCERY RUN

A cooperative multiplayer browser game simulating the chaotic March 2020 lockdown grocery run. Built with the MERN stack.

## 🎮 Game Overview

**Players:** 2 (Local Hotseat/Multiplayer)  
**Time Limit:** 20:00 minutes  
**Objective:** Complete 4 algorithm challenges and submit the correct Price Key

### The 4 Phases

1. **The Race Against Time** - Find shortest route using Dijkstra's Algorithm (Neon GPS Radar theme)
2. **The Maze** - Navigate store layout to find Dry Rations using DFS (Blueprint Thermal theme)
3. **The Chaos** - Sort panic-buying products using Merge/Quick Sort (Glitch Reality theme)
4. **The Hunt for Maggi** - Find target item using Binary Search, collect Price Key (Vault Scanner theme)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- MongoDB installed and running locally

### Installation

1. **Clone the repository**
```bash
cd "/Users/hritikpandey/Documents/Code/panic grocery run"
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed (default: mongodb://localhost:27017/panic-grocery-run)
npm run seed
npm run dev
```

Backend will run on `http://localhost:5000`

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

4. **Open your browser** to `http://localhost:3000`

## 🎨 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling with custom cyberpunk theme
- **Framer Motion** - High-end animations
- **Monaco Editor** - Code editor (VS Code's editor)
- **React Router** - Routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 🎯 Game Features

### Visual Themes
- **Deep Void Black** (#0a0a0a) - Background
- **Terminal Green** (#00ff41) - Primary UI
- **Panic Red** (#ff0055) - Alerts
- **Cyber Blue** (#00ccff) - Secondary UI
- **Space Mono** - Retro terminal font

### Phase-Specific Visuals
1. **Phase 1:** SVG graph with pulsing nodes, animated path tracing
2. **Phase 2:** Blueprint-style tree with golden path reveals
3. **Phase 3:** Glitch effects on unsorted products, snap-lock sorting animation
4. **Phase 4:** Interactive vault scanner shelves with scanning animations

### Code Validation
- Multi-language support: Python, C, C++, Java, JavaScript
- Heuristic regex-based validation
- Instant client-side feedback
- Backend verification

## 📁 Project Structure

```
panic grocery run/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Code validators
│   ├── seed/            # Database seeding
│   └── server.js        # Express entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   │   ├── HUD/     # Sticky header
    │   │   ├── CodeEditor/
    │   │   └── Phases/  # Phase 1-4 components
    │   ├── context/     # Game state management
    │   ├── pages/       # Route pages
    │   ├── utils/       # API & validators
    │   └── main.jsx     # React entry point
    ├── index.html
    └── tailwind.config.js
```

## 🎲 Gameplay

1. **Start Game**: Enter player names and click "START MISSION"
2. **Phase 1-3**: Write algorithm code, submit for validation
3. **Phase 4**: 
   - Write binary search code
   - Click shelves to scan and collect prices
   - Submit concatenated Price Key
4. **Victory**: Correct Price Key triggers victory screen

### Example Price Key
If you check shelves [5, 8, 10, 11] with prices [30, 15, 35, 12]:  
**Price Key = "30153512"**

## 🔧 Development

### Backend Commands
```bash
npm run dev      # Start with nodemon
npm start        # Start production
npm run seed     # Reseed database
```

### Frontend Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🧪 API Endpoints

### Sessions
- `POST /api/sessions/create` - Create game session
- `GET /api/sessions/:id` - Get session state
- `POST /api/sessions/:id/validate-code` - Validate code
- `POST /api/sessions/:id/validate-key` - Validate price key

### Game Data
- `GET /api/gamedata/graph` - City graph (Phase 1)
- `GET /api/gamedata/tree` - Store tree (Phase 2)
- `GET /api/gamedata/products` - Products (Phase 3)
- `GET /api/gamedata/shelves` - Shelves (Phase 4)

### Leaderboard
- `GET /api/leaderboard` - Get top 10 scores

## 🏆 Victory Conditions

- All 4 phases completed
- Correct Price Key submitted
- Within 10-minute time limit

## 🎓 Educational Value

This game teaches:
- **Dijkstra's Algorithm** - Shortest path finding
- **Depth-First Search** - Tree traversal
- **Sorting Algorithms** - Merge Sort / Quick Sort
- **Binary Search** - Efficient searching

Perfect for:
- Algorithm learning
- Coding interviews prep
- Cooperative problem-solving

## 📝 License

MIT

## 👥 Credits

Built for the Lockdown Survivors of 2020 🧻

---

**May your algorithms be efficient and your toilet paper plentiful!** 🎯
