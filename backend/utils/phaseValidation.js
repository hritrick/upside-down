/**
 * Phase Validation Logic for The Upside Down Protocol
 * Each function validates the user's answer for a specific phase
 */

/**
 * Phase 1: The Demodog Formation (Sorting)
 * Expected answer: "Vecna, Dart, Demogorgon, Mind Flayer"
 * Sorting logic:
 * 1. Sort by Power (High to Low)
 * 2. If tied, sort by Speed (Low to High)
 * 3. Swap Index 1 and Index 3
 */
export function validatePhase1(answer) {
    const normalized = answer.toLowerCase().trim();
    const validAnswers = [
        'vecna, dart, demogorgon, mind flayer',
        'vecna,dart,demogorgon,mind flayer'
    ];

    return validAnswers.includes(normalized);
}

/**
 * Phase 2: The Radio Signal (Binary Search)
 * Array: [10, 25, 32, 45, 59, 63, 78, 81, 99]
 * Target: 78
 * Expected answer: "59, 78" (MID values at each step)
 */
export function validatePhase2(answer) {
    const normalized = answer.replace(/\s+/g, '').toLowerCase();
    const validAnswers = [
        '59,78',
        '59, 78'
    ];

    return validAnswers.includes(answer.trim());
}

/**
 * Phase 3: The Hive Mind (Linked List)
 * Memory addresses:
 * 101 -> 'H' -> 505
 * 505 -> 'E' -> 202
 * 202 -> 'L' -> 909
 * 909 -> 'P' -> NULL
 * Instruction: Skip node at 505
 * Expected answer: "HLP"
 */
export function validatePhase3(answer) {
    const normalized = answer.toUpperCase().trim();
    return normalized === 'HLP';
}

/**
 * Phase 4: The Map (Graph Shortest Path)
 * Graph with nodes A, B, C, D, E, F
 * Modifications:
 * - A-B is destroyed
 * - F-E is open (weight 0)
 * Expected answer: "14" (shortest path cost from A to E)
 */
export function validatePhase4(answer) {
    const normalized = answer.trim();
    return normalized === '14';
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
