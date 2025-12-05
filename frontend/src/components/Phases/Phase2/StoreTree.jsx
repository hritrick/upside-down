import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gameDataAPI } from '../../../utils/api';

const StoreTree = ({ onSuccess = () => { } }) => {
    const [treeData, setTreeData] = useState(null);
    const [showPath, setShowPath] = useState(false);

    useEffect(() => {
        const fetchTree = async () => {
            try {
                const response = await gameDataAPI.getTree();
                setTreeData(response.data.data);
            } catch (error) {
                console.error('Failed to fetch tree:', error);
            }
        };
        fetchTree();
    }, []);

    useEffect(() => {
        if (showPath && treeData) {
            setTimeout(() => onSuccess(), 2000);
        }
    }, [showPath, treeData, onSuccess]);

    if (!treeData) {
        return <div className="text-cyber text-center py-12">LOADING STORE LAYOUT...</div>;
    }

    const { nodes, targetNode, dfsPath } = treeData;

    // Fixed dimensions to fit container
    const padding = 50;
    const width = 480;
    const height = 400;

    // Scale nodes to fit
    const maxX = Math.max(...nodes.map(n => n.x));
    const maxY = Math.max(...nodes.map(n => n.y));
    const scaleX = (width - padding * 2) / maxX;
    const scaleY = (height - padding * 2) / maxY;
    const scale = Math.min(scaleX, scaleY);

    return (
        <div className="w-full h-full flex items-center justify-center bg-void border-2 border-cyber p-4 overflow-hidden" style={{ boxShadow: '0 0 20px rgba(0, 204, 255, 0.3)' }}>
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                className="border border-cyber border-opacity-30"
                style={{ background: 'linear-gradient(135deg, rgba(0,204,255,0.05), rgba(0,153,204,0.02))', maxWidth: '100%', maxHeight: '100%' }}
            >
                {/* Blueprint grid */}
                <defs>
                    <pattern id="blueprint-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,204,255,0.15)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

                {/* Connections (edges) */}
                {nodes.filter(n => n.parent !== null).map((node) => {
                    const parentNode = nodes.find(n => n.id === node.parent);
                    const x1 = parentNode.x * scale + padding;
                    const y1 = parentNode.y * scale + padding;
                    const x2 = node.x * scale + padding;
                    const y2 = node.y * scale + padding;
                    const isInPath = showPath && dfsPath &&
                        dfsPath.includes(node.id) &&
                        dfsPath.includes(node.parent) &&
                        Math.abs(dfsPath.indexOf(node.id) - dfsPath.indexOf(node.parent)) === 1;

                    return (
                        <motion.line
                            key={`edge-${node.id}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={isInPath ? '#FFD700' : '#00ccff60'}
                            strokeWidth={isInPath ? 4 : 2}
                            strokeDasharray={isInPath ? '0' : '5,5'}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: node.id * 0.05 }}
                        />
                    );
                })}

                {/* Path highlight */}
                {showPath && dfsPath && (
                    <motion.path
                        d={dfsPath.map((nodeId, idx) => {
                            const node = nodes.find(n => n.id === nodeId);
                            const x = node.x * scale + padding;
                            const y = node.y * scale + padding;
                            return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}
                        stroke="#FFD700"
                        strokeWidth="6"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                        filter="url(#golden-glow)"
                    />
                )}

                {/* Golden Glow Filter */}
                <defs>
                    <filter id="golden-glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Nodes */}
                {nodes.map((node, idx) => {
                    const isEntrance = node.id === 0;
                    const isTarget = node.id === targetNode;
                    const isInPath = showPath && dfsPath && dfsPath.includes(node.id);
                    const cx = node.x * scale + padding;
                    const cy = node.y * scale + padding;

                    return (
                        <g key={node.id}>
                            {/* Node rect (blueprint box) */}
                            <motion.rect
                                x={cx - 30}
                                y={cy - 15}
                                width={60}
                                height={30}
                                fill={isTarget ? '#FFD70020' : isEntrance ? '#ff005520' : '#00ccff10'}
                                stroke={isTarget ? '#FFD700' : isEntrance ? '#ff0055' : isInPath ? '#FFD700' : '#00ccff'}
                                strokeWidth={2}
                                rx={2}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    delay: idx * 0.1
                                }}
                            />

                            {/* Thermal "heat" effect for path nodes */}
                            {isInPath && !isTarget && (
                                <motion.circle
                                    cx={cx}
                                    cy={cy}
                                    r={20}
                                    fill="none"
                                    stroke="#FFD700"
                                    strokeWidth={2}
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: 'easeOut'
                                    }}
                                />
                            )}

                            {/* Target highlight */}
                            {isTarget && (
                                <>
                                    <motion.rect
                                        x={cx - 35}
                                        y={cy - 20}
                                        width={70}
                                        height={40}
                                        fill="none"
                                        stroke="#FFD700"
                                        strokeWidth={3}
                                        rx={4}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity
                                        }}
                                    />
                                    <text
                                        x={cx}
                                        y={cy - 35}
                                        fill="#FFD700"
                                        fontSize="14"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        🎯 TARGET
                                    </text>
                                </>
                            )}

                            {/* Label */}
                            <text
                                x={cx}
                                y={cy + 5}
                                fill={isTarget ? '#FFD700' : isInPath ? '#FFD700' : '#00ccff'}
                                fontSize="11"
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                {node.label}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default StoreTree;
