import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chirpSchema = new Schema({
    username: { type: 'String', required: true },
    loc: {
        type: [Number],
        index: '2d'
    },
    cuid: { type: 'String', required: true },
    content: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Chirp', chirpSchema);
