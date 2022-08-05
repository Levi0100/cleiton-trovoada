import mongoose from 'mongoose'

const user = new mongoose.Schema({
    _id: String,
    exp: {
        id: String,
        xp: {type: Number, default: 0},
        xpRequiredToUp: {type: Number, default: 150},
        level: {type: Number, default: 0}
    },
    ticketOpened: String,
    supportOpened: String,
    lang: String
});

export default mongoose.model('user', user);