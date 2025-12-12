import { motion } from 'framer-motion';

const frequencyArray = [10, 25, 32, 45, 59, 63, 78, 81, 99];

function Phase2({ playerRole }) {
    if (playerRole === 'A') {
        // THE EYES - Display Array as Frequency Bars
        return (
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gate mb-8 text-center tracking-wider"
                    style={{ fontFamily: 'serif' }}
                >
                    THE RADIO SIGNAL
                </motion.h2>

                <div className="bg-black border-4 border-gate p-8 rounded-lg">
                    <div className="text-gate text-xl font-mono mb-6 text-center">
                        📻 FREQUENCY ARRAY
                    </div>

                    <div className="flex justify-center items-end gap-4 h-64 mb-8">
                        {frequencyArray.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ height: 0 }}
                                animate={{ height: `${(value / 100) * 100}%` }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="relative flex-1 bg-gradient-to-t from-gate to-mindflayer rounded-t-lg border-2 border-gate/50 group"
                                style={{
                                    minHeight: '40px',
                                    boxShadow: '0 0 15px rgba(139, 0, 0, 0.5)'
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white font-mono font-bold text-xl"
                                >
                                    {value}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-6 font-mono text-white">
                        {frequencyArray.map((value, index) => (
                            <span key={index} className="text-sm">
                                [{value}]
                            </span>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-8 text-center text-mindflayer font-mono text-lg"
                >
                    📡 Relay these frequency values to your partner
                </motion.div>
            </div>
        );
    } else {
        // THE BRAIN - Display Binary Search Instructions
        return (
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-mindflayer mb-8 text-center tracking-wider"
                    style={{ fontFamily: 'serif' }}
                >
                    THE RADIO SIGNAL
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black border-4 border-mindflayer p-8 rounded-lg font-mono shadow-[0_0_30px_#6A0DAD]"
                >
                    <div className="text-mindflayer text-2xl mb-6 text-center">
                        🎯 <span className="text-gate font-bold">TARGET FREQUENCY: 78</span>
                    </div>

                    <div className="space-y-6 text-white text-lg">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="border-2 border-gate p-4 rounded"
                        >
                            <div className="text-gate font-bold mb-2">📋 ALGORITHM:</div>
                            <div className="pl-4">Binary Search</div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="border-2 border-mindflayer p-4 rounded"
                        >
                            <div className="text-mindflayer font-bold mb-2">📝 TASK:</div>
                            <div className="pl-4">
                                Find the <span className="text-gate">MID</span> value at each step of the binary search
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="border-2 border-eleven p-4 rounded"
                        >
                            <div className="text-eleven font-bold mb-2">💡 EXAMPLE:</div>
                            <div className="pl-4 text-sm space-y-1">
                                <div>Step 1: MID = 59</div>
                                <div>Step 2: MID = ...</div>
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
                            &gt; Submit answer format: <span className="text-white">value1, value2</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }
}

export default Phase2;
