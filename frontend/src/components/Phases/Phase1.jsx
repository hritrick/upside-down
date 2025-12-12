import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Phase1({ playerRole }) {
    const [currentRule, setCurrentRule] = useState(1);
    const [timer, setTimer] = useState(30);

    // Hex values with their Hamming weights (for reference)
    const hexValues = [
        { hex: '0x1A', binary: '00011010', hamming: 3 },
        { hex: '0xFF', binary: '11111111', hamming: 8 },
        { hex: '0xB2', binary: '10110010', hamming: 4 },
        { hex: '0x0C', binary: '00001100', hamming: 2 },
        { hex: '0x7E', binary: '01111110', hamming: 6 },
        { hex: '0x33', binary: '00110011', hamming: 4 },
    ];

    // Rule switching timer
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setCurrentRule((rule) => (rule === 1 ? 2 : 1));
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    return (
        <div className="min-h-full">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-gate mb-8 text-center tracking-wider"
                style={{ fontFamily: 'serif' }}
            >
                THE RUSSIAN CODE
            </motion.h2>

            {playerRole === 'A' ? (
                // Player A: The Eyes - Sees the Hex Codes
                <div className="space-y-8">
                    <div className="text-mindflayer text-2xl font-mono text-center mb-6">
                        📊 ENCRYPTED DATA STREAM
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {hexValues.map((item, index) => (
                            <motion.div
                                key={item.hex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px #8B0000' }}
                                className="bg-black/60 border-4 border-gate p-8 rounded-lg relative"
                            >
                                <div className="text-6xl text-green-500 font-mono text-center mb-4"
                                    style={{ fontFamily: 'Source Code Pro, Consolas, monospace' }}>
                                    {item.hex}
                                </div>
                                <div className="text-gray-400 text-sm text-center font-mono">
                                    VALUE: {parseInt(item.hex, 16)}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-8 text-gray-400 font-mono">
                        ⚠️ DESCRIBE THESE CODES TO YOUR PARTNER
                    </div>
                </div>
            ) : (
                // Player B: The Brain - Sees the Sorting Rules
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="text-mindflayer text-2xl font-mono text-center mb-6">
                        🧠 DECRYPTION PROTOCOL
                    </div>

                    {/* Rule Timer */}
                    <motion.div
                        className="bg-black/60 border-4 border-mindflayer p-6 rounded-lg text-center"
                        animate={{
                            borderColor: timer <= 5 ? ['#6A0DAD', '#ff0000', '#6A0DAD'] : '#6A0DAD'
                        }}
                        transition={{ duration: 0.5, repeat: timer <= 5 ? Infinity : 0 }}
                    >
                        <div className="text-lg text-gray-400 font-mono mb-2">RULE CHANGE IN:</div>
                        <div className="text-6xl font-bold text-mindflayer font-mono">{timer}s</div>
                    </motion.div>

                    {/* Current Rule */}
                    <motion.div
                        key={currentRule}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-black/60 border-4 border-green-500 p-8 rounded-lg"
                    >
                        <div className="text-3xl text-green-500 font-bold mb-6 text-center font-mono">
                            ACTIVE RULE: {currentRule}
                        </div>

                        {currentRule === 1 ? (
                            <div className="space-y-4 text-white text-xl font-mono">
                                <div className="bg-mindflayer/20 p-4 rounded">
                                    <strong className="text-mindflayer">STEP 1:</strong> Convert each HEX to BINARY
                                </div>
                                <div className="bg-mindflayer/20 p-4 rounded">
                                    <strong className="text-mindflayer">STEP 2:</strong> Count the number of 1-bits (Hamming Weight)
                                </div>
                                <div className="bg-mindflayer/20 p-4 rounded">
                                    <strong className="text-mindflayer">STEP 3:</strong> Sort by Hamming Weight: <span className="text-red-500">DESCENDING</span>
                                </div>
                                <div className="text-sm text-gray-400 mt-4 text-center">
                                    Example: 0xFF = 11111111 → 8 ones
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 text-white text-xl font-mono">
                                <div className="bg-mindflayer/20 p-4 rounded">
                                    <strong className="text-mindflayer">STEP 1:</strong> Compare HEX values numerically
                                </div>
                                <div className="bg-mindflayer/20 p-4 rounded">
                                    <strong className="text-mindflayer">STEP 2:</strong> Sort by Hex Value: <span className="text-green-500">ASCENDING</span>
                                </div>
                                <div className="text-sm text-gray-400 mt-4 text-center">
                                    Example: 0x0C &lt; 0x1A &lt; 0x33...
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <div className="text-center text-gray-400 font-mono text-lg">
                        📝 SUBMIT FORMAT: "0xFF, 0x7E, 0xB2, 0x33, 0x1A, 0x0C"
                    </div>
                </div>
            )}
        </div>
    );
}

export default Phase1;
