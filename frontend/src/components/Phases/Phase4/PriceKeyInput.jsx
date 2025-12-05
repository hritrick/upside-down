import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../../context/GameContext';
import { sessionAPI } from '../../../utils/api';

const PriceKeyInput = ({ collectedPrices, codeValidated }) => {
    const [inputKey, setInputKey] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isValidating, setIsValidating] = useState(false);
    const { submitPriceKey, sessionId } = useGame();

    const handleSubmit = async () => {
        if (!inputKey.trim()) {
            setFeedback({ valid: false, message: 'Please enter a price key' });
            return;
        }

        if (!codeValidated) {
            setFeedback({ valid: false, message: 'Please submit valid Binary Search code first!' });
            return;
        }

        setIsValidating(true);
        setFeedback(null);

        try {
            // Generate the correct key from collected prices
            const correctKey = collectedPrices.join('');

            // Set the correct price key in backend first
            await sessionAPI.setPriceKey(sessionId, correctKey);

            // Then validate user's input
            const result = await submitPriceKey(inputKey);

            if (result.valid) {
                setFeedback({
                    valid: true,
                    message: `🎉 VICTORY! Correct Price Key in ${result.attempts} attempt(s)!`
                });
            } else {
                setFeedback({
                    valid: false,
                    message: result.message || `❌ Incorrect key (Attempt ${result.attempts})`
                });
            }
        } catch (error) {
            setFeedback({
                valid: false,
                message: 'Validation failed. Please try again.'
            });
        } finally {
            setIsValidating(false);
        }
    };

    return (
        <div className="bg-void border-2 border-terminal mt-12 p-6" style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)' }}>
            <h3 className="text-terminal text-2xl font-bold mb-4 text-center">
                🔑 PRICE KEY SUBMISSION
            </h3>

            {/* Collected Prices Display - Only show after code validation */}
            {codeValidated && collectedPrices.length > 0 && (
                <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Scanned Shelf Prices:</p>
                    <div className="flex gap-2 flex-wrap">
                        {collectedPrices.map((price, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-3 py-1 bg-cyber bg-opacity-20 border border-cyber text-cyber font-bold"
                            >
                                ₹{price}
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-yellow-400 text-xs mt-2">
                        💡 Hint: The price key is a concatenation of prices from the shelves you scanned
                    </p>
                </div>
            )}

            {/* Manual Input */}
            <div className="mb-4">
                <label className="block text-terminal mb-2 font-bold text-sm">
                    PRICE KEY:
                </label>
                <input
                    type="text"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="Enter concatenated prices..."
                    className="w-full bg-void border-2 border-terminal text-terminal px-4 py-3 text-center text-2xl font-bold font-mono focus:outline-none focus:border-terminal-light"
                />
            </div>

            {/* Feedback */}
            {feedback && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
            p-4 border-2 mb-4 font-bold text-center
            ${feedback.valid
                            ? 'bg-terminal bg-opacity-10 border-terminal text-terminal'
                            : 'bg-panic bg-opacity-10 border-panic text-panic'
                        }
          `}
                >
                    {feedback.message}
                </motion.div>
            )}

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={isValidating || !inputKey.trim()}
                className={`
          w-full py-4 text-xl font-bold border-2 transition-all duration-300
          ${isValidating || !inputKey.trim()
                        ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                        : 'btn-primary'
                    }
        `}
            >
                {isValidating ? 'VALIDATING...' : '🔑 SUBMIT PRICE KEY'}
            </button>

            <p className="text-gray-500 text-xs text-center mt-4">
                The price key is the concatenation of all prices from shelves you've checked.
            </p>
        </div>
    );
};

export default PriceKeyInput;
