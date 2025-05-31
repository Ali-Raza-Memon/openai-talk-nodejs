const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    device_finger_print: {
        type: String,
        required: true
    },
    session_type: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
