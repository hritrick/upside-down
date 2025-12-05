import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const Victory = () => {
    const { completionTime, players, resetGame } = useGame();
    const navigate = useNavigate();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayAgain = () => {
        resetGame();
        navigate('/');
    };

    const handleViewLeaderboard = () => {
        navigate('/leaderboard');
    };

    return (
        <div className="min-h-screen grid-bg flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="max-w-3xl w-full text-center"
            >
                {/* Victory Title */}
                <motion.h1
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                    className="text-8xl font-bold text-terminal mb-8 tracking-wider"
                    style={{ textShadow: '0 0 40px #00ff41' }}
                >
                    🎉 VICTORY! 🎉
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl text-cyber mb-12"
                >
                    Mission Accomplished!
                </motion.p>

                {/* Stats Card */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-void border-2 border-terminal p-12 mb-8"
                    style={{ boxShadow: '0 0 40px rgba(0, 255, 65, 0.5)' }}
                >
                    <div className="space-y-6">
                        <div>
                            <p className="text-gray-400 text-lg mb-2">TEAM</p>
                            <p className="text-4xl text-terminal font-bold">
                                {players.player1} & {players.player2}
                            </p>
                        </div>

                        <div className="border-t-2 border-gray-700 pt-6">
                            <p className="text-gray-400 text-lg mb-2">COMPLETION TIME</p>
                            <p className="text-5xl text-cyber font-bold">
                                {completionTime ? formatTime(completionTime) : '0:00'}
                            </p>
                        </div>

                        <div className="border-t-2 border-gray-700 pt-6">
                            <p className="text-terminal text-xl">
                                You successfully navigated the chaos of March 2020!
                            </p>
                            <p className="text-gray-400 mt-2">
                                All groceries acquired. Price key validated. Lockdown survived.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex gap-4"
                >
                    <button
                        onClick={handlePlayAgain}
                        className="btn-terminal flex-1 text-xl py-4"
                    >
                        PLAY AGAIN
                    </button>
                    <button
                        onClick={handleViewLeaderboard}
                        className="btn-cyber flex-1 text-xl py-4"
                    >
                        LEADERBOARD
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Victory;
