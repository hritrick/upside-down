import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Phase2({ playerRole }) {
    const [showHint, setShowHint] = useState(false);

    // The 5x5 matrix (row-wise and column-wise sorted)
    const matrix = [
        [10, 20, 30, 40, 50],
        [15, 25, 35, 45, 55],
        [27, 37, 47, 57, 67],
        [32, 42, 52, 62, 72],
        [38, 48, 58, 68, 78]
    ];

    const target = 47;

    // Mask function: shows like "4?" for value 47
    const maskValue = (value) => {
        const str = String(value);
        return str.charAt(0) + '{?}';
    };

    return (
        <div className="min-h-full">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-gate mb-8 text-center tracking-wider"
                style={{ fontFamily: 'serif' }}
            >
                THE GLITCHED MATRIX
            </motion.h2>

            {playerRole === 'A' ? (
                // Player A: The Eyes - Sees the Masked Matrix
                <div className="space-y-8">
                    <div className="text-mindflayer text-2xl font-mono text-center mb-6">
                        🔲 CORRUPTED DATA GRID
                    </div>

                    <div className="bg-black/60 border-4 border-gate p-8 rounded-lg max-w-3xl mx-auto">
                        {/* Matrix Grid */}
                        <div className="grid grid-cols-5 gap-3">
                            {matrix.map((row, rowIndex) => (
                                row.map((value, colIndex) => (
                                    <motion.div
                                        key={`${rowIndex}-${colIndex}`}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (rowIndex * 5 + colIndex) * 0.03 }}
                                        whileHover={{ scale: 1.1, boxShadow: '0 0 25px #8B0000' }}
                                        className="bg-black/80 border-2 border-green-500 p-4 rounded aspect-square flex items-center justify-center relative"
                                    >
                                        <div className="text-3xl font-mono text-green-500 font-bold"
                                            style={{ fontFamily: 'Source Code Pro, Consolas, monospace' }}>
                                            {maskValue(value)}
                                        </div>
                                        {/* No row/col labels for Player A */}
                                    </motion.div>
                                ))
                            ))}
                        </div>
                    </div>

                    <div className="bg-red-500/20 border-2 border-red-500 p-6 rounded-lg max-w-3xl mx-auto">
                        <div className="text-red-500 text-2xl font-bold mb-3 text-center font-mono">
                            ⚠️ DATA CORRUPTION DETECTED
                        </div>
                        <div className="text-white font-mono text-lg">
                            • All values are MASKED with {'{?}'}<br />
                            • Grid structure: 5 rows × 5 columns<br />
                            • Each cell shows first digit + {'{?}'}
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => setShowHint(!showHint)}
                            className="bg-mindflayer border-2 border-mindflayer px-6 py-3 rounded font-mono text-white hover:bg-mindflayer/80"
                        >
                            {showHint ? 'HIDE' : 'SHOW'} COORDINATE SYSTEM
                        </button>

                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 bg-black/60 border-2 border-yellow-500 p-4 rounded-lg max-w-md mx-auto font-mono text-sm text-yellow-500"
                            >
                                Grid positions: Row 0-4, Column 0-4<br />
                                Format: (Row, Column)<br />
                                Top-Left = (0,0), Top-Right = (0,4)
                            </motion.div>
                        )}
                    </div>

                    <div className="text-center text-gray-400 font-mono">
                        ⚠️ DESCRIBE CELL POSITIONS AND VALUES TO YOUR PARTNER
                    </div>
                </div>
            ) : (
                // Player B: The Brain - Gets the Decryption Formula and Algorithm
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="text-mindflayer text-2xl font-mono text-center mb-6">
                        🧠 DECRYPTION PROTOCOL
                    </div>

                    {/* Target */}
                    <div className="bg-black/60 border-4 border-green-500 p-6 rounded-lg text-center">
                        <div className="text-lg text-gray-400 font-mono mb-2">TARGET VALUE:</div>
                        <div className="text-7xl font-bold text-green-500 font-mono">{target}</div>
                    </div>

                    {/* Decryption Key */}
                    <div className="bg-black/60 border-4 border-yellow-500 p-6 rounded-lg">
                        <div className="text-2xl text-yellow-500 font-bold mb-4 text-center font-mono">
                            🔑 DECRYPTION KEY
                        </div>
                        <div className="bg-black p-6 rounded text-center">
                            <div className="text-xl text-white font-mono mb-4">
                                Each cell shows: <span className="text-green-500">First_Digit</span>{'{?}'}
                            </div>
                            <div className="text-3xl text-yellow-500 font-bold font-mono">
                                ? = Row + Column
                            </div>
                            <div className="text-sm text-gray-400 mt-4">
                                Example: Cell (2,2) shows "4{'{?}'}"<br />
                                ? = 2 + 2 = 4, but wait... that would be "44"<br />
                                The actual formula calculates the last digit!
                            </div>
                        </div>
                    </div>

                    {/* Matrix Properties */}
                    <div className="bg-mindflayer/20 p-6 rounded-lg border-2 border-mindflayer">
                        <div className="text-2xl text-mindflayer font-bold mb-4">MATRIX PROPERTIES</div>
                        <div className="space-y-3 text-lg text-white font-mono">
                            <div>• Each ROW is sorted (left → right): increasing</div>
                            <div>• Each COLUMN is sorted (top → down): increasing</div>
                            <div>• This allows for efficient staircase search</div>
                        </div>
                    </div>

                    {/* Search Algorithm */}
                    <div className="bg-black/40 p-8 rounded-lg border-4 border-gate">
                        <div className="text-2xl text-gate font-bold mb-4 text-center">STAIRCASE SEARCH ALGORITHM</div>
                        <div className="space-y-4 text-lg text-white font-mono">
                            <div className="bg-green-500/20 p-4 rounded border-2 border-green-500">
                                <strong className="text-green-500">STEP 1:</strong> Start at TOP-RIGHT cell (0,4)
                            </div>
                            <div className="bg-yellow-500/20 p-4 rounded border-2 border-yellow-500">
                                <strong className="text-yellow-500">STEP 2:</strong> Compare current cell value with target:
                                <div className="ml-4 mt-2 text-sm">
                                    • If current &gt; target → Move LEFT (col--)<br />
                                    • If current &lt; target → Move DOWN (row++)<br />
                                    • If current == target → FOUND!
                                </div>
                            </div>
                            <div className="bg-red-500/20 p-4 rounded border-2 border-red-500">
                                <strong className="text-red-500">STEP 3:</strong> Record EVERY step of your path
                            </div>
                        </div>
                    </div>

                    {/* Path Format */}
                    <div className="bg-black/60 border-4 border-green-500 p-6 rounded-lg">
                        <div className="text-xl text-green-500 font-bold mb-4 text-center">PATH SUBMISSION FORMAT</div>
                        <div className="text-white font-mono text-lg space-y-2">
                            <div>Submit the coordinate path you traced:</div>
                            <div className="bg-black p-4 rounded mt-2 text-yellow-500">
                                Format: RC-RC-RC-RC-RC<br />
                                Example: 04-03-02-12-22
                            </div>
                            <div className="text-sm text-gray-400">
                                Where RC = RowColumn (single digits, no separators within coordinate)
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono text-lg mt-6">
                        📝 SUBMIT FORMAT: "04-03-02-12-22"
                    </div>
                </div>
            )}
        </div>
    );
}

export default Phase2;
