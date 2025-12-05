import { motion } from 'framer-motion';

const PlayerWaitingScreen = ({ currentPlayer, phase }) => {
    const otherPlayer = currentPlayer === 1 ? 2 : 1;
    const playerName = currentPlayer === 1 ? 'Player 1' : 'Player 2';

    const phaseNames = {
        1: 'The Race Against Time (Dijkstra\'s Algorithm)',
        2: 'The Maze (DFS)',
        3: 'The Chaos (Sorting)',
        4: 'The Hunt for Maggi (Binary Search)'
    };

    return (
        <div className="min-h-screen bg-void flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full text-center"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="mb-8"
                >
                    <div className="text-8xl mb-6">⏳</div>
                </motion.div>

                <h2 className="text-5xl font-bold text-cyber mb-6">
                    PHASE {phase} IN PROGRESS
                </h2>

                <p className="text-2xl text-terminal mb-4">
                    {phaseNames[phase]}
                </p>

                <div className="bg-void border-2 border-terminal p-8 mb-6" style={{ boxShadow: '0 0 30px rgba(0, 255, 65, 0.3)' }}>
                    <p className="text-xl text-gray-300 mb-4">
                        <strong className="text-cyber">{playerName}</strong> is currently working on this phase.
                    </p>
                    <p className="text-lg text-gray-400">
                        Please wait for them to complete the challenge...
                    </p>
                </div>

                <motion.div
                    animate={{
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity
                    }}
                    className="text-terminal text-sm"
                >
                    You'll be up next for Phase {phase + 1}!
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PlayerWaitingScreen;
