import React from 'react';

const Phase1 = ({ role }) => {

    // --- VIEW FOR PLAYER A (THE EYES) ---
    if (role === 'A') {
        return (
            <div className="p-6 border-2 border-red-500 rounded-lg w-full max-w-2xl text-center">
                <h2 className="text-3xl text-red-500 font-bold mb-6 tracking-widest">DATA STREAM</h2>
                <p className="text-sm text-gray-400 mb-8">TRANSMIT THESE VALUES TO THE BRAIN</p>

                <div className="grid grid-cols-3 gap-4">
                    {['0x3F', '0xA1', '0x09', '0xE4', '0x8B', '0x17'].map((code, i) => (
                        <div key={i} className="bg-gray-900 border border-green-500 p-4 text-2xl font-mono text-green-400 shadow-[0_0_10px_rgba(0,255,0,0.3)]">
                            {code}
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-xs bg-gray-800 border border-gray-600 p-3 rounded">
                    <span className="text-gray-400">ANSWER FORMAT:</span>
                    <div className="text-green-400 font-mono mt-1">0xA1 0x3F 0xE4 0x09 0x8B 0x17</div>
                </div>
                <div className="mt-4 text-xs text-red-400 animate-pulse">
                    ⚠️ DO NOT ATTEMPT TO DECIPHER ALONE
                </div>
            </div>
        );
    }

    // --- VIEW FOR PLAYER B (THE BRAIN) ---
    if (role === 'B') {
        return (
            <div className="p-6 border-2 border-purple-500 rounded-lg w-full max-w-2xl text-center">
                <h2 className="text-3xl text-purple-500 font-bold mb-4 tracking-widest">DECRYPTION PROTOCOL</h2>

                <div className="bg-gray-900 p-6 rounded border border-purple-700 mt-6">
                    <h3 className="text-xl text-green-400 mb-4 font-bold border-b border-gray-700 pb-2">
                        ACTIVE RULE: NUMERIC VALUE
                    </h3>

                    <ul className="text-left space-y-3 text-sm font-mono text-gray-300">
                        <li>1. Convert HEX to DECIMAL.</li>
                        <li>2. Sort by Value: <span className="text-green-400 font-bold">ASCENDING</span>.</li>
                    </ul>
                </div>

                <div className="mt-6 text-xs bg-gray-800 border border-gray-600 p-3 rounded">
                    <span className="text-gray-400">ANSWER FORMAT:</span>
                    <div className="text-green-400 font-mono mt-1">0xA1 0x3F 0xE4 0x09 0x8B 0x17</div>
                </div>
            </div>
        );
    }

    return <div>LOADING ROLE...</div>;
};

export default Phase1;
