import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Game from './pages/Game';
import Victory from './pages/Victory';
import Leaderboard from './pages/Leaderboard';
import './index.css';

function App() {
    return (
        <GameProvider>
            <Router>
                <div className="min-h-screen bg-void">
                    {/* Scanline effect */}
                    <div className="scanline"></div>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="/victory" element={<Victory />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                    </Routes>
                </div>
            </Router>
        </GameProvider>
    );
}

export default App;
