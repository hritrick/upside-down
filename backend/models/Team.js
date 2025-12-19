import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
    roomCode: { type: String, required: true, unique: true },
    teamName: String,
    playerA: { socketId: String, name: String },
    playerB: { socketId: String, name: String },

    status: { type: String, default: 'waiting' }, // 'playing', 'win', 'lose'
    currentPhase: { type: Number, default: 1 },
    startTime: { type: Date },

    // Stats
    totalHintsUsed: { type: Number, default: 0 },
    phaseHintCounts: { type: Map, of: Number, default: {} }, // Tracks per-phase usage

    lockdownUntil: { type: Number, default: 0 },
    roleSwapUsed: { type: Boolean, default: false } // Track one-time role swap
});

export default mongoose.model('Team', TeamSchema);
