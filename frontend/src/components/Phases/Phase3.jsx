import { motion } from 'framer-motion';

function Phase3({ playerRole }) {
    const preorder = [8, 5, 2, 6, 10, 9, 11];
    const inorder = [2, 5, 6, 8, 9, 10, 11];

    return (
        <div className="min-h-full">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-gate mb-8 text-center tracking-wider"
                style={{ fontFamily: 'VT323, monospace' }}
            >
                THE VINE ROOT
            </motion.h2>

            {playerRole === 'A' ? (
                // Player A: The Eyes - Sees PREORDER Traversal
                <div className="space-y-8 max-w-4xl mx-auto">
                    <div className="text-[#00ffaa] text-2xl font-mono text-center mb-6">
                        🌳 TREE DATA FRAGMENT A
                    </div>

                    {/* Preorder Sequence */}
                    <div className="bg-black/60 border-4 border-green-500 p-8 rounded-lg">
                        <div className="text-2xl text-green-500 font-bold mb-6 text-center font-mono">
                            PREORDER TRAVERSAL
                        </div>

                        <div className="bg-black p-8 rounded-lg">
                            <div className="flex justify-center items-center gap-4 flex-wrap">
                                {preorder.map((node, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative"
                                    >
                                        <div className="bg-green-600/20 border-2 border-green-500 rounded-lg w-20 h-20 flex items-center justify-center">
                                            <div className="text-4xl text-green-500 font-mono font-bold">
                                                {node}
                                            </div>
                                        </div>
                                        {index < preorder.length - 1 && (
                                            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-green-500 text-2xl">
                                                →
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 text-center text-gray-400 font-mono text-sm">
                            Visit order: Root → Left Subtree → Right Subtree
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-green-500/10 border-2 border-green-500 p-6 rounded-lg">
                        <div className="text-green-500 text-xl font-bold mb-3 font-mono">
                            🌲 PREORDER DEFINITION
                        </div>
                        <div className="text-white font-mono space-y-2 text-sm">
                            <div>1. Visit the ROOT node first</div>
                            <div>2. Recursively traverse LEFT subtree</div>
                            <div>3. Recursively traverse RIGHT subtree</div>
                            <div className="text-gray-400 mt-3">
                                This sequence shows the order nodes were visited.
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono">
                        ⚠️ SHARE THIS SEQUENCE WITH YOUR PARTNER
                    </div>
                </div>
            ) : (
                // Player B: The Brain - Sees INORDER Traversal + Question
                <div className="space-y-8 max-w-4xl mx-auto">
                    <div className="text-[#ff0055] text-2xl font-mono text-center mb-6">
                        🧠 TREE DATA FRAGMENT B
                    </div>

                    {/* Inorder Sequence */}
                    <div className="bg-black/60 border-4 border-[#ff0055] p-8 rounded-lg">
                        <div className="text-2xl text-[#ff0055] font-bold mb-6 text-center font-mono">
                            INORDER TRAVERSAL
                        </div>

                        <div className="bg-black p-8 rounded-lg">
                            <div className="flex justify-center items-center gap-4 flex-wrap">
                                {inorder.map((node, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative"
                                    >
                                        <div className="bg-[#ff0055]/20 border-2 border-[#ff0055] rounded-lg w-20 h-20 flex items-center justify-center">
                                            <div className="text-4xl text-[#ff0055] font-mono font-bold">
                                                {node}
                                            </div>
                                        </div>
                                        {index < inorder.length - 1 && (
                                            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-[#ff0055] text-2xl">
                                                →
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 text-center text-gray-400 font-mono text-sm">
                            Visit order: Left Subtree → Root → Right Subtree
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-[#ff0055]/10 border-2 border-[#ff0055] p-6 rounded-lg">
                        <div className="text-[#ff0055] text-xl font-bold mb-3 font-mono">
                            🌲 INORDER DEFINITION
                        </div>
                        <div className="text-white font-mono space-y-2 text-sm">
                            <div>1. Recursively traverse LEFT subtree</div>
                            <div>2. Visit the ROOT node</div>
                            <div>3. Recursively traverse RIGHT subtree</div>
                            <div className="text-gray-400 mt-3">
                                For a Binary Search Tree, this gives sorted order.
                            </div>
                        </div>
                    </div>

                    {/* Algorithm Hint */}
                    <div className="bg-black/60 border-4 border-yellow-500 p-6 rounded-lg">
                        <div className="text-xl text-yellow-500 font-bold mb-4 font-mono">
                            💡 RECONSTRUCTION ALGORITHM
                        </div>
                        <div className="text-white font-mono text-sm space-y-2">
                            <div>1. First element of PREORDER = ROOT</div>
                            <div>2. Find ROOT in INORDER → splits into left/right</div>
                            <div>3. Elements left of ROOT in Inorder = Left Subtree</div>
                            <div>4. Elements right of ROOT in Inorder = Right Subtree</div>
                            <div>5. Recursively rebuild each subtree</div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="bg-black/60 border-4 border-green-500 p-8 rounded-lg">
                        <div className="text-2xl text-green-500 font-bold mb-6 text-center font-mono">
                            📝 THE QUESTION
                        </div>
                        <div className="text-white font-mono text-xl text-center space-y-4">
                            <div>Using both traversals to reconstruct the tree:</div>
                            <div className="text-[#00ffaa] text-3xl font-bold">
                                IDENTIFY THE LEFT CHILD OF NODE 10
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono text-lg mt-6">
                        📝 SUBMIT FORMAT: Integer
                    </div>
                </div>
            )}
        </div>
    );
}

export default Phase3;
