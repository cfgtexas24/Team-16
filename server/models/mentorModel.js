const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    managedClients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }],
    specialization: {
        type: [String],
        default: []
    },
    phone: {
        type: String
    },
    linkedin: {
        type: String
    }
}, { timestamps: true });

// Pre-save hook to hash the password before saving
mentorSchema.pre('save', async function (next) {
    const mentor = this;

    // Only hash the password if it's new or has been modified
    if (!mentor.isModified('password')) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        
        // Hash the password using the salt
        const hash = await bcrypt.hash(mentor.password, salt);
        
        // Replace the plain text password with the hashed one
        mentor.password = hash;

        // Proceed to the next middleware or save the document
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare the entered password with the hashed password
mentorSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Mentor', mentorSchema);
