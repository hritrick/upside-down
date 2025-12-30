# Panic Grocery Run - Backend

Backend API for the Panic Grocery Run cooperative multiplayer game.

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file:**
Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://admin:<db_password>@hawkinslab.dujlzzt.mongodb.net/?appName=HawkinsLab
NODE_ENV=development
```

3. **Start MongoDB:**
Make sure MongoDB is running on your system.

4. **Seed the database:**
```bash
npm run seed
```

5. **Start development server:**
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health check

### Sessions
- `POST /api/sessions/create` - Create new game session
- `GET /api/sessions/:id` - Get session state
- `PUT /api/sessions/:id/update-timer` - Update timer
- `POST /api/sessions/:id/validate-code` - Validate code submission
- `POST /api/sessions/:id/check-shelf` - Track shelf checking (Phase 4)
- `POST /api/sessions/:id/set-price-key` - Set correct price key
- `POST /api/sessions/:id/validate-key` - Validate final price key

### Leaderboard
- `GET /api/leaderboard` - Get top scores
- `POST /api/leaderboard` - Add leaderboard entry

### Game Data
- `GET /api/gamedata/graph` - Get city graph (Phase 1)
- `GET /api/gamedata/tree` - Get store tree (Phase 2)
- `GET /api/gamedata/products` - Get products (Phase 3)
- `GET /api/gamedata/shelves` - Get shelves (Phase 4)
- `GET /api/gamedata/all` - Get all game data

## Game Data Summary

### Phase 1: City Graph
- 10 nodes (Home to Store)
- 14 weighted edges
- Shortest path: [0, 2, 3, 6, 8, 9]
- Distance: 21

### Phase 2: Store Tree
- 15 nodes (binary tree structure)
- Target: "Dry Ration" (node 12)
- DFS path: [0, 2, 5, 12]

### Phase 3: Products
- 20 products to sort
- Sort by priority (descending)

### Phase 4: Shelves
- 12 shelves (sorted alphabetically)
- Target: "Maggi" (shelf 11)
- Binary search path: [5, 8, 10, 11]
- **Correct Price Key: `30153512`**

## Development

```bash
# Start with auto-reload
npm run dev

# Start production
npm start

# Reseed database
npm run seed
```
