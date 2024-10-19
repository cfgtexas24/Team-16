const mongoose = require('mongoose');


const caseManagerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }]
}, { timestamps: true });


const CaseManager = mongoose.model('CaseManager', caseManagerSchema);

module.exports = CaseManager;
