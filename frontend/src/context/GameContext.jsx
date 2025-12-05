import { createContext, useContext, useState, useEffect } from 'react';
import { sessionAPI } from '../utils/api';

const GameContext = createContext();

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within GameProvider');
    }
    return context;
};

export const GameProvider = ({ children }) => {
    const [sessionId, setSessionId] = useState(null);
    const [currentPhase, setCurrentPhase] = useState(1);
    const [activePlayer, setActivePlayer] = useState(1); // 1 or 2
    const [timerSeconds, setTimerSeconds] = useState(1200); // 20 minutes
    const [phasesCompleted, setPhasesCompleted] = useState([false, false, false, false]);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [players, setPlayers] = useState({ player1: 'Player 1', player2: 'Player 2' });
    const [checkedShelves, setCheckedShelves] = useState([]);
    const [priceKey, setPriceKey] = useState('');
    const [completionTime, setCompletionTime] = useState(null);

    // Timer countdown
    useEffect(() => {
        if (!gameStarted || gameCompleted || timerSeconds <= 0) return;

        const interval = setInterval(() => {
            setTimerSeconds(prev => {
                const newTime = prev - 1;

                // Update backend every 5 seconds
                if (newTime % 5 === 0 && sessionId) {
                    sessionAPI.updateTimer(sessionId, newTime).catch(err =>
                        console.error('Failed to update timer:', err)
                    );
                }

                if (newTime <= 0) {
                    endGame(false);
                    return 0;
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [gameStarted, gameCompleted, timerSeconds, sessionId]);

    const startGame = async (player1Name, player2Name) => {
        try {
            const response = await sessionAPI.create(player1Name, player2Name);
            const { sessionId: newSessionId, session } = response.data;

            setSessionId(newSessionId);
            setPlayers({ player1: player1Name, player2: player2Name });
            setCurrentPhase(1);
            setActivePlayer(1);
            setTimerSeconds(1200);
            setPhasesCompleted([false, false, false, false]);
            setGameStarted(true);
            setGameCompleted(false);
            setCheckedShelves([]);
            setPriceKey('');

            return newSessionId;
        } catch (error) {
            console.error('Failed to start game:', error);
            throw error;
        }
    };

    const completePhase = (phaseNumber) => {
        const newPhasesCompleted = [...phasesCompleted];
        newPhasesCompleted[phaseNumber - 1] = true;
        setPhasesCompleted(newPhasesCompleted);

        if (phaseNumber < 4) {
            setCurrentPhase(phaseNumber + 1);
            // Switch player after each phase
            setActivePlayer(prev => prev === 1 ? 2 : 1);
        }
    };

    const submitCode = async (code, language) => {
        try {
            const response = await sessionAPI.validateCode(
                sessionId,
                code,
                language,
                currentPhase
            );

            const { validation, nextPhase } = response.data;

            if (validation.valid) {
                completePhase(currentPhase);
            }

            return validation;
        } catch (error) {
            console.error('Failed to validate code:', error);
            throw error;
        }
    };

    const checkShelf = async (shelfId) => {
        try {
            await sessionAPI.checkShelf(sessionId, shelfId);
            setCheckedShelves(prev => [...prev, shelfId]);
        } catch (error) {
            console.error('Failed to check shelf:', error);
            throw error;
        }
    };

    const submitPriceKey = async (key) => {
        try {
            const response = await sessionAPI.validateKey(sessionId, key);
            const { valid, completionTime: time, attempts } = response.data;

            if (valid) {
                setGameCompleted(true);
                setCompletionTime(time);
            }

            return response.data;
        } catch (error) {
            console.error('Failed to validate price key:', error);
            throw error;
        }
    };

    const endGame = (victory = false) => {
        setGameCompleted(true);
        setGameStarted(false);
    };

    const resetGame = () => {
        setSessionId(null);
        setCurrentPhase(1);
        setActivePlayer(1);
        setTimerSeconds(1200);
        setPhasesCompleted([false, false, false, false]);
        setGameStarted(false);
        setGameCompleted(false);
        setCheckedShelves([]);
        setPriceKey('');
        setCompletionTime(null);
    };

    const value = {
        sessionId,
        currentPhase,
        activePlayer,
        timerSeconds,
        phasesCompleted,
        gameStarted,
        gameCompleted,
        players,
        checkedShelves,
        priceKey,
        completionTime,
        startGame,
        completePhase,
        submitCode,
        checkShelf,
        submitPriceKey,
        endGame,
        resetGame,
        setPriceKey
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
