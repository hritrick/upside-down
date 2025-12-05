import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const Home = () => {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [showRules, setShowRules] = useState(false);
    const { startGame } = useGame();
    const navigate = useNavigate();

    const handleStartGame = async () => {
        try {
            const p1 = player1.trim() || 'Player 1';
            const p2 = player2.trim() || 'Player 2';

            await startGame(p1, p2);
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
                    <h1 className="text-7xl font-bold text-terminal mb-4 tracking-wider" style={{ textShadow: '0 0 20px #00ff41' }}>
                        PANIC GROCERY RUN
                    </h1>
                    <p className="text-2xl text-cyber">
                        March 2020 Lockdown Challenge
                    </p>
                    <p className="text-lg text-gray-400 mt-2">
                        A Cooperative Algorithm Game for 2 Players
                    </p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-void border-2 border-terminal p-8"
                    style={{ boxShadow: '0 0 30px rgba(0, 255, 65, 0.3)' }}
                >
                    {/* Player Inputs */}
                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="block text-terminal mb-2 font-bold">PLAYER 1 NAME</label>
                            <input
                                type="text"
                                value={player1}
                                onChange={(e) => setPlayer1(e.target.value)}
                                placeholder="Enter name..."
                                className="w-full bg-void border-2 border-terminal text-terminal px-4 py-3 focus:outline-none focus:border-terminal-light transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-cyber mb-2 font-bold">PLAYER 2 NAME</label>
                            <input
                                type="text"
                                value={player2}
                                onChange={(e) => setPlayer2(e.target.value)}
                                placeholder="Enter name..."
                                className="w-full bg-void border-2 border-cyber text-cyber px-4 py-3 focus:outline-none focus:border-cyber-light transition-colors"
                            />
                        </div>
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
                        className="w-full text-center text-cyber hover:text-cyber-light transition-colors mb-4"
                    >
                        {showRules ? '▼ HIDE RULES' : '▶ VIEW RULES'}
                    </button>

                    {/* Rules */}
                    {showRules && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="border-2 border-cyber p-6 space-y-4 text-sm"
                        >
                            <h3 className="text-cyber font-bold text-lg mb-3"> MISSION BRIEFING</h3>

                            <div className="space-y-3 text-gray-300">
                                <p><strong className="text-terminal">🎯 OBJECTIVE:</strong> Complete 4 algorithm challenges to find the Price Key and escape with groceries.</p>

                                <p><strong className="text-terminal">⏱️ TIME LIMIT:</strong> 20:00 minutes for all 4 phases.</p>

                                <p><strong className="text-terminal">👥 GAMEPLAY:</strong> Local multiplayer - players alternate after each phase.</p>

                                <div className="pl-4 space-y-2">
                                    <p><strong className="text-cyber">Phase 1:</strong> Find shortest route to store (Dijkstra's Algorithm)</p>
                                    <p><strong className="text-cyber">Phase 2:</strong> Navigate store layout to Dry Rations (DFS)</p>
                                    <p><strong className="text-cyber">Phase 3:</strong> Sort panic-buying products by priority (Sorting)</p>
                                    <p><strong className="text-cyber">Phase 4:</strong> Find "Maggi" in shelves, collect prices (Binary Search)</p>
                                </div>

                                <p><strong className="text-panic">🔑 VICTORY:</strong> Submit correct Price Key (concatenated prices from Phase 4)</p>

                                <p><strong className="text-terminal"> CODE:</strong> Write algorithm code in Python, C, C++, Java, or JavaScript</p>
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
                    Brought to you by the Lockdown Survivors of 2020
                </p>
            </motion.div>
        </div>
    );
};

export default Home;
