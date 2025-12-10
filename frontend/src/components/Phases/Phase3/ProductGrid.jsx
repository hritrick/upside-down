import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gameDataAPI } from '../../../utils/api';

const ProductGrid = ({ sorted = false }) => {
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await gameDataAPI.getProducts();
                const data = response.data.data;
                setProducts(data.products);
                setDisplayProducts(data.products);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (sorted && products.length > 0) {
            // Sort by priority (descending)
            const sortedProducts = [...products].sort((a, b) => b.priority - a.priority);
            setDisplayProducts(sortedProducts);
        }
    }, [sorted, products]);

    if (!products.length) {
        return <div className="text-mindflayer text-center py-12">LOADING MEMORY FRAGMENTS...</div>;
    }

    return (
        <div className="w-full h-full overflow-y-auto p-6 bg-void border-2 border-panic" style={{ boxShadow: '0 0 20px rgba(255, 0, 85, 0.3)' }}>
            <div className="grid grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                    {displayProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: sorted ? 0 : [0, -2, 2, -2, 0],
                                filter: sorted ? 'blur(0px) hue-rotate(0deg)' : 'blur(1px) hue-rotate(30deg)'
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                                layout: { duration: 0.5 },
                                opacity: { duration: 0.3 },
                                x: {
                                    duration: 0.5,
                                    repeat: sorted ? 0 : Infinity,
                                    repeatType: 'mirror'
                                }
                            }}
                            className={`
                p-4 border-2 relative
                ${sorted ? 'border-mindflayer bg-mindflayer bg-opacity-10' : 'border-eleven bg-eleven bg-opacity-10'}
                ${!sorted ? 'glitch-effect' : ''}
              `}
                        >
                            {/* Priority Badge */}
                            <div className={`
                absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                ${sorted ? 'bg-mindflayer text-white' : 'bg-eleven text-void animate-pulse'}
              `}>
                                {product.priority}
                            </div>

                            {/* Memory Info */}
                            <div className="text-center">
                                <p className={`font-bold text-sm mb-1 ${sorted ? 'text-mindflayer' : 'text-eleven'}`}>
                                    {product.name}
                                </p>
                                <p className="text-gray-400 text-xs">{product.category}</p>
                            </div>

                            {/* VHS static overlay when unsorted */}
                            {!sorted && (
                                <motion.div
                                    className="absolute inset-0 bg-mindflayer opacity-10"
                                    animate={{
                                        opacity: [0.1, 0.3, 0.1],
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        repeat: Infinity,
                                        repeatType: 'reverse'
                                    }}
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Sorted Indicator */}
            {sorted && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                >
                    <p className="text-mindflayer text-xl font-bold">
                        MEMORY FRAGMENTS SORTED CHRONOLOGICALLY
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default ProductGrid;
