export const ANSWERS = {
    phase1: "0x09 0x17 0x3F 0x8B 0xA1 0xE4",
    phase2: "1",
    phase3: "20",
    phase4: "21"
};

export const HINT_DATA = {
    1: [
        "DECIMAL VALUES: 0x09=9, 0xE4=228, 0x17=23, 0x8B=139, 0xA1=161, 0x3F=63", // Full Decimal List
    ],
    2: [
        "Index 2 is blocked. The first collision (Key 42) must move to (2 + 1²) = Index 3."
    ],
    3: [
        "Preorder: Root->Left->Right. Inorder: Left->Root->Right. The Root Node is 50."
    ],
    4: [
        "Total number of nodes - 1 = Number of edges required for MST."
    ]
};

// Phase 4: Fixed Dijkstra Graph Generator
export function generatePhase4Puzzle() {
    // FIXED GRAPH - Matches user diagram exactly
    const nodes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const edges = [
        ['a', 'b', 5], ['a', 'c', 3],
        ['b', 'c', 4], ['b', 'd', 6], ['b', 'e', 2],
        ['c', 'd', 5], ['c', 'f', 6],
        ['d', 'e', 6], ['d', 'f', 6],
        ['e', 'f', 3], ['e', 'g', 5],
        ['f', 'g', 4]
    ];

    // Static Mission: Solution is hardcoded to 21 (User Request)
    return {
        nodes,
        edges,
        startNode: 'MST',
        endNode: 'MST',
        solution: 21
    };
}
