# 🚀 Quick Start Script for Panic Grocery Run

This script will help you get the game running quickly.

## Prerequisites

Before running the game, ensure you have:
- ✅ Node.js 16+ installed (`node --version`)
- ✅ MongoDB installed and running (`mongod --version`)
- ✅ npm or yarn package manager

## Step-by-Step Setup

### 1. Start MongoDB

First, make sure MongoDB is running:

```bash
# On macOS (if installed via Homebrew)
brew services start mongodb-community

# Or manually
mongod
```

MongoDB should be accessible at `mongodb://localhost:27017`

### 2. Setup Backend

Open a terminal and run:

```bash
cd "/Users/hritikpandey/Documents/Code/panic grocery run/backend"

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Seed the database with game data
npm run seed

# Start the backend server
npm run dev
```

✅ Backend should now be running at `http://localhost:5000`

### 3. Setup Frontend

Open a **NEW terminal** (keep backend running) and run:

```bash
cd "/Users/hritikpandey/Documents/Code/panic grocery run/frontend"

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```

✅ Frontend should now be running at `http://localhost:3000`

### 4. Play the Game!

Open your browser to `http://localhost:3000`

## Quick Test

To verify everything is working:

1. **Backend Health Check:** Visit `http://localhost:5000/api/health`
   - Should return: `{"status":"OK",...}`

2. **Frontend:** Visit `http://localhost:3000`
   - Should see the game home page

3. **Database:** Run `npm run seed` in backend
   - Should see: "✅ Database seeded successfully!"

## Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB Connection Error: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running (`brew services start mongodb-community`)

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process using that port or change the PORT in `.env`

### Frontend Can't Connect to Backend
**Solution:** 
- Verify backend is running on port 5000
- Check `frontend/.env` has correct API URL

## Game Controls

1. Enter player names (or leave default)
2. Click "START MISSION"
3. Complete 4 phases:
   - **Phase 1:** Write Dijkstra's algorithm
   - **Phase 2:** Write DFS
   - **Phase 3:** Write Sorting algorithm
   - **Phase 4:** Write Binary Search + click shelves + submit Price Key

## Example Victory Path

For testing, here's the easiest path:

**Phase 4 - Correct Binary Search Shelves:**
Click shelves in this order: 5 → 8 → 10 → 11

**Prices:** 30, 15, 35, 12

**Price Key:** `30153512`

---

**Ready to survive the 2020 panic run? Good luck! **
