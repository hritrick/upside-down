import { create } from 'zustand';

const useGameStore = create((set) => ({
    // Team & Player Info
    teamCode: null,
    playerRole: null, // 'A' or 'B'

    // Game State
    currentPhase: 1,
    timerSeconds: 720, // 12 minutes
    status: 'idle', // idle, waiting, playing, completed, failed

    // Connection State
    isConnected: false,
    partnerConnected: false,

    // Hard Mode: Mind Flayer's Interference
    glitchActive: false,
    stressLevel: 0, // 0-100, increases with each glitch

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

    setGameStatus: (status) => set({ status }),

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

    // Glitch Actions
    activateGlitch: () => set((state) => ({
        glitchActive: true,
        stressLevel: Math.min(100, state.stressLevel + 15)
    })),

    deactivateGlitch: () => set({ glitchActive: false }),

    resetGame: () => set({
        teamCode: null,
        playerRole: null,
        currentPhase: 1,
        timerSeconds: 1200,
        status: 'idle',
        isConnected: false,
        partnerConnected: false,
        glitchActive: false,
        stressLevel: 0
    })
}));

export default useGameStore;

