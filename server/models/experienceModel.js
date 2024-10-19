const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    employer: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false // Optional if still on going
    }
}, { timestamps: true }); 
const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
