import { create } from 'zustand';

const useGameStore = create((set) => ({
    // Initial State
    teamCode: null,
    playerRole: null,
    currentPhase: 1,
    timerSeconds: 1200, // 20 minutes
    status: 'idle', // idle, playing, completed, failed
    glitchActive: false,
    stressLevel: 0,
    
    // Actions
    setTeamInfo: (teamCode, playerRole) => set({ teamCode, playerRole }),
    
    setBothPlayersConnected: () => set({ status: 'playing' }), // Assuming this starts the game
    
    // Sync entire game state (e.g. from socket)
    setGameState: (currentPhase, timerSeconds, status) => set({ currentPhase, timerSeconds, status }),
    
    updateTimer: (timerSeconds) => set({ timerSeconds }),
    
    setPhase: (currentPhase) => set({ currentPhase }),
    
    setGameStatus: (status) => set({ status }),
    
    setPartnerDisconnected: () => set({ status: 'failed' }), // Or some other state
    
    activateGlitch: () => set({ glitchActive: true }),
    
    deactivateGlitch: () => set({ glitchActive: false }),
    
    resetGame: () => set({
        teamCode: null,
        playerRole: null,
        currentPhase: 1,
        timerSeconds: 1200,
        status: 'idle',
        glitchActive: false,
        stressLevel: 0
    })
}));

export default useGameStore;
