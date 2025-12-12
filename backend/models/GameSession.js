import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    players: {
        player1: {
            type: String,
            required: true,
            default: 'Player 1'
        },
        player2: {
            type: String,
            required: false,
            default: null
        }
    },
    currentPhase: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 4
    },
    phasesCompleted: {
        type: [Boolean],
        default: [false, false, false, false]
    },
    timerSeconds: {
        type: Number,
        required: true,
        default: 720 // 12 minutes
    },
    priceKeyAttempts: {
        type: Number,
        default: 0
    },
    checkedShelves: {
        type: [Number],
        default: []
    },
    correctPriceKey: {
        type: String,
        default: ''
    },
    submittedPriceKey: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    completionTime: {
        type: Number, // Time taken in seconds
        default: null
    },
    phaseSubmissions: {
        phase1Code: { type: String, default: '' },
        phase2Code: { type: String, default: '' },
        phase3Code: { type: String, default: '' },
        phase4Code: { type: String, default: '' }
    }
}, {
    timestamps: true
});

// Methods
gameSessionSchema.methods.completePhase = function (phaseNumber) {
    this.phasesCompleted[phaseNumber - 1] = true;
    if (phaseNumber < 4) {
        this.currentPhase = phaseNumber + 1;
    }
};

gameSessionSchema.methods.addCheckedShelf = function (shelfId) {
    if (!this.checkedShelves.includes(shelfId)) {
        this.checkedShelves.push(shelfId);
    }
};

gameSessionSchema.methods.validatePriceKey = function (submittedKey) {
    this.priceKeyAttempts += 1;
    this.submittedPriceKey = submittedKey;

    if (submittedKey === this.correctPriceKey) {
        this.completed = true;
        this.completionTime = 1200 - this.timerSeconds; // Calculate time taken
        return true;
    }
    return false;
};

const GameSession = mongoose.model('GameSession', gameSessionSchema);

export default GameSession;
