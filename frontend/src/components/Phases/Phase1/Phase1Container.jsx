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
                <h2 className="text-4xl font-bold text-terminal mb-2">
                    PHASE 1: THE RACE AGAINST TIME
                </h2>
                <p className="text-cyber text-lg">
                    Find the shortest route from Home to the Store using <strong>Dijkstra's Algorithm</strong>
                </p>
            </motion.div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-void border-2 border-cyber p-4 mb-6"
            >
                <h3 className="text-cyber font-bold mb-2"> MISSION BRIEF:</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Navigate a graph with 6 locations</li>
                    <li>• Implement Dijkstra's shortest path algorithm</li>
                    <li>• Find route from <strong className="text-panic">Home</strong> to <strong className="text-terminal">Store</strong></li>
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
                    <div className="bg-void border-4 border-terminal p-12 text-center" style={{ boxShadow: '0 0 50px rgba(0, 255, 65, 0.8)' }}>
                        <h3 className="text-6xl font-bold text-terminal mb-4">✅ ROUTE CALCULATED!</h3>
                        <p className="text-2xl text-cyber">Proceeding to Phase 2...</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Phase1Container;
