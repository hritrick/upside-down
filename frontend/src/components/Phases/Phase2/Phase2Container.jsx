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
                <h2 className="text-4xl font-bold text-cyber mb-2">
                    PHASE 2: THE MAZE
                </h2>
                <p className="text-terminal text-lg">
                    🌳 Navigate the store layout to find "Dry Ration" using <strong>DFS (Depth-First Search)</strong>
                </p>
            </motion.div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-void border-2 border-terminal p-4 mb-6"
            >
                <h3 className="text-terminal font-bold mb-2"> MISSION BRIEF:</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Navigate a tree with 7 store sections</li>
                    <li>• Implement DFS to find the "Dry Ration" node</li>
                    <li>• Track visited nodes to avoid cycles</li>
                    <li>• Any correct algorithm implementation will be accepted</li>
                    <li>• <strong className="text-cyber">Starting Point:</strong> Entrance (Root) → <strong className="text-yellow-400">Target:</strong> Dry Ration</li>
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
                    <div className="bg-void border-4 border-yellow-400 p-12 text-center" style={{ boxShadow: '0 0 50px rgba(255, 215, 0, 0.8)' }}>
                        <h3 className="text-6xl font-bold text-yellow-400 mb-4">✅ DRY RATION FOUND!</h3>
                        <p className="text-2xl text-cyber">Proceeding to Phase 3...</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Phase2Container;
