const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
    clients: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: false}, // Reference to Client model
}, { timestamps: true });

// Pre-save hook to hash the password before saving
caseManagerSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it's new or has been modified
    if (!user.isModified('password')) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        
        // Hash the password using the salt
        const hash = await bcrypt.hash(user.password, salt);
        
        // Replace the plain text password with the hashed one
        user.password = hash;

        // Proceed to the next middleware or save the document
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare the entered password with the hashed password
caseManagerSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};







const CaseManager = mongoose.model('CaseManager', caseManagerSchema);