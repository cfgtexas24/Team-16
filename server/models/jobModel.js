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
  requirements: [String],
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  shiftHours: {
    start: {
      type: String,
      required: true,
      enum: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    },
    end: {
      type: String,
      required: true,
      enum: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    }
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['tech', 'construction', 'retail'],
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clients: [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'}]
});
const Job = mongoose.model('Job', jobSchema);

module.exports = Job; 