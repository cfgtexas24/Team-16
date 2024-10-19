const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  company_description: String,
  location: String,
  company_logo: {
    type: String,
    default: null
  },
  listings: [{
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Pre-save hook to hash the password before saving
employerSchema.pre('save', async function (next) {
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
employerSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
