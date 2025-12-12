import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    playerA_socketId: {
        type: String,
        default: null
    },
    playerB_socketId: {
        type: String,
        default: null
    },
    currentPhase: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 4
    },
    startTime: {
        type: Date,
        default: null
    },
    endTime: {
        type: Date,
        default: null
    },
    lockdownUntil: {
        type: Number,
        default: 0 // Timestamp when lockdown expires
    },
    status: {
        type: String,
        enum: ['waiting', 'playing', 'completed', 'failed'],
        default: 'waiting'
    },
    phaseAnswers: {
        type: [String],
        default: []
    },
    timerSeconds: {
        type: Number,
        default: 1200 // 20 minutes
    }
}, {
    timestamps: true
});

// Generate a unique 4-digit team code
teamSchema.statics.generateTeamCode = async function () {
    let code;
    let exists = true;

    while (exists) {
        code = Math.floor(1000 + Math.random() * 9000).toString();
        exists = await this.findOne({ teamName: code });
    }

    return code;
};

// Method to check if both players are connected
teamSchema.methods.isBothPlayersConnected = function () {
    return this.playerA_socketId && this.playerB_socketId;
};

// Method to advance to next phase
teamSchema.methods.advancePhase = function () {
    if (this.currentPhase < 4) {
        this.currentPhase += 1;
    } else {
        this.status = 'completed';
        this.endTime = new Date();
    }
};

const Team = mongoose.model('Team', teamSchema);

export default Team;
