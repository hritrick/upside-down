import React from 'react';

const Phase3 = ({ role }) => {
    if (role === 'A') {
        return (
            <div className="text-center w-full max-w-4xl">
                <h2 className="text-3xl text-red-500 font-bold mb-6">BIOLOGICAL SCAN (LAYER 1)</h2>
                <div className="bg-black border-2 border-green-500 p-8 font-mono text-3xl tracking-wider text-green-400 shadow-[0_0_20px_rgba(0,255,0,0.2)]">
                    <span className="text-gray-500 block text-sm mb-4">PREORDER TRAVERSAL:</span>
                    [ 50, 30, 20, 10, 25, 40, 45, 70, 60, 55, 80, 90 ]
                </div>

                <div className="bg-red-900/20 border border-red-500 p-4 text-red-300 mt-6">
                    <h3 className="font-bold mb-2">⚠️ ANOMALY DETECTED</h3>
                    <p>LOCATE THE <span className="text-white font-bold text-lg">LEFT CHILD</span> OF NODE <span className="text-white font-bold text-lg">30</span>.</p>
                </div>

                <div className="mt-6 text-xs bg-gray-800 border border-gray-600 p-3 rounded">
                    <span className="text-gray-400">ANSWER FORMAT:</span>
                    <div className="text-green-400 font-mono mt-1">Integer</div>
                </div>

                <p className="mt-4 text-gray-400 text-sm">TRANSMIT DATA TO ANALYST</p>
            </div>
        );
    }

    if (role === 'B') {
        return (
            <div className="text-center w-full max-w-4xl">
                <h2 className="text-3xl text-purple-500 font-bold mb-6">BIOLOGICAL SCAN (LAYER 2)</h2>
                <div className="bg-black border-2 border-purple-500 p-8 font-mono text-3xl tracking-wider text-purple-400 mb-6">
                    <span className="text-gray-500 block text-sm mb-4">INORDER TRAVERSAL:</span>
                    [ 10, 20, 25, 30, 40, 45, 50, 55, 60, 70, 80, 90 ]
                </div>

                <div className="bg-red-900/20 border border-red-500 p-4 text-red-300">
                    <h3 className="font-bold mb-2">⚠️ ANOMALY DETECTED</h3>
                    <p>LOCATE THE <span className="text-white font-bold text-lg">LEFT CHILD</span> OF NODE <span className="text-white font-bold text-lg">30</span>.</p>
                </div>

                <div className="mt-6 text-xs bg-gray-800 border border-gray-600 p-3 rounded">
                    <span className="text-gray-400">ANSWER FORMAT:</span>
                    <div className="text-green-400 font-mono mt-1">Integer</div>
                </div>
            </div>
        );
    }

    return <div>LOADING...</div>;
};

export default Phase3;
