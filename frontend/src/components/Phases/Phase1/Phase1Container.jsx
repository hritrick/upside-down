import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../../context/GameContext';
import CodeEditor from '../../CodeEditor/CodeEditor';
import CityGraph from './CityGraph';

const Phase1Container = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const { submitCode } = useGame();
    const graphRef = useRef(null);

    const handleCodeSubmit = async (code, language) => {
        try {
            const validation = await submitCode(code, language);

            if (validation.valid) {
                setShowSuccess(true);
                // Trigger graph animation
                if (graphRef.current) {
                    graphRef.current.showPath = true;
                }
            }
        } catch (error) {
            console.error('Code submission failed:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Phase Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h2 className="text-4xl font-bold text-gate mb-2" style={{ fontFamily: 'Bebas Neue, Space Mono, monospace' }}>
                    PHASE 1: THE RACE AGAINST THE GATE
                </h2>
                <p className="text-mindflayer text-lg">
                    Find the shortest route from <strong>Mike's House</strong> to <strong>Starcourt Mall Basement</strong> before the Gate opens
                </p>
            </motion.div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-void border-2 border-mindflayer p-4 mb-6"
            >
                <h3 className="text-mindflayer font-bold mb-2">MISSION BRIEF:</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• A new Gate to the Upside Down is forming beneath Hawkins</li>
                    <li>• Implement Dijkstra's shortest path algorithm</li>
                    <li>• Escape from <strong className="text-gate">Mike's House</strong> to <strong className="text-eleven">Starcourt Basement</strong></li>
                    <li>• Avoid roadblocks and areas with Demodog activity</li>
                    <li>• Any correct algorithm implementation will be accepted</li>
                </ul>
            </motion.div>

            {/* Main Content - Split View */}
            <div className="grid grid-cols-2 gap-6">
                {/* Left: Graph Visualization */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="h-[600px]"
                >
                    <CityGraph ref={graphRef} onSuccess={() => setShowSuccess(true)} />
                </motion.div>

                {/* Right: Code Editor */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="h-[600px]"
                >
                    <CodeEditor
                        onSubmit={handleCodeSubmit}
                        phase={1}
                        disabled={showSuccess}
                    />
                </motion.div>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                >
                    <div className="bg-void border-4 border-gate p-12 text-center" style={{ boxShadow: '0 0 50px rgba(139, 0, 0, 0.8)' }}>
                        <h3 className="text-6xl font-bold text-gate mb-4">ESCAPE ROUTE FOUND!</h3>
                        <p className="text-2xl text-mindflayer">Proceeding to Phase 2...</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Phase1Container;
