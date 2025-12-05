import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { gameDataAPI } from '../../../utils/api';

const CityGraph = ({ onSuccess = () => { } }) => {
    const [graphData, setGraphData] = useState(null);
    const [showPath, setShowPath] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                const response = await gameDataAPI.getGraph();
                setGraphData(response.data.data);
            } catch (error) {
                console.error('Failed to fetch graph:', error);
            }
        };
        fetchGraph();
    }, []);

    useEffect(() => {
        if (showPath && graphData) {
            setTimeout(() => onSuccess(), 2000);
        }
    }, [showPath, graphData, onSuccess]);

    if (!graphData) {
        return <div className="text-terminal text-center py-12">LOADING CITY MAP...</div>;
    }

    const { nodes, edges, shortestPath } = graphData;

    // Calculate SVG dimensions to fit container
    const padding = 50;
    const width = 480;  // Fixed width to fit in container
    const height = 400; // Fixed height to fit in container

    // Scale nodes to fit
    const maxX = Math.max(...nodes.map(n => n.x));
    const maxY = Math.max(...nodes.map(n => n.y));
    const scaleX = (width - padding * 2) / maxX;
    const scaleY = (height - padding * 2) / maxY;
    const scale = Math.min(scaleX, scaleY);

    return (
        <div className="w-full h-full flex items-center justify-center bg-void border-2 border-terminal p-4 overflow-hidden" style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)' }}>
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                className="border border-terminal border-opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(0,255,65,0.05) 0%, transparent 70%)', maxWidth: '100%', maxHeight: '100%' }}
            >
                {/* Grid Pattern */}
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,255,65,0.1)" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Edges */}
                {edges.map((edge, idx) => {
                    const fromNode = nodes.find(n => n.id === edge.from);
                    const toNode = nodes.find(n => n.id === edge.to);
                    const x1 = fromNode.x * scale + padding;
                    const y1 = fromNode.y * scale + padding;
                    const x2 = toNode.x * scale + padding;
                    const y2 = toNode.y * scale + padding;
                    const isInPath = showPath && shortestPath &&
                        shortestPath.includes(edge.from) &&
                        shortestPath.includes(edge.to) &&
                        Math.abs(shortestPath.indexOf(edge.from) - shortestPath.indexOf(edge.to)) === 1;

                    return (
                        <g key={idx}>
                            <motion.line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={isInPath ? '#00ff41' : '#00ff4140'}
                                strokeWidth={isInPath ? 4 : 2}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                            />

                            {/* Weight label */}
                            <text
                                x={(x1 + x2) / 2}
                                y={(y1 + y2) / 2}
                                fill="#00ccff"
                                fontSize="12"
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                {edge.weight}
                            </text>
                        </g>
                    );
                })}

                {/* Path Animation */}
                {showPath && shortestPath && (
                    <motion.path
                        d={shortestPath.map((nodeId, idx) => {
                            const node = nodes.find(n => n.id === nodeId);
                            const x = node.x * scale + padding;
                            const y = node.y * scale + padding;
                            return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}
                        stroke="#00ff41"
                        strokeWidth="6"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                        filter="url(#glow)"
                    />
                )}

                {/* Glow Filter */}
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Nodes */}
                {nodes.map((node, idx) => {
                    const isStart = node.id === 0;
                    const isEnd = node.id === nodes.length - 1;
                    const isInPath = showPath && shortestPath && shortestPath.includes(node.id);
                    const cx = node.x * scale + padding;
                    const cy = node.y * scale + padding;

                    return (
                        <g key={node.id}>
                            <motion.circle
                                cx={cx}
                                cy={cy}
                                r={isStart || isEnd ? 15 : 10}
                                fill={isStart ? '#ff0055' : isEnd ? '#00ccff' : isInPath ? '#00ff41' : '#0a0a0a'}
                                stroke={isStart ? '#ff0055' : isEnd ? '#00ccff' : '#00ff41'}
                                strokeWidth={3}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    delay: idx * 0.1,
                                    duration: 0.5
                                }}
                            />

                            {/* Pulse animation for path nodes */}
                            {isInPath && (
                                <motion.circle
                                    cx={cx}
                                    cy={cy}
                                    r={15}
                                    fill="none"
                                    stroke="#00ff41"
                                    strokeWidth={2}
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'easeOut'
                                    }}
                                />
                            )}

                            <text
                                x={cx}
                                y={cy - 20}
                                fill="#00ff41"
                                fontSize="12"
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

export default CityGraph;
