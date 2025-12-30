// server.js - FINAL STABLE VERSION
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Team imported in socketHandlers


dotenv.config();
console.log('🔄 Starting Server...');

// 1. App & Server Setup
const app = express();
const server = http.createServer(app);

// 2. CORS & Middleware
const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://the-upside-down.vercel.app",
    process.env.FRONTEND_URL, // Production frontend URL
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

// 3. Database Connection
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!MONGODB_URI) {
    console.error('❌ CRITICAL ERROR: MONGODB_URI environment variable is not set!');
    console.error('Please set MONGODB_URI in your environment variables.');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err);
        console.error('Connection String:', MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials in logs
        process.exit(1);
    });

// 4. Socket.io Setup
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// 5. Game Logic extracted to utils/gameLogic.js and used in socketHandlers


// 7. Socket Events
import registerSocketHandlers from './socket/socketHandlers.js';

io.on('connection', (socket) => {
    registerSocketHandlers(io, socket);
});

// 7. Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
