import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import GameSession from '../models/GameSession.js';
import Leaderboard from '../models/Leaderboard.js';
import { validateCode } from '../utils/validators.js';

const router = express.Router();

// POST /api/sessions/create - Create a new game session
router.post('/create', async (req, res) => {
    try {
        const { player1 } = req.body;

        const sessionId = uuidv4();

        const session = new GameSession({
            sessionId,
            players: {
                player1: player1 || 'Solo Player',
                player2: null
            }
        });

        await session.save();

        res.status(201).json({
            success: true,
            sessionId,
            message: 'Game session created successfully',
            session: {
                sessionId: session.sessionId,
                players: session.players,
                currentPhase: session.currentPhase,
                timerSeconds: session.timerSeconds
            }
        });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create game session',
            message: error.message
        });
    }
});

// GET /api/sessions/:id - Get session state
router.get('/:id', async (req, res) => {
    try {
        const session = await GameSession.findOne({ sessionId: req.params.id });

        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Session not found'
            });
        }

        res.json({
            success: true,
            session
        });
    } catch (error) {
        console.error('Error fetching session:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch session'
        });
    }
});

// PUT /api/sessions/:id/update-timer - Update timer
router.put('/:id/update-timer', async (req, res) => {
    try {
        const { timerSeconds } = req.body;

        const session = await GameSession.findOne({ sessionId: req.params.id });

        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Session not found'
            });
        }

        session.timerSeconds = timerSeconds;
        await session.save();

        res.json({
            success: true,
            timerSeconds: session.timerSeconds
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update timer'
        });
    }
});

// POST /api/sessions/:id/validate-code - Validate code submission
router.post('/:id/validate-code', async (req, res) => {
    try {
        const { code, language, phase } = req.body;

        const session = await GameSession.findOne({ sessionId: req.params.id });

        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Session not found'
            });
        }

        // Validate the code
        const validation = validateCode(code, phase, language);

        if (validation.valid) {
            // Store the code submission
            session.phaseSubmissions[`phase${phase}Code`] = code;
            session.completePhase(phase);
            await session.save();
        }

        res.json({
            success: true,
            validation,
            nextPhase: validation.valid ? session.currentPhase : phase
        });
    } catch (error) {
        console.error('Error validating code:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to validate code',
            message: error.message
        });
    }
});

// POST /api/sessions/:id/check-shelf - Track shelf checking in Phase 4
router.post('/:id/check-shelf', async (req, res) => {
    try {
        const { shelfId } = req.body;

        const session = await GameSession.findOne({ sessionId: req.params.id });

        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Session not found'
            });
        }

        session.addCheckedShelf(shelfId);
        await session.save();

        res.json({
            success: true,
            checkedShelves: session.checkedShelves
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to check shelf'
        });
    }
});

// POST /api/sessions/:id/set-price-key - Set the correct price key
router.post('/:id/set-price-key', async (req, res) => {
    try {
        const { priceKey } = req.body;

        const session = await GameSession.findOne({ sessionId: req.params.id });

        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Session not found'
            });
        }

        session.correctPriceKey = priceKey;
        await session.save();

        res.json({
            success: true,
            message: 'Price key set successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to set price key'
        });
    }
});

// POST /api/sessions/:id/validate-key - Validate final price key
router.post('/:id/validate-key', async (req, res) => {
    try {
        const { priceKey } = req.body;

        const session = await GameSession.findOne({ sessionId: req.params.id });

        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Session not found'
            });
        }

        const isValid = session.validatePriceKey(priceKey);
        await session.save();

        if (isValid) {
            // Add to leaderboard
            const leaderboardEntry = new Leaderboard({
                playerNames: session.players.player1,
                completionTime: session.completionTime,
                attempts: session.priceKeyAttempts,
                sessionId: session.sessionId
            });

            await leaderboardEntry.save();
        }

        res.json({
            success: true,
            valid: isValid,
            attempts: session.priceKeyAttempts,
            completionTime: session.completionTime,
            message: isValid
                ? '🎉 Victory! Correct price key!'
                : `❌ Incorrect price key (Attempt ${session.priceKeyAttempts})`
        });
    } catch (error) {
        console.error('Error validating price key:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to validate price key'
        });
    }
});

export default router;
