import { create } from 'zustand';

const useGameStore = create((set) => ({
    // Team & Player Info
    teamCode: null,
    playerRole: null, // 'A' or 'B'

    // Game State
    currentPhase: 1,
    timerSeconds: 1200, // 20 minutes
    status: 'idle', // idle, waiting, playing, completed, failed

    // Connection State
    isConnected: false,
    partnerConnected: false,

    // Actions
    setTeamInfo: (teamCode, playerRole) => set({
        teamCode,
        playerRole,
        status: 'waiting'
    }),

    setGameState: (currentPhase, timerSeconds, status) => set({
        currentPhase,
        timerSeconds,
        status
    }),

    updateTimer: (timerSeconds) => set({ timerSeconds }),

    setPhase: (currentPhase) => set({ currentPhase }),

    setConnectionStatus: (isConnected, partnerConnected) => set({
        isConnected,
        partnerConnected
    }),

    setBothPlayersConnected: () => set({
        partnerConnected: true,
        status: 'playing'
    }),

    setPartnerDisconnected: () => set({
        partnerConnected: false
    }),

    resetGame: () => set({
        teamCode: null,
        playerRole: null,
        currentPhase: 1,
        timerSeconds: 1200,
        status: 'idle',
        isConnected: false,
        partnerConnected: false
    })
}));

export default useGameStore;
