import Team from '../models/Team.js';
import { ANSWERS, HINT_DATA, generatePhase4Puzzle } from '../utils/gameLogic.js';

export default function registerSocketHandlers(io, socket) {
    console.log(`🔌 Connected: ${socket.id}`);

    // Create Team
    socket.on('create_team', async (playerName) => {
        try {
            const roomCode = Math.floor(1000 + Math.random() * 9000).toString();

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

            socket.roomCode = roomCode; // Store for disconnect handling
            socket.join(roomCode);

            socket.emit('team_created', { roomCode, role: 'A' });
        } catch (err) {
            console.error("💥 ERROR inside create_team:", err);
            socket.emit('error', 'Creation failed');
        }
    });


    // Join Team
    socket.on('join_team', async ({ roomCode, playerName }) => {
        try {
            // FORCE STRING COMPARISON just in case
            const targetCode = String(roomCode).trim();

            const team = await Team.findOne({ roomCode: targetCode });

            if (!team) {
                return socket.emit('error', 'Team not found');
            }

            // CHECK IF FULL
            if (team.playerB && team.playerB.socketId) {
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

            // START SERVER SIDE TIMER (20 Minutes)
            setTimeout(async () => {
                const checkTeam = await Team.findOne({ roomCode: targetCode });
                if (checkTeam && checkTeam.status === 'playing') {
                    checkTeam.status = 'lose';
                    await checkTeam.save();
                    io.to(targetCode).emit('game_over', {
                        result: 'LOSE',
                        totalHints: checkTeam.totalHintsUsed,
                        totalPoints: checkTeam.totalPoints || 0
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
                return socket.emit('game_over', {
                    result: 'LOSE',
                    totalHints: team.totalHintsUsed,
                    totalPoints: team.totalPoints || 0
                }); // Timeout Loss
            }

            // Normalize answer (remove commas, extra spaces, ensure uppercase)
            const cleanAnswer = answer.replace(/,/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();

            // Validate Answer
            const expectedAnswer = ANSWERS[`phase${phase}`]?.toUpperCase();
            const correct = expectedAnswer === cleanAnswer;

            if (correct) {
                // Award +5 points for completing a phase
                team.totalPoints = (team.totalPoints || 0) + 5;

                if (team.currentPhase === 4) {
                    // VICTORY CONDITION
                    team.status = 'win';
                    await team.save();
                    const duration = Math.floor((Date.now() - team.startTime) / 1000); // Seconds
                    io.to(roomCode).emit('game_over', {
                        result: 'WIN',
                        totalHints: team.totalHintsUsed,
                        totalPoints: team.totalPoints,
                        duration
                    });
                } else {
                    team.currentPhase += 1;
                    await team.save();
                    io.to(roomCode).emit('answer_correct', {
                        nextPhase: team.currentPhase,
                        totalPoints: team.totalPoints
                    });
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

            // Deduct -2 points for using a hint
            team.totalPoints = (team.totalPoints || 0) - 2;

            await team.save();

            // Get Hint Text
            const hintsForPhase = HINT_DATA[currentPhase] || ["No Data"];
            // Always give the first hint since there's only 1 allowed now
            const hintText = hintsForPhase[0];

            io.to(roomCode).emit('hint_received', {
                hintText,
                hintsExhausted: true, // Disable button immediately
                totalPoints: team.totalPoints
            });

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

            // Deduct -3 points for swapping roles
            team.totalPoints = (team.totalPoints || 0) - 3;

            await team.save();


            io.to(roomCode).emit('game_state_update', {
                ...team.toObject(),
                totalPoints: team.totalPoints
            });
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
            }
        } catch (err) {
            console.error("Sync error:", err);
        }
    });

    socket.on('disconnect', async () => {
        if (socket.roomCode) {
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
}
