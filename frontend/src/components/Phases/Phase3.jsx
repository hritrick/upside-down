import React from 'react';

const Phase3 = ({ role }) => {
    if (role === 'A') {
        return (
            <div className="text-center w-full max-w-2xl">
                <h2 className="text-3xl text-red-500 font-bold mb-6">BIOLOGICAL SCAN (LAYER 1)</h2>
                <div className="bg-black border-2 border-green-500 p-8 font-mono text-2xl tracking-wider text-green-400 shadow-[0_0_20px_rgba(0,255,0,0.2)]">
                    <span className="text-gray-500 block text-sm mb-4">PREORDER TRAVERSAL:</span>
                    [ 8, 5, 2, 6, 10, 9, 11 ]
                </div>
                <p className="mt-4 text-gray-400 text-sm">TRANSMIT DATA TO ANALYST</p>
            </div>
        );
    }

    if (role === 'B') {
        return (
            <div className="text-center w-full max-w-2xl">
                <h2 className="text-3xl text-purple-500 font-bold mb-6">BIOLOGICAL SCAN (LAYER 2)</h2>
                <div className="bg-black border-2 border-purple-500 p-8 font-mono text-2xl tracking-wider text-purple-400 mb-6">
                    <span className="text-gray-500 block text-sm mb-4">INORDER TRAVERSAL:</span>
                    [ 2, 5, 6, 8, 9, 10, 11 ]
                </div>

                <div className="bg-red-900/20 border border-red-500 p-4 text-red-300">
                    <h3 className="font-bold mb-2">⚠️ ANOMALY DETECTED</h3>
                    <p>LOCATE THE <span className="text-white font-bold text-lg">LEFT CHILD</span> OF NODE <span className="text-white font-bold text-lg">10</span>.</p>
                </div>
            </div>
        );
    }

    return <div>LOADING...</div>;
};

export default Phase3;
