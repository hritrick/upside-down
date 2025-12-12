import { motion } from 'framer-motion';

function Phase2({ playerRole }) {
    // Hash table: 10 slots (0-9), indices 2 and 5 are blocked
    const tableSize = 10;
    const blockedIndices = [2, 5];
    const keysToInsert = [42, 12, 32];

    return (
        <div className="min-h-full">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-gate mb-8 text-center tracking-wider"
                style={{ fontFamily: 'VT323, monospace' }}
            >
                THE HASH CHAMBER
            </motion.h2>

            {playerRole === 'A' ? (
                // Player A: The Eyes - Sees the Hash Table Grid
                <div className="space-y-8">
                    <div className="text-[#00ffaa] text-2xl font-mono text-center mb-6">
                        🔲 HASH TABLE STORAGE (INDICES 0-9)
                    </div>

                    {/* Hash Table Grid */}
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-10 gap-3">
                            {Array.from({ length: tableSize }).map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`
                                        relative aspect-square flex flex-col items-center justify-center
                                        border-4 rounded-lg font-mono
                                        ${blockedIndices.includes(index)
                                            ? 'bg-red-900/40 border-red-600'
                                            : 'bg-black/60 border-green-500'
                                        }
                                    `}
                                >
                                    {/* Index Label */}
                                    <div className={`text-sm ${blockedIndices.includes(index) ? 'text-red-400' : 'text-gray-400'}`}>
                                        [{index}]
                                    </div>

                                    {/* Content */}
                                    {blockedIndices.includes(index) ? (
                                        <div className="text-4xl text-red-600 font-bold">❌</div>
                                    ) : (
                                        <div className="text-3xl text-green-500">[ ]</div>
                                    )}

                                    {/* Status */}
                                    {blockedIndices.includes(index) && (
                                        <motion.div
                                            animate={{ opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="text-[10px] text-red-500 absolute bottom-1"
                                        >
                                            BLOCKED
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#00ffaa]/10 border-2 border-[#00ffaa] p-6 rounded-lg max-w-3xl mx-auto">
                        <div className="text-[#00ffaa] text-xl font-bold mb-3 font-mono">
                            ⚠️ TABLE STATUS
                        </div>
                        <div className="text-white font-mono space-y-2">
                            • Total slots: <span className="text-[#00ffaa]">10 (0-9)</span><br />
                            • Blocked slots: <span className="text-red-500">Index 2, Index 5</span><br />
                            • Available slots: <span className="text-green-500">8</span>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono">
                        ⚠️ DESCRIBE THE TABLE LAYOUT TO YOUR PARTNER
                    </div>
                </div>
            ) : (
                // Player B: The Brain - Gets the Insertion Rules
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="text-[#ff0055] text-2xl font-mono text-center mb-6">
                        🧠 INSERTION PROTOCOL
                    </div>

                    {/* Keys to Insert */}
                    <div className="bg-black/60 border-4 border-[#00ffaa] p-6 rounded-lg">
                        <div className="text-xl text-[#00ffaa] font-bold mb-4 font-mono">
                            KEYS TO INSERT (IN ORDER):
                        </div>
                        <div className="bg-black p-6 rounded text-center">
                            <div className="text-5xl text-green-500 font-mono font-bold">
                                [ {keysToInsert.join(', ')} ]
                            </div>
                        </div>
                    </div>

                    {/* Hash Rule */}
                    <div className="bg-black/60 border-4 border-[#ff0055] p-6 rounded-lg">
                        <div className="text-2xl text-[#ff0055] font-bold mb-4 text-center font-mono">
                            HASH FUNCTION
                        </div>
                        <div className="bg-black p-6 rounded text-center">
                            <div className="text-4xl text-yellow-500 font-mono font-bold">
                                Index = Key % 10
                            </div>
                            <div className="text-sm text-gray-400 mt-4">
                                Example: 42 % 10 = 2
                            </div>
                        </div>
                    </div>

                    {/* Collision Protocol */}
                    <div className="bg-black/60 border-4 border-red-500 p-8 rounded-lg">
                        <div className="text-2xl text-red-500 font-bold mb-4 text-center font-mono">
                            ⚠️ COLLISION RESOLUTION
                        </div>
                        <div className="bg-black p-6 rounded space-y-4">
                            <div className="text-xl text-white font-mono text-center">
                                QUADRATIC PROBING
                            </div>
                            <div className="text-3xl text-[#00ffaa] font-bold text-center font-mono">
                                (Base_Index + n²) % 10
                            </div>
                            <div className="text-sm text-gray-400 mt-4 space-y-2">
                                <div>• n = attempt number (1, 2, 3...)</div>
                                <div>• If slot is blocked or occupied, try next n</div>
                                <div className="text-yellow-500 mt-2">
                                    Example: If base=2 is blocked:<br />
                                    Try (2 + 1²) % 10 = 3<br />
                                    Try (2 + 2²) % 10 = 6<br />
                                    Try (2 + 3²) % 10 = 1...
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="bg-black/60 border-4 border-green-500 p-6 rounded-lg">
                        <div className="text-xl text-green-500 font-bold mb-4 text-center font-mono">
                            📝 THE QUESTION
                        </div>
                        <div className="text-white font-mono text-lg text-center">
                            After inserting all 3 keys using the rules above,<br />
                            <span className="text-[#ff0055] text-2xl font-bold">
                                what is the FINAL INDEX of key 32?
                            </span>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono text-lg mt-6">
                        📝 SUBMIT FORMAT: Integer
                    </div>
                </div>
            )}
        </div>
    );
}

export default Phase2;
