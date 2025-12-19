// server.js - FINAL STABLE VERSION
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Team from './models/Team.js';

dotenv.config();

// 1. App & Server Setup
const app = express();
const server = http.createServer(app);

// 2. CORS & Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

// 3. Database Connection
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Error:', err));

// 4. Socket.io Setup
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// 5. Game Logic & Validation Answers
const ANSWERS = {
    phase1: "0x09 0x17 0x3F 0x8B 0xA1 0xE4",
    phase2: "1",
    phase3: "20",
    phase4: "19"
};

// 6. Hint Data Dictionary
const HINT_DATA = {
    1: [
        "DECIMAL VALUES: 0x09=9, 0xE4=228, 0x17=23, 0x8B=139, 0xA1=161, 0x3F=63", // Full Decimal List
    ],
    2: [
        "Index 2 is blocked. The first collision (Key 42) must move to (2 + 1²) = Index 3."
    ],
    3: [
        "Preorder: Root->Left->Right. Inorder: Left->Root->Right. The Root Node is 50."
    ],
    4: [
        "Total number of nodes - 1 = Number of edges required for MST."
    ]
};


// Phase 4: Fixed Dijkstra Graph Generator
function generatePhase4Puzzle() {
    // FIXED GRAPH - Matches user diagram exactly
    const nodes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const edges = [
        ['a', 'b', 5], ['a', 'c', 3],
        ['b', 'c', 4], ['b', 'd', 6], ['b', 'e', 2],
        ['c', 'd', 5], ['c', 'f', 6],
        ['d', 'e', 6], ['d', 'f', 6],
        ['e', 'f', 3], ['e', 'g', 5],
        ['f', 'g', 4]
    ];

    // Static Mission: Solution is hardcoded to 19 (User Request)
    return {
        nodes,
        edges,
        startNode: 'MST',
        endNode: 'MST',
        solution: 19
    };
}

