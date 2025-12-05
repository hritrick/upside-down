import express from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = express.Router();

// GET /api/leaderboard - Get top scores
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const leaderboard = await Leaderboard.getTopScores(limit);

        res.json({
            success: true,
            count: leaderboard.length,
            leaderboard
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch leaderboard'
        });
    }
});

// POST /api/leaderboard - Manually add entry (for testing)
router.post('/', async (req, res) => {
    try {
        const { playerNames, completionTime, attempts, sessionId } = req.body;

        const entry = new Leaderboard({
            playerNames,
            completionTime,
            attempts,
            sessionId
        });

        await entry.save();

        res.status(201).json({
            success: true,
            entry
        });
    } catch (error) {
        console.error('Error creating leaderboard entry:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create leaderboard entry'
        });
    }
});

export default router;
