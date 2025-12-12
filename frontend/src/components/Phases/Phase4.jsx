import { motion } from 'framer-motion';

function Phase4({ playerRole }) {
    // Network graph: nodes and edges with capacities
    const nodes = [
        { id: 'S', x: 100, y: 150, label: 'SOURCE', color: '#00ff00' },
        { id: 'A', x: 250, y: 80, label: 'NODE A', color: '#6A0DAD' },
        { id: 'B', x: 250, y: 220, label: 'NODE B', color: '#6A0DAD' },
        { id: 'T', x: 400, y: 150, label: 'SINK', color: '#ff0000' },
    ];

    const edges = [
        { from: 'S', to: 'A', capacity: 10, x1: 100, y1: 150, x2: 250, y2: 80, original: true },
        { from: 'S', to: 'B', capacity: 5, x1: 100, y1: 150, x2: 250, y2: 220, modified: 'LEAK: 10→5' },
        { from: 'A', to: 'B', capacity: 2, x1: 250, y1: 80, x2: 250, y2: 220, original: true },
        { from: 'A', to: 'T', capacity: 4, x1: 250, y1: 80, x2: 400, y2: 150, modified: 'CORRODED: 8→4' },
        { from: 'B', to: 'T', capacity: 9, x1: 250, y1: 220, x2: 400, y2: 150, original: true },
    ];

    return (
        <div className="min-h-full">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-gate mb-8 text-center tracking-wider"
                style={{ fontFamily: 'serif' }}
            >
                THE POWER GRID
            </motion.h2>

            {playerRole === 'A' ? (
                // Player A: The Eyes - Sees the Network Graph
                <div className="space-y-8">
                    <div className="text-mindflayer text-2xl font-mono text-center mb-6">
                        ⚡ ENERGY DISTRIBUTION NETWORK
                    </div>

                    <div className="bg-black/60 border-4 border-gate p-8 rounded-lg max-w-4xl mx-auto">
                        <svg viewBox="0 0 500 300" className="w-full h-full">
                            {/* Edges */}
                            {edges.map((edge, index) => (
                                <g key={index}>
                                    <motion.line
                                        x1={edge.x1}
                                        y1={edge.y1}
                                        x2={edge.x2}
                                        y2={edge.y2}
                                        stroke={edge.modified ? '#ff0000' : '#00ff00'}
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1, delay: index * 0.2 }}
                                    />
                                    {/* Capacity Label */}
                                    <motion.text
                                        x={(edge.x1 + edge.x2) / 2}
                                        y={(edge.y1 + edge.y2) / 2 - 10}
                                        fill={edge.modified ? '#ff0000' : '#00ff00'}
                                        fontSize="20"
                                        fontFamily="Source Code Pro, monospace"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.2 + 0.5 }}
                                    >
                                        {edge.capacity}
                                    </motion.text>
                                    {/* Arrow */}
                                    <motion.circle
                                        cx={(edge.x1 + edge.x2) / 2 + 20}
                                        cy={(edge.y1 + edge.y2) / 2}
                                        r="4"
                                        fill={edge.modified ? '#ff0000' : '#00ff00'}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.2 + 0.5 }}
                                    />
                                </g>
                            ))}

                            {/* Nodes */}
                            {nodes.map((node, index) => (
                                <g key={node.id}>
                                    <motion.circle
                                        cx={node.x}
                                        cy={node.y}
                                        r="30"
                                        fill={node.color}
                                        stroke="#ffffff"
                                        strokeWidth="3"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.15, type: 'spring' }}
                                    />
                                    <text
                                        x={node.x}
                                        y={node.y + 5}
                                        fill="#000"
                                        fontSize="20"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        fontFamily="Source Code Pro, monospace"
                                    >
                                        {node.id}
                                    </text>
                                    <text
                                        x={node.x}
                                        y={node.y + 55}
                                        fill="#ffffff"
                                        fontSize="12"
                                        textAnchor="middle"
                                        fontFamily="Source Code Pro, monospace"
                                    >
                                        {node.label}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto font-mono">
                        <div className="bg-green-500/20 border-2 border-green-500 p-4 rounded text-center">
                            <div className="text-green-500 text-lg mb-2">NORMAL PIPE</div>
                            <div className="text-sm text-gray-400">Full capacity available</div>
                        </div>
                        <div className="bg-red-500/20 border-2 border-red-500 p-4 rounded text-center">
                            <div className="text-red-500 text-lg mb-2">DAMAGED PIPE</div>
                            <div className="text-sm text-gray-400">Reduced capacity</div>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono">
                        ⚠️ DESCRIBE THE NETWORK STRUCTURE TO YOUR PARTNER
                    </div>
                </div>
            ) : (
                // Player B: The Brain - Gets the Blockages and Formula
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="text-mindflayer text-2xl font-mono text-center mb-6">
                        🧠 MAX FLOW CALCULATION
                    </div>

                    <div className="bg-black/60 border-4 border-red-500 p-6 rounded-lg">
                        <div className="text-2xl text-red-500 font-bold mb-4 text-center font-mono">
                            ⚠️ SYSTEM DAMAGE REPORT
                        </div>
                        <div className="space-y-3 text-white text-lg font-mono">
                            <div className="bg-red-500/20 p-4 rounded border-2 border-red-500">
                                <strong>PIPE A→T:</strong> CORRODED<br />
                                <span className="text-yellow-500">Max capacity reduced: 8 → 4</span>
                            </div>
                            <div className="bg-red-500/20 p-4 rounded border-2 border-red-500">
                                <strong>PIPE S→B:</strong> LEAK DETECTED<br />
                                <span className="text-yellow-500">Max capacity reduced: 10 → 5</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 text-white font-mono">
                        <div className="bg-mindflayer/20 p-6 rounded-lg border-2 border-mindflayer">
                            <div className="text-2xl text-mindflayer font-bold mb-4">TASK</div>
                            <div className="space-y-3 text-lg">
                                <div>Calculate the <span className="text-green-500 font-bold">MAXIMUM FLOW</span> from SOURCE (S) to SINK (T)</div>
                                <div className="text-sm text-gray-400">Given the capacity constraints and damage reports</div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-lg border-2 border-gate">
                            <div className="text-xl text-gate font-bold mb-4">ORIGINAL NETWORK</div>
                            <div className="space-y-2 text-lg">
                                <div>• S→A: <span className="text-yellow-500">10</span></div>
                                <div>• S→B: <span className="text-red-500 line-through">10</span> → <span className="text-yellow-500">5</span></div>
                                <div>• A→B: <span className="text-yellow-500">2</span></div>
                                <div>• A→T: <span className="text-red-500 line-through">8</span> → <span className="text-yellow-500">4</span></div>
                                <div>• B→T: <span className="text-yellow-500">9</span></div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-8 rounded-lg border-4 border-green-500">
                            <div className="text-2xl text-green-500 font-bold mb-4 text-center">MAX FLOW ALGORITHM</div>
                            <div className="space-y-4 text-lg">
                                <div>
                                    <strong className="text-yellow-500">STEP 1:</strong> Find all possible paths from S to T
                                </div>
                                <div>
                                    <strong className="text-yellow-500">STEP 2:</strong> For each path, find the minimum capacity (bottleneck)
                                </div>
                                <div>
                                    <strong className="text-yellow-500">STEP 3:</strong> Sum the flow from all paths
                                </div>
                                <div className="bg-black p-4 rounded mt-4 text-sm text-gray-400">
                                    Example Path: S→A→T<br />
                                    Capacities: min(10, 4) = 4 units
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-500/20 border-2 border-yellow-500 p-4 rounded">
                            <div className="text-yellow-500 font-bold text-lg mb-2">💡 HINT</div>
                            <div>After using a path, subtract its flow from shared edges before finding the next path</div>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono text-lg mt-6">
                        📝 SUBMIT FORMAT: Integer (e.g., "11")
                    </div>
                </div>
            )}
        </div>
    );
}

export default Phase4;
