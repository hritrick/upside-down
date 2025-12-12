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
    // Normalize: remove spaces, convert to uppercase
    const normalized = answer.toUpperCase().replace(/\s+/g, '');

    // Accept both possible rule answers
    const rule1Answer = '0xFF,0x7E,0xB2,0x33,0x1A,0x0C'; // Hamming weight desc
    const rule2Answer = '0x0C,0x1A,0x33,0x7E,0xB2,0xFF'; // Hex value asc

    return normalized === rule1Answer || normalized === rule2Answer;
}

/**
 * Phase 2: The Rotated Vault (Binary Search in Rotated Array)
 * Array: [55, 61, 70, 85, 12, 19, 23, 40]
 * Target: 19
 * Expected answer: "5" (the index of 19)
 */
export function validatePhase2(answer) {
    const normalized = answer.trim();
    return normalized === '5';
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

