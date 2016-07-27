import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var properties = {
    username: { type: 'String', required: true },
    loc : {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    },
    cuid: { type: 'String', required: true },
    content: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true }
};

var options = {
    safe: {
        wtimeout: 10000
    }
};
var schema = new Schema(properties, options);
schema.index({ loc : '2dsphere' });
export default mongoose.model('Chirp', schema);
