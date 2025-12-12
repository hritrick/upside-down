import { motion } from 'framer-motion';

const memoryTable = [
    { address: '101', data: 'H', next: '505' },
    { address: '505', data: 'E', next: '202' },
    { address: '202', data: 'L', next: '909' },
    { address: '909', data: 'P', next: 'NULL' }
];

function Phase3({ playerRole }) {
    if (playerRole === 'A') {
        // THE EYES - Display Memory Address Table
        return (
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gate mb-8 text-center tracking-wider"
                    style={{ fontFamily: 'serif' }}
                >
                    THE HIVE MIND
                </motion.h2>

                <div className="bg-black border-4 border-gate p-8 rounded-lg">
                    <div className="text-gate text-xl font-mono mb-6 text-center">
                        🧠 MEMORY STRUCTURE
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full font-mono">
                            <thead>
                                <tr className="border-b-2 border-mindflayer">
                                    <th className="px-6 py-4 text-left text-mindflayer text-lg">Address</th>
                                    <th className="px-6 py-4 text-left text-mindflayer text-lg">Data</th>
                                    <th className="px-6 py-4 text-left text-mindflayer text-lg">Next</th>
                                </tr>
                            </thead>
                            <tbody>
                                {memoryTable.map((node, index) => (
                                    <motion.tr
                                        key={node.address}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                        className="border-b border-gate/30 hover:bg-gate/10 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="text-gate text-xl font-bold">
                                                {node.address}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-white text-2xl font-bold group-hover:text-eleven transition-colors">
                                                '{node.data}'
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {node.next === 'NULL' ? (
                                                <span className="text-gray-500 text-xl">NULL</span>
                                            ) : (
                                                <span className="text-mindflayer text-xl">
                                                    → {node.next}
                                                </span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-6 text-center text-green-500 font-mono"
                    >
                        HEAD → 101
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-8 text-center text-mindflayer font-mono text-lg"
                >
                    📡 Share this memory structure with your partner
                </motion.div>
            </div>
        );
    } else {
        // THE BRAIN - Display Linked List Traversal Instructions
        return (
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-mindflayer mb-8 text-center tracking-wider"
                    style={{ fontFamily: 'serif' }}
                >
                    THE HIVE MIND
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black border-4 border-mindflayer p-8 rounded-lg font-mono shadow-[0_0_30px_#6A0DAD]"
                >
                    <div className="text-mindflayer text-xl mb-6">
                        <span className="text-gate">▸</span> CODE INSTRUCTION
                    </div>

                    <div className="space-y-6 text-white text-lg">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-mindflayer/20 border-l-4 border-mindflayer p-4"
                        >
                            <div className="text-green-500 mb-2">// Start traversal</div>
                            <div>Start at <span className="text-gate font-bold">Head (101)</span></div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="bg-gate/20 border-l-4 border-gate p-4"
                        >
                            <div className="text-red-500 mb-2 font-bold">⚠️ ERROR DETECTED</div>
                            <div>Skip/Delete node at Address <span className="text-gate font-bold">505</span></div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="bg-eleven/20 border-l-4 border-eleven p-4"
                        >
                            <div className="text-green-500 mb-2">// Decode output</div>
                            <div>Traverse remaining nodes → Decode the string</div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-8 pt-6 border-t border-mindflayer/50"
                    >
                        <div className="text-green-500 text-sm">
                            &gt; Submit decoded string (uppercase)
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }
}

export default Phase3;
