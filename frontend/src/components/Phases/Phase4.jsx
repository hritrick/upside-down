import { motion } from 'framer-motion';

const graphNodes = [
    { id: 'A', x: 50, y: 150 },
    { id: 'B', x: 150, y: 50 },
    { id: 'C', x: 150, y: 250 },
    { id: 'D', x: 300, y: 50 },
    { id: 'E', x: 300, y: 250 },
    { id: 'F', x: 225, y: 150 }
];

const edges = [
    { from: 'A', to: 'B', weight: 5, destroyed: true },
    { from: 'A', to: 'C', weight: 3, destroyed: false },
    { from: 'B', to: 'D', weight: 2, destroyed: false },
    { from: 'C', to: 'F', weight: 4, destroyed: false },
    { from: 'C', to: 'E', weight: 6, destroyed: false },
    { from: 'D', to: 'E', weight: 3, destroyed: false },
    { from: 'F', to: 'E', weight: 0, destroyed: false, special: true }
];

function Phase4({ playerRole }) {
    if (playerRole === 'A') {
        // THE EYES - Display Graph Visualization
        return (
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gate mb-8 text-center tracking-wider"
                    style={{ fontFamily: 'serif' }}
                >
                    THE MAP
                </motion.h2>

                <div className="bg-black border-4 border-gate p-12 rounded-lg">
                    <div className="text-gate text-xl font-mono mb-6 text-center">
                        🗺️ ROUTE NETWORK
                    </div>

                    <svg viewBox="0 0 400 300" className="w-full h-96">
                        {/* Draw Edges First */}
                        {edges.map((edge, index) => {
                            const fromNode = graphNodes.find(n => n.id === edge.from);
                            const toNode = graphNodes.find(n => n.id === edge.to);
                            const midX = (fromNode.x + toNode.x) / 2;
                            const midY = (fromNode.y + toNode.y) / 2;

                            return (
                                <g key={index}>
                                    <motion.line
                                        x1={fromNode.x}
                                        y1={fromNode.y}
                                        x2={toNode.x}
                                        y2={toNode.y}
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        stroke={edge.destroyed ? '#666' : edge.special ? '#00ff00' : '#8B0000'}
                                        strokeWidth={edge.special ? 4 : 3}
                                        strokeDasharray={edge.destroyed ? '5,5' : '0'}
                                        opacity={edge.destroyed ? 0.3 : 1}
                                        style={{
                                            filter: edge.special ? 'drop-shadow(0 0 10px #00ff00)' : 'drop-shadow(0 0 5px #8B0000)'
                                        }}
                                    />
                                    <text
                                        x={midX}
                                        y={midY - 5}
                                        fill={edge.destroyed ? '#666' : edge.special ? '#00ff00' : '#6A0DAD'}
                                        fontSize="16"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        fontFamily="monospace"
                                    >
                                        {edge.weight}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Draw Nodes */}
                        {graphNodes.map((node, index) => (
                            <g key={node.id}>
                                <motion.circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={25}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                                    fill={node.id === 'A' || node.id === 'E' ? '#8B0000' : '#0a0a0a'}
                                    stroke={node.id === 'A' || node.id === 'E' ? '#ff0000' : '#6A0DAD'}
                                    strokeWidth={3}
                                    style={{
                                        filter: `drop-shadow(0 0 10px ${node.id === 'A' || node.id === 'E' ? '#ff0000' : '#6A0DAD'})`
                                    }}
                                />
                                <text
                                    x={node.x}
                                    y={node.y + 7}
                                    fill="white"
                                    fontSize="24"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    fontFamily="monospace"
                                >
                                    {node.id}
                                </text>
                            </g>
                        ))}
                    </svg>

                    <div className="mt-6 flex justify-between text-sm font-mono">
                        <div className="text-gate">🔴 START: A</div>
                        <div className="text-gate">🎯 TARGET: E</div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 text-center text-mindflayer font-mono text-lg"
                >
                    📡 Describe this network to your partner
                </motion.div>
            </div>
        );
    } else {
        // THE BRAIN - Display Intel Report
        return (
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-mindflayer mb-8 text-center tracking-wider"
                    style={{ fontFamily: 'serif' }}
                >
                    THE MAP
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black border-4 border-mindflayer p-8 rounded-lg font-mono shadow-[0_0_30px_#6A0DAD]"
                >
                    <div className="text-center mb-8">
                        <div className="text-2xl text-mindflayer mb-2">╔═══════════════════════════╗</div>
                        <div className="text-2xl text-mindflayer mb-2">║   INTEL REPORT            ║</div>
                        <div className="text-2xl text-mindflayer mb-2">╚═══════════════════════════╝</div>
                    </div>

                    <div className="space-y-6 text-white text-lg">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-red-900/30 border-l-4 border-red-500 p-4"
                        >
                            <div className="text-red-500 font-bold mb-2">⚠️ ROUTE UPDATE 1:</div>
                            <div>Road <span className="text-gate font-bold">A-B</span> is <span className="text-red-500 font-bold">DESTROYED</span></div>
                            <div className="text-sm text-gray-400 mt-1">(Cannot use this path)</div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="bg-green-900/30 border-l-4 border-green-500 p-4"
                        >
                            <div className="text-green-500 font-bold mb-2">✅ ROUTE UPDATE 2:</div>
                            <div>Tunnel <span className="text-eleven font-bold">F-E</span> is <span className="text-green-500 font-bold">OPEN</span></div>
                            <div className="text-sm text-green-400 mt-1">(Weight: 0 - Free passage!)</div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="bg-mindflayer/20 border-2 border-mindflayer p-6 mt-6"
                        >
                            <div className="text-mindflayer font-bold text-xl mb-3 text-center">📋 OBJECTIVE:</div>
                            <div className="text-center">
                                Calculate the <span className="text-gate font-bold">shortest path cost</span>
                            </div>
                            <div className="text-center text-xl mt-2">
                                from <span className="text-gate">A</span> → <span className="text-gate">E</span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-8 pt-6 border-t border-mindflayer/50"
                    >
                        <div className="text-green-500 text-sm">
                            &gt; Submit total cost as integer
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }
}

export default Phase4;
