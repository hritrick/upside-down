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
 * Phase 2: The Glitched Matrix (Staircase Search in 2D Sorted Matrix)
 * Matrix (5x5):
 * [10, 20, 30, 40, 50]
 * [15, 25, 35, 45, 55]
 * [27, 37, 47, 57, 67]
 * [32, 42, 52, 62, 72]
 * [38, 48, 58, 68, 78]
 * 
 * Target: 47
 * Start: Top-Right (0,4) = 50
 * Path: (0,4) → (0,3) → (0,2) → (1,2) → (2,2) ✓
 * Expected answer: "04-03-02-12-22" or "04,03,02,12,22"
 */
export function validatePhase2(answer) {
    const normalized = answer.replace(/[\s,-]/g, ''); // Remove spaces, commas, dashes

    // Correct path coordinates (row,col format without separators)
    const correctPaths = [
        '0403021222',  // 04-03-02-12-22
        '04030212',    // If they stop at 12 before final
    ];

    // Also accept with common separators
    const answerVariants = [
        answer.replace(/\s/g, ''), // Remove spaces
        answer.replace(/\s/g, '').replace(/-/g, '').replace(/,/g, ''), // Remove all separators
    ];

    return correctPaths.includes(normalized) ||
        answerVariants.some(variant => variant === '04-03-02-12-22' || variant === '0403021222');
}

/**
 * Phase 3: The Memory Leak (Graph Cycle Detection)
 * Process-Resource Graph:
 * P1 holds R1, waits R2 → P2 holds R2, waits R3 → P3 holds R3, waits R1
 * Cycle: P1 → P2 → P3 (IDs: 1, 2, 3)
 * Formula: Sum of IDs × Node count = (1+2+3) × 3 = 18
 * Expected answer: "18"
 */
export function validatePhase3(answer) {
    const normalized = answer.trim();
    return normalized === '18';
}

/**
 * Phase 4: The Power Grid (Max Flow Calculation)
 * Network: S→A(10), S→B(5), A→B(2), A→T(4), B→T(9)
 * Max Flow from S to T = 11
 * Paths: S→A→T(4) + S→A→B→T(2) + S→B→T(5) = 11
 * Expected answer: "11"
 */
export function validatePhase4(answer) {
    const normalized = answer.trim();
    return normalized === '11';
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

