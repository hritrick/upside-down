/**
 * Code validators for each game phase
 * Uses heuristic regex-based validation to check for algorithm patterns
 */

// Phase 1: Dijkstra's Algorithm / Shortest Path
export const validateDijkstra = (code, language) => {
    const patterns = {
        // Common Dijkstra patterns
        priorityQueue: /priority[_\s]?queue|heap|PriorityQueue/i,
        distance: /distance|dist|cost/i,
        visited: /visited|seen|processed/i,
        relaxation: /(distance|dist|cost)\s*\[\s*\w+\s*\]\s*[+]\s*\w+/,

        // Language-specific patterns
        python: /import\s+heapq|heappush|heappop/i,
        cpp: /#include\s*<queue>|priority_queue/i,
        java: /PriorityQueue|Queue/i,
        javascript: /MinHeap|PriorityQueue/i
    };

    let score = 0;

    // Check for core algorithm elements
    if (patterns.priorityQueue.test(code)) score += 2;
    if (patterns.distance.test(code)) score += 1;
    if (patterns.visited.test(code)) score += 1;
    if (patterns.relaxation.test(code)) score += 2;

    // Check for language-specific implementations
    const langPattern = patterns[language.toLowerCase()];
    if (langPattern && langPattern.test(code)) score += 1;

    // Need at least 4 points to pass
    return {
        valid: score >= 4,
        score,
        feedback: score >= 4
            ? 'Valid Dijkstra implementation detected!'
            : 'Missing key Dijkstra components (priority queue, distance tracking, relaxation)'
    };
};

// Phase 2: DFS / Search Traversal
export const validateDFS = (code, language) => {
    const patterns = {
        // Core DFS patterns
        stack: /stack|Stack|recursion|recursive/i,
        visited: /visited|seen|marked/i,
        traversal: /dfs|depth.first|traverse/i,
        baseCase: /if.*return|return.*if/,

        // Recursion or stack usage
        recursiveCall: /function.*\{[\s\S]*\1\s*\(/,
        stackOps: /push|pop|append/i
    };

    let score = 0;

    if (patterns.stack.test(code) || patterns.traversal.test(code)) score += 2;
    if (patterns.visited.test(code)) score += 1;
    if (patterns.baseCase.test(code)) score += 1;
    if (patterns.recursiveCall.test(code) || patterns.stackOps.test(code)) score += 2;

    return {
        valid: score >= 3,
        score,
        feedback: score >= 3
            ? 'Valid DFS implementation detected!'
            : 'Missing key DFS components (stack/recursion, visited tracking, traversal logic)'
    };
};

// Phase 3: Sorting Algorithms (Merge Sort / Quick Sort)
export const validateSorting = (code, language) => {
    const patterns = {
        // Merge sort patterns
        merge: /merge|combine/i,
        divide: /mid|middle|pivot/i,

        // Quick sort patterns
        partition: /partition|pivot/i,
        quickSort: /quick.?sort|qsort/i,

        // Merge sort patterns
        mergeSort: /merge.?sort|msort/i,

        // Generic sorting patterns
        comparison: /[<>]=?.*\[|\[.*[<>]=?/,
        recursion: /function.*\{[\s\S]*sort/i,
        baseCase: /if.*length.*return|if.*<=.*1/
    };

    let score = 0;

    // Check for sorting algorithm type
    if (patterns.mergeSort.test(code) || patterns.merge.test(code)) score += 2;
    if (patterns.quickSort.test(code) || patterns.partition.test(code)) score += 2;

    // Check for core components
    if (patterns.divide.test(code)) score += 1;
    if (patterns.comparison.test(code)) score += 1;
    if (patterns.recursion.test(code)) score += 1;
    if (patterns.baseCase.test(code)) score += 1;

    return {
        valid: score >= 4,
        score,
        feedback: score >= 4
            ? 'Valid sorting algorithm detected!'
            : 'Missing key sorting components (merge/partition, recursion, base case, comparisons)'
    };
};

// Phase 4: Binary Search
export const validateBinarySearch = (code, language) => {
    const patterns = {
        // Core binary search patterns
        binarySearch: /binary.?search|bsearch/i,
        mid: /(mid|middle)\s*=.*[/].*2|(left.*right|low.*high).*[/].*2/i,
        comparison: /if.*mid.*==|if.*\[.*mid.*\].*==/,
        leftRight: /(left|low|start).*=.*mid|(right|high|end).*=.*mid/i,
        whileLoop: /while.*left.*right|while.*low.*high/i
    };

    let score = 0;

    if (patterns.binarySearch.test(code)) score += 1;
    if (patterns.mid.test(code)) score += 2;
    if (patterns.comparison.test(code)) score += 1;
    if (patterns.leftRight.test(code)) score += 2;
    if (patterns.whileLoop.test(code)) score += 1;

    return {
        valid: score >= 4,
        score,
        feedback: score >= 4
            ? 'Valid binary search implementation detected!'
            : 'Missing key binary search components (mid calculation, left/right updates, while loop)'
    };
};

// Main validator function
export const validateCode = (code, phase, language) => {
    if (!code || code.trim().length < 10) {
        return {
            valid: false,
            score: 0,
            feedback: 'Code too short'
        };
    }

    switch (phase) {
        case 1:
            return validateDijkstra(code, language);
        case 2:
            return validateDFS(code, language);
        case 3:
            return validateSorting(code, language);
        case 4:
            return validateBinarySearch(code, language);
        default:
            return {
                valid: false,
                score: 0,
                feedback: 'Invalid phase'
            };
    }
};
