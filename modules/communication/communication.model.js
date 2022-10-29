const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CommunicationSchema = new mongoose.Schema({
  _id: Number,
  content: {
    type: String,
    required: [true, 'can\'t be blank']
  },
  to: {
    type: Number,
  },
  isViewed: {
    type: Boolean,
    default: false
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

CommunicationSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})
CommunicationSchema.plugin(AutoIncrement, { model: 'communication', id: 'communicationId_counter' });
const Communication = mongoose.model('Communication', CommunicationSchema)

module.exports = Communication;