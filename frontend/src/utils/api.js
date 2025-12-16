import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

export const sessionAPI = {
    create: (playerName) => api.post('/sessions', { playerName }),

    validateCode: (sessionId, code, language, phase) =>
        api.post(`/sessions/${sessionId}/validate`, { code, language, phase }),

    checkShelf: (sessionId, shelfId) =>
        api.post(`/sessions/${sessionId}/shelf`, { shelfId }),

    validateKey: (sessionId, key) =>
        api.post(`/sessions/${sessionId}/key`, { key }),

    updateTimer: (sessionId, timerSeconds) =>
        api.post(`/sessions/${sessionId}/timer`, { timerSeconds })
};

export default api;