// 7. Socket Events
io.on('connection', (socket) => {
    console.log(`🔌 Connected: ${socket.id}`);

    // Create Team
    socket.on('create_team', async (playerName) => {
        console.log(`📨 RECEIVED 'create_team' from ${socket.id}`); // Debug Log 4
        console.log(`📋 Player Name: ${playerName}`);

        try {
            const roomCode = Math.floor(1000 + Math.random() * 9000).toString();
            console.log(`🎲 Generated roomCode: ${roomCode}`);

            const phase4Puzzle = generatePhase4Puzzle(); // Generate Static Phase 4

            const newTeam = new Team({
                roomCode,
                teamName: `Team-${roomCode}`,
                playerA: { socketId: socket.id, name: playerName },
                status: 'waiting',
                lockdownUntil: 0,
                phase4State: phase4Puzzle // Save to DB
            });

            await newTeam.save();
            console.log(`💾 Team saved to database`);

            socket.roomCode = roomCode; // Store for disconnect handling
            socket.join(roomCode);
            console.log(`🚪 Socket joined room: ${roomCode}`);

            socket.emit('team_created', { roomCode, role: 'A' });
            console.log(`📤 SENT 'team_created' back to client`); // Debug Log 5
            console.log(`✨ Team ${roomCode} created by ${playerName}`);
        } catch (err) {
            console.error("💥 ERROR inside create_team:", err);
            socket.emit('error', 'Creation failed');
        }
    });


    // Join Team
    socket.on('join_team', async ({ roomCode, playerName }) => {
        console.log(`📥 ATTEMPT JOIN: Room="${roomCode}" (Type: ${typeof roomCode}), Player="${playerName}"`);

        try {
            // FORCE STRING COMPARISON just in case
            const targetCode = String(roomCode).trim();

            const team = await Team.findOne({ roomCode: targetCode });

            // LOG WHAT WE FOUND
            if (!team) {
                console.log(`❌ FAIL: Team with code ${targetCode} NOT FOUND in DB.`);
                return socket.emit('error', 'Team not found');
            }

            console.log(`🔍 FOUND TEAM: ${team.teamName}`);
            console.log(`   Player A: ${team.playerA?.name} (${team.playerA?.socketId})`);
            console.log(`   Player B: ${team.playerB?.name} (${team.playerB?.socketId})`);

            // CHECK IF FULL
            if (team.playerB && team.playerB.socketId) {
                console.log(`❌ FAIL: Team is already full.`);
                return socket.emit('error', 'Room full');
            }

            // SUCCESS LOGIC
            team.playerB = { socketId: socket.id, name: playerName || 'Player B' };
            team.status = 'playing';
            team.startTime = Date.now(); // START TIMER
            await team.save();

            socket.roomCode = targetCode; // Store for disconnect handling

            socket.join(targetCode);
            io.to(targetCode).emit('game_start', { team });
            console.log(`✅ SUCCESS: ${playerName} joined Room ${targetCode}`);

            // START SERVER SIDE TIMER (20 Minutes)
            setTimeout(async () => {
                const checkTeam = await Team.findOne({ roomCode: targetCode });
                if (checkTeam && checkTeam.status === 'playing') {
                    console.log(`⏰ TIME UP for Room ${targetCode}`);
                    checkTeam.status = 'lose';
                    await checkTeam.save();
                    io.to(targetCode).emit('game_over', {
                        result: 'LOSE',
                        totalHints: checkTeam.totalHintsUsed
                    });
                }
            }, 20 * 60 * 1000); // 20 minutes

        } catch (err) {
            console.error("💥 DB ERROR inside join_team:", err);
            socket.emit('error', 'Join failed due to server error');
        }
    });


    // Submit Answer (With 30s Penalty)
    socket.on('submit_answer', async ({ roomCode, answer, phase }) => {
        try {
            const team = await Team.findOne({ roomCode });
            if (!team) return;

            // Check Lockdown
            if (Date.now() < team.lockdownUntil) {
                return socket.emit('error_locked', { timeLeft: Math.ceil((team.lockdownUntil - Date.now()) / 1000) });
            }

            // Check Game Over Timeout (20 Minutes)
            if (team.startTime && (Date.now() - team.startTime > 20 * 60 * 1000)) {
                return socket.emit('game_over', { result: 'LOSE', totalHints: team.totalHintsUsed }); // Timeout Loss
            }

            // Normalize answer (remove commas, extra spaces, ensure uppercase)
            const cleanAnswer = answer.replace(/,/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();

            // Validate Answer
            const expectedAnswer = ANSWERS[`phase${phase}`]?.toUpperCase();
            const correct = expectedAnswer === cleanAnswer;

            if (correct) {
                if (team.currentPhase === 4) {
                    // VICTORY CONDITION
                    team.status = 'win';
                    await team.save();
                    const duration = Math.floor((Date.now() - team.startTime) / 1000); // Seconds
                    io.to(roomCode).emit('game_over', {
                        result: 'WIN',
                        totalHints: team.totalHintsUsed,
                        duration
                    });
                } else {
                    team.currentPhase += 1;
                    await team.save();
                    io.to(roomCode).emit('answer_correct', { nextPhase: team.currentPhase });
                }
            } else {
                team.lockdownUntil = Date.now() + 30000; // 30s penalty
                await team.save();
                io.to(roomCode).emit('answer_incorrect');
            }
        } catch (err) {
            console.error(err);
        }
    });

    // Request Hint (1 Per Phase)
    socket.on('request_hint', async ({ roomCode, currentPhase }) => {
        try {
            const team = await Team.findOne({ roomCode });
            if (!team) return;

            if (!team.phaseHintCounts) team.phaseHintCounts = new Map();

            // STRICT LIMIT: 1 Hint Per Phase
            const phaseStr = String(currentPhase);
            const usedInPhase = team.phaseHintCounts.get(phaseStr) || 0;

            if (usedInPhase >= 1) {
                return socket.emit('error', 'HINT ALREADY USED FOR THIS PHASE');
            }

            // Update Stats
            team.totalHintsUsed = (team.totalHintsUsed || 0) + 1; // Ensure totalHintsUsed is initialized
            team.phaseHintCounts.set(phaseStr, usedInPhase + 1);
            await team.save();

            // Get Hint Text
            const hintsForPhase = HINT_DATA[currentPhase] || ["No Data"];
            // Always give the first hint since there's only 1 allowed now
            const hintText = hintsForPhase[0];

            io.to(roomCode).emit('hint_received', {
                hintText,
                hintsExhausted: true // Disable button immediately
            });
            console.log(`💡 Hint served to ${roomCode} (Phase ${currentPhase})`);

        } catch (err) {
            console.error(err);
        }
    });

    // Swap Roles (One-Time Use)
    socket.on('swap_roles', async ({ roomCode }) => {
        try {
            const team = await Team.findOne({ roomCode });
            if (!team) return socket.emit('error', 'Team not found');

            // Check if already used
            if (team.roleSwapUsed) {
                return socket.emit('error', 'Role swap already used');
            }

            // Perform swap by creating new objects (Mongoose doesn't track reference swaps)
            const tempA = {
                socketId: team.playerA.socketId,
                name: team.playerA.name
            };
            const tempB = {
                socketId: team.playerB.socketId,
                name: team.playerB.name
            };

            team.playerA = tempB;
            team.playerB = tempA;
            team.roleSwapUsed = true;

            await team.save();

            console.log(`🔄 Role swap executed for Room ${roomCode} (One-time use)`);
            console.log(`   New PlayerA: ${team.playerA.name} (${team.playerA.socketId})`);
            console.log(`   New PlayerB: ${team.playerB.name} (${team.playerB.socketId})`);

            io.to(roomCode).emit('game_state_update', team.toObject());
        } catch (err) {
            console.error('Error in swap_roles:', err);
        }
    });

    // Request Game State (Sync)
    socket.on('request_game_state', async (roomCode) => {
        try {
            const team = await Team.findOne({ roomCode });
            if (team) {
                socket.join(roomCode); // Ensure socket is re-joined

                // Check if hints are exhausted for current phase (Limit: 1)
                const phaseStr = String(team.currentPhase);
                const used = team.phaseHintCounts ? (team.phaseHintCounts.get(phaseStr) || 0) : 0;

                socket.emit('game_state_update', {
                    ...team.toObject(),
                    hintsExhausted: used >= 1
                });
                console.log(`🔄 State synced for Room ${roomCode}`);
            }
        } catch (err) {
            console.error("Sync error:", err);
        }
    });

    socket.on('disconnect', async () => {
        console.log(`❌ Disconnected: ${socket.id}`);
        if (socket.roomCode) {
            console.log(`⚠️ Player disconnected from Room ${socket.roomCode}`);
            // Notify the room
            io.to(socket.roomCode).emit('opponent_left');

            // Mark as aborted in DB (Optional best practice)
            try {
                await Team.findOneAndUpdate(
                    { roomCode: socket.roomCode },
                    { status: 'aborted' }
                );
            } catch (err) {
                console.error("Error updating team status on disconnect:", err);
            }
        }
    });
});

// 7. Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
