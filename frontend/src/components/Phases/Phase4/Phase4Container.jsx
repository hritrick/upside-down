import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../../context/GameContext';
import CodeEditor from '../../CodeEditor/CodeEditor';
import VaultScanner from './VaultScanner';
import PriceKeyInput from './PriceKeyInput';

const Phase4Container = () => {
    const [collectedPrices, setCollectedPrices] = useState([]);
    const [codeValidated, setCodeValidated] = useState(false);
    const { submitCode } = useGame();

    const handleCodeSubmit = async (code, language) => {
        try {
            const validation = await submitCode(code, language);

            if (validation.valid) {
                setCodeValidated(true);
            }
        } catch (error) {
            console.error('Code submission failed:', error);
        }
    };

    const handlePriceCollected = (price) => {
        // Only allow price collection after code validation
        if (codeValidated) {
            setCollectedPrices(prev => [...prev, price]);
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
                    PHASE 4: THE HUNT FOR MAGGI
                </h2>
                <p className="text-terminal text-lg">
                    🔍 Find "Maggi" using <strong>Binary Search</strong>, collect prices, and submit the Price Key
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
                    <li>• 12 shelves arranged alphabetically by item name</li>
                    <li>• Implement Binary Search to find "Maggi" efficiently</li>
                    <li>• Record prices from each shelf you check</li>
                    <li>• Price Key = concatenation of all prices in order checked</li>
                    <li>• <strong className="text-cyber">Victory Condition:</strong> Click shelves to collect prices, then submit the concatenated Price Key</li>
                    <li>• <strong className="text-yellow-400">Tip:</strong> The correct binary search path is: shelves 5 → 8 → 10 → 11</li>
                </ul>
            </motion.div>

            {/* Main Content - Split View */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Left: Vault Scanner */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="h-[500px]"
                >
                    <VaultScanner onPriceCollected={handlePriceCollected} codeValidated={codeValidated} />
                </motion.div>

                {/* Right: Code Editor */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="h-[500px]"
                >
                    <CodeEditor
                        onSubmit={handleCodeSubmit}
                        phase={4}
                        disabled={codeValidated}
                    />
                </motion.div>
            </div>

            {/* Bottom: Price Key Input */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <PriceKeyInput collectedPrices={collectedPrices} codeValidated={codeValidated} />
            </motion.div>
        </div>
    );
};

export default Phase4Container;
