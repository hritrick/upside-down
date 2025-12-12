import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import Lobby from './pages/Lobby';
import GameCanvas from './pages/GameCanvas';
import Victory from './pages/Victory';
import './index.css';

function App() {
    return (
        <SocketProvider>
            <Router>
                <div className="min-h-screen bg-void relative overflow-hidden">
                    {/* Scanline effect */}
                    <div className="scanline"></div>

                    {/* Static grain overlay */}
                    <div className="fixed inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]"></div>

                    <Routes>
                        <Route path="/" element={<Lobby />} />
                        <Route path="/game" element={<GameCanvas />} />
                        <Route path="/victory" element={<Victory />} />
                    </Routes>
                </div>
            </Router>
        </SocketProvider>
    );
}

export default App;
