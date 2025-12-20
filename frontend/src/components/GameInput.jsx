import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

const GameInput = ({ roomCode, currentPhase, onHint, hintsExhausted }) => {
    const socket = useSocket();
    const [answer, setAnswer] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    const [lockdownTimer, setLockdownTimer] = useState(0);

    // Audio References (Ensure these files exist in public/sounds/)
    const sfxError = new Audio('/sounds/error.mp3');

    // RESET ON PHASE CHANGE
    useEffect(() => {
        setAnswer('');        // Clear the text box
        setIsLocked(false);   // Ensure terminal unlocks if it was locked
        setLockdownTimer(0);  // Reset timer visual
    }, [currentPhase]);


    // Handle Lockdown Timer
    useEffect(() => {
        let interval;
        if (isLocked && lockdownTimer > 0) {
            interval = setInterval(() => {
                setLockdownTimer((prev) => prev - 1);
            }, 1000);
        } else if (lockdownTimer === 0) {
            setIsLocked(false);
        }
        return () => clearInterval(interval);
    }, [isLocked, lockdownTimer]);

    // Listen for Server Penalties
    useEffect(() => {
        if (!socket) return;

        socket.on('answer_incorrect', () => {
            console.log("❌ WRONG ANSWER: Locking terminal...");
            sfxError.play().catch(() => { }); // Catch play errors
            setAnswer(''); // Clear input
            setIsLocked(true);
            setLockdownTimer(30);
        });

        socket.on('error_locked', ({ timeLeft }) => {
            console.log(`🔒 ALREADY LOCKED: ${timeLeft}s remaining`);
            sfxLockdown.play().catch(() => { });
            setIsLocked(true);
            setLockdownTimer(timeLeft);
        });

        return () => {
            socket.off('answer_incorrect');
            socket.off('error_locked');
        };
    }, [socket]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        console.log("🖱️ EXECUTE CLICKED");

        if (!answer.trim()) {
            console.warn("⚠️ Input is empty");
            return;
        }
        if (!socket || !roomCode) {
            console.error("❌ MISSING DATA: Socket or RoomCode is null", { socket, roomCode });
            return;
        }
        if (isLocked) {
            console.warn("🔒 TERMINAL LOCKED");
            return;
        }

        console.log(`📡 SENDING ANSWER: "${answer}" for Phase ${currentPhase}`);

        // Emit to Server
        socket.emit('submit_answer', {
            roomCode,
            answer: answer.trim(), // Remove whitespace
            phase: currentPhase
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Lockdown Warning */}
            {isLocked && (
                <div className="mb-2 text-center text-red-500 font-bold tracking-widest animate-pulse">
                    🔒 TERMINAL LOCKED: {lockdownTimer}s REBOOTING...
                </div>
            )}

            {/* THE CONTROL BAR */}
            <form onSubmit={handleSubmit} className="flex flex-row items-stretch gap-2 h-14">

                {/* 1. INPUT FIELD (Grows to fill space) */}
                <div className="relative flex-grow h-full">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 font-bold">{'>'}</span>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        disabled={isLocked}
                        placeholder={isLocked ? `SYSTEM LOCKED: ${lockdownTimer}s...` : "ENTER COMMAND..."}
                        className={`w-full h-full bg-neutral-900 border-2 ${isLocked ? 'border-red-600 text-red-600' : 'border-green-600 text-green-400 focus:border-green-400 focus:shadow-[0_0_15px_rgba(0,255,0,0.3)]'
                            } pl-10 pr-4 font-mono text-lg outline-none transition-all`}
                        autoFocus
                    />
                </div>

                {/* 2. EXECUTE BUTTON */}
                <button
                    type="submit"
                    disabled={isLocked}
                    className={`px-8 h-full font-bold tracking-wider transition-all border-2 ${isLocked
                        ? 'bg-gray-800 text-gray-500 border-gray-600 cursor-not-allowed'
                        : 'bg-green-900/30 text-green-500 border-green-600 hover:bg-green-500 hover:text-black'
                        }`}
                >
                    SUBMIT
                </button>

                {/* 3. HINT BUTTON (Simplified) */}
                <button
                    type="button"
                    onClick={onHint}
                    disabled={isLocked || hintsExhausted}
                    className={`px-6 h-full font-mono text-sm font-bold border-2 transition-all ${hintsExhausted
                        ? 'bg-gray-900 text-gray-600 border-gray-700 cursor-not-allowed'
                        : 'bg-yellow-900/20 text-yellow-500 border-yellow-600 hover:bg-yellow-500 hover:text-black'
                        }`}
                >
                    {hintsExhausted ? "USED" : "HINT"}
                </button>

            </form>
        </div>
    );
};

export default GameInput;
