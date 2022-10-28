const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SchoolSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    index: true,
    alias: 'school',
  },
  code: {
    type: String,
  },
  district: {
    type: Number
  },
  description: {
    type: String,
  },
  remarks: {
    type: String,
  },
  reason: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User'
  }
}, {
  timestamps: true,
}, { _id: false })

SchoolSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})
SchoolSchema.plugin(AutoIncrement, { model: 'school', id: 'schoolId_counter' });
const School = mongoose.model('School', SchoolSchema)

module.exports = School;