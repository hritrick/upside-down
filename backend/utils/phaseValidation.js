/**
 * Phase Validation Logic for The Upside Down Protocol - HARD MODE
 * Requires advanced CS algorithms: bit manipulation, rotated arrays, graph cycles, max flow
 */

/**
 * Phase 1: The Russian Code (Hamming Weight Sorting)
 * Hex values must be sorted by number of 1-bits (Hamming weight)
 * Expected answers vary based on which rule is active:
 * - Rule 1 (Hamming desc): "0xFF, 0x7E, 0xB2, 0x33, 0x1A, 0x0C"
 * - Rule 2 (Hex value asc): "0x0C, 0x1A, 0x33, 0x7E, 0xB2, 0xFF"
 */
export function validatePhase1(answer) {
    // Normalize: remove spaces, keep case-insensitive comparison for hex digits
    const normalized = answer.toUpperCase().replace(/\s+/g, '');

    // Accept both possible rule answers (both cases for 'x')
    const rule1Answers = [
        '0xFF,0x7E,0xB2,0x33,0x1A,0x0C',
        '0XFF,0X7E,0XB2,0X33,0X1A,0X0C'
    ];
    const rule2Answers = [
        '0x0C,0x1A,0x33,0x7E,0xB2,0xFF',
        '0X0C,0X1A,0X33,0X7E,0XB2,0XFF'
    ];

    return rule1Answers.includes(normalized) || rule2Answers.includes(normalized);
}

/**
 * Phase 2: The Hash Chamber (Quadratic Probing)
 * Hash table with indices 0-9, indices 2 and 5 are blocked
 * Keys to insert: [42, 12, 32]
 * Hash function: key % 10
 * Collision resolution: (base + n²) % 10
 * Expected answer: "1" (final index where key 32 lands)
 */
export function validatePhase2(answer) {
    const normalized = answer.trim();
    return normalized === '1';
}

/**
 * Phase 3: The Vine Root (Tree Reconstruction)
 * Preorder: [8, 5, 2, 6, 10, 9, 11]
 * Inorder: [2, 5, 6, 8, 9, 10, 11]
 * Question: Find the left child of node 10
 * Expected answer: "9"
 */
export function validatePhase3(answer) {
    const normalized = answer.trim();
    return normalized === '9';
}

/**
 * Phase 4: The Hive Web (Minimum Spanning Tree)
 * Nodes: A, B, C, D, E
 * Original edges: A-B(1), A-C(7), B-C(5), B-D(4), B-E(3), D-E(6), C-E(2)
 * Modifications: A-B broken (∞), A-C reduced to 3
 * MST total weight = 12
 * Expected answer: "12"
 */
export function validatePhase4(answer) {
    const normalized = answer.trim();
    return normalized === '12';
}

/**
 * Main validator function
 * Routes to the appropriate phase validator
 */
export function validateAnswer(phase, answer) {
    switch (phase) {
        case 1:
            return validatePhase1(answer);
        case 2:
            return validatePhase2(answer);
        case 3:
            return validatePhase3(answer);
        case 4:
            return validatePhase4(answer);
        default:
            return false;
    }
}

