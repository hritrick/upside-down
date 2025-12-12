import { motion } from 'framer-motion';

const monsters = [
    { name: 'Demogorgon', power: 80, speed: 60 },
    { name: 'Mind Flayer', power: 95, speed: 20 },
    { name: 'Vecna', power: 95, speed: 10 },
    { name: 'Dart', power: 40, speed: 90 }
];

function Phase1({ playerRole }) {
    if (playerRole === 'A') {
        // THE EYES - Display Monster Cards
        return (
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gate mb-8 text-center tracking-wider"
                    style={{ fontFamily: 'serif' }}
                >
                    THE DEMODOG FORMATION
                </motion.h2>

                <div className="grid grid-cols-2 gap-6">
                    {monsters.map((monster, index) => (
                        <motion.div
                            key={monster.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-6 border-4 border-gate bg-gate/10 rounded-lg relative overflow-hidden group"
                        >
                            {/* Glitch effect on hover */}
                            <div className="absolute inset-0 bg-gate/20 opacity-0 group-hover:opacity-100 group-hover:animate-glitch transition-opacity pointer-events-none" />

                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-gate mb-4 tracking-wide">
                                    {monster.name}
                                </h3>
                                <div className="space-y-2 font-mono text-white">
                                    <div className="flex justify-between items-center">
                                        <span className="text-mindflayer">Power:</span>
                                        <span className="text-2xl font-bold text-gate">{monster.power}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-mindflayer">Speed:</span>
                                        <span className="text-2xl font-bold text-eleven">{monster.speed}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center text-mindflayer font-mono text-lg"
                >
                    📡 Communicate the data to your partner
                </motion.div>
            </div>
        );
    } else {
        // THE BRAIN - Display Instructions
        return (
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-mindflayer mb-8 text-center tracking-wider"
                    style={{ fontFamily: 'serif' }}
                >
                    THE DEMODOG FORMATION
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black border-4 border-mindflayer p-8 rounded-lg font-mono shadow-[0_0_30px_#6A0DAD]"
                >
                    <div className="text-mindflayer text-xl mb-6">
                        <span className="text-gate">▸</span> PROTOCOL DETECTED
                    </div>

                    <div className="space-y-4 text-white text-lg">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-start gap-3"
                        >
                            <span className="text-gate font-bold">1.</span>
                            <span>Sort monsters by <span className="text-gate font-bold">Power</span> (High → Low)</span>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-start gap-3"
                        >
                            <span className="text-gate font-bold">2.</span>
                            <span>If Power is tied → Sort by <span className="text-eleven font-bold">Speed</span> (Low → High)</span>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex items-start gap-3 pt-4 border-t-2 border-mindflayer"
                        >
                            <span className="text-gate font-bold">3.</span>
                            <span className="text-mindflayer">
                                <span className="font-bold">FINAL STEP:</span> Swap Index 1 ↔ Index 3
                            </span>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-8 pt-6 border-t border-mindflayer/50"
                    >
                        <div className="text-green-500 text-sm">
                            &gt; Submit answer format: <span className="text-white">Monster1, Monster2, Monster3, Monster4</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }
}

export default Phase1;
