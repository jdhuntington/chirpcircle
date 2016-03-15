import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var properties = {
    username: { type: 'String', required: true },
    loc: {
        type: [Number],
        index: '2d'
    },
    cuid: { type: 'String', required: true },
    content: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true }
};

var options = {
    safe: {
        w: 'majority',
        wtimeout: 10000
    }
};

export default mongoose.model('Chirp', new Schema(properties, options));
