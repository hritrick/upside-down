import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../../context/GameContext';
import CodeEditor from '../../CodeEditor/CodeEditor';
import ProductGrid from './ProductGrid';

const Phase3Container = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [sorted, setSorted] = useState(false);
    const { submitCode } = useGame();

    const handleCodeSubmit = async (code, language) => {
        try {
            const validation = await submitCode(code, language);

            if (validation.valid) {
                setSorted(true);
                setTimeout(() => setShowSuccess(true), 2500);
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
                <h2 className="text-4xl font-bold text-panic mb-2">
                    PHASE 3: THE CHAOS
                </h2>
                <p className="text-terminal text-lg">
                    Sort the panic-buying products by priority using <strong>Merge Sort or Quick Sort</strong>
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
                    <li>• 10 essential products are in chaotic disorder</li>
                    <li>• Use any sorting algorithm to organize by priority</li>
                    <li>• Higher priority = more essential (10 is highest)</li>
                    <li>• Any correct sorting implementation will be accepted</li>
                    <li>• <strong className="text-panic">Goal:</strong> Sort from highest priority (10) to lowest (1)</li>
                </ul>
            </motion.div>

            {/* Main Content - Split View */}
            <div className="grid grid-cols-2 gap-6">
                {/* Left: Product Grid */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="h-[600px]"
                >
                    <ProductGrid sorted={sorted} />
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
                        phase={3}
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
                        <h3 className="text-6xl font-bold text-terminal mb-4">✅ ORDER RESTORED!</h3>
                        <p className="text-2xl text-cyber">Proceeding to Phase 4...</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Phase3Container;
