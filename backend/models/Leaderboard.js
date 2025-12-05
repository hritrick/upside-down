import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
    playerNames: {
        type: String,
        required: true
    },
    completionTime: {
        type: Number, // Time in seconds
        required: true
    },
    attempts: {
        type: Number,
        required: true,
        default: 0
    },
    sessionId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Index for sorting by completion time (ascending - faster is better)
leaderboardSchema.index({ completionTime: 1 });

// Static method to get top scores
leaderboardSchema.statics.getTopScores = function (limit = 10) {
    return this.find()
        .sort({ completionTime: 1 }) // Fastest times first
        .limit(limit)
        .select('-__v');
};

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
