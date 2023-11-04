const mongoose = require('mongoose');

const NotesTemplateSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    date: Date,
    comment: { type: String,
    },
});

module.exports = mongoose.model('Notes', NotesTemplateSchema); 