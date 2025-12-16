import React from 'react';

const Phase2 = ({ role }) => {
    if (role === 'A') {
        return (
            <div className="text-center w-full max-w-3xl">
                <h2 className="text-3xl text-red-500 font-bold mb-8 tracking-widest">MEMORY ALLOCATION</h2>
                <div className="flex justify-center gap-2">
                    {Array.from({ length: 10 }).map((_, i) => {
                        const isBlocked = i === 2 || i === 5;
                        return (
                            <div key={i} className={`w-16 h-24 border-2 flex flex-col items-center justify-center ${isBlocked ? 'border-red-600 bg-red-900/20' : 'border-green-500 bg-gray-900'
                                }`}>
                                <span className="text-gray-500 text-xs mb-2">IDX {i}</span>
                                {isBlocked ? <span className="text-2xl">❌</span> : <span className="text-green-500 text-xl">[ ]</span>}
                            </div>
                        );
                    })}
                </div>
                <div className="mt-8 text-red-400 animate-pulse">⚠️ SECTORS 2 & 5 CORRUPTED</div>
            </div>
        );
    }

    if (role === 'B') {
        return (
            <div className="text-center w-full max-w-2xl border-2 border-purple-500 p-6 rounded bg-gray-900/80">
                <h2 className="text-3xl text-purple-400 font-bold mb-6">HASHING ALGORITHM</h2>

                <div className="mb-6 text-left space-y-4 font-mono text-green-300">
                    <div className="p-4 border border-gray-600 bg-black">
                        <p className="text-gray-400">DATA STREAM:</p>
                        <p className="text-xl text-white">[ 42, 12, 32 ]</p>
                    </div>

                    <div className="p-4 border border-gray-600 bg-black">
                        <p className="text-purple-400 font-bold">PRIMARY RULE:</p>
                        <p>Index = Key % 10</p>
                    </div>

                    <div className="p-4 border border-red-900 bg-red-900/10">
                        <p className="text-red-400 font-bold">COLLISION PROTOCOL (Quadratic):</p>
                        <p>If Blocked/Occupied -&gt;
                             Try: <span className="text-white">(Base + n²) % 10</span></p>
                        <p className="text-xs text-gray-400 mt-2">Where n = attempt number (1, 2, 3...)</p>
                    </div>
                </div>
                <p className="text-yellow-400">TASK: Submit the FINAL INDEX of the last key (32).</p>
            </div>
        );
    }

    return <div>LOADING...</div>;
};

export default Phase2;
