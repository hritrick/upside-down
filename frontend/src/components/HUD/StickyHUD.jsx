import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';

const StickyHUD = () => {
    const { currentPhase, timerSeconds, playerName } = useGame();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimerColor = () => {
        if (timerSeconds < 60) return 'text-panic';
        if (timerSeconds < 180) return 'text-yellow-400';
        return 'text-terminal';
    };

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-void border-b-2 border-terminal"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)' }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo/Title */}
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-terminal tracking-wider">
                        STRANGER THINGS: THE ALGORITHM HUNT
                    </h1>
                </div>

                {/* Phase Indicator */}
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((phase) => (
                        <div
                            key={phase}
                            className={`
                px-4 py-2 border-2 transition-all duration-300
                ${currentPhase === phase
                                    ? 'bg-terminal text-void border-terminal animate-pulse-glow'
                                    : currentPhase > phase
                                        ? 'bg-cyber text-void border-cyber'
                                        : 'bg-transparent text-gray-500 border-gray-700'
                                }
              `}
                        >
                            <span className="font-bold text-sm">PHASE {phase}</span>
                        </div>
                    ))}
                </div>

                {/* Timer & Player */}
                <div className="flex items-center gap-6">
                    <div className={`text-3xl font-bold ${getTimerColor()} transition-colors duration-300`}>
                        {formatTime(timerSeconds)}
                    </div>

                    {/* Player Name */}
                    <div className="px-4 py-2 border-2 bg-gate text-void border-gate">
                        <span className="font-bold">{playerName}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StickyHUD;
