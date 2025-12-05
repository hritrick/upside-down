import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { leaderboardAPI } from '../utils/api';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await leaderboardAPI.getTop(10);
                setLeaderboard(response.data.leaderboard || []);
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen grid-bg flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full"
            >
                <h1 className="text-6xl font-bold text-terminal text-center mb-12 tracking-wider" style={{ textShadow: '0 0 20px #00ff41' }}>
                    🏆 LEADERBOARD
                </h1>

                <div className="bg-void border-2 border-terminal p-8" style={{ boxShadow: '0 0 30px rgba(0, 255, 65, 0.3)' }}>
                    {loading ? (
                        <div className="text-center text-terminal text-xl py-12">
                            LOADING...
                        </div>
                    ) : leaderboard.length === 0 ? (
                        <div className="text-center text-gray-400 py-12">
                            <p className="text-2xl mb-4">No completions yet.</p>
                            <p>Be the first to complete the mission!</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {/* Header */}
                            <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 border-terminal text-terminal font-bold">
                                <div className="col-span-1">RANK</div>
                                <div className="col-span-6">TEAM</div>
                                <div className="col-span-3">TIME</div>
                                <div className="col-span-2">ATTEMPTS</div>
                            </div>

                            {/* Entries */}
                            {leaderboard.map((entry, index) => (
                                <motion.div
                                    key={entry._id}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`
                    grid grid-cols-12 gap-4 py-3 border-b border-gray-700
                    ${index === 0 ? 'text-yellow-400 font-bold' : ''}
                    ${index === 1 ? 'text-gray-300' : ''}
                    ${index === 2 ? 'text-orange-400' : ''}
                    ${index > 2 ? 'text-gray-400' : ''}
                  `}
                                >
                                    <div className="col-span-1 text-2xl">
                                        {index === 0 && '🥇'}
                                        {index === 1 && '🥈'}
                                        {index === 2 && '🥉'}
                                        {index > 2 && `#${index + 1}`}
                                    </div>
                                    <div className="col-span-6">{entry.playerNames}</div>
                                    <div className="col-span-3">{formatTime(entry.completionTime)}</div>
                                    <div className="col-span-2">{entry.attempts}</div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => navigate('/')}
                        className="btn-terminal w-full mt-8"
                    >
                        BACK TO HOME
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Leaderboard;
