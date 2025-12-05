import mongoose from 'mongoose';
import dotenv from 'dotenv';
import GameData from '../models/GameData.js';
import connectDB from '../config/db.js';

dotenv.config();

// Phase 1: City Graph Data (Dijkstra's Algorithm)
const cityGraphData = {
    nodes: [
        { id: 0, label: 'Home', x: 100, y: 250 },
        { id: 1, label: 'Park', x: 300, y: 150 },
        { id: 2, label: 'Market', x: 300, y: 350 },
        { id: 3, label: 'Central', x: 500, y: 250 },
        { id: 4, label: 'Downtown', x: 700, y: 250 },
        { id: 5, label: 'Store', x: 900, y: 250 }
    ],
    edges: [
        { from: 0, to: 1, weight: 4 },
        { from: 0, to: 2, weight: 2 },
        { from: 1, to: 3, weight: 5 },
        { from: 2, to: 3, weight: 3 },
        { from: 3, to: 4, weight: 4 },
        { from: 4, to: 5, weight: 3 }
    ],
    start: 0,
    end: 5,
    // Shortest path: [0, 2, 3, 4, 5] with total distance: 12
    shortestPath: [0, 2, 3, 4, 5],
    shortestDistance: 12
};

// Phase 2: Store Tree Data (DFS)
const storeTreeData = {
    nodes: [
        { id: 0, label: 'Entrance', parent: null, x: 400, y: 50 },
        { id: 1, label: 'Aisle A', parent: 0, x: 200, y: 150 },
        { id: 2, label: 'Aisle B', parent: 0, x: 600, y: 150 },
        { id: 3, label: 'Snacks', parent: 1, x: 100, y: 250 },
        { id: 4, label: 'Beverages', parent: 1, x: 300, y: 250 },
        { id: 5, label: 'Toiletries', parent: 2, x: 500, y: 250 },
        { id: 6, label: 'Dry Ration', parent: 2, x: 700, y: 250 } // TARGET
    ],
    targetNode: 6, // Dry Ration
    // DFS path from Entrance to Dry Ration: [0, 2, 6]
    dfsPath: [0, 2, 6]
};

// Phase 3: Product List (Sorting)
const productsData = {
    products: [
        { id: 1, name: 'Hand Sanitizer', category: 'Health', priority: 9 },
        { id: 2, name: 'Toilet Paper', category: 'Essentials', priority: 10 },
        { id: 3, name: 'Rice', category: 'Food', priority: 8 },
        { id: 4, name: 'Pasta', category: 'Food', priority: 7 },
        { id: 5, name: 'Milk', category: 'Dairy', priority: 6 },
        { id: 6, name: 'Bread', category: 'Bakery', priority: 5 },
        { id: 7, name: 'Masks', category: 'Health', priority: 9 },
        { id: 8, name: 'Water Bottles', category: 'Beverages', priority: 10 },
        { id: 9, name: 'Soap', category: 'Health', priority: 8 },
        { id: 10, name: 'Eggs', category: 'Dairy', priority: 7 }
    ],
    // Sorted by priority (descending): TP, Water, Sanitizer, Masks, Rice, Soap, Pasta, Eggs, Milk, Bread
    sortedByPriority: [2, 8, 1, 7, 3, 9, 4, 10, 5, 6]
};

// Phase 4: Shelf Data (Binary Search)
const shelvesData = {
    shelves: [
        { id: 0, item: 'Almonds', price: 45 },
        { id: 1, item: 'Biscuits', price: 20 },
        { id: 2, item: 'Cereal', price: 35 },
        { id: 3, item: 'Dates', price: 60 },
        { id: 4, item: 'Energy Bar', price: 25 },
        { id: 5, item: 'Flour', price: 30 },
        { id: 6, item: 'Granola', price: 40 },
        { id: 7, item: 'Honey', price: 55 },
        { id: 8, item: 'Instant Noodles', price: 15 },
        { id: 9, item: 'Jam', price: 50 },
        { id: 10, item: 'Ketchup', price: 35 },
        { id: 11, item: 'Maggi', price: 12 } // TARGET ITEM
    ],
    targetItem: 'Maggi',
    targetShelfId: 11,
    // Binary search path (checking mid points): 
    // Mid of 0-11 = 5 (Flour), Mid of 6-11 = 8 (Instant Noodles), Mid of 9-11 = 10 (Ketchup), then 11 (Maggi)
    // So checked shelves: [5, 8, 10, 11]
    // Price Key: 30 + 15 + 35 + 12 = concatenated "30153512"
    binarySearchPath: [5, 8, 10, 11],
    correctPriceKey: '30153512'
};

// Seed function
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seed...');

        await connectDB();

        // Clear existing game data
        console.log('🗑️  Clearing existing game data...');
        await GameData.deleteMany({});

        // Insert graph data
        console.log('📊 Seeding city graph...');
        await GameData.create({
            type: 'graph',
            data: cityGraphData,
            description: 'City graph for Phase 1 - Dijkstra\'s Algorithm'
        });

        // Insert tree data
        console.log('🌳 Seeding store tree...');
        await GameData.create({
            type: 'tree',
            data: storeTreeData,
            description: 'Store layout tree for Phase 2 - DFS'
        });

        // Insert products data
        console.log(' Seeding products...');
        await GameData.create({
            type: 'products',
            data: productsData,
            description: 'Product list for Phase 3 - Sorting'
        });

        // Insert shelves data
        console.log('🗄️  Seeding shelves...');
        await GameData.create({
            type: 'shelves',
            data: shelvesData,
            description: 'Shelf data for Phase 4 - Binary Search'
        });

        console.log('✅ Database seeded successfully!');
        console.log('\n Summary:');
        console.log('   - City Graph: 6 nodes, 6 edges');
        console.log('   - Store Tree: 7 nodes');
        console.log('   - Products: 10 items');
        console.log('   - Shelves: 12 shelves');
        console.log(`   - Correct Price Key: ${shelvesData.correctPriceKey}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seed
seedDatabase();
