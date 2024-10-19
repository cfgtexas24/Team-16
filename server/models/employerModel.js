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

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;