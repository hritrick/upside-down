import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';
import useGameStore from '../store/GameStore';
import Phase1 from '../components/Phases/Phase1';
import Phase2 from '../components/Phases/Phase2';
import Phase3 from '../components/Phases/Phase3';
import Phase4 from '../components/Phases/Phase4';

function GameCanvas() {
    const navigate = useNavigate();
    const socket = useSocket();
    const {
        teamCode,
        playerRole,
        currentPhase,
        timerSeconds,
        updateTimer,
        setPhase,
        setPartnerDisconnected
    } = useGameStore();

    const [answer, setAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(null); // 'correct' or 'wrong'
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Redirect if no team code
        if (!teamCode || !playerRole) {
            navigate('/');
            return;
        }

        // Listen for timer updates
        socket.on('timer_update', ({ timerSeconds }) => {
            updateTimer(timerSeconds);
        });

        // Listen for answer results
        socket.on('answer_result', ({ success, currentPhase: newPhase, status }) => {
            setIsSubmitting(false);
            if (success) {
                // Correct answer
                setShowFeedback('correct');
                setAnswer('');

                setTimeout(() => {
                    setShowFeedback(null);
                    setPhase(newPhase);

                    // Navigate to victory if game completed
                    if (status === 'completed') {
                        useGameStore.getState().setGameStatus('completed');
                        setTimeout(() => navigate('/victory'), 500);
                    }
                }, 2000);
            } else {
                // Wrong answer
                setShowFeedback('wrong');
                setTimeout(() => setShowFeedback(null), 1500);
            }
        });

        // Listen for time up
        socket.on('time_up', () => {
            navigate('/victory');
        });

        // Listen for partner disconnection
        socket.on('partner_disconnected', () => {
            setPartnerDisconnected();
            alert('Your partner has disconnected!');
            navigate('/');
        });

        return () => {
            socket.off('timer_update');
            socket.off('answer_result');
            socket.off('time_up');
            socket.off('partner_disconnected');
        };
    }, [socket, teamCode, playerRole, navigate, updateTimer, setPhase, setPartnerDisconnected]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!answer.trim() || isSubmitting) return;

        setIsSubmitting(true);
        socket.emit('submit_answer',
            { teamCode, answer: answer.trim() },
            (response) => {
                if (!response.success) {
                    setIsSubmitting(false);
                    alert('Error submitting answer');
                }
            }
        );
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const renderPhase = () => {
        const phaseProps = { playerRole };

        switch (currentPhase) {
            case 1:
                return <Phase1 {...phaseProps} />;
            case 2:
                return <Phase2 {...phaseProps} />;
            case 3:
                return <Phase3 {...phaseProps} />;
            case 4:
                return <Phase4 {...phaseProps} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Feedback Overlays */}
            <AnimatePresence>
                {showFeedback === 'correct' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-green-500/20 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-6xl font-mono text-green-500 font-bold tracking-wider"
                            style={{ textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00' }}
                        >
                            ACCESS GRANTED
                        </motion.div>
                    </motion.div>
                )}

                {showFeedback === 'wrong' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 0.8, 1, 0],
                            x: [-5, 5, -5, 5, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-red-500/30 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [-2, 2, -2, 2, 0]
                            }}
                            transition={{ duration: 0.5 }}
                            className="text-6xl font-mono text-red-500 font-bold tracking-wider"
                            style={{ textShadow: '0 0 20px #ff0000, 0 0 40px #ff0000' }}
                        >
                            ACCESS DENIED
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Bar */}
            <div className="bg-black/80 border-b-2 border-gate p-4 flex justify-between items-center sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <div className="text-gate font-mono text-xl">
                        PHASE <span className="text-3xl font-bold">{currentPhase}</span>/4
                    </div>
                    <div className="text-mindflayer font-mono text-sm">
                        {playerRole === 'A' ? 'THE EYES' : 'THE BRAIN'}
                    </div>
                </div>

                <motion.div
                    animate={{
                        color: timerSeconds < 60 ? '#ff0000' : '#6A0DAD'
                    }}
                    className="font-mono text-3xl font-bold tracking-wider"
                    style={{
                        textShadow: timerSeconds < 60 ? '0 0 10px #ff0000' : '0 0 10px #6A0DAD'
                    }}
                >
                    {formatTime(timerSeconds)}
                </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPhase}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderPhase()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Input Bar */}
            <form
                onSubmit={handleSubmit}
                className="bg-black/80 border-t-2 border-gate p-6 sticky bottom-0 z-40"
            >
                <div className="max-w-4xl mx-auto flex gap-4 items-center">
                    <div className="text-gate text-2xl font-mono">&gt;</div>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter your answer..."
                        disabled={isSubmitting}
                        className="flex-1 bg-black border-2 border-gate text-green-500 px-4 py-3 text-xl font-mono focus:outline-none focus:border-gate-light focus:shadow-[0_0_20px_#8B0000] disabled:opacity-50"
                        style={{ caretColor: '#00ff00' }}
                    />
                    <button
                        type="submit"
                        disabled={!answer.trim() || isSubmitting}
                        className="px-8 py-3 bg-gate border-2 border-gate text-white font-mono text-xl tracking-wider hover:bg-gate-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default GameCanvas;
