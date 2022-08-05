import mongoose from 'mongoose'

const guild = new mongoose.Schema({
    _id: String,
    cases: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('guild', guild);