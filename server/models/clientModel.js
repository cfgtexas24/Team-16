const mongoose = require('mongoose')

const Schema = mongoose.Schema

const clientSchema = new Schema({
    email: {   
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    skills: {
        type: Map,
        of: Number
    },
    applied: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true}, // Reference to Job model
    phone: {
        type: String
    },
    linkedin: {
        type: String
    }
    
    
}, { timestamps: true })

module.exports = mongoose.model('Client', clientSchema)