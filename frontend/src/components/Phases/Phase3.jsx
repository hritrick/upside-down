import { motion } from 'framer-motion';

function Phase3({ playerRole }) {
    // Process-Resource Graph
    const processes = [
        { id: 1, holds: 'R1', waits: 'R2' },
        { id: 2, holds: 'R2', waits: 'R3' },
        { id: 3, holds: 'R3', waits: 'R1' },
        { id: 4, holds: 'R4', waits: 'R2' }, // Distractor - not in cycle
    ];

    return (
        <div className="min-h-full">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-gate mb-8 text-center tracking-wider"
                style={{ fontFamily: 'serif' }}
            >
                THE MEMORY LEAK
            </motion.h2>

            {playerRole === 'A' ? (
                // Player A: The Eyes - Sees the Process-Resource Table
                <div className="space-y-8 max-w-4xl mx-auto">
                    <div className="text-mindflayer text-2xl font-mono text-center mb-6">
                        💾 RESOURCE ALLOCATION TABLE
                    </div>

                    <div className="bg-black/60 border-4 border-gate p-8 rounded-lg">
                        <table className="w-full text-center font-mono">
                            <thead>
                                <tr className="border-b-2 border-gate">
                                    <th className="text-2xl text-green-500 p-4">PROCESS</th>
                                    <th className="text-2xl text-yellow-500 p-4">HOLDS</th>
                                    <th className="text-2xl text-red-500 p-4">WAITS FOR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {processes.map((proc, index) => (
                                    <motion.tr
                                        key={proc.id}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.15 }}
                                        className="border-b border-gray-700"
                                    >
                                        <td className="text-4xl text-green-500 p-6 font-bold">
                                            P{proc.id}
                                        </td>
                                        <td className="text-4xl text-yellow-500 p-6">
                                            {proc.holds}
                                        </td>
                                        <td className="text-4xl text-red-500 p-6">
                                            {proc.waits}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center font-mono">
                        <div className="bg-green-500/20 border-2 border-green-500 p-4 rounded">
                            <div className="text-green-500 text-lg mb-2">PROCESS</div>
                            <div className="text-sm text-gray-400">Running program</div>
                        </div>
                        <div className="bg-yellow-500/20 border-2 border-yellow-500 p-4 rounded">
                            <div className="text-yellow-500 text-lg mb-2">HOLDS</div>
                            <div className="text-sm text-gray-400">Resource currently locked</div>
                        </div>
                        <div className="bg-red-500/20 border-2 border-red-500 p-4 rounded col-span-2">
                            <div className="text-red-500 text-lg mb-2">WAITS FOR</div>
                            <div className="text-sm text-gray-400">Resource needed to proceed</div>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono">
                        ⚠️ DESCRIBE THE DEPENDENCY CHAIN TO YOUR PARTNER
                    </div>
                </div>
            ) : (
                // Player B: The Brain - Gets the Cycle Detection Formula
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="text-mindflayer text-2xl font-mono text-center mb-6">
                        🧠 DEADLOCK DETECTION PROTOCOL
                    </div>

                    <div className="bg-black/60 border-4 border-red-500 p-8 rounded-lg">
                        <div className="text-3xl text-red-500 font-bold mb-6 text-center font-mono">
                            ⚠️ SYSTEM DEADLOCK DETECTED
                        </div>
                        <div className="text-gray-300 text-lg font-mono text-center">
                            One or more processes are in a circular wait state
                        </div>
                    </div>

                    <div className="space-y-4 text-white font-mono">
                        <div className="bg-mindflayer/20 p-6 rounded-lg border-2 border-mindflayer">
                            <div className="text-2xl text-mindflayer font-bold mb-4">TASK</div>
                            <div className="space-y-3 text-lg">
                                <div>1. Identify the <span className="text-red-500 font-bold">CIRCULAR DEPENDENCY LOOP</span></div>
                                <div>2. Find which processes are in the deadlock</div>
                                <div>3. Calculate the "kill cost" using the formula below</div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-lg border-2 border-gate">
                            <div className="text-xl text-gate font-bold mb-4">WHAT IS A CIRCULAR DEPENDENCY?</div>
                            <div className="space-y-2 text-lg">
                                <div>• Process A waits for Resource X</div>
                                <div>• Resource X is held by Process B</div>
                                <div>• Process B waits for Resource Y</div>
                                <div>• Resource Y is held by Process A</div>
                                <div className="text-red-500 mt-2">→ Deadlock! Neither can proceed.</div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-lg border-2 border-yellow-500">
                            <div className="text-xl text-yellow-500 font-bold mb-4">⚠️ DISTRACTOR WARNING</div>
                            <div className="text-lg">
                                Not all processes may be in the loop!
                            </div>
                            <div className="text-sm text-gray-400 mt-2">
                                A process that waits for a resource in the loop but isn't waited on by the loop is <span className="text-red-500">NOT part of the cycle</span>
                            </div>
                        </div>

                        <div className="bg-black/40 p-8 rounded-lg border-4 border-green-500">
                            <div className="text-2xl text-green-500 font-bold mb-4 text-center">KILL COST FORMULA</div>
                            <div className="bg-black p-6 rounded text-3xl text-center text-yellow-500 font-bold mb-4">
                                (Sum of Process IDs in Cycle) × (Number of Nodes)
                            </div>
                            {/* <div className="text-lg text-gray-400 text-center">
                                Example: If P1, P2, P3 are in the cycle:<br />
                                (1 + 2 + 3) × 3 = <span className="text-green-500 font-bold">18</span>
                            </div> */}
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono text-lg mt-6">
                        📝 SUBMIT FORMAT: Integer (e.g., "73")
                    </div>
                </div>
            )}
        </div>
    );
}

export default Phase3;
