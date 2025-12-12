import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const Home = () => {
    const [player1, setPlayer1] = useState('');
    const [showRules, setShowRules] = useState(false);
    const { startGame } = useGame();
    const navigate = useNavigate();

    const handleStartGame = async () => {
        try {
            const p1 = player1.trim() || 'Solo Player';

            await startGame(p1);
            navigate('/game');
        } catch (error) {
            alert('Failed to start game. Please try again.');
        }
    };

    return (
        <div className="min-h-screen grid-bg flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full"
            >
                {/* Title */}
                <motion.div
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-7xl font-bold text-gate mb-4 tracking-wider" style={{ textShadow: '0 0 20px #8B0000', fontFamily: 'Bebas Neue, Space Mono, monospace' }}>
                        STRANGER THINGS
                    </h1>
                    <h2 className="text-4xl text-eleven mb-2" style={{ fontFamily: 'Bebas Neue, Space Mono, monospace' }}>
                        THE ALGORITHM HUNT
                    </h2>
                    <p className="text-2xl text-mindflayer">
                        Close the Gate Before It's Too Late
                    </p>
                    <p className="text-lg text-gray-400 mt-2">
                        A Solo Algorithm Challenge
                    </p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-void border-2 border-gate p-8"
                    style={{ boxShadow: '0 0 30px rgba(139, 0, 0, 0.3)' }}
                >
                    {/* Player Input */}
                    <div className="mb-8">
                        <label className="block text-gate mb-2 font-bold">YOUR NAME</label>
                        <input
                            type="text"
                            value={player1}
                            onChange={(e) => setPlayer1(e.target.value)}
                            placeholder="Enter your name..."
                            className="w-full bg-void border-2 border-gate text-gate px-4 py-3 focus:outline-none focus:border-gate-light transition-colors"
                        />
                    </div>

                    {/* Start Button */}
                    <button
                        onClick={handleStartGame}
                        className="btn-primary w-full text-xl py-4 mb-6"
                    >
                        START MISSION
                    </button>

                    {/* Rules Toggle */}
                    <button
                        onClick={() => setShowRules(!showRules)}
                        className="w-full text-center text-mindflayer hover:text-mindflayer-light transition-colors mb-4"
                    >
                        {showRules ? '▼ HIDE RULES' : '▶ VIEW RULES'}
                    </button>

                    {/* Rules */}
                    {showRules && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="border-2 border-mindflayer p-6 space-y-4 text-sm"
                        >
                            <h3 className="text-mindflayer font-bold text-lg mb-3">MISSION BRIEFING</h3>

                            <div className="space-y-3 text-gray-300">
                                <p><strong className="text-gate">OBJECTIVE:</strong> Complete 4 algorithm challenges to find the Memory Key and close the Gate to the Upside Down.</p>

                                <p><strong className="text-gate">TIME LIMIT:</strong> 20:00 minutes for all 4 phases.</p>

                                <p><strong className="text-gate">GAMEPLAY:</strong> Solo challenge - complete all four phases to win.</p>

                                <div className="pl-4 space-y-2">
                                    <p><strong className="text-mindflayer">Phase 1:</strong> Escape the Gate - Find shortest route from Mike's House to Starcourt Basement (Dijkstra's Algorithm)</p>
                                    <p><strong className="text-mindflayer">Phase 2:</strong> Navigate the Upside Down Maze to find the Core Node (DFS/BFS)</p>
                                    <p><strong className="text-mindflayer">Phase 3:</strong> Restore Eleven's Memory Fragments by sorting them chronologically (Sorting)</p>
                                    <p><strong className="text-mindflayer">Phase 4:</strong> Find "Mom" memory to close the Gate, track psychic energy cost (Binary Search)</p>
                                </div>

                                <p><strong className="text-eleven">VICTORY:</strong> Submit correct Energy Key (concatenated energy costs from Phase 4)</p>

                                <p><strong className="text-gate">CODE:</strong> Write algorithm code in Python, C, or Java (60-70% starter code provided)</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Additional Buttons */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => navigate('/leaderboard')}
                            className="btn-cyber flex-1"
                        >
                            LEADERBOARD
                        </button>
                    </div>
                </motion.div>

                {/* Footer */}
                <p className="text-center text-gray-500 mt-8">
                    For Hawkins. For Eleven. For the world above.
                </p>
            </motion.div>
        </div>
    );
};

export default Home;
