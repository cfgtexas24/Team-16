const mongoose = require('mongoose')

const bcrypt = require('bcrypt');

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

        type: [String], // Array of strings for skills
        default: [] // Optional: default to an empty array
    },
    experiences: [{
        employerName: {
          type: String,
        },
        roleName: {
          type: String,
        },
        description: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        }
      }],
    applied: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: false}, // Reference to Job model

    phone: {
        type: String
    },
    linkedin: {
        type: String
    }
    
    
}, { timestamps: true })


// Pre-save hook to hash the password before saving
clientSchema.pre('save', async function (next) {
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
clientSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model('Client', clientSchema)