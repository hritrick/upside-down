import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import GameInput from './GameInput';
import Phase1 from './Phases/Phase1';
import Phase2 from './Phases/Phase2';
import Phase3 from './Phases/Phase3';
import Phase4 from './Phases/Phase4';

const GameContainer = () => {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const socket = useSocket();

    const [currentPhase, setCurrentPhase] = useState(1);
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);

    // HUD State
    const [timeLeft, setTimeLeft] = useState(720);
    const [activeHint, setActiveHint] = useState(null);
    const [hintsExhausted, setHintsExhausted] = useState(false);

    // Game End State
    const [gameResult, setGameResult] = useState(null); // 'WIN' or 'LOSE'
    const [finalHintCount, setFinalHintCount] = useState(0);
    const [finalDuration, setFinalDuration] = useState(0);

    // 1. Initial Sync & Listeners
    useEffect(() => {
        if (!socket) return;
        socket.emit('request_game_state', roomCode);

        socket.on('game_state_update', (team) => {
            setTeamData(team);
            setCurrentPhase(team.currentPhase);
            // Check if hint used for this phase
            const used = team.phaseHintCounts && team.phaseHintCounts[String(team.currentPhase)] >= 1;
            setHintsExhausted(used);
            setLoading(false);
        });

        socket.on('answer_correct', ({ nextPhase }) => {
            setCurrentPhase(nextPhase);
            setHintsExhausted(false); // Reset for new phase
            setActiveHint(null);
        });

        socket.on('hint_received', ({ hintText }) => {
            setActiveHint(hintText);
            setHintsExhausted(true); // Immediate lock
        });

        // GAME OVER LISTENER
        socket.on('game_over', ({ result, totalHints, duration }) => {
            setGameResult(result);
            setFinalHintCount(totalHints);
            if (duration) setFinalDuration(duration);
        });

        socket.on('opponent_left', () => {
            alert("Partner disconnected.");
            navigate('/');
        });

        return () => {
            socket.off('game_state_update');
            socket.off('answer_correct');
            socket.off('hint_received');
            socket.off('game_over');
            socket.off('opponent_left');
        };
    }, [socket, roomCode, navigate]);

    // 2. Timer Logic
    useEffect(() => {
        if (!teamData?.startTime || gameResult) return; // Stop timer if game over
        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - new Date(teamData.startTime).getTime()) / 1000);
            const remaining = 720 - elapsed;
            if (remaining <= 0) {
                // Trigger timeout logic here or wait for server
                setTimeLeft(0);
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [teamData, gameResult]);

    // Helper: Format Time
    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    // Helper: Get Role
    const getPlayerRole = () => {
        if (!teamData || !socket) return null;
        if (socket.id === teamData.playerA.socketId) return 'A';
        if (socket.id === teamData.playerB.socketId) return 'B';
        return null;
    };

    // --- RENDER: VICTORY / DEFEAT SCREEN ---
    if (gameResult) {
        const isWin = gameResult === 'WIN';
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center font-mono ${isWin ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-500'}`}>
                <h1 className="text-6xl font-bold mb-4 tracking-widest">{isWin ? 'MISSION ACCOMPLISHED' : 'SIGNAL LOST'}</h1>
                <div className="text-2xl mb-8">
                    {isWin ? 'THE UPSIDE DOWN HAS BEEN SEALED.' : 'THE MIND FLAYER HAS WON.'}
                </div>

                <div className="bg-black/50 p-8 rounded-lg border-2 border-current text-center min-w-[300px]">
                    <div className="text-sm opacity-70 mb-2">TOTAL HINTS USED</div>
                    <div className="text-6xl font-bold mb-6">{finalHintCount}</div>

                    {isWin && (
                        <div className="mb-8 border-t border-green-800 pt-4">
                            <div className="text-sm opacity-70 mb-2">TOTAL TIME TAKEN</div>
                            <div className="text-4xl font-bold tracking-widest">{formatTime(finalDuration)}</div>
                        </div>
                    )}

                    <button
                        onClick={() => navigate('/')}
                        className={`px-6 py-3 font-bold border-2 hover:bg-white hover:text-black transition-all ${isWin ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}
                    >
                        RETURN TO LOBBY
                    </button>
                </div>
            </div>
        );
    }

    if (loading) return <div className="bg-black min-h-screen text-green-500 p-10">CONNECTING...</div>;

    // --- RENDER: MAIN GAME ---
    return (
        <div className="min-h-screen bg-neutral-900 text-green-400 font-mono flex flex-col">
            {/* HEADER: Timer Left, Phase Right */}
            <div className="bg-black border-b-2 border-green-800 p-4 flex justify-between items-center text-xl sticky top-0 z-10 shadow-lg">
                <div className={`font-bold tracking-widest ${timeLeft < 120 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                    T-MINUS: {formatTime(timeLeft)}
                </div>
                <div className="text-red-500 font-bold">PHASE {currentPhase}/4</div>
            </div>

            {/* GAME AREA */}
            <div className="flex-grow flex flex-col items-center justify-center p-6 relative">
                {activeHint && (
                    <div className="mb-6 w-full max-w-4xl p-4 bg-yellow-900/30 border border-yellow-500 text-yellow-200 text-center animate-pulse shadow-[0_0_20px_rgba(255,200,0,0.2)]">
                        <span className="font-bold mr-2">⚠️ INTEL:</span> {activeHint}
                    </div>
                )}

                <div className="w-full max-w-6xl flex justify-center">
                    {currentPhase === 1 && <Phase1 role={getPlayerRole()} />}
                    {currentPhase === 2 && <Phase2 role={getPlayerRole()} />}
                    {currentPhase === 3 && <Phase3 role={getPlayerRole()} />}
                    {currentPhase === 4 && <Phase4 role={getPlayerRole()} />}
                </div>
            </div>

            {/* FOOTER */}
            <div className="p-4 bg-black border-t border-green-900">
                <GameInput
                    roomCode={roomCode}
                    currentPhase={currentPhase}
                    onHint={() => socket.emit('request_hint', { roomCode, currentPhase })}
                    hintsExhausted={hintsExhausted}
                />
            </div>
        </div>
    );
};

export default GameContainer;
