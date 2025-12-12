import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';
import useGameStore from '../store/GameStore';

function Lobby() {
    const navigate = useNavigate();
    const socket = useSocket();
    const { setTeamInfo, setBothPlayersConnected, setGameState } = useGameStore();

    const [showJoinModal, setShowJoinModal] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [createdTeamCode, setCreatedTeamCode] = useState(null);
    const [error, setError] = useState('');
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        // Listen for both players connected
        socket.on('both_players_connected', ({ currentPhase, timerSeconds }) => {
            setSyncing(true);
            setBothPlayersConnected();
            setGameState(currentPhase, timerSeconds, 'playing');

            // Navigate to game after animation
            setTimeout(() => {
                navigate('/game');
            }, 2000);
        });

        return () => {
            socket.off('both_players_connected');
        };
    }, [socket, navigate, setBothPlayersConnected, setGameState]);

    const handleCreateTeam = () => {
        socket.emit('create_team', (response) => {
            if (response.success) {
                setTeamInfo(response.teamCode, response.playerRole);
                setCreatedTeamCode(response.teamCode);
                setError('');
            } else {
                setError(response.error || 'Failed to create team');
            }
        });
    };

    const handleJoinTeam = () => {
        if (!joinCode || joinCode.length !== 4) {
            setError('Please enter a valid 4-digit code');
            return;
        }

        socket.emit('join_team', { teamCode: joinCode }, (response) => {
            if (response.success) {
                setTeamInfo(response.teamCode, response.playerRole);
                setShowJoinModal(false);
                setError('');
            } else {
                setError(response.error || 'Failed to join team');
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Syncing Animation */}
            <AnimatePresence>
                {syncing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-void z-50 flex flex-col items-center justify-center"
                    >
                        <motion.div
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [0.98, 1.02, 0.98]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-gate text-4xl font-mono tracking-wider"
                        >
                            SYNCING NEURAL LINK...
                        </motion.div>
                        <div className="w-64 h-2 bg-gate/20 mt-8 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5 }}
                                className="h-full bg-gate shadow-[0_0_10px_#8B0000]"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Lobby Content */}
            <div className="text-center z-10 px-4">
                {/* Title with Flicker Effect */}
                <motion.h1
                    animate={{
                        opacity: [1, 0.9, 1, 0.95, 1],
                        textShadow: [
                            '0 0 20px #ff0000, 0 0 40px #ff0000',
                            '0 0 10px #ff0000, 0 0 20px #ff0000',
                            '0 0 20px #ff0000, 0 0 40px #ff0000'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-6xl md:text-8xl font-bold text-gate mb-4 tracking-wider"
                    style={{ fontFamily: 'serif' }}
                >
                    THE UPSIDE DOWN
                </motion.h1>
                <motion.h2
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-3xl md:text-5xl font-bold text-mindflayer mb-12 tracking-widest"
                    style={{ fontFamily: 'serif' }}
                >
                    PROTOCOL
                </motion.h2>

                {/* Waiting for Partner */}
                {createdTeamCode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-6 border-2 border-gate rounded-lg bg-gate/5"
                    >
                        <div className="text-gate text-xl font-mono mb-2">TEAM CODE:</div>
                        <div className="text-5xl font-bold text-gate tracking-widest mb-4">
                            {createdTeamCode}
                        </div>
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-mindflayer font-mono"
                        >
                            WAITING FOR PARTNER...
                        </motion.div>
                    </motion.div>
                )}

                {/* Action Buttons */}
                {!createdTeamCode && (
                    <div className="flex flex-col gap-6 items-center">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px #ff0000' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCreateTeam}
                            className="px-12 py-4 bg-gate border-2 border-gate text-white text-2xl font-mono tracking-wider rounded-lg shadow-[0_0_15px_#8B0000] hover:bg-gate-light transition-all"
                        >
                            CREATE TEAM
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px #6A0DAD' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowJoinModal(true)}
                            className="px-12 py-4 bg-mindflayer border-2 border-mindflayer text-white text-2xl font-mono tracking-wider rounded-lg shadow-[0_0_15px_#6A0DAD] hover:bg-mindflayer-light transition-all"
                        >
                            JOIN TEAM
                        </motion.button>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 text-red-500 font-mono text-xl"
                    >
                        ⚠ {error}
                    </motion.div>
                )}
            </div>

            {/* Join Modal */}
            <AnimatePresence>
                {showJoinModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-40"
                        onClick={() => setShowJoinModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-void border-4 border-mindflayer p-8 rounded-lg shadow-[0_0_30px_#6A0DAD] max-w-md w-full mx-4"
                        >
                            <h3 className="text-3xl font-mono text-mindflayer mb-6">ENTER TEAM CODE</h3>
                            <input
                                type="text"
                                maxLength={4}
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                placeholder="####"
                                className="w-full px-6 py-4 bg-black border-2 border-mindflayer text-mindflayer text-center text-4xl font-mono tracking-widest rounded focus:outline-none focus:border-mindflayer-light focus:shadow-[0_0_20px_#6A0DAD]"
                                autoFocus
                            />
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleJoinTeam}
                                    className="flex-1 px-6 py-3 bg-mindflayer text-white font-mono text-xl rounded hover:bg-mindflayer-light transition-colors"
                                >
                                    JOIN
                                </button>
                                <button
                                    onClick={() => {
                                        setShowJoinModal(false);
                                        setError('');
                                    }}
                                    className="flex-1 px-6 py-3 bg-gray-700 text-white font-mono text-xl rounded hover:bg-gray-600 transition-colors"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Lobby;
