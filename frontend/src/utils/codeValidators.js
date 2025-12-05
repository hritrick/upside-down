/**
 * Frontend code validators (mirror of backend)
 * Used for instant client-side feedback
 */

export const validateDijkstra = (code, language) => {
    const patterns = {
        priorityQueue: /priority[_\s]?queue|heap|PriorityQueue/i,
        distance: /distance|dist|cost/i,
        visited: /visited|seen|processed/i,
        relaxation: /(distance|dist|cost)\s*\[\s*\w+\s*\]\s*[+]\s*\w+/,
    };

    let score = 0;
    if (patterns.priorityQueue.test(code)) score += 2;
    if (patterns.distance.test(code)) score += 1;
    if (patterns.visited.test(code)) score += 1;
    if (patterns.relaxation.test(code)) score += 2;

    return {
        valid: score >= 4,
        score,
        feedback: score >= 4
            ? '✅ Valid Dijkstra implementation!'
            : '❌ Missing key components (priority queue, distance, relaxation)'
    };
};

export const validateDFS = (code) => {
    const patterns = {
        stack: /stack|Stack|recursion|recursive|dfs|depth/i,
        visited: /visited|seen|marked/i,
        traversal: /for|while|children|child/i,
        baseCase: /if.*return|return.*if/
    };

    let score = 0;
    if (patterns.stack.test(code) || patterns.traversal.test(code)) score += 2;
    if (patterns.visited.test(code)) score += 1;
    if (patterns.baseCase.test(code)) score += 1;
    if (patterns.traversal.test(code)) score += 1;

    return {
        valid: score >= 3,
        score,
        feedback: score >= 3
            ? '✅ Valid DFS implementation!'
            : '❌ Missing key components (recursion/iteration, visited tracking)'
    };
};

export const validateSorting = (code) => {
    const patterns = {
        // Accept any sorting keywords
        sortKeywords: /sort|swap|compare|bubble|merge|quick|insertion|selection|heap/i,
        // Accept comparison operations
        comparison: /[<>]=?|\.compare|compareTo/,
        // Accept loops (for sorting implementation)
        loops: /for|while|forEach/i,
        // Accept array operations
        arrayOps: /\[|\]|\.push|\.pop|\.slice|\.concat|\.length/
    };

    let score = 0;
    if (patterns.sortKeywords.test(code)) score += 2;
    if (patterns.comparison.test(code)) score += 2;
    if (patterns.loops.test(code)) score += 1;
    if (patterns.arrayOps.test(code)) score += 1;

    return {
        valid: score >= 3,
        score,
        feedback: score >= 3
            ? '✅ Valid sorting algorithm!'
            : '❌ Missing key components (sorting logic, comparisons)'
    };
};

export const validateBinarySearch = (code) => {
    const patterns = {
        mid: /(mid|middle)\s*=.*[/].*2|(left.*right|low.*high).*[/].*2/i,
        comparison: /if.*mid.*==|if.*\[.*mid.*\].*==/,
        leftRight: /(left|low|start).*=.*mid|(right|high|end).*=.*mid/i,
        whileLoop: /while.*left.*right|while.*low.*high/i
    };

    let score = 0;
    if (patterns.mid.test(code)) score += 2;
    if (patterns.comparison.test(code)) score += 1;
    if (patterns.leftRight.test(code)) score += 2;
    if (patterns.whileLoop.test(code)) score += 1;

    return {
        valid: score >= 4,
        score,
        feedback: score >= 4
            ? '✅ Valid binary search!'
            : '❌ Missing key components (mid calculation, loop, left/right updates)'
    };
};

export const validateCode = (code, phase, language) => {
    if (!code || code.trim().length < 5) {
        return {
            valid: false,
            score: 0,
            feedback: 'Please write some code to solve the problem'
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
            return { valid: false, score: 0, feedback: 'Invalid phase' };
    }
};
