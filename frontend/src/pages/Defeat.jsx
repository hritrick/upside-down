import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useGameStore from '../store/GameStore';

const Defeat = () => {
    const navigate = useNavigate();
    const { teamCode, totalPoints, resetGame } = useGameStore();

    const handleTryAgain = () => {
        resetGame();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-void">
            {/* Red Background Glow */}
            <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="max-w-3xl w-full text-center z-10"
            >
                {/* Title */}
                <motion.h1
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                    className="text-7xl font-bold mb-8 tracking-wider text-gate"
                    style={{
                        fontFamily: 'serif',
                        textShadow: '0 0 40px #ff0000, 0 0 60px #ff0000'
                    }}
                >
                    ✗ PROTOCOL FAILED
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl mb-12 text-gate-light"
                    style={{ fontFamily: 'serif' }}
                >
                    The Mind Flayer has won...
                </motion.p>

                {/* Stats Card */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-void border-4 border-gate p-12 mb-8 shadow-[0_0_40px_rgba(139,0,0,0.5)]"
                >
                    <div className="space-y-6 font-mono">
                        <div>
                            <p className="text-gray-400 text-lg mb-2">TEAM CODE</p>
                            <p className="text-4xl text-gate-light font-bold tracking-widest">
                                {teamCode || '####'}
                            </p>
                        </div>

                        <div className="border-t-2 border-red-900/50 pt-6">
                            <p className="text-gray-400 text-lg mb-2">TOTAL POINTS</p>
                            <p className="text-4xl text-gate-light font-bold">
                                {totalPoints || 0}
                            </p>
                            <p className="text-gray-500 text-sm mt-3">
                                +5 per phase • -2 per hint • -3 for role swap
                            </p>
                        </div>

                        <div className="border-t-2 border-red-900/50 pt-6">
                            <p className="text-gate text-xl animate-pulse">
                                CONNECTION TERMINATED
                            </p>
                            <p className="text-gray-500 mt-2">
                                The timer expired before the protocol could be completed.
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
                        onClick={handleTryAgain}
                        className="flex-1 px-8 py-4 bg-transparent border-2 border-gate text-gate text-xl font-mono tracking-wider rounded-lg hover:bg-gate hover:text-white transition-all shadow-[0_0_15px_#ff0000]"
                    >
                        TRY AGAIN
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Defeat;
