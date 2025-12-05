import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import StickyHUD from '../components/HUD/StickyHUD';
import Phase1Container from '../components/Phases/Phase1/Phase1Container';
import Phase2Container from '../components/Phases/Phase2/Phase2Container';
import Phase3Container from '../components/Phases/Phase3/Phase3Container';
import Phase4Container from '../components/Phases/Phase4/Phase4Container';

const Game = () => {
    const { currentPhase, gameStarted, gameCompleted, timerSeconds } = useGame();
    const navigate = useNavigate();

    useEffect(() => {
        if (!gameStarted) {
            navigate('/');
        }
    }, [gameStarted, navigate]);

    useEffect(() => {
        if (gameCompleted) {
            navigate('/victory');
        }
    }, [gameCompleted, navigate]);

    useEffect(() => {
        if (timerSeconds <= 0) {
            alert('⏰ Time\'s up! Mission failed.');
            navigate('/');
        }
    }, [timerSeconds, navigate]);

    const renderPhase = () => {
        switch (currentPhase) {
            case 1:
                return <Phase1Container />;
            case 2:
                return <Phase2Container />;
            case 3:
                return <Phase3Container />;
            case 4:
                return <Phase4Container />;
            default:
                return <div>Invalid Phase</div>;
        }
    };

    if (!gameStarted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-void">
            <StickyHUD />

            {/* Main Game Area */}
            <div className="pt-24 px-8 pb-8">
                {renderPhase()}
            </div>
        </div>
    );
};

export default Game;
