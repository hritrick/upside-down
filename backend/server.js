import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Team from './models/Team.js';
import { validateAnswer } from './utils/phaseValidation.js';

// Import routes (for future REST endpoints if needed)
import sessionsRouter from './routes/sessions.js';
import leaderboardRouter from './routes/leaderboard.js';
import gamedataRouter from './routes/gamedata.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://panic-grocery-run.vercel.app',
            'https://the-algorithm-hunt.netlify.app',
            process.env.FRONTEND_URL
        ].filter(Boolean),
        methods: ['GET', 'POST'],
        credentials: true
    }
});


const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://panic-grocery-run.vercel.app',
        'https://the-algorithm-hunt.netlify.app',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/sessions', sessionsRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/gamedata', gamedataRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🎮 The Upside Down Protocol API',
        version: '2.0.0',
        endpoints: {
            health: '/api/health',
            socketio: '/socket.io'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ============================================
// SOCKET.IO REAL-TIME EVENT HANDLERS
// ============================================

// Store active timers for each team
const teamTimers = new Map();

io.on('connection', (socket) => {
    console.log(`🔌 Player connected: ${socket.id}`);

    // ========== CREATE TEAM ==========
    socket.on('create_team', async (callback) => {
        try {
            console.log('📝 CREATE TEAM request from:', socket.id);
            const teamCode = await Team.generateTeamCode();
            console.log('🎲 Generated team code:', teamCode);

            const team = new Team({
                teamName: teamCode,
                playerA_socketId: socket.id,
                status: 'waiting'
            });
            await team.save();
            console.log('✅ Team saved:', teamCode);

            socket.join(teamCode);
            console.log(`🎮 Team created: ${teamCode} by ${socket.id}`);

            callback({
                success: true,
                teamCode,
                playerRole: 'A'
            });
        } catch (error) {
            console.error('❌ Error creating team:', error);
            callback({ success: false, error: error.message || 'Failed to create team' });
        }
    });

    // ========== JOIN TEAM ==========
    socket.on('join_team', async ({ teamCode }, callback) => {
        try {
            const team = await Team.findOne({ teamName: teamCode });

            if (!team) {
                return callback({ success: false, error: 'Team not found' });
            }

            if (team.playerB_socketId) {
                return callback({ success: false, error: 'Team is full' });
            }

            team.playerB_socketId = socket.id;
            team.status = 'playing';
            team.startTime = new Date();
            await team.save();

            socket.join(teamCode);
            console.log(`🎮 Player B joined team: ${teamCode}`);

            // Notify both players
            io.to(teamCode).emit('both_players_connected', {
                currentPhase: team.currentPhase,
                timerSeconds: team.timerSeconds
            });

            // Start the timer
            startTeamTimer(teamCode);

            callback({
                success: true,
                teamCode,
                playerRole: 'B'
            });
        } catch (error) {
            console.error('Error joining team:', error);
            callback({ success: false, error: 'Failed to join team' });
        }
    });

    // ========== SUBMIT ANSWER ==========
    socket.on('submit_answer', async ({ teamCode, answer }, callback) => {
        try {
            const team = await Team.findOne({ teamName: teamCode });

            if (!team) {
                return callback({ success: false, error: 'Team not found' });
            }

            const isCorrect = validateAnswer(team.currentPhase, answer);

            if (isCorrect) {
                // Store the answer
                team.phaseAnswers.push(answer);

                // Advance phase
                team.advancePhase();
                await team.save();

                // Notify both players of success
                io.to(teamCode).emit('answer_result', {
                    success: true,
                    currentPhase: team.currentPhase,
                    status: team.status
                });

                // If game completed, stop timer
                if (team.status === 'completed') {
                    stopTeamTimer(teamCode);
                }

                callback({ success: true, correct: true });
            } else {
                // Wrong answer
                io.to(teamCode).emit('answer_result', {
                    success: false,
                    currentPhase: team.currentPhase
                });

                callback({ success: true, correct: false });
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            callback({ success: false, error: 'Failed to submit answer' });
        }
    });

    // ========== DISCONNECT ==========
    socket.on('disconnect', async () => {
        console.log(`🔌 Player disconnected: ${socket.id}`);

        try {
            // Find team with this socket
            const team = await Team.findOne({
                $or: [
                    { playerA_socketId: socket.id },
                    { playerB_socketId: socket.id }
                ]
            });

            if (team) {
                // Notify partner
                io.to(team.teamName).emit('partner_disconnected');

                // Stop timer
                stopTeamTimer(team.teamName);

                // Optionally update team status
                team.status = 'failed';
                await team.save();
            }
        } catch (error) {
            console.error('Error handling disconnect:', error);
        }
    });
});

// ========== TIMER MANAGEMENT ==========
function startTeamTimer(teamCode) {
    const interval = setInterval(async () => {
        try {
            const team = await Team.findOne({ teamName: teamCode });

            if (!team || team.status !== 'playing') {
                clearInterval(interval);
                teamTimers.delete(teamCode);
                return;
            }

            team.timerSeconds -= 1;
            await team.save();

            // Emit timer update
            io.to(teamCode).emit('timer_update', {
                timerSeconds: team.timerSeconds
            });

            // Check if time's up
            if (team.timerSeconds <= 0) {
                team.status = 'failed';
                team.endTime = new Date();
                await team.save();

                io.to(teamCode).emit('time_up');
                clearInterval(interval);
                teamTimers.delete(teamCode);
            }
        } catch (error) {
            console.error('Timer error:', error);
            clearInterval(interval);
            teamTimers.delete(teamCode);
        }
    }, 1000);

    teamTimers.set(teamCode, interval);
}

function stopTeamTimer(teamCode) {
    const interval = teamTimers.get(teamCode);
    if (interval) {
        clearInterval(interval);
        teamTimers.delete(teamCode);
        console.log(`⏱️  Timer stopped for team: ${teamCode}`);
    }
}

// Start server
httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 API: http://localhost:${PORT}`);
    console.log(`🔌 Socket.io ready for connections`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

