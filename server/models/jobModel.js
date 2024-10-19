
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pay: {
        type: Number,
        required: true
    },
    workHours: {
        type: String,
        required: true
    }
}, { timestamps: true }); 


const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
