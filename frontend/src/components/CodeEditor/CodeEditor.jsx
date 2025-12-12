import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { validateCode } from '../../utils/codeValidators';

const CodeEditor = ({ onSubmit, phase, disabled = false }) => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [feedback, setFeedback] = useState(null);
    const [isValidating, setIsValidating] = useState(false);

    const languages = [
        { value: 'python', label: 'Python' },
        { value: 'c', label: 'C' },
        { value: 'java', label: 'Java' }
    ];

    const editorOptions = {
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 4,
        wordWrap: 'on',
        theme: 'vs-dark',
        padding: { top: 10, bottom: 10 }
    };

    const getStarterCode = (lang, phaseNum) => {
        const starters = {
            python: {
                1: `# Dijkstra's Algorithm - Find shortest path from Mike's House to Starcourt Mall Basement
import heapq

def dijkstra(graph, start, end):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    visited = set()
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        if current in visited:
            continue
        
        visited.add(current)
        
        if current == end:
            return current_dist
        
        # YOUR CODE HERE: Implement edge relaxation
        # Loop through neighbors and update distances
        
    
    return distances[end]

# Test the algorithm
graph = {
    "Mike's House": {"Forest Trail": 4, "Main Road": 7},
    "Forest Trail": {"Hawkins Lab": 3},
    "Main Road": {"Downtown": 2},
    "Hawkins Lab": {"Starcourt Mall": 5},
    "Downtown": {"Starcourt Mall": 4},
    "Starcourt Mall": {"Basement": 1},
    "Basement": {}
}

result = dijkstra(graph, "Mike's House", "Basement")
print(f"Shortest path distance: {result}")`,
                2: `# DFS Traversal - Navigate the Upside Down maze to find the Core Node
def dfs(tree, target):
    visited = set()
    
    def dfs_helper(node):
        if node is None:
            return False
        
        if node in visited:
            return False
        
        visited.add(node)
        print(f"Visiting: {node['name']}")
        
        # YOUR CODE HERE: Check if we found the target node
        # If found, return True
        
        
        # YOUR CODE HERE: Recursively visit all children
        # Return True if target is found in any child
        
        
        return False
    
    return dfs_helper(tree)

# Test the algorithm
tree = {
    'name': 'Entrance',
    'children': [
        {'name': 'Left Tunnel', 'children': [{'name': 'Dead End', 'children': []}]},
        {'name': 'Right Tunnel', 'children': [
            {'name': 'Core Node', 'children': []},
            {'name': 'False Path', 'children': []}
        ]}
    ]
}

found = dfs(tree, "Core Node")
print(f"Core Node found: {found}")`,
                3: `# Sorting Algorithm - Sort Eleven's Memory Fragments by priority
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    # YOUR CODE HERE: Merge two sorted arrays
    # Compare elements from left and right arrays
    # Append smaller element to result
    
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Test the algorithm
priorities = [8, 3, 5, 1, 9, 2]
sorted_priorities = merge_sort(priorities)
print(f"Sorted priorities: {sorted_priorities}")`,
                4: `# Binary Search - Find the Key Memory in sorted fragments
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        # YOUR CODE HERE: Implement comparison logic
        # If arr[mid] equals target, return mid
        # If arr[mid] < target, update left
        # If arr[mid] > target, update right
        
    
    return -1

# Test the algorithm
memories = ["Brenner", "Demogorgon", "Eggos", "Friends", "Hawkins", "Lab", "Mike", "Powers"]
target = "Mike"
index = binary_search(memories, target)
print(f"Found '{target}' at index: {index}")`
            },
            c: {
                1: `// Dijkstra's Algorithm - Find shortest path
#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

#define V 7
#define INF INT_MAX

int minDistance(int dist[], bool visited[]) {
    int min = INF, min_index = -1;
    for (int v = 0; v < V; v++) {
        if (!visited[v] && dist[v] < min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

void dijkstra(int graph[V][V], int src, int dest) {
    int dist[V];
    bool visited[V];
    
    for (int i = 0; i < V; i++) {
        dist[i] = INF;
        visited[i] = false;
    }
    dist[src] = 0;
    
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, visited);
        if (u == -1) break;
        visited[u] = true;
        
        // YOUR CODE HERE: Implement edge relaxation
        // Loop through all vertices
        // Update distances if shorter path found
        
    }
    
    printf("Shortest distance: %d\\n", dist[dest]);
}

int main() {
    int graph[V][V] = {
        {0, 4, 7, 0, 0, 0, 0},
        {4, 0, 0, 3, 0, 0, 0},
        {7, 0, 0, 0, 2, 0, 0},
        {0, 3, 0, 0, 5, 0, 0},
        {0, 0, 2, 5, 0, 4, 0},
        {0, 0, 0, 0, 4, 0, 1},
        {0, 0, 0, 0, 0, 1, 0}
    };
    dijkstra(graph, 0, 6);
    return 0;
}`,
                2: `// DFS Traversal - Navigate the maze
#include <stdio.h>
#include <stdbool.h>

#define MAX 100

typedef struct {
    int data[MAX];
    int top;
} Stack;

void push(Stack* s, int val) {
    s->data[++s->top] = val;
}

int pop(Stack* s) {
    return s->data[s->top--];
}

bool isEmpty(Stack* s) {
    return s->top == -1;
}

void dfs(int graph[][MAX], int n, int start, int target) {
    bool visited[MAX] = {false};
    Stack s = {.top = -1};
    push(&s, start);
    
    while (!isEmpty(&s)) {
        int current = pop(&s);
        
        if (visited[current]) continue;
        
        visited[current] = true;
        printf("Visiting node: %d\\n", current);
        
        // YOUR CODE HERE: Check if target is found
        
        
        // YOUR CODE HERE: Add unvisited neighbors to stack
        
    }
}

int main() {
    int graph[MAX][MAX] = {
        {0, 1, 1, 0},
        {1, 0, 0, 1},
        {1, 0, 0, 1},
        {0, 1, 1, 0}
    };
    dfs(graph, 4, 0, 3);
    return 0;
}`,
                3: `// Merge Sort - Sort Memory Fragments
#include <stdio.h>

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    // YOUR CODE HERE: Merge two sorted arrays
    // Compare elements from L and R
    // Place smaller element in arr
    
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    int memories[] = {8, 3, 5, 1, 9, 2};
    int n = sizeof(memories) / sizeof(memories[0]);
    
    printf("Original: ");
    for (int i = 0; i < n; i++) printf("%d ", memories[i]);
    
    mergeSort(memories, 0, n - 1);
    
    printf("\\nSorted: ");
    for (int i = 0; i < n; i++) printf("%d ", memories[i]);
    return 0;
}`,
                4: `// Binary Search - Find the Key Memory
#include <stdio.h>
#include <string.h>

int binarySearch(char arr[][20], int n, char* target) {
    int left = 0;
    int right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int cmp = strcmp(arr[mid], target);
        
        // YOUR CODE HERE: Implement comparison logic
        // Return mid if found
        // Update left or right based on comparison
        
    }
    
    return -1;
}

int main() {
    char memories[][20] = {"Brenner", "Demogorgon", "Eggos", "Friends", "Hawkins", "Lab", "Mike", "Powers"};
    int n = sizeof(memories) / sizeof(memories[0]);
    
    char target[] = "Mike";
    int index = binarySearch(memories, n, target);
    printf("Found '%s' at index: %d\\n", target, index);
    return 0;
}`
            },
            java: {
                1: `// Dijkstra's Algorithm - Find shortest path
import java.util.*;

class Dijkstra {
    static class Node implements Comparable<Node> {
        int vertex, distance;
        Node(int v, int d) { vertex = v; distance = d; }
        public int compareTo(Node other) { return this.distance - other.distance; }
    }
    
    public static int dijkstra(int[][] graph, int src, int dest) {
        int n = graph.length;
        int[] dist = new int[n];
        boolean[] visited = new boolean[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.add(new Node(src, 0));
        
        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int u = current.vertex;
            
            if (visited[u]) continue;
            visited[u] = true;
            
            // YOUR CODE HERE: Implement edge relaxation
            // Loop through all vertices
            // Update distances and add to priority queue
            
        }
        
        return dist[dest];
    }
    
    public static void main(String[] args) {
        int[][] graph = {
            {0, 4, 7, 0, 0, 0, 0},
            {4, 0, 0, 3, 0, 0, 0},
            {7, 0, 0, 0, 2, 0, 0},
            {0, 3, 0, 0, 5, 0, 0},
            {0, 0, 2, 5, 0, 4, 0},
            {0, 0, 0, 0, 4, 0, 1},
            {0, 0, 0, 0, 0, 1, 0}
        };
        int result = dijkstra(graph, 0, 6);
        System.out.println("Shortest distance: " + result);
    }
}`,
                2: `// DFS Traversal - Navigate the maze
import java.util.*;

class DFS {
    static class TreeNode {
        String name;
        List<TreeNode> children;
        TreeNode(String name) {
            this.name = name;
            this.children = new ArrayList<>();
        }
    }
    
    public static boolean dfs(TreeNode root, String target) {
        if (root == null) return false;
        
        Set<String> visited = new HashSet<>();
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode current = stack.pop();
            
            if (visited.contains(current.name)) continue;
            
            visited.add(current.name);
            System.out.println("Visiting: " + current.name);
            
            // YOUR CODE HERE: Check if target is found
            
            
            // YOUR CODE HERE: Add unvisited children to stack
            
        }
        
        return false;
    }
    
    public static void main(String[] args) {
        TreeNode root = new TreeNode("Entrance");
        TreeNode left = new TreeNode("Left Tunnel");
        TreeNode right = new TreeNode("Right Tunnel");
        TreeNode coreNode = new TreeNode("Core Node");
        
        root.children.add(left);
        root.children.add(right);
        right.children.add(coreNode);
        
        boolean found = dfs(root, "Core Node");
        System.out.println("Core Node found: " + found);
    }
}`,
                3: `// Merge Sort - Sort Memory Fragments
import java.util.Arrays;

class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    public static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        int[] L = new int[n1];
        int[] R = new int[n2];
        
        for (int i = 0; i < n1; i++) L[i] = arr[left + i];
        for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
        
        int i = 0, j = 0, k = left;
        
        // YOUR CODE HERE: Merge two sorted arrays
        // Compare elements from L and R
        // Place smaller element in arr
        
        
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
    
    public static void main(String[] args) {
        int[] memories = {8, 3, 5, 1, 9, 2};
        System.out.println("Original: " + Arrays.toString(memories));
        mergeSort(memories, 0, memories.length - 1);
        System.out.println("Sorted: " + Arrays.toString(memories));
    }
}`,
                4: `// Binary Search - Find the Key Memory
import java.util.Arrays;

class BinarySearch {
    public static int binarySearch(String[] arr, String target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int cmp = arr[mid].compareTo(target);
            
            // YOUR CODE HERE: Implement comparison logic
            // Return mid if found
            // Update left or right based on comparison
            
        }
        
        return -1;
    }
    
    public static void main(String[] args) {
        String[] memories = {"Brenner", "Demogorgon", "Eggos", "Friends", "Hawkins", "Lab", "Mike", "Powers"};
        String target = "Mike";
        int index = binarySearch(memories, target);
        System.out.println("Found '" + target + "' at index: " + index);
    }
}`
            }
        };

        return starters[lang]?.[phaseNum] || '';
    };

    const getPhaseAlgorithm = (phaseNum) => {
        const algorithms = {
            1: 'Dijkstra\'s Algorithm',
            2: 'DFS',
            3: 'Sorting Algorithm',
            4: 'Binary Search'
        };
        return algorithms[phaseNum] || 'Algorithm';
    };

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        setCode(getStarterCode(newLang, phase));
        setFeedback(null);
    };

    const handleEditorMount = (editor) => {
        setCode(getStarterCode(language, phase));
    };

    const handleSubmit = async () => {
        setIsValidating(true);
        setFeedback(null);

        // Client-side validation
        const validation = validateCode(code, phase, language);

        if (validation.valid) {
            setFeedback({ type: 'success', message: validation.feedback });

            // Call parent's onSubmit
            if (onSubmit) {
                await onSubmit(code, language);
            }
        } else {
            setFeedback({ type: 'error', message: validation.feedback });
        }

        setIsValidating(false);
    };

    return (
        <div className="w-full h-full flex flex-col bg-void border-2 border-terminal p-4" style={{ boxShadow: '0 0 20px rgba(0, 255, 102, 0.3)' }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-terminal text-xl font-bold">
                    CODE EDITOR
                </h3>

                {/* Language Selector */}
                <div className="flex gap-2">
                    {languages.map((lang) => (
                        <button
                            key={lang.value}
                            onClick={() => handleLanguageChange(lang.value)}
                            disabled={disabled}
                            className={`
                                px-3 py-1 text-sm font-bold transition-all
                                ${language === lang.value
                                    ? 'bg-terminal text-void border-2 border-terminal'
                                    : 'bg-void text-terminal border-2 border-terminal hover:bg-terminal hover:text-void'
                                }
                                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            `}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 border-2 border-terminal mb-4 overflow-hidden">
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    onMount={handleEditorMount}
                    options={editorOptions}
                    theme="vs-dark"
                />
            </div>

            {/* Feedback */}
            {feedback && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                        mb-4 p-3 border-2 font-bold
                        ${feedback.type === 'success'
                            ? 'bg-terminal bg-opacity-20 border-terminal text-terminal'
                            : 'bg-panic bg-opacity-20 border-panic text-panic'
                        }
                    `}
                >
                    {feedback.message}
                </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
                whileHover={{ scale: disabled ? 1 : 1.02 }}
                whileTap={{ scale: disabled ? 1 : 0.98 }}
                onClick={handleSubmit}
                disabled={disabled || isValidating}
                className={`
                    w-full py-3 text-lg font-bold transition-all
                    ${disabled || isValidating
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-terminal text-void hover:bg-opacity-90 cursor-pointer'
                    }
                    border-2 border-terminal
                `}
            >
                {isValidating ? 'VALIDATING...' : disabled ? 'CODE VALIDATED ✓' : 'SUBMIT CODE'}
            </motion.button>
        </div>
    );
};

export default CodeEditor;
