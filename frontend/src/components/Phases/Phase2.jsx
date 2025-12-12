import { motion } from 'framer-motion';

function Phase2({ playerRole }) {
    // Rotated sorted array - originally [12, 19, 23, 40, 55, 61, 70, 85], rotated at index 4
    const rotatedArray = [55, 61, 70, 85, 12, 19, 23, 40];
    const target = 19;

    return (
        <div className="min-h-full">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-gate mb-8 text-center tracking-wider"
                style={{ fontFamily: 'serif' }}
            >
                THE ROTATED VAULT
            </motion.h2>

            {playerRole === 'A' ? (
                // Player A: The Eyes - Sees the Array Without Indices
                <div className="space-y-8">
                    <div className="text-mindflayer text-2xl font-mono text-center mb-6">
                        🔐 VAULT SEQUENCE (NO INDEX LABELS)
                    </div>

                    <div className="flex gap-4 justify-center items-end max-w-5xl mx-auto">
                        {rotatedArray.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Value Display */}
                                <motion.div
                                    whileHover={{ scale: 1.1, boxShadow: '0 0 30px #8B0000' }}
                                    className="bg-black/60 border-4 border-gate p-6 rounded-lg"
                                    style={{
                                        height: `${(value / 85) * 200 + 100}px`,
                                        minWidth: '80px'
                                    }}
                                >
                                    <div className="text-4xl text-green-500 font-mono text-center"
                                        style={{ fontFamily: 'Source Code Pro, Consolas, monospace' }}>
                                        {value}
                                    </div>
                                </motion.div>

                                {/* Position Marker (NOT index) */}
                                <div className="text-center mt-2 text-gray-400 font-mono text-lg">
                                    POS {index + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <div className="text-gate text-3xl font-bold font-mono mb-2">
                            TARGET VALUE: {target}
                        </div>
                        <div className="text-gray-400 font-mono">
                            ⚠️ INDICES ARE HIDDEN - YOU MUST MENTALLY MAP POSITIONS
                        </div>
                    </div>
                </div>
            ) : (
                // Player B: The Brain - Gets the Search Algorithm
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="text-mindflayer text-2xl font-mono text-center mb-6">
                        🧠 SEARCH PROTOCOL
                    </div>

                    <div className="bg-black/60 border-4 border-green-500 p-6 rounded-lg text-center mb-6">
                        <div className="text-lg text-gray-400 font-mono mb-2">TARGET TO FIND:</div>
                        <div className="text-7xl font-bold text-green-500 font-mono">{target}</div>
                    </div>

                    <div className="space-y-4 text-white font-mono">
                        <div className="bg-mindflayer/20 p-6 rounded-lg border-2 border-mindflayer">
                            <div className="text-2xl text-mindflayer font-bold mb-4">⚠️ ALGORITHM</div>
                            <div className="space-y-3 text-lg">
                                <div>This is a <span className="text-red-500 font-bold">ROTATED SORTED ARRAY</span></div>
                                <div>It was originally sorted, then rotated at some pivot point</div>
                                <div className="text-gray-400 text-sm">Example: [12,19,23,40,55,61,70,85] → [55,61,70,85,12,19,23,40]</div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-lg border-2 border-gate space-y-3">
                            <div className="text-xl text-gate font-bold">STEP 1: Find the Pivot</div>
                            <div>• Compare LEFT value with RIGHT value</div>
                            <div>• If LEFT &gt; RIGHT, the pivot is somewhere in middle</div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-lg border-2 border-gate space-y-3">
                            <div className="text-xl text-gate font-bold">STEP 2: Determine Which Half to Search</div>
                            <div>• Compare MID value with target</div>
                            <div>• Check if MID to RIGHT is sorted (MID &lt; RIGHT)</div>
                            <div>• If target is in the sorted half, search there</div>
                            <div>• Else search the rotated half</div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-lg border-2 border-green-500">
                            <div className="text-xl text-green-500 font-bold">STEP 3: Submit the INDEX</div>
                            <div>• Your partner can only see POSITIONS (1, 2, 3...)</div>
                            <div>• You need to convert: <span className="text-yellow-500">Position N = Index (N-1)</span></div>
                            <div>• <span className="text-red-500">Submit the INDEX (0-7)</span>, not the position!</div>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono text-lg mt-6">
                        📝 SUBMIT FORMAT: Single digit (0-7)
                    </div>
                </div>
            )}
        </div>
    );
}

export default Phase2;
