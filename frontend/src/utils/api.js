import axios from 'axios';

// Use relative path /api which Vite will proxy to backend
const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Session endpoints
export const sessionAPI = {
    create: (player1) =>
        api.post('/sessions/create', { player1 }),

    get: (sessionId) =>
        api.get(`/sessions/${sessionId}`),

    updateTimer: (sessionId, timerSeconds) =>
        api.put(`/sessions/${sessionId}/update-timer`, { timerSeconds }),

    validateCode: (sessionId, code, language, phase) =>
        api.post(`/sessions/${sessionId}/validate-code`, { code, language, phase }),

    checkShelf: (sessionId, shelfId) =>
        api.post(`/sessions/${sessionId}/check-shelf`, { shelfId }),

    setPriceKey: (sessionId, priceKey) =>
        api.post(`/sessions/${sessionId}/set-price-key`, { priceKey }),

    validateKey: (sessionId, priceKey) =>
        api.post(`/sessions/${sessionId}/validate-key`, { priceKey })
};

// Leaderboard endpoints
export const leaderboardAPI = {
    getTop: (limit = 10) =>
        api.get(`/leaderboard?limit=${limit}`),

    add: (playerNames, completionTime, attempts, sessionId) =>
        api.post('/leaderboard', { playerNames, completionTime, attempts, sessionId })
};

// Game data endpoints
export const gameDataAPI = {
    getGraph: () => api.get('/gamedata/graph'),
    getTree: () => api.get('/gamedata/tree'),
    getProducts: () => api.get('/gamedata/products'),
    getShelves: () => api.get('/gamedata/shelves'),
    getAll: () => api.get('/gamedata/all')
};

export default api;
