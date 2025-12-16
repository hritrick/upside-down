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
    // Phase 1 accepts dynamic answers in the handler below
    phase2: "1",
    phase3: "9",
    phase4: "12"
};

// 6. Hint Data Dictionary
// 6. Hint Data Dictionary (Actionable Solutions)
const HINT_DATA = {
    1: [
        "CHEAT: DECIMAL VALUES: 0x09=9, 0x17=23, 0x3F=63, 0x8B=139, 0xA1=161, 0xE4=228", // Full Decimal List
        "CHEAT: BINARY WEIGHTS: 0x3F(6), 0x8B(4), 0x17(4), 0xE4(3), 0xA1(3), 0x09(2)" // Secondary Help
    ],
    2: [
        "CHEAT: Index 2 is blocked. The first collision (Key 42) must move to (2 + 1²) = Index 3.",
        "CHEAT: Key 32 maps to 2. Index 2 is blocked. Attempt 1 (Index 3) might be taken by 42. Try Attempt 2: (2 + 2²) = Index 6."
    ],
    3: [
        "CHEAT: The Root is 8. The LEFT subtree contains {2, 5, 6}. The RIGHT subtree contains {9, 10, 11}.",
        "CHEAT: Node 10 is in the Right Cluster. Look at the Inorder: 9 is to the left of 10. 9 is the child."
    ],
    4: [
        "CHEAT: Edge A-B is broken. Best starting edge is C-E (Weight 2).",
        "CHEAT: Avoid cycle A-C-E. Connect B-E (Weight 3) next."
    ]
};


// 6. Socket Events
io.on('connection', (socket) => {
    console.log(`🔌 Connected: ${socket.id}`);

    // Create Team
    socket.on('create_team', async (playerName) => {
        console.log(`📨 RECEIVED 'create_team' from ${socket.id}`); // Debug Log 4
        console.log(`📋 Player Name: ${playerName}`);

        try {
            const roomCode = Math.floor(1000 + Math.random() * 9000).toString();
            console.log(`🎲 Generated roomCode: ${roomCode}`);

            const newTeam = new Team({
                roomCode,
                teamName: `Team-${roomCode}`,
                playerA: { socketId: socket.id, name: playerName },
                status: 'waiting',
                lockdownUntil: 0
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

            // START SERVER SIDE TIMER (12 Minutes)
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
            }, 12 * 60 * 1000);

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

            // Check Game Over Timeout (12 Minutes)
            if (team.startTime && (Date.now() - team.startTime > 12 * 60 * 1000)) {
                return socket.emit('game_over', { result: 'LOSE', totalHints: team.totalHintsUsed }); // Timeout Loss
            }

            // Normalize answer (remove commas, extra spaces, ensure uppercase)
            const cleanAnswer = answer.replace(/,/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();

            // Validate based on Phase
            let correct = false;

            if (phase === 1) {
                // Phase 1: Hex Sorting (Accepts both Hamming Descending AND Numeric Ascending)
                // Codes: 0x3F(63, w6), 0xA1(161, w3), 0x09(9, w2), 0xE4(228, w3), 0x8B(139, w4), 0x17(23, w4)

                // Option A: Rule 1 - Hamming Weight Descending
                // Weights: 6 -> 4,4 -> 3,3 -> 2
                // Permutations due to ties (8B/17 for w4, E4/A1 for w3)
                const h1 = "0X3F 0X8B 0X17 0XE4 0XA1 0X09";
                const h2 = "0X3F 0X8B 0X17 0XA1 0XE4 0X09";
                const h3 = "0X3F 0X17 0X8B 0XE4 0XA1 0X09";
                const h4 = "0X3F 0X17 0X8B 0XA1 0XE4 0X09";

                // Option B: Rule 2 - Numeric Ascending (9 -> 23 -> 63 -> 139 -> 161 -> 228)
                const numeric = "0X09 0X17 0X3F 0X8B 0XA1 0XE4";

                correct = [h1, h2, h3, h4, numeric].includes(cleanAnswer);
            } else {
                // Phases 2, 3, 4: Simple String Match
                correct = ANSWERS[`phase${phase}`] === cleanAnswer.replace(/^0+/, ''); // basic trimming
            }

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

    // Request Hint (Neural Budget System)
    // Request Hint (Strict 1 Per Phase, No Cost)
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

    // Request Game State (Sync)
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
