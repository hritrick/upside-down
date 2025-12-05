import mongoose from 'mongoose';

const gameDataSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['graph', 'tree', 'products', 'shelves'],
        unique: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    version: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Static methods to get specific game data
gameDataSchema.statics.getGraph = function () {
    return this.findOne({ type: 'graph' }).select('data -_id');
};

gameDataSchema.statics.getTree = function () {
    return this.findOne({ type: 'tree' }).select('data -_id');
};

gameDataSchema.statics.getProducts = function () {
    return this.findOne({ type: 'products' }).select('data -_id');
};

gameDataSchema.statics.getShelves = function () {
    return this.findOne({ type: 'shelves' }).select('data -_id');
};

const GameData = mongoose.model('GameData', gameDataSchema);

export default GameData;
