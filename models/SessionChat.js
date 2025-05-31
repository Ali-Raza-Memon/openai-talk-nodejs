const mongoose = require('mongoose');

const SessionChatSchema = new mongoose.Schema({

    session_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    role: {
        type: String,
        enum: ["assistant", "system", "user"],
        default: "system",
        required: true
    },
    chat_message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const SessionChat = mongoose.model('SessionChat', SessionChatSchema);

module.exports = SessionChat;
