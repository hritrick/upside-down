import express from 'express';
import GameData from '../models/GameData.js';

const router = express.Router();

// GET /api/gamedata/graph - Get city graph for Phase 1
router.get('/graph', async (req, res) => {
    try {
        const result = await GameData.getGraph();

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Graph data not found'
            });
        }

        res.json({
            success: true,
            data: result.data
        });
    } catch (error) {
        console.error('Error fetching graph:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch graph data'
        });
    }
});

// GET /api/gamedata/tree - Get store tree for Phase 2
router.get('/tree', async (req, res) => {
    try {
        const result = await GameData.getTree();

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Tree data not found'
            });
        }

        res.json({
            success: true,
            data: result.data
        });
    } catch (error) {
        console.error('Error fetching tree:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch tree data'
        });
    }
});

// GET /api/gamedata/products - Get product list for Phase 3
router.get('/products', async (req, res) => {
    try {
        const result = await GameData.getProducts();

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Products data not found'
            });
        }

        res.json({
            success: true,
            data: result.data
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch products data'
        });
    }
});

// GET /api/gamedata/shelves - Get shelf data for Phase 4
router.get('/shelves', async (req, res) => {
    try {
        const result = await GameData.getShelves();

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Shelves data not found'
            });
        }

        res.json({
            success: true,
            data: result.data
        });
    } catch (error) {
        console.error('Error fetching shelves:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch shelves data'
        });
    }
});

// GET /api/gamedata/all - Get all game data (for development)
router.get('/all', async (req, res) => {
    try {
        const allData = await GameData.find().select('-__v');

        res.json({
            success: true,
            data: allData
        });
    } catch (error) {
        console.error('Error fetching all game data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch game data'
        });
    }
});

export default router;
