import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gameDataAPI, sessionAPI } from '../../../utils/api';
import { useGame } from '../../../context/GameContext';

const VaultScanner = ({ onPriceCollected, codeValidated }) => {
    const [shelves, setShelves] = useState([]);
    const [checkedShelves, setCheckedShelves] = useState([]);
    const [scanning, setScanning] = useState(null);
    const [foundMaggi, setFoundMaggi] = useState(false);
    const { sessionId } = useGame();

    useEffect(() => {
        const fetchShelves = async () => {
            try {
                const response = await gameDataAPI.getShelves();
                setShelves(response.data.data.shelves || []);
            } catch (error) {
                console.error('Failed to fetch shelves:', error);
            }
        };
        fetchShelves();
    }, []);

    const handleShelfClick = async (shelf) => {
        // Don't allow clicking if code not validated
        if (!codeValidated) {
            return;
        }

        if (checkedShelves.includes(shelf.id) || scanning !== null) return;

        setScanning(shelf.id);

        // Simulate scanning animation
        setTimeout(async () => {
            setCheckedShelves(prev => [...prev, shelf.id]);
            setScanning(null);

            // Notify backend
            try {
                await sessionAPI.checkShelf(sessionId, shelf.id);
            } catch (error) {
                console.error('Failed to track shelf:', error);
            }

            // Call parent with price
            if (onPriceCollected) {
                onPriceCollected(shelf.price);
            }

            // Check if Maggi found
            if (shelf.item === 'Maggi') {
                setFoundMaggi(true);
            }
        }, 1500);
    };

    return (
        <div className="w-full h-full p-6 bg-void border-2 border-mindflayer" style={{ boxShadow: '0 0 20px rgba(106, 13, 173, 0.3)' }}>
            <h3 className="text-mindflayer text-2xl font-bold mb-6 text-center">
                MEMORY SCANNER SYSTEM
            </h3>

            <div className="grid grid-cols-4 gap-4">
                {shelves.map((shelf) => {
                    const isChecked = checkedShelves.includes(shelf.id);
                    const isScanning = scanning === shelf.id;
                    const isMaggi = shelf.item === 'Maggi';

                    return (
                        <motion.button
                            key={shelf.id}
                            onClick={() => handleShelfClick(shelf)}
                            disabled={isChecked || isScanning}
                            className={`
                relative p-6 border-2 transition-all duration-300
                ${isChecked
                                    ? isMaggi
                                        ? 'bg-eleven bg-opacity-20 border-eleven cursor-default'
                                        : 'bg-mindflayer bg-opacity-20 border-mindflayer cursor-default'
                                    : 'bg-gray-900 border-gray-700 hover:border-mindflayer hover:bg-gray-800 cursor-pointer'
                                }
                ${isScanning ? 'animate-pulse' : ''}
              `}
                            whileHover={!isChecked && !isScanning ? { scale: 1.05 } : {}}
                            whileTap={!isChecked && !isScanning ? { scale: 0.95 } : {}}
                        >
                            {/* Shelf Number */}
                            <div className="text-center mb-4">
                                <div className={`
                  text-3xl font-bold
                  ${isChecked ? (isMaggi ? 'text-yellow-400' : 'text-cyber') : 'text-gray-500'}
                `}>
                                    {shelf.id}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">SHELF</div>
                            </div>

                            {/* Locked State - Show when code not validated */}
                            {!codeValidated && !isChecked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">LOCKED</div>
                                        <div className="text-gray-500 text-xs">LOCKED</div>
                                    </div>
                                </div>
                            )}

                            {/* Scanning State */}
                            {isScanning && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex items-center justify-center bg-mindflayer bg-opacity-10"
                                >
                                    <div className="text-mindflayer font-bold">SCANNING...</div>
                                </motion.div>
                            )}

                            {/* Revealed Content */}
                            <AnimatePresence>
                                {isChecked && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center p-4"
                                    >
                                        <div className={`
                      text-center font-bold
                      ${isMaggi ? 'text-eleven' : 'text-mindflayer'}
                    `}>
                                            {isMaggi && <div className="text-2xl mb-2">🎯</div>}
                                            <div className="text-sm mb-2">{shelf.item}</div>
                                            <div className="text-2xl">⚡{shelf.price}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Glow effect for Mom */}
                            {isChecked && isMaggi && (
                                <motion.div
                                    className="absolute inset-0 border-4 border-eleven pointer-events-none"
                                    animate={{
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity
                                    }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Instructions */}
            <div className="mt-6 mb-4 text-center text-gray-400 text-sm min-h-[80px] flex items-center justify-center mt-0">
                {!codeValidated ? (
                    <p className="text-gate font-bold text-base">
                        Submit valid Binary Search code to unlock memory scanning
                    </p>
                ) : foundMaggi ? (
                    <p className="text-eleven font-bold text-base">
                        "MOM" MEMORY FOUND! Continue binary search if needed, then submit the Energy Key below.
                    </p>
                ) : (
                    <p>
                        Click memory fragments to scan. Use <strong className="text-mindflayer">Binary Search</strong> to find "Mom" efficiently.
                    </p>
                )}
            </div>
        </div>
    );
};

export default VaultScanner;
