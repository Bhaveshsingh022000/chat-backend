const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const editorSchema = new Schema({
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Chat', editorSchema);