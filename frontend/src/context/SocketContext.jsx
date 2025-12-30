import { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

// Initialize Socket.io client
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://upside-down.onrender.com';

const socket = io(BACKEND_URL, {
    withCredentials: true,
    transports: ['websocket', 'polling']
});

export const SocketProvider = ({ children }) => {
    useEffect(() => {
        console.log('🌐 Connecting to backend:', BACKEND_URL);

        socket.on('connect', () => {
            console.log('🔌 Connected to server:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('🔌 Disconnected from server');
        });

        socket.on('connect_error', (error) => {
            console.error('🔌 Connection error:', error);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error('useSocket must be used within SocketProvider');
    }
    return socket;
};

export default socket;
