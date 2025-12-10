import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../../context/GameContext';
import CodeEditor from '../../CodeEditor/CodeEditor';
import StoreTree from './StoreTree';

const Phase2Container = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const { submitCode } = useGame();
    const treeRef = useRef(null);

    const handleCodeSubmit = async (code, language) => {
        try {
            const validation = await submitCode(code, language);

            if (validation.valid) {
                setShowSuccess(true);
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
                <h2 className="text-4xl font-bold text-upside mb-2" style={{ fontFamily: 'Bebas Neue, Space Mono, monospace' }}>
                    PHASE 2: THE LABYRINTH OF THE UPSIDE DOWN
                </h2>
                <p className="text-mindflayer text-lg">
                    Navigate the twisted maze to find the <strong>Core Node</strong> where the hive-mind pulse is strongest
                </p>
            </motion.div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-void border-2 border-upside p-4 mb-6"
            >
                <h3 className="text-upside font-bold mb-2">MISSION BRIEF:</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• You fell into the Upside Down version of the Starcourt basement</li>
                    <li>• Implement DFS/BFS to find the Core Node</li>
                    <li>• Vines cover the paths, making the layout disorienting</li>
                    <li>• Any correct algorithm implementation will be accepted</li>
                    <li>• <strong className="text-mindflayer">Starting Point:</strong> Collapsed Floor (Entrance) → <strong className="text-eleven">Target:</strong> Core Node</li>
                </ul>
            </motion.div>

            {/* Main Content - Split View */}
            <div className="grid grid-cols-2 gap-6">
                {/* Left: Tree Visualization */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="h-[600px]"
                >
                    <StoreTree ref={treeRef} onSuccess={() => setShowSuccess(true)} />
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
                        phase={2}
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
                    <div className="bg-void border-4 border-upside p-12 text-center" style={{ boxShadow: '0 0 50px rgba(74, 37, 17, 0.8)' }}>
                        <h3 className="text-6xl font-bold text-upside mb-4">CORE NODE LOCATED!</h3>
                        <p className="text-2xl text-mindflayer">Proceeding to Phase 3...</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Phase2Container;
